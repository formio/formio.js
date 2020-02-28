import Field from './../../components/_classes/field/Field';
import NativePromise from 'native-promise-only';
import getModes from './Sketchpad.modes';
import toolbarButtons from './Sketchpad.toolbar.buttons';
import Formio from '../../Formio';
import Two from 'two.js';
import Picker from 'vanilla-picker';
import _ from 'lodash';

export default class Sketchpad extends Field {
  static get defaultFill() {
    return '#ccc';
  }

  static get defaultStroke() {
    return '#333';
  }

  static get defaultLineWidth() {
    return 1;
  }

  static get defaultCircleSize() {
    return 10;
  }

  useBackgroundDimensions;
  state;
  modes;
  dimensionsMultiplier;
  zoomInfo;
  layers;
  deleted;

  static schema(...extend) {
    return Field.schema({
      type: 'sketchpad',
      label: 'Sketchpad',
      key: 'sketchpad',
      input: true,
      modalEdit: true,
      imageType: 'image',
      defaultZoom: 100,
      defaultStroke: Sketchpad.defaultStroke,
      defaultFill: Sketchpad.defaultFill,
      defaultLineWidth: Sketchpad.defaultLineWidth,
      defaultCircleSize: Sketchpad.defaultCircleSize
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Sketchpad',
      group: 'advanced',
      icon: 'image',
      weight: 110,
      documentation: 'http://help.form.io/userguide/', //TODO add documentation link
      schema: Sketchpad.schema()
    };
  }

  constructor(...args) {
    super(...args);
    const backgroundReadyPromise = new NativePromise((resolve, reject) => {
      this.backgroundReady = { resolve, reject };
    });
    this.backgroundReady.promise = backgroundReadyPromise;

    this.modes = getModes.call(this, Two);

    this.state = {
      mode: Object.keys(this.modes)[0],
      stroke: this.component.defaultStroke || Sketchpad.defaultStroke,
      fill: this.component.defaultFill || Sketchpad.defaultFill,
      linewidth: this.component.defaultLineWidth || Sketchpad.defaultLineWidth,
      circleSize: this.component.defaultCircleSize || Sketchpad.defaultCircleSize
    };

    this.dimensionsMultiplier = 1;
    this.zoomInfo = {
      viewBox: {},
      multiplier: 1.5,
      totalMultiplier: 1
    };

    this.deleted = [];
    this.layers = [];
  }

  render() {
    return super.render(this.renderTemplate(this.templateName, {
      ...this.renderContext
    }));
  }

  init() {}

  attach(element) {
    const superAttach = super.attach(element);
    this.loadRefs(element, {
      canvas: 'single',
      background: 'single',
      backgroundImage: 'single',
      drawingContainer: 'single',
      totalMultiplier: 'single',
      previewContainer: 'single',
      image: 'single',
      ...this.buttonsRefs
    });

    if (this.refs.canvas) {
      this.createDrawingArea();
      this.attachDrawEvents();
      this.addEventListener(window, 'resize', _.debounce(() => this.stretchDrawingArea(), 100));

      if (this.refs.backgroundImage) {
        this.refs.backgroundImage.addEventListener('load', e => {
          this.addBackground();
        });
        this.refs.backgroundImage.setAttribute('src', this.component.imageUrl);
      }
      else {
        this.addBackground();
      }

      this.attachToolbar();
    }

    if (this.componentModal) {
      this.handleModalViewUpdate();
    }

    return superAttach;
  }

  get buttonsRefs() {
    const refsConfig = {};
    Object.values(toolbarButtons).forEach(buttonsGroup => buttonsGroup.forEach(button => {
      refsConfig[button.key] = 'single';
      if (button.input) {
        refsConfig[`${button.key}-input`] ='single';
      }
    }));
    return refsConfig;
  }

  get renderContext() {
    return {
      zoomInfo: {
        totalMultiplier: this.zoomInfo ? Math.round(this.zoomInfo.totalMultiplier * 100) / 100 : 1
      },
      buttonGroups: this.buttonGroups
    };
  }

  get defaultSchema() {
    return Sketchpad.schema();
  }

  get templateName() {
    return 'sketchpad';
  }

  get emptyValue() {
    return [];
  }

  get useBackgroundDimensions() {
    return !this.component.width || !this.component.height;
  }

  get attachFunctions() {
    const setColor = (element, color, onChange) => {
      const picker = new Picker(element);
        element.style.color = color;
        picker.setColor(color, true);
        picker.onChange = (newColor) => {
          element.style.color = newColor.rgbaString;
          onChange(newColor.rgbaString);
        };
        return element;
    };

    const attachInput = (key, value, onChange) => {
      const inputRef = this.refs[key];
      if (inputRef) {
        inputRef.addEventListener('change', e => onChange(e.target.value));
        inputRef.value = value;
      }
    };

    return {
      stroke: (element) => setColor(element, this.state.stroke, (color) => this.state.stroke = color),
      fill: (element) => setColor(element, this.state.fill, (color) => this.state.fill = color),
      width: () => attachInput('width-input', this.state.linewidth, (lineWidth) => this.state.linewidth = lineWidth),
      circle: () => attachInput('circle-input', this.state.circleSize, (circleSize) => this.state.circleSize = circleSize)
    };
  }

  get buttonGroups() {
    return Object.entries(toolbarButtons).map(([, buttons]) => buttons);
  }

  handleModalViewUpdate() {
    this.on('modalViewUpdated', () => {
      this.loadRefs(this.componentModal.openModalWrapper, {
        previewContainer: 'single',
        previewBackground: 'single'
      });

      const setPreviewSvg = () => {
        if (this.refs.previewContainer) {
          this.refs.previewContainer.appendChild(this.getSvg());
        }
      };
      this.refs.previewBackground.onload = () => setPreviewSvg();
      this.refs.previewBackground.setAttribute('src', this.component.imageUrl);
    });
  }

  createDrawingArea() {
    this.two = new Two({ type: Two.Types.svg }).appendTo(this.refs.canvas);
    this.canvasSvg = this.two.renderer.domElement;
    this.addClass(this.canvasSvg, 'formio-sketchpad-svg');
    this.canvasSvg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
  }

  getActualCoordinate(coordinate) {
    // recalculate coordinate taking into account changed size of drawing area
    coordinate.x = Math.round(coordinate.x / this.zoomInfo.totalMultiplier / this.dimensionsMultiplier  + this.zoomInfo.viewBox.current.minX);
    coordinate.y = Math.round(coordinate.y / this.zoomInfo.totalMultiplier / this.dimensionsMultiplier  + this.zoomInfo.viewBox.current.minY);
    return coordinate;
  }

  addBackground() {
    this.backgroundReady.promise.then(() => this.backgroundReady.isReady = true);
    if (this.refs.backgroundImage && this.refs.backgroundImage.complete) {
      this.setBackgroundImage();
    }
    else if (this.component.imageUrl) {
      Formio.makeStaticRequest(this.component.imageUrl, 'GET', null, { noToken: true, headers: {} })
      .then(image => {
        this.setBackgroundImage(image);
      })
      .catch(() => {
        this.refs.background.innerHTML = this.t('Background image failed to load. Tagpad doesn\'t work without background image');
        this.backgroundReady.resolve();
      });
    }
  }

  parseSvg(svgMarkup) {
    const xmlDoc = new DOMParser().parseFromString(svgMarkup, 'image/svg+xml');
    const backgroundSvg = xmlDoc.getElementsByTagName('svg');
    if (!backgroundSvg || !backgroundSvg[0]) {
      return null;
    }
    return backgroundSvg[0];
  }

  prepareSvg(svg) {
    //remove width and height attribute for background image to be stretched to available width and preserve aspect ratio
    svg.removeAttribute('width');
    svg.removeAttribute('height');
    svg.setAttribute('ref', 'backgroundImage');
  }

  setSvgImage(svgMarkup) {
    const backgroundSvg = this.parseSvg(svgMarkup);
    if (!backgroundSvg) {
      console.warn(`Sketchpad '${this.component.key}': Background SVG doesn't contain <svg> tag on it`);
      return;
    }

    //read initial dimensions from viewBox
    const initialViewBox = backgroundSvg.getAttribute('viewBox');
    const dimensions = initialViewBox ? initialViewBox.split(' ').map(parseFloat)
                                      : this.mapDimensionsFromAttributes(backgroundSvg);
    this.setDimensions(...dimensions);
    this.prepareSvg(backgroundSvg);

    const viewBox = this.dimensions;
    this.assignZoomInfo(viewBox);
    this.setViewBoxAttribute(backgroundSvg, viewBox);

    svgMarkup = new XMLSerializer().serializeToString(backgroundSvg);
    //fix weird issue in Chrome when it returned '<svg:svg>...</svg:svg>' string after serialization instead of <svg>...</svg>
    svgMarkup = svgMarkup.replace('<svg:svg', '<svg').replace('</svg:svg>', '</svg>');

    this.refs.background.innerHTML = svgMarkup;
  }

  assignZoomInfo(viewBox) {
    this.zoomInfo.viewBox.default = {
      width: viewBox.width,
      height: viewBox.height,
      minX: viewBox.minX,
      minY: viewBox.minY
    };

    this.zoomInfo.viewBox.current = _.cloneDeep(this.zoomInfo.viewBox.default);
  }

  attachDrawEvents() {
    this.canvasSvg
      .addEventListener('mousedown', (e) => {
        e.preventDefault();
        const offset = this.canvasSvg.getBoundingClientRect();
        //change cursor
        let cursor = 'default';
        if (this.modes[this.state.mode].cursor) {
          cursor = this.modes[this.state.mode].cursor.clicked || this.modes[this.state.mode].cursor.hover;
        }
        this.canvasSvg.style.cursor = cursor;
        if (this.modes[this.state.mode].eventStart) {
          this.modes[this.state.mode].eventStart(this.getActualCoordinate({
            x: e.clientX - offset.left,
            y: e.clientY - offset.top
          }));
        }

        const mouseDrag = (e) => {
          e.preventDefault();
          const offset = this.canvasSvg.getBoundingClientRect();
          if (this.modes[this.state.mode].drag) {
            this.modes[this.state.mode].drag(this.getActualCoordinate({
              x: e.clientX - offset.left,
              y: e.clientY - offset.top
            }));
          }
        };

        const mouseEnd = (e) => {
          e.preventDefault();

          this.canvasSvg.removeEventListener('mousemove', mouseDrag);
          this.canvasSvg.removeEventListener('mouseup', mouseEnd);
          document.removeEventListener('mouseup', mouseEnd);
          //change cursor
          let cursor = 'default';
          if (this.modes[this.state.mode].cursor) {
            cursor = this.modes[this.state.mode].cursor.hover || cursor;
          }
          this.canvasSvg.style.cursor = cursor;
          const offset = this.canvasSvg.getBoundingClientRect();
          if (this.modes[this.state.mode].eventEnd) {
            this.modes[this.state.mode].eventEnd(this.getActualCoordinate({
              x: e.clientX - offset.left,
              y: e.clientY - offset.top
            }));
          }
        };

        this.canvasSvg.addEventListener('mousemove', mouseDrag);
        this.canvasSvg.addEventListener('mouseup', mouseEnd);
        //this is necessary to stop drawing after mouse is up outside of canvas
        document.addEventListener('mouseup', mouseEnd);

        return false;
      });

    // Set up touch events.
    this.canvasSvg
      .addEventListener('touchstart', (e) => {
        e.preventDefault();

        const offset = this.canvasSvg.getBoundingClientRect();
        const touch = e.changedTouches[0];
        //change cursor
        let cursor = 'default';
        if (this.modes[this.state.mode].cursor) {
          cursor = this.modes[this.state.mode].cursor.clicked || this.modes[this.state.mode].cursor.hover;
        }
        this.canvasSvg.style.cursor = cursor;
        if (this.modes[this.state.mode].eventStart) {
          this.modes[this.state.mode].eventStart(this.getActualCoordinate({
            x: touch.pageX - offset.left,
            y: touch.pageY - offset.top
          }));
        }

        const touchDrag = (e) => {
          e.preventDefault();

          const offset = this.canvasSvg.getBoundingClientRect();
          const touch = e.changedTouches[0];
          if (this.modes[this.state.mode].drag) {
            this.modes[this.state.mode].drag(this.getActualCoordinate({
              x: touch.pageX - offset.left,
              y: touch.pageY - offset.top
            }));
          }
        };

        const touchEnd = (e) => {
          e.preventDefault();

          this.canvasSvg
            .removeEventListener('touchmove', touchDrag);
          this.canvasSvg
            .removeEventListener('touchend', touchEnd);

          const offset = this.canvasSvg.getBoundingClientRect();
          const touch = e.changedTouches[0];
          //change cursor
          let cursor = 'default';
          if (this.modes[this.state.mode].cursor) {
            cursor = this.modes[this.state.mode].cursor.hover || cursor;
          }
          this.canvasSvg.style.cursor = cursor;
          if (this.modes[this.state.mode].eventEnd) {
            this.modes[this.state.mode].eventEnd(this.getActualCoordinate({
              x: touch.pageX - offset.left,
              y: touch.pageY - offset.top
            }));
          }
        };

        this.canvasSvg
          .addEventListener('touchmove', touchDrag);

        this.canvasSvg
          .addEventListener('touchend', touchEnd);

        return false;
      });

    this.two.update();
  }

  attachToolbar() {
    this.attachModesButtons();
    this.attachStylesButtons();
    this.attachActionsButtons();
    this.setActiveButton(this.state.mode);
  }

  attachModesButtons() {
    toolbarButtons.modes.forEach(mode => {
      const buttonRef = this.refs[mode.key];

      if (buttonRef && this.modes[mode.key]) {
        const modeConfig = this.modes[mode.key];
        buttonRef.addEventListener('click', e => this.setState(modeConfig.state));
        this.callAttachFunction(buttonRef, mode.key);
      }
    });
  }

  attachStylesButtons() {
    toolbarButtons.styles.forEach(style => {
      const buttonRef = this.refs[style.key];

      if (buttonRef) {
        this.callAttachFunction(buttonRef, style.key);
      }
    });
  }

  attachActionsButtons() {
    toolbarButtons.actions.forEach(action => {
      const buttonRef = this.refs[action.key];

      if (buttonRef) {
        buttonRef.addEventListener('click', () => this[action.key]());
      }
    });
  }

  callAttachFunction(element, key) {
    if (this.attachFunctions[key]) {
      this.attachFunctions[key](element);
    }
  }

  setState(state) {
    Object.assign(this.state, state);
    this.setActiveButton(this.state.mode);
    this.canvasSvg.style.cursor = _.get(this.modes[this.state.mode], 'cursor.hover', 'default');
  }

  setActiveButton(mode) {
    toolbarButtons.modes.forEach(modeButton => {
      this.refs[modeButton.key] &&  this.removeClass(this.refs[modeButton.key], 'active');
      this.refs[mode] && this.addClass(this.refs[mode], 'active');
    });
  }

  setBackgroundImage(image) {
    if (image && image.startsWith('<?xml')) {
      this.imageType = 'svg';
      this.setSvgImage(image);
    }
    else {
      this.imageType = 'image';
      const viewBoxWidth = this.refs.backgroundImage.width;
      const viewBoxHeight = this.refs.backgroundImage.height;
      this.setDimensions( 0, 0, viewBoxWidth, viewBoxHeight);
      this.assignZoomInfo(this.dimensions);
    }

    this.loadRefs(this.refs.background, {
      backgroundImage: 'single'
    });

    //set canvas image viewBox (necessary for canvas SVG to stretch properly without losing correct aspect ration)
    this.setViewBoxAttribute(this.canvasSvg, this.dimensions);
    this.setEditorSize(this.dimensions.width, this.dimensions.height);
    this.backgroundReady.resolve();
  }

  setOpenModalElement() {
    const template = `
      <label class="control-label">${this.component.label}</label><br>
      <button lang='en' class='btn btn-light btn-md open-modal-button' ref='openModal'>Click to draw on the image</button>
      ${this.component.imageUrl ? `<img src=${this.component.imageUrl} width="100%"/>` : ''}
    `;
    this.componentModal.setOpenModalElement(template);
  }

  getModalPreviewTemplate() {
    const template = `
      <label class="control-label">${this.component.label}</label><br>
      <button lang='en' class='btn btn-light btn-md open-modal-button' ref='openModal'>Click to draw on the image</button>
      <div class='formio-sketchpad-modal-preview-container' ref='previewContainer'>
        <img class='formio-sketchpad-modal-preview-background' ref='previewBackground' width="100%"/>
      </div>`;
      return template;
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

  stretchDrawingArea() {
    const width =  this.dimensions.width;
    const height = this.dimensions.height;
    //don't stretch if background dimensions are unknown yet
    if (width && height) {
      const defaultWidth = this.zoomInfo.viewBox.default.width;
      const defaultHeight = this.zoomInfo.viewBox.default.height;
      this.dimensionsMultiplier = width / this.dimensions.width;
      this.dimensions.width = Math.round(defaultWidth * this.dimensionsMultiplier);
      this.dimensions.height = Math.round(defaultHeight * this.dimensionsMultiplier);
      this.setEditorSize(width, height);
    }
  }

  setEditorSize(width, height) {
    this.two.width = width;
    this.two.height = height;
    this.two.update();
    this.refs.backgroundImage.style.width = width;
    this.canvasSvg.style.width = width;
  }

  clear() {
    this.two.clear();
  }

  clearAll() {
    this.layers = [];
    this.dataValue = [];
    this.clear();
    this.two.update();
  }

  draw(value) {
    this.clear();
    this.layers = value.map(item => this.modes[item.mode].draw(item));
    this.two.update();
  }

  undo() {
    const value = this.dataValue.slice();
    if (!value.length) {
      return;
    }
    this.deleted.push(value.pop());
    this.dataValue = value;
    this.triggerChange();
    this.draw(value);
  }

  redo() {
     if (!this.deleted.length) {
      return;
    }
    const value = this.dataValue.slice();
    value.push(this.deleted.pop());
    this.dataValue = value;
    this.triggerChange();
    this.draw(value);
  }

  setValue(value) {
    if (!this.backgroundReady.isReady || !this.two) {
      return;
    }
    this.draw(value);
  }

  getSvg() {
    //clone view SVG element from editor
    const svgElement = this.canvasSvg.cloneNode(true);

    this.addClass(svgElement, 'formio-sketchpad-preview-svg');
    svgElement.removeAttribute('style');
    //set viewBox to default to reset zoom
    const defaultViewBox = this.zoomInfo.viewBox.default;
    this.setViewBoxAttribute(svgElement, defaultViewBox);
    return svgElement;
  }

  normalizeSvgOffset() {
    const viewBox = this.zoomInfo.viewBox;
    //don't let offset go out of SVG on the left and on the top
    this.zoomInfo.viewBox.current.minX = viewBox.current.minX < viewBox.default.minX ? viewBox.default.minX : viewBox.current.minX;
    this.zoomInfo.viewBox.current.minY = viewBox.current.minY < viewBox.default.minY ? viewBox.default.minY : viewBox.current.minY;

    //don't let offset go out of SVG on the right and on the bottom
    const canvasMaxOffsetX = viewBox.default.width - viewBox.current.width + viewBox.default.minX;
    const canvasMaxOffsetY = viewBox.default.height - viewBox.current.height + viewBox.default.minY;
    this.zoomInfo.viewBox.current.minX = viewBox.current.minX > (canvasMaxOffsetX) ? canvasMaxOffsetX : viewBox.current.minX;
    this.zoomInfo.viewBox.current.minY = viewBox.current.minY > (canvasMaxOffsetY) ? canvasMaxOffsetY : viewBox.current.minY;
  }

  setViewBoxAttribute(element, viewBox) {
    element.setAttribute('viewBox', `${viewBox.minX} ${viewBox.minY} ${viewBox.width} ${viewBox.height}`);
  }

  updateSvgViewBox() {
    //set viewBox so that SVG gets zoomed to the proper area according to zoomInfo
    const viewBox = this.zoomInfo.viewBox.current;
    this.setViewBoxAttribute(this.canvasSvg, viewBox);
    if (this.imageType !== 'svg') {
      return;
    }
    this.setViewBoxAttribute( this.refs.backgroundImage, viewBox);
  }

  dragImage(offset) {
    //calculate new offsets for SVG
    this.zoomInfo.viewBox.current.minX = this.zoomInfo.viewBox.current.minX - offset.x;
    this.zoomInfo.viewBox.current.minY = this.zoomInfo.viewBox.current.minY - offset.y;
    this.normalizeSvgOffset();
    this.updateSvgViewBox();
  }

  setTotalMultiplier(multiplier) {
    this.zoomInfo.totalMultiplier = multiplier;
    this.refs.totalMultiplier.innerHTML = this.t(Math.round(multiplier * 100) / 100);
  }

  redraw() {
    super.redraw();
  }

  zoom(coordinate, multiplier) {
    this.setTotalMultiplier(this.zoomInfo.totalMultiplier * multiplier);
    //calculate new viewBox width for canvas
    this.zoomInfo.viewBox.current.width =
      Math.round(this.zoomInfo.viewBox.default.width / this.zoomInfo.totalMultiplier);
    this.zoomInfo.viewBox.current.height =
      Math.round(this.zoomInfo.viewBox.default.height / this.zoomInfo.totalMultiplier);
    if (
      this.zoomInfo.viewBox.current.width > this.zoomInfo.viewBox.default.width &&
      this.zoomInfo.viewBox.current.height > this.zoomInfo.viewBox.default.height
    ) {
      //if should get less than initial size, change editor size instead of viewBox size
      this.setEditorSize(
        this.dimensions.width * this.zoomInfo.totalMultiplier,
        this.dimensions.height * this.zoomInfo.totalMultiplier
      );
      //restore default viewBox values for canvas and background
      this.zoomInfo.viewBox.current = _.cloneDeep(this.zoomInfo.viewBox.default);
    }
    else {
      //if should get more than initial size, change viewBox size
      //restore editor size if needed
      if (this.two.width !== this.dimensions.width || this.two.height !== this.dimensions.height) {
        this.setEditorSize(this.dimensions.width, this.dimensions.height);
      }
      //calculate SVG offset so that coordinate would be center of zoomed image
      this.zoomInfo.viewBox.current.minX = coordinate.x - this.zoomInfo.viewBox.current.width / 2;
      this.zoomInfo.viewBox.current.minY = coordinate.y - this.zoomInfo.viewBox.current.height / 2;
      this.normalizeSvgOffset();
    }
    this.updateSvgViewBox();
  }

  resetZoom() {
    this.zoom({ x: 0, y: 0 }, (this.component.defaultZoom / 100) / this.zoomInfo.totalMultiplier);
  }
}
