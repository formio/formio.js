import EventEmitter from '../../src/EventEmitter';
import Wizard from '../../src/Wizard.js';
import { wizardWithNestedForm } from '../fixtures';

describe('Infinite Loop Tests', function() {
  describe('Wizard with Nested Form', function() {
    it('should not cause loops when going to the next page', done => {
      const wizardElement = document.createElement('div');
      const wizard = new Wizard(wizardElement, {
        events: new EventEmitter({
          wildcard: true,
          maxListeners: 0
        })
      });

      wizard.setForm(wizardWithNestedForm)
        .then(() => {
          wizard.submission = {
            data: {
              form1: {
                data: {
                  name: '1',
                  lastName: '2'
                },
              }
            }
          };

          return wizard.submissionReady.then(() => {
            wizard.submitted = true;
            return wizard.nextPage().then(() => wizard.nextPage())
          });
        })
        .then(() => done())
        .catch(done);
    });
  });
});
