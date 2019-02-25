import Base from '../../components/base/Base';
import Two from 'two.js';
import Picker from 'vanilla-picker';

export default class Sketchpad extends Base {
  constructor(...args) {
    super(...args);
    this.deleted = [];

    this.state = {
      mode: Object.keys(this.modes)[0],
      stroke: '#333',
      fill: '#ccc',
      linewidth: 1,
      circleSize: 10,
      rectangleSize: {
        width: 10,
        height: 10
      }
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
          const index = this.layers.length - 1;
          this.curve._renderer.elem.addEventListener('click', (e) => this.click(e, this.layers.length));
        },
        drag: (coordinate) => {
          this.points.push(coordinate);
          this.curve.vertices.push(new Two.Vector(coordinate.x, coordinate.y));
          this.two.update();
          this.prev = coordinate;
        },
        eventEnd: (coordinate) => {
          const value = this.dataValue.slice();
          value.push(Object.assign({}, this.state, { points: this.points }));
          this.dataValue = value;
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
          const value = this.dataValue.slice();
          const vertices = this.line.vertices.map(vertice => {
            return {
              x: vertice.x,
              y: vertice.y
            };
          });
          value.push(Object.assign({}, this.state, { vertices: vertices }));
          this.dataValue = value;
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
          const value = this.dataValue.slice();
          value.push(Object.assign({}, this.state, { center: this.center }));
          this.dataValue = value;
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
        state: {
          mode: 'rectangle'
        },
        eventStart: (coordinate) => {
          this.center = coordinate;
          const layer = this.two.makeRectangle(coordinate.x, coordinate.y, this.state.rectangleSize.width, this.state.rectangleSize.height);
          layer.fill = this.state.fill;
          layer.stroke = this.state.stroke;
          layer.linewidth = this.state.linewidth;
          this.two.update();
          this.layers.push(layer);
          const index = this.layers.length - 1;
          layer._renderer.elem.addEventListener('click', (e) => this.click(e, index));
        },
        drag: (coordinate) => {

        },
        eventEnd: () => {
          const value = this.dataValue.slice();
          value.push(Object.assign({}, this.state, { center: this.center }));
          this.dataValue = value;
          this.triggerChange();
        },
        draw: (state) => {
          const layer = this.two.makeRectangle(state.center.x, state.center.y, state.rectangleSize.width, state.rectangleSize.height);
          layer.fill = state.fill;
          layer.stroke = state.stroke;
          layer.linewidth = state.linewidth;
          return layer;
        },
        attach: (element) => {
          const widthInput = this.ce('input', {
            type: 'number',
            class: 'formio-sketchpad-toolbar-input formio-sketchpad-width-input',
            onChange: (e) => {
              this.state.rectangleSize.width = e.target.value;
            }
          });
          widthInput.value = this.state.rectangleSize.width;
          const heightInput = this.ce('input', {
            type: 'number',
            class: 'formio-sketchpad-toolbar-input formio-sketchpad-height-input',
            onChange: (e) => {
              this.state.rectangleSize.height = e.target.value;
            }
          });
          heightInput.value = this.state.rectangleSize.height;
          element.appendChild(widthInput);
          element.appendChild(heightInput);
          return element;
        }
      },
      select: {
        icon: 'mouse-pointer',
        state: {
          mode: 'select'
        },
        eventStart: (coordinate) => {

        },
        drag: (coordinate) => {

        },
        eventEnd: (coordinate) => {

        },
        draw: (state) => {

        }
      }
    };
  }

  get styles() {
    return [
      {
        icon: 'square-o',
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
        action: 'undo'
      },
      {
        icon: 'repeat',
        action: 'redo'
      },
      {
        icon: 'eraser',
        action: 'remove'
      },
    ];
  }

  /**
   * Builds the component.
   */
  build(state) {
    state = state || {};
    this.calculatedValue = state.calculatedValue;

    this.createElement();

    this.element.append(
      this.ce('div', {
        class: 'btn-toolbar',
        role: 'toolbar'
      }, [
        this.ce('div', {
            class: 'btn-group',
            role: 'group'
          },
          this.modeButtons = Object.keys(this.modes).map(key => {
            const mode = this.modes[key];
            const toolbarButton = this.ce('div', {
              class: `btn btn-secondary formio-sketchpad-toolbar-button formio-sketchpad-toolbar-button-${key} ${this.state.mode === mode.state.mode ? ' active' : ''}`,
              onClick: () => this.setState(mode.state)
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
            class: 'btn-group',
            role: 'group'
          },
          this.styles.map(button => {
            const toolbarButtonIcon = this.ce('i', {
              class: `fa fa-${button.icon}`,
            });
            const toolbarButton = this.ce('div', {
              class: `btn btn-secondary formio-sketchpad-toolbar-button formio-sketchpad-toolbar-button-${button.property}`
            }, toolbarButtonIcon);
            if (button.attach) {
              return button.attach(toolbarButton);
            }
            return toolbarButton;
          }),
        ),
        this.ce('div', {
            class: 'btn-group float-right',
            role: 'group'
          },
          this.actions.map(button => this.ce('div', {
            class: `btn btn-secondary formio-sketchpad-toolbar-button formio-sketchpad-toolbar-button-${button.action}`,
            onClick: () => this[button.action]()
          }, this.ce('i', {
            class: `fa fa-${button.icon}`,
          }))),
        ),
      ])
    );

    this.sketchpad = this.ce('div', { class: 'sketchpad' });
    this.element.appendChild(this.sketchpad);

    this.attach(this.element);

    // Disable if needed.
    if (this.shouldDisable) {
      this.disabled = true;
    }

    // Restore the value.
    this.restoreValue();

    this.autofocus();

    this.attachLogic();
  }

  attach() {
    this.two = new Two({
      type: Two.Types.svg,
      width: this.component.width,
      height: this.component.height
    }).appendTo(this.sketchpad);

    this.addBackground();

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
    let svg = this.ce('svg');
    svg.innerHTML = this.component.image;
    svg = this.two.interpret(svg);
    svg.center();
    svg.translation.set(this.two.width / (2 * window.devicePixelRatio), this.two.height / (2 * window.devicePixelRatio));
  }

  clear() {
    this.two.clear();
    this.addBackground();
  }

  draw(value) {
    this.layers = value.map(item => this.modes[item.mode].draw(item));
    this.two.update();
    if (this.layers.length) {
      this.layers.forEach((layer, index) => {
        layer._renderer.elem.addEventListener('click', (e) => this.click(e, index));
      });
      console.log(this.layers[0]);
    }
  }

  click(event, index) {
    console.log('click', event, index);
  }

  undo() {
    const value = this.dataValue.slice();
    if (value.length === 0) {
      return;
    }
    this.deleted.push(value.pop());
    this.dataValue = value;
    this.triggerChange();
    this.clear();
    this.draw(value);
  }

  redo() {
    if (this.deleted.length === 0) {
      return;
    }
    const value = this.dataValue.slice();
    value.push(this.deleted.pop());
    this.dataValue = value;
    this.triggerChange();
    this.clear();
    this.draw(value);
  }

  remove() {

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
  }
}
