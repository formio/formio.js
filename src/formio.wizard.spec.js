'use strict';
import FormioWizard from './formio.wizard';
import { WizardTests } from '../test/wizards/index';
import each from 'lodash/each';
describe('Form Wizard Renderer tests', () => {
  each(WizardTests, (wizardTest) => {
    each(wizardTest.tests, (wizardTestTest, title) => {
      it(title, (done) => {
        let wizardElement = document.createElement('div');
        let wizard = new FormioWizard(wizardElement);
        wizard.setForm(wizardTest.form).then(() => {
          return wizardTestTest(wizard, done);
        }).catch((error) => {
          done(error);
        });
      });
    });
  });
});
