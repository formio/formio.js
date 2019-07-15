const renders = require('../test/renders');
const forms = require('../test/formtest');
const pretty = require('pretty');
import assert from 'power-assert';
import i18next from 'i18next';

const i18Defaults = require('../lib/i18n');
const AllComponents = require('../lib/components').default;
const Components = require('../lib/components/Components').default;
const templates = require('../lib/templates').default;
const Form = require('../lib/Form').default;
Components.setComponents(AllComponents);

const fixComponent = (instance, index = 0) => {
  instance.id = instance.key;
  index++;
  if (instance.type === 'form') {
    instance.everyComponent(component => fixComponent(component, index));
    if (instance.hasOwnProperty('subForm')) {
      instance.subForm.id = instance.key;
    }
  }
};

describe('Rendering Tests', () => {
  before(() => {
    return new Promise((resolve, reject) => {
      i18next.init(i18Defaults, (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
  Object.keys(templates).forEach(framework => {
    describe(`Framework ${framework}`, () => {
      describe('Form Renders', () => {
        Object.keys(forms).forEach(form => {
          it(`Form renders ${form}`, () => {
            return new Form(forms[form]).ready.then(instance => {
              fixComponent(instance);
              console.log(renders[`form-${framework}-${form}`], pretty(instance.render(), { ocd: true }));
              assert.equal(renders[`form-${framework}-${form}`], pretty(instance.render(), { ocd: true }));
            });
          });
        });
      });

      Object.keys(AllComponents).forEach(component => {
        describe(`Component ${component}`, () => {
          it(`Renders ${component} for ${framework}`, (done) => {
            const instance = new AllComponents[component]();
            fixComponent(instance);
            console.log(renders[`component-${framework}-${component}`], pretty(instance.render(), { ocd: true }));
            assert.equal(renders[`component-${framework}-${component}`], pretty(instance.render(), { ocd: true }));
            done();
          });
          it(`Renders ${component} for ${framework} as required`, (done) => {
            const instance = new AllComponents[component]({
              validate: {
                required: true
              }
            });
            fixComponent(instance);
            assert.equal(renders[`component-${framework}-${component}-required`], pretty(instance.render(), { ocd: true }));
            done();
          });
          it(`Renders ${component} for ${framework} as multiple`, (done) => {
            const instance = new AllComponents[component]({
              multiple: true
            });
            fixComponent(instance);
            assert.equal(renders[`component-${framework}-${component}-multiple`], pretty(instance.render(), { ocd: true }));
            done();
          });
        });
      });
    });
  });
});
