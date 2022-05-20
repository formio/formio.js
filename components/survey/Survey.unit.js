"use strict";

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _Survey = _interopRequireDefault(require("./Survey"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

describe('Survey Component', function () {
  it('Should build a survey component', function () {
    return _harness.default.testCreate(_Survey.default, _fixtures.comp1).then(function (component) {
      var inputs = _harness.default.testElements(component, 'input[type="radio"]', 10);

      inputs.forEach(function (input, index) {
        if (index < 5) {
          // Service
          _powerAssert.default.equal(input.name, 'data[surveyQuestions][service]');

          _powerAssert.default.equal(input.id, "".concat(component.key, "-service-").concat(_fixtures.comp1.values[index].value));
        } else {
          // How do you like our service?
          _powerAssert.default.equal(input.name, 'data[surveyQuestions][howWouldYouRateTheTechnology]');

          _powerAssert.default.equal(input.id, "".concat(component.key, "-howWouldYouRateTheTechnology-").concat(_fixtures.comp1.values[index - 5].value));
        }
      });
    });
  });
  it('Should set the value of surveys.', function () {
    return _harness.default.testCreate(_Survey.default, _fixtures.comp1).then(function (component) {
      _harness.default.testSetGet(component, {
        service: 'bad',
        howWouldYouRateTheTechnology: 'good'
      });

      var inputs = _harness.default.testElements(component, 'input[type="radio"]', 10);

      var _iterator = _createForOfIteratorHelper(inputs),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var input = _step.value;

          if (input.id === "".concat(component.key, "-service-bad") || input.id === "".concat(component.key, "-howWouldYouRateTheTechnology-good")) {
            _powerAssert.default.equal(input.checked, true);
          } else {
            _powerAssert.default.equal(input.checked, false);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    });
  });
  it('Should require all questions for required Survey', function (done) {
    _harness.default.testCreate(_Survey.default, _fixtures.comp2).then(function (component) {
      _harness.default.testSetGet(component, {
        service: 'bad'
      });

      component.on('componentChange', function () {
        done();
      }); // assert(component.element)
    });
  });
});