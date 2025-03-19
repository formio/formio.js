import assert from 'power-assert';
import Harness from '../harness';
import _ from 'lodash';
import SelectBoxesComponent from '../../src/components/selectboxes/SelectBoxes';
import { Formio } from '../../src/Formio';

import {
  comp1,
  comp3,
  comp4,
  comp5,
  comp6,
  comp7,
  comp8
} from './fixtures/selectboxes';
import wizardWithSelectBoxes from '../forms/wizardWithSelectBoxes';
import {comp12} from './fixtures/radio';
import { fastCloneDeep } from '@formio/core';

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
          },
          {
            type: 'button',
            key: 'submit'
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
          const submitButton = form.getComponent('submit');
          submitButton.refs.button.click();
          setTimeout(() => {
            const { messageContainer } = comp.refs;
            assert.equal(
              messageContainer.textContent.trim(),
              'You must select at least 2 items'
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
          },
          {
            type: 'button',
            key: 'submit'
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
          const submitButton = form.getComponent('submit');
          submitButton.refs.button.click();
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
          },
          {
            type: 'button',
            key: 'submit'
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
          const submitButton = form.getComponent('submit');
          submitButton.refs.button.click();
          setTimeout(() => {
            const { messageContainer } = comp.refs;
            assert.equal(
              messageContainer.textContent.trim(),
              'You may only select up to 2 items'
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
          },
          {
            type: 'button',
            key: 'submit'
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
          const submitButton = form.getComponent('submit');
          submitButton.refs.button.click();
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

  it('Should interpolate config data when data source type is set to URL', () => {
    const originalMakeRequest = Formio.makeRequest;
    function fakeMakeRequest(formio, type, url, data, method, opts){
      if (url !== 'test123') {
        throw Error('the url should be test123');
      }
      const myObject = {}
      myObject.then = ()=>{
        const myCatchObject = {}
        myCatchObject.catch = () => {
          return '';
        }
        return myCatchObject;
      }
      return myObject;
    }
    Formio.makeRequest = fakeMakeRequest;
    const selectboxes = new SelectBoxesComponent();
    _.set(selectboxes, 'root._form.config.myApiUrl', 'test123');
    selectboxes.loadItems('{{form.config.myApiUrl}}', {}, {}, {});
    Formio.makeRequest = originalMakeRequest;
  });

  it('Should have correct submission data when setting the value property', (done) => {
    const originalMakeRequest = Formio.makeRequest;
    Formio.makeRequest = async ()=> {
      return [
        {
          data: {
            name: 'Bob',
            referenceId: '1'
          }
        },
        {
          data: {
            name: 'Tom',
            referenceId: '2'
          }
        },
        {
          data: {
            name: 'Joe',
            referenceId: '3'
          }
        }
      ]
    }
    const changeEvent = new Event('change');
    Formio.createForm(document.createElement('div'), comp12, {}).then((form) => {
      setTimeout(()=>{
        const selectBoxesComponent = form.getComponent('selectBoxes');
        selectBoxesComponent.refs.input[0].checked = true;
        selectBoxesComponent.refs.input[0].dispatchEvent(changeEvent);
        setTimeout(()=>{
          assert.deepEqual(form.getValue().data, {selectBoxes : {Bob: true, Tom: false, Joe: false}});
          done();
        },200);
        Formio.makeRequest = originalMakeRequest;
      }, 200)
    });
  });

  it('Should show validation errors when the value property is set', () => {
    const originalMakeRequest = Formio.makeRequest;
    Formio.makeRequest = async () => {
      return [
        {
          data: {
            name: 'Bob',
            referenceId: '1'
          }
        },
        {
          data: {
            name: 'Tom',
            referenceId: '2'
          }
        },
        {
          data: {
            name: 'Joe',
            referenceId: '3'
          }
        }
      ]
    }
    let newComp12 = _.cloneDeep(comp12);
    _.set(newComp12.components[0], 'validate.required', true);
    return Formio.createForm(document.createElement('div'), newComp12, {}).then((form) => {
      const selectBoxesComponent = form.getComponent('selectBoxes');
      assert.equal(selectBoxesComponent.errors.length, 1);
      Formio.makeRequest = originalMakeRequest;
    })
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

  it('Should perform OnlyAvailableItems check properly', (done) => {
    Harness.testCreate(SelectBoxesComponent, comp7).then(component => {
      assert.equal(component.validateValueAvailability(true, { a: true }), true, 'Should be valid');
      assert.equal(component.validateValueAvailability(true, { a: false, b: false, c: false }), true, 'Should be valid');
      assert.equal(component.validateValueAvailability(true, { a: false, newKey: false }), false, 'Should not be valid');
      assert.equal(component.validateValueAvailability(true, { newKey: false }), false, 'Should not be valid');
      assert.equal(component.validateValueAvailability(true, {}), true, 'Should be valid');
      assert.equal(component.validateValueAvailability(false, {}), true, 'Should be valid');
      done();
    }).catch(done);
  });

  it('Should wait for selectboxes url options to load before submit', (done) => {
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

    Formio.createForm(element, fastCloneDeep(comp8))
      .then(instance => {
        const selectBoxes = instance.getComponent('selectBoxes');
        assert.equal(selectBoxes.optionsLoaded, false);
        assert.equal(!!selectBoxes.element.querySelector('.loader'), true, 'Should show loader while options are loading.')
        instance.submit().then((subm) => {
          assert.equal(selectBoxes.loadedOptions.length, urlResponse.length);
          assert.equal(selectBoxes.optionsLoaded, true);
          assert.deepEqual(subm.metadata?.listData?.selectBoxes, listData);
          Formio.makeRequest = originalMakeRequest;
          done();
        })
      })
      .catch(done);
  });

  it('Should render options from metadata in readOnly when selectBoxes value is empty in submission', (done) => {
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
        selectData: {
          selectBoxes: []
        },
        listData: {
          selectBoxes: [
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
        selectBoxes: {},
        submit: true,
      },
      _id: '66ebe85841267c275a4cbd4f',
      state: 'submitted',
    };

    Formio.createForm(element, fastCloneDeep(comp8), { readOnly: true})
      .then(instance => {
        instance.setSubmission(submission).then(() => {
          setTimeout(() => {
            assert.equal(optionsCalls, 0);
            const selectBoxes = instance.getComponent('selectBoxes');
            assert.equal(selectBoxes.optionsLoaded, true);
            assert.equal(selectBoxes.loadedOptions.length, 3);
            Formio.makeRequest = originalMakeRequest;
            done();
          }, 100)
        })
      })
      .catch(done);
  });

  it('Should render options from metadata in readOnly when selectBoxes has a value in submission', (done) => {
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
          selectBoxes: [
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
          selectBoxes: [
            {
              label: 'Option B'
            }
          ]
        },
      },
      data: {
        selectBoxes: {
          'opt_a': false,
          'opt_b': true,
          'opt_c': false,
        },
        submit: true,
      },
      _id: '66ebe85841267c275a4cbd4f',
      state: 'submitted',
    };

    Formio.createForm(element, fastCloneDeep(comp8), { readOnly: true})
      .then(instance => {
        instance.setSubmission(submission).then(() => {
          setTimeout(() => {
            assert.equal(optionsCalls, 0);
            const selectBoxes = instance.getComponent('selectBoxes');
            assert.equal(selectBoxes.optionsLoaded, true);
            assert.equal(selectBoxes.loadedOptions.length, 3);
            Formio.makeRequest = originalMakeRequest;
            done();
          }, 100)
        })
      })
      .catch(done);
  });
});
