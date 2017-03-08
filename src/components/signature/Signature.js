import SignaturePad from 'signature_pad';
import { BaseComponent } from '../base/Base';
export class SignatureComponent extends BaseComponent {
  elementInfo() {
    let info = super.elementInfo();
    info.type = 'input';
    info.attr.type = 'hidden';
    return info;
  }

  setValue(value, noSign) {
    super.setValue(value);
    if (!noSign && this.signaturePad) {
      this.signaturePad.fromDataURL(value);
    }
  }

  getSignatureImage() {
    let image = this.ce('image', 'img', {
      style: ('width: ' + this.component.width + ';height: ' + this.component.height)
    });
    image.setAttribute('src', this.input.value);
    return image;
  }

  set disable(disable) {
    super.disable = disable;
    this.element.innerHTML = '';
    this.element.appendChild(this.getSignatureImage());
  }

  destroy() {
    super.destroy();
    if (this.signaturePad) {
      this.signaturePad.off();
    }
  }

  build() {
    let element = this.createElement();
    let classNames = element.getAttribute('class');
    classNames += ' signature-pad';
    element.setAttribute('class', classNames);

    this.input = this.createInput(element);
    let padBody = this.ce('pad', 'div', {
      class: 'signature-pad-body',
      style: ('width: ' + this.component.width + ';height: ' + this.component.height)
    });

    // Create the refresh button.
    let refresh = this.ce('refresh', 'a', {
      class: 'btn btn-sm btn-default signature-pad-refresh'
    });
    let refreshIcon = this.getIcon('refresh');
    refresh.appendChild(refreshIcon);
    padBody.appendChild(refresh);

    // The signature canvas.
    let canvas = this.ce('canvas', 'canvas', {
      class: 'signature-pad-canvas'
    });
    padBody.appendChild(canvas);
    element.appendChild(padBody);

    // Add the footer.
    if (this.component.footer) {
      let footer = this.ce('footer', 'div', {
        class: 'signature-pad-footer'
      });
      footer.appendChild(this.text(this.component.footer));
      element.appendChild(footer);
    }

    // Create the signature pad.
    this.signaturePad = new SignaturePad(canvas, {
      minWidth: this.component.minWidth,
      maxWidth: this.component.maxWidth,
      penColor: this.component.penColor,
      backgroundColor: this.component.backgroundColor
    });
    refresh.addEventListener("click", (event) => {
      event.preventDefault();
      this.signaturePad.clear();
    });
    this.signaturePad.onEnd = () => this.setValue(this.signaturePad.toDataURL(), true);

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
  }
}
