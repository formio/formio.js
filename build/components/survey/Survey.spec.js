'use strict';

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _Survey = require('./Survey');

var _index = require('./fixtures/index');

var _harness = require('../../../test/harness');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Survey Component', function () {
  it('Should build a survey component', function (done) {
    _harness.Harness.testCreate(_Survey.SurveyComponent, _index.components.comp1).then(function (component) {
      var inputs = _harness.Harness.testElements(component, 'input[type="radio"]', 10);
      for (var i = 0; i < 5; i++) {
        _powerAssert2.default.equal(inputs[i].name, 'data[surveyQuestions][service]');
        _powerAssert2.default.equal(inputs[i].id, component.id + '-service-' + _index.components.comp1.values[i].value);
      }
      for (var _i = 5, j = 0; _i < 10; _i++, j++) {
        _powerAssert2.default.equal(inputs[_i].name, 'data[surveyQuestions][howWouldYouRateTheTechnology]');
        _powerAssert2.default.equal(inputs[_i].id, component.id + '-howWouldYouRateTheTechnology-' + _index.components.comp1.values[j].value);
      }
      done();
    });
  });

  it('Should set the value of surveys.', function (done) {
    _harness.Harness.testCreate(_Survey.SurveyComponent, _index.components.comp1).then(function (component) {
      _harness.Harness.testSetGet(component, { service: 'bad', howWouldYouRateTheTechnology: 'good' });
      var inputs = _harness.Harness.testElements(component, 'input[type="radio"]', 10);
      for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].id === component.id + '-service-bad' || inputs[i].id === component.id + '-howWouldYouRateTheTechnology-good') {
          _powerAssert2.default.equal(inputs[i].checked, true);
        } else {
          _powerAssert2.default.equal(inputs[i].checked, false);
        }
      }
      done();
    });
  });
});