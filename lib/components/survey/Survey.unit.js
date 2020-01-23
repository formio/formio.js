"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _Survey = _interopRequireDefault(require("./Survey"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = inputs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var input = _step.value;

          if (input.id === "".concat(component.key, "-service-bad") || input.id === "".concat(component.key, "-howWouldYouRateTheTechnology-good")) {
            _powerAssert.default.equal(input.checked, true);
          } else {
            _powerAssert.default.equal(input.checked, false);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
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