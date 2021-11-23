import Harness from '../../../test/harness';
import ResourceComponent from './Resource';
import assert from 'power-assert';
import Formio from './../../Formio';
import _ from 'lodash';

import {
  comp1,
  comp2
} from './fixtures';

describe('Resource Component', () => {
  it('Should build a resource component', (done) => {
    Harness.testCreate(ResourceComponent, comp1).then((component) => {
      Harness.testElements(component, 'select', 1);
      done();
    });
  });

  it('Should provide correct value', (done) => {
    const form = _.cloneDeep(comp2);
    const element = document.createElement('div');

    Formio.createForm(element, form).then(form => {
      const resource = form.getComponent('resource');
      const value = 'API key: textField';
      resource.setValue(value);

      setTimeout(() => {
        assert.equal(resource.getValue(), value);
        assert.equal(resource.dataValue, value);
        const submit = form.getComponent('submit');
        const clickEvent = new Event('click');
        const submitBtn = submit.refs.button;
        submitBtn.dispatchEvent(clickEvent);

        setTimeout(() => {
          assert.equal(resource.dataValue, value);

          done();
        }, 200);
      }, 200);
    }).catch(done);
  });
});
