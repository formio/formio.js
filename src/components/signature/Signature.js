import SignaturePad from 'signature_pad';
import { BaseComponent } from '../base/Base';
export class SignatureComponent extends BaseComponent {
  constructor(component, options, data) {
    super(component, options, data);
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

  set disabled(disabled) {
    super.disabled = disabled;
    if (this.signaturePad) {
      if (disabled){
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

  build() {
    this.element = this.createElement();
    let classNames = this.element.getAttribute('class');
    classNames += ' signature-pad';
    this.element.setAttribute('class', classNames);

    this.input = this.createInput(this.element);
    let padBody = this.ce('div', {
      class: 'signature-pad-body',
      style: ('width: ' + this.component.width + ';height: ' + this.component.height)
    });

    // Create the refresh button.
    this.refresh = this.ce('a', {
      class: 'btn btn-sm btn-default signature-pad-refresh'
    });
    let refreshIcon = this.getIcon('refresh');
    this.refresh.appendChild(refreshIcon);
    padBody.appendChild(this.refresh);

    // The signature canvas.
    let canvas = this.ce('canvas', {
      class: 'signature-pad-canvas',
      height: this.component.height
    });
    padBody.appendChild(canvas);
    this.element.appendChild(padBody);

    // Add the footer.
    if (this.component.footer) {
      let footer = this.ce('div', {
        class: 'signature-pad-footer'
      });
      footer.appendChild(this.text(this.component.footer));
      this.element.appendChild(footer);
    }

    // Create the signature pad.
    this.signaturePad = new SignaturePad(canvas, {
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
    let currentWidth = 0;
    setTimeout(function checkWidth() {
      if (padBody.offsetWidth !== currentWidth) {
        currentWidth = padBody.offsetWidth;
        canvas.width = currentWidth;
        let ctx = canvas.getContext("2d");
        ctx.fillStyle = this.signaturePad.backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      setTimeout(checkWidth.bind(this), 200);
    }.bind(this), 200);

    if (this.options.readOnly || this.component.disabled) {
      this.disabled = true;
    }
  }
}
