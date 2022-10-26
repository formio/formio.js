"use strict";

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.concat.js");

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _lodash = _interopRequireDefault(require("lodash"));

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _Container = _interopRequireDefault(require("./Container"));

var _fixtures = require("./fixtures");

var _Formio = _interopRequireDefault(require("../../Formio"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Container Component', function () {
  it('Should build a container component', function () {
    return _harness.default.testCreate(_Container.default, _fixtures.comp1).then(function (component) {
      var inputs = _harness.default.testElements(component, 'input[type="text"]', 2);

      for (var i = 0; i < inputs.length; i++) {
        _powerAssert.default.equal(inputs[i].name, "data[".concat(_fixtures.comp1.key, "][").concat(_fixtures.comp1.components[i].key, "]"));
      }
    });
  });
  it('Should be able to set and get data', function () {
    return _harness.default.testCreate(_Container.default, _fixtures.comp1).then(function (component) {
      var inputs = _harness.default.testElements(component, 'input[type="text"]', 2);

      _harness.default.testSetGet(component, {
        firstName: 'Joe',
        lastName: 'Smith'
      });

      _powerAssert.default.equal(inputs[0].value, 'Joe');

      _powerAssert.default.equal(inputs[1].value, 'Smith');
    });
  });
  it('Should set the dataValue, but after it sets the value of its nested components', function () {
    return _harness.default.testCreate(_Container.default, _fixtures.comp2).then(function (component) {
      var editGrid = component.getComponent('children');
      var setValue = editGrid.setValue;

      editGrid.setValue = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var changed = setValue.call.apply(setValue, [editGrid].concat(args));
        (0, _powerAssert.default)(changed, 'The edit grid must have changed');
        return changed;
      };

      component.setValue({
        children: [{
          name: 'Joe'
        }, {
          name: 'Sally'
        }]
      });
    });
  });
  it('Should render form with a submission in a draft-state without validation errors', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp3);

    var element = document.createElement('div');

    _Formio.default.createForm(element, form).then(function (form) {
      form.submission = {
        data: {
          'container': {
            'textField': 'a'
          }
        }
      };
      setTimeout(function () {
        var textField = form.getComponent(['textField']);
        var container = form.getComponent(['container']);

        _powerAssert.default.equal(textField.errors.length, 0);

        _powerAssert.default.equal(container.errors.length, 0);

        done();
      }, 100);
    }).catch(done);
  });
});