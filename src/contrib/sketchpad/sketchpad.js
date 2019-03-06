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
    this.deleted = [];

    this.state = {
      mode: Object.keys(this.modes)[0],
      stroke: '#333',
      fill: '#ccc',
      linewidth: 1,
      circleSize: 10
    };

    _.defaults(this.component, {
      width: 640,
      height: 480
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
          this.curve = this.two.makeCurve([new Two.Vector(this.prev.x, this.prev.y), new Two.Vector(coordinate.x, coordinate.y + 1)], true);
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
          const layer = this.two.makeLine(state.vertices[0].x, state.vertices[0].y, state.vertices[1].x, state.vertices[1].y);
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

    this.viewSketchpad = this.ce('div', { class: 'formio-view-sketchpad' });
    this.addEventListener(this.viewSketchpad, 'click', this.editSvg.bind(this));
    this.element.appendChild(this.viewSketchpad);
    this.editSketchpad = this.ce('div', { class: 'formio-edit-sketchpad' });
    this.two = new Two({
      type: Two.Types.svg,
      width: this.component.width,
      height: this.component.height
    }).appendTo(this.editSketchpad);

    this.addBackground();

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
    //open editor in modal
    this.editorModal = this.createModal();
    const toolbar = this.createToolbar();
    this.editorModal.body.appendChild(toolbar);
    this.attach();
    this.editorModal.body.appendChild(this.editSketchpad);
    this.saveSvgButton = this.ce('button', {
      class: 'btn btn-success'
    }, this.t('Save'));
    this.addEventListener(this.saveSvgButton, 'click', () => {
      this.saveSvg();
      this.editorModal.close();
    });
    this.editorModal.body.appendChild(this.saveSvgButton);
    this.editValue = _.cloneDeep(this.dataValue);
  }

  saveSvg() {
    this.dataValue = this.editValue;
    this.copySvgToView();
  }

  createToolbar() {
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
  }

  attach() {
    const sketchElement = this.two.renderer.domElement;

    // Set up mouse events.
    sketchElement
      .addEventListener('mousedown', (e) => {
        e.preventDefault();
        const offset = sketchElement.getBoundingClientRect();
        this.modes[this.state.mode].eventStart({ x: e.clientX - offset.left, y: e.clientY - offset.top });

        const mouseDrag = (e) => {
          e.preventDefault();

          const offset = sketchElement.getBoundingClientRect();
          this.modes[this.state.mode].drag({ x: e.clientX - offset.left, y: e.clientY - offset.top });
        };

        const mouseEnd = (e) => {
          e.preventDefault();

          sketchElement
            .removeEventListener('mousemove', mouseDrag);
          sketchElement
            .removeEventListener('mouseup', mouseEnd);

          const offset = sketchElement.getBoundingClientRect();
          this.modes[this.state.mode].eventEnd({ x: e.clientX - offset.left, y: e.clientY - offset.top });
        };

        sketchElement
          .addEventListener('mousemove', mouseDrag);

        sketchElement
          .addEventListener('mouseup', mouseEnd);

        return false;
      });

    // Set up touch events.
    sketchElement
      .addEventListener('touchstart', (e) => {
        e.preventDefault();

        const offset = sketchElement.getBoundingClientRect();
        const touch = e.originalEvent.changedTouches[0];
        this.modes[this.state.mode].eventStart({ x: touch.pageX - offset.left, y: touch.pageY - offset.top });

        const touchDrag = (e) => {
          e.preventDefault();

          const offset = sketchElement.getBoundingClientRect();
          const touch = e.originalEvent.changedTouches[0];
          this.modes[this.state.mode].drag({ x: touch.pageX - offset.left, y: touch.pageY - offset.top });
        };

        const touchEnd = (e) => {
          e.preventDefault();

          sketchElement
            .removeEventListener('touchmove', touchDrag);
          sketchElement
            .removeEventListener('touchend', touchEnd);

          const offset = sketchElement.getBoundingClientRect();
          const touch = e.originalEvent.changedTouches[0];
          this.modes[this.state.mode].eventEnd({ x: touch.pageX - offset.left, y: touch.pageY - offset.top });
        };

        sketchElement
          .addEventListener('touchmove', touchDrag);

        sketchElement
          .addEventListener('touchend', touchEnd);

        return false;
      });

    this.two.update();
  }

  addBackground() {
    if (this.component.image) {
      let svg = this.ce('svg');
      svg.innerHTML = this.component.image;
      svg = this.two.interpret(svg);
      svg.center();
      svg.translation.set(this.two.width / 2, this.two.height / 2);
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
    this.clear();
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
    this.clear();
    this.draw(value);
  }

  setState(state) {
    Object.assign(this.state, state);
    this.setActiveButton(this.state.mode);
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
    this.clear();
    this.draw(value);
    this.copySvgToView();
  }

  copySvgToView() {
    //clone view SVG element from editor
    const svgElement = this.editSketchpad.firstChild.cloneNode(true);
    //make view SVG responsive: remove height and width attribute, add viewBox attribute
    svgElement.removeAttribute('height');
    svgElement.removeAttribute('width');
    svgElement.setAttribute('viewBox', `0 0 ${this.component.width} ${this.component.height}`);
    this.viewSketchpad.innerHTML = '';
    this.viewSketchpad.appendChild(svgElement);
  }
}
