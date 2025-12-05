const renders = require('../renders');
const forms = require('../formtest');
const pretty = require('pretty');
const fs = require('fs');
const assert = require('power-assert');
const AllComponents = require('../../src/components').default;
const Components = require('../../src/components/Components').default;
const templates = require('../../src/templates/index').default;
const Form = require('../../src/Form').default;
Components.setComponents(AllComponents);
const componentDir = 'components';

const fixComponent = (instance, index = 0) => {
  instance.id = instance.key;
  index++;
  if (instance.everyComponent) {
    instance.everyComponent(component => fixComponent(component, index));
    if (instance.hasOwnProperty('subForm') && instance.subForm) {
      instance.subForm.id = instance.key;
    }
  }
  if (instance.type === 'file') {
    instance.support.filereader = true;
    instance.support.hasWarning = false;
  }
};

const normalizeLineEndings = (str) => str.replace(/\r\n/g, '\n');

describe('Rendering Tests', () => {
  Object.keys(templates).forEach(framework => {
    describe(`Framework ${framework}`, () => {
      describe('Form Renders', () => {
        Object.keys(forms).forEach(form => {
          it(`Form renders ${form}`, () => {
            return new Form(forms[form], { template: framework }).ready.then(instance => {
              fixComponent(instance);
              const expected = normalizeLineEndings(renders[`form-${framework}-${form}`]);
              const actual = normalizeLineEndings(pretty(instance.render(), { ocd: true }));
              assert.equal(expected, actual);
            });
          });
        });
      });

      Object.keys(AllComponents).forEach(component => {
        if (component !== 'componentmodal') {
          describe(`Component ${component}`, () => {
            it(`Renders ${component} for ${framework}`, (done) => {
              const instance = new AllComponents[component]({}, { template: framework });
              fixComponent(instance);
              const expected = normalizeLineEndings(renders[`component-${framework}-${component}`]);
              const actual = normalizeLineEndings(pretty(instance.render(), { ocd: true }));
              assert.equal(expected, actual);
              done();
            });
            it(`Renders ${component} for ${framework} as required`, (done) => {
              const instance = new AllComponents[component]({
                validate: {
                  required: true
                }
              }, {
                template: framework,
              });
              fixComponent(instance);
              const expected = normalizeLineEndings(renders[`component-${framework}-${component}-required`]);
              const actual = normalizeLineEndings(pretty(instance.render(), { ocd: true }));
              assert.equal(expected, actual);
              done();
            });
            it(`Renders ${component} for ${framework} as multiple`, (done) => {
              const instance = new AllComponents[component]({
                multiple: true
              }, {
                template: framework,
              });
              fixComponent(instance);
              const expected = normalizeLineEndings(pretty(renders[`component-${framework}-${component}-multiple`]));
              const actual = normalizeLineEndings(pretty(instance.render(), { ocd: true }));
              assert.equal(expected, actual);
              done();
            });

            if (fs.existsSync(`./lib/${componentDir}/${component}/fixtures/values.js`)) {
              const values = require(`../${componentDir}/${component}/fixtures/values.js`).default.slice(0);

              values.unshift(undefined);

              values.forEach((value, index) => {
                it(`Renders ${component} for ${framework} value ${index} as html`, (done) => {
                  const instance = new AllComponents[component]({}, {
                    template: framework,
                    flatten: true,
                    renderMode: 'html',
                  });
                  instance.dataValue = value;
                  fixComponent(instance);
                  const expected = normalizeLineEndings(renders[`component-${framework}-${component}-html-value${index}`]);
                  const actual = normalizeLineEndings(pretty(instance.render(), { ocd: true }));
                  assert.equal(expected, actual);
                  done();
                });
                it(`Renders ${component} for ${framework} value ${index} as string`, (done) => {
                  const instance = new AllComponents[component]({}, {
                    template: framework,
                    flatten: true,
                    renderMode: 'html',
                  });
                  fixComponent(instance);
                  const file = normalizeLineEndings(renders[`component-${framework}-${component}-string-value${index}`]);
                  const val = normalizeLineEndings(pretty(instance.getValueAsString(value), { ocd: true }));

                  if (val !== file) {
                    console.log('er');
                  }
                  assert.equal(file, val);
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
