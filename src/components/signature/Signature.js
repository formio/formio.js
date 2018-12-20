import SignaturePad from 'signature_pad/dist/signature_pad.js';
import Input from '../_classes/input/Input';
import _ from 'lodash';

export default class SignatureComponent extends Input {
  static schema(...extend) {
    return Input.schema({
      type: 'signature',
      label: 'Signature',
      key: 'signature',
      footer: 'Sign above',
      width: '100%',
      height: '150px',
      penColor: 'black',
      backgroundColor: 'rgb(245,245,235)',
      minWidth: '0.5',
      maxWidth: '2.5'
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Signature',
      group: 'advanced',
      icon: 'pencil',
      weight: 120,
      documentation: 'http://help.form.io/userguide/#signature',
      schema: SignatureComponent.schema()
    };
  }

  init() {
    super.init();
    this.currentWidth = 0;
    this.scale = 1;
    if (!this.component.width) {
      this.component.width = '100%';
    }
    if (!this.component.height) {
      this.component.height = '200px';
    }
  }

  get emptyValue() {
    return '';
  }

  get defaultSchema() {
    return SignatureComponent.schema();
  }

  get inputInfo() {
    const info = super.inputInfo;
    info.type = 'input';
    info.attr.type = 'hidden';
    return info;
  }

  get className() {
    return `${super.className} signature-pad`;
  }

  setValue(value, flags) {
    flags = this.getFlags.apply(this, arguments);
    super.setValue(value, flags);
    if (this.signaturePad) {
      if (value && !flags.noSign) {
        this.refs.signatureImage.setAttribute('src', value);
        this.showCanvas(false);
      }
      if (!value) {
        this.signaturePad.clear();
      }
    }
  }

  showCanvas(show) {
    if (show) {
      this.refs.canvas.style.display = 'inherit';
      this.refs.signatureImage.style.display = 'none';
    }
    else {
      this.refs.canvas.style.display = 'none';
      this.refs.signatureImage.style.display = 'inherit';
    }
  }

  set disabled(disabled) {
    super.disabled = disabled;
    this.showCanvas(!disabled);
    if (this.signaturePad) {
      if (disabled) {
        this.signaturePad.off();
        this.refresh.classList.add('disabled');
      }
      else {
        this.signaturePad.on();
        this.refresh.classList.remove('disabled');
      }
    }
  }

  checkSize(force, scale) {
    if (force || (this.refs.padBody.offsetWidth !== this.currentWidth)) {
      this.scale = force ? scale : this.scale;
      this.currentWidth = this.refs.padBody.offsetWidth;
      this.refs.canvas.width = this.currentWidth * this.scale;
      this.refs.canvas.height = this.refs.padBody.offsetHeight * this.scale;
      const ctx = this.refs.canvas.getContext('2d');
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale((1 / this.scale), (1 / this.scale));
      ctx.fillStyle = this.signaturePad.backgroundColor;
      ctx.fillRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
      this.signaturePad.clear();
    }
  }

  renderElement(value, index) {
    return this.renderTemplate('signature', {
      element: super.renderElement(value, index),
      required: _.get(this.component, 'validate.required', false),
    });
  }

  attach(element) {
    this.loadRefs(element, { canvas: 'single', refresh: 'single', padBody: 'single', signatureImage: 'single' });
    super.attach(element);

    // Create the signature pad.
    if (this.refs.canvas) {
      this.signaturePad = new SignaturePad(this.refs.canvas, {
        minWidth: this.component.minWidth,
        maxWidth: this.component.maxWidth,
        penColor: this.component.penColor,
        backgroundColor: this.component.backgroundColor
      });

      this.signaturePad.onEnd = () => this.setValue(this.signaturePad.toDataURL(), {
        noSign: true
      });
      this.refs.signatureImage.setAttribute('src', this.signaturePad.toDataURL());

      // Ensure the signature is always the size of its container.
      if (this.refs.padBody) {
        this.addEventListener(window, 'resize', _.debounce(() => this.checkSize(), 100));
        setTimeout(function checkWidth() {
          if (this.refs.padBody.offsetWidth) {
            this.checkSize();
          }
          else {
            setTimeout(checkWidth.bind(this), 200);
          }
        }.bind(this), 200);
      }
    }
    this.addEventListener(this.refs.refresh, 'click', (event) => {
      event.preventDefault();
      this.showCanvas(true);
      this.signaturePad.clear();
      this.setValue(this.defaultValue);
    });
    this.setValue(this.dataValue);
  }
  /* eslint-enable max-statements */

  detach() {
    if (this.signaturePad) {
      this.signaturePad.off();
    }
    this.signaturePad = null;
    super.detach();
  }

  getView(value) {
    return value ? 'Yes' : 'No';
  }

  focus() {
    this.refs.padBody.focus();
  }
}
