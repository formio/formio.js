import assert from 'power-assert';
import Harness from '../../../test/harness';
import _ from 'lodash';
import SelectBoxesComponent from './SelectBoxes';
import Formio from './../../Formio';

import {
  comp1,
  comp3,
  comp4,
  comp5,
  comp6
} from './fixtures';
import wizardWithSelectBoxes from '../../../test/forms/wizardWithSelectBoxes';

describe('SelectBoxes Component', () => {
  it('Should build a SelectBoxes component', () => {
    return Harness.testCreate(SelectBoxesComponent, comp1).then((component) => {
      Harness.testElements(component, 'input[type="checkbox"]', 8);
    });
  });

  it('Should build a SelectBoxes component with URL DataSrc', (done) => {
    const form = _.cloneDeep(comp5);
    const element = document.createElement('div');
    const originalMakeRequest = Formio.makeRequest;

    Formio.makeRequest = function() {
      return new Promise(resolve => {
        const values = [
          { name : 'Alabama', abbreviation : 'AL' },
          { name : 'Alaska', abbreviation: 'AK' },
          { name: 'American Samoa', abbreviation: 'AS' }
        ];
        resolve(values);
      });
    };

    Formio.createForm(element, form).then(form => {
      const selectBoxes = form.getComponent('selectBoxes');

      setTimeout(()=>{
        assert.equal(selectBoxes.loadedOptions.length, 3);

        Formio.makeRequest = originalMakeRequest;
        done();
      }, 200);
    }).catch(done);
  });

  it('Should display values in DataTab', function(done) {
    Harness.testCreate(SelectBoxesComponent, comp6).then((component) => {
      const value1 = component.getView({ Alabama: false, Alaska: true });
      const value2 = component.getView({ Alabama: true, Alaska: true });
      assert.equal(value1, 'Alaska');
      assert.equal(value2, 'Alabama, Alaska');
      done();
    });
  });

  it('Should provide metadata.selectData for SelectBoxes component with URL DataSrc', (done) => {
    const form = _.cloneDeep(comp5);
    const element = document.createElement('div');
    const originalMakeRequest = Formio.makeRequest;

    Formio.makeRequest = function() {
      return new Promise(resolve => {
        const values = [
          { name : 'Alabama', abbreviation : 'AL' },
          { name : 'Alaska', abbreviation: 'AK' },
          { name: 'American Samoa', abbreviation: 'AS' }
        ];
        resolve(values);
      });
    };

    Formio.createForm(element, form).then(form => {
      const selectBoxes = form.getComponent('selectBoxes');

      setTimeout(()=>{
        const value = { AL: false, AK: true, AS: true };
        selectBoxes.setValue(value);
        setTimeout(() => {
          assert.equal(selectBoxes.dataValue, value);
          const submit = form.getComponent('submit');
          const clickEvent = new Event('click');
          const submitBtn = submit.refs.button;
          submitBtn.dispatchEvent(clickEvent);
          setTimeout(() => {
            assert.equal(_.isEqual(form.submission.metadata.selectData.selectBoxes, [{ name : 'Alaska' }, { name : 'American Samoa' }]), true);
            assert.equal(form.submission.metadata.listData.selectBoxes.length, 3);
            Formio.makeRequest = originalMakeRequest;
            done();
          },200);
        },200);
      }, 200);
    }).catch(done);
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

    it('Hidden SelectBoxes validation should not prevent submission', (done) => {
      const element = document.createElement('div');
      Formio.createForm(element, comp4)
        .then(async form => {
          const submit = form.getComponent('submit');
          const clickEvent = new Event('click');
          const submitBtn = submit.refs.button;
          submitBtn.dispatchEvent(clickEvent);
          setTimeout(() => {
            assert.equal(form.submission.state, 'submitted');
            assert.equal(form.errors.length, 0);
            done();
          }, 500);
        })
        .catch(done);
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

    it('Should provide validation for ValueProperty', (done) => {
      const form = _.cloneDeep(comp5);
      const element = document.createElement('div');
      const originalMakeRequest = Formio.makeRequest;

      Formio.makeRequest = function() {
        return new Promise(resolve => {
          const values = [
            { name : 'Alabama', abbreviation : 'AL' },
            { name : 'Alaska', abbreviation: { a:2, b: 'c' } },
            { name : 'American Samoa', abbreviation: true }
          ];
          resolve(values);
        });
      };

      Formio.createForm(element, form).then(async form => {
        const selectBoxes = form.getComponent('selectBoxes');

        setTimeout(()=>{
          const inputs = selectBoxes.element.querySelectorAll('input');
          inputs[1].checked = true;
          inputs[2].checked = true;

          setTimeout(()=>{
            const submit = form.getComponent('submit');
            const clickEvent = new Event('click');
            const submitBtn = submit.refs.button;
            submitBtn.dispatchEvent(clickEvent);

            setTimeout(()=>{
              assert.equal(form.errors.length, 1);
              assert.equal(selectBoxes.error.message, 'Invalid Value Property');
              selectBoxes.setValue({ 'AL': true });

              setTimeout(()=>{
                assert.equal(form.errors.length, 0);
                assert.equal(!!selectBoxes.error, false);
                document.innerHTML = '';
                Formio.makeRequest = originalMakeRequest;
                done();
              }, 300);
            }, 300);
          }, 300);
        }, 200);
      }).catch(done);
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
