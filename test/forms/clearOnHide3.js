import Harness from '../harness';
import assert from 'power-assert';

const visibleData = {
  data: {
    visible: 'yes',
    clearOnHideField: 'some text',
    submit: false
  }
};

const hiddenData = {
  data: {
    visible: 'no',
    submit: false
  }
};

export default {
  form : {
    type: 'form',
    components: [
      {
        label: 'Visible',
        optionsLabelPosition: 'right',
        inline: false,
        tableView: false,
        defaultValue: 'yes',
        values: [
          {
            label: 'yes',
            value: 'yes',
            shortcut: ''
          },
          {
            label: 'no',
            value: 'no',
            shortcut: ''
          }
        ],
        calculateServer: false,
        key: 'visible',
        type: 'radio',
        input: true
      },
      {
        label: 'ClearOnHide Field',
        spellcheck: true,
        tableView: true,
        calculateServer: false,
        key: 'clearOnHideField',
        conditional: {
          show: true,
          when: 'visible',
          eq: 'yes'
        },
        type: 'textfield',
        input: true
      },
      {
        type: 'button',
        label: 'Submit',
        key: 'submit',
        disableOnInvalid: true,
        input: true,
        tableView: false
      }
    ],
    title: 'submissionClearOnHide',
    display: 'form',
    name: 'submissionClearOnHide',
    path: 'submissionclearonhide',
  },
  tests: {
    'Test when initially visible'(form, done) {
      Harness.setInputValue(form, 'data[clearOnHideField]', 'some text');
      setTimeout(() => {
        assert.deepEqual(form.data, visibleData.data);

        const visibleRadio = form.getComponent('visible');
        setTimeout(() => {
          Harness.setInputValue(form, `data[visible][${visibleRadio.id}]`, 'no');
          assert.deepEqual(form.data, hiddenData.data);
          done();
        }, 250);
      }, 250);
    }
  }
};
