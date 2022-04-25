"use strict";

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.array.slice.js");

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _i18next = _interopRequireDefault(require("i18next"));

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var renders = require('../../test/renders');

var forms = require('../../test/formtest');

var pretty = require('pretty');

var fs = require('fs');

var i18Defaults = require('../i18n');

var AllComponents = require('../components').default;

var Components = require('../components/Components').default;

var templates = require('./index').default;

var Form = require('../Form').default;

Components.setComponents(AllComponents);
var componentDir = 'components';

var fixComponent = function fixComponent(instance) {
  var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  instance.id = instance.key;
  index++;

  if (instance.everyComponent) {
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
    return new _nativePromiseOnly.default(function (resolve, reject) {
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
        if (component !== 'componentmodal') {
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

            if (fs.existsSync("./lib/".concat(componentDir, "/").concat(component, "/fixtures/values.js"))) {
              var values = require("../".concat(componentDir, "/").concat(component, "/fixtures/values.js")).default.slice(0);

              values.unshift(undefined);
              values.forEach(function (value, index) {
                it("Renders ".concat(component, " for ").concat(framework, " value ").concat(index, " as html"), function (done) {
                  var instance = new AllComponents[component]({}, {
                    template: framework,
                    flatten: true,
                    renderMode: 'html'
                  });
                  instance.dataValue = value;
                  fixComponent(instance);

                  _powerAssert.default.equal(renders["component-".concat(framework, "-").concat(component, "-html-value").concat(index)], pretty(instance.render(), {
                    ocd: true
                  }));

                  done();
                });
                it("Renders ".concat(component, " for ").concat(framework, " value ").concat(index, " as string"), function (done) {
                  var instance = new AllComponents[component]({}, {
                    template: framework,
                    flatten: true,
                    renderMode: 'html'
                  });
                  fixComponent(instance);
                  var file = renders["component-".concat(framework, "-").concat(component, "-string-value").concat(index)];
                  var val = instance.getValueAsString(value);

                  if (val !== file) {
                    console.log('er');
                  }

                  _powerAssert.default.equal(renders["component-".concat(framework, "-").concat(component, "-string-value").concat(index)], pretty(instance.getValueAsString(value), {
                    ocd: true
                  }));

                  done();
                });
              });
            }
          });
        }
      });
    });
  });
});