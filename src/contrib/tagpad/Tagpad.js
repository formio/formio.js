import _ from 'lodash';
import Two from 'two.js';
import NativePromise from 'native-promise-only';
import Formio from '../../Formio';
import NestedComponent from '../../components/_classes/nested/NestedComponent';

export default class TagpadComponent extends NestedComponent {
  selectedDot;
  dots;
  canvasSvg;
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
      imageType: '',
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Tagpad',
      group: 'advanced',
      icon: 'fa fa-tag',
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

  createFormComponents() {
    const components = this.component.components.map(component => this.createComponent(component));
    return components;
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
    if (!index) {
      // TODO clear form, components
    }

    const dot = this.dots[index];
    if (!dot) {
      // TODO clear form, components
    }

    // Clear previous selection
    if (this.selectedDot && this.dots[this.selectedDot.index]) {
      this.dots[this.selectedDot.index].shape.circle.dashes = [0];
    }
    dot.shape.circle.dashes = [1];
    this.two.update();
    this.selectedDot = this.dots[index];
    //TODO render form
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
    this.redraw();
    this.selectDot(newDotIndex);
    this.triggerChange();
  }

  drawDot(dot, index) {
    const circle = this.two.makeCircle(dot.coordinate.x, dot.coordinate.y, this.component.dotSize);
    circle.fill = this.component.dotFillColor;
    circle.stroke = this.component.dotStrokeColor;
    circle.linewidth = this.component.dotStrokeSize;
    circle.className += ' formio-tagpad-dot';
    //draw index
    const text = new Two.Text(index + 1, dot.coordinate.x, dot.coordinate.y);
    text.className += ' formio-tagpad-dot-index';
    text.styles = { color: this.component.dotStrokeColor };
    this.two.add(text);
    this.two.update();
    circle._renderer.elem.addEventListener('mouseup', (e) => this.dotClicked(e, dot, index));
    text._renderer.elem.addEventListener('mouseup', (e) => this.dotClicked(e, dot, index));
    return { circle, text };
  }

  get templateName() {
    return 'tagpad';
  }

  render() {
    return super.render(this.renderTemplate(this.templateName, { }));
  }

  attach(element) {
    this.loadRefs(element, { canvas: 'single', background: 'single', form: 'single', canvasImage: 'single', image: 'single' });
    const superAttach = super.attach(element);

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

    return superAttach;
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

  focus() {
    return this.refs.canvas && this.refs.canvas.focus();
  }

  getValueAsString() { } //TODO: Think about how data should be displayed as string
}
