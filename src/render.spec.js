const renders = require('../test/renders');
const pretty = require('pretty');
import assert from 'power-assert';

const AllComponents = require('../lib/components').default;
const templates = require('../lib/templates').default;

describe('Rendering Tests', () => {
  Object.keys(templates).forEach(framework => {
    describe(`Framework ${framework}`, () => {
      Object.keys(AllComponents).forEach(component => {
        describe(`Component ${component}`, () => {
          it(`Renders ${component} for ${framework}`, (done) => {
            const instance = new AllComponents[component]();
            instance.id = 'abc123';
            assert.equal(renders[`${framework}-${component}`], pretty(instance.render()));
            done();
          });
          it(`Renders ${component} for ${framework} as required`, (done) => {
            const instance = new AllComponents[component]({
              validate: {
                required: true
              }
            });
            instance.id = 'abc123';
            assert.equal(renders[`${framework}-${component}-required`], pretty(instance.render()));
            done();
          });
          it(`Renders ${component} for ${framework} as multiple`, (done) => {
            const instance = new AllComponents[component]({
              multiple: true
            });
            instance.id = 'abc123';
            console.log(renders[`${framework}-${component}-multiple`], pretty(instance.render()));
            assert.equal(renders[`${framework}-${component}-multiple`], pretty(instance.render()));
            done();
          });
        });
      });
    });
  });
});
