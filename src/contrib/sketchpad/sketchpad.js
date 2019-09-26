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

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.split");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Base2 = _interopRequireDefault(require("../../components/base/Base"));

var _two = _interopRequireDefault(require("two.js"));

var _vanillaPicker = _interopRequireDefault(require("vanilla-picker"));

var _lodash = _interopRequireDefault(require("lodash"));

var _Formio = _interopRequireDefault(require("../../Formio"));

var _Sketchpad = _interopRequireDefault(require("./Sketchpad.form"));

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

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Sketchpad =
/*#__PURE__*/
function (_Base) {
  _inherits(Sketchpad, _Base);

  _createClass(Sketchpad, null, [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Base2.default.schema.apply(_Base2.default, [{
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
    key: "build",
    value: function build(state) {
      var _this2 = this;

      state = state || {};
      this.calculatedValue = state.calculatedValue;
      this.createElement();
      this.createLabel(this.element);
      this.viewSketchpad.canvas.container = this.ce('div', {
        class: 'formio-view-sketchpad-canvas'
      });
      this.viewSketchpad.background.container = this.ce('div', {
        class: 'formio-view-sketchpad-background'
      });
      this.addEventListener(this.viewSketchpad.canvas.container, 'click', this.editSvg.bind(this));
      this.element.appendChild(this.ce('div', {
        class: 'formio-view-sketchpad-container'
      }, [this.viewSketchpad.canvas.container, this.viewSketchpad.background.container]));
      this.editSketchpad.canvas.container = this.ce('div', {
        class: 'formio-edit-sketchpad-canvas'
      });
      this.editSketchpad.background.container = this.ce('div', {
        class: 'formio-edit-sketchpad-background'
      }); //init two instance

      this.two = new _two.default({
        type: _two.default.Types.svg
      }).appendTo(this.editSketchpad.canvas.container); //init canvas SVG variable

      this.editSketchpad.canvas.svg = this.two.renderer.domElement;
      this.addClass(this.editSketchpad.canvas.svg, 'formio-sketchpad-svg');
      this.addBackground();
      this.backgroundReady.promise.then(function () {
        _this2.backgroundReady.isReady = true;

        _this2.attach(); // Disable if needed.


        if (_this2.shouldDisable) {
          _this2.disabled = true;
        } // Restore the value.


        _this2.restoreValue();

        _this2.autofocus();

        _this2.attachLogic();
      });
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return this.dataValue;
    }
  }, {
    key: "editSvg",
    value: function editSvg() {
      var _this3 = this;

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
        _this3.saveSvg();

        _this3.editorModal.close(true);
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
        _this3.stretchDrawingArea();

        _this3.setEditorSize(_this3.dimensions.width, _this3.dimensions.height);
      };

      window.addEventListener('resize', resizeListener);
      this.stretchDrawingArea();
      this.editValue = _lodash.default.cloneDeep(this.dataValue);
      this.draw(this.editValue);
      var initialDialogClose = this.editorModal.close;

      this.editorModal.close = function (ignoreWarning) {
        if (ignoreWarning || confirm('Are you sure you want to close? Your unsaved progress will be lost')) {
          _this3.resetZoom();

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
      var _this4 = this;

      /* eslint-disable max-len */
      return this.ce('div', {
        class: 'btn-toolbar formio-sketchpad-toolbar',
        role: 'toolbar'
      }, [this.ce('div', {
        class: 'btn-group formio-sketchpad-toolbar-group',
        role: 'group'
      }, this.modeButtons = Object.keys(this.modes).map(function (key) {
        var mode = _this4.modes[key];

        var toolbarButton = _this4.ce('div', {
          class: "btn btn-secondary formio-sketchpad-toolbar-button formio-sketchpad-toolbar-button-".concat(key, " ").concat(_this4.state.mode === mode.state.mode ? ' active' : ''),
          onClick: function onClick() {
            return _this4.setState(mode.state);
          },
          title: mode.title
        }, _this4.ce('i', {
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
        var toolbarButtonIcon = _this4.ce('i', {
          class: "fa fa-".concat(button.icon)
        });

        var toolbarButton = _this4.ce('div', {
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
        return _this4.ce('div', {
          class: "btn btn-secondary formio-sketchpad-toolbar-button formio-sketchpad-toolbar-button-".concat(button.action),
          onClick: function onClick() {
            return _this4[button.action]();
          },
          title: button.title
        }, _this4.ce('i', {
          class: "fa fa-".concat(button.icon)
        }));
      }))]);
      /* eslint-enable max-len */
    }
  }, {
    key: "attach",
    value: function attach() {
      var _this5 = this;

      // Set up mouse events.
      this.editSketchpad.canvas.svg.addEventListener('mousedown', function (e) {
        e.preventDefault();

        var offset = _this5.editSketchpad.canvas.svg.getBoundingClientRect(); //change cursor


        var cursor = 'default';

        if (_this5.modes[_this5.state.mode].cursor) {
          cursor = _this5.modes[_this5.state.mode].cursor.clicked || _this5.modes[_this5.state.mode].cursor.hover;
        }

        _this5.editSketchpad.canvas.svg.style.cursor = cursor;

        if (_this5.modes[_this5.state.mode].eventStart) {
          _this5.modes[_this5.state.mode].eventStart(_this5.getActualCoordinate({
            x: e.clientX - offset.left,
            y: e.clientY - offset.top
          }));
        }

        var mouseDrag = function mouseDrag(e) {
          e.preventDefault();

          var offset = _this5.editSketchpad.canvas.svg.getBoundingClientRect();

          if (_this5.modes[_this5.state.mode].drag) {
            _this5.modes[_this5.state.mode].drag(_this5.getActualCoordinate({
              x: e.clientX - offset.left,
              y: e.clientY - offset.top
            }));
          }
        };

        var mouseEnd = function mouseEnd(e) {
          e.preventDefault();

          _this5.editSketchpad.canvas.svg.removeEventListener('mousemove', mouseDrag);

          _this5.editSketchpad.canvas.svg.removeEventListener('mouseup', mouseEnd); //change cursor


          var cursor = 'default';

          if (_this5.modes[_this5.state.mode].cursor) {
            cursor = _this5.modes[_this5.state.mode].cursor.hover || cursor;
          }

          _this5.editSketchpad.canvas.svg.style.cursor = cursor;

          var offset = _this5.editSketchpad.canvas.svg.getBoundingClientRect();

          if (_this5.modes[_this5.state.mode].eventEnd) {
            _this5.modes[_this5.state.mode].eventEnd(_this5.getActualCoordinate({
              x: e.clientX - offset.left,
              y: e.clientY - offset.top
            }));
          }
        };

        _this5.editSketchpad.canvas.svg.addEventListener('mousemove', mouseDrag);

        _this5.editSketchpad.canvas.svg.addEventListener('mouseup', mouseEnd);

        return false;
      }); // Set up touch events.

      this.editSketchpad.canvas.svg.addEventListener('touchstart', function (e) {
        e.preventDefault();

        var offset = _this5.editSketchpad.canvas.svg.getBoundingClientRect();

        var touch = e.changedTouches[0]; //change cursor

        var cursor = 'default';

        if (_this5.modes[_this5.state.mode].cursor) {
          cursor = _this5.modes[_this5.state.mode].cursor.clicked || _this5.modes[_this5.state.mode].cursor.hover;
        }

        _this5.editSketchpad.canvas.svg.style.cursor = cursor;

        if (_this5.modes[_this5.state.mode].eventStart) {
          _this5.modes[_this5.state.mode].eventStart(_this5.getActualCoordinate({
            x: touch.pageX - offset.left,
            y: touch.pageY - offset.top
          }));
        }

        var touchDrag = function touchDrag(e) {
          e.preventDefault();

          var offset = _this5.editSketchpad.canvas.svg.getBoundingClientRect();

          var touch = e.changedTouches[0];

          if (_this5.modes[_this5.state.mode].drag) {
            _this5.modes[_this5.state.mode].drag(_this5.getActualCoordinate({
              x: touch.pageX - offset.left,
              y: touch.pageY - offset.top
            }));
          }
        };

        var touchEnd = function touchEnd(e) {
          e.preventDefault();

          _this5.editSketchpad.canvas.svg.removeEventListener('touchmove', touchDrag);

          _this5.editSketchpad.canvas.svg.removeEventListener('touchend', touchEnd);

          var offset = _this5.editSketchpad.canvas.svg.getBoundingClientRect();

          var touch = e.changedTouches[0]; //change cursor

          var cursor = 'default';

          if (_this5.modes[_this5.state.mode].cursor) {
            cursor = _this5.modes[_this5.state.mode].cursor.hover || cursor;
          }

          _this5.editSketchpad.canvas.svg.style.cursor = cursor;

          if (_this5.modes[_this5.state.mode].eventEnd) {
            _this5.modes[_this5.state.mode].eventEnd(_this5.getActualCoordinate({
              x: touch.pageX - offset.left,
              y: touch.pageY - offset.top
            }));
          }
        };

        _this5.editSketchpad.canvas.svg.addEventListener('touchmove', touchDrag);

        _this5.editSketchpad.canvas.svg.addEventListener('touchend', touchEnd);

        return false;
      });
      this.two.update();
    }
  }, {
    key: "addBackground",
    value: function addBackground() {
      var _this6 = this;

      if (this.component.image) {
        this.setBackgroundImage(this.component.image);
        this.backgroundReady.resolve();
      } else if (this.component.imageUrl) {
        _Formio.default.makeStaticRequest(this.component.imageUrl, 'GET', null, {
          noToken: true,
          headers: {}
        }).then(function (image) {
          _this6.setBackgroundImage(image);

          _this6.backgroundReady.resolve();
        }).catch(function () {
          console.warn("Sketchpad background didn't load for component: ".concat(_this6.component.key));

          _this6.backgroundReady.resolve();
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

      svgMarkup = svgMarkup.replace('<svg:svg', '<svg').replace('</svg:svg>', '</svg>');
      this.editSketchpad.background.container.style.minWidth = "".concat(this.dimensions.width, "px");
      this.editSketchpad.background.container.style.minHeight = "".concat(this.dimensions.height, "px"); //set background containers content to SVG markup

      this.viewSketchpad.background.container.innerHTML = svgMarkup;
      this.editSketchpad.background.container.innerHTML = svgMarkup; //init svg variables

      this.viewSketchpad.background.svg = this.viewSketchpad.background.container.firstElementChild;
      this.editSketchpad.background.svg = this.editSketchpad.background.container.firstElementChild; //set background image viewBox

      var viewBox = this.zoomInfo.viewBox.current;
      this.viewSketchpad.background.svg.setAttribute('viewBox', "".concat(viewBox.minX, " ").concat(viewBox.minY, " ").concat(viewBox.width, " ").concat(viewBox.height));
      this.editSketchpad.background.svg.setAttribute('viewBox', "".concat(viewBox.minX, " ").concat(viewBox.minY, " ").concat(viewBox.width, " ").concat(viewBox.height)); //set canvas image viewBox (necessary at least for useBackgroundDimensions when background image has minX and minY other that 0

      this.editSketchpad.canvas.svg.setAttribute('viewBox', "".concat(viewBox.minX, " ").concat(viewBox.minY, " ").concat(viewBox.width, " ").concat(viewBox.height)); //set dimensions for Two.js instance

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
      var _this7 = this;

      this.clear();
      var layers = value.map(function (item) {
        return _this7.modes[item.mode].draw(item);
      });
      this.two.update();
      this.layers = layers;

      if (layers.length) {
        layers.forEach(function (layer, index) {
          layer._renderer.elem.addEventListener('click', function (e) {
            return _this7.click(e, index);
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
      var _this8 = this;

      this.modeButtons.forEach(function (button) {
        return _this8.removeClass(button, 'active');
      });
      Object.keys(this.modes).forEach(function (key, index) {
        if (_this8.modes[key].state.mode === mode) {
          _this8.addClass(_this8.modeButtons[index], 'active');
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
      var _this9 = this;

      return {
        pencil: {
          icon: 'pencil',
          title: 'Pencil',
          state: {
            mode: 'pencil'
          },
          eventStart: function eventStart(coordinate) {
            _this9.points = [coordinate];
            _this9.prev = coordinate;
            _this9.curve = _this9.two.makeCurve([new _two.default.Vector(_this9.prev.x, _this9.prev.y), new _two.default.Vector(coordinate.x, coordinate.y + 1)], true);
            _this9.curve.noFill().stroke = _this9.state.stroke;
            _this9.curve.linewidth = _this9.state.linewidth;

            _this9.curve.vertices.forEach(function (v) {
              return v.addSelf(_this9.curve.translation);
            });

            _this9.curve.translation.clear();

            _this9.two.update();

            _this9.layers.push(_this9.curve);

            _this9.curve._renderer.elem.addEventListener('click', function (e) {
              return _this9.click(e, _this9.layers.length);
            });
          },
          drag: function drag(coordinate) {
            _this9.points.push(coordinate);

            _this9.curve.vertices.push(new _two.default.Vector(coordinate.x, coordinate.y));

            _this9.two.update();

            _this9.prev = coordinate;
          },
          eventEnd: function eventEnd() {
            var value = _this9.editValue.slice();

            value.push(Object.assign({}, _this9.state, {
              points: _this9.points
            }));
            _this9.editValue = value;

            _this9.triggerChange();
          },
          draw: function draw(state) {
            var layer = _this9.two.makeCurve(state.points.map(function (point) {
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
            _this9.center = coordinate;
            _this9.line = _this9.two.makeLine(coordinate.x, coordinate.y, coordinate.x, coordinate.y);
            _this9.line.fill = _this9.state.fill;
            _this9.line.stroke = _this9.state.stroke;
            _this9.line.linewidth = _this9.state.linewidth;

            _this9.two.update();

            _this9.layers.push(_this9.line);

            var index = _this9.layers.length - 1;

            _this9.line._renderer.elem.addEventListener('click', function (e) {
              return _this9.click(e, index);
            });
          },
          drag: function drag(coordinate) {
            _this9.line.vertices[1].x = coordinate.x;
            _this9.line.vertices[1].y = coordinate.y;

            _this9.two.update();
          },
          eventEnd: function eventEnd() {
            var value = _this9.editValue.slice();

            var vertices = _this9.line.vertices.map(function (vertice) {
              return {
                x: vertice.x,
                y: vertice.y
              };
            });

            value.push(Object.assign({}, _this9.state, {
              vertices: vertices
            }));
            _this9.editValue = value;

            _this9.triggerChange();
          },
          draw: function draw(state) {
            var layer = _this9.two.makeLine(state.vertices[0].x, state.vertices[0].y, state.vertices[1].x, state.vertices[1].y);

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
            _this9.center = coordinate;

            var layer = _this9.two.makeCircle(coordinate.x, coordinate.y, _this9.state.circleSize);

            layer.fill = _this9.state.fill;
            layer.stroke = _this9.state.stroke;
            layer.linewidth = _this9.state.linewidth;

            _this9.two.update();

            _this9.layers.push(layer);

            var index = _this9.layers.length - 1;

            layer._renderer.elem.addEventListener('click', function (e) {
              return _this9.click(e, index);
            });
          },
          drag: function drag() {},
          eventEnd: function eventEnd() {
            var value = _this9.editValue.slice();

            value.push(Object.assign({}, _this9.state, {
              center: _this9.center
            }));
            _this9.editValue = value;

            _this9.triggerChange();
          },
          draw: function draw(state) {
            var layer = _this9.two.makeCircle(state.center.x, state.center.y, state.circleSize);

            layer.fill = state.fill;
            layer.stroke = state.stroke;
            layer.linewidth = state.linewidth;
            return layer;
          },
          attach: function attach(element) {
            var radiusInput = _this9.ce('input', {
              type: 'number',
              class: 'formio-sketchpad-toolbar-input formio-sketchpad-radius-input',
              onChange: function onChange(e) {
                _this9.state.circleSize = e.target.value;
              }
            });

            radiusInput.value = _this9.state.circleSize;
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
            _this9.dragStartPoint = coordinate;
          },
          drag: function drag(coordinate) {
            _this9.dragEndPoint = coordinate;

            if (_this9.rectangle) {
              _this9.rectangle.remove();
            }

            _this9.width = Math.abs(_this9.dragEndPoint.x - _this9.dragStartPoint.x);
            _this9.height = Math.abs(_this9.dragEndPoint.y - _this9.dragStartPoint.y);
            _this9.center = {
              x: Math.min(_this9.dragStartPoint.x, _this9.dragEndPoint.x) + _this9.width / 2,
              y: Math.min(_this9.dragStartPoint.y, _this9.dragEndPoint.y) + _this9.height / 2
            };
            _this9.rectangle = _this9.two.makeRectangle(_this9.center.x, _this9.center.y, _this9.width, _this9.height);
            _this9.rectangle.fill = _this9.state.fill;
            _this9.rectangle.stroke = _this9.state.stroke;
            _this9.rectangle.linewidth = _this9.state.linewidth;

            _this9.two.update();

            _this9.layers.push(_this9.rectangle);

            var index = _this9.layers.length - 1;

            _this9.rectangle._renderer.elem.addEventListener('click', function (e) {
              return _this9.click(e, index);
            });
          },
          eventEnd: function eventEnd() {
            var value = _this9.editValue.slice();

            delete _this9.rectangle;
            var rectangleState = {
              center: _this9.center,
              width: _this9.width,
              height: _this9.height
            };
            value.push(Object.assign({}, _this9.state, rectangleState));
            _this9.editValue = value;

            _this9.triggerChange();
          },
          draw: function draw(state) {
            var layer = _this9.two.makeRectangle(state.center.x, state.center.y, state.width, state.height);

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
            _this9.zoom(coordinate, _this9.zoomInfo.multiplier);
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
            _this9.zoom(coordinate, 1 / _this9.zoomInfo.multiplier);
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
            _this9.dragStartPoint = coordinate;
          },
          drag: function drag(coordinate) {
            if (!_this9.dragLastPoint) {
              _this9.dragLastPoint = _this9.dragStartPoint;
            }

            var offset = {
              x: Math.round(coordinate.x - _this9.dragStartPoint.x),
              y: Math.round(coordinate.y - _this9.dragStartPoint.y)
            };

            if (offset.x !== 0 || offset.y !== 0) {
              _this9.dragImage(offset);

              _this9.dragLastPoint = coordinate;
            }
          }
        }
      };
    }
  }, {
    key: "styles",
    get: function get() {
      var _this10 = this;

      return [{
        icon: 'square-o',
        title: 'Stroke Color',
        type: 'colorpicker',
        property: 'stroke',
        attach: function attach(element) {
          var picker = new _vanillaPicker.default(element);
          picker.setColor(_this10.state.stroke, true);

          picker.onChange = function (color) {
            _this10.state.stroke = color.rgbaString;
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
          picker.setColor(_this10.state.fill, true);

          picker.onChange = function (color) {
            _this10.state.fill = color.rgbaString;
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
          var widthInput = _this10.ce('input', {
            type: 'number',
            class: 'formio-sketchpad-toolbar-input formio-sketchpad-linewidth-input',
            onChange: function onChange(e) {
              _this10.state.linewidth = e.target.value;
            }
          });

          widthInput.value = _this10.state.linewidth;
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
}(_Base2.default);

exports.default = Sketchpad;

_defineProperty(Sketchpad, "builderInfo", {
  title: 'Sketchpad',
  group: 'advanced',
  icon: 'fa fa-image',
  weight: 110,
  documentation: 'http://help.form.io/userguide/',
  schema: Sketchpad.schema()
});

_defineProperty(Sketchpad, "editForm", _Sketchpad.default);