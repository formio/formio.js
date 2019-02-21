import { nestedConditionalForm } from '../fixtures';
import { expect } from 'chai';
import Harness from '../harness';

export default {
  title: 'Nested Form Tests',
  form: nestedConditionalForm,
  tests: {
    'Form validation should skip hidden nested form'(form, done) {
      const submission = {
        data: {
          radio: 'no',
        }
      };

      Harness.onNext(form, 'change', () => {
        form.submit().then(() => done(), done);
      });

      form.submission = submission;
    },
    'Form validation should validate nested form'(form, done) {
      const submission = {
        data: {
          radio: 'yes',
        }
      };

      Harness.onNext(form, 'change', () => {
        form.submit()
          .then(
            () => expect.fail('Submit should reject'),
            errors => {
              expect(errors).to.be.lengthOf(1);
              expect(errors[0].message).to.equal('Name is required');
              done();
            }
          )
          .catch(done);
      });

      form.submission = submission;
    }
  }
};
