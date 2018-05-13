'use strict';
import Wizard from './Wizard';
import WizardTests from '../test/wizards/index';
import each from 'lodash/each';
describe('Form Wizard Renderer tests', () => {
  each(WizardTests, (wizardTest) => {
    each(wizardTest.tests, (wizardTestTest, title) => {
      it(title, (done) => {
        const wizardElement = document.createElement('div');
        const wizard = new Wizard(wizardElement);
        wizard.setForm(wizardTest.form).then(() => {
          return wizardTestTest(wizard, done);
        }).catch((error) => {
          done(error);
        });
      });
    });
  });
});
