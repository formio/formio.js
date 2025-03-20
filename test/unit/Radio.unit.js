import assert from 'power-assert';
import { Formio } from '../../src/Formio';
import _ from 'lodash';
import Harness from '../harness';
import RadioComponent from '../../src/components/radio/Radio';

import {
  comp1,
  comp2,
  comp3,
  comp4,
  comp5,
  comp6,
  comp7,
  comp8,
  comp9,
  comp10,
  comp11,
  comp13
} from './fixtures/radio';
import { fastCloneDeep } from '@formio/core';

describe('Radio Component', () => {
  it('Should build a radio component', () => {
    return Harness.testCreate(RadioComponent, comp1).then((component) => {
      Harness.testElements(component, 'input[type="radio"]', 4);
      Harness.testElements(component, 'span', 4);
    });
  });

  it("Should allow to uncheck default radio value and set correct submission data", function (done) {
    const formElement = document.createElement("div");
    const comp5Cloned = _.cloneDeep(comp5);
    comp5Cloned.components[0].defaultValue = "one";

    Formio.createForm(formElement, comp5Cloned)
      .then((form) => {
        const submit = form.getComponent("submit");
        const submitBtn = submit.refs.button;
        const clickEvent = new Event("click");
        const component = form.getComponent("radio");
        const radioFirstInput = component.refs.input[0];
        setTimeout(() => {
          submitBtn.dispatchEvent(clickEvent);
          setTimeout(() => {
            assert.equal(form.submission.data.radio, 'one');
            assert.equal(component.refs.input[0].checked, true);
            radioFirstInput.click();
            setTimeout(() => {
              submitBtn.dispatchEvent(clickEvent);
              setTimeout(() => {
                assert.equal(form.submission.data.radio, '');
                assert.equal(component.refs.input[0].checked, false);
                done();
              }, 200);
            }, 200);
          }, 200);
        }, 200);
      })
      .catch(done);
  });

  it('Should return correct string values if storage type is Number', () => {
    return Harness.testCreate(RadioComponent, comp2).then((component) => {
      assert.equal(component.getValueAsString(1), 'one');
      assert.equal(component.getValueAsString(2), 'two');
    });
  });

  it('Should build a radio component with URL DataSrc', (done) => {
    const form = _.cloneDeep(comp9);
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
      const radio = form.getComponent('radio');

      setTimeout(()=>{
        assert.equal(radio.loadedOptions.length, 3);

        Formio.makeRequest = originalMakeRequest;
        done();
      }, 200);
    }).catch(done);
  });

  it('Should provide metadata.selectData for radio component with URL DataSrc', (done) => {
    const form = _.cloneDeep(comp9);
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
      const radio = form.getComponent('radio');

      setTimeout(()=>{
        const value = 'AK';
        radio.setValue(value);
        setTimeout(() => {
          assert.equal(radio.dataValue, value);
          const submit = form.getComponent('submit');
          const clickEvent = new Event('click');
          const submitBtn = submit.refs.button;
          submitBtn.dispatchEvent(clickEvent);
          setTimeout(() => {
            assert.equal(_.isEqual(form.submission.metadata.selectData.radio, { name : 'Alaska' }), true);
            assert.equal(form.submission.metadata.listData.radio.length, 3);
            Formio.makeRequest = originalMakeRequest;
            done();
          },200);
        },200);
      }, 200);
    }).catch(done);
  });

  it('Should save checked value after redrawing if storage type is Number', (done) => {
    Harness.testCreate(RadioComponent, comp3).then((component) => {
      component.setValue(22);
      component.redraw();

      setTimeout(()=>{
        assert.equal(component.refs.input[0].checked, false);
        assert.equal(component.refs.input[1].value, '22');
        assert.equal(component.refs.input[1].checked, true);
        assert.equal(component.refs.input[2].checked, false);
        done();
      }, 700);
    });
  });

  it('Should set the Value according to Storage Type', (done) => {
    const form = _.cloneDeep(comp11);
    const element = document.createElement('div');

    Formio.createForm(element, form).then(form => {
      const radioNumber = form.getComponent('radioNumber');
      const radioString = form.getComponent('radioString');
      const radioBoolean = form.getComponent('radioBoolean');
      const value1 = '0';
      const value2 = 'true';
      radioNumber.setValue(value1);
      radioString.setValue(value1);
      radioBoolean.setValue(value2);

      const submit = form.getComponent('submit');
      const clickEvent = new Event('click');
      const submitBtn = submit.refs.button;
      submitBtn.dispatchEvent(clickEvent);

      setTimeout(() => {
        assert.equal(form.submission.data.radioNumber, 0);
        assert.equal(typeof form.submission.data.radioNumber, 'number');
        assert.equal(form.submission.data.radioString, '0');
        assert.equal(typeof form.submission.data.radioString, 'string');
        assert.equal(form.submission.data.radioBoolean, true);
        assert.equal(typeof form.submission.data.radioBoolean, 'boolean');
        document.innerHTML = '';
        done();
      }, 300);
    }).catch(done);
  });

  it('Should set correct data for 0s values', (done) => {
    Harness.testCreate(RadioComponent, comp10).then((component) => {
      component.setValue('01');
      component.redraw();

      setTimeout(()=>{
        assert.equal(component._data.radio, '01');
        component.setValue(1);
        component.redraw();
        setTimeout(()=>{
          assert.equal(component._data.radio, 1);
          done();
        }, 200);
      }, 200);
    });
  });

  it('Span should have correct text label', () => {
    return Harness.testCreate(RadioComponent, comp1).then((component) => {
      component.element.querySelectorAll('input').forEach((input) => {
        assert(input.getAttribute('class').indexOf('form-check-input') !== -1, 'No form-check-input on radios.');
      });
      const spans = component.element.querySelectorAll('span');
      assert.equal(spans[0].innerHTML, 'Red');
      assert.equal(spans[1].innerHTML, 'Green');
      assert.equal(spans[2].innerHTML, 'Blue');
      assert.equal(spans[3].innerHTML, 'Yellow');
    });
  });

  it('Should set false as defaultValue correctly', (done) => {
    Harness.testCreate(RadioComponent, comp4).then((component) => {
      assert.equal(component.dataValue, false, 'Should be equal to false');
      const input = component.element.querySelector('input[value="false"]');
      assert.equal(input.getAttribute('checked'), 'true', 'Should be checked');
      done();
    });
  });

  it('Should provide "Allow only available values" validation', (done) => {
    const form = _.cloneDeep(comp5);
    const element = document.createElement('div');

    Formio.createForm(element, form).then(form => {
      const radio = form.getComponent('radio');
      let value = 'five';
      radio.setValue(value);

      setTimeout(() => {
        assert.equal(radio.getValue(), value);
        assert.equal(radio.dataValue, value);
        const submit = form.getComponent('submit');
        const clickEvent = new Event('click');
        const submitBtn = submit.refs.button;
        submitBtn.dispatchEvent(clickEvent);

        setTimeout(() => {
          assert.equal(form.errors.length, 1);
          assert.equal(radio.errors[0].message, 'Radio is an invalid value.');
          value = 'one';
          radio.setValue(value);

          setTimeout(() => {
            assert.equal(radio.getValue(), value);
            assert.equal(radio.dataValue, value);
            assert.equal(form.errors.length, 0);
            assert.equal(!!radio.errors.length, 0);

            document.innerHTML = '';
            done();
          }, 300);
        }, 300);
      }, 200);
    }).catch(done);
  });

  it('Should use whole Object as value if URL DataSrc and ValueProperty is not set', (done) => {
    const form = _.cloneDeep(comp9);
    delete form.components[0].valueProperty;
    const element = document.createElement('div');
    const originalMakeRequest = Formio.makeRequest;
    const values = [
      { name : 'Alabama', abbreviation : 'AL' },
      { name : 'Alaska', abbreviation: 'AK' }
    ];

    Formio.makeRequest = function() {
      return new Promise(resolve => {
        resolve(values);
      });
    };

    Formio.createForm(element, form).then(form => {
      const radio = form.getComponent('radio');

      setTimeout(()=>{
        values.forEach((value, i) => {
          assert.equal(_.isEqual(value, radio.loadedOptions[i].value), true);
        });
        radio.setValue(values[1]);

        setTimeout(() => {
          const submit = form.getComponent('submit');
          const clickEvent = new Event('click');
          const submitBtn = submit.refs.button;
          submitBtn.dispatchEvent(clickEvent);

          setTimeout(() => {
            assert.equal(form.errors.length, 0);
            assert.equal(!!radio.errors.length, 0);
            assert.equal(radio.getValue(), values[1]);
            assert.equal(radio.dataValue, values[1]);
            document.innerHTML = '';
            Formio.makeRequest = originalMakeRequest;
            done();
          }, 300);
        }, 300);
      }, 200);
    }).catch(done);
  });

  it('Should not have default values in schema', (done) => {
    const form = _.cloneDeep(comp6);
    const element = document.createElement('div');

    const requiredSchema = {
      label: 'Radio',
      optionsLabelPosition: 'right',
      inline: true,
      tableView: false,
      key: 'radio',
      type: 'radio',
      input: true
    };

    Formio.createForm(element, form).then(form => {
      const radio = form.getComponent('radio');
      assert.deepEqual(requiredSchema, radio.schema);
      done();
    }).catch(done);
  });

  it('Should not show infinite loader for radio with URL data source if options loading failed', (done) => {
    const form = _.cloneDeep(comp9);
    const element = document.createElement('div');
    const originalMakeRequest = Formio.makeRequest;

    Formio.makeRequest = function() {
      return new Promise((res, rej) => {
        setTimeout(() => rej('loading error'), 200);
      });
    };
    Formio.createForm(element, form).then(form => {
      const radio = form.getComponent('radio');
      assert.equal(!!radio.element.querySelector('.loader'), true, 'Should show loader.')
      setTimeout(()=>{
        assert.equal(!!radio.element.querySelector('.loader'), false, 'Should not show loader.')
        Formio.makeRequest = originalMakeRequest;
        done();
      }, 350);
    }).catch(done);
  });
});

describe('Radio Component', () => {
  it('should have red asterisk left hand side to the options labels if component is required and label is hidden', () => {
    return Harness.testCreate(RadioComponent, comp7).then(component => {
      const options = component.element.querySelectorAll('.form-check-label');
      options.forEach(i => {
        assert.deepEqual(!!getComputedStyle(i, ':before'), true);
      });
    });
  });

  it('Should not provide empty error message when hidden radio has storage type as string', (done) => {
    const form = _.cloneDeep(comp8);
    const element = document.createElement('div');

    Formio.createForm(element, form)
      .then(form => {
        form.submission = {
          data: {
            radio: 'no'
          }
        };
        const alerts = document.querySelectorAll('.alert-danger');
        setTimeout(() => {
          assert.equal(alerts.length, 0);
          done();
        }, 100);
      })
      .catch(done);
  });

  it('Should show correct attributes during performance', function(done) {
    const formElement = document.createElement('div');

    const JSON = {
      components: [
        {
          key: 'whichOneIsYourFavoriteFruit',
          type: 'radio',
          input: true,
          label: 'Which one is your favorite fruit?',
          inline: false,
          values: [
            {
              label: 'Apple ',
              value: 'apple',
              shortcut: '',
            },
            {
              label: 'Orange',
              value: 'orange',
              shortcut: '',
            },
            {
              label: 'Banana',
              value: 'banana',
              shortcut: '',
            },
          ],
          tableView: false,
          optionsLabelPosition: 'right',
        },
      ],
    };

    Formio.createForm(formElement, JSON)
      .then((form) => {
        const component = form.getComponent('whichOneIsYourFavoriteFruit');

        const appleRadioInput = component.refs.input[0];
        const appleComponentWrapper = formElement.querySelector('.form-check');
        const isContainClass =
          appleComponentWrapper.classList.contains('radio-selected');

        assert.equal(
          appleRadioInput.checked,
          false,
          'should be false by default'
        );
        assert.equal(isContainClass, false, 'should be false by default');

        appleRadioInput.click();

        setTimeout(() => {
          assert.equal(appleRadioInput.checked, true);

          const elementWrapper = formElement.querySelector('.form-check');
          const isContainClass =
            elementWrapper.classList.contains('radio-selected');
          assert.equal(isContainClass, true);

          appleRadioInput.click();

          setTimeout(() => {
            assert.equal(appleRadioInput.checked, false);
            const elementWrapper = formElement.querySelector('.form-check');
            const isContainClass =
              elementWrapper.classList.contains('radio-selected');
            assert.equal(isContainClass, false);

            done();
          }, 200);
        }, 200);
      })
      .catch(done);
  });

  it('Should wait for radio url options to load before submit', (done) => {
    const element = document.createElement('div');
    const originalMakeRequest = Formio.makeRequest;
    const urlResponse = [
      {
        identifier: 'opt_a',
        label: 'Option A',
      },
      {
        identifier: 'opt_b',
        label: 'Option B',
      },
      {
        identifier: 'opt_c',
        label: 'Option C',
      },
    ];
    const listData = [
      {
        label: 'Option A',
      },
      {
        label: 'Option B',
      },
      {
        label: 'Option C',
      },
    ];
    Formio.makeRequest = function() {
      return new Promise((res, rej) => {
        setTimeout(() => {
          res(fastCloneDeep(urlResponse));
        }, 400);
      });
    };

    Formio.createForm(element, fastCloneDeep(comp13))
      .then(instance => {
        const radio = instance.getComponent('radio');
        assert.equal(radio.optionsLoaded, false);
        assert.equal(!!radio.element.querySelector('.loader'), true, 'Should show loader while options are loading.')
        instance.submit().then((subm) => {
          assert.equal(radio.loadedOptions.length, urlResponse.length);
          assert.equal(radio.optionsLoaded, true);
          assert.deepEqual(subm.metadata?.listData?.radio, listData);
          Formio.makeRequest = originalMakeRequest;
          done();
        })
      })
      .catch(done);
  });

  it('Should render options from metadata in readOnly when radio value is empty in submission', (done) => {
    const element = document.createElement('div');
    const originalMakeRequest = Formio.makeRequest;
    let optionsCalls = 0;
    Formio.makeRequest = function() {
      return new Promise((res, rej) => {
        optionsCalls = optionsCalls + 1;
        res([]);
      });
    };
    const submission = {
      form: '66ebe22841267c275a4cb34e',
      metadata: {
        listData: {
          radio: [
            {
              label: 'Option A',
            },
            {
              label: 'Option B',
            },
            {
              label: 'Option C',
            },
          ],
        }
      },
      data: {
        radio: '',
        submit: true,
      },
      _id: '66ebe85841267c275a4cbd4f',
      state: 'submitted',
    };

    Formio.createForm(element, fastCloneDeep(comp13), { readOnly: true})
      .then(instance => {
        instance.setSubmission(submission).then(() => {
          setTimeout(() => {
            assert.equal(optionsCalls, 0);
            const radio = instance.getComponent('radio');
            assert.equal(radio.optionsLoaded, true);
            assert.equal(radio.loadedOptions.length, 3);
            Formio.makeRequest = originalMakeRequest;
            done();
          }, 100)
        })
      })
      .catch(done);
  });

  it('Should render options from metadata in readOnly when radio has a value in submission', (done) => {
    const element = document.createElement('div');
    const originalMakeRequest = Formio.makeRequest;
    let optionsCalls = 0;
    Formio.makeRequest = function() {
      return new Promise((res, rej) => {
        optionsCalls = optionsCalls + 1;
        res([]);
      });
    };
    const submission = {
      form: '66ebe22841267c275a4cb34e',
      metadata: {
        listData: {
          radio: [
            {
              label: 'Option A',
            },
            {
              label: 'Option B',
            },
            {
              label: 'Option C',
            },
          ],
        },
        selectData: {
          radio: {
              label: 'Option B'
          }
      },
      },
      data: {
        radio: 'opt_b',
        submit: true,
      },
      _id: '66ebe85841267c275a4cbd4f',
      state: 'submitted',
    };

    Formio.createForm(element, fastCloneDeep(comp13), { readOnly: true})
      .then(instance => {
        instance.setSubmission(submission).then(() => {
          setTimeout(() => {
            assert.equal(optionsCalls, 0);
            const radio = instance.getComponent('radio');
            assert.equal(radio.optionsLoaded, true);
            assert.equal(radio.loadedOptions.length, 3);
            Formio.makeRequest = originalMakeRequest;
            done();
          }, 100)
        })
      })
      .catch(done);
  });
});
