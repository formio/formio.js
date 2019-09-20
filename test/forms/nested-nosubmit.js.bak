import sinon from 'sinon';
import { expect } from 'chai';
import FormComponent from '../../lib/components/form/Form';
import Webform from '../../lib/Webform.js';

export default {
  title: 'Nested Form nosubmit flag',
  form: { components: [{ key: 'form', type: 'form', components: [{ key: 'name', type: 'textfield' }] }] },
  tests: {
    'Should set nosubmit flag for nested forms'(form, done) {
      try {
        const EINIT = 'Initial value mismatch';
        const EPNOC = 'Parent flag not changed';
        const ECNOC = 'Child flag not changed';
        const [formCmp] = form.components;

        // Check wrapper
        expect(formCmp).to.be.an.instanceof(FormComponent);

        formCmp.subFormReady.
          then(subForm => {
            expect(subForm).to.be.an.instanceof(Webform);
            expect(form.nosubmit, EINIT).to.be.false;
            expect(subForm.nosubmit, EINIT).to.be.false;
            form.nosubmit = true;
            expect(form.nosubmit, EPNOC).to.be.true;
            expect(subForm.nosubmit, ECNOC).to.be.true;
            form.nosubmit = false;
            expect(form.nosubmit, EPNOC).to.be.false;
            expect(subForm.nosubmit, ECNOC).to.be.false;
            done();
          }, done).
          catch(done);
      }
      catch (error) {
        done(error);
      }
    }
  }
};
