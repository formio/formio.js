import assert from 'power-assert';
import _ from 'lodash';

import Harness from '../harness';
import { Formio } from '../../src/Formio';
import CheckBoxComponent from '../../src/components/checkbox/Checkbox';

import {
  comp1,
  customDefaultComponent,
  comp2,
  comp3,
  comp4,
  comp5,
} from './fixtures/checkbox/index';

describe('Checkbox Component', function () {
  it('Should build a checkbox component', function () {
    return Harness.testCreate(CheckBoxComponent, comp1).then((component) => {
      const inputs = Harness.testElements(component, 'input[type="checkbox"]', 1);
      for (let i = 0; i < inputs.length; i++) {
        assert(
          inputs[i].getAttribute('class').indexOf('form-check-input') !== -1,
          'No form-check-input class',
        );
        assert.equal(inputs[i].name, `data[${comp1.key}]`);
      }
      Harness.testElements(component, 'span', 1);
    });
  });

  it('Span should have correct text label', function () {
    return Harness.testCreate(CheckBoxComponent, comp1).then((component) => {
      const checkboxes = component.element.querySelectorAll('input[ref="input"]');
      assert.equal(checkboxes.length, 1);
      const componentClass = checkboxes[0].getAttribute('class');
      assert(componentClass.indexOf('form-check-input') !== -1, 'No form-check-input class.');
      const labels = component.element.querySelectorAll('label');
      assert.equal(labels.length, 1);
      assert(
        labels[0].getAttribute('class').indexOf('form-check-label') !== -1,
        'No form-check-label class',
      );
      const spans = labels[0].querySelectorAll('span');
      assert.equal(spans.length, 1);
      assert.equal(spans[0].innerHTML, 'Check me');
    });
  });

  it('Should be able to set and get data', function () {
    return Harness.testCreate(CheckBoxComponent, comp1).then((component) => {
      Harness.testSetGet(component, 1);
      Harness.testSetGet(component, 0);
    });
  });

  it('Should be able to set custom default value', function () {
    return Harness.testCreate(CheckBoxComponent, customDefaultComponent).then((component) => {
      assert.equal(component.dataValue, true);
    });
  });

  it('Should be able to unselect a checkbox component with the radio input type', function () {
    return Harness.testCreate(CheckBoxComponent, comp2).then((component) => {
      const input = Harness.testElements(component, 'input[type="radio"]', 1)[0];
      Harness.clickElement(component, input);
      assert.equal(input.checked, true);
      Harness.clickElement(component, input);
      assert.equal(input.checked, false);
    });
  });

  it('Should render red asterisk for preview template of the modal required checkbox ', function (done) {
    Harness.testCreate(CheckBoxComponent, comp3)
      .then((component) => {
        const label = component.element.querySelector('.control-label');
        assert(label.className.includes('field-required'));
        done();
      })
      .catch(done);
  });

  it('Should render the required asterisk as an aria-hidden span inside the label (FIO-11111)', function () {
    const requiredCheckbox = {
      label: 'Check me',
      key: 'checkbox',
      type: 'checkbox',
      input: true,
      validate: { required: true },
    };
    return Harness.testCreate(CheckBoxComponent, requiredCheckbox).then((component) => {
      const star = component.element.querySelector('span.required-star');
      assert(star, 'required asterisk should be a real <span class="required-star"> element');
      assert.equal(
        star.getAttribute('aria-hidden'),
        'true',
        'the asterisk span must be aria-hidden so a screen reader does not announce "star"',
      );
      // The star lives INSIDE the label so it stays on the label's last line (a sibling
      // after a block label drops to a new line). It is an aria-hidden DESCENDANT — not the
      // element aria-labelledby points at directly — so accname excludes it from the input's
      // name (verified in Chrome/Edge and WebKit); the "star" is never announced.
      assert(star.closest('label'), 'the asterisk span must be inside the label');
      // FIO-11977 guard: exactly one asterisk (no duplicated CSS pseudo + span).
      assert.equal(
        component.element.querySelectorAll('span.required-star').length,
        1,
        'there must be exactly one required-star span (no duplicated asterisk)',
      );
      // Requiredness is announced through aria-required on the input, not the star.
      const input = component.element.querySelector('input[ref="input"]');
      assert.equal(
        input.getAttribute('aria-required'),
        'true',
        'the input should carry aria-required so the requirement is announced',
      );
    });
  });

  it('Should render the description exactly once, with or without the field wrapper (FIO-12196)', function () {
    const describedCheckbox = {
      label: 'Check me',
      key: 'checkbox',
      type: 'checkbox',
      input: true,
      description: 'TEST',
    };
    return Harness.testCreate(CheckBoxComponent, describedCheckbox).then((component) => {
      const descriptionId = `d-${component.id}-${component.component.key}`;
      const countDescriptions = (html) => html.split(`id="${descriptionId}"`).length - 1;

      // Normally the `field` wrapper renders the description.
      assert.equal(
        countDescriptions(component.render()),
        1,
        'the description should be rendered once when the field wrapper is used',
      );

      // An a11y layer (@formio/vpat) sets noField on the checkbox to avoid a duplicate label,
      // which skips that wrapper — the description must still be there, and still only once.
      component.noField = true;
      const html = component.render();
      assert.equal(
        countDescriptions(html),
        1,
        'the description should still be rendered when the field wrapper is skipped',
      );
      assert(html.indexOf('TEST') !== -1, 'the description text should be rendered');
      // The input points at the description, so the id must exist or the reference dangles.
      assert(
        html.indexOf(`aria-describedby="${descriptionId}"`) !== -1,
        'aria-describedby should reference the rendered description',
      );
    });
  });

  it('Should hide component with conditional logic when checkbox component with the radio input type is unchecked', function (done) {
    const form = _.cloneDeep(comp4);
    const element = document.createElement('div');

    Formio.createForm(element, form)
      .then((form) => {
        const radioCheckbox = form.getComponent('p1');
        const contentComp = form.getComponent('p1Content');
        assert.equal(contentComp.visible, false);
        const radio = Harness.testElements(radioCheckbox, 'input[type="radio"]', 1)[0];
        Harness.clickElement(radioCheckbox, radio);
        setTimeout(() => {
          assert.equal(contentComp.visible, true);
          Harness.clickElement(radioCheckbox, radio);
          setTimeout(() => {
            assert.equal(contentComp.visible, false);
            done();
          }, 300);
        }, 300);
      })
      .catch((err) => done(err));
  });

  it('Should set the value for the checkbox if it set before the component from checbox`s condition', function (done) {
    const form = _.cloneDeep(comp5);
    const element = document.createElement('div');
    const data = {
      textField: 'test',
      checkboxBefore: true,
      checkboxAfter: true,
    };
    Formio.createForm(element, form)
      .then((form) => {
        form.setValue({ data }, { sanitize: true });
        const checkboxBefore = form.getComponent('checkboxBefore');
        const checkboxAfter = form.getComponent('checkboxAfter');
        setTimeout(() => {
          const inputBefore = Harness.testElements(checkboxBefore, 'input[type="checkbox"]', 1)[0];
          assert.equal(inputBefore.checked, true);
          const inputAfter = Harness.testElements(checkboxAfter, 'input[type="checkbox"]', 1)[0];
          assert.equal(inputAfter.checked, true);
          assert.deepEqual(form.data, data);
          done();
        }, 300);
      })
      .catch((err) => done(err));
  });

  it('Should be able to submit default checkbox data with the radio input type', function (done) {
    const form = {
      name: 'ckeckbox',
      path: 'ckeckbox',
      type: 'form',
      display: 'form',

      components: [
        {
          label: 'Checkbox',
          inputType: 'radio',
          tableView: false,
          defaultValue: false,
          key: 'checkbox',
          type: 'checkbox',
          name: 'some name',
          value: 'ok',
          input: true,
          'some name': false,
        },
        {
          type: 'button',
          label: 'Submit',
          key: 'submit',
          disableOnInvalid: true,
          input: true,
          tableView: false,
        },
      ],
    };
    const element = document.createElement('div');
    const inputName = form.components[0].name;

    Formio.createForm(element, form)
      .then((form) => {
        const submit = form.getComponent('submit');
        const clickEvent = new Event('click');
        const submitBtn = submit.refs.button;
        submitBtn.dispatchEvent(clickEvent);

        setTimeout(() => {
          assert.equal(form.submission.data[inputName], '');
          const radioCheckBox = form.getComponent('checkbox');
          const radio = Harness.testElements(radioCheckBox, 'input[type="radio"]', 1)[0];
          Harness.clickElement(radioCheckBox, radio);
          setTimeout(() => {
            assert.equal(form.submission.data[inputName], 'ok');
            Harness.clickElement(radioCheckBox, radio);
            setTimeout(() => {
              assert.equal(form.submission.data[inputName], '');
              done();
            }, 200);
          }, 200);
        }, 200);
      })
      .catch((err) => done(err));
  });
});
