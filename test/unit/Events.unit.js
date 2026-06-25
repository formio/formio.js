import assert from 'power-assert';
import _ from 'lodash';
import 'flatpickr';
import AllComponents from '../../src/components/index';
import { Formio } from '../../src/formio.form.js';
import testFormEvents from '../forms/testFormEvents.js';
import { fastCloneDeep } from '../../src/utils/utils.js';

if (_.has(Formio, 'Components.setComponents')) {
  Formio.Components.setComponents(AllComponents);
}

describe('Events tests', function () {
  this.retries(3);

  before(function () {
    // Polyfill window.matchMedia if it doesn't exist
    if (typeof window !== 'undefined' && !window.matchMedia) {
      window.matchMedia = (query) => ({
        matches: false, // Default to false, adjust as needed for specific tests
        media: query,
        onchange: null,
        addListener: () => {}, // Deprecated, but good for compatibility
        removeListener: () => {}, // Deprecated
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => true,
      });
    }
  });

  after(async function () {
    // Since form translations are (a) on the Formio global (?!) and (b) not accessible (?!!) we need "reset" i18n
    const formJson = fastCloneDeep(testFormEvents.form);
    const originalMakeRequest = Formio.makeRequest;
    Formio.makeRequest = function () {
      return Promise.resolve(formJson);
    };
    const form = await Formio.createForm(
      document.createElement('div'),
      'http://localhost:3000/test',
      {
        i18n: {
          language: 'en',
          en: {}
        },
      },
    );
    delete form.i18next.languages.fr;
    delete form.i18next.languages.sp;
    delete form.i18next.languages.en['Text Field'];
    Formio.makeRequest = originalMakeRequest;
  });

  it('Should fire "initialized" event', function (done) {
    const element = document.createElement('div');
    const form = fastCloneDeep(testFormEvents.form);
    const originalMakeRequest = Formio.makeRequest;
    Formio.makeRequest = function () {
      return Promise.resolve(form);
    };
    let eventFired = false;
    Formio.createForm(element, 'http://localhost:3000/test')
      .then((instance) => {
        instance.on('initialized', () => {
          eventFired = true;
        });
        setTimeout(() => {
          assert.equal(eventFired, true);
          Formio.makeRequest = originalMakeRequest;
          done();
        }, 100);
      })
      .catch(done);
  });

  it('Should fire "formLoad" event', function (done) {
    const element = document.createElement('div');
    const form = fastCloneDeep(testFormEvents.form);
    const originalMakeRequest = Formio.makeRequest;
    Formio.makeRequest = function () {
      return Promise.resolve(form);
    };
    let eventFired = false;
    Formio.createForm(element, 'http://localhost:3000/test')
      .then((instance) => {
        instance.on('formLoad', (form) => {
          eventFired = true;
          try {
            assert.equal(form._id, 'testEventsFormId');
          } catch (err) {
            done(err);
          }
        });
        setTimeout(() => {
          assert.equal(eventFired, true);
          Formio.makeRequest = originalMakeRequest;
          done();
        }, 100);
      })
      .catch(done);
  });

  it('Should fire "change" and "componentChange" event', function (done) {
    const element = document.createElement('div');
    const form = fastCloneDeep(testFormEvents.form);
    const originalMakeRequest = Formio.makeRequest;
    Formio.makeRequest = function () {
      return Promise.resolve(form);
    };
    let changeEventFired = false;
    let compChangeEventFired = false;
    Formio.createForm(element, 'http://localhost:3000/test')
      .then((instance) => {
        instance.on('change', (changed, flags, modified) => {
          if (modified) {
            changeEventFired = true;
            try {
              assert.equal(changed.changed.value, 'test');
              assert.deepEqual(!!changed.data, true);
              assert.equal(changed.isValid, true);
              assert.equal(!!flags.changed, true);
              assert.equal(flags.changes.length, 1);
            } catch (err) {
              done(err);
            }
          }
        });

        instance.on('componentChange', ({ instance, component, value, flags }) => {
          if (value === 'test') {
            compChangeEventFired = true;
            try {
              assert.equal(instance.component.key, 'textField');
              assert.equal(component.key, 'textField');
              assert.equal(!!flags, true);
            } catch (err) {
              done(err);
            }
          }
        });
        const tfComp = instance.getComponent('textField');
        const inputEvent = new Event('input');
        const tfInput = tfComp.refs.input[0];
        tfInput.value = 'test';
        tfInput.dispatchEvent(inputEvent);
        setTimeout(() => {
          assert.equal(changeEventFired, true, 'Should fire change event');
          assert.equal(compChangeEventFired, true, 'Should fire componentChange event');
          Formio.makeRequest = originalMakeRequest;
          done();
        }, 300);
      })
      .catch(done);
  });

  it('Should fire "render" and "languageChanged" event', function (done) {
    const element = document.createElement('div');
    const form = fastCloneDeep(testFormEvents.form);
    const originalMakeRequest = Formio.makeRequest;
    Formio.makeRequest = function () {
      return Promise.resolve(form);
    };
    let renderEventFired = false;
    let lngEventFired = false;
    Formio.createForm(element, 'http://localhost:3000/test', {
      i18n: {
        language: 'en',
        fr: {
          'Text Field': 'TF fr',
        },
        en: {
          'Text Field': 'TF en',
        },
      },
    })
      .then((instance) => {
        instance.on('render', (el) => {
          renderEventFired = true;
          try {
            assert.equal(el instanceof HTMLElement, true);
          } catch (err) {
            done(err);
          }
        });

        instance.on('languageChanged', () => {
          lngEventFired = true;
        });

        setTimeout(() => {
          instance.language = 'fr';
          setTimeout(() => {
            assert.equal(lngEventFired, true);
            assert.equal(renderEventFired, true);
            Formio.makeRequest = originalMakeRequest;
            done();
          }, 300);
        }, 200);
      })
      .catch(done);
  });

  it('Should fire "blur" and "focus" events', function (done) {
    const element = document.createElement('div');
    const form = fastCloneDeep(testFormEvents.form);
    const originalMakeRequest = Formio.makeRequest;
    Formio.makeRequest = function () {
      return Promise.resolve(form);
    };
    let blurEventFired = false;
    let focusEventFired = false;
    let focusEventsCount = 0;
    Formio.createForm(element, 'http://localhost:3000/test')
      .then((instance) => {
        instance.on('focus', (instance) => {
          focusEventFired = true;
          ++focusEventsCount;
          try {
            assert.equal(!!instance, true);
          } catch (err) {
            done(err);
          }
        });

        instance.on('blur', (instance) => {
          blurEventFired = true;
          try {
            assert.equal(instance.component.key, 'textField');
          } catch (err) {
            done(err);
          }
        });

        const tfComp = instance.getComponent('textField');
        const focusEvent = new Event('focus');
        const tfInput = tfComp.refs.input[0];
        tfInput.dispatchEvent(focusEvent);

        setTimeout(() => {
          assert.equal(focusEventFired, true);
          assert.equal(focusEventsCount, 1);

          const blurEvent = new Event('blur');
          tfInput.dispatchEvent(blurEvent);

          const numberComp = instance.getComponent('number');
          const focusEvent = new Event('focus');
          const numberInput = numberComp.refs.input[0];
          numberInput.dispatchEvent(focusEvent);

          setTimeout(() => {
            assert.equal(focusEventFired, true);
            assert.equal(focusEventsCount, 2);
            assert.equal(blurEventFired, true);

            Formio.makeRequest = originalMakeRequest;
            done();
          }, 200);
        }, 200);
      })
      .catch(done);
  });

  it('Should fire "redraw" event', function (done) {
    const element = document.createElement('div');
    const form = fastCloneDeep(testFormEvents.form);
    const originalMakeRequest = Formio.makeRequest;
    Formio.makeRequest = function () {
      return Promise.resolve(form);
    };
    let eventFired = false;
    Formio.createForm(element, 'http://localhost:3000/test')
      .then((instance) => {
        instance.on('redraw', () => {
          eventFired = true;
        });
        const tfComp = instance.getComponent('textField');
        const inputEvent = new Event('input');
        const tfInput = tfComp.refs.input[0];
        tfInput.value = 'show';
        tfInput.dispatchEvent(inputEvent);
        setTimeout(() => {
          assert.equal(eventFired, true);
          Formio.makeRequest = originalMakeRequest;
          done();
        }, 100);
      })
      .catch(done);
  });

  it('Should fire "componentError" event', function (done) {
    const element = document.createElement('div');
    const form = fastCloneDeep(testFormEvents.form);
    const originalMakeRequest = Formio.makeRequest;
    Formio.makeRequest = function () {
      return Promise.resolve(form);
    };
    let eventFired = false;
    Formio.createForm(element, 'http://localhost:3000/test')
      .then((instance) => {
        instance.on('componentError', (err) => {
          eventFired = true;
          try {
            assert.equal(err.message, 'Number cannot be less than 10.');
          } catch (err) {
            done(err);
          }
        });
        setTimeout(() => {
          const numberComp = instance.getComponent('number');
          const inputEvent = new Event('input');
          const numberInput = numberComp.refs.input[0];
          numberInput.value = 7;
          numberInput.dispatchEvent(inputEvent);

          setTimeout(() => {
            assert.equal(eventFired, true);
            Formio.makeRequest = originalMakeRequest;
            done();
          }, 300);
        }, 200);
      })
      .catch(done);
  });

  it('Should fire "submitButton", "submitError" and "error" events', function (done) {
    const element = document.createElement('div');
    const form = fastCloneDeep(testFormEvents.form);
    const originalMakeRequest = Formio.makeRequest;
    Formio.makeRequest = function () {
      return Promise.resolve(form);
    };
    let submitBtnEventFired = false;
    let submitErrorEventFired = false;
    let errorEventFired = false;
    Formio.createForm(element, 'http://localhost:3000/test')
      .then((instance) => {
        instance.on('submitButton', (subm) => {
          submitBtnEventFired = true;
          try {
            assert.equal(subm.state, 'submitted');
          } catch (err) {
            done(err);
          }
        });

        instance.on('submitError', (errs) => {
          submitErrorEventFired = true;
          try {
            assert.equal(errs.length, 1);
            assert.equal(errs[0].message, 'Number cannot be less than 10.');
          } catch (err) {
            done(err);
          }
        });

        instance.on('error', (errs) => {
          errorEventFired = true;
          try {
            assert.equal(errs.length, 1);
            assert.equal(errs[0].message, 'Number cannot be less than 10.');
          } catch (err) {
            done(err);
          }
        });

        setTimeout(() => {
          const numberComp = instance.getComponent('number');
          const inputEvent = new Event('input');
          const numberInput = numberComp.refs.input[0];
          numberInput.value = 7;
          numberInput.dispatchEvent(inputEvent);
          setTimeout(() => {
            const clickEvent = new Event('click');
            const submitBtn = instance.element.querySelector('[name="data[submit]"]');
            submitBtn.dispatchEvent(clickEvent);

            setTimeout(() => {
              assert.equal(submitBtnEventFired, true);
              assert.equal(submitErrorEventFired, true);
              assert.equal(errorEventFired, true);
              Formio.makeRequest = originalMakeRequest;
              done();
            }, 300);
          }, 200);
        }, 200);
      })
      .catch(done);
  });

  it('Should fire "submitButton", "submit" and "submitDone" events', function (done) {
    const element = document.createElement('div');
    const form = fastCloneDeep(testFormEvents.form);
    const originalMakeRequest = Formio.makeRequest;
    Formio.makeRequest = function (formio, type, url, method, data) {
      if (type === 'submission' && method === 'post') {
        data._id = 'submittedObj';
        return Promise.resolve(data);
      }
      return Promise.resolve(form);
    };
    let submitBtnEventFired = false;
    let submitEventFired = false;
    let submitDoneEventFired = false;
    Formio.createForm(element, 'http://localhost:3000/test')
      .then((instance) => {
        instance.on('submitButton', (subm) => {
          submitBtnEventFired = true;
          try {
            assert.equal(subm.state, 'submitted');
          } catch (err) {
            done(err);
          }
        });
        instance.on('submit', (subm, saved) => {
          submitEventFired = true;
          try {
            assert.equal(subm._id, 'submittedObj');
            assert.equal(saved, true);
          } catch (err) {
            done(err);
          }
        });

        instance.on('submitDone', (subm) => {
          submitDoneEventFired = true;
          try {
            assert.equal(subm._id, 'submittedObj');
          } catch (err) {
            done(err);
          }
        });
        const clickEvent = new Event('click');
        const submitBtn = instance.element.querySelector('[name="data[submit]"]');
        submitBtn.dispatchEvent(clickEvent);

        setTimeout(() => {
          assert.equal(submitBtnEventFired, true);
          assert.equal(submitEventFired, true);
          assert.equal(submitDoneEventFired, true);
          Formio.makeRequest = originalMakeRequest;
          done();
        }, 200);
      })
      .catch(done);
  });

  it('Should fire "submissionDeleted" event', function (done) {
    const element = document.createElement('div');
    const form = fastCloneDeep(testFormEvents.form);
    const originalMakeRequest = Formio.makeRequest;
    Formio.makeRequest = function (formio, type, url, method) {
      if (type === 'form' && method === 'get') {
        return Promise.resolve(form);
      }
      if (type === 'submission' && method === 'get') {
        return Promise.resolve({
          form: '695fb0011f99564d66f95b7c',
          data: {
            textField: 'test',
            number: 12,
            deleteSubmission: true,
            submit: true,
          },
          _id: '6960f6f7ccd7dae85ed86e24',
          project: '6929620d3e9176a6e367a50d',
          created: '2026-01-09T12:39:19.703Z',
          modified: '2026-01-09T12:39:19.703Z',
        });
      }
      if (type === 'submission' && method === 'delete') {
        return Promise.resolve({});
      }
    };
    let eventFired = false;
    Formio.createForm(element, 'http://localhost:3000/test/submission/6960f6f7ccd7dae85ed86e24')
      .then((instance) => {
        instance.on('submissionDeleted', (subm) => {
          eventFired = true;
          try {
            assert.equal(!!subm, true);
          } catch (err) {
            done(err);
          }
        });
        const clickEvent = new Event('click');
        const submitBtn = instance.element.querySelector('[name="data[deleteSubmission]"]');
        submitBtn.dispatchEvent(clickEvent);
        setTimeout(() => {
          assert.equal(eventFired, true);
          Formio.makeRequest = originalMakeRequest;
          done();
        }, 100);
      })
      .catch(done);
  });

  it('Should fire "customEvent" event', function (done) {
    const element = document.createElement('div');
    const form = fastCloneDeep(testFormEvents.form);
    const originalMakeRequest = Formio.makeRequest;
    Formio.makeRequest = function (formio, type, url, method) {
      if (type === 'form' && method === 'get') {
        return Promise.resolve(form);
      }
    };
    let eventFired = false;
    let testEventFired = true;
    Formio.createForm(element, 'http://localhost:3000/test')
      .then((instance) => {
        instance.on('customEvent', ({ type, component, data, event }) => {
          eventFired = true;
          try {
            assert.equal(type, 'testCustomEvent');
            assert.equal(!!component, true);
            assert.equal(!!data, true);
            assert.equal(!!event, true);
          } catch (err) {
            done(err);
          }
        });

        instance.on('testCustomEvent', (data) => {
          testEventFired = true;
          try {
            assert.equal(!!data, true);
          } catch (err) {
            done(err);
          }
        });
        const clickEvent = new Event('click');
        const submitBtn = instance.element.querySelector('[name="data[customEvent]"]');
        submitBtn.dispatchEvent(clickEvent);
        setTimeout(() => {
          assert.equal(eventFired, true);
          assert.equal(testEventFired, true);
          Formio.makeRequest = originalMakeRequest;
          done();
        }, 100);
      })
      .catch(done);
  });

  it('Should fire "requestDone" event', function (done) {
    const element = document.createElement('div');
    const form = fastCloneDeep(testFormEvents.form);
    const originalMakeRequest = Formio.makeRequest;
    Formio.makeRequest = function (formio, type, url, method) {
      if (type === 'form' && method === 'get') {
        return Promise.resolve(form);
      }
    };
    const originalMakeStaticRequest = Formio.makeStaticRequest;
    Formio.makeStaticRequest = function (url, method, data) {
      return Promise.resolve(data);
    };
    let eventFired = false;
    Formio.createForm(element, 'http://localhost:3000/test')
      .then((instance) => {
        instance.on('requestDone', () => {
          eventFired = true;
        });

        const clickEvent = new Event('click');
        const submitBtn = instance.element.querySelector('[name="data[customUrl]"]');
        submitBtn.dispatchEvent(clickEvent);
        setTimeout(() => {
          assert.equal(eventFired, true);

          Formio.makeRequest = originalMakeRequest;
          Formio.makeStaticRequest = originalMakeStaticRequest;
          done();
        }, 100);
      })
      .catch(done);
  });

  it('Should fire "restoreDraft", "saveDraftBegin" and "saveDraft" events', function (done) {
    const element = document.createElement('div');
    const form = fastCloneDeep(testFormEvents.form);
    const originalMakeRequest = Formio.makeRequest;
    Formio.setUser({
      test: 123,
    });
    Formio.makeRequest = function (formio, type, url, method, data) {
      if (type === 'form' && method === 'get') {
        return Promise.resolve(form);
      }

      if (type === 'submissions' && method === 'get') {
        return Promise.resolve([]);
      }

      if (type === 'submission' && method === 'post') {
        data._id = 'testDraftId';
        return Promise.resolve(data);
      }
    };
    let restoreDraftEventFired = false;
    let saveDraftBeginEventFired = false;
    let saveDraftEventFired = false;
    Formio.createForm(element, 'http://localhost:3000/test', {
      saveDraft: true,
      saveDraftThrottle: 10000,
    })
      .then((instance) => {
        instance.on('restoreDraft', () => {
          restoreDraftEventFired = true;
        });

        instance.on('saveDraftBegin', () => {
          saveDraftBeginEventFired = true;
        });

        instance.on('saveDraft', (draft) => {
          saveDraftEventFired = true;
          try {
            assert.equal(draft._id, 'testDraftId');
            assert.equal(draft.state, 'draft');
          } catch (err) {
            done(err);
          }
        });

        setTimeout(() => {
          assert.equal(restoreDraftEventFired, true);
          const tfComp = instance.getComponent('textField');
          const inputEvent = new Event('input');
          const tfInput = tfComp.refs.input[0];
          tfInput.value = 'test';
          tfInput.dispatchEvent(inputEvent);

          setTimeout(() => {
            assert.equal(restoreDraftEventFired, true);
            assert.equal(saveDraftBeginEventFired, true);
            assert.equal(saveDraftEventFired, true);
            Formio.makeRequest = originalMakeRequest;
            Formio.setUser(null);
            done();
          }, 300);
        }, 300);
      })
      .catch(done);
  });

  it('Should fire "restoreDraftError" event', function (done) {
    const element = document.createElement('div');
    const form = fastCloneDeep(testFormEvents.form);
    const originalMakeRequest = Formio.makeRequest;
    Formio.setUser({
      test: 123,
    });
    Formio.makeRequest = function (formio, type, url, method) {
      if (type === 'form' && method === 'get') {
        return Promise.resolve(form);
      }

      if (type === 'submissions' && method === 'get') {
        return Promise.reject('The restore error.');
      }
    };
    let restoreDraftErrorEventFired = false;
    Formio.createForm(element, 'http://localhost:3000/test', {
      saveDraft: true,
      saveDraftThrottle: 10000,
    })
      .then((instance) => {
        instance.on('restoreDraftError', (err) => {
          restoreDraftErrorEventFired = true;
          try {
            assert.equal(err, 'The restore error.');
          } catch (err) {
            done(err);
          }
        });

        setTimeout(() => {
          assert.equal(restoreDraftErrorEventFired, true);
          Formio.makeRequest = originalMakeRequest;
          Formio.setUser(null);
          done();
        }, 300);
      })
      .catch(done);
  });

  it('Should fire "saveDraftError" event', function (done) {
    const element = document.createElement('div');
    const form = fastCloneDeep(testFormEvents.form);
    const originalMakeRequest = Formio.makeRequest;
    Formio.setUser({
      test: 123,
    });
    Formio.makeRequest = function (formio, type, url, method) {
      if (type === 'form' && method === 'get') {
        return Promise.resolve(form);
      }

      if (type === 'submissions' && method === 'get') {
        return Promise.resolve([]);
      }

      if (type === 'submission' && method === 'post') {
        return Promise.reject('Test draft error.');
      }
    };

    let saveDraftErrorEventFired = false;
    Formio.createForm(element, 'http://localhost:3000/test', {
      saveDraft: true,
      saveDraftThrottle: 10000,
    })
      .then((instance) => {
        instance.on('saveDraftError', (err) => {
          saveDraftErrorEventFired = true;
          try {
            assert.equal(err, 'Test draft error.');
          } catch (err) {
            done(err);
          }
        });

        setTimeout(() => {
          const tfComp = instance.getComponent('textField');
          const inputEvent = new Event('input');
          const tfInput = tfComp.refs.input[0];
          tfInput.value = 'test';
          tfInput.dispatchEvent(inputEvent);

          setTimeout(() => {
            assert.equal(saveDraftErrorEventFired, true);
            Formio.makeRequest = originalMakeRequest;
            Formio.setUser(null);
            done();
          }, 300);
        }, 300);
      })
      .catch(done);
  });

  it('Should fire editGridOpenModal event', function (done) {
    const element = document.createElement('div');
    const form = fastCloneDeep(testFormEvents.form);
    const originalMakeRequest = Formio.makeRequest;
    Formio.makeRequest = function () {
      return Promise.resolve(form);
    };

    let editGridOpenModal = false;

    Formio.createForm(element, 'http://localhost:3000/test')
      .then((instance) => {
        instance.on('editGridOpenModal', ({ component, row, instance }) => {
          editGridOpenModal = true;
          try {
            assert.equal(!!component, true);
            assert.equal(!!row, true);
            assert.equal(!!instance, true);
          } catch (err) {
            done(err);
          }
        });

        const clickEvent = new Event('click');
        const editGridComp = instance.getComponent('editGridModalRow');
        const refName = 'editgrid-editGridModalRow-';

        editGridComp.refs[`${refName}addRow`][0].dispatchEvent(clickEvent);

        setTimeout(() => {
          assert.equal(editGridOpenModal, true);
          Formio.makeRequest = originalMakeRequest;
          done();
        }, 200);
      })
      .catch(done);
  });

  it('Should fire editGrid row events', function (done) {
    const element = document.createElement('div');
    const form = fastCloneDeep(testFormEvents.form);
    const originalMakeRequest = Formio.makeRequest;
    Formio.makeRequest = function () {
      return Promise.resolve(form);
    };

    let editGridAddRow = false;
    let editGridEditRow = false;
    let editGridSaveRow = false;
    let editGridDeleteRow = false;

    Formio.createForm(element, 'http://localhost:3000/test')
      .then((instance) => {
        instance.on('editGridAddRow', ({ component, row }) => {
          editGridAddRow = true;
          try {
            assert.equal(!!component, true);
            assert.equal(!!row, true);
          } catch (err) {
            done(err);
          }
        });
        instance.on('editGridEditRow', ({ component, row, instance }) => {
          editGridEditRow = true;
          try {
            assert.equal(!!component, true);
            assert.equal(!!row, true);
            assert.equal(!!instance, true);
          } catch (err) {
            done(err);
          }
        });

        instance.on('editGridSaveRow', ({ component, row, instance }) => {
          editGridSaveRow = true;
          try {
            assert.equal(!!component, true);
            assert.equal(!!row, true);
            assert.equal(!!instance, true);
          } catch (err) {
            done(err);
          }
        });
        instance.on('editGridDeleteRow', ({ index }) => {
          editGridDeleteRow = true;
          try {
            assert.equal(index, 0);
          } catch (err) {
            done(err);
          }
        });
        const clickEvent = new Event('click');
        const editGridComp = instance.getComponent('editGrid');
        const refName = 'editgrid-editGrid-';

        editGridComp.refs[`${refName}addRow`][0].dispatchEvent(clickEvent);

        setTimeout(() => {
          assert.equal(editGridAddRow, true);
          editGridComp.refs[`${refName}saveRow`][0].dispatchEvent(clickEvent);

          setTimeout(() => {
            assert.equal(editGridSaveRow, true);
            editGridComp.refs[`${refName}row`][0]
              .querySelector('.editRow')
              .dispatchEvent(clickEvent);

            setTimeout(() => {
              assert.equal(editGridEditRow, true);
              editGridComp.refs[`${refName}saveRow`][0].dispatchEvent(clickEvent);

              setTimeout(() => {
                editGridComp.refs[`${refName}row`][0]
                  .querySelector('.removeRow')
                  .dispatchEvent(clickEvent);

                setTimeout(() => {
                  assert.equal(editGridDeleteRow, true);

                  Formio.makeRequest = originalMakeRequest;
                  done();
                }, 100);
              }, 100);
            }, 100);
          }, 100);
        }, 100);
      })
      .catch(done);
  });

  it('Should fire fileUploadingStart and fileUploadingEnd events', function (done) {
    const element = document.createElement('div');
    const form = fastCloneDeep(testFormEvents.form);
    const originalMakeRequest = Formio.makeRequest;
    Formio.makeRequest = function () {
      return Promise.resolve(form);
    };
    let fileUploadingStart = false;
    let fileUploadingEnd = false;

    Formio.createForm(element, 'http://localhost:3000/test')
      .then((instance) => {
        instance.on('fileUploadingStart', () => {
          fileUploadingStart = true;
        });

        instance.on('fileUploadingEnd', () => {
          fileUploadingEnd = true;
        });

        const fileComponent = instance.getComponent('file');
        fileComponent.handleFilesToUpload([
          {
            lastModified: 1742889250910,
            lastModifiedDate: new Date(),
            name: 'testFile.json',
            size: 34387,
            type: 'application/json',
            webkitRelativePath: '',
          },
        ]);

        setTimeout(() => {
          assert.equal(fileUploadingEnd, true);
          assert.equal(fileUploadingStart, true);

          Formio.makeRequest = originalMakeRequest;
          done();
        }, 200);
      })
      .catch(done);
  });

  it('Should fire wizard events', function (done) {
    const element = document.createElement('div');
    const form = fastCloneDeep(testFormEvents.wizard);
    const originalMakeRequest = Formio.makeRequest;
    Formio.makeRequest = function () {
      return Promise.resolve(form);
    };

    let nextPage = false;
    let prevPage = false;
    let pagesChanged = false;
    let wizardPageSelected = false;

    Formio.createForm(element, 'http://localhost:3000/test')
      .then((instance) => {
        instance.on('nextPage', ({ page, submission }) => {
          nextPage = true;
          try {
            assert.equal(typeof page, 'number');
            assert.equal(!!submission, true);
          } catch (err) {
            done(err);
          }
        });
        instance.on('prevPage', ({ page, submission }) => {
          prevPage = true;
          try {
            assert.equal(typeof page, 'number');
            assert.equal(!!submission, true);
          } catch (err) {
            done(err);
          }
        });

        instance.on('pagesChanged', () => {
          pagesChanged = true;
        });
        instance.on('wizardPageSelected', (page, index) => {
          wizardPageSelected = true;
          try {
            assert.equal(!!page, true);
            assert.equal(index, 2);
          } catch (err) {
            done(err);
          }
        });

        const clickEvent = new Event('click');
        const refName = `wizard-${instance.id}-`;

        instance.refs[`${refName}next`].dispatchEvent(clickEvent);

        setTimeout(() => {
          assert.equal(pagesChanged, true);
          pagesChanged = false;
          assert.equal(nextPage, true);
          instance.refs[`${refName}previous`].dispatchEvent(clickEvent);

          setTimeout(() => {
            assert.equal(prevPage, true);
            instance.refs[`${refName}link`][2].dispatchEvent(clickEvent);

            setTimeout(() => {
              assert.equal(wizardPageSelected, true);
              const taComp = instance.getComponent('textArea');
              const inputEvent = new Event('input');
              const taInput = taComp.refs.input[0];
              taInput.value = 'test';
              taInput.dispatchEvent(inputEvent);

              setTimeout(() => {
                assert.equal(pagesChanged, true);
                Formio.makeRequest = originalMakeRequest;
                done();
              }, 300);
            }, 200);
          }, 200);
        }, 200);
      })
      .catch(done);
  });
});
