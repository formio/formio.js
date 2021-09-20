export default {
  title: 'Wizard',
  display: 'form',
  type: 'form',
  name: 'wizard',
  components: [
    {
      hideLabel: false,
      clearOnHide: false,
      conditional: {
        eq: '',
        when: null,
        show: ''
      },
      theme: 'default',
      key: 'page1',
      input: false,
      components: [
        {
          hideLabel: false,
          type: 'textfield',
          conditional: {
            eq: '',
            when: null,
            show: ''
          },
          validate: {
            customPrivate: false,
            custom: '',
            pattern: '',
            maxLength: '',
            minLength: '',
            required: false
          },
          persistent: true,
          unique: false,
          protected: false,
          defaultValue: '',
          multiple: true,
          suffix: '',
          prefix: '',
          placeholder: '',
          key: 'textfieldonpage1',
          label: 'Textfield on page 1',
          inputMask: '',
          inputType: 'text',
          tableView: true,
          input: true,
          hidden: false,
          clearOnHide: true,
          autofocus: false,
          spellcheck: true
        },
        {
          hideLabel: false,
          conditional: {
            eq: '',
            when: null,
            show: ''
          },
          type: 'number',
          validate: {
            custom: '',
            multiple: '',
            integer: '',
            step: 'any',
            max: '',
            min: '',
            required: true
          },
          persistent: true,
          protected: false,
          defaultValue: 0,
          suffix: '',
          prefix: '',
          placeholder: '',
          key: 'numberField',
          label: 'Number Field',
          inputType: 'number',
          tableView: true,
          input: true,
          hidden: false,
          clearOnHide: true,
          autofocus: false,
          labelPosition: 'top',
          tags: [],
          properties: {}
        }
      ],
      title: 'First',
      type: 'panel',
      tableView: false
    },
    {
      hideLabel: false,
      tableView: false,
      clearOnHide: false,
      theme: 'default',
      key: 'page2',
      input: false,
      components: [
        {
          hideLabel: false,
          clearOnHide: true,
          hidden: false,
          type: 'textfield',
          conditional: {
            eq: '',
            when: null,
            show: ''
          },
          validate: {
            customPrivate: false,
            custom: '',
            pattern: '',
            maxLength: '',
            minLength: '',
            required: true
          },
          persistent: true,
          unique: false,
          protected: false,
          defaultValue: '',
          multiple: false,
          suffix: '',
          prefix: '',
          placeholder: '',
          key: 'textfieldonPage2',
          label: 'Textfield on Page 2',
          inputMask: '',
          inputType: 'text',
          tableView: true,
          input: true,
          autofocus: false,
          spellcheck: true,
          labelPosition: 'top',
          inputFormat: 'plain',
          tags: [],
          properties: {}
        },
        {
          input: true,
          tableView: true,
          label: 'Customer',
          key: 'page2Customer',
          placeholder: 'Select a customer',
          data: {
            values: [
              {
                value: '',
                label: ''
              }
            ],
            json: '',
            url: 'https://examples.form.io/customer/submission',
            resource: '',
            custom: '',
            headers: [
              {
                value: '',
                key: ''
              }
            ]
          },
          dataSrc: 'url',
          valueProperty: 'data.email',
          defaultValue: '',
          refreshOn: '',
          filter: '',
          authenticate: false,
          template: '<span>{{ item.data.firstName }} {{ item.data.lastName }}</span>',
          multiple: false,
          protected: false,
          unique: false,
          persistent: true,
          hidden: false,
          clearOnHide: true,
          validate: {
            required: false
          },
          type: 'select',
          lazyLoad: true,
          widget: 'html5',
          hideLabel: false,
          labelPosition: 'top',
          tags: [],
          conditional: {
            show: '',
            when: null,
            eq: ''
          },
          properties: {},
          searchField: 'data.email',
          autofocus: false
        },
        {
          hideLabel: false,
          clearOnHide: false,
          conditional: {
            eq: '',
            when: null,
            show: ''
          },
          type: 'fieldset',
          components: [
            {
              hideLabel: false,
              clearOnHide: true,
              hidden: false,
              type: 'textfield',
              conditional: {
                eq: '',
                when: null,
                show: ''
              },
              validate: {
                customPrivate: false,
                custom: '',
                pattern: '',
                maxLength: '',
                minLength: '',
                required: false
              },
              persistent: true,
              unique: false,
              protected: false,
              defaultValue: '',
              multiple: false,
              suffix: '',
              prefix: '',
              placeholder: '',
              key: 'textfield',
              label: 'Textfield',
              inputMask: '',
              inputType: 'text',
              tableView: true,
              input: true,
              autofocus: false,
              spellcheck: true
            }
          ],
          legend: 'FieldSet Label',
          tableView: true,
          input: false
        }
      ],
      title: 'Page 2',
      type: 'panel'
    },
    {
      properties: {
        '': ''
      },
      conditional: {
        eq: '',
        when: null,
        show: ''
      },
      tags: [],
      hideLabel: false,
      breadcrumb: 'default',
      type: 'panel',
      components: [
        {
          autofocus: false,
          input: true,
          tableView: true,
          inputType: 'text',
          inputMask: '',
          label: 'Text',
          key: 'panelText',
          placeholder: '',
          prefix: '',
          suffix: '',
          multiple: false,
          defaultValue: '',
          protected: false,
          unique: false,
          persistent: true,
          hidden: false,
          clearOnHide: true,
          spellcheck: true,
          validate: {
            required: true,
            minLength: '',
            maxLength: '',
            pattern: '',
            custom: '',
            customPrivate: false
          },
          conditional: {
            show: '',
            when: null,
            eq: ''
          },
          type: 'textfield',
          labelPosition: 'top',
          inputFormat: 'plain',
          tags: [],
          properties: {}
        },
        {
          properties: {
            '': ''
          },
          conditional: {
            eq: '',
            when: null,
            show: ''
          },
          tags: [],
          hideLabel: false,
          type: 'datagrid',
          clearOnHide: true,
          hidden: false,
          persistent: true,
          protected: false,
          key: 'panelDataGrid',
          label: 'Data Grid',
          tableView: true,
          components: [
            {
              properties: {
                '': ''
              },
              tags: [],
              labelPosition: 'top',
              hideLabel: true,
              type: 'textfield',
              conditional: {
                eq: '',
                when: null,
                show: ''
              },
              validate: {
                customPrivate: false,
                custom: '',
                pattern: '',
                maxLength: '',
                minLength: '',
                required: false
              },
              clearOnHide: true,
              hidden: false,
              persistent: true,
              unique: false,
              protected: false,
              defaultValue: '',
              multiple: false,
              suffix: '',
              prefix: '',
              placeholder: '',
              key: 'panelDataGridA',
              label: 'A',
              inputMask: '',
              inputType: 'text',
              tableView: true,
              input: true,
              autofocus: false,
              spellcheck: true,
              inDataGrid: true
            },
            {
              properties: {
                '': ''
              },
              tags: [],
              labelPosition: 'top',
              hideLabel: true,
              type: 'textfield',
              conditional: {
                eq: '',
                when: null,
                show: ''
              },
              validate: {
                customPrivate: false,
                custom: '',
                pattern: '',
                maxLength: '',
                minLength: '',
                required: false
              },
              clearOnHide: true,
              hidden: false,
              persistent: true,
              unique: false,
              protected: false,
              defaultValue: '',
              multiple: false,
              suffix: '',
              prefix: '',
              placeholder: '',
              key: 'panelDataGridB',
              label: 'B',
              inputMask: '',
              inputType: 'text',
              tableView: true,
              input: true,
              autofocus: false,
              spellcheck: true,
              inDataGrid: true
            },
            {
              properties: {
                '': ''
              },
              tags: [],
              labelPosition: 'top',
              hideLabel: true,
              type: 'textfield',
              conditional: {
                eq: '',
                when: null,
                show: ''
              },
              validate: {
                customPrivate: false,
                custom: '',
                pattern: '',
                maxLength: '',
                minLength: '',
                required: false
              },
              clearOnHide: true,
              hidden: false,
              persistent: true,
              unique: false,
              protected: false,
              defaultValue: '',
              multiple: false,
              suffix: '',
              prefix: '',
              placeholder: '',
              key: 'panelDataGridC',
              label: 'C',
              inputMask: '',
              inputType: 'text',
              tableView: true,
              input: true,
              autofocus: false,
              spellcheck: true,
              inDataGrid: true
            },
            {
              properties: {
                '': ''
              },
              tags: [],
              labelPosition: 'top',
              hideLabel: true,
              type: 'textfield',
              conditional: {
                eq: '',
                when: null,
                show: ''
              },
              validate: {
                customPrivate: false,
                custom: '',
                pattern: '',
                maxLength: '',
                minLength: '',
                required: false
              },
              clearOnHide: true,
              hidden: false,
              persistent: true,
              unique: false,
              protected: false,
              defaultValue: '',
              multiple: false,
              suffix: '',
              prefix: '',
              placeholder: '',
              key: 'panelDataGridD',
              label: 'D',
              inputMask: '',
              inputType: 'text',
              tableView: true,
              input: true,
              autofocus: false,
              spellcheck: true,
              inDataGrid: true
            }
          ],
          tree: true,
          input: true,
          autofocus: false
        },
        {
          autofocus: false,
          input: true,
          tableView: true,
          label: 'HTML5 Select',
          key: 'panelHtml5Select',
          placeholder: '',
          data: {
            values: [
              {
                value: 'orange',
                label: 'Orange'
              },
              {
                value: 'apple',
                label: 'Apple'
              },
              {
                value: 'banana',
                label: 'Banana'
              },
              {
                value: 'strawberry',
                label: 'Strawberry'
              },
              {
                value: 'kiwi',
                label: 'Kiwi'
              }
            ],
            json: '',
            url: '',
            resource: '',
            custom: ''
          },
          widget: 'html5',
          dataSrc: 'values',
          valueProperty: '',
          defaultValue: '',
          refreshOn: '',
          filter: '',
          authenticate: false,
          template: '<span>{{ item.label }}</span>',
          multiple: false,
          protected: false,
          unique: false,
          persistent: true,
          hidden: false,
          clearOnHide: true,
          validate: {
            required: false
          },
          type: 'select',
          labelPosition: 'top',
          tags: [],
          conditional: {
            show: '',
            when: null,
            eq: ''
          },
          properties: {}
        }
      ],
      tableView: false,
      theme: 'default',
      title: 'Page 3',
      input: false,
      key: 'panel',
      clearOnHide: false
    },
    {
      hideLabel: false,
      clearOnHide: false,
      conditional: {
        eq: '',
        when: null,
        show: ''
      },
      theme: 'default',
      key: 'page3',
      input: false,
      components: [
        {
          hideLabel: false,
          type: 'textfield',
          conditional: {
            eq: '',
            when: null,
            show: ''
          },
          validate: {
            customPrivate: false,
            custom: '',
            pattern: '',
            maxLength: '',
            minLength: '',
            required: false
          },
          persistent: true,
          unique: false,
          protected: false,
          defaultValue: '',
          multiple: false,
          suffix: '',
          prefix: '',
          placeholder: '',
          key: 'textfieldonPage3',
          label: 'Textfield on Page 3',
          inputMask: '',
          inputType: 'text',
          tableView: true,
          input: true,
          hidden: false,
          clearOnHide: true,
          autofocus: false,
          spellcheck: true
        },
        {
          autofocus: false,
          input: true,
          inputType: 'checkbox',
          tableView: true,
          label: 'I agree to the follow the rules',
          dataGridLabel: false,
          key: 'page3Iagreetothefollowtherules',
          defaultValue: false,
          protected: false,
          persistent: true,
          hidden: false,
          name: '',
          value: '',
          clearOnHide: true,
          validate: {
            required: false
          },
          type: 'checkbox',
          labelPosition: 'right',
          hideLabel: false,
          tags: [],
          conditional: {
            show: '',
            when: null,
            eq: ''
          },
          properties: {}
        },
        {
          input: true,
          tableView: true,
          label: 'Signature',
          key: 'signature',
          placeholder: '',
          footer: 'Sign above',
          width: '100%',
          height: '150px',
          penColor: 'black',
          backgroundColor: 'rgb(245,245,235)',
          minWidth: '0.5',
          maxWidth: '2.5',
          protected: false,
          persistent: true,
          hidden: false,
          clearOnHide: true,
          validate: {
            required: false
          },
          type: 'signature',
          hideLabel: true,
          tags: [],
          conditional: {
            show: '',
            when: null,
            eq: ''
          },
          properties: {
            '': ''
          },
          lockKey: true
        }
      ],
      title: 'Last',
      type: 'panel',
      tableView: false
    },
    {
      hideLabel: false,
      type: 'button',
      theme: 'primary',
      disableOnInvalid: true,
      action: 'submit',
      block: false,
      rightIcon: '',
      leftIcon: '',
      size: 'md',
      key: 'submit',
      tableView: false,
      label: 'Submit',
      input: true
    }
  ],
};
