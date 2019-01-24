import sinon from 'sinon';
import { expect } from 'chai';
import FormComponent from '../../src/components/form/Form';
import Webform from '../../src/Webform.js';

export default {
  title: 'Nested Form Event Bubbling',
  form: { components: [{ key: 'form', type: 'form', components: [{ key: 'name', type: 'textfield' }] }] },
  tests: {
    'Event should bubble up to parent form'(form, done) {
      try {
        const EPE = 'Parent events not works';
        const ENE = 'Nested events not works';
        const EBB = 'Events not bubbling up';
        const type1 = 'parent.custom.event';
        const type2 = 'nested.custom.event';
        const type3 = 'bubbling.event';
        const listener1 = sinon.spy();
        const listener2 = sinon.spy();
        const listener3parent = sinon.spy();
        const listener3nested = sinon.spy();
        const [formCmp] = form.components;

        // Check wrapper
        expect(formCmp).to.be.an.instanceof(FormComponent);

        formCmp.subFormReady.
          then(subForm => {
            // Check nested form
            expect(subForm).to.be.an.instanceof(Webform);

            // Make sure that parent emitter works
            form.on(type1, listener1);
            form.emit(type1);
            expect(listener1.callCount, EPE).to.equal(1);
            form.emit(type1);
            expect(listener1.callCount, EPE).to.equal(2);

            // Make sure that nested emitter works
            subForm.on(type2, listener2);
            subForm.emit(type2);
            expect(listener2.callCount, ENE).to.equal(1);
            subForm.emit(type2);
            expect(listener2.callCount, ENE).to.equal(2);

            // Check event bubbling;
            form.on(type3, listener3parent);
            subForm.on(type3, listener3nested);
            subForm.emit(type3);
            expect(listener3nested.callCount, ENE).to.equal(1);
            expect(listener3parent.callCount, EBB).to.equal(1);
            subForm.emit(type3);
            expect(listener3nested.callCount, ENE).to.equal(2);
            expect(listener3parent.callCount, EBB).to.equal(2);
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
