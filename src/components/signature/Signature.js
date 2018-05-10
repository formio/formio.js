import SignaturePad from 'signature_pad/dist/signature_pad.js';
import BaseComponent from '../base/Base';

export default class SignatureComponent extends BaseComponent {
  static schema(...extend) {
    return BaseComponent.schema({
      type: 'signature',
      label: 'Signature',
      key: 'signature',
      footer: 'Sign above',
      width: '100%',
      height: '150',
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
      icon: 'fa fa-pencil',
      weight: 120,
      documentation: 'http://help.form.io/userguide/#signature',
      schema: SignatureComponent.schema()
    };
  }

  constructor(component, options, data) {
    super(component, options, data);
    this.currentWidth = 0;
    this.scale = 1;
    if (!this.component.width) {
      this.component.width = '100%';
    }
    if (!this.component.height) {
      this.component.height = '200px';
    }
  }

  get defaultSchema() {
    return SignatureComponent.schema();
  }

  elementInfo() {
    const info = super.elementInfo();
    info.type = 'input';
    info.attr.type = 'hidden';
    return info;
  }

  setValue(value, flags) {
    flags = this.getFlags.apply(this, arguments);
    super.setValue(value, flags);
    if (value && !flags.noSign && this.signaturePad) {
      this.signaturePad.fromDataURL(value);
      this.signatureImage.setAttribute('src', value);
      this.showCanvas(false);
    }
  }

  showCanvas(show) {
    if (show) {
      this.canvas.style.display = 'inherit';
      this.signatureImage.style.display = 'none';
    }
    else {
      this.canvas.style.display = 'none';
      this.signatureImage.style.display = 'inherit';
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

  destroy() {
    super.destroy();
    if (this.signaturePad) {
      this.signaturePad.off();
    }
  }

  checkSize(force, scale) {
    if (force || (this.padBody.offsetWidth !== this.currentWidth)) {
      this.scale = force ? scale : this.scale;
      this.currentWidth = this.padBody.offsetWidth;
      this.canvas.width = this.currentWidth * this.scale;
      this.canvas.height = this.padBody.offsetHeight * this.scale;
      const ctx = this.canvas.getContext('2d');
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale((1 / this.scale), (1 / this.scale));
      ctx.fillStyle = this.signaturePad.backgroundColor;
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.signaturePad.clear();
    }
  }

  /* eslint-disable max-statements */
  build() {
    if (this.viewOnly) {
      return this.viewOnlyBuild();
    }

    this.element = this.createElement();
    this.element.component = this;
    let classNames = this.element.getAttribute('class');
    classNames += ' signature-pad';
    this.element.setAttribute('class', classNames);

    this.input = this.createInput(this.element);
    this.padBody = this.ce('div', {
      class: 'signature-pad-body',
      style: (`width: ${this.component.width};height: ${this.component.height}`),
      tabindex: this.component.tabindex || 0
    });

    // Create the refresh button.
    this.refresh = this.ce('a', {
      class: 'btn btn-sm btn-default btn-secondary signature-pad-refresh'
    });
    const refreshIcon = this.getIcon('refresh');
    this.refresh.appendChild(refreshIcon);
    this.padBody.appendChild(this.refresh);

    // The signature canvas.
    this.canvas = this.ce('canvas', {
      class: 'signature-pad-canvas',
      height: this.component.height
    });
    this.padBody.appendChild(this.canvas);

    this.signatureImage = this.ce('img', {
      style: ('width: 100%;display: none;')
    });
    this.padBody.appendChild(this.signatureImage);

    this.element.appendChild(this.padBody);

    // Add the footer.
    if (this.component.footer) {
      this.signatureFooter = this.ce('div', {
        class: 'signature-pad-footer'
      });
      this.signatureFooter.appendChild(this.text(this.component.footer));
      this.createTooltip(this.signatureFooter);
      this.element.appendChild(this.signatureFooter);
    }

    // Create the signature pad.
    this.signaturePad = new SignaturePad(this.canvas, {
      minWidth: this.component.minWidth,
      maxWidth: this.component.maxWidth,
      penColor: this.component.penColor,
      backgroundColor: this.component.backgroundColor
    });
    this.refresh.addEventListener('click', (event) => {
      event.preventDefault();
      this.showCanvas(true);
      this.signaturePad.clear();
    });
    this.signaturePad.onEnd = () => this.setValue(this.signaturePad.toDataURL(), {
      noSign: true
    });

    // Ensure the signature is always the size of its container.
    setTimeout(function checkWidth() {
      this.checkSize();
      setTimeout(checkWidth.bind(this), 200);
    }.bind(this), 200);

    // Restore values.
    this.restoreValue();

    if (this.shouldDisable) {
      this.disabled = true;
    }

    this.autofocus();
  }
  /* eslint-enable max-statements */

  createViewOnlyLabel(container) {
    this.labelElement = this.ce('dt');
    this.labelElement.appendChild(this.text(this.component.footer));
    this.createTooltip(this.labelElement);
    container.appendChild(this.labelElement);
  }

  getView(value) {
    return value ? 'Yes' : 'No';
  }

  focus() {
    this.padBody.focus();
  }
}
