"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/web.dom-collections.for-each");

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _i18next = _interopRequireDefault(require("i18next"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var renders = require('../test/renders');

var forms = require('../test/formtest');

var pretty = require('pretty');

var i18Defaults = require('./i18n');

var AllComponents = require('./components').default;

var Components = require('./components/Components').default;

var templates = require('./templates').default;

var Form = require('./Form').default;

Components.setComponents(AllComponents);

var fixComponent = function fixComponent(instance) {
  var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  instance.id = instance.key;
  index++;

  if (instance.type === 'form') {
    instance.everyComponent(function (component) {
      return fixComponent(component, index);
    });

    if (instance.hasOwnProperty('subForm') && instance.subForm) {
      instance.subForm.id = instance.key;
    }
  }

  if (instance.type === 'file') {
    instance.support.filereader = true;
    instance.support.hasWarning = false;
  }
};

describe('Rendering Tests', function () {
  before(function () {
    return new Promise(function (resolve, reject) {
      _i18next.default.init(i18Defaults, function (err) {
        if (err) {
          return reject(err);
        }

        resolve();
      });
    });
  });
  Object.keys(templates).forEach(function (framework) {
    describe("Framework ".concat(framework), function () {
      describe('Form Renders', function () {
        Object.keys(forms).forEach(function (form) {
          it("Form renders ".concat(form), function () {
            return new Form(forms[form], {
              template: framework
            }).ready.then(function (instance) {
              fixComponent(instance);

              _powerAssert.default.equal(renders["form-".concat(framework, "-").concat(form)], pretty(instance.render(), {
                ocd: true
              }));
            });
          });
        });
      });
      Object.keys(AllComponents).forEach(function (component) {
        describe("Component ".concat(component), function () {
          it("Renders ".concat(component, " for ").concat(framework), function (done) {
            var instance = new AllComponents[component]({}, {
              template: framework
            });
            fixComponent(instance);

            _powerAssert.default.equal(renders["component-".concat(framework, "-").concat(component)], pretty(instance.render(), {
              ocd: true
            }));

            done();
          });
          it("Renders ".concat(component, " for ").concat(framework, " as required"), function (done) {
            var instance = new AllComponents[component]({
              validate: {
                required: true
              }
            }, {
              template: framework
            });
            fixComponent(instance);

            _powerAssert.default.equal(renders["component-".concat(framework, "-").concat(component, "-required")], pretty(instance.render(), {
              ocd: true
            }));

            done();
          });
          it("Renders ".concat(component, " for ").concat(framework, " as multiple"), function (done) {
            var instance = new AllComponents[component]({
              multiple: true
            }, {
              template: framework
            });
            fixComponent(instance);

            _powerAssert.default.equal(renders["component-".concat(framework, "-").concat(component, "-multiple")], pretty(instance.render(), {
              ocd: true
            }));

            done();
          });
        });
      });
    });
  });
});