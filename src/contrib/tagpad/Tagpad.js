import _ from 'lodash';
import Two from 'two.js';
import NativePromise from 'native-promise-only';
import Formio from '../../Formio';
import NestedArrayComponent from '../../components/_classes/nestedarray/NestedArrayComponent';

export default class TagpadComponent extends NestedArrayComponent {
  static schema(...extend) {
    return NestedArrayComponent.schema({
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
    if (!dataValue || !Array.isArray(dataValue)) {
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

    if (Array.isArray(value)) {
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
    this.createDots(true);
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
        this.refs.background.innerHTML = this.t('Background image failed to load. Tagpad doesn\'t work without background image');
        this.backgroundReady.resolve();
      });
    }
  }

  setBackgroundImage(image) {
    if (image.startsWith('<?xml')) {
      this.imageType = 'svg';
    }
    else {
      this.imageType = 'image';
      const img = this.ce('img', { src: this.component.imageUrl });
      this.refs.background.appendChild(img);
    }

    this.refs.background.addEventListener('click', () => console.log('clicked!'));
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

  createDots(init) {
    const dotsValues = this.dataValue;
  }

  getActualCoordinate(coordinate) {
    if (this.imageType === 'svg') {
      //recalculate coordinate taking into account changed size of drawing area
      coordinate.x = Math.round(coordinate.x / this.dimensionsMultiplier) + this.dimensions.minX;
      coordinate.y = Math.round(coordinate.y / this.dimensionsMultiplier) + this.dimensions.minY;
    }
    return coordinate;
  }

  addDot(coordinate) {
    const dot = {
      coordinate,
      data: {}
    };
    const newDotIndex = this.dataValue.length;
    const shape = {};
    this.drawDot(dot, newDotIndex);
    this.dots.push({
      index: newDotIndex,
      dot,
      shape
    });
    this.dataValue.push(dot);
    this.tagpadForm = this.createFormComponents();
    this.redraw();
    // this.selectDot(newDotIndex);
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

  render(element) {
    return super.render(this.renderTemplate(this.templateName, {
      tagpadForm: this.tagpadForm && this.tagpadForm.map(component => component.render())
    }));
  }

  attach(element) {
    this.loadRefs(element, { canvas: 'single', background: 'single', form: 'single', canvasImage: 'single' });
    const superAttach = super.attach(element);

    if (this.refs.background && this.hasBackgroundImage) {
      this.two = new Two({
        type: Two.Types.svg
      }).appendTo(this.refs.canvas);
      this.canvasSvg = this.two.renderer.domElement;
      this.addBackground();
      this.attachDrawEvents();
    }

    return superAttach;
  }

  get hasBackgroundImage() {
    return this.component.image || this.component.imageUrl;
  }

  focus() {
    return this.refs.canvas && this.refs.canvas.focus();
  }

  setValue(value) {
    this.dataValue = value;
  }

  getValueAsString() { } //TODO: Think about how data should be displayed as string
}
