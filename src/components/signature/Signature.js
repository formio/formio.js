import SignaturePad from 'signature_pad/dist/signature_pad.js'
import { BaseComponent } from '../base/Base';
export class SignatureComponent extends BaseComponent {
  constructor(component, options, data) {
    super(component, options, data);
    this.scale = 1;
    this.currentWidth = 0;
    if (!this.component.width) {
      this.component.width = '100%';
    }
    if (!this.component.height) {
      this.component.height = '200px';
    }
  }

  elementInfo() {
    let info = super.elementInfo();
    info.type = 'input';
    info.attr.type = 'hidden';
    return info;
  }

  setValue(value, flags) {
    flags = this.getFlags.apply(this, arguments);
    super.setValue(value, flags);
    if (value && !flags.noSign && this.signaturePad) {
      this.signaturePad.fromDataURL(value);
    }
  }

  getSignatureImage() {
    let image = this.ce('img', {
      style: ('width: ' + this.component.width + ';height: ' + this.component.height)
    });
    image.setAttribute('src', this.value);
    return image;
  }

  onResize() {
    // Get the scale of the canvas.
    this.scale = Math.max(window.devicePixelRatio || 1, 1);
    this.checkSize(true);
    this.setValue(this.getValue());
  }

  set disabled(disabled) {
    super.disabled = disabled;
    if (this.signaturePad) {
      if (disabled) {
        this.signaturePad.off();
        this.refresh.classList.add('disabled');
      } else {
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

  checkSize(force) {
    if (force || (this.padBody.offsetWidth !== this.currentWidth)) {
      this.currentWidth = this.padBody.offsetWidth;
      this.canvas.width = this.currentWidth * this.scale;
      this.canvas.height = this.padBody.offsetHeight * this.scale;
      let ctx = this.canvas.getContext("2d");
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale((1 / this.scale), (1 / this.scale));
      ctx.fillStyle = this.signaturePad.backgroundColor;
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.signaturePad.clear();
    }
  }

  build() {
    this.element = this.createElement();
    let classNames = this.element.getAttribute('class');
    classNames += ' signature-pad';
    this.element.setAttribute('class', classNames);

    this.input = this.createInput(this.element);
    this.padBody = this.ce('div', {
      class: 'signature-pad-body',
      style: ('width: ' + this.component.width + ';height: ' + this.component.height)
    });

    // Create the refresh button.
    this.refresh = this.ce('a', {
      class: 'btn btn-sm btn-default signature-pad-refresh'
    });
    let refreshIcon = this.getIcon('refresh');
    this.refresh.appendChild(refreshIcon);
    this.padBody.appendChild(this.refresh);

    // The signature canvas.
    this.canvas = this.ce('canvas', {
      class: 'signature-pad-canvas',
      height: this.component.height
    });
    this.padBody.appendChild(this.canvas);
    this.element.appendChild(this.padBody);

    // Add the footer.
    if (this.component.footer) {
      let footer = this.ce('div', {
        class: 'signature-pad-footer'
      });
      footer.appendChild(this.text(this.component.footer));
      this.createTooltip(footer);
      this.element.appendChild(footer);
    }

    // Create the signature pad.
    this.signaturePad = new SignaturePad(this.canvas, {
      minWidth: this.component.minWidth,
      maxWidth: this.component.maxWidth,
      penColor: this.component.penColor,
      backgroundColor: this.component.backgroundColor
    });
    this.refresh.addEventListener("click", (event) => {
      event.preventDefault();
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
  }
}
