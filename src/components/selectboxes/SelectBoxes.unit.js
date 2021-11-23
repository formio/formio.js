import assert from 'power-assert';
import Harness from '../../../test/harness';
import SelectBoxesComponent from './SelectBoxes';
import Formio from './../../Formio';

import {
  comp1,
  comp3
} from './fixtures';
import wizardWithSelectBoxes from '../../../test/forms/wizardWithSelectBoxes';

describe('SelectBoxes Component', () => {
  it('Should build a SelectBoxes component', () => {
    return Harness.testCreate(SelectBoxesComponent, comp1).then((component) => {
      Harness.testElements(component, 'input[type="checkbox"]', 8);
    });
  });

  describe('error messages', () => {
    it('Should have a minSelectedCount validation message', () => {
      const formJson = {
        components: [
          {
            type: 'selectboxes',
            key: 'options',
            values: [
              { label: 'Option 1', value: '1' },
              { label: 'Option 2', value: '2' },
              { label: 'Option 3', value: '3' },
              { label: 'Option 4', value: '4' }
            ],
            validate: {
              minSelectedCount: 2
            }
          }
        ]
      };
      const element = document.createElement('div');
      return Formio.createForm(element, formJson)
        .then(async form => {
          form.submission = {
            data: {
              options: { 1: true }
            }
          };
          const comp = form.getComponent('options');
          setTimeout(() => {
            const { messageContainer } = comp.refs;
            assert.equal(
              messageContainer.textContent.trim(),
              'You must select at least 2 items.'
            );
          }, 300);
        });
    });

    it('Should use the minSelectedCountMessage if provided', () => {
      const formJson = {
        components: [
          {
            type: 'selectboxes',
            key: 'options',
            values: [
              { label: 'Option 1', value: '1' },
              { label: 'Option 2', value: '2' },
              { label: 'Option 3', value: '3' },
              { label: 'Option 4', value: '4' }
            ],
            validate: {
              minSelectedCount: 2,
            },
            minSelectedCountMessage: 'Please select at least {{minCount}} items.'
          }
        ]
      };
      const element = document.createElement('div');
      return Formio.createForm(element, formJson)
        .then(async form => {
          form.submission = {
            data: {
              options: { 1: true }
            }
          };
          const comp = form.getComponent('options');
          setTimeout(() => {
            const { messageContainer } = comp.refs;
            assert.equal(
              messageContainer.textContent.trim(),
              'Please select at least 2 items.'
            );
          }, 300);
        });
    });

    it('Should have a maxSelectedCount validation message', () => {
      const formJson = {
        components: [
          {
            type: 'selectboxes',
            key: 'options',
            values: [
              { label: 'Option 1', value: '1' },
              { label: 'Option 2', value: '2' },
              { label: 'Option 3', value: '3' },
              { label: 'Option 4', value: '4' }
            ],
            validate: {
              maxSelectedCount: 2
            }
          }
        ]
      };
      const element = document.createElement('div');
      return Formio.createForm(element, formJson)
        .then(async form => {
          form.submission = {
            data: {
              options: { 1: true, 2: true, 3: true }
            }
          };
          const comp = form.getComponent('options');
          setTimeout(() => {
            const { messageContainer } = comp.refs;
            assert.equal(
              messageContainer.textContent.trim(),
              'You can only select up to 2 items.'
            );
          }, 300);
        });
    });

    it('Should use the maxSelectedCountMessage if provided', () => {
      const formJson = {
        components: [
          {
            type: 'selectboxes',
            key: 'options',
            values: [
              { label: 'Option 1', value: '1' },
              { label: 'Option 2', value: '2' },
              { label: 'Option 3', value: '3' },
              { label: 'Option 4', value: '4' }
            ],
            validate: {
              maxSelectedCount: 2,
            },
            maxSelectedCountMessage: 'Please select {{maxCount}} items at most.'
          }
        ]
      };
      const element = document.createElement('div');
      return Formio.createForm(element, formJson)
        .then(async form => {
          form.submission = {
            data: {
              options: { 1: true, 2: true, 3: true }
            }
          };
          const comp = form.getComponent('options');
          setTimeout(() => {
            const { messageContainer } = comp.refs;
            assert.equal(
              messageContainer.textContent.trim(),
              'Please select 2 items at most.'
            );
          }, 300);
        });
    });
  });

  it('Should set "checked" attribute correctly when value is changed', (done) => {
    Formio.createForm(document.createElement('div'), wizardWithSelectBoxes).then((form) => {
      const selectBoxes = form.getComponent(['selectBoxes']);
      const value = {
        five: false,
        four: false,
        one: true,
        three: false,
        two: true,
      };

      selectBoxes.setValue(value);

      const checkInputs = (values) => {
        Object.entries(values).forEach(([key, value]) => {
          const input = selectBoxes.element.querySelector(`input[value="${key}"]`);
          assert.equal(input.checked, value, 'Should be checked');
        });
      };

      setTimeout(() => {
        checkInputs(value);
        form.setPage(1);

        setTimeout(() => {
          form.setPage(0);

          setTimeout(() => {
            checkInputs(value);
            done();
          });
        }, 200);
      }, 200);
    }).catch(done);
  });
});

describe('SelectBoxes Component', () => {
  it('should have red asterisk left hand side to the options labels if component is required and label is hidden', () => {
    return Harness.testCreate(SelectBoxesComponent, comp3).then(component => {
      const options = component.element.querySelectorAll('.form-check-label');
      options.forEach(i => {
        assert.deepEqual(!!getComputedStyle(i, ':before'), true);
      });
    });
  });
});
