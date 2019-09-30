import each from 'lodash/each';
import { expect } from 'chai';

import WizardTests from '../test/wizards';
import Wizard from './Wizard';

describe('Wizard Component', () => {
  describe('getPreviousPage', () => {
    it('should return previous page number or zero', () => {
      const { getPreviousPage } = Wizard.prototype;
      expect(getPreviousPage.call({ page: 3 })).to.equal(2);
      expect(getPreviousPage.call({ page: 9 })).to.equal(8);
      expect(getPreviousPage.call({ page: 199 })).to.equal(198);
      expect(getPreviousPage.call({ page: 1 })).to.equal(0);
      expect(getPreviousPage.call({ page: 0 })).to.equal(0);
    });
  });
});

describe('WizardRenderer tests', () => {
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
