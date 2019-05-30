import Two from 'two.js';
import NestedComponent from '../../components/nested/NestedComponent';
import _ from 'lodash';
import BaseComponent from '../../components/base/Base';
import { Components } from '../../formio.form';
import Formio from '../../Formio';
import { eachComponent } from '../../utils/utils';
import editForm from './Tagpad.form';

export default class Tagpad extends NestedComponent {
  static schema(...extend) {
    return NestedComponent.schema({
      type: 'tagpad',
      label: 'Tagpad',
      key: 'tagpad',
      dotSize: 10,
      dotStrokeSize: 2,
      dotStrokeColor: '#333',
      dotFillColor: '#ccc',
      components: []
    }, ...extend);
  }

  static builderInfo = {
    title: 'Tagpad',
    group: 'advanced',
    icon: 'fa fa-tag',
    weight: 115,
    documentation: 'http://help.form.io/userguide/',
    schema: Tagpad.schema()
  };

  static editForm = editForm;

  constructor(...args) {
    super(...args);
    this.type = 'tagpad';
    this.dots = [];
    _.defaults(this.component, {
      dotSize: 10,
      dotStrokeSize: 2,
      dotStrokeColor: '#333',
      dotFillColor: '#ccc'
    });
    //init background ready promise
    const backgroundReadyPromise = new Promise((resolve, reject) => {
      this.backgroundReady = { resolve, reject };
    });
    this.backgroundReady.promise = backgroundReadyPromise;
    //init dimensions multiplier
    this.dimensionsMultiplier = 1;
  }

  build(state) {
    if (this.options.builder) {
      return super.build(state, true);
    }
    this.createElement();
    this.createLabel(this.element);
    this.renderTagpad();
    this.createDescription(this.element);
    if (this.shouldDisable) {
      this.disabled = true;
    }
    this.element.appendChild(this.errorContainer = this.ce('div', { class: 'has-error' }));
    this.attachLogic();
  }

  set disabled(disabled) {
    super.disabled = disabled;
    //call Base Component setter to run the logic for adding disabled class
    Object.getOwnPropertyDescriptor(BaseComponent.prototype, 'disabled').set.call(this, disabled);
  }

  renderTagpad() {
    this.tagpadContainer = this.ce('div', {
      class: 'formio-tagpad-container clearfix'
    });
    this.canvas = this.ce('div', {
      class: 'formio-tagpad-canvas'
    });
    this.background = this.ce('div', {
      class: 'formio-tagpad-background'
    });
    this.canvasContainer = this.ce('div', {
      class: 'formio-tagpad-image-container'
    }, [this.canvas, this.background]);
    this.formContainer = this.ce('div', {
        class: 'formio-tagpad-form-container'
      },
      this.form = this.ce('div', {
        class: 'formio-tagpad-form'
      }));
    this.tagpadContainer.appendChild(this.canvasContainer);
    this.tagpadContainer.appendChild(this.formContainer);
    this.element.appendChild(this.tagpadContainer);
    if (this.hasBackgroundImage) {
      this.two = new Two({
        type: Two.Types.svg
      }).appendTo(this.canvas);
      this.canvasSvg = this.two.renderer.domElement;
      this.addBackground();

      // Stretch drawing area on initial rendering of component.
      // Need a proper moment for that - when background is already displayed in browser so that it already has offsetWidth and offsetHeight
      // For case when component is built before form is initialized:
      this.on('initialized', () => {
        this.stretchDrawingArea();
      });
      // For case when component is built after form is initialized (for ex. when it's on inactive tab of Tabs component), so this.on('initialized', ...) won't be fired:
      this.backgroundReady.promise.then(() => {
        this.stretchDrawingArea();
      });

      this.attach();
      this.redrawDots();
    }
    else {
      this.background.innerHTML = this.t('Background image is not specified. Tagpad doesn\'t work without background image');
    }
  }

  renderForm() {
    this.form.appendChild(this.ce('p', {
        class: 'formio-tagpad-form-title'
      },
      [
        this.t('Dot: '),
        this.selectedDotIndexElement = this.ce('span', {}, 'No dot selected')
      ]
      )
    );
    this.component.components.forEach((component) => {
      //have to avoid using createComponent method as Components there will be empty
      const componentInstance = Components.create(component, this.options, this.data);
      componentInstance.parent = this;
      componentInstance.root = this.root || this;
      const oldOnChange = componentInstance.onChange;
      componentInstance.onChange = (flags, fromRoot) => {
        oldOnChange.call(componentInstance, flags, fromRoot);
        this.saveSelectedDot();
      };
      this.form.appendChild(componentInstance.getElement());
      //need to push to this.components all components with input: true so that saving would work properly
      this.addTagpadComponent(componentInstance);
    });
    this.form.appendChild(this.ce(
      'button',
      {
        class: 'btn btn-sm btn-danger formio-tagpad-remove-button',
        onClick: this.removeSelectedDot.bind(this),
        title: 'Remove Dot'
      },
      [
        this.ce('i', {
          class: this.iconClass('trash')
        })
      ]
    ));
    this.formRendered = true;
  }

  addTagpadComponent(componentInstance) {
    if (componentInstance.component.input) {
      this.components.push(componentInstance);
    }
    else if (componentInstance.components) {
      componentInstance.components.forEach(this.addTagpadComponent.bind(this));
    }
  }

  attach() {
    this.attachDrawEvents();
    window.addEventListener('resize', this.stretchDrawingArea.bind(this));
  }

  attachDrawEvents() {
    if (this.options.readOnly) {
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

  getActualCoordinate(coordinate) {
    //recalculate coordinate taking into account changed size of drawing area
    coordinate.x = Math.round(coordinate.x / this.dimensionsMultiplier) + this.dimensions.minX;
    coordinate.y = Math.round(coordinate.y / this.dimensionsMultiplier) + this.dimensions.minY;
    return coordinate;
  }

  stretchDrawingArea() {
    const width = this.background.offsetWidth;
    const height = this.background.offsetHeight;
    //don't stretch if background dimensions are unknown yet
    if (width && height) {
      //will need dimensions multiplier for coordinates calculation
      this.dimensionsMultiplier = width / this.dimensions.width;
      this.setEditorSize(width, height);
    }
  }

  get dataReady() {
    return this.backgroundReady.promise;
  }

  get hasBackgroundImage() {
    return this.component.image || this.component.imageUrl;
  }

  addBackground() {
    if (this.component.image) {
      this.setBackgroundImage(this.component.image);
      this.backgroundReady.resolve();
    }
    else if (this.component.imageUrl) {
      Formio.makeStaticRequest(this.component.imageUrl, 'GET', null, { noToken: true, headers: {} })
        .then(image => {
          this.setBackgroundImage(image);
          this.backgroundReady.resolve();
        })
        .catch(() => {
          //TODO check that component works in this case anyway
          this.background.innerHTML = this.t('Background image failed to load. Tagpad doesn\'t work without background image');
          this.backgroundReady.resolve();
        });
    }
  }

  setBackgroundImage(svgMarkup) {
    const xmlDoc = new DOMParser().parseFromString(svgMarkup, 'image/svg+xml');
    let backgroundSvg = xmlDoc.getElementsByTagName('svg');
    if (!backgroundSvg || !backgroundSvg[0]) {
      console.warn(`Tagpad '${this.component.key}': Background SVG doesn't contain <svg> tag on it`);
      return;
    }
    backgroundSvg = backgroundSvg[0];
    //read initial dimensions from viewBox
    const initialViewBox = backgroundSvg.getAttribute('viewBox');
    let viewBoxMinX, viewBoxMinY, viewBoxWidth, viewBoxHeight;
    if (initialViewBox) {
      [viewBoxMinX, viewBoxMinY, viewBoxWidth, viewBoxHeight] = initialViewBox.split(' ').map(parseFloat);
    }
    else {
      //if viewBox is not defined, use 'x', 'y', 'width' and 'height' SVG attributes (or 0, 0, 640, 480 relatively if any is not defined)
      [viewBoxMinX, viewBoxMinY, viewBoxWidth, viewBoxHeight] = [
        { attribute: 'x', defaultValue: 0 },
        { attribute: 'y', defaultValue: 0 },
        { attribute: 'width', defaultValue: 640 },
        { attribute: 'height', defaultValue: 480 }
      ].map(dimension => {
        return parseFloat(backgroundSvg.getAttribute(dimension.attribute)) || dimension.defaultValue;
      });
    }
    //set initial dimensions to width and height from viewBox of background svg
    this.dimensions = {
      width: viewBoxWidth,
      height: viewBoxHeight,
      minX: viewBoxMinX,
      minY: viewBoxMinY
    };
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

    this.background.innerHTML = svgMarkup;

    //set dimensions for Two.js instance
    this.setEditorSize(this.dimensions.width, this.dimensions.height);
  }

  setEditorSize(width, height) {
    this.two.width = width;
    this.two.height = height;
    this.two.update();
  }

  addDot(coordinate) {
    const dot = {
      coordinate,
      data: {}
    };
    this.dataValue = this.dataValue || [];
    const newDotIndex = this.dataValue.length;
    const shape = this.drawDot(dot, newDotIndex);
    this.dots.push({
      index: newDotIndex,
      dot,
      shape
    });
    this.dataValue.push(dot);
    this.selectDot(newDotIndex);
    this.triggerChange();
  }

  dotClicked(e, dot, index) {
    //prevent drawing another dot near clicked dot
    e.stopPropagation();
    this.selectDot(index);
  }

  selectDot(index) {
    if (index === null) {
      this.empty(this.form);
      this.components = [];
      this.formRendered = false;
      return;
    }
    if (!this.formRendered) {
      this.renderForm();
    }
    const dot = this.dots[index];
    if (!dot) {
      return;
    }
    //remove dashes for previous selected dot
    if (this.dots[this.selectedDotIndex]) {
      this.dots[this.selectedDotIndex].shape.circle.dashes = [0];
    }
    //add dashes to new selected dot
    dot.shape.circle.dashes = [1];
    this.two.update();
    this.selectedDotIndex = index;
    this.setFormValue(dot.dot.data);
    this.checkDotValidity(this.data, false, dot);
  }

  setFormValue(value) {
    this.selectedDotIndexElement.innerHTML = this.selectedDotIndex + 1;
    this.components.forEach(component => {
      component.setValue(_.get(value, component.key), { noUpdateEvent: true });
    });
  }

  updateValue(flags, value) {
    // Intentionally skip over nested component updateValue method to keep recursive update from occurring with sub components.
    return BaseComponent.prototype.updateValue.call(this, flags, value);
  }

  getValue() {
    return this.dataValue;
  }

  setValue(dots) {
    this.dataValue = dots;
    if (!dots) {
      return;
    }
    dots.forEach((dot, index) => {
      const shape = this.drawDot(dot, index);
      this.dots.push({
        index,
        dot,
        shape
      });
    });
    this.selectDot(this.dataValue.length > 0 ? 0 : null);
  }

  drawDot(dot, index) {
    //draw circle
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

  saveSelectedDot() {
    const selectedDot = this.dots[this.selectedDotIndex];
    this.components.forEach(component => {
      selectedDot.dot.data[component.key] = component.getValue();
    });
    this.dataValue[this.selectedDotIndex] = selectedDot.dot;
  }

  removeSelectedDot() {
    this.dataValue.splice(this.selectedDotIndex, 1);
    this.redrawDots();
  }

  redrawDots() {
    this.dots = [];
    //clear canvas
    this.two.clear();
    this.two.render();
    //draw dots
    this.setValue(this.dataValue);
  }

  checkValidity(data, dirty) {
    if (!this.checkCondition(null, data)) {
      this.setCustomValidity('');
      return true;
    }
    let isTagpadValid = true;
    //check validity of each dot
    this.dots.forEach((dot) => {
      const isDotValid = this.checkDotValidity(data, dirty, dot);
      isTagpadValid = isTagpadValid && isDotValid;
    });
    //in the end check validity of selected dot to show its validation results on the form instead of showing last dot validation
    if (this.selectedDotIndex) {
      this.checkDotValidity(data, dirty, this.dots[this.selectedDotIndex]);
    }
    if (isTagpadValid) {
      this.setCustomValidity('');
    }
    else {
      this.setCustomValidity(this.t('There are some invalid dots'), dirty);
    }
    return isTagpadValid;
  }

  checkDotValidity(data, dirty, dot) {
    const isDotValid = this.components.reduce((valid, component) => {
      component.dataValue = dot.dot.data[component.key];
      return valid && component.checkValidity(data, dirty);
    }, true);
    this.setDotValidity(dot, isDotValid);
    return isDotValid;
  }

  setDotValidity(dot, isValid) {
    let color;
    if (isValid) {
      color = this.component.dotStrokeColor;
    }
    else {
      color = '#ff0000';
    }
    //change style of dot based on its validity
    dot.shape.circle.stroke = color;
    dot.shape.text.styles.color = color;
    this.two.update();
  }

  addInputError(message, dirty) {
    //need to override this to not add has-error class (because has-error highlights all inner form-controls with red)
    if (!message) {
      return;
    }

    if (this.errorElement) {
      const errorMessage = this.ce('p', {
        class: 'help-block'
      });
      errorMessage.appendChild(this.text(message));
      this.errorElement.appendChild(errorMessage);
    }

    this.inputs.forEach((input) => this.addClass(this.performInputMapping(input), 'is-invalid'));
    if (dirty && this.options.highlightErrors) {
      this.addClass(this.element, 'alert alert-danger');
    }
  }
}
