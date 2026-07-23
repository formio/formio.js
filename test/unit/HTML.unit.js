import Webform from '../../src/Webform';
import Harness from '../harness';
import HTMLComponent from '../../src/components/html/HTML';
import sinon from 'sinon';
import assert from 'power-assert';

import { comp1, comp2, comp3, comp4 } from './fixtures/html/index';

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

  it('Should not duplicate content when the HTML tag and content share a p tag', function (done) {
    const formElement = document.createElement('div');
    const form = new Webform(formElement);

    form
      .setForm({
        components: [
          {
            type: 'htmlelement',
            key: 'html',
            tag: 'p',
            content: '<p>DUPLICATE_MARKER</p>',
            input: false,
          },
        ],
      })
      .then(() => form.setSubmission({ data: {} }, { fromSubmission: false }))
      .then(() => {
        setTimeout(() => {
          const container = form.element.querySelector('.formio-component-htmlelement');
          const occurrences = (container.textContent.match(/DUPLICATE_MARKER/g) || []).length;
          assert.equal(occurrences, 1);
          done();
        }, 200);
      })
      .catch(done);
  });

  it('Should not duplicate content in builder mode when the HTML tag and content share a p tag', function () {
    return Harness.testCreate(
      HTMLComponent,
      {
        type: 'htmlelement',
        key: 'html',
        tag: 'p',
        content: '<p>DUPLICATE_MARKER</p>',
        input: false,
      },
      { attachMode: 'builder' },
    ).then((component) => {
      const occurrences = (component.element.textContent.match(/DUPLICATE_MARKER/g) || []).length;
      assert.equal(occurrences, 1);
    });
  });

  it('Should render all HTML components with instance.t after setSubmission', function () {
    const formElement = document.createElement('div');
    const form = new Webform(formElement);
    const keys = ['apple', 'banana', 'cherry', 'dog', 'elephant', 'frenchfries'];

    return form
      .setForm(comp4)
      .then(() => form.setSubmission({ data: {} }, { fromSubmission: false }))
      .then(() => {
        const elements = form.element.querySelectorAll('[ref="html"]');

        assert.equal(elements.length, keys.length);
        keys.forEach((key, index) => {
          assert.equal(elements[index].textContent.trim(), key);
        });
      });
  });
});
