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
    let refreshIcon = this.ce('refreshIcon', 'img', {
      src: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMyIDMyIiBoZWlnaHQ9IjMycHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMycHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxnPjxwYXRoIGQ9Ik0yNS40NDQsNC4yOTFjMCwwLTEuMzI1LDEuMjkzLTIuMjQzLDIuMjAxQzE4LjUxNCwzLjA2OCwxMS45MDksMy40NTYsNy42NzYsNy42ODkgICBjLTIuNDcsMi40Ny0zLjYyMyw1Ljc0Ny0zLjQ4NCw4Ljk4M2g0QzguMDUxLDE0LjQ2LDguODEsMTIuMjA1LDEwLjUsMTAuNTE0YzIuNjYzLTIuNjYzLDYuNzM1LTMuMDQzLDkuODEyLTEuMTYyICAgYy0xLjA0MiwxLjAzMi0yLjI0NSwyLjIzOC0yLjI0NSwyLjIzOGMtMC44NDEsMS4wMDksMC4xMDQsMS41OTIsMC41ODQsMS41NzdsNS42MjQtMC4wMDFjMC4yOTcsMCwwLjUzOSwwLjAwMSwwLjUzOSwwLjAwMSAgIHMwLjI0NSwwLDAuNTQzLDBoMS4wOTJjMC4yOTgsMCwwLjU0LTAuMjQzLDAuNTQtMC41NDFWNC44OTVDMjcuMDIzLDQuMTg4LDI2LjI0NywzLjUwMiwyNS40NDQsNC4yOTF6IiBmaWxsPSIjNTE1MTUxIi8+PHBhdGggZD0iTTYuNTU1LDI3LjcwOWMwLDAsMS4zMjYtMS4yOTMsMi4yNDMtMi4yMDFjNC42ODgsMy40MjQsMTEuMjkyLDMuMDM2LDE1LjUyNi0xLjE5NyAgIGMyLjQ3LTIuNDcxLDMuNjIyLTUuNzQ3LDMuNDg0LTguOTgzaC00LjAwMWMwLjE0MiwyLjIxMS0wLjYxNyw0LjQ2Ny0yLjMwOCw2LjE1OWMtMi42NjMsMi42NjItNi43MzUsMy4wNDMtOS44MTIsMS4xNjEgICBjMS4wNDItMS4wMzIsMi4yNDUtMi4yMzgsMi4yNDUtMi4yMzhjMC44NDEtMS4wMS0wLjEwNC0xLjU5Mi0wLjU4NC0xLjU3N2wtNS42MjQsMC4wMDJjLTAuMjk3LDAtMC41NC0wLjAwMi0wLjU0LTAuMDAyICAgcy0wLjI0NSwwLTAuNTQzLDBINS41NTFjLTAuMjk4LDAtMC41NCwwLjI0Mi0wLjU0MSwwLjU0MXY3LjczMkM0Ljk3NywyNy44MTIsNS43NTMsMjguNDk4LDYuNTU1LDI3LjcwOXoiIGZpbGw9IiM1MTUxNTEiLz48L2c+PC9zdmc+'
    });
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
