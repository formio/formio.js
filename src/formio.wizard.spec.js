'use strict';
import FormioWizard from './formio.wizard';
import {WizardTests} from '../test/wizards/index';
import each from 'lodash/each';
describe('Form Wizard Renderer tests', () => {
  each(WizardTests, (wizardTest) => {
    each(wizardTest.tests, (wizardTestTest, title) => {
      it(title, (done) => {
        const wizardElement = document.createElement('div');
        const wizard = new FormioWizard(wizardElement);
        wizard.setForm(wizardTest.form).then(() => {
          return wizardTestTest(wizard, done);
        }).catch((error) => {
          done(error);
        });
      });
    });
  });
});
