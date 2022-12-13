import assert from 'power-assert';
import _ from 'lodash';
import Harness from '../../../test/harness';
import ButtonComponent from './Button';
import Formio from './../../Formio';
import sinon from 'sinon';

import {
  comp1,
  comp2,
  comp3
} from './fixtures';
import Webform from '../../Webform';
import formWithResetValue from '../../../test/formtest/formWithResetValue';

describe('Button Component', () => {
  it('Should build a button component', () => {
    return Harness.testCreate(ButtonComponent, comp1).then((component) => {
      const buttons = Harness.testElements(component, 'button[type="submit"]', 1);
      for (const button of buttons) {
        assert.equal(button.name, `data[${comp1.key}]`);
        assert.equal(button.innerHTML.trim(), comp1.label);
      }
    });
  });

  it('POST to URL button should pass URL and headers', (done) => {
    const formJson = {
      'type': 'form',
      'components': [{
          'label': 'Some Field',
          'type': 'textfield',
          'input': true,
          'key': 'someField'
        },
        {
          'label': 'POST to URL',
          'action': 'url',
          'url': 'someUrl',
          'headers': [{
            'header': 'testHeader',
            'value': 'testValue'
          }],
          'type': 'button',
          'input': true,
          'key': 'postToUrl'
        }
      ]
    };
    const element = document.createElement('div');
    Formio.createForm(element, formJson)
      .then(form => {
        const spy = sinon.spy(Formio, 'makeStaticRequest');
        form.getComponent('postToUrl').refs.button.click();
        const passedUrl = spy.firstCall.args[0];
        const passedHeaders = spy.firstCall.lastArg.headers;
        spy.restore();
        assert.deepEqual(passedHeaders, {
          'testHeader': 'testValue'
        });
        assert.equal(passedUrl, 'someUrl');
        done();
      })
      .catch(done);
  });

  it('Test on error', (done) => {
    const element = document.createElement('div');
    Formio.createForm(element, {
      components: [{
          type: 'textfield',
          key: 'a',
          label: 'A',
          validate: {
            required: true
          }
        },
        {
          type: 'button',
          action: 'submit',
          key: 'submit',
          disableOnInvalid: true,
          input: true
        }
      ]
    }).then(form => {
      form.on('change', () => {
        const button = form.getComponent('submit');
        assert(button.disabled, 'Button should be disabled');
        button.emit('submitError');
        setTimeout(() => {
          console.log('Text Content: ', button.refs.buttonMessage.innerHTML);
          assert.equal(button.refs.buttonMessage.textContent, 'Please check the form and correct all errors before submitting.');
          done();
        }, 100);
      });
      form.submission = {
        data: {}
      };
    }).catch(done);
  });

  it('POST to URL button should perform URL interpolation', (done) => {
    const formJson = {
      'type': 'form',
      'components': [{
          'label': 'Some Field',
          'type': 'textfield',
          'input': true,
          'key': 'someField'
        },
        {
          'label': 'URL',
          'type': 'textfield',
          'input': true,
          'key': 'url'
        },
        {
          'label': 'POST to URL',
          'action': 'url',
          'url': '{{data.url}}/submission',
          'type': 'button',
          'input': true,
          'key': 'postToUrl'
        }
      ]
    };
    const element = document.createElement('div');
    Formio.createForm(element, formJson)
      .then(form => {
        form.submission = {
          data: {
            url: 'someUrl'
          }
        };
        return form.submissionReady
          .then(() => {
            const spy = sinon.spy(Formio, 'makeStaticRequest');
            form.getComponent('postToUrl').refs.button.click();
            const passedUrl = spy.firstCall.args[0];
            spy.restore();
            assert.equal(passedUrl, 'someUrl/submission');
            done();
          });
      })
      .catch(done);
  });

  it('POST to URL button should perform headers interpolation', (done) => {
    const formJson = {
      'type': 'form',
      'components': [{
          'label': 'Some Field',
          'type': 'textfield',
          'input': true,
          'key': 'someField'
        },
        {
          'label': 'Header',
          'type': 'textfield',
          'input': true,
          'key': 'header'
        },
        {
          'label': 'POST to URL',
          'action': 'url',
          'url': 'someUrl',
          'headers': [{
            'header': 'testHeader',
            'value': 'Value {{data.header}}'
          }],
          'type': 'button',
          'input': true,
          'key': 'postToUrl'
        }
      ]
    };
    const element = document.createElement('div');
    Formio.createForm(element, formJson)
      .then(form => {
        form.submission = {
          data: {
            someField: 'some value',
            header: 'some header'
          }
        };
        return form.submissionReady
          .then(() => {
            const spy = sinon.spy(Formio, 'makeStaticRequest');
            form.getComponent('postToUrl').refs.button.click();
            const passedHeaders = spy.firstCall.lastArg.headers;
            spy.restore();
            assert.deepEqual(passedHeaders, {
              'testHeader': 'Value some header'
            });
            done();
          });
      })
      .catch(done);
  });

  it('Should not change color and show message if the error is silent', (done) => {
    const formJson = {
      'type': 'form',
      'components': [{
          'label': 'Some Field',
          'type': 'textfield',
          'input': true,
          'key': 'someField'
        },
        {
          'label': 'Submit',
          'action': 'submit',
          'type': 'button',
          'input': true,
          'key': 'submit'
        }
      ]
    };
    const element = document.createElement('div');
    Formio.createForm(element, formJson, {
        hooks: {
          beforeSubmit: function(submission, callback) {
            callback({
              message: 'Err',
              component: submission.component,
              silent: true,
            }, submission);
          }
        }
      })
      .then(form => {
        const button = form.getComponent('submit');
        button.emit('submitButton', {
          state: button.component.state || 'submitted',
          component: button.component,
          instance: button
        });
        setTimeout(() => {
          assert(!button.refs.button.className.includes('btn-danger submit-fail'));
          assert(!button.refs.button.className.includes('btn-success submit-success'));
          assert(!button.refs.buttonMessageContainer.className.includes('has-success'));
          assert(!button.refs.buttonMessageContainer.className.includes('has-error'));
          assert(button.refs.buttonMessage.innerHTML === '');
          done();
        }, 100);
      })
      .catch(done);
  });

  it('Should reset values of all the form\'s components and update properties dependent on values', (done) => {
    const formElement = document.createElement('div');
    const form = new Webform(formElement);

    form.setForm(formWithResetValue).then(() => {
      const select = form.getComponent(['showPanel']);

      select.setValue('yes');

      setTimeout(() => {
        const panel = form.getComponent(['panel']);
        const textField = form.getComponent(['textField']);
        const textArea = form.getComponent(['textArea']);

        assert.equal(panel.visible, true, 'Panel should be visible');
        assert.equal(textField.visible, true, 'TextFiled should be visible');
        assert.equal(textArea.visible, true, 'TextArea should be visible');

        const resetButton = form.getComponent(['reset']);
        resetButton.emit('resetForm');

        setTimeout(() => {
          const panel = form.getComponent(['panel']);
          const textField = form.getComponent(['textField']);
          const textArea = form.getComponent(['textArea']);

          assert.equal(panel.visible, false, 'Panel should NOT be visible');
          assert.equal(textField.visible, false, 'TextFiled should NOT be visible');
          assert.equal(textArea.visible, false, 'TextArea should NOT be visible');
          done();
        }, 300);
      }, 300);
    }).catch((err) => done(err));
  });

  it('Should perform custom logic', (done) => {
    const element = document.createElement('div');
    const form = new Webform(element);
    const testForm = {
      components: [{
          type: 'number',
          key: 'number',
          label: 'Number'
        },
        {
          type: 'button',
          key: 'custom',
          label: 'Custom',
          action: 'custom',
          custom: 'data[\'number\'] = 5555'
        }
      ]
    };

    form.setForm(testForm)
      .then(() => {
        const button = form.getComponent('custom');
        const changeEventTriggered = sinon.spy(button, 'triggerChange');
        button.refs.button.click();
        assert(changeEventTriggered.calledOnce, 'Click on custom button should trigger change event');
        form.on('change', () => {
          const {
            data
          } = form.submission;
          assert.deepEqual(data, {
            number: 5555,
            custom: true
          });
          done();
        });
      })
      .catch((err) => done(err));
  });

  it('Should correctly set theme', (done) => {
    const form = _.cloneDeep(comp2);
    const element = document.createElement('div');

    Formio.createForm(element, form).then(formObj => {
      const btns = formObj.components;
      const theme = ['warning', 'danger', 'success', 'info', 'secondary', 'primary'];

      _.each(btns, (btn, index) => {
        const btnClass = `btn-${theme[index]}`;
        const includeClass = btn.refs.button.classList.contains(btnClass);
        assert.equal(includeClass, true, `Should set ${theme[index]} theme for button`);
      });

      done();
    }).catch(done);
  });

  it('Should render block btn', (done) => {
    const form = _.cloneDeep(comp2);
    form.components = [{
      label: 'Submit',
      showValidations: false,
      block: true,
      tableView: false,
      key: 'submit',
      type: 'button',
      input: true
    }];

    const element = document.createElement('div');

    Formio.createForm(element, form).then(formObj => {
      const btn = formObj.components[0];
      const btnClass = 'btn-block';
      const includeClass = btn.refs.button.classList.contains(btnClass);

      assert.equal(includeClass, true, 'Should set btn-block class for button');

      done();
    }).catch(done);
  });

  it('Test event, reset, post, save in state actions', (done) => {
    const form = _.cloneDeep(comp3);
    const element = document.createElement('div');

    const originalMakeRequest = Formio.makeStaticRequest;
    Formio.makeStaticRequest = function(url, method, data) {
      assert.equal(url, 'https://test.com');
      assert.equal(method, 'POST');
      assert.deepEqual(data.data, {
        event: false,
        post: true,
        reset: false,
        saveInState: false
      });

      return new Promise(resolve => {
        resolve({
          ...data
        });
      });
    };

    Formio.createForm(element, form).then(form => {
      const formio = new Formio('http://test.localhost/test', {});

      formio.makeRequest = (type, url, method, data) => {
        assert.equal(data.state, 'testState');
        assert.equal(method.toUpperCase(), 'POST');

        return new Promise(resolve => resolve({
          ...data
        }));
      };

      form.formio = formio;

      const click = (btnComp) => {
        const elem = btnComp.refs.button;
        const clickEvent = new Event('click');
        elem.dispatchEvent(clickEvent);
      };

      const saveInStateBtn = form.getComponent('saveInState');
      click(saveInStateBtn);

      setTimeout(() => {
        const eventBtn = form.getComponent('event');
        click(eventBtn);

        setTimeout(() => {
          const numberComp = form.getComponent('number');
          assert.equal(numberComp.dataValue, 2);
          assert.equal(numberComp.getValue(), 2);

          const resetBtn = form.getComponent('reset');
          click(resetBtn);

          setTimeout(() => {
            const numberComp = form.getComponent('number');
            assert.equal(numberComp.dataValue, null);
            assert.equal(numberComp.getValue(), null);

            const postBtn = form.getComponent('post');
            click(postBtn);

            setTimeout(() => {
              Formio.makeStaticRequest = originalMakeRequest;
              done();
            }, 300);
          }, 300);
        }, 300);
      }, 300);
    }).catch(done);
  });
});
