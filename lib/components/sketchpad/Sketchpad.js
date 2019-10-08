"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.fill");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.split");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Field2 = _interopRequireDefault(require("../../components/_classes/field/Field"));

var _two = _interopRequireDefault(require("two.js/src/two"));

var _vanillaPicker = _interopRequireDefault(require("vanilla-picker"));

var _lodash = _interopRequireDefault(require("lodash"));

var _Formio = _interopRequireDefault(require("../../Formio"));

var _Sketchpad = _interopRequireDefault(require("./Sketchpad.form"));

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Sketchpad =
/*#__PURE__*/
function (_Field) {
  _inherits(Sketchpad, _Field);

  _createClass(Sketchpad, null, [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Field2.default.schema.apply(_Field2.default, [{
        type: 'sketchpad',
        label: 'Sketchpad',
        key: 'sketchpad',
        defaultZoom: 100
      }].concat(extend));
    }
  }]);

  function Sketchpad() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Sketchpad);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Sketchpad)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _lodash.default.defaults(_this.component, {
      defaultZoom: 100
    });

    _this.deleted = [];
    _this.viewSketchpad = {
      canvas: {},
      background: {}
    };
    _this.editSketchpad = {
      canvas: {},
      background: {}
    }; //will use dimensions from background viewBox if either width or height is not defined for component
    //TODO maybe change this criteria to AND instead of OR, use defined dimension and default another missing dimension to value from viewBox (in this case will need to use promise in case of any missing dimension

    _this.useBackgroundDimensions = !_this.component.width || !_this.component.height; //initialize backgroundReady promise

    var backgroundReadyPromise = new _nativePromiseOnly.default(function (resolve, reject) {
      _this.backgroundReady = {
        resolve: resolve,
        reject: reject
      };
    });
    _this.backgroundReady.promise = backgroundReadyPromise; //default state of SVG editor

    _this.state = {
      mode: Object.keys(_this.modes)[0],
      stroke: '#333',
      fill: '#ccc',
      linewidth: 1,
      circleSize: 10
    };
    _this.dimensionsMultiplier = 1;
    _this.zoomInfo = {
      viewBox: {},
      multiplier: 1.5,
      totalMultiplier: 1
    };
    return _this;
  }
  /**
   * Builds the component.
   */


  _createClass(Sketchpad, [{
    key: "render",
    value: function render() {
      return _get(_getPrototypeOf(Sketchpad.prototype), "render", this).call(this, 'coming soon', {}); // return super.render(this.renderTemplate('sketchpad', {}));
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return this.dataValue;
    }
  }, {
    key: "editSvg",
    value: function editSvg() {
      var _this2 = this;

      if (this.options.readOnly) {
        return;
      } //open editor in modal


      this.editorModal = this.createModal();
      this.addClass(this.editorModal, 'formio-sketchpad-edit-dialog');
      this.addClass(this.editorModal.body, 'formio-sketchpad-edit-dialog-body');
      var toolbar = this.createToolbar();
      var metaInfoContainer = this.ce('div', {
        class: 'formio-sketchpad-meta-info'
      }, this.ce('span', {}, [this.totalMultiplierElement = this.ce('span', {}, this.t(Math.round(this.zoomInfo.totalMultiplier) * 100) / 100), this.t('x')]));
      this.saveSvgButton = this.ce('button', {
        class: 'btn btn-success formio-sketchpad-save-button'
      }, this.t('Save'));
      this.addEventListener(this.saveSvgButton, 'click', function () {
        _this2.saveSvg();

        _this2.editorModal.close(true);
      });
      this.editorModalHeader = this.ce('div', {
        class: 'formio-sketchpad-edit-dialog-header'
      }, [toolbar]);
      this.editorModalFooter = this.ce('div', {
        class: 'formio-sketchpad-edit-dialog-footer'
      }, [metaInfoContainer, this.saveSvgButton]);
      this.editorModalContent = this.ce('div', {
        class: 'formio-edit-sketchpad-container'
      }, [this.editSketchpad.canvas.container, this.editSketchpad.background.container]);
      this.editorModal.body.appendChild(this.editorModalHeader);
      this.editorModal.body.appendChild(this.editorModalContent);
      this.editorModal.body.appendChild(this.editorModalFooter);

      var resizeListener = function resizeListener() {
        _this2.stretchDrawingArea();

        _this2.setEditorSize(_this2.dimensions.width, _this2.dimensions.height);
      };

      window.addEventListener('resize', resizeListener);
      this.stretchDrawingArea();
      this.editValue = _lodash.default.cloneDeep(this.dataValue);
      this.draw(this.editValue);
      var initialDialogClose = this.editorModal.close;

      this.editorModal.close = function (ignoreWarning) {
        if (ignoreWarning || confirm('Are you sure you want to close? Your unsaved progress will be lost')) {
          _this2.resetZoom();

          window.removeEventListener('resize', resizeListener);
          initialDialogClose();
        }
      };

      this.resetZoom();
    }
  }, {
    key: "stretchDrawingArea",
    value: function stretchDrawingArea() {
      var _ref = [this.editorModal.bodyContainer.clientWidth, this.editorModal.bodyContainer.clientHeight],
          modalWidth = _ref[0],
          modalHeight = _ref[1];
      var computedStyle = getComputedStyle(this.editorModal.bodyContainer);

      var _map = ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'].map(function (property) {
        return parseFloat(computedStyle[property]);
      }),
          _map2 = _slicedToArray(_map, 4),
          paddingTop = _map2[0],
          paddingBottom = _map2[1],
          paddingLeft = _map2[2],
          paddingRight = _map2[3];

      var _ref2 = [this.editorModalHeader.offsetHeight, this.editorModalFooter.offsetHeight],
          headerHeight = _ref2[0],
          footerHeight = _ref2[1],
          availableWidth = modalWidth - paddingLeft - paddingRight,
          availableHeight = modalHeight - paddingTop - paddingBottom - headerHeight - footerHeight,
          defaultWidth = this.zoomInfo.viewBox.default.width,
          defaultHeight = this.zoomInfo.viewBox.default.height,
          widthRatio = availableWidth / defaultWidth,
          heightRatio = availableHeight / defaultHeight; //use the smallest ratio as multiplier so that drawing area doesn't overflow popup in any dimension

      this.dimensionsMultiplier = Math.min(widthRatio, heightRatio); //calculate new dimensions so that drawing area fills all free modal space

      this.dimensions.width = Math.round(defaultWidth * this.dimensionsMultiplier);
      this.dimensions.height = Math.round(defaultHeight * this.dimensionsMultiplier);
    }
  }, {
    key: "saveSvg",
    value: function saveSvg() {
      this.dataValue = this.editValue;
      this.copySvgToView();
    }
  }, {
    key: "createToolbar",
    value: function createToolbar() {
      var _this3 = this;

      /* eslint-disable max-len */
      return this.ce('div', {
        class: 'btn-toolbar formio-sketchpad-toolbar',
        role: 'toolbar'
      }, [this.ce('div', {
        class: 'btn-group formio-sketchpad-toolbar-group',
        role: 'group'
      }, this.modeButtons = Object.keys(this.modes).map(function (key) {
        var mode = _this3.modes[key];

        var toolbarButton = _this3.ce('div', {
          class: "btn btn-secondary formio-sketchpad-toolbar-button formio-sketchpad-toolbar-button-".concat(key, " ").concat(_this3.state.mode === mode.state.mode ? ' active' : ''),
          onClick: function onClick() {
            return _this3.setState(mode.state);
          },
          title: mode.title
        }, _this3.ce('i', {
          class: "fa fa-".concat(mode.icon)
        }));

        if (mode.attach) {
          return mode.attach(toolbarButton);
        }

        return toolbarButton;
      })), this.ce('div', {
        class: 'btn-group formio-sketchpad-toolbar-group',
        role: 'group'
      }, this.styles.map(function (button) {
        var toolbarButtonIcon = _this3.ce('i', {
          class: "fa fa-".concat(button.icon)
        });

        var toolbarButton = _this3.ce('div', {
          class: "btn btn-secondary formio-sketchpad-toolbar-button formio-sketchpad-toolbar-button-".concat(button.property),
          title: button.title
        }, toolbarButtonIcon);

        if (button.attach) {
          return button.attach(toolbarButton);
        }

        return toolbarButton;
      })), this.ce('div', {
        class: 'btn-group float-right formio-sketchpad-toolbar-group',
        role: 'group'
      }, this.actions.map(function (button) {
        return _this3.ce('div', {
          class: "btn btn-secondary formio-sketchpad-toolbar-button formio-sketchpad-toolbar-button-".concat(button.action),
          onClick: function onClick() {
            return _this3[button.action]();
          },
          title: button.title
        }, _this3.ce('i', {
          class: "fa fa-".concat(button.icon)
        }));
      }))]);
      /* eslint-enable max-len */
    }
  }, {
    key: "attach",
    value: function attach(element) {
      // Disable for now.
      return _get(_getPrototypeOf(Sketchpad.prototype), "attach", this).call(this, element);
    }
  }, {
    key: "attachOld",
    value: function attachOld(element) {
      var _this4 = this;

      this.loadRefs(element, {
        sketchpadContainer: 'single',
        sketchpadCanvas: 'single',
        sketchpadBackground: 'single'
      });
      this.addEventListener(this.refs.sketchpadContainer, 'click', function () {
        return _this4.editSvg();
      }); //init two instance
      // this.two = new Two({
      //   type: Two.Types.svg,
      // }).appendTo(this.editSketchpad.canvas.container);
      // //init canvas SVG variable
      // this.editSketchpad.canvas.svg = this.two.renderer.domElement;
      // this.addClass(this.editSketchpad.canvas.svg, 'formio-sketchpad-svg');

      this.addBackground();
      this.backgroundReady.promise.then(function () {
        _this4.backgroundReady.isReady = true;

        _this4.attach(); // Disable if needed.


        if (_this4.shouldDisable) {
          _this4.disabled = true;
        } // Restore the value.


        _this4.restoreValue();

        _this4.autofocus();

        _this4.attachLogic();
      }); // Set up mouse events.

      this.editSketchpad.canvas.svg.addEventListener('mousedown', function (e) {
        e.preventDefault();

        var offset = _this4.editSketchpad.canvas.svg.getBoundingClientRect(); //change cursor


        var cursor = 'default';

        if (_this4.modes[_this4.state.mode].cursor) {
          cursor = _this4.modes[_this4.state.mode].cursor.clicked || _this4.modes[_this4.state.mode].cursor.hover;
        }

        _this4.editSketchpad.canvas.svg.style.cursor = cursor;

        if (_this4.modes[_this4.state.mode].eventStart) {
          _this4.modes[_this4.state.mode].eventStart(_this4.getActualCoordinate({
            x: e.clientX - offset.left,
            y: e.clientY - offset.top
          }));
        }

        var mouseDrag = function mouseDrag(e) {
          e.preventDefault();

          var offset = _this4.editSketchpad.canvas.svg.getBoundingClientRect();

          if (_this4.modes[_this4.state.mode].drag) {
            _this4.modes[_this4.state.mode].drag(_this4.getActualCoordinate({
              x: e.clientX - offset.left,
              y: e.clientY - offset.top
            }));
          }
        };

        var mouseEnd = function mouseEnd(e) {
          e.preventDefault();

          _this4.editSketchpad.canvas.svg.removeEventListener('mousemove', mouseDrag);

          _this4.editSketchpad.canvas.svg.removeEventListener('mouseup', mouseEnd); //change cursor


          var cursor = 'default';

          if (_this4.modes[_this4.state.mode].cursor) {
            cursor = _this4.modes[_this4.state.mode].cursor.hover || cursor;
          }

          _this4.editSketchpad.canvas.svg.style.cursor = cursor;

          var offset = _this4.editSketchpad.canvas.svg.getBoundingClientRect();

          if (_this4.modes[_this4.state.mode].eventEnd) {
            _this4.modes[_this4.state.mode].eventEnd(_this4.getActualCoordinate({
              x: e.clientX - offset.left,
              y: e.clientY - offset.top
            }));
          }
        };

        _this4.editSketchpad.canvas.svg.addEventListener('mousemove', mouseDrag);

        _this4.editSketchpad.canvas.svg.addEventListener('mouseup', mouseEnd);

        return false;
      }); // Set up touch events.

      this.editSketchpad.canvas.svg.addEventListener('touchstart', function (e) {
        e.preventDefault();

        var offset = _this4.editSketchpad.canvas.svg.getBoundingClientRect();

        var touch = e.changedTouches[0]; //change cursor

        var cursor = 'default';

        if (_this4.modes[_this4.state.mode].cursor) {
          cursor = _this4.modes[_this4.state.mode].cursor.clicked || _this4.modes[_this4.state.mode].cursor.hover;
        }

        _this4.editSketchpad.canvas.svg.style.cursor = cursor;

        if (_this4.modes[_this4.state.mode].eventStart) {
          _this4.modes[_this4.state.mode].eventStart(_this4.getActualCoordinate({
            x: touch.pageX - offset.left,
            y: touch.pageY - offset.top
          }));
        }

        var touchDrag = function touchDrag(e) {
          e.preventDefault();

          var offset = _this4.editSketchpad.canvas.svg.getBoundingClientRect();

          var touch = e.changedTouches[0];

          if (_this4.modes[_this4.state.mode].drag) {
            _this4.modes[_this4.state.mode].drag(_this4.getActualCoordinate({
              x: touch.pageX - offset.left,
              y: touch.pageY - offset.top
            }));
          }
        };

        var touchEnd = function touchEnd(e) {
          e.preventDefault();

          _this4.editSketchpad.canvas.svg.removeEventListener('touchmove', touchDrag);

          _this4.editSketchpad.canvas.svg.removeEventListener('touchend', touchEnd);

          var offset = _this4.editSketchpad.canvas.svg.getBoundingClientRect();

          var touch = e.changedTouches[0]; //change cursor

          var cursor = 'default';

          if (_this4.modes[_this4.state.mode].cursor) {
            cursor = _this4.modes[_this4.state.mode].cursor.hover || cursor;
          }

          _this4.editSketchpad.canvas.svg.style.cursor = cursor;

          if (_this4.modes[_this4.state.mode].eventEnd) {
            _this4.modes[_this4.state.mode].eventEnd(_this4.getActualCoordinate({
              x: touch.pageX - offset.left,
              y: touch.pageY - offset.top
            }));
          }
        };

        _this4.editSketchpad.canvas.svg.addEventListener('touchmove', touchDrag);

        _this4.editSketchpad.canvas.svg.addEventListener('touchend', touchEnd);

        return false;
      });
      this.two.update();
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
          console.warn("Sketchpad background didn't load for component: ".concat(_this5.component.key));

          _this5.backgroundReady.resolve();
        });
      } //TODO make sure component works without background

    }
    /* eslint-disable max-statements */

  }, {
    key: "setBackgroundImage",
    value: function setBackgroundImage(svgMarkup) {
      var xmlDoc = new DOMParser().parseFromString(svgMarkup, 'image/svg+xml');
      var backgroundSvg = xmlDoc.getElementsByTagName('svg');

      if (!backgroundSvg || !backgroundSvg[0]) {
        console.warn("Sketchpad '".concat(this.component.key, "': Background SVG doesn't contain <svg> tag on it"));
        return;
      }

      backgroundSvg = backgroundSvg[0];

      if (this.useBackgroundDimensions) {
        var _viewBox = backgroundSvg.getAttribute('viewBox');

        var viewBoxMinX, viewBoxMinY, viewBoxWidth, viewBoxHeight;

        if (_viewBox) {
          var _viewBox$split$map = _viewBox.split(' ').map(parseFloat);

          var _viewBox$split$map2 = _slicedToArray(_viewBox$split$map, 4);

          viewBoxMinX = _viewBox$split$map2[0];
          viewBoxMinY = _viewBox$split$map2[1];
          viewBoxWidth = _viewBox$split$map2[2];
          viewBoxHeight = _viewBox$split$map2[3];
        } else {
          //if viewBox is not defined, use 'x', 'y', 'width' and 'height' SVG attributes (or 0, 0, 640, 480 relatively if any is not defined)
          var _map3 = [{
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

          var _map4 = _slicedToArray(_map3, 4);

          viewBoxMinX = _map4[0];
          viewBoxMinY = _map4[1];
          viewBoxWidth = _map4[2];
          viewBoxHeight = _map4[3];
        } //set  dimensions to width and height from viewBox of background svg


        this.dimensions = {
          width: viewBoxWidth,
          height: viewBoxHeight
        }; //set default and current viewBox sizes for canvas and background (should be based on background)

        this.zoomInfo.viewBox.default = {
          width: this.dimensions.width,
          height: this.dimensions.height,
          minX: viewBoxMinX,
          minY: viewBoxMinY
        };
      } else {
        //set dimensions to component width and height
        this.dimensions = {
          width: this.component.width,
          height: this.component.height
        };
        var viewBoxValue = backgroundSvg.getAttribute('viewBox');

        if (!viewBoxValue) {
          // since zooming works based on viewBox, we need to have explicitly defined value for it
          // if viewBox is not defined on SVG element, browser behaves like it's equal to "0 0 <current_width> <current_height>"
          // since background image should match dimensions of editor image, current width and height will always be equal to component.width and component.height
          // as a result:
          viewBoxValue = "0 0 ".concat(this.dimensions.width, " ").concat(this.dimensions.height);
          backgroundSvg.setAttribute('viewBox', viewBoxValue);
        }

        var _viewBoxValue$split$m = viewBoxValue.split(' ').map(parseFloat),
            _viewBoxValue$split$m2 = _slicedToArray(_viewBoxValue$split$m, 4),
            initialMinX = _viewBoxValue$split$m2[0],
            initialMinY = _viewBoxValue$split$m2[1],
            initialWidth = _viewBoxValue$split$m2[2],
            initialHeight = _viewBoxValue$split$m2[3];

        initialMinX = initialMinX || 0;
        initialMinY = initialMinY || 0;
        initialWidth = initialWidth || this.dimensions.width;
        initialHeight = initialHeight || this.dimensions.height;
        var width = this.dimensions.width,
            height = this.dimensions.height,
            minX = Math.round(initialMinX - (this.dimensions.width - initialWidth) / 2),
            minY = Math.round(initialMinY - (this.dimensions.height - initialHeight) / 2); //set initial zoom info for SVG

        this.zoomInfo.viewBox.default = {
          width: width,
          height: height,
          minX: minX,
          minY: minY
        };
      } //set current zoom to default


      this.zoomInfo.viewBox.current = _lodash.default.cloneDeep(this.zoomInfo.viewBox.default);
      svgMarkup = new XMLSerializer().serializeToString(backgroundSvg); //fix weird issue in Chrome when it returned '<svg:svg>...</svg:svg>' string after serialization instead of <svg>...</svg>

      svgMarkup = svgMarkup.replace('<svg:svg', '<svg').replace('</svg:svg>', '</svg>'); // this.editSketchpad.background.container.style.minWidth = `${this.dimensions.width}px`;
      // this.editSketchpad.background.container.style.minHeight = `${this.dimensions.height}px`;
      //set background containers content to SVG markup

      this.refs.sketchpadContainer.innerHTML = svgMarkup; // this.editSketchpad.background.container.innerHTML = svgMarkup;
      //init svg variables

      this.sketchpadBackground.svg = this.viewSketchpad.background.container.firstElementChild; // this.editSketchpad.background.svg = this.editSketchpad.background.container.firstElementChild;
      //set background image viewBox

      var viewBox = this.zoomInfo.viewBox.current;
      this.sketchpadBackground.svg.setAttribute('viewBox', "".concat(viewBox.minX, " ").concat(viewBox.minY, " ").concat(viewBox.width, " ").concat(viewBox.height)); // this.editSketchpad.background.svg.setAttribute('viewBox', `${viewBox.minX} ${viewBox.minY} ${viewBox.width} ${viewBox.height}`);
      //set canvas image viewBox (necessary at least for useBackgroundDimensions when background image has minX and minY other that 0
      // this.editSketchpad.canvas.svg.setAttribute('viewBox', `${viewBox.minX} ${viewBox.minY} ${viewBox.width} ${viewBox.height}`);
      //set dimensions for Two.js instance

      this.setEditorSize(this.dimensions.width, this.dimensions.height);
    }
    /* eslint-enable max-statements */

  }, {
    key: "clear",
    value: function clear() {
      this.two.clear();
    }
  }, {
    key: "clearAll",
    value: function clearAll() {
      this.layers = [];
      this.editValue = [];
      this.clear();
      this.two.update();
    }
  }, {
    key: "draw",
    value: function draw(value) {
      var _this6 = this;

      this.clear();
      var layers = value.map(function (item) {
        return _this6.modes[item.mode].draw(item);
      });
      this.two.update();
      this.layers = layers;

      if (layers.length) {
        layers.forEach(function (layer, index) {
          layer._renderer.elem.addEventListener('click', function (e) {
            return _this6.click(e, index);
          });
        });
      }
    }
  }, {
    key: "click",
    value: function click(event, index) {
      console.log(event, index);
    }
  }, {
    key: "undo",
    value: function undo() {
      var value = this.editValue.slice();

      if (value.length === 0) {
        return;
      }

      this.deleted.push(value.pop());
      this.editValue = value;
      this.triggerChange();
      this.draw(value);
    }
  }, {
    key: "redo",
    value: function redo() {
      if (this.deleted.length === 0) {
        return;
      }

      var value = this.editValue.slice();
      value.push(this.deleted.pop());
      this.editValue = value;
      this.triggerChange();
      this.draw(value);
    }
  }, {
    key: "setState",
    value: function setState(state) {
      Object.assign(this.state, state);
      this.setActiveButton(this.state.mode); //change cursor

      this.editSketchpad.canvas.svg.style.cursor = _lodash.default.get(this.modes[this.state.mode], 'cursor.hover', 'default');
    }
  }, {
    key: "setActiveButton",
    value: function setActiveButton(mode) {
      var _this7 = this;

      this.modeButtons.forEach(function (button) {
        return _this7.removeClass(button, 'active');
      });
      Object.keys(this.modes).forEach(function (key, index) {
        if (_this7.modes[key].state.mode === mode) {
          _this7.addClass(_this7.modeButtons[index], 'active');
        }
      });
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      if (!this.backgroundReady.isReady || !this.two) {
        return;
      }

      this.draw(value);
      this.copySvgToView();
    }
  }, {
    key: "copySvgToView",
    value: function copySvgToView() {
      //clone view SVG element from editor
      var svgElement = this.editSketchpad.canvas.svg.cloneNode(true); //make view SVG responsive: remove height and width attribute, add viewBox attribute

      svgElement.removeAttribute('height');
      svgElement.removeAttribute('width');
      svgElement.style.cursor = 'pointer'; //set viewBox to default to reset zoom

      var viewBox = this.zoomInfo.viewBox.default;
      svgElement.setAttribute('viewBox', "".concat(viewBox.minX, " ").concat(viewBox.minY, " ").concat(viewBox.width, " ").concat(viewBox.height));
      this.viewSketchpad.canvas.container.innerHTML = '';
      this.viewSketchpad.canvas.container.appendChild(svgElement);
    }
  }, {
    key: "zoom",
    value: function zoom(coordinate, multiplier) {
      this.setTotalMultiplier(this.zoomInfo.totalMultiplier * multiplier); //calculate new viewBox width for canvas

      this.zoomInfo.viewBox.current.width = Math.round(this.zoomInfo.viewBox.default.width / this.zoomInfo.totalMultiplier);
      this.zoomInfo.viewBox.current.height = Math.round(this.zoomInfo.viewBox.default.height / this.zoomInfo.totalMultiplier);

      if (this.zoomInfo.viewBox.current.width > this.zoomInfo.viewBox.default.width && this.zoomInfo.viewBox.current.height > this.zoomInfo.viewBox.default.height) {
        //if should get less than initial size, change editor size instead of viewBox size
        this.setEditorSize(this.dimensions.width * this.zoomInfo.totalMultiplier, this.dimensions.height * this.zoomInfo.totalMultiplier); //restore default viewBox values for canvas and background

        this.zoomInfo.viewBox.current = _lodash.default.cloneDeep(this.zoomInfo.viewBox.default);
      } else {
        //if should get more than initial size, change viewBox size
        //restore editor size if needed
        if (this.two.width !== this.dimensions.width || this.two.height !== this.dimensions.height) {
          this.setEditorSize(this.dimensions.width, this.dimensions.height);
        } //calculate SVG offset so that coordinate would be center of zoomed image


        this.zoomInfo.viewBox.current.minX = coordinate.x - this.zoomInfo.viewBox.current.width / 2;
        this.zoomInfo.viewBox.current.minY = coordinate.y - this.zoomInfo.viewBox.current.height / 2;
        this.normalizeSvgOffset();
      }

      this.updateSvgViewBox();
    }
  }, {
    key: "resetZoom",
    value: function resetZoom() {
      this.zoom({
        x: 0,
        y: 0
      }, this.component.defaultZoom / 100 / this.zoomInfo.totalMultiplier);
    }
  }, {
    key: "getActualCoordinate",
    value: function getActualCoordinate(coordinate) {
      //recalculate coordinate taking into account current zoom
      coordinate.x = Math.round(coordinate.x / this.zoomInfo.totalMultiplier / this.dimensionsMultiplier + this.zoomInfo.viewBox.current.minX);
      coordinate.y = Math.round(coordinate.y / this.zoomInfo.totalMultiplier / this.dimensionsMultiplier + this.zoomInfo.viewBox.current.minY);
      return coordinate;
    }
  }, {
    key: "dragImage",
    value: function dragImage(offset) {
      //calculate new offsets for SVG
      this.zoomInfo.viewBox.current.minX = this.zoomInfo.viewBox.current.minX - offset.x;
      this.zoomInfo.viewBox.current.minY = this.zoomInfo.viewBox.current.minY - offset.y;
      this.normalizeSvgOffset();
      this.updateSvgViewBox();
    }
  }, {
    key: "normalizeSvgOffset",
    value: function normalizeSvgOffset() {
      /* eslint-disable max-len */
      //don't let offset go out of SVG on the left and on the top
      //canvas
      this.zoomInfo.viewBox.current.minX = this.zoomInfo.viewBox.current.minX < this.zoomInfo.viewBox.default.minX ? this.zoomInfo.viewBox.default.minX : this.zoomInfo.viewBox.current.minX;
      this.zoomInfo.viewBox.current.minY = this.zoomInfo.viewBox.current.minY < this.zoomInfo.viewBox.default.minY ? this.zoomInfo.viewBox.default.minY : this.zoomInfo.viewBox.current.minY; //don't let offset go out of SVG on the right and on the bottom
      //canvas

      var canvasMaxOffsetX = this.zoomInfo.viewBox.default.width - this.zoomInfo.viewBox.current.width + this.zoomInfo.viewBox.default.minX,
          canvasMaxOffsetY = this.zoomInfo.viewBox.default.height - this.zoomInfo.viewBox.current.height + this.zoomInfo.viewBox.default.minY;
      this.zoomInfo.viewBox.current.minX = this.zoomInfo.viewBox.current.minX > canvasMaxOffsetX ? canvasMaxOffsetX : this.zoomInfo.viewBox.current.minX;
      this.zoomInfo.viewBox.current.minY = this.zoomInfo.viewBox.current.minY > canvasMaxOffsetY ? canvasMaxOffsetY : this.zoomInfo.viewBox.current.minY;
      /* eslint-enable max-len */
    }
  }, {
    key: "updateSvgViewBox",
    value: function updateSvgViewBox() {
      //set viewBox so that SVG gets zoomed to the proper area according to zoomInfo
      var viewBox = this.zoomInfo.viewBox.current;
      this.editSketchpad.canvas.svg.setAttribute('viewBox', "".concat(viewBox.minX, " ").concat(viewBox.minY, " ").concat(viewBox.width, " ").concat(viewBox.height));
      this.editSketchpad.background.svg.setAttribute('viewBox', "".concat(viewBox.minX, " ").concat(viewBox.minY, " ").concat(viewBox.width, " ").concat(viewBox.height));
    }
  }, {
    key: "setTotalMultiplier",
    value: function setTotalMultiplier(multiplier) {
      this.zoomInfo.totalMultiplier = multiplier;
      this.totalMultiplierElement.innerHTML = this.t(Math.round(multiplier * 100) / 100);
    }
  }, {
    key: "setEditorSize",
    value: function setEditorSize(width, height) {
      this.two.width = width;
      this.two.height = height;
      this.two.update(); //change width of background svg so it matches editor SVG

      this.editSketchpad.background.svg.style.width = width;
      this.editSketchpad.background.svg.style.height = height;
      this.editSketchpad.background.container.style.minWidth = "".concat(width, "px");
      this.editSketchpad.background.container.style.minHeight = "".concat(height, "px");
    }
  }, {
    key: "emptyValue",
    get: function get() {
      return [];
    }
  }, {
    key: "modes",
    get: function get() {
      var _this8 = this;

      return {
        pencil: {
          icon: 'pencil',
          title: 'Pencil',
          state: {
            mode: 'pencil'
          },
          eventStart: function eventStart(coordinate) {
            _this8.points = [coordinate];
            _this8.prev = coordinate;
            _this8.curve = _this8.two.makeCurve([new _two.default.Vector(_this8.prev.x, _this8.prev.y), new _two.default.Vector(coordinate.x, coordinate.y + 1)], true);
            _this8.curve.noFill().stroke = _this8.state.stroke;
            _this8.curve.linewidth = _this8.state.linewidth;

            _this8.curve.vertices.forEach(function (v) {
              return v.addSelf(_this8.curve.translation);
            });

            _this8.curve.translation.clear();

            _this8.two.update();

            _this8.layers.push(_this8.curve);

            _this8.curve._renderer.elem.addEventListener('click', function (e) {
              return _this8.click(e, _this8.layers.length);
            });
          },
          drag: function drag(coordinate) {
            _this8.points.push(coordinate);

            _this8.curve.vertices.push(new _two.default.Vector(coordinate.x, coordinate.y));

            _this8.two.update();

            _this8.prev = coordinate;
          },
          eventEnd: function eventEnd() {
            var value = _this8.editValue.slice();

            value.push(Object.assign({}, _this8.state, {
              points: _this8.points
            }));
            _this8.editValue = value;

            _this8.triggerChange();
          },
          draw: function draw(state) {
            var layer = _this8.two.makeCurve(state.points.map(function (point) {
              return new _two.default.Vector(point.x, point.y);
            }), true);

            layer.noFill().stroke = state.stroke;
            layer.linewidth = state.linewidth;
            layer.vertices.forEach(function (v) {
              return v.addSelf(layer.translation);
            });
            layer.translation.clear();
            return layer;
          }
        },
        line: {
          icon: 'minus',
          title: 'Line',
          state: {
            mode: 'line'
          },
          eventStart: function eventStart(coordinate) {
            _this8.center = coordinate;
            _this8.line = _this8.two.makeLine(coordinate.x, coordinate.y, coordinate.x, coordinate.y);
            _this8.line.fill = _this8.state.fill;
            _this8.line.stroke = _this8.state.stroke;
            _this8.line.linewidth = _this8.state.linewidth;

            _this8.two.update();

            _this8.layers.push(_this8.line);

            var index = _this8.layers.length - 1;

            _this8.line._renderer.elem.addEventListener('click', function (e) {
              return _this8.click(e, index);
            });
          },
          drag: function drag(coordinate) {
            _this8.line.vertices[1].x = coordinate.x;
            _this8.line.vertices[1].y = coordinate.y;

            _this8.two.update();
          },
          eventEnd: function eventEnd() {
            var value = _this8.editValue.slice();

            var vertices = _this8.line.vertices.map(function (vertice) {
              return {
                x: vertice.x,
                y: vertice.y
              };
            });

            value.push(Object.assign({}, _this8.state, {
              vertices: vertices
            }));
            _this8.editValue = value;

            _this8.triggerChange();
          },
          draw: function draw(state) {
            var layer = _this8.two.makeLine(state.vertices[0].x, state.vertices[0].y, state.vertices[1].x, state.vertices[1].y);

            layer.fill = state.fill;
            layer.stroke = state.stroke;
            layer.linewidth = state.linewidth;
            return layer;
          }
        },
        circle: {
          icon: 'circle',
          title: 'Circle',
          state: {
            mode: 'circle'
          },
          eventStart: function eventStart(coordinate) {
            _this8.center = coordinate;

            var layer = _this8.two.makeCircle(coordinate.x, coordinate.y, _this8.state.circleSize);

            layer.fill = _this8.state.fill;
            layer.stroke = _this8.state.stroke;
            layer.linewidth = _this8.state.linewidth;

            _this8.two.update();

            _this8.layers.push(layer);

            var index = _this8.layers.length - 1;

            layer._renderer.elem.addEventListener('click', function (e) {
              return _this8.click(e, index);
            });
          },
          drag: function drag() {},
          eventEnd: function eventEnd() {
            var value = _this8.editValue.slice();

            value.push(Object.assign({}, _this8.state, {
              center: _this8.center
            }));
            _this8.editValue = value;

            _this8.triggerChange();
          },
          draw: function draw(state) {
            var layer = _this8.two.makeCircle(state.center.x, state.center.y, state.circleSize);

            layer.fill = state.fill;
            layer.stroke = state.stroke;
            layer.linewidth = state.linewidth;
            return layer;
          },
          attach: function attach(element) {
            var radiusInput = _this8.ce('input', {
              type: 'number',
              class: 'formio-sketchpad-toolbar-input formio-sketchpad-radius-input',
              onChange: function onChange(e) {
                _this8.state.circleSize = e.target.value;
              }
            });

            radiusInput.value = _this8.state.circleSize;
            element.appendChild(radiusInput);
            return element;
          }
        },
        rectangle: {
          icon: 'square-o',
          cursor: {
            hover: 'crosshair'
          },
          title: 'Rectangle',
          state: {
            mode: 'rectangle'
          },
          eventStart: function eventStart(coordinate) {
            _this8.dragStartPoint = coordinate;
          },
          drag: function drag(coordinate) {
            _this8.dragEndPoint = coordinate;

            if (_this8.rectangle) {
              _this8.rectangle.remove();
            }

            _this8.width = Math.abs(_this8.dragEndPoint.x - _this8.dragStartPoint.x);
            _this8.height = Math.abs(_this8.dragEndPoint.y - _this8.dragStartPoint.y);
            _this8.center = {
              x: Math.min(_this8.dragStartPoint.x, _this8.dragEndPoint.x) + _this8.width / 2,
              y: Math.min(_this8.dragStartPoint.y, _this8.dragEndPoint.y) + _this8.height / 2
            };
            _this8.rectangle = _this8.two.makeRectangle(_this8.center.x, _this8.center.y, _this8.width, _this8.height);
            _this8.rectangle.fill = _this8.state.fill;
            _this8.rectangle.stroke = _this8.state.stroke;
            _this8.rectangle.linewidth = _this8.state.linewidth;

            _this8.two.update();

            _this8.layers.push(_this8.rectangle);

            var index = _this8.layers.length - 1;

            _this8.rectangle._renderer.elem.addEventListener('click', function (e) {
              return _this8.click(e, index);
            });
          },
          eventEnd: function eventEnd() {
            var value = _this8.editValue.slice();

            delete _this8.rectangle;
            var rectangleState = {
              center: _this8.center,
              width: _this8.width,
              height: _this8.height
            };
            value.push(Object.assign({}, _this8.state, rectangleState));
            _this8.editValue = value;

            _this8.triggerChange();
          },
          draw: function draw(state) {
            var layer = _this8.two.makeRectangle(state.center.x, state.center.y, state.width, state.height);

            layer.fill = state.fill;
            layer.stroke = state.stroke;
            layer.linewidth = state.linewidth;
            return layer;
          }
        },
        zoomIn: {
          icon: 'search-plus',
          cursor: {
            hover: 'zoom-in'
          },
          title: 'Zoom In',
          state: {
            mode: 'zoomIn'
          },
          eventStart: function eventStart(coordinate) {
            _this8.zoom(coordinate, _this8.zoomInfo.multiplier);
          }
        },
        zoomOut: {
          icon: 'search-minus',
          cursor: {
            hover: 'zoom-out'
          },
          title: 'Zoom Out',
          state: {
            mode: 'zoomOut'
          },
          eventStart: function eventStart(coordinate) {
            _this8.zoom(coordinate, 1 / _this8.zoomInfo.multiplier);
          }
        },
        drag: {
          icon: 'hand-paper-o',
          title: 'Drag Zoomed Image',
          cursor: {
            hover: 'grab',
            clicked: 'grabbing'
          },
          state: {
            mode: 'drag'
          },
          eventStart: function eventStart(coordinate) {
            _this8.dragStartPoint = coordinate;
          },
          drag: function drag(coordinate) {
            if (!_this8.dragLastPoint) {
              _this8.dragLastPoint = _this8.dragStartPoint;
            }

            var offset = {
              x: Math.round(coordinate.x - _this8.dragStartPoint.x),
              y: Math.round(coordinate.y - _this8.dragStartPoint.y)
            };

            if (offset.x !== 0 || offset.y !== 0) {
              _this8.dragImage(offset);

              _this8.dragLastPoint = coordinate;
            }
          }
        }
      };
    }
  }, {
    key: "styles",
    get: function get() {
      var _this9 = this;

      return [{
        icon: 'square-o',
        title: 'Stroke Color',
        type: 'colorpicker',
        property: 'stroke',
        attach: function attach(element) {
          var picker = new _vanillaPicker.default(element);
          picker.setColor(_this9.state.stroke, true);

          picker.onChange = function (color) {
            _this9.state.stroke = color.rgbaString;
            element.style.color = color.rgbaString;
          };

          return element;
        }
      }, {
        icon: 'square',
        title: 'Fill Color',
        type: 'colorpicker',
        property: 'fill',
        attach: function attach(element) {
          var picker = new _vanillaPicker.default(element);
          picker.setColor(_this9.state.fill, true);

          picker.onChange = function (color) {
            _this9.state.fill = color.rgbaString;
            element.style.color = color.rgbaString;
          };

          return element;
        }
      }, {
        icon: 'minus',
        title: 'Line Width',
        type: 'number',
        property: 'linewidth',
        attach: function attach(element) {
          var widthInput = _this9.ce('input', {
            type: 'number',
            class: 'formio-sketchpad-toolbar-input formio-sketchpad-linewidth-input',
            onChange: function onChange(e) {
              _this9.state.linewidth = e.target.value;
            }
          });

          widthInput.value = _this9.state.linewidth;
          element.appendChild(widthInput);
          return element;
        }
      }];
    }
  }, {
    key: "actions",
    get: function get() {
      return [{
        icon: 'undo',
        action: 'undo',
        title: 'Undo'
      }, {
        icon: 'repeat',
        action: 'redo',
        title: 'Redo'
      }, {
        icon: 'search',
        action: 'resetZoom',
        title: 'Reset Zoom'
      }, {
        icon: 'ban',
        action: 'clearAll',
        title: 'Clear All'
      }];
    }
  }, {
    key: "dataReady",
    get: function get() {
      return this.backgroundReady.promise;
    }
  }]);

  return Sketchpad;
}(_Field2.default);

exports.default = Sketchpad;

_defineProperty(Sketchpad, "builderInfo", {
  title: 'Sketchpad',
  group: 'premium',
  icon: 'pencil',
  weight: 110,
  documentation: 'http://help.form.io/userguide/',
  schema: Sketchpad.schema()
});

_defineProperty(Sketchpad, "editForm", _Sketchpad.default);