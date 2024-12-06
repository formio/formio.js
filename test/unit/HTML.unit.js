import Webform from '../../src/Webform';
import Harness from '../harness';
import HTMLComponent from '../../src/components/html/HTML';
import sinon from 'sinon';
import assert from 'power-assert';

import { comp1, comp2, comp3 } from './fixtures/html';

describe('HTML Component', function () {
  it('Should build an html component', function () {
    return Harness.testCreate(HTMLComponent, comp1);
  });

  it('Should build an html component and ignore empty attribute name', function () {
    const comp = comp1;
    comp.attrs.push({
      attr: '',
      value: '',
    });

    return Harness.testCreate(HTMLComponent, comp1);
  });

  it('setContent should not be called if it is not conditionally visible', function () {
    return Harness.testCreate(HTMLComponent, comp2).then((component) => {
      const emit = sinon.spy(component, 'setContent');
      component.checkRefreshOn(null);
      assert.equal(emit.callCount, 0);
    });
  });

  it('Should not execute scripts inside HTML component, but execute interpolation properly', function (done) {
    const formElement = document.createElement('div');
    const form = new Webform(formElement);

    const alert = sinon.spy(window, 'alert');
    form
      .setForm(comp3)
      .then(() => {
        setTimeout(() => {
          assert.equal(alert.callCount, 0);
          const div = form.element.querySelector('.myClass');
          assert.equal(div.innerHTML.trim(), 'No Text');

          const textField = form.getComponent(['textField']);
          textField.setValue('apple', { modified: true });

          setTimeout(() => {
            const div = form.element.querySelector('.myClass');

            assert.equal(div.innerHTML.trim(), 'apple');
            assert.equal(div.className, 'myClass apple-class');
            done();
          }, 400);
        }, 200);
      })
      .catch(done);
  });
});
