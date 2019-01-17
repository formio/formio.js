import _map from 'lodash/map';
import assert from 'power-assert';
import { expect } from 'chai';

import Harness from '../harness';

export default {
  title: 'Simple Wizard',
  form: {
    _id: '58cdd541d482d500aaf48368',
    machineName: 'eguamgudzerbvzc:wizard',
    modified: '2017-03-19T00:48:02.035Z',
    title: 'Wizard',
    display: 'wizard',
    name: 'wizard',
    path: 'wizard',
    project: '58cc056767cb9600a75712e2',
    created: '2017-03-19T00:48:01.666Z',
    components: [{
      key: 'panel1',
      input: false,
      title: 'Page 1',
      theme: 'default',
      components: [{
        input: true,
        tableView: true,
        inputType: 'text',
        inputMask: '',
        label: 'a',
        key: 'a',
        placeholder: '',
        prefix: '',
        suffix: '',
        multiple: false,
        defaultValue: '',
        protected: false,
        unique: false,
        persistent: true,
        clearOnHide: true,
        validate: {required: true, minLength: '', maxLength: '', pattern: '', custom: '', customPrivate: false},
        conditional: {show: '', when: null, eq: ''},
        type: 'textfield',
        tags: []
      }, {
        input: true,
        tableView: true,
        inputType: 'text',
        inputMask: '',
        label: 'b',
        key: 'b',
        placeholder: '',
        prefix: '',
        suffix: '',
        multiple: false,
        defaultValue: '',
        protected: false,
        unique: false,
        persistent: true,
        clearOnHide: true,
        validate: {required: false, minLength: '', maxLength: '', pattern: '', custom: '', customPrivate: false},
        conditional: {show: '', when: null, eq: ''},
        type: 'textfield',
        tags: []
      }],
      type: 'panel',
      tags: [],
      conditional: {show: '', when: null, eq: ''}
    }, {
      key: 'panel2',
      input: false,
      title: 'Page 2',
      theme: 'default',
      components: [{
        input: true,
        tableView: true,
        inputType: 'text',
        inputMask: '',
        label: 'c',
        key: 'c',
        placeholder: '',
        prefix: '',
        suffix: '',
        multiple: false,
        defaultValue: '',
        protected: false,
        unique: false,
        persistent: true,
        clearOnHide: true,
        validate: {required: false, minLength: '', maxLength: '', pattern: '', custom: '', customPrivate: false},
        conditional: {show: '', when: null, eq: ''},
        type: 'textfield',
        tags: []
      }, {
        input: true,
        tableView: true,
        inputType: 'text',
        inputMask: '',
        label: 'd',
        key: 'd',
        placeholder: '',
        prefix: '',
        suffix: '',
        multiple: false,
        defaultValue: '',
        protected: false,
        unique: false,
        persistent: true,
        clearOnHide: true,
        validate: {required: false, minLength: '', maxLength: '', pattern: '', custom: '', customPrivate: false},
        conditional: {show: '', when: null, eq: ''},
        type: 'textfield',
        tags: []
      }],
      type: 'panel',
      tags: [],
      conditional: {show: '', when: null, eq: ''}
    }, {
      key: 'panel3',
      input: false,
      title: 'Page 3',
      theme: 'default',
      components: [{
        input: true,
        tableView: true,
        inputType: 'text',
        inputMask: '',
        label: 'e',
        key: 'e',
        placeholder: '',
        prefix: '',
        suffix: '',
        multiple: false,
        defaultValue: '',
        protected: false,
        unique: false,
        persistent: true,
        clearOnHide: true,
        validate: {required: false, minLength: '', maxLength: '', pattern: '', custom: '', customPrivate: false},
        conditional: {show: '', when: null, eq: ''},
        type: 'textfield',
        tags: []
      }, {
        input: true,
        tableView: true,
        inputType: 'text',
        inputMask: '',
        label: 'f',
        key: 'f',
        placeholder: '',
        prefix: '',
        suffix: '',
        multiple: false,
        defaultValue: '',
        protected: false,
        unique: false,
        persistent: true,
        clearOnHide: true,
        validate: {required: false, minLength: '', maxLength: '', pattern: '', custom: '', customPrivate: false},
        conditional: {show: '', when: null, eq: ''},
        type: 'textfield',
        tags: []
      }, {
        input: true,
        tableView: true,
        inputType: 'text',
        inputMask: '',
        label: 'g',
        key: 'g',
        placeholder: '',
        prefix: '',
        suffix: '',
        multiple: false,
        defaultValue: '',
        protected: false,
        unique: false,
        persistent: true,
        clearOnHide: true,
        validate: {required: false, minLength: '', maxLength: '', pattern: '', custom: '', customPrivate: false},
        conditional: {show: '', when: null, eq: ''},
        type: 'textfield',
        tags: []
      }],
      type: 'panel',
      tags: [],
      conditional: {show: '', when: null, eq: ''}
    }, {
      input: true,
      label: 'Submit',
      tableView: false,
      key: 'submit',
      size: 'md',
      leftIcon: '',
      rightIcon: '',
      block: false,
      action: 'submit',
      disableOnInvalid: false,
      theme: 'primary',
      type: 'button'
    }],
    owner: '57605b5965901601001cbbd2',
    submissionAccess: [],
    access: [{
      type: 'read_all',
      roles: ['58cc056767cb9600a75712e3', '58cc056767cb9600a75712e4', '58cc056767cb9600a75712e5']
    }],
    tags: [],
    type: 'form'
  },
  tests: {
    'Test Wizard valid submission': (form, done) => {
      // Check current page
      assert.equal(form.page, 0);
      assert.deepStrictEqual(form._seenPages, [0]);
      Harness.testElements(form, 'input[type="text"]', 2);
      const buttonsToValid = ['Cancel', 'Next'];
      const buttonsText =  _map(Harness.testElements(form, 'button'), (button) => button.innerText);
      assert.deepEqual(buttonsText, buttonsToValid);

      // Try to go to previous page. Stay on page 0
      return Harness.testWizardPrevPage(form)
        .then(() => {
          expect(form.page, 'should stay on page 0').to.equal(0);
        })
        .then(() => {
          return form.submit();
        })
        .then(() => {
          // Should returns a reject
          done('Should not be called');
        })
        .catch((errors) => {
          if (errors instanceof Error) done(errors);
          // Submission should include only 2 fields.
          assert.equal(Object.keys(form.submission.data).length, 2);
          assert.equal(errors.length, 1);
          assert.equal(errors[0].message, 'a is required');
        })
        .then(() => {
          // Try to go to next page. Stay on page 0
          return Harness.testWizardNextPage(form, [{
            component: 'a',
            message: 'a is required'
          }]);
        })
        .then(() => {
          // Should returns a reject
          done('Should not be called');
        })
        .catch(errors => {
          if (errors instanceof Error) done(errors);
          // Catch next page error
          assert.equal(errors.length, 1);
          assert.equal(errors[0].message, 'a is required');
          assert.equal(form.page, 0);
        })
        .then(() => {
          // Write data
          const wizardData = {
            a: 'a',
            b: 'b'
          };
          Harness.testSubmission(form, {
            data: wizardData
          });
          assert.deepStrictEqual(form._seenPages, [0]);
          assert.equal(form.page, 0);
        })
        .then(() => {
          // Go to next page.
          return Harness.testWizardNextPage(form);
        })
        .catch((error) => {
          // Should returns a success
          done(error);
        })
        .then(() => {
          // Check next page
          assert.equal(form.page, 1);
          // Check that 0 and 1 pages have been seen.
          assert.deepStrictEqual(form._seenPages, [0, 1]);
          Harness.testElements(form, 'input[type="text"]', 2);
          const buttonsToValid = ['Cancel', 'Previous', 'Next'];
          const buttonsText =  _map(Harness.testElements(form, 'button'), (button) => button.innerText);
          assert.deepEqual(buttonsText, buttonsToValid);
        })
        .then(() => {
          // Click on cancel.
          return form.cancel(true);
        })
        .catch((error) => {
          // Should returns a success
          done(error);
        })
        .then(() => {
          // Check start page
          assert.deepEqual(form.data, {
            a: '',
            b: ''
          });
          assert.equal(form.page, 0);
          assert.deepStrictEqual(form._seenPages, [0, 1]);
          Harness.testElements(form, 'input[type="text"]', 2);
          const buttonsToValid = ['Cancel', 'Next'];
          const buttonsText =  _map(Harness.testElements(form, 'button'), (button) => button.innerText);
          assert.deepEqual(buttonsText, buttonsToValid);
        })
        .then(() => {
          // Write data
          const wizardData = {
            a: 'a',
            b: 'b',
            c: '',
            d: ''
          };
          Harness.testSubmission(form, {
            data: wizardData
          });
          assert.equal(form.page, 0);
          assert.deepStrictEqual(form._seenPages, [0, 1]);
        })
        .then(() => {
          // Go to next page.
          return Harness.testWizardNextPage(form);
        })
        .catch((error) => {
          // Should returns a success
          done(error);
        })
        .then(() => {
          // Check next page
          assert.equal(form.page, 1);
          assert.deepStrictEqual(form._seenPages, [0, 1]);
          Harness.testElements(form, 'input[type="text"]', 2);
          const buttonsToValid = ['Cancel', 'Previous', 'Next'];
          const buttonsText =  _map(Harness.testElements(form, 'button'), (button) => button.innerText);
          assert.deepEqual(buttonsText, buttonsToValid);
        })
        .then(() => {
          // Write data
          const wizardData = {
            a: 'a',
            b: 'b',
            c: 'c',
            d: ''
          };
          Harness.testSubmission(form, {
            data: wizardData
          });
        })
        .then(() => {
          // Go to previous page.
          return Harness.testWizardPrevPage(form, null, (data) => {
            // Check prevPage event
            assert.equal(data.page, 0);
            assert.deepEqual(data.submission.data, {
              a: 'a',
              b: 'b',
              c: 'c',
              d: ''
            });
          });
        })
        .catch((error) => {
          // Should returns a success
          done(error);
        })
        .then(() => {
          // Check previous page
          assert.equal(form.page, 0);
          Harness.testElements(form, 'input[type="text"]', 2);
          const buttonsToValid = ['Cancel', 'Next'];
          const buttonsText =  _map(Harness.testElements(form, 'button'), (button) => button.innerText);
          assert.deepEqual(buttonsText, buttonsToValid);
        })
        .then(() => {
          // Go to next page.
          return Harness.testWizardNextPage(form);
        })
        .catch((error) => {
          // Should returns a success
          done(error);
        })
        .then(() => {
          // Check next page
          assert.equal(form.page, 1);
          Harness.testElements(form, 'input[type="text"]', 2);
          const buttonsToValid = ['Cancel', 'Previous', 'Next'];
          const buttonsText =  _map(Harness.testElements(form, 'button'), (button) => button.innerText);
          assert.deepEqual(buttonsText, buttonsToValid);
        })
        .then(() => {
          // Go to last page.
          return Harness.testWizardNextPage(form, null, (data) => {
            // Check nextPage event
            assert.equal(data.page, 2);
            assert.deepStrictEqual(form._seenPages, [0, 1, 2]);
            assert.deepEqual(data.submission.data, {
              a: 'a',
              b: 'b',
              c: 'c',
              d: '',
              e: '',
              f: '',
              g: ''
            });
          });
        })
        .catch((error) => {
          // Should returns a success
          done(error);
        })
        .then(() => {
          // Check last page
          assert.equal(form.page, 2);
          Harness.testElements(form, 'input[type="text"]', 3);
          const buttonsToValid = ['Cancel', 'Previous', 'Submit Form'];
          const buttonsText =  _map(Harness.testElements(form, 'button'), (button) => button.innerText);
          assert.deepEqual(buttonsText, buttonsToValid);
        })
        .then(() => {
          // Write data
          const wizardData = {
            a: 'a',
            b: 'b',
            c: 'c',
            d: '',
            e: 'e',
            f: 'f',
            g: 'g'
          };
          Harness.testSubmission(form, {
            data: wizardData
          });
        })
        .then(() => {
          // Check submit event
          form.on('submit', (submission) => {
            assert.deepEqual(submission.data, {
              a: 'a',
              b: 'b',
              c: 'c',
              d: '',
              e: 'e',
              f: 'f',
              g: 'g'
            });
          });
          // Submit
          return form.submit();
        })
        .then((submission) => {
          // Check submission
          assert.deepEqual(submission.data, {
            a: 'a',
            b: 'b',
            c: 'c',
            d: '',
            e: 'e',
            f: 'f',
            g: 'g'
          });
        })
        .catch((error) => {
          // Should returns a success
          done(error);
        })
        // Call done
        .then(() => {
          done();
        });
    },
    'Test Wizard.setPage with invalid page number': (form, done) => {
      let res;
      try {
        res = form.setPage(-1);
      }
      catch (error) {
        done(error);
      }

      res
        .then(() => expect.fail('should reject'))
        .catch(error => {
          expect(error).to.equal('Page not found');
          done();
        });
    }
  }
};
