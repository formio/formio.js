import assert from 'power-assert';
import Formio from '../../Formio';
import { comp1 } from './fixtures';

describe('Tabs Component', () => {
  it('Test setting error classes when set to modalEdit', (done) => {
    const formElement = document.createElement('div');
    Formio.createForm(formElement, { display: 'form', type: 'form', components: [comp1] }).then((form) => {
      const comp = form.components[0];

      const data = {
        textField: '',
      };

      form.checkValidity(data, true, data);

      setTimeout(() => {
        const openModalWrapper = form.element.querySelector('[ref="openModalWrapper"]');
        assert(openModalWrapper.className.includes('formio-error-wrapper'), 'Should have error class');
        assert(openModalWrapper.className.includes('has-message'), 'Should have class indicating that the component has a message');

        const openModalButton = comp.element.querySelector('[ref="openModal"]');

        assert(!openModalButton.className.includes('tab-error'), 'Open modal element should not have a tab-error class');

        const validData = {
          textField: 'Text',
        };

        form.setSubmission({ data: validData });

        setTimeout(() => {
          const openModalWrapper = form.element.querySelector('[ref="openModalWrapper"]');
          assert(!openModalWrapper.className.includes('formio-error-wrapper'), 'Should not have error class');
          assert(!openModalWrapper.className.includes('has-message'), 'Should not have class indicating that the component has a message');

          done();
        }, 250);
      }, 200);
    }).catch(done);
  });
});
