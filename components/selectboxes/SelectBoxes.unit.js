"use strict";

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.regexp.exec.js");

require("regenerator-runtime/runtime.js");

require("core-js/modules/es.string.trim.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.object.entries.js");

require("core-js/modules/es.promise.js");

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _SelectBoxes = _interopRequireDefault(require("./SelectBoxes"));

var _Formio = _interopRequireDefault(require("./../../Formio"));

var _fixtures = require("./fixtures");

var _wizardWithSelectBoxes = _interopRequireDefault(require("../../../test/forms/wizardWithSelectBoxes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe('SelectBoxes Component', function () {
  it('Should build a SelectBoxes component', function () {
    return _harness.default.testCreate(_SelectBoxes.default, _fixtures.comp1).then(function (component) {
      _harness.default.testElements(component, 'input[type="checkbox"]', 8);
    });
  });
  describe('error messages', function () {
    it('Should have a minSelectedCount validation message', function () {
      var formJson = {
        components: [{
          type: 'selectboxes',
          key: 'options',
          values: [{
            label: 'Option 1',
            value: '1'
          }, {
            label: 'Option 2',
            value: '2'
          }, {
            label: 'Option 3',
            value: '3'
          }, {
            label: 'Option 4',
            value: '4'
          }],
          validate: {
            minSelectedCount: 2
          }
        }]
      };
      var element = document.createElement('div');
      return _Formio.default.createForm(element, formJson).then( /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(form) {
          var comp;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  form.submission = {
                    data: {
                      options: {
                        1: true
                      }
                    }
                  };
                  comp = form.getComponent('options');
                  setTimeout(function () {
                    var messageContainer = comp.refs.messageContainer;

                    _powerAssert.default.equal(messageContainer.textContent.trim(), 'You must select at least 2 items.');
                  }, 300);

                case 3:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
    });
    it('Should use the minSelectedCountMessage if provided', function () {
      var formJson = {
        components: [{
          type: 'selectboxes',
          key: 'options',
          values: [{
            label: 'Option 1',
            value: '1'
          }, {
            label: 'Option 2',
            value: '2'
          }, {
            label: 'Option 3',
            value: '3'
          }, {
            label: 'Option 4',
            value: '4'
          }],
          validate: {
            minSelectedCount: 2
          },
          minSelectedCountMessage: 'Please select at least {{minCount}} items.'
        }]
      };
      var element = document.createElement('div');
      return _Formio.default.createForm(element, formJson).then( /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(form) {
          var comp;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  form.submission = {
                    data: {
                      options: {
                        1: true
                      }
                    }
                  };
                  comp = form.getComponent('options');
                  setTimeout(function () {
                    var messageContainer = comp.refs.messageContainer;

                    _powerAssert.default.equal(messageContainer.textContent.trim(), 'Please select at least 2 items.');
                  }, 300);

                case 3:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x2) {
          return _ref2.apply(this, arguments);
        };
      }());
    });
    it('Should have a maxSelectedCount validation message', function () {
      var formJson = {
        components: [{
          type: 'selectboxes',
          key: 'options',
          values: [{
            label: 'Option 1',
            value: '1'
          }, {
            label: 'Option 2',
            value: '2'
          }, {
            label: 'Option 3',
            value: '3'
          }, {
            label: 'Option 4',
            value: '4'
          }],
          validate: {
            maxSelectedCount: 2
          }
        }]
      };
      var element = document.createElement('div');
      return _Formio.default.createForm(element, formJson).then( /*#__PURE__*/function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(form) {
          var comp;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  form.submission = {
                    data: {
                      options: {
                        1: true,
                        2: true,
                        3: true
                      }
                    }
                  };
                  comp = form.getComponent('options');
                  setTimeout(function () {
                    var messageContainer = comp.refs.messageContainer;

                    _powerAssert.default.equal(messageContainer.textContent.trim(), 'You can only select up to 2 items.');
                  }, 300);

                case 3:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        return function (_x3) {
          return _ref3.apply(this, arguments);
        };
      }());
    });
    it('Should use the maxSelectedCountMessage if provided', function () {
      var formJson = {
        components: [{
          type: 'selectboxes',
          key: 'options',
          values: [{
            label: 'Option 1',
            value: '1'
          }, {
            label: 'Option 2',
            value: '2'
          }, {
            label: 'Option 3',
            value: '3'
          }, {
            label: 'Option 4',
            value: '4'
          }],
          validate: {
            maxSelectedCount: 2
          },
          maxSelectedCountMessage: 'Please select {{maxCount}} items at most.'
        }]
      };
      var element = document.createElement('div');
      return _Formio.default.createForm(element, formJson).then( /*#__PURE__*/function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(form) {
          var comp;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  form.submission = {
                    data: {
                      options: {
                        1: true,
                        2: true,
                        3: true
                      }
                    }
                  };
                  comp = form.getComponent('options');
                  setTimeout(function () {
                    var messageContainer = comp.refs.messageContainer;

                    _powerAssert.default.equal(messageContainer.textContent.trim(), 'Please select 2 items at most.');
                  }, 300);

                case 3:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
        }));

        return function (_x4) {
          return _ref4.apply(this, arguments);
        };
      }());
    });
  });
  it('Should set "checked" attribute correctly when value is changed', function (done) {
    _Formio.default.createForm(document.createElement('div'), _wizardWithSelectBoxes.default).then(function (form) {
      var selectBoxes = form.getComponent(['selectBoxes']);
      var value = {
        five: false,
        four: false,
        one: true,
        three: false,
        two: true
      };
      selectBoxes.setValue(value);

      var checkInputs = function checkInputs(values) {
        Object.entries(values).forEach(function (_ref5) {
          var _ref6 = _slicedToArray(_ref5, 2),
              key = _ref6[0],
              value = _ref6[1];

          var input = selectBoxes.element.querySelector("input[value=\"".concat(key, "\"]"));

          _powerAssert.default.equal(input.checked, value, 'Should be checked');
        });
      };

      setTimeout(function () {
        checkInputs(value);
        form.setPage(1);
        setTimeout(function () {
          form.setPage(0);
          setTimeout(function () {
            checkInputs(value);
            done();
          });
        }, 200);
      }, 200);
    }).catch(done);
  });
});
describe('SelectBoxes Component', function () {
  it('should have red asterisk left hand side to the options labels if component is required and label is hidden', function () {
    return _harness.default.testCreate(_SelectBoxes.default, _fixtures.comp3).then(function (component) {
      var options = component.element.querySelectorAll('.form-check-label');
      options.forEach(function (i) {
        _powerAssert.default.deepEqual(!!getComputedStyle(i, ':before'), true);
      });
    });
  });
});