'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignatureComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ("value" in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _signature_pad = require('signature_pad/dist/signature_pad.js');

var _signature_pad2 = _interopRequireDefault(_signature_pad);

var _Base = require('../base/Base');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SignatureComponent = exports.SignatureComponent = function (_BaseComponent) {
  _inherits(SignatureComponent, _BaseComponent);

  function SignatureComponent(component, options, data) {
    _classCallCheck(this, SignatureComponent);

    var _this = _possibleConstructorReturn(this, (SignatureComponent.__proto__ || Object.getPrototypeOf(SignatureComponent)).call(this, component, options, data));

    _this.currentWidth = 0;
    _this.scale = 1;
    if (!_this.component.width) {
      _this.component.width = '100%';
    }
    if (!_this.component.height) {
      _this.component.height = '200px';
    }
    return _this;
  }

  _createClass(SignatureComponent, [{
    key: 'elementInfo',
    value: function elementInfo() {
      var info = _get(SignatureComponent.prototype.__proto__ || Object.getPrototypeOf(SignatureComponent.prototype), 'elementInfo', this).call(this);
      info.type = 'input';
      info.attr.type = 'hidden';
      return info;
    }
  }, {
    key: 'setValue',
    value: function setValue(value, flags) {
      flags = this.getFlags.apply(this, arguments);
      _get(SignatureComponent.prototype.__proto__ || Object.getPrototypeOf(SignatureComponent.prototype), 'setValue', this).call(this, value, flags);
      if (value && !flags.noSign && this.signaturePad) {
        this.signaturePad.fromDataURL(value);
        this.signatureImage.setAttribute('src', value);
        this.showCanvas(false);
      }
    }
  }, {
    key: 'showCanvas',
    value: function showCanvas(show) {
      if (show) {
        this.canvas.style.display = 'inherit';
        this.signatureImage.style.display = 'none';
      } else {
        this.canvas.style.display = 'none';
        this.signatureImage.style.display = 'inherit';
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      _get(SignatureComponent.prototype.__proto__ || Object.getPrototypeOf(SignatureComponent.prototype), 'destroy', this).call(this);
      if (this.signaturePad) {
        this.signaturePad.off();
      }
    }
  }, {
    key: 'checkSize',
    value: function checkSize(force, scale) {
      if (force || this.padBody.offsetWidth !== this.currentWidth) {
        this.scale = force ? scale : this.scale;
        this.currentWidth = this.padBody.offsetWidth;
        this.canvas.width = this.currentWidth * this.scale;
        this.canvas.height = this.padBody.offsetHeight * this.scale;
        var ctx = this.canvas.getContext('2d');
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(1 / this.scale, 1 / this.scale);
        ctx.fillStyle = this.signaturePad.backgroundColor;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.signaturePad.clear();
      }
    }
  }, {
    key: 'build',
    value: function build() {
      var _this2 = this;

      if (this.viewOnly) {
        return this.viewOnlyBuild();
      }

      this.element = this.createElement();
      var classNames = this.element.getAttribute('class');
      classNames += ' signature-pad';
      this.element.setAttribute('class', classNames);

      this.input = this.createInput(this.element);
      this.padBody = this.ce('div', {
        class: 'signature-pad-body',
        style: 'width: ' + this.component.width + ';height: ' + this.component.height
      });

      // Create the refresh button.
      this.refresh = this.ce('a', {
        class: 'btn btn-sm btn-default btn-secondary signature-pad-refresh'
      });
      var refreshIcon = this.getIcon('refresh');
      this.refresh.appendChild(refreshIcon);
      this.padBody.appendChild(this.refresh);

      // The signature canvas.
      this.canvas = this.ce('canvas', {
        class: 'signature-pad-canvas',
        height: this.component.height
      });
      this.padBody.appendChild(this.canvas);

      this.signatureImage = this.ce('img', {
        style: 'width: 100%;display: none;'
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
      this.signaturePad = new _signature_pad2.default(this.canvas, {
        minWidth: this.component.minWidth,
        maxWidth: this.component.maxWidth,
        penColor: this.component.penColor,
        backgroundColor: this.component.backgroundColor
      });
      this.refresh.addEventListener('click', function (event) {
        event.preventDefault();
        _this2.showCanvas(true);
        _this2.signaturePad.clear();
      });
      this.signaturePad.onEnd = function () {
        return _this2.setValue(_this2.signaturePad.toDataURL(), {
          noSign: true
        });
      };

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
  }, {
    key: 'createViewOnlyLabel',
    value: function createViewOnlyLabel(container) {
      this.labelElement = this.ce('dt');
      this.labelElement.appendChild(this.text(this.component.footer));
      this.createTooltip(this.labelElement);
      container.appendChild(this.labelElement);
    }
  }, {
    key: 'getView',
    value: function getView(value) {
      return value ? 'Yes' : 'No';
    }
  }, {
    key: 'disabled',
    set: function set(disabled) {
      _set(SignatureComponent.prototype.__proto__ || Object.getPrototypeOf(SignatureComponent.prototype), 'disabled', disabled, this);
      this.showCanvas(!disabled);
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
  }]);

  return SignatureComponent;
}(_Base.BaseComponent);