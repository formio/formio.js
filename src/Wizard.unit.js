import Harness from '../test/harness';
import Wizard from './Wizard';
import assert from 'power-assert';
import { expect } from 'chai';

const wizard = {
  title: 'Wizard Form',
  components: [
    {
      title: 'Page 1',
      label: 'Page 1',
      type: 'panel',
      key: 'page1',
      components: [
        {
          label: 'a',
          labelPosition: 'top',
          placeholder: '',
          description: '',
          tooltip: '',
          prefix: '',
          suffix: '',
          widget: {
            type: 'input'
          },
          inputMask: '',
          allowMultipleMasks: false,
          customClass: '',
          tabindex: '',
          hidden: false,
          hideLabel: false,
          showWordCount: false,
          showCharCount: false,
          mask: false,
          autofocus: false,
          spellcheck: true,
          disabled: false,
          tableView: true,
          modalEdit: false,
          multiple: false,
          persistent: true,
          inputFormat: 'plain',
          'protected': false,
          dbIndex: false,
          'case': '',
          encrypted: false,
          redrawOn: '',
          clearOnHide: true,
          customDefaultValue: '',
          calculateValue: '',
          calculateServer: false,
          allowCalculateOverride: false,
          validateOn: 'change',
          validate: {
            required: false,
            pattern: '',
            customMessage: '',
            custom: '',
            customPrivate: false,
            json: '',
            minLength: 4,
            maxLength: '',
            strictDateValidation: false,
            multiple: false,
            unique: false
          },
          unique: false,
          errorLabel: '',
          key: 'a',
          tags: [],
          properties: {},
          conditional: {
            show: null,
            when: null,
            eq: '',
            json: ''
          },
          customConditional: '',
          logic: [],
          attributes: {},
          overlay: {
            style: '',
            page: '',
            left: '',
            top: '',
            width: '',
            height: ''
          },
          type: 'textfield',
          input: true,
          refreshOn: '',
          inputType: 'text',
          id: 'eap4fh',
          defaultValue: ''
        }
      ],
      input: false,
      placeholder: '',
      prefix: '',
      customClass: '',
      suffix: '',
      multiple: false,
      defaultValue: null,
      'protected': false,
      unique: false,
      persistent: false,
      hidden: false,
      clearOnHide: false,
      refreshOn: '',
      redrawOn: '',
      tableView: false,
      modalEdit: false,
      labelPosition: 'top',
      description: '',
      errorLabel: '',
      tooltip: '',
      hideLabel: false,
      tabindex: '',
      disabled: false,
      autofocus: false,
      dbIndex: false,
      customDefaultValue: '',
      calculateValue: '',
      widget: null,
      attributes: {},
      validateOn: 'change',
      validate: {
        required: false,
        custom: '',
        customPrivate: false,
        strictDateValidation: false,
        multiple: false,
        unique: false
      },
      conditional: {
        show: null,
        when: null,
        eq: ''
      },
      overlay: {
        style: '',
        left: '',
        top: '',
        width: '',
        height: ''
      },
      allowCalculateOverride: false,
      encrypted: false,
      showCharCount: false,
      showWordCount: false,
      properties: {},
      allowMultipleMasks: false,
      tree: false,
      theme: 'default',
      breadcrumb: 'default',
      id: 'etrhlbe'
    },
    {
      title: 'Page 2',
      label: 'Page 2',
      type: 'panel',
      key: 'page2',
      components: [
        {
          label: 'b',
          labelPosition: 'top',
          placeholder: '',
          description: '',
          tooltip: '',
          prefix: '',
          suffix: '',
          widget: {
            type: 'input'
          },
          inputMask: '',
          allowMultipleMasks: false,
          customClass: '',
          tabindex: '',
          hidden: false,
          hideLabel: false,
          showWordCount: false,
          showCharCount: false,
          mask: false,
          autofocus: false,
          spellcheck: true,
          disabled: false,
          tableView: true,
          modalEdit: false,
          multiple: false,
          persistent: true,
          inputFormat: 'plain',
          'protected': false,
          dbIndex: false,
          'case': '',
          encrypted: false,
          redrawOn: '',
          clearOnHide: true,
          customDefaultValue: '',
          calculateValue: '',
          calculateServer: false,
          allowCalculateOverride: false,
          validateOn: 'change',
          validate: {
            required: false,
            pattern: '',
            customMessage: '',
            custom: '',
            customPrivate: false,
            json: '',
            minLength: '',
            maxLength: 4,
            strictDateValidation: false,
            multiple: false,
            unique: false
          },
          unique: false,
          errorLabel: '',
          key: 'textField',
          tags: [],
          properties: {},
          conditional: {
            show: null,
            when: null,
            eq: '',
            json: ''
          },
          customConditional: '',
          logic: [],
          attributes: {},
          overlay: {
            style: '',
            page: '',
            left: '',
            top: '',
            width: '',
            height: ''
          },
          type: 'textfield',
          input: true,
          refreshOn: '',
          inputType: 'text',
          id: 'eo1khi9',
          defaultValue: ''
        }
      ],
      input: false,
      placeholder: '',
      prefix: '',
      customClass: '',
      suffix: '',
      multiple: false,
      defaultValue: null,
      'protected': false,
      unique: false,
      persistent: false,
      hidden: false,
      clearOnHide: false,
      refreshOn: '',
      redrawOn: '',
      tableView: false,
      modalEdit: false,
      labelPosition: 'top',
      description: '',
      errorLabel: '',
      tooltip: '',
      hideLabel: false,
      tabindex: '',
      disabled: false,
      autofocus: false,
      dbIndex: false,
      customDefaultValue: '',
      calculateValue: '',
      widget: null,
      attributes: {},
      validateOn: 'change',
      validate: {
        required: false,
        custom: '',
        customPrivate: false,
        strictDateValidation: false,
        multiple: false,
        unique: false
      },
      conditional: {
        show: null,
        when: null,
        eq: ''
      },
      overlay: {
        style: '',
        left: '',
        top: '',
        width: '',
        height: ''
      },
      allowCalculateOverride: false,
      encrypted: false,
      showCharCount: false,
      showWordCount: false,
      properties: {},
      allowMultipleMasks: false,
      tree: false,
      theme: 'default',
      breadcrumb: 'default',
      id: 'eij9ua'
    },
    {
      title: 'Page 3',
      label: 'Page 3',
      type: 'panel',
      key: 'page3',
      components: [
        {
          label: 'c',
          labelPosition: 'top',
          placeholder: '',
          description: '',
          tooltip: '',
          prefix: '',
          suffix: '',
          widget: {
            type: 'input'
          },
          inputMask: '',
          allowMultipleMasks: false,
          customClass: '',
          tabindex: '',
          hidden: false,
          hideLabel: false,
          showWordCount: false,
          showCharCount: false,
          mask: false,
          autofocus: false,
          spellcheck: true,
          disabled: false,
          tableView: true,
          modalEdit: false,
          multiple: false,
          persistent: true,
          inputFormat: 'plain',
          'protected': false,
          dbIndex: false,
          'case': '',
          encrypted: false,
          redrawOn: '',
          clearOnHide: true,
          customDefaultValue: '',
          calculateValue: '',
          calculateServer: false,
          allowCalculateOverride: false,
          validateOn: 'change',
          validate: {
            required: false,
            pattern: '',
            customMessage: '',
            custom: '',
            customPrivate: false,
            json: '',
            minLength: '',
            maxLength: '',
            strictDateValidation: false,
            multiple: false,
            unique: false
          },
          unique: false,
          errorLabel: '',
          key: 'c',
          tags: [],
          properties: {},
          conditional: {
            show: null,
            when: null,
            eq: '',
            json: ''
          },
          customConditional: '',
          logic: [],
          attributes: {},
          overlay: {
            style: '',
            page: '',
            left: '',
            top: '',
            width: '',
            height: ''
          },
          type: 'textfield',
          input: true,
          refreshOn: '',
          inputType: 'text',
          id: 'euovhcc',
          defaultValue: ''
        }
      ],
      input: false,
      placeholder: '',
      prefix: '',
      customClass: '',
      suffix: '',
      multiple: false,
      defaultValue: null,
      'protected': false,
      unique: false,
      persistent: false,
      hidden: false,
      clearOnHide: false,
      refreshOn: '',
      redrawOn: '',
      tableView: false,
      modalEdit: false,
      labelPosition: 'top',
      description: '',
      errorLabel: '',
      tooltip: '',
      hideLabel: false,
      tabindex: '',
      disabled: false,
      autofocus: false,
      dbIndex: false,
      customDefaultValue: '',
      calculateValue: '',
      widget: null,
      attributes: {},
      validateOn: 'change',
      validate: {
        required: false,
        custom: '',
        customPrivate: false,
        strictDateValidation: false,
        multiple: false,
        unique: false
      },
      conditional: {
        show: null,
        when: null,
        eq: ''
      },
      overlay: {
        style: '',
        left: '',
        top: '',
        width: '',
        height: ''
      },
      allowCalculateOverride: false,
      encrypted: false,
      showCharCount: false,
      showWordCount: false,
      properties: {},
      allowMultipleMasks: false,
      tree: false,
      theme: 'default',
      breadcrumb: 'default',
      id: 'ebug75q'
    }
  ],
};

describe('Wizard tests', () => {
  let wizardForm = null;
  it('Should set components errors if they are after page was changed with navigation', (done) => {
      const formElement = document.createElement('div');
      wizardForm = new Wizard(formElement);
      wizardForm.setForm(wizard).then(() => {
        Harness.testErrors(wizardForm, {
          data: {
            a: '1',
            c: '',
            textField: ''
          }
        },
        [{
          component: 'a',
          message: 'a must be longer than 3 characters.'
        }], done);
        Harness.clickElement(wizardForm, wizardForm.refs[`${wizardForm.wizardKey}-link`][2]);
        assert.equal(wizardForm.page, 2);
        Harness.clickElement(wizardForm, wizardForm.refs[`${wizardForm.wizardKey}-link`][0]);
        assert.equal(wizardForm.page, 0);
        const aInput = wizardForm.currentPage.getComponent('a');
        assert.equal(aInput.errors.length, 1);
        assert.equal(aInput.errors[0].message, 'a must be longer than 3 characters.');
        done();
    })
    .catch((err) => done(err));
  });

  it('Should not set components errors if in readOnly mode', (done) => {
    const formElement = document.createElement('div');
    wizardForm = new Wizard(formElement, { readOnly: true });
    wizardForm.setForm(wizard).then(() => {
      Harness.testSubmission(wizardForm, {
        data: {
          a: '1',
          textField: 'aaa',
          c: '0'
        }
      });

      Harness.clickElement(wizardForm, wizardForm.refs[`${wizardForm.wizardKey}-link`][2]);
      assert.equal(wizardForm.page, 2);
      Harness.clickElement(wizardForm, wizardForm.refs[`${wizardForm.wizardKey}-link`][0]);
      assert.equal(wizardForm.page, 0);
      const aInput = wizardForm.currentPage.getComponent('a');
      assert.equal(aInput.errors.length, 0);
      done();
    });
  });
});
