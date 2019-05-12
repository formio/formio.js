import Base from '../../components/base/Base';
import Two from 'two.js';
import Picker from 'vanilla-picker';
import _ from 'lodash';
import Formio from '../../Formio';
import editForm from './Sketchpad.form';

export default class Sketchpad extends Base {
  static schema(...extend) {
    return Base.schema({
      type: 'sketchpad',
      label: 'Sketchpad',
      key: 'sketchpad',
      defaultZoom: 100
    }, ...extend);
  }

  static builderInfo = {
    title: 'Sketchpad',
    group: 'advanced',
    icon: 'fa fa-image',
    weight: 110,
    documentation: 'http://help.form.io/userguide/',
    schema: Sketchpad.schema()
  }

  static editForm = editForm

  constructor(...args) {
    super(...args);
    _.defaults(this.component, {
      defaultZoom: 100
    });
    this.deleted = [];
    this.viewSketchpad = {
      canvas: {},
      background: {}
    };
    this.editSketchpad = {
      canvas: {},
      background: {}
    };
    //will use dimensions from background viewBox if either width or height is not defined for component
    //TODO maybe change this criteria to AND instead of OR, use defined dimension and default another missing dimension to value from viewBox (in this case will need to use promise in case of any missing dimension
    this.useBackgroundDimensions = !this.component.width || !this.component.height;
    //initialize backgroundReady promise
    const backgroundReadyPromise = new Promise((resolve, reject) => {
      this.backgroundReady = {
        resolve,
        reject
      };
    });
    this.backgroundReady.promise = backgroundReadyPromise;
    //default state of SVG editor
    this.state = {
      mode: Object.keys(this.modes)[0],
      stroke: '#333',
      fill: '#ccc',
      linewidth: 1,
      circleSize: 10
    };

    this.zoomInfo = {
      viewBox: {},
      multiplier: 1.5,
      totalMultiplier: 1
    };
  }

  /**
   * Builds the component.
   */
  build(state) {
    state = state || {};
    this.calculatedValue = state.calculatedValue;

    this.createElement();

    this.createLabel(this.element);

    this.viewSketchpad.canvas.container = this.ce('div', { class: 'formio-view-sketchpad-canvas' });
    this.viewSketchpad.background.container = this.ce('div', { class: 'formio-view-sketchpad-background' });
    this.addEventListener(this.viewSketchpad.canvas.container, 'click', this.editSvg.bind(this));
    this.element.appendChild(this.ce('div', {
      class: 'formio-view-sketchpad-container'
    }, [
      this.viewSketchpad.canvas.container,
      this.viewSketchpad.background.container
    ]));
    this.editSketchpad.canvas.container = this.ce('div', { class: 'formio-edit-sketchpad-canvas' });
    this.editSketchpad.background.container = this.ce('div', {
      class: 'formio-edit-sketchpad-background'
    });
    //init two instance
    this.two = new Two({
      type: Two.Types.svg,
    }).appendTo(this.editSketchpad.canvas.container);
    //init canvas SVG variable
    this.editSketchpad.canvas.svg = this.two.renderer.domElement;
    this.addClass(this.editSketchpad.canvas.svg, 'formio-sketchpad-svg');

    this.addBackground();
    this.backgroundReady.promise.then(() => {
      this.backgroundReady.isReady = true;
      this.attach();
      // Disable if needed.
      if (this.shouldDisable) {
        this.disabled = true;
      }

      // Restore the value.
      this.restoreValue();

      this.autofocus();

      this.attachLogic();
    });
  }

  getValue() {
    return this.dataValue;
  }

  get emptyValue() {
    return [];
  }

  get modes() {
    return {
      pencil: {
        icon: 'pencil',
        title: 'Pencil',
        state: {
          mode: 'pencil'
        },
        eventStart: (coordinate) => {
          this.points = [coordinate];
          this.prev = coordinate;
          this.curve = this.two.makeCurve([
            new Two.Vector(this.prev.x, this.prev.y),
            new Two.Vector(coordinate.x, coordinate.y + 1)
          ], true);
          this.curve.noFill().stroke = this.state.stroke;
          this.curve.linewidth = this.state.linewidth;
          this.curve.vertices.forEach((v) => v.addSelf(this.curve.translation));
          this.curve.translation.clear();
          this.two.update();
          this.layers.push(this.curve);
          this.curve._renderer.elem.addEventListener('click', (e) => this.click(e, this.layers.length));
        },
        drag: (coordinate) => {
          this.points.push(coordinate);
          this.curve.vertices.push(new Two.Vector(coordinate.x, coordinate.y));
          this.two.update();
          this.prev = coordinate;
        },
        eventEnd: () => {
          const value = this.editValue.slice();
          value.push(Object.assign({}, this.state, { points: this.points }));
          this.editValue = value;
          this.triggerChange();
        },
        draw: (state) => {
          const layer = this.two.makeCurve(state.points.map(point => new Two.Vector(point.x, point.y)), true);
          layer.noFill().stroke = state.stroke;
          layer.linewidth = state.linewidth;
          layer.vertices.forEach((v) => v.addSelf(layer.translation));
          layer.translation.clear();
          return layer;
        }
      },
      line: {
        icon: 'minus',
        title: 'Line',
        state: {
          mode: 'line'
        },
        eventStart: (coordinate) => {
          this.center = coordinate;
          this.line = this.two.makeLine(
            coordinate.x,
            coordinate.y,
            coordinate.x,
            coordinate.y
          );
          this.line.fill = this.state.fill;
          this.line.stroke = this.state.stroke;
          this.line.linewidth = this.state.linewidth;
          this.two.update();
          this.layers.push(this.line);
          const index = this.layers.length - 1;
          this.line._renderer.elem.addEventListener('click', (e) => this.click(e, index));
        },
        drag: (coordinate) => {
          this.line.vertices[1].x = coordinate.x;
          this.line.vertices[1].y = coordinate.y;
          this.two.update();
        },
        eventEnd: () => {
          const value = this.editValue.slice();
          const vertices = this.line.vertices.map(vertice => {
            return {
              x: vertice.x,
              y: vertice.y
            };
          });
          value.push(Object.assign({}, this.state, { vertices: vertices }));
          this.editValue = value;
          this.triggerChange();
        },
        draw: (state) => {
          const layer = this.two.makeLine(
            state.vertices[0].x,
            state.vertices[0].y,
            state.vertices[1].x,
            state.vertices[1].y
          );
          layer.fill = state.fill;
          layer.stroke = state.stroke;
          layer.linewidth = state.linewidth;
          return layer;
        }
      },
      circle: {
        icon: 'circle',
        title: 'Circle',
        state: {
          mode: 'circle'
        },
        eventStart: (coordinate) => {
          this.center = coordinate;
          const layer = this.two.makeCircle(coordinate.x, coordinate.y, this.state.circleSize);
          layer.fill = this.state.fill;
          layer.stroke = this.state.stroke;
          layer.linewidth = this.state.linewidth;
          this.two.update();
          this.layers.push(layer);
          const index = this.layers.length - 1;
          layer._renderer.elem.addEventListener('click', (e) => this.click(e, index));
        },
        drag: () => {

        },
        eventEnd: () => {
          const value = this.editValue.slice();
          value.push(Object.assign({}, this.state, { center: this.center }));
          this.editValue = value;
          this.triggerChange();
        },
        draw: (state) => {
          const layer = this.two.makeCircle(state.center.x, state.center.y, state.circleSize);
          layer.fill = state.fill;
          layer.stroke = state.stroke;
          layer.linewidth = state.linewidth;
          return layer;
        },
        attach: (element) => {
          const radiusInput = this.ce('input', {
            type: 'number',
            class: 'formio-sketchpad-toolbar-input formio-sketchpad-radius-input',
            onChange: (e) => {
              this.state.circleSize = e.target.value;
            }
          });
          radiusInput.value = this.state.circleSize;
          element.appendChild(radiusInput);
          return element;
        }
      },
      rectangle: {
        icon: 'square-o',
        cursor: {
          hover: 'crosshair'
        },
        title: 'Rectangle',
        state: {
          mode: 'rectangle'
        },
        eventStart: (coordinate) => {
          this.dragStartPoint = coordinate;
        },
        drag: (coordinate) => {
          this.dragEndPoint = coordinate;
          if (this.rectangle) {
            this.rectangle.remove();
          }
          this.width = Math.abs(this.dragEndPoint.x - this.dragStartPoint.x);
          this.height = Math.abs(this.dragEndPoint.y - this.dragStartPoint.y);
          this.center = {
            x: Math.min(this.dragStartPoint.x, this.dragEndPoint.x) + this.width / 2,
            y: Math.min(this.dragStartPoint.y, this.dragEndPoint.y) + this.height / 2
          };
          this.rectangle = this.two.makeRectangle(this.center.x, this.center.y, this.width, this.height);
          this.rectangle.fill = this.state.fill;
          this.rectangle.stroke = this.state.stroke;
          this.rectangle.linewidth = this.state.linewidth;
          this.two.update();
          this.layers.push(this.rectangle);
          const index = this.layers.length - 1;
          this.rectangle._renderer.elem.addEventListener('click', (e) => this.click(e, index));
        },
        eventEnd: () => {
          const value = this.editValue.slice();
          delete this.rectangle;
          const rectangleState = {
            center: this.center,
            width: this.width,
            height: this.height
          };
          value.push(Object.assign({}, this.state, rectangleState));
          this.editValue = value;
          this.triggerChange();
        },
        draw: (state) => {
          const layer = this.two.makeRectangle(state.center.x, state.center.y, state.width, state.height);
          layer.fill = state.fill;
          layer.stroke = state.stroke;
          layer.linewidth = state.linewidth;
          return layer;
        },
      },
      zoomIn: {
        icon: 'search-plus',
        cursor: {
          hover: 'zoom-in'
        },
        title: 'Zoom In',
        state: {
          mode: 'zoomIn'
        },
        eventStart: (coordinate) => {
          this.zoom(coordinate, this.zoomInfo.multiplier);
        }
      },
      zoomOut: {
        icon: 'search-minus',
        cursor: {
          hover: 'zoom-out'
        },
        title: 'Zoom Out',
        state: {
          mode: 'zoomOut'
        },
        eventStart: (coordinate) => {
          this.zoom(coordinate, 1 / this.zoomInfo.multiplier);
        }
      },
      drag: {
        icon: 'hand-paper-o',
        title: 'Drag Zoomed Image',
        cursor: {
          hover: 'grab',
          clicked: 'grabbing'
        },
        state: {
          mode: 'drag'
        },
        eventStart: (coordinate) => {
          this.dragStartPoint = coordinate;
        },
        drag: (coordinate) => {
          if (!this.dragLastPoint) {
            this.dragLastPoint = this.dragStartPoint;
          }
          const offset = {
            x: Math.round(coordinate.x - this.dragStartPoint.x),
            y: Math.round(coordinate.y - this.dragStartPoint.y)
          };
          if (offset.x !== 0 || offset.y !== 0) {
            this.dragImage(offset);
            this.dragLastPoint = coordinate;
          }
        }
      }
    };
  }

  get styles() {
    return [
      {
        icon: 'square-o',
        title: 'Stroke Color',
        type: 'colorpicker',
        property: 'stroke',
        attach: (element) => {
          const picker = new Picker(element);
          picker.setColor(this.state.stroke, true);
          picker.onChange = (color) => {
            this.state.stroke = color.rgbaString;
            element.style.color = color.rgbaString;
          };
          return element;
        }
      },
      {
        icon: 'square',
        title: 'Fill Color',
        type: 'colorpicker',
        property: 'fill',
        attach: (element) => {
          const picker = new Picker(element);
          picker.setColor(this.state.fill, true);
          picker.onChange = (color) => {
            this.state.fill = color.rgbaString;
            element.style.color = color.rgbaString;
          };
          return element;
        }
      },
      {
        icon: 'minus',
        title: 'Line Width',
        type: 'number',
        property: 'linewidth',
        attach: (element) => {
          const widthInput = this.ce('input', {
            type: 'number',
            class: 'formio-sketchpad-toolbar-input formio-sketchpad-linewidth-input',
            onChange: (e) => {
              this.state.linewidth = e.target.value;
            }
          });
          widthInput.value = this.state.linewidth;
          element.appendChild(widthInput);
          return element;
        }
      }
    ];
  }

  get actions() {
    return [
      {
        icon: 'undo',
        action: 'undo',
        title: 'Undo'
      },
      {
        icon: 'repeat',
        action: 'redo',
        title: 'Redo'
      },
      {
        icon: 'search',
        action: 'resetZoom',
        title: 'Reset Zoom'
      },
      {
        icon: 'ban',
        action: 'clearAll',
        title: 'Clear All'
      }
    ];
  }

  editSvg() {
    if (this.options.readOnly) {
      return;
    }
    //open editor in modal
    this.editorModal = this.createModal();
    this.addClass(this.editorModal, 'formio-sketchpad-edit-dialog');
    this.addClass(this.editorModal.body, 'formio-sketchpad-edit-dialog-body');
    const toolbar = this.createToolbar();
    const metaInfoContainer = this.ce('div',
      {
        class: 'formio-sketchpad-meta-info'
      },
      this.ce('span',
        {},
        [
          this.totalMultiplierElement = this.ce('span', {},
            this.t(Math.round(this.zoomInfo.totalMultiplier) * 100) / 100
          ),
          this.t('x')
        ]
      )
    );
    this.editorModal.body.appendChild(toolbar);
    this.editorModal.body.appendChild(this.ce('div', {
      class: 'formio-edit-sketchpad-container'
    }, [
      this.editSketchpad.canvas.container,
      this.editSketchpad.background.container
    ]));
    this.editorModal.body.appendChild(metaInfoContainer);
    this.saveSvgButton = this.ce('button', {
      class: 'btn btn-success formio-sketchpad-save-button'
    }, this.t('Save'));
    this.addEventListener(this.saveSvgButton, 'click', () => {
      this.saveSvg();
      this.editorModal.close(true);
    });
    this.editorModal.body.appendChild(this.saveSvgButton);
    this.editValue = _.cloneDeep(this.dataValue);
    this.draw(this.editValue);
    const initialDialogClose = this.editorModal.close;
    this.editorModal.close = (ignoreWarning) => {
      if (ignoreWarning || confirm('Are you sure you want to close? Your unsaved progress will be lost')) {
        this.resetZoom();
        initialDialogClose();
      }
    };
    this.resetZoom();
  }

  saveSvg() {
    this.dataValue = this.editValue;
    this.copySvgToView();
  }

  createToolbar() {
    /* eslint-disable max-len */
    return this.ce('div', {
      class: 'btn-toolbar formio-sketchpad-toolbar',
      role: 'toolbar'
    }, [
      this.ce('div', {
          class: 'btn-group formio-sketchpad-toolbar-group',
          role: 'group'
        },
        this.modeButtons = Object.keys(this.modes).map(key => {
          const mode = this.modes[key];
          const toolbarButton = this.ce('div', {
            class: `btn btn-secondary formio-sketchpad-toolbar-button formio-sketchpad-toolbar-button-${key} ${this.state.mode === mode.state.mode ? ' active' : ''}`,
            onClick: () => this.setState(mode.state),
            title: mode.title
          }, this.ce('i', {
            class: `fa fa-${mode.icon}`,
          }));
          if (mode.attach) {
            return mode.attach(toolbarButton);
          }
          return toolbarButton;
        }),
      ),
      this.ce('div', {
          class: 'btn-group formio-sketchpad-toolbar-group',
          role: 'group'
        },
        this.styles.map(button => {
          const toolbarButtonIcon = this.ce('i', {
            class: `fa fa-${button.icon}`,
          });
          const toolbarButton = this.ce('div', {
            class: `btn btn-secondary formio-sketchpad-toolbar-button formio-sketchpad-toolbar-button-${button.property}`,
            title: button.title
          }, toolbarButtonIcon);
          if (button.attach) {
            return button.attach(toolbarButton);
          }
          return toolbarButton;
        }),
      ),
      this.ce('div', {
          class: 'btn-group float-right formio-sketchpad-toolbar-group',
          role: 'group'
        },
        this.actions.map(button => this.ce('div', {
          class: `btn btn-secondary formio-sketchpad-toolbar-button formio-sketchpad-toolbar-button-${button.action}`,
          onClick: () => this[button.action](),
          title: button.title
        }, this.ce('i', {
          class: `fa fa-${button.icon}`,
        }))),
      ),
    ]);
    /* eslint-enable max-len */
  }

  attach() {
    // Set up mouse events.
    this.editSketchpad.canvas.svg
      .addEventListener('mousedown', (e) => {
        e.preventDefault();
        const offset = this.editSketchpad.canvas.svg.getBoundingClientRect();
        //change cursor
        let cursor = 'default';
        if (this.modes[this.state.mode].cursor) {
          cursor = this.modes[this.state.mode].cursor.clicked || this.modes[this.state.mode].cursor.hover;
        }
        this.editSketchpad.canvas.svg.style.cursor = cursor;
        if (this.modes[this.state.mode].eventStart) {
          this.modes[this.state.mode].eventStart(this.getActualCoordinates({
            x: e.clientX - offset.left,
            y: e.clientY - offset.top
          }));
        }

        const mouseDrag = (e) => {
          e.preventDefault();
          const offset = this.editSketchpad.canvas.svg.getBoundingClientRect();
          if (this.modes[this.state.mode].drag) {
            this.modes[this.state.mode].drag(this.getActualCoordinates({
              x: e.clientX - offset.left,
              y: e.clientY - offset.top
            }));
          }
        };

        const mouseEnd = (e) => {
          e.preventDefault();

          this.editSketchpad.canvas.svg
            .removeEventListener('mousemove', mouseDrag);
          this.editSketchpad.canvas.svg
            .removeEventListener('mouseup', mouseEnd);
          //change cursor
          let cursor = 'default';
          if (this.modes[this.state.mode].cursor) {
            cursor = this.modes[this.state.mode].cursor.hover || cursor;
          }
          this.editSketchpad.canvas.svg.style.cursor = cursor;
          const offset = this.editSketchpad.canvas.svg.getBoundingClientRect();
          if (this.modes[this.state.mode].eventEnd) {
            this.modes[this.state.mode].eventEnd(this.getActualCoordinates({
              x: e.clientX - offset.left,
              y: e.clientY - offset.top
            }));
          }
        };

        this.editSketchpad.canvas.svg
          .addEventListener('mousemove', mouseDrag);

        this.editSketchpad.canvas.svg
          .addEventListener('mouseup', mouseEnd);

        return false;
      });

    // Set up touch events.
    this.editSketchpad.canvas.svg
      .addEventListener('touchstart', (e) => {
        e.preventDefault();

        const offset = this.editSketchpad.canvas.svg.getBoundingClientRect();
        const touch = e.changedTouches[0];
        //change cursor
        let cursor = 'default';
        if (this.modes[this.state.mode].cursor) {
          cursor = this.modes[this.state.mode].cursor.clicked || this.modes[this.state.mode].cursor.hover;
        }
        this.editSketchpad.canvas.svg.style.cursor = cursor;
        if (this.modes[this.state.mode].eventStart) {
          this.modes[this.state.mode].eventStart(this.getActualCoordinates({
            x: touch.pageX - offset.left,
            y: touch.pageY - offset.top
          }));
        }

        const touchDrag = (e) => {
          e.preventDefault();

          const offset = this.editSketchpad.canvas.svg.getBoundingClientRect();
          const touch = e.changedTouches[0];
          if (this.modes[this.state.mode].drag) {
            this.modes[this.state.mode].drag(this.getActualCoordinates({
              x: touch.pageX - offset.left,
              y: touch.pageY - offset.top
            }));
          }
        };

        const touchEnd = (e) => {
          e.preventDefault();

          this.editSketchpad.canvas.svg
            .removeEventListener('touchmove', touchDrag);
          this.editSketchpad.canvas.svg
            .removeEventListener('touchend', touchEnd);

          const offset = this.editSketchpad.canvas.svg.getBoundingClientRect();
          const touch = e.changedTouches[0];
          //change cursor
          let cursor = 'default';
          if (this.modes[this.state.mode].cursor) {
            cursor = this.modes[this.state.mode].cursor.hover || cursor;
          }
          this.editSketchpad.canvas.svg.style.cursor = cursor;
          if (this.modes[this.state.mode].eventEnd) {
            this.modes[this.state.mode].eventEnd(this.getActualCoordinates({
              x: touch.pageX - offset.left,
              y: touch.pageY - offset.top
            }));
          }
        };

        this.editSketchpad.canvas.svg
          .addEventListener('touchmove', touchDrag);

        this.editSketchpad.canvas.svg
          .addEventListener('touchend', touchEnd);

        return false;
      });

    this.two.update();
  }

  get dataReady() {
    return this.backgroundReady.promise;
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
          console.warn(`Sketchpad background didn't load for component: ${this.component.key}`);
          this.backgroundReady.resolve();
        });
    }
    //TODO make sure component works without background
  }

  /* eslint-disable max-statements */
  setBackgroundImage(svgMarkup) {
    const xmlDoc = new DOMParser().parseFromString(svgMarkup, 'image/svg+xml');
    let backgroundSvg = xmlDoc.getElementsByTagName('svg');
    if (!backgroundSvg || !backgroundSvg[0]) {
      console.warn(`Sketchpad '${this.component.key}': Background SVG doesn't contain <svg> tag on it`);
      return;
    }
    backgroundSvg = backgroundSvg[0];
    if (this.useBackgroundDimensions) {
      const viewBox = backgroundSvg.getAttribute('viewBox');
      let viewBoxMinX, viewBoxMinY, viewBoxWidth, viewBoxHeight;
      if (viewBox) {
        [viewBoxMinX, viewBoxMinY, viewBoxWidth, viewBoxHeight] = viewBox.split(' ').map(parseFloat);
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
      //set  dimensions to width and height from viewBox of background svg
      this.dimensions = {
        width: viewBoxWidth,
        height: viewBoxHeight
      };
      //set default and current viewBox sizes for canvas and background (should be based on background)
      this.zoomInfo.viewBox.default = {
        width: this.dimensions.width,
        height: this.dimensions.height,
        minX: viewBoxMinX,
        minY: viewBoxMinY
      };
    }
    else {
      //set dimensions to component width and height
      this.dimensions = {
        width: this.component.width,
        height: this.component.height
      };
      let viewBoxValue = backgroundSvg.getAttribute('viewBox');

      if (!viewBoxValue) {
        // since zooming works based on viewBox, we need to have explicitly defined value for it
        // if viewBox is not defined on SVG element, browser behaves like it's equal to "0 0 <current_width> <current_height>"
        // since background image should match dimensions of editor image, current width and height will always be equal to component.width and component.height
        // as a result:
        viewBoxValue = `0 0 ${this.dimensions.width} ${this.dimensions.height}`;
        backgroundSvg.setAttribute('viewBox', viewBoxValue);
      }
      let [initialMinX, initialMinY, initialWidth, initialHeight] = viewBoxValue.split(' ').map(parseFloat);
      initialMinX = initialMinX || 0;
      initialMinY = initialMinY || 0;
      initialWidth = initialWidth || this.dimensions.width;
      initialHeight = initialHeight || this.dimensions.height;
      const width = this.dimensions.width,
        height = this.dimensions.height,
        minX = Math.round(initialMinX - (this.dimensions.width - initialWidth) / 2),
        minY = Math.round(initialMinY - (this.dimensions.height - initialHeight) / 2);
      //set initial zoom info for SVG
      this.zoomInfo.viewBox.default = {
        width: width,
        height: height,
        minX: minX,
        minY: minY
      };
    }
    //set current zoom to default
    this.zoomInfo.viewBox.current = _.cloneDeep(this.zoomInfo.viewBox.default);

    svgMarkup =  new XMLSerializer().serializeToString(backgroundSvg);
    //fix weird issue in Chrome when it retured '<svg:svg>...</svg:svg>' string after serialization instead of <svg>...</svg>
    svgMarkup = svgMarkup.replace('<svg:svg', '<svg').replace('</svg:svg>', '</svg>');

    this.editSketchpad.background.container.style['min-width'] = `${this.dimensions.width}px`;
    this.editSketchpad.background.container.style['min-height'] = `${this.dimensions.height}px`;

    //set background containers content to SVG markup
    this.viewSketchpad.background.container.innerHTML = svgMarkup;
    this.editSketchpad.background.container.innerHTML = svgMarkup;
    //init svg variables
    this.viewSketchpad.background.svg = this.viewSketchpad.background.container.firstElementChild;
    this.editSketchpad.background.svg = this.editSketchpad.background.container.firstElementChild;

    //set background image viewBox
    const viewBox = this.zoomInfo.viewBox.current;
    this.viewSketchpad.background.svg.setAttribute('viewBox', `${viewBox.minX} ${viewBox.minY} ${viewBox.width} ${viewBox.height}`);
    this.editSketchpad.background.svg.setAttribute('viewBox', `${viewBox.minX} ${viewBox.minY} ${viewBox.width} ${viewBox.height}`);
    //set canvas image viewBox (necessary at least for useBackgroundDimensions when background image has minX and minY other that 0
    this.editSketchpad.canvas.svg.setAttribute('viewBox', `${viewBox.minX} ${viewBox.minY} ${viewBox.width} ${viewBox.height}`);

    //set dimensions for Two.js instance
    this.setEditorSize(this.dimensions.width, this.dimensions.height);
  }
  /* eslint-enable max-statements */

  clear() {
    this.two.clear();
  }

  clearAll() {
    this.layers = [];
    this.editValue = [];
    this.clear();
    this.two.update();
  }

  draw(value) {
    this.clear();
    const layers = value.map(item => this.modes[item.mode].draw(item));
    this.two.update();
    this.layers = layers;
    if (layers.length) {
      layers.forEach((layer, index) => {
        layer._renderer.elem.addEventListener('click', (e) => this.click(e, index));
      });
    }
  }

  click(event, index) {
    console.log(event, index);
  }

  undo() {
    const value = this.editValue.slice();
    if (value.length === 0) {
      return;
    }
    this.deleted.push(value.pop());
    this.editValue = value;
    this.triggerChange();
    this.draw(value);
  }

  redo() {
    if (this.deleted.length === 0) {
      return;
    }
    const value = this.editValue.slice();
    value.push(this.deleted.pop());
    this.editValue = value;
    this.triggerChange();
    this.draw(value);
  }

  setState(state) {
    Object.assign(this.state, state);
    this.setActiveButton(this.state.mode);
    //change cursor
    this.editSketchpad.canvas.svg.style.cursor = _.get(this.modes[this.state.mode], 'cursor.hover', 'default');
  }

  setActiveButton(mode) {
    this.modeButtons.forEach(button => this.removeClass(button, 'active'));
    Object.keys(this.modes).forEach((key, index) => {
      if (this.modes[key].state.mode === mode) {
        this.addClass(this.modeButtons[index], 'active');
      }
    });
  }

  setValue(value) {
    if (!this.backgroundReady.isReady || !this.two) {
      return;
    }
    this.draw(value);
    this.copySvgToView();
  }

  copySvgToView() {
    //clone view SVG element from editor
    const svgElement = this.editSketchpad.canvas.svg.cloneNode(true);
    //make view SVG responsive: remove height and width attribute, add viewBox attribute
    svgElement.removeAttribute('height');
    svgElement.removeAttribute('width');
    svgElement.style.cursor = 'pointer';
    //set viewBox to default to reset zoom
    const viewBox = this.zoomInfo.viewBox.default;
    svgElement.setAttribute('viewBox', `${viewBox.minX} ${viewBox.minY} ${viewBox.width} ${viewBox.height}`);
    this.viewSketchpad.canvas.container.innerHTML = '';
    this.viewSketchpad.canvas.container.appendChild(svgElement);
  }

  zoom(coordinate, multiplier) {
    this.setTotalMultiplier(this.zoomInfo.totalMultiplier * multiplier);
    //calculate new viewBox width for canvas
    this.zoomInfo.viewBox.current.width =
      Math.round(this.zoomInfo.viewBox.default.width / this.zoomInfo.totalMultiplier);
    this.zoomInfo.viewBox.current.height =
      Math.round(this.zoomInfo.viewBox.default.height / this.zoomInfo.totalMultiplier);
    if (
      this.zoomInfo.viewBox.current.width > this.dimensions.width &&
      this.zoomInfo.viewBox.current.height > this.dimensions.height
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

  getActualCoordinates(coordinate) {
    //recalculate coordinate taking into account current zoom
    coordinate.x = Math.round((coordinate.x / this.zoomInfo.totalMultiplier) + this.zoomInfo.viewBox.current.minX);
    coordinate.y = Math.round((coordinate.y / this.zoomInfo.totalMultiplier) + this.zoomInfo.viewBox.current.minY);
    return coordinate;
  }

  dragImage(offset) {
    //calculate new offsets for SVG
    this.zoomInfo.viewBox.current.minX = this.zoomInfo.viewBox.current.minX - offset.x;
    this.zoomInfo.viewBox.current.minY = this.zoomInfo.viewBox.current.minY - offset.y;
    this.normalizeSvgOffset();
    this.updateSvgViewBox();
  }

  normalizeSvgOffset() {
    /* eslint-disable max-len */
    //don't let offset go out of SVG on the left and on the top
    //canvas
    this.zoomInfo.viewBox.current.minX = this.zoomInfo.viewBox.current.minX < this.zoomInfo.viewBox.default.minX ? this.zoomInfo.viewBox.default.minX : this.zoomInfo.viewBox.current.minX;
    this.zoomInfo.viewBox.current.minY = this.zoomInfo.viewBox.current.minY < this.zoomInfo.viewBox.default.minY ? this.zoomInfo.viewBox.default.minY : this.zoomInfo.viewBox.current.minY;
    //don't let offset go out of SVG on the right and on the bottom
    //canvas
    const canvasMaxOffsetX = this.zoomInfo.viewBox.default.width - this.zoomInfo.viewBox.current.width + this.zoomInfo.viewBox.default.minX,
      canvasMaxOffsetY = this.zoomInfo.viewBox.default.height - this.zoomInfo.viewBox.current.height + this.zoomInfo.viewBox.default.minY;
    this.zoomInfo.viewBox.current.minX = this.zoomInfo.viewBox.current.minX > (canvasMaxOffsetX) ? canvasMaxOffsetX : this.zoomInfo.viewBox.current.minX;
    this.zoomInfo.viewBox.current.minY = this.zoomInfo.viewBox.current.minY > (canvasMaxOffsetY) ? canvasMaxOffsetY : this.zoomInfo.viewBox.current.minY;
    /* eslint-enable max-len */
  }

  updateSvgViewBox() {
    //set viewBox so that SVG gets zoomed to the proper area according to zoomInfo
    const viewBox = this.zoomInfo.viewBox.current;
    this.editSketchpad.canvas.svg.setAttribute('viewBox', `${viewBox.minX} ${viewBox.minY} ${viewBox.width} ${viewBox.height}`);
    this.editSketchpad.background.svg.setAttribute('viewBox', `${viewBox.minX} ${viewBox.minY} ${viewBox.width} ${viewBox.height}`);
  }

  setTotalMultiplier(multiplier) {
    this.zoomInfo.totalMultiplier = multiplier;
    this.totalMultiplierElement.innerHTML = this.t(Math.round(multiplier * 100) / 100);
  }

  setEditorSize(width, height) {
    this.two.width = width;
    this.two.height = height;
    this.two.update();
    //change width of background svg so it matches editor SVG
    this.editSketchpad.background.svg.style.width = width;
    this.editSketchpad.background.svg.style.height = height;
    this.editSketchpad.background.container.style['min-width'] = width;
    this.editSketchpad.background.container.style['min-height'] = height;
  }
}
