"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.fill");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.splice");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.reflect.set");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.split");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _two = _interopRequireDefault(require("two.js"));

var _NestedComponent2 = _interopRequireDefault(require("../../components/nested/NestedComponent"));

var _lodash = _interopRequireDefault(require("lodash"));

var _Base = _interopRequireDefault(require("../../components/base/Base"));

var _formio = require("../../formio.form");

var _Formio = _interopRequireDefault(require("../../Formio"));

var _utils = require("../../utils/utils");

var _Tagpad = _interopRequireDefault(require("./Tagpad.form"));

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function set(target, property, value, receiver) { if (typeof Reflect !== "undefined" && Reflect.set) { set = Reflect.set; } else { set = function set(target, property, value, receiver) { var base = _superPropBase(target, property); var desc; if (base) { desc = Object.getOwnPropertyDescriptor(base, property); if (desc.set) { desc.set.call(receiver, value); return true; } else if (!desc.writable) { return false; } } desc = Object.getOwnPropertyDescriptor(receiver, property); if (desc) { if (!desc.writable) { return false; } desc.value = value; Object.defineProperty(receiver, property, desc); } else { _defineProperty(receiver, property, value); } return true; }; } return set(target, property, value, receiver); }

function _set(target, property, value, receiver, isStrict) { var s = set(target, property, value, receiver || target); if (!s && isStrict) { throw new Error('failed to set property'); } return value; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Tagpad =
/*#__PURE__*/
function (_NestedComponent) {
  _inherits(Tagpad, _NestedComponent);

  _createClass(Tagpad, null, [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _NestedComponent2.default.schema.apply(_NestedComponent2.default, [{
        type: 'tagpad',
        label: 'Tagpad',
        key: 'tagpad',
        dotSize: 10,
        dotStrokeSize: 2,
        dotStrokeColor: '#333',
        dotFillColor: '#ccc',
        components: []
      }].concat(extend));
    }
  }]);

  function Tagpad() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Tagpad);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Tagpad)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.type = 'tagpad';
    _this.dots = [];

    _lodash.default.defaults(_this.component, {
      dotSize: 10,
      dotStrokeSize: 2,
      dotStrokeColor: '#333',
      dotFillColor: '#ccc'
    }); //init background ready promise


    var backgroundReadyPromise = new _nativePromiseOnly.default(function (resolve, reject) {
      _this.backgroundReady = {
        resolve: resolve,
        reject: reject
      };
    });
    _this.backgroundReady.promise = backgroundReadyPromise; //init dimensions multiplier

    _this.dimensionsMultiplier = 1;
    return _this;
  }

  _createClass(Tagpad, [{
    key: "build",
    value: function build(state) {
      if (this.options.builder) {
        return _get(_getPrototypeOf(Tagpad.prototype), "build", this).call(this, state, true);
      }

      this.createElement();
      this.createLabel(this.element);
      this.renderTagpad();
      this.createDescription(this.element);

      if (this.shouldDisable) {
        this.disabled = true;
      }

      this.element.appendChild(this.errorContainer = this.ce('div', {
        class: 'has-error'
      }));
      this.attachLogic();
    }
  }, {
    key: "renderTagpad",
    value: function renderTagpad() {
      var _this2 = this;

      this.tagpadContainer = this.ce('div', {
        class: 'formio-tagpad-container clearfix'
      });
      this.canvas = this.ce('div', {
        class: 'formio-tagpad-canvas'
      });
      this.background = this.ce('div', {
        class: 'formio-tagpad-background'
      });
      this.canvasContainer = this.ce('div', {
        class: 'formio-tagpad-image-container'
      }, [this.canvas, this.background]);
      this.formContainer = this.ce('div', {
        class: 'formio-tagpad-form-container'
      }, this.form = this.ce('div', {
        class: 'formio-tagpad-form'
      }));
      this.tagpadContainer.appendChild(this.canvasContainer);
      this.tagpadContainer.appendChild(this.formContainer);
      this.element.appendChild(this.tagpadContainer);

      if (this.hasBackgroundImage) {
        this.two = new _two.default({
          type: _two.default.Types.svg
        }).appendTo(this.canvas);
        this.canvasSvg = this.two.renderer.domElement;
        this.addBackground(); // Stretch drawing area on initial rendering of component.
        // Need a proper moment for that - when background is already displayed in browser so that it already has offsetWidth and offsetHeight
        // For case when component is built before form is initialized:

        this.on('initialized', function () {
          _this2.stretchDrawingArea();
        }); // For case when component is built after form is initialized (for ex. when it's on inactive tab of Tabs component), so this.on('initialized', ...) won't be fired:

        this.backgroundReady.promise.then(function () {
          _this2.stretchDrawingArea();
        });
        this.attach();
        this.redrawDots();
      } else {
        this.background.innerHTML = this.t('Background image is not specified. Tagpad doesn\'t work without background image');
      }
    }
  }, {
    key: "renderForm",
    value: function renderForm() {
      var _this3 = this;

      this.form.appendChild(this.ce('p', {
        class: 'formio-tagpad-form-title'
      }, [this.t('Dot: '), this.selectedDotIndexElement = this.ce('span', {}, 'No dot selected')]));
      this.component.components.forEach(function (component) {
        //have to avoid using createComponent method as Components there will be empty
        var componentInstance = _formio.Components.create(component, _this3.options, _this3.data);

        componentInstance.parent = _this3;
        componentInstance.root = _this3.root || _this3;
        var oldOnChange = componentInstance.onChange;

        componentInstance.onChange = function (flags, fromRoot) {
          oldOnChange.call(componentInstance, flags, fromRoot);

          _this3.saveSelectedDot();
        };

        _this3.form.appendChild(componentInstance.getElement()); //need to push to this.components all components with input: true so that saving would work properly


        _this3.addTagpadComponent(componentInstance);
      });
      this.form.appendChild(this.ce('button', {
        class: 'btn btn-sm btn-danger formio-tagpad-remove-button',
        onClick: this.removeSelectedDot.bind(this),
        title: 'Remove Dot'
      }, [this.ce('i', {
        class: this.iconClass('trash')
      })]));
      this.formRendered = true;
    }
  }, {
    key: "addTagpadComponent",
    value: function addTagpadComponent(componentInstance) {
      if (componentInstance.component.input) {
        this.components.push(componentInstance);
      } else if (componentInstance.components) {
        componentInstance.components.forEach(this.addTagpadComponent.bind(this));
      }
    }
  }, {
    key: "attach",
    value: function attach() {
      this.attachDrawEvents();
      window.addEventListener('resize', this.stretchDrawingArea.bind(this));
    }
  }, {
    key: "attachDrawEvents",
    value: function attachDrawEvents() {
      var _this4 = this;

      if (this.options.readOnly) {
        return;
      } // Set up mouse event.


      var mouseEnd = function mouseEnd(e) {
        e.preventDefault();

        var offset = _this4.canvasSvg.getBoundingClientRect();

        _this4.addDot(_this4.getActualCoordinate({
          x: e.clientX - offset.left,
          y: e.clientY - offset.top
        }));
      };

      this.canvasSvg.addEventListener('mouseup', mouseEnd); // Set up touch event.

      var touchEnd = function touchEnd(e) {
        e.preventDefault();

        var offset = _this4.canvasSvg.getBoundingClientRect();

        var touch = e.changedTouches[0];

        _this4.addDot(_this4.getActualCoordinate({
          x: touch.pageX - offset.left,
          y: touch.pageY - offset.top
        }));
      };

      this.canvasSvg.addEventListener('touchend', touchEnd);
      this.two.update();
    }
  }, {
    key: "getActualCoordinate",
    value: function getActualCoordinate(coordinate) {
      //recalculate coordinate taking into account changed size of drawing area
      coordinate.x = Math.round(coordinate.x / this.dimensionsMultiplier) + this.dimensions.minX;
      coordinate.y = Math.round(coordinate.y / this.dimensionsMultiplier) + this.dimensions.minY;
      return coordinate;
    }
  }, {
    key: "stretchDrawingArea",
    value: function stretchDrawingArea() {
      var width = this.background.offsetWidth;
      var height = this.background.offsetHeight; //don't stretch if background dimensions are unknown yet

      if (width && height) {
        //will need dimensions multiplier for coordinates calculation
        this.dimensionsMultiplier = width / this.dimensions.width;
        this.setEditorSize(width, height);
      }
    }
  }, {
    key: "addBackground",
    value: function addBackground() {
      var _this5 = this;

      if (this.component.image) {
        this.setBackgroundImage(this.component.image);
        this.backgroundReady.resolve();
      } else if (this.component.imageUrl) {
        _Formio.default.makeStaticRequest(this.component.imageUrl, 'GET', null, {
          noToken: true,
          headers: {}
        }).then(function (image) {
          _this5.setBackgroundImage(image);

          _this5.backgroundReady.resolve();
        }).catch(function () {
          //TODO check that component works in this case anyway
          _this5.background.innerHTML = _this5.t('Background image failed to load. Tagpad doesn\'t work without background image');

          _this5.backgroundReady.resolve();
        });
      }
    }
  }, {
    key: "setBackgroundImage",
    value: function setBackgroundImage(svgMarkup) {
      var xmlDoc = new DOMParser().parseFromString(svgMarkup, 'image/svg+xml');
      var backgroundSvg = xmlDoc.getElementsByTagName('svg');

      if (!backgroundSvg || !backgroundSvg[0]) {
        console.warn("Tagpad '".concat(this.component.key, "': Background SVG doesn't contain <svg> tag on it"));
        return;
      }

      backgroundSvg = backgroundSvg[0]; //read initial dimensions from viewBox

      var initialViewBox = backgroundSvg.getAttribute('viewBox');
      var viewBoxMinX, viewBoxMinY, viewBoxWidth, viewBoxHeight;

      if (initialViewBox) {
        var _initialViewBox$split = initialViewBox.split(' ').map(parseFloat);

        var _initialViewBox$split2 = _slicedToArray(_initialViewBox$split, 4);

        viewBoxMinX = _initialViewBox$split2[0];
        viewBoxMinY = _initialViewBox$split2[1];
        viewBoxWidth = _initialViewBox$split2[2];
        viewBoxHeight = _initialViewBox$split2[3];
      } else {
        //if viewBox is not defined, use 'x', 'y', 'width' and 'height' SVG attributes (or 0, 0, 640, 480 relatively if any is not defined)
        var _map = [{
          attribute: 'x',
          defaultValue: 0
        }, {
          attribute: 'y',
          defaultValue: 0
        }, {
          attribute: 'width',
          defaultValue: 640
        }, {
          attribute: 'height',
          defaultValue: 480
        }].map(function (dimension) {
          return parseFloat(backgroundSvg.getAttribute(dimension.attribute)) || dimension.defaultValue;
        });

        var _map2 = _slicedToArray(_map, 4);

        viewBoxMinX = _map2[0];
        viewBoxMinY = _map2[1];
        viewBoxWidth = _map2[2];
        viewBoxHeight = _map2[3];
      } //set initial dimensions to width and height from viewBox of background svg


      this.dimensions = {
        width: viewBoxWidth,
        height: viewBoxHeight,
        minX: viewBoxMinX,
        minY: viewBoxMinY
      }; //remove width and height attribute for background image to be stretched to available width and preserve aspect ratio

      backgroundSvg.removeAttribute('width');
      backgroundSvg.removeAttribute('height');
      var viewBox = this.dimensions; //set background image viewBox

      backgroundSvg.setAttribute('viewBox', "".concat(viewBox.minX, " ").concat(viewBox.minY, " ").concat(viewBox.width, " ").concat(viewBox.height)); //set canvas image viewBox (necessary for canvas SVG to stretch properly without losing correct aspect ration)

      this.canvasSvg.setAttribute('viewBox', "".concat(viewBox.minX, " ").concat(viewBox.minY, " ").concat(viewBox.width, " ").concat(viewBox.height));
      svgMarkup = new XMLSerializer().serializeToString(backgroundSvg); //fix weird issue in Chrome when it returned '<svg:svg>...</svg:svg>' string after serialization instead of <svg>...</svg>

      svgMarkup = svgMarkup.replace('<svg:svg', '<svg').replace('</svg:svg>', '</svg>');
      this.background.innerHTML = svgMarkup; //set dimensions for Two.js instance

      this.setEditorSize(this.dimensions.width, this.dimensions.height);
    }
  }, {
    key: "setEditorSize",
    value: function setEditorSize(width, height) {
      this.two.width = width;
      this.two.height = height;
      this.two.update();
    }
  }, {
    key: "addDot",
    value: function addDot(coordinate) {
      var dot = {
        coordinate: coordinate,
        data: {}
      };
      this.dataValue = this.dataValue || [];
      var newDotIndex = this.dataValue.length;
      var shape = this.drawDot(dot, newDotIndex);
      this.dots.push({
        index: newDotIndex,
        dot: dot,
        shape: shape
      });
      this.dataValue.push(dot);
      this.selectDot(newDotIndex);
      this.triggerChange();
    }
  }, {
    key: "dotClicked",
    value: function dotClicked(e, dot, index) {
      //prevent drawing another dot near clicked dot
      e.stopPropagation();
      this.selectDot(index);
    }
  }, {
    key: "selectDot",
    value: function selectDot(index) {
      if (index === null) {
        this.empty(this.form);
        this.components = [];
        this.formRendered = false;
        return;
      }

      if (!this.formRendered) {
        this.renderForm();
      }

      var dot = this.dots[index];

      if (!dot) {
        return;
      } //remove dashes for previous selected dot


      if (this.dots[this.selectedDotIndex]) {
        this.dots[this.selectedDotIndex].shape.circle.dashes = [0];
      } //add dashes to new selected dot


      dot.shape.circle.dashes = [1];
      this.two.update();
      this.selectedDotIndex = index;
      this.setFormValue(dot.dot.data);
      this.checkDotValidity(this.data, false, dot);
    }
  }, {
    key: "setFormValue",
    value: function setFormValue(value) {
      this.selectedDotIndexElement.innerHTML = this.selectedDotIndex + 1;
      this.components.forEach(function (component) {
        component.setValue(_lodash.default.get(value, component.key), {
          noUpdateEvent: true
        });
      });
    }
  }, {
    key: "updateValue",
    value: function updateValue(flags, value) {
      // Intentionally skip over nested component updateValue method to keep recursive update from occurring with sub components.
      return _Base.default.prototype.updateValue.call(this, flags, value);
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return this.dataValue;
    }
  }, {
    key: "setValue",
    value: function setValue(dots) {
      var _this6 = this;

      this.dataValue = dots;

      if (!dots) {
        return;
      }

      this.dots = [];
      dots.forEach(function (dot, index) {
        var shape = _this6.drawDot(dot, index);

        _this6.dots.push({
          index: index,
          dot: dot,
          shape: shape
        });
      });
    }
  }, {
    key: "drawDot",
    value: function drawDot(dot, index) {
      var _this7 = this;

      //draw circle
      var circle = this.two.makeCircle(dot.coordinate.x, dot.coordinate.y, this.component.dotSize);
      circle.fill = this.component.dotFillColor;
      circle.stroke = this.component.dotStrokeColor;
      circle.linewidth = this.component.dotStrokeSize;
      circle.className += ' formio-tagpad-dot'; //draw index

      var text = new _two.default.Text(index + 1, dot.coordinate.x, dot.coordinate.y);
      text.className += ' formio-tagpad-dot-index';
      text.styles = {
        color: this.component.dotStrokeColor
      };
      this.two.add(text);
      this.two.update();

      circle._renderer.elem.addEventListener('mouseup', function (e) {
        return _this7.dotClicked(e, dot, index);
      });

      text._renderer.elem.addEventListener('mouseup', function (e) {
        return _this7.dotClicked(e, dot, index);
      });

      return {
        circle: circle,
        text: text
      };
    }
  }, {
    key: "saveSelectedDot",
    value: function saveSelectedDot() {
      var selectedDot = this.dots[this.selectedDotIndex];
      this.components.forEach(function (component) {
        selectedDot.dot.data[component.key] = component.getValue();
      });
      this.dataValue[this.selectedDotIndex] = selectedDot.dot;
    }
  }, {
    key: "removeSelectedDot",
    value: function removeSelectedDot() {
      this.dataValue.splice(this.selectedDotIndex, 1);
      this.redrawDots();
      this.selectDot(0);
    }
  }, {
    key: "redrawDots",
    value: function redrawDots() {
      this.dots = []; //clear canvas

      this.two.clear();
      this.two.render(); //draw dots

      this.setValue(this.dataValue);
    }
  }, {
    key: "checkValidity",
    value: function checkValidity(data, dirty) {
      var _this8 = this;

      if (!this.checkCondition(null, data)) {
        this.setCustomValidity('');
        return true;
      }

      var isTagpadValid = true; //check validity of each dot

      this.dots.forEach(function (dot) {
        var isDotValid = _this8.checkDotValidity(data, dirty, dot);

        isTagpadValid = isTagpadValid && isDotValid;
      }); //in the end check validity of selected dot to show its validation results on the form instead of showing last dot validation

      if (this.selectedDotIndex) {
        this.checkDotValidity(data, dirty, this.dots[this.selectedDotIndex]);
      }

      if (isTagpadValid) {
        this.setCustomValidity('');
      } else {
        this.setCustomValidity(this.t('There are some invalid dots'), dirty);
      }

      return isTagpadValid;
    }
  }, {
    key: "checkDotValidity",
    value: function checkDotValidity(data, dirty, dot) {
      var isDotValid = this.components.reduce(function (valid, component) {
        component.dataValue = dot.dot.data[component.key];
        return valid && component.checkValidity(data, dirty);
      }, true);
      this.setDotValidity(dot, isDotValid);
      return isDotValid;
    }
  }, {
    key: "setDotValidity",
    value: function setDotValidity(dot, isValid) {
      var color;

      if (isValid) {
        color = this.component.dotStrokeColor;
      } else {
        color = '#ff0000';
      } //change style of dot based on its validity


      dot.shape.circle.stroke = color;
      dot.shape.text.styles.color = color;
      this.two.update();
    }
  }, {
    key: "addInputError",
    value: function addInputError(message, dirty) {
      var _this9 = this;

      //need to override this to not add has-error class (because has-error highlights all inner form-controls with red)
      if (!message) {
        return;
      }

      if (this.errorElement) {
        var errorMessage = this.ce('p', {
          class: 'help-block'
        });
        errorMessage.appendChild(this.text(message));
        this.errorElement.appendChild(errorMessage);
      }

      this.inputs.forEach(function (input) {
        return _this9.addClass(_this9.performInputMapping(input), 'is-invalid');
      });

      if (dirty && this.options.highlightErrors) {
        this.addClass(this.element, 'alert alert-danger');
      }
    }
  }, {
    key: "disabled",
    set: function set(disabled) {
      _set(_getPrototypeOf(Tagpad.prototype), "disabled", disabled, this, true); //call Base Component setter to run the logic for adding disabled class


      Object.getOwnPropertyDescriptor(_Base.default.prototype, 'disabled').set.call(this, disabled);
    }
  }, {
    key: "dataReady",
    get: function get() {
      return this.backgroundReady.promise;
    }
  }, {
    key: "hasBackgroundImage",
    get: function get() {
      return this.component.image || this.component.imageUrl;
    }
  }]);

  return Tagpad;
}(_NestedComponent2.default);

exports.default = Tagpad;

_defineProperty(Tagpad, "builderInfo", {
  title: 'Tagpad',
  group: 'advanced',
  icon: 'fa fa-tag',
  weight: 115,
  documentation: 'http://help.form.io/userguide/',
  schema: Tagpad.schema()
});

_defineProperty(Tagpad, "editForm", _Tagpad.default);