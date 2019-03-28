import Two from 'two.js';
import NestedComponent from '../../components/nested/NestedComponent';
import _ from 'lodash';
import BaseComponent from '../../components/base/Base';
import { Components } from '../../formio.form';

export default class Tagpad extends NestedComponent {
  static schema(...extend) {
    return NestedComponent.schema({
      type: 'tagpad',
      label: 'Tagpad',
      key: 'tagpad',
      canvasWidth: 640,
      canvasHeight: 480,
      dotSize: 10,
      dotStrokeSize: 2,
      dotStrokeColor: '#333',
      dotFillColor: '#ccc'
    }, ...extend);
  }

  constructor(...args) {
    super(...args);
    this.type = 'tagpad';
    this.dots = [];
    _.defaults(this.component, {
      canvasWidth: 640,
      canvasHeight: 480,
      dotSize: 10,
      dotStrokeSize: 2,
      dotStrokeColor: '#333',
      dotFillColor: '#ccc'
    });
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
    this.canvasContainer = this.ce('div', {
      class: 'formio-tagpad-canvas-container',
      style: `width: ${this.component.canvasWidth}px;`
    }, [this.canvas]);
    this.formContainer = this.ce('div', {
        class: 'formio-tagpad-form-container',
        style: `margin-left: -${this.component.canvasWidth}px; padding-left: ${this.component.canvasWidth}px;`
      },
      this.form = this.ce('div', {
        class: 'formio-tagpad-form'
      }));
    this.renderForm();
    this.tagpadContainer.appendChild(this.canvasContainer);
    this.tagpadContainer.appendChild(this.formContainer);
    this.element.appendChild(this.tagpadContainer);
    this.two = new Two({
      type: Two.Types.svg,
      width: this.component.canvasWidth,
      height: this.component.canvasHeight
    }).appendTo(this.canvas);
    this.canvasSvg = this.two.renderer.domElement;
    this.addBackground();
    this.attachDrawEvents();
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
      this.components.push(componentInstance);
      this.form.appendChild(componentInstance.getElement());
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
  }

  attachDrawEvents() {
    if (this.options.readOnly) {
      return;
    }
    // Set up mouse event.
    const mouseEnd = (e) => {
      e.preventDefault();
      const offset = this.canvasSvg.getBoundingClientRect();
      this.addDot({
        x: e.clientX - offset.left,
        y: e.clientY - offset.top
      });
    };
    this.canvasSvg.addEventListener('mouseup', mouseEnd);

    // Set up touch event.
    const touchEnd = (e) => {
      e.preventDefault();
      const offset = this.canvasSvg.getBoundingClientRect();
      const touch = e.originalEvent.changedTouches[0];
      this.addDot({
        x: touch.pageX - offset.left,
        y: touch.pageY - offset.top
      });
    };
    this.canvasSvg.addEventListener('touchend', touchEnd);

    this.two.update();
  }

  addBackground() {
    if (this.component.image) {
      let svg = this.ce('svg');
      svg.innerHTML = this.component.image;
      svg = this.two.interpret(svg);
      svg.center();
      svg.translation.set(this.component.canvasWidth / 2, this.component.canvasHeight / 2);
    }
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
    this.selectDot(newDotIndex);
    this.triggerChange();
  }

  dotClicked(e, dot, index) {
    //prevent drawing another dot near clicked dot
    e.stopPropagation();
    this.selectDot(index);
  }

  selectDot(index) {
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
    this.selectDot(0);
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
    this.dataValue[this.selectedDotIndex] = selectedDot.dot.data;
  }

  removeSelectedDot() {
    this.dataValue.splice(this.selectedDotIndex, 1);
    this.redrawDots();
  }

  redrawDots() {
    this.dots = [];
    //clear canvas
    this.two.clear();
    //restore background
    this.addBackground();
    //draw dots
    this.setValue(this.dataValue);
  }
}
