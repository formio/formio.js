import Harness from '../../../test/harness';
import PhoneNumberComponent from './PhoneNumber';
import assert from 'power-assert';
import Formio from './../../Formio';

import {
  comp1,
} from './fixtures';

describe('PhoneNumber Component', () => {
  it('Should build a phone number component', () => {
    return Harness.testCreate(PhoneNumberComponent, comp1).then((component) => {
      Harness.testElements(component, 'input[type="text"]', 1);
    });
  });

  it('Should check mask and value in the phone component', (done) => {
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
                maskName: 'mask1'
            }
        },
        });

        const phoneNumber = form.getComponent('phoneNumber');

        setTimeout(() => {
          assert.equal(phoneNumber.data.phoneNumber.maskName, phoneNumber.dataValue.maskName, 'Should check the correct mask name');
          assert.equal(phoneNumber.data.phoneNumber.value, phoneNumber.dataValue.value, 'Should check the correct mask value');
          done();
        }, 300);
      })
      .catch(done);
  });
});
