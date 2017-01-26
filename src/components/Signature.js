let SignaturePad = require('signature_pad');
let BaseComponent = require('./Base');
class SignatureComponent extends BaseComponent {
  elementInfo() {
    let info = super.elementInfo();
    info.type = 'input';
    info.attr.type = 'hidden';
    return info;
  }
  set value(value) {
    super.value = value;
    if (this.signaturePad && this._noSign) {
      this.signaturePad.fromDataURL(value);
    }
  }
  set disable(disable) {
    super.disable = disable;
    let image = this.ce('img');
    image.setAttribute('src', this.input.value);
    image.setAttribute('style', 'width: ' + this._component.width + ';height: ' + this._component.height);
    this._element.innerHTML = '';
    this._element.appendChild(image);
  }
  build() {
    this._element = this.ce('div');
    this._element.setAttribute('id', this.id);
    this._element.setAttribute('class', 'form-group signature-pad');
    this.input = this.createInput(this._element);
    let padBody = this.ce('div');
    padBody.setAttribute('class', 'signature-pad-body');
    padBody.setAttribute('style', 'width: ' + this._component.width + ';height: ' + this._component.height);

    // Create the refresh button.
    let refresh = this.ce('a');
    refresh.setAttribute('class', 'btn btn-sm btn-default signature-pad-refresh');
    let refreshIcon = this.ce('span');
    refreshIcon.setAttribute('class', 'glyphicon glyphicon-refresh');
    refresh.appendChild(refreshIcon);
    padBody.appendChild(refresh);

    // The signature canvas.
    let canvas = this.ce('canvas');
    canvas.setAttribute('class', 'signature-pad-canvas');
    padBody.appendChild(canvas);
    this._element.appendChild(padBody);

    // Add the footer.
    if (this._component.footer) {
      let footer = this.ce('div');
      footer.setAttribute('class', 'signature-pad-footer');
      footer.appendChild(this.text(this._component.footer));
      this._element.appendChild(footer);
    }

    // Create the signature pad.
    this.signaturePad = new SignaturePad(canvas, {
      minWidth: this._component.minWidth,
      maxWidth: this._component.maxWidth,
      penColor: this._component.penColor,
      backgroundColor: this._component.backgroundColor
    });
    refresh.addEventListener("click", (event) => {
      event.preventDefault();
      this.signaturePad.clear();
    });
    this.signaturePad.onEnd = () => {
      var signatureValue = this.signaturePad.toDataURL();
      this._noSign = true;
      this.value = signatureValue;
      this._noSign = false;
      this.onChange();
    };

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
