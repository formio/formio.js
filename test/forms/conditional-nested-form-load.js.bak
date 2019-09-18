import { expect } from 'chai';
import Formio from '../../src/Formio';
import fetchMock from 'fetch-mock/es5/client';
Formio.fetch = fetchMock.fetchHandler;
import {
  exampleForm,
  conditionallyHiddenNestedForm
} from '../fixtures';

import Harness from '../harness';

/**
 * Test should proof that nested forms load subform
 * only when conditions are true.
 * Test strategy:
 * Fetch-Mock form URL and check number of requests to that URL
 * between form changes.
 */

export default {
  title: 'Conditional Nested Form Load',
  form: conditionallyHiddenNestedForm,
  tests: {
    'Should not load sub form if conditionally hidden'(form, done) {
      try {
        const ELBC = 'Loaded Before Conditions';
        const ESNL = 'Subform not loaded';
        const url = 'https://examples.form.io/example?live=1';
        fetchMock.mock(url, exampleForm);
        const [,,formcmp] = form.components;
        formcmp.subFormReady.
          then(() => {
            expect(fetchMock.calls(url).length, `Step 4: ${ESNL}`).to.equal(1);
            done();
          }, done).
          catch(done);

        expect(fetchMock.calls(url).length, `Step 1: ${ELBC}`).to.equal(0);
        Harness.testSubmission(form, {
          data: {
            textField2: 'text',
            checkbox2: false,
            form: { data: {} }
          }
        });
        expect(fetchMock.calls(url).length, `Step 2: ${ELBC}`).to.equal(0);
        Harness.testSubmission(form, {
          data: {
            textField2: '',
            checkbox2: true,
            form: { data: {} }
          }
        });
        expect(fetchMock.calls(url).length, `Step 3: ${ELBC}`).to.equal(0);
      }
      catch (error) {
        done(error);
      }
    }
  }
};
