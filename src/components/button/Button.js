import BaseComponent from '../base/Base';
class ButtonComponent extends BaseComponent {
  elementInfo() {
    let info = super.elementInfo();
    info.type = 'button';
    info.attr.type = this.component.action;
    info.attr.class = 'btn btn-' + this.component.theme;
    if (this.component.block) {
      info.attr.class += ' btn-block';
    }
    return info;
  }

  set loading(loading) {
    this._loading = loading;
    if (!this.loader && loading) {
      this.loader = this.ce('buttonLoader', 'i', {
        class: 'glyphicon glyphicon-refresh glyphicon-spin'
      });
    }
    if (this.loader) {
      if (loading) {
        this.input.appendChild(this.loader);
      }
      else {
        this.input.removeChild(this.loader);
      }
    }
  }

  createInput(container) {
    let input = super.createInput(container);
    this.on('submit', () => {
      this.loading = false;
    });
    this.addAnEventListener(input, 'click', (event) => {
      switch (this.component.action) {
        case 'submit':
          this.loading = true;
          break;
        case 'event':
          this.events.emit(this.component.event, this.data);
          break;
        case 'reset':
          this.events.emit('resetForm');
          break;
        case 'oauth':
          console.log('OAuth currently not supported.');
          break;
      }
    });
  }

  build() {
    this.element = this.ce('element', this.info.type, this.info.attr);
    if (this.component.label) {
      this.label = this.text(this.component.label);
      this.element.appendChild(this.label);
    }
  }
}

module.exports = ButtonComponent;
