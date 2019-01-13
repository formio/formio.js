import { comp1 as nestedForm } from '../../src/components/form/fixtures';
import { Components } from '../../src/formio.form.js';
import sinon from 'sinon';
import { expect } from 'chai';

export default {
  title: 'Nested Form Tests',
  form:  { components: [nestedForm] },
  tests: {
    'Nested form should receive new lang through options, when parent form lang changed'(form, done) {
      const constructorFnSpy = sinon.spy(Components.components, 'form');
      const callback = () => {
        try {
          expect(constructorFnSpy.called).to.be.true;
          expect(constructorFnSpy.calledOnce).to.be.true;
          const args = constructorFnSpy.args[0];
          expect(args[1]).to.be.an('object');
          expect(args[1].language).to.equal('us');
        }
        catch (error) {
          done(error);
        }
        done();
        form.off('languageChanged', callback);
      };

      form.on('languageChanged', callback);
      form.addLanguage('us', {}, true);
    }
  }
};
