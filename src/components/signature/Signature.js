import SignaturePad from 'signature_pad';
import BaseComponent from '../base/Base';
class SignatureComponent extends BaseComponent {
  elementInfo() {
    let info = super.elementInfo();
    info.type = 'input';
    info.attr.type = 'hidden';
    return info;
  }
  set value(value) {
    super.value = value;
    if (this.signaturePad && this.noSign) {
      this.signaturePad.fromDataURL(value);
    }
  }
  set disable(disable) {
    super.disable = disable;
    let image = this.ce('image', 'img', {
      style: ('width: ' + this.component.width + ';height: ' + this.component.height)
    });
    image.setAttribute('src', this.input.value);
    this.element.innerHTML = '';
    this.element.appendChild(image);
  }
  build() {
    this.element = this.ce('element', 'div', {
      id: this.id,
      class: 'form-group signature-pad'
    });
    this.input = this.createInput(this.element);
    let padBody = this.ce('pad', 'div', {
      class: 'signature-pad-body',
      style: ('width: ' + this.component.width + ';height: ' + this.component.height)
    });

    // Create the refresh button.
    let refresh = this.ce('refresh', 'a', {
      class: 'btn btn-sm btn-default signature-pad-refresh'
    });
    let refreshIcon = this.ce('refreshIcon', 'span', {
      class: 'glyphicon glyphicon-refresh'
    });
    refresh.appendChild(refreshIcon);
    padBody.appendChild(refresh);

    // The signature canvas.
    let canvas = this.ce('canvas', 'canvas', {
      class: 'signature-pad-canvas'
    });
    padBody.appendChild(canvas);
    this.element.appendChild(padBody);

    // Add the footer.
    if (this.component.footer) {
      let footer = this.ce('footer', 'div', {
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
    refresh.addEventListener("click", (event) => {
      event.preventDefault();
      this.signaturePad.clear();
    });
    this.signaturePad.onEnd = () => this.setValue(this.signaturePad.toDataURL());

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
module.exports = SignatureComponent;
