import _ from 'lodash';
import Two from 'two.js';
import NativePromise from 'native-promise-only';
import Formio from '../../Formio';
import NestedComponent from '../../components/_classes/nested/NestedComponent';
import Component from '../../components/_classes/component/Component';
import { throws } from 'power-assert';

export default class TagpadComponent extends NestedComponent {
  selectedDot;
  dots;
  canvasSvg;
  formComponents;
  dimensions;
  dimensionsMultiplier
  two;

  static schema(...extend) {
    return NestedComponent.schema({
      type: 'tagpad',
      label: 'Tagpad',
      key: 'tagpad',
      input: true,
      tree: true,
      dotSize: 10,
      dotStrokeSize: 2,
      dotStrokeColor: '#333',
      dotFillColor: '#ccc',
      components: [],
      imageType: 'image',
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Tagpad',
      group: 'advanced',
      icon: 'tag',
      weight: 115,
      documentation: '', //TODO: add documentation link
      schema: TagpadComponent.schema()
    };
  }

  get defaultSchema() {
    return TagpadComponent.schema();
  }

  get emptyValue() {
    return []; //TODO: not sure
  }

  constructor(...args) {
    super(...args);
    this.dots = [];
    const backgroundReadyPromise = new NativePromise((resolve, reject) => {
      this.backgroundReady = { resolve, reject };
    });
    this.backgroundReady.promise = backgroundReadyPromise;
    this.dimensionsMultiplier = 1;
  }

  get renderContext() {
    return {
      selectedDot: this.selectedDot,
      hasDots: this.dots && this.dots.length,
      buttons: this.buttons
    };
  }

  render() {
    const ctx = this.renderContext;
    return super.renderTemplate(this.templateName, {
      ...ctx,
      components: this.renderComponents([...this.getFormComponents()])
    });
  }

  get buttons() {
    const buttons = {};
    [{ name: 'removeDot',    method: 'removeSelectedDot' }].forEach(button => {
      if (this.hasButton(button.name)) {
        buttons[button.name] = button;
      }
    });
    return buttons;
  }

  hasButton(buttonName) {
    switch (buttonName) {
      case 'removeDot':
        return !this.options.readOnly;
      default:
        return false;
    }
  }

  attachButtons() {
    _.each(this.buttons, (button) => {
      const buttonElement = this.refs[`${button.name}`];
      buttonElement && this.addEventListener(buttonElement, 'click', (event) => {
        event.preventDefault();
        buttonElement.setAttribute('disabled', 'disabled');
        this.setLoading(buttonElement, true);
        typeof this[button.method] === 'function' && this[button.method]();
        buttonElement.removeAttribute('disabled');
        this.setLoading(buttonElement, false);
      });
    });
  }

  get dataReady() {
    return this.backgroundReady.promise;
  }

  get dataValue() {
    const dataValue = super.dataValue;
    if (!dataValue || !_.isArray(dataValue)) {
      return this.emptyValue;
    }
    return dataValue;
  }

  set dataValue(value) {
    super.dataValue = value;
  }

  get defaultValue() {
    const value = super.defaultValue;
    let defaultValue;

    if (_.isArray(value)) {
      defaultValue = value;
    }
    else if (value && (typeof value === 'object')) {
      defaultValue = [value];
    }
    else {
      defaultValue = this.emptyValue;
    }

    for (let dIndex = defaultValue.length; dIndex < this.minLength; dIndex++) {
      defaultValue.push({});
    }

    return defaultValue;
  }

  init() {
    this.components = this.components || [];
    this.createDots();
  }

  redraw() {
    super.redraw();
        this.on('initialized', () => {
      this.stretchDrawingArea();
    });
    // For case when component is built after form is initialized (for ex. when it's on inactive tab of Tabs component), so this.on('initialized', ...) won't be fired:
    this.redrawDots();
  }

  addBackground() {
    if (this.refs.image && this.refs.image.complete && !this.imageWasLoaded) {
      this.imageWasLoaded = true;
      this.originalImage = this.refs.image;
      return;
    }
    else if (this.refs.image && this.refs.image.complete && this.imageWasLoaded) {
      this.setBackgroundImage();
    }
    else if (this.component.imageUrl) {
      Formio.makeStaticRequest(this.component.imageUrl, 'GET', null, { noToken: true, headers: {} })
      .then(image => {
        this.setBackgroundImage(image);
      })
      .catch(() => {
        //TODO check that component works in this case anyway
        this.refs.background.innerHTML = this.t('Background image failed to load. Tagpad doesn\'t work without background image');
        this.backgroundReady.resolve();
      });
    }
  }

  mapDimensionsFromAttributes(svg) {
    return [
        { attribute: 'x', defaultValue: 0 },
        { attribute: 'y', defaultValue: 0 },
        { attribute: 'width', defaultValue: 640 },
        { attribute: 'height', defaultValue: 480 }
      ].map(dimension => {
        return parseFloat(svg.getAttribute(dimension.attribute)) || dimension.defaultValue;
      });
  }

  setDimensions(viewBoxMinX, viewBoxMinY, viewBoxWidth, viewBoxHeight) {
    this.dimensions = {
      width: viewBoxWidth,
      height: viewBoxHeight,
      minX: viewBoxMinX,
      minY: viewBoxMinY
    };
  }

  setSvgImage(svgMarkup) {
    const xmlDoc = new DOMParser().parseFromString(svgMarkup, 'image/svg+xml');
    let backgroundSvg = xmlDoc.getElementsByTagName('svg');
    if (!backgroundSvg || !backgroundSvg[0]) {
      console.warn(`Tagpad '${this.component.key}': Background SVG doesn't contain <svg> tag on it`);
      return;
    }
    backgroundSvg = backgroundSvg[0];
    //read initial dimensions from viewBox
    const initialViewBox = backgroundSvg.getAttribute('viewBox');

    if (initialViewBox) {
      this.setDimensions(...initialViewBox.split(' ').map(parseFloat));
    }
    else {
      this.setDimensions(...this.mapDimensionsFromAttributes(backgroundSvg));
    }

    //remove width and height attribute for background image to be stretched to available width and preserve aspect ratio
    backgroundSvg.removeAttribute('width');
    backgroundSvg.removeAttribute('height');
    const viewBox = this.dimensions;
    //set background image viewBox
    backgroundSvg.setAttribute('viewBox', `${viewBox.minX} ${viewBox.minY} ${viewBox.width} ${viewBox.height}`);
    //set canvas image viewBox (necessary for canvas SVG to stretch properly without losing correct aspect ration)
    this.canvasSvg.setAttribute('viewBox', `${viewBox.minX} ${viewBox.minY} ${viewBox.width} ${viewBox.height}`);

    svgMarkup = new XMLSerializer().serializeToString(backgroundSvg);
    //fix weird issue in Chrome when it returned '<svg:svg>...</svg:svg>' string after serialization instead of <svg>...</svg>
    svgMarkup = svgMarkup.replace('<svg:svg', '<svg').replace('</svg:svg>', '</svg>');

    this.refs.background.innerHTML = svgMarkup;
  }

  setBackgroundImage(image) {
    if (image && image.startsWith('<?xml')) {
      this.imageType = 'svg';
      this.setSvgImage(image);
    }
    else {
      this.imageType = 'image';
      const viewBoxWidth = this.originalImage.width;
      const viewBoxHeight = this.originalImage.height;

      this.canvasSvg.setAttribute('viewBox', `0 0 ${viewBoxWidth} ${viewBoxHeight}`);
      this.setDimensions( 0, 0, viewBoxWidth, viewBoxHeight);
    }

    this.stretchDrawingArea();
    this.backgroundReady.resolve();
  }

  attachDrawEvents() {
    if (this.options.readOnly || !this.canvasSvg) {
      return;
    }
    // Set up mouse event.
    const mouseEnd = (e) => {
      e.preventDefault();
      const offset = this.canvasSvg.getBoundingClientRect();
      this.addDot(this.getActualCoordinate({
        x: e.clientX - offset.left,
        y: e.clientY - offset.top
      }));
    };
    this.canvasSvg.addEventListener('mouseup', mouseEnd);

    // Set up touch event.
    const touchEnd = (e) => {
      e.preventDefault();
      const offset = this.canvasSvg.getBoundingClientRect();
      const touch = e.changedTouches[0];
      this.addDot(this.getActualCoordinate({
        x: touch.pageX - offset.left,
        y: touch.pageY - offset.top
      }));
    };
    this.canvasSvg.addEventListener('touchend', touchEnd);

    this.two.update();
  }

  getFormComponents() {
    const formComponents = [];
    if (!this.selectedDot || !this.dots[this.selectedDot.index]) {
      return [];
    }
    this.component.components.forEach(component => {
      const options = _.clone(this.options);
      options.name += `[${this.selectedDot.index}]`;
      const dotData = this.dots[this.selectedDot.index].dot.data;
      const componentInstance = this.createComponent(component, options, dotData);
      if (componentInstance.path && component.key) {
        componentInstance.path = componentInstance.path.replace(new RegExp(`\\.${component.key}$`), `[${this.selectedDot.index}].${component.key}`);
      }

      formComponents.push(componentInstance);
    });
    this.formComponents = formComponents;
    return formComponents;
  }

  redrawDots() {
    this.dots = [];
    //clear canvas
    this.two.clear();
    this.two.render();
    //draw dots
    this.createDots();
  }

  createDots() {
    const dotsValues = this.dataValue;
    dotsValues.forEach((dot, index) => {
      if (!this.dots[index]) {
        this.dots[index] = { index, dot, shape: this.drawDot(dot, index) };
        this.checkDotValidity(dotsValues, false, this.dots[index]);
      }
    });

    this.dots.splice(dotsValues.length);
  }

  getActualCoordinate(coordinate) {
    // recalculate coordinate taking into account changed size of drawing area
    coordinate.x = Math.round(coordinate.x / this.dimensionsMultiplier) + this.dimensions.minX;
    coordinate.y = Math.round(coordinate.y / this.dimensionsMultiplier) + this.dimensions.minY;
    return coordinate;
  }

  selectDot(index) {
    if (!_.isNumber(index)) {
      this.selectedDot = null;
      this.redraw();
      return;
    }

    const dot = this.dots[index];
    this.selectedDot = dot;
    this.redraw();
  }

  dotClicked(e, dot, index) {
    //prevent drawing another dot near clicked dot
    e.stopPropagation();
    this.selectDot(index);
  }

  addDot(coordinate) {
    const dot = {
      coordinate,
      data: {}
    };
    const newDotIndex = this.dataValue.length;
    const shape = this.drawDot(dot, newDotIndex);
    this.dots.push({
      index: newDotIndex,
      dot,
      shape
    });
    this.dataValue.push(dot);
    this.checkDotValidity(this.dataValue, false, this.dots[newDotIndex]);
    this.selectDot(newDotIndex);
    this.triggerChange();
  }

  drawDot(dot, index) {
    const { x, y } = dot.coordinate;

    const circle = this.drawDotCircle(x, y, this.component.dotSize, index);
    const text = this.drawDotLabel(x, y, index + 1);

    this.two.add(text);
    this.two.update();

    circle._renderer.elem.addEventListener('mouseup', (e) => this.dotClicked(e, dot, index));
    text._renderer.elem.addEventListener('mouseup', (e) => this.dotClicked(e, dot, index));
    return { circle, text };
  }

  drawDotCircle(x, y, size, index) {
    const circle = this.two.makeCircle(x, y, size);
    circle.fill = this.component.dotFillColor;
    circle.stroke =  this.component.dotStrokeColor;
    circle.linewidth = this.component.dotStrokeSize;
    circle.className += ' formio-tagpad-dot';
    if (this.selectedDot && this.selectedDot.index === index) {
      circle.dashes = [1];
    }

    return circle;
  }

  drawDotLabel(x, y, label) {
    const text = new Two.Text(label, x, y);
    text.className += ' formio-tagpad-dot-index';
    text.styles = { color:  this.component.dotStrokeColor };
    return text;
  }

  get templateName() {
    return 'tagpad';
  }

  attach(element) {
    this.loadRefs(element, {
      canvas: 'single',
      background: 'single',
      form: 'single',
      canvasImage: 'single',
      image: 'single',
      removeDot: 'single'
    });

    if (this.formComponents) {
      this.attachComponents(this.refs.form, this.formComponents);
    }

    if (this.refs.background && this.hasBackgroundImage) {
      this.createDrawingArea();

      if (this.refs.image && !this.imageWasLoaded) {
        this.refs.image.addEventListener('load', e => {
          this.originalImage = { width: e.target.width, height: e.target.height };
          this.imageWasLoaded = true;
          this.addBackground();
        });
      }
      else {
        this.addBackground();
      }
    }

    this.attachButtons();
    return super.attach(element);
  }

  createDrawingArea() {
    this.two = new Two({
      type: Two.Types.svg,
      width: '100%',
      height: '100%'
    }).appendTo(this.refs.canvas);

    this.canvasSvg = this.two.renderer.domElement;
    this.canvasSvg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    this.addEventListener(window, 'resize', _.debounce(() => this.stretchDrawingArea(), 100));
    this.attachDrawEvents();
  }

  stretchDrawingArea() {
    const width = this.refs.background.offsetWidth;
    const height = this.refs.background.offsetHeight;
    //don't stretch if background dimensions are unknown yet
    if (width && height) {
      //will need dimensions multiplier for coordinates calculation
      this.dimensionsMultiplier = width / this.dimensions.width;
      this.setEditorSize(width, height);
    }
  }

  setEditorSize(width, height) {
    this.two.width = width;
    this.two.height = height;
    this.two.update();
  }

  get hasBackgroundImage() {
    return this.component.image || this.component.imageUrl;
  }

  removeSelectedDot() {
    if (!this.selectedDot || !this.dataValue[this.selectedDot.index]) {
      return;
    }
    this.dataValue.splice(this.selectedDot.index, 1);
    this.redrawDots();
    this.selectDot(0);
    this.triggerChange();
  }

  focus() {
    return this.refs.canvas && this.refs.canvas.focus();
  }

  checkData(data, flags, row) {
    data = data || this.rootValue;
    row = row || this.data;
    Component.prototype.checkData.call(this, data, flags, row);
    return this.checkDots(data, flags, this.dataValue);
    // return this.checkValidity(data, false, this.dataValue);
  }

  checkDots(data, flags, row) {
    let isTagpadValid = true;
    //check validity of each dot
    this.dots.forEach((dot) => {
      const isDotValid = this.checkDotValidity(data, flags, dot);
      isTagpadValid = isTagpadValid && isDotValid;
    });

    //in the end check validity of selected dot to show its validation results on the form instead of showing last dot validation
    if (this.selectedDot) {
      this.checkDotValidity(data, false, this.dots[this.selectedDot.index]);
    }
    return isTagpadValid;
  }

  checkDotValidity(data, dirty, dot) {
    if (!this.formComponents) {
      return true;
    }
    const isDotValid = this.formComponents.reduce((valid, component) => {
      return valid && component.checkValidity(data, dirty);
    }, true);
    this.setDotValidity(dot, isDotValid);
    return isDotValid;
  }

  setDotValidity(dot, isValid) {
    const color = isValid ? this.component.dotStrokeColor : '#ff0000';
    //change style of dot based on its validity
    dot.shape.circle.stroke = color;
    dot.shape.text.styles.color = color;
    this.two.update();
  }

  getValueAsString() { } //TODO: Think about how data should be displayed as string
}
