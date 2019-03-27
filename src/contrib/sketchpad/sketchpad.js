import Base from '../../components/base/Base';
import Two from 'two.js';
import Picker from 'vanilla-picker';
import _ from 'lodash';

export default class Sketchpad extends Base {
  static schema(...extend) {
    return Base.schema({
      type: 'sketchpad',
      label: 'Sketchpad',
      key: 'sketchpad',
      width: 640,
      height: 480
    }, ...extend);
  }

  constructor(...args) {
    super(...args);
    _.defaults(this.component, {
      width: 640,
      height: 480
    });
    this.deleted = [];
    this.viewSketchpad = {};
    this.editSketchpad = {};

    this.state = {
      mode: Object.keys(this.modes)[0],
      stroke: '#333',
      fill: '#ccc',
      linewidth: 1,
      circleSize: 10
    };

    this.zoomInfo = {
      viewBox: {
        width: this.component.width,
        height: this.component.height,
        minX: 0,
        minY: 0
      },
      multiplier: 1.5,
      totalMultiplier: 1
    };
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
          this.line = this.two.makeLine(coordinate.x, coordinate.y, coordinate.x, coordinate.y);
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

  /**
   * Builds the component.
   */
  build(state) {
    state = state || {};
    this.calculatedValue = state.calculatedValue;

    this.createElement();

    this.createLabel(this.element);

    this.viewSketchpad.canvas = this.ce('div', { class: 'formio-view-sketchpad-canvas' });
    this.viewSketchpad.background = this.ce('div', { class: 'formio-view-sketchpad-background' });
    this.addEventListener(this.viewSketchpad.canvas, 'click', this.editSvg.bind(this));
    this.element.appendChild(this.ce('div', {
      class: 'formio-view-sketchpad-container'
    }, [
      this.viewSketchpad.canvas,
      this.viewSketchpad.background
    ]));
    this.editSketchpad.canvas = this.ce('div', { class: 'formio-edit-sketchpad-canvas' });
    this.editSketchpad.background = this.ce('div', {
      class: 'formio-edit-sketchpad-background',
      style: `min-width: ${this.component.width}px; min-height: ${this.component.height}px;`
    });
    this.two = new Two({
      type: Two.Types.svg,
      width: this.component.width,
      height: this.component.height
    }).appendTo(this.editSketchpad.canvas);

    this.editSvgElement = this.two.renderer.domElement;
    this.addClass(this.editSvgElement, 'formio-sketchpad-svg');

    this.addBackground();

    this.attach();

    // Disable if needed.
    if (this.shouldDisable) {
      this.disabled = true;
    }

    // Restore the value.
    this.restoreValue();

    this.autofocus();

    this.attachLogic();
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
      this.editSketchpad.canvas,
      this.editSketchpad.background
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
    this.editSvgElement
      .addEventListener('mousedown', (e) => {
        e.preventDefault();
        const offset = this.editSvgElement.getBoundingClientRect();
        //change cursor
        let cursor = 'default';
        if (this.modes[this.state.mode].cursor) {
          cursor = this.modes[this.state.mode].cursor.clicked || this.modes[this.state.mode].cursor.hover;
        }
        this.editSvgElement.style.cursor = cursor;
        if (this.modes[this.state.mode].eventStart) {
          this.modes[this.state.mode].eventStart(this.getActualCoordinate({
            x: e.clientX - offset.left,
            y: e.clientY - offset.top
          }));
        }

        const mouseDrag = (e) => {
          e.preventDefault();
          const offset = this.editSvgElement.getBoundingClientRect();
          if (this.modes[this.state.mode].drag) {
            this.modes[this.state.mode].drag(this.getActualCoordinate({
              x: e.clientX - offset.left,
              y: e.clientY - offset.top
            }));
          }
        };

        const mouseEnd = (e) => {
          e.preventDefault();

          this.editSvgElement
            .removeEventListener('mousemove', mouseDrag);
          this.editSvgElement
            .removeEventListener('mouseup', mouseEnd);
          //change cursor
          let cursor = 'default';
          if (this.modes[this.state.mode].cursor) {
            cursor = this.modes[this.state.mode].cursor.hover || cursor;
          }
          this.editSvgElement.style.cursor = cursor;
          const offset = this.editSvgElement.getBoundingClientRect();
          if (this.modes[this.state.mode].eventEnd) {
            this.modes[this.state.mode].eventEnd(this.getActualCoordinate({
              x: e.clientX - offset.left,
              y: e.clientY - offset.top
            }));
          }
        };

        this.editSvgElement
          .addEventListener('mousemove', mouseDrag);

        this.editSvgElement
          .addEventListener('mouseup', mouseEnd);

        return false;
      });

    // Set up touch events.
    this.editSvgElement
      .addEventListener('touchstart', (e) => {
        e.preventDefault();

        const offset = this.editSvgElement.getBoundingClientRect();
        const touch = e.originalEvent.changedTouches[0];
        //change cursor
        let cursor = 'default';
        if (this.modes[this.state.mode].cursor) {
          cursor = this.modes[this.state.mode].cursor.clicked || this.modes[this.state.mode].cursor.hover;
        }
        this.editSvgElement.style.cursor = cursor;
        if (this.modes[this.state.mode].eventStart) {
          this.modes[this.state.mode].eventStart(this.getActualCoordinate({
            x: touch.pageX - offset.left,
            y: touch.pageY - offset.top
          }));
        }

        const touchDrag = (e) => {
          e.preventDefault();

          const offset = this.editSvgElement.getBoundingClientRect();
          const touch = e.originalEvent.changedTouches[0];
          if (this.modes[this.state.mode].drag) {
            this.modes[this.state.mode].drag(this.getActualCoordinate({
              x: touch.pageX - offset.left,
              y: touch.pageY - offset.top
            }));
          }
        };

        const touchEnd = (e) => {
          e.preventDefault();

          this.editSvgElement
            .removeEventListener('touchmove', touchDrag);
          this.editSvgElement
            .removeEventListener('touchend', touchEnd);

          const offset = this.editSvgElement.getBoundingClientRect();
          const touch = e.originalEvent.changedTouches[0];
          //change cursor
          let cursor = 'default';
          if (this.modes[this.state.mode].cursor) {
            cursor = this.modes[this.state.mode].cursor.hover || cursor;
          }
          this.editSvgElement.style.cursor = cursor;
          if (this.modes[this.state.mode].eventEnd) {
            this.modes[this.state.mode].eventEnd(this.getActualCoordinate({
              x: touch.pageX - offset.left,
              y: touch.pageY - offset.top
            }));
          }
        };

        this.editSvgElement
          .addEventListener('touchmove', touchDrag);

        this.editSvgElement
          .addEventListener('touchend', touchEnd);

        return false;
      });

    this.two.update();
  }

  addBackground() {
    if (this.component.image) {
      this.viewSketchpad.background.innerHTML = this.component.image;
      this.editSketchpad.background.innerHTML = this.component.image;
    }
  }

  clear() {
    this.two.clear();
    this.addBackground();
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
    console.log('click', event, index);
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
    this.editSvgElement.style.cursor = _.get(this.modes[this.state.mode], 'cursor.hover', 'default');
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
    if (!this.two) {
      return;
    }
    this.draw(value);
    this.copySvgToView();
  }

  copySvgToView() {
    //clone view SVG element from editor
    const svgElement = this.editSvgElement.cloneNode(true);
    //make view SVG responsive: remove height and width attribute, add viewBox attribute
    svgElement.removeAttribute('height');
    svgElement.removeAttribute('width');
    svgElement.setAttribute('viewBox', `0 0 ${this.component.width} ${this.component.height}`);
    this.viewSketchpad.canvas.innerHTML = '';
    this.viewSketchpad.canvas.appendChild(svgElement);
  }

  zoom(coordinate, multiplier) {
    this.setTotalMultiplier(this.zoomInfo.totalMultiplier * multiplier);
    this.zoomInfo.viewBox.width = Math.round(this.component.width / this.zoomInfo.totalMultiplier);
    this.zoomInfo.viewBox.height = Math.round(this.component.height / this.zoomInfo.totalMultiplier);
    if (this.zoomInfo.viewBox.width > this.component.width && this.zoomInfo.viewBox.height > this.component.height) {
      //if should get less than initial size, change editor size instead of viewBox size
      this.two.width = this.component.width * this.zoomInfo.totalMultiplier;
      this.two.height = this.component.height * this.zoomInfo.totalMultiplier;
      this.two.update();
      this.zoomInfo.viewBox.minX = 0;
      this.zoomInfo.viewBox.minY = 0;
      //reset viewBox value
      this.editSvgElement.setAttribute('viewBox', `0 0 ${this.component.width} ${this.component.height}`);
    }
    else {
      //if should get more than initial size, change viewBox size
      //restore editor size if needed
      if (this.two.width !== this.component.width || this.two.height !== this.component.height) {
        this.two.width = this.component.width;
        this.two.height = this.component.height;
        this.two.update();
      }
      //calculate SVG offset so that coordinate would be center of zoomed image
      this.zoomInfo.viewBox.minX = coordinate.x - this.zoomInfo.viewBox.width / 2;
      this.zoomInfo.viewBox.minY = coordinate.y - this.zoomInfo.viewBox.height / 2;
      this.normalizeSvgOffset();
      this.updateSvgViewBox();
    }
  }

  resetZoom() {
    this.zoom({ x: 0, y: 0 }, 1 / this.zoomInfo.totalMultiplier);
  }

  getActualCoordinate(coordinate) {
    //recalculate coordinate taking into account current zoom
    coordinate.x = (coordinate.x / this.zoomInfo.totalMultiplier) + this.zoomInfo.viewBox.minX;
    coordinate.y = (coordinate.y / this.zoomInfo.totalMultiplier) + this.zoomInfo.viewBox.minY;
    return coordinate;
  }

  dragImage(offset) {
    //calculate new offsets for SVG
    this.zoomInfo.viewBox.minX = this.zoomInfo.viewBox.minX - offset.x;
    this.zoomInfo.viewBox.minY = this.zoomInfo.viewBox.minY - offset.y;
    this.normalizeSvgOffset();
    this.updateSvgViewBox();
  }

  normalizeSvgOffset() {
    //don't let offset go out of SVG on the left and on the top
    this.zoomInfo.viewBox.minX = this.zoomInfo.viewBox.minX < 0 ? 0 : this.zoomInfo.viewBox.minX;
    this.zoomInfo.viewBox.minY = this.zoomInfo.viewBox.minY < 0 ? 0 : this.zoomInfo.viewBox.minY;
    //don't let offset go out of SVG on the right and on the bottom
    const maxOffsetX = this.component.width - this.zoomInfo.viewBox.width,
      maxOffsetY = this.component.height - this.zoomInfo.viewBox.height;
    this.zoomInfo.viewBox.minX = this.zoomInfo.viewBox.minX > (maxOffsetX) ? maxOffsetX : this.zoomInfo.viewBox.minX;
    this.zoomInfo.viewBox.minY = this.zoomInfo.viewBox.minY > (maxOffsetY) ? maxOffsetY : this.zoomInfo.viewBox.minY;
  }

  updateSvgViewBox() {
    //set viewBox so that SVG gets zoomed to the proper area according to zoomInfo
    /* eslint-disable max-len */
    this.editSvgElement.setAttribute('viewBox', `${this.zoomInfo.viewBox.minX} ${this.zoomInfo.viewBox.minY} ${this.zoomInfo.viewBox.width} ${this.zoomInfo.viewBox.height}`);
    /* eslint-enable max-len */
  }

  setTotalMultiplier(multiplier) {
    this.zoomInfo.totalMultiplier = multiplier;
    this.totalMultiplierElement.innerHTML = this.t(Math.round(multiplier * 100) / 100);
  }
}
