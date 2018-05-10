import textEditForm from '../textfield/TextField.form';
export default function(...extend) {
  return textEditForm(...extend, [
    {
      label: 'Display',
      key: 'display',
      components: [
        {
          key: 'inputMask',
          ignore: true
        },
        {
          key: 'allowMultipleMasks',
          ignore: true
        },
        {
          type: 'number',
          input: true,
          key: 'rows',
          label: 'Rows',
          weight: 210,
          tooltip: 'This allows control over how many rows are visible in the text area.',
          placeholder: 'Enter the amount of rows'
        },
        {
          type: 'select',
          input: true,
          key: 'editor',
          label: 'Editor',
          tooltip: 'Select the type of WYSIWYG editor to use for this text area.',
          dataSrc: 'values',
          data: {
            values: [
              {label: 'None', value: ''},
              {label: 'Quill', value: 'quill'},
              {label: 'ACE', value: 'ace'}
            ]
          },
          weight: 415
        },
        {
          type: 'select',
          input: true,
          key: 'as',
          label: 'Save As',
          dataSrc: 'values',
          tooltip: 'This setting determines how the value should be entered and stored in the database.',
          clearOnHide: true,
          data: {
            values: [
              {label: 'String', value: 'string'},
              {label: 'JSON', value: 'json'},
              {label: 'HTML', value: 'html'}
            ]
          },
          conditional: {
            json: {
              or: [
                {'===': [
                  {var: 'data.editor'},
                  'quill'
                ]},
                {'===': [
                  {var: 'data.editor'},
                  'ace'
                ]}
              ]
            }
          },
          weight: 416
        },
        {
          type: 'textarea',
          input: true,
          editor: 'ace',
          rows: 10,
          as: 'json',
          label: 'Editor Settings',
          tooltip: 'Enter the WYSIWYG editor JSON configuration.',
          key: 'wysiwyg',
          customDefaultValue: (value, component, row, data, instance) => {
            return instance.wysiwygDefault();
          },
          conditional: {
            json: {
              or: [
                {'===': [
                  {var: 'data.editor'},
                  'quill'
                ]},
                {'===': [
                  {var: 'data.editor'},
                  'ace'
                ]}
              ]
            }
          },
          weight: 417
        }
      ]
    }
  ]);
}
