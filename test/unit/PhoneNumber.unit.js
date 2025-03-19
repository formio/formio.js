import Harness from '../harness';
import PhoneNumberComponent from '../../src/components/phonenumber/PhoneNumber';
import assert from 'power-assert';
import { Formio } from '../../src/Formio';

import {
  comp1,
  comp2
} from './fixtures/phonenumber';

describe('PhoneNumber Component', () => {
  it('Should build a phone number component', () => {
    return Harness.testCreate(PhoneNumberComponent, comp1).then((component) => {
      Harness.testElements(component, 'input[type="text"]', 1);
    });
  });

  it('Should check mask and value in the phone component in the email template', (done) => {
    const formJson =  {
      components: [{
          label: 'Phone Number',
          tableView: true,
          allowMultipleMasks: true,
          inputMasks: [{
            label: 'mask1',
            mask: 'mask1'
          }],
          key: 'phoneNumber',
          type: 'phoneNumber',
          input: true
       }]
    };
    const element = document.createElement('div');
    Formio.createForm(element, formJson)
      .then(form => {
        form.setSubmission({
          data: {
            phoneNumber: {
                value: 'mask1',
                maskName: 'mask2'
            }
        },
        });

        const phoneNumber = form.getComponent('phoneNumber');

        setTimeout(() => {
          assert.equal(phoneNumber.dataValue.value, 'mask1', 'Should check value');
          assert.equal(phoneNumber.dataValue.maskName, 'mask2', 'Should check maskName');
          const toString = phoneNumber.getValueAsString(phoneNumber.dataValue, { email: true });
          assert.ok(toString.includes('table'), 'Email template should render html table');
          assert.ok(toString.includes(phoneNumber.dataValue.maskName), 'Email template should have Phone Number mackName');
          assert.ok(toString.includes(phoneNumber.dataValue.value), 'Email template should have Phone Number value');
          done();
        }, 300);
      })
      .catch(done);
  });

  it('Should remove previous input mask when switching to a blank input mask', (done) => {
    Formio.createForm(document.createElement('div'), comp2, {}).then((form) => {
      const phoneNumberComponent = form.getComponent('phoneNumber');
      const changeEvent = new Event('change');
      phoneNumberComponent.refs.select[0].value = "Other";
      phoneNumberComponent.refs.select[0].dispatchEvent(changeEvent);
      setTimeout(()=>{
        assert.equal(phoneNumberComponent.refs.input[0].querySelector('input').value, "");
        assert.equal(phoneNumberComponent.refs.input[0].querySelector('input').getAttribute('placeholder'), null);
        done();
      },200);
    });
  });
});
