import _ from 'lodash';
import Formio from '../../../Formio';

export default [
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
        { label: 'None', value: '' },
        { label: 'Quill', value: 'quill' },
        { label: 'CKEditor', value: 'ckeditor' },
        { label: 'ACE', value: 'ace' }
      ]
    },
    weight: 415
  },
  {
    type: 'checkbox',
    input: true,
    key: 'isUploadEnabled',
    label: 'Enable Image Upload',
    weight: 415.1,
    conditional: {
      json: {
        or: [
          {
            '===': [
              { var: 'data.editor' },
              'quill'
            ]
          },
          {
            '==': [
              { var: 'data.editor' },
              ''
            ]
          }
        ]
      }
    }
  },
  {
    type: 'select',
    input: true,
    key: 'uploadStorage',
    label: 'Image Upload Storage',
    placeholder: 'Select your file storage provider',
    weight: 415.2,
    tooltip: 'Which storage to save the files in.',
    valueProperty: 'value',
    dataSrc: 'custom',
    data: {
      custom() {
        return _.map(Formio.providers.storage, (storage, key) => ({
          label: storage.title,
          value: key
        }));
      }
    },
    conditional: {
      json: {
        '===': [
          { var: 'data.isUploadEnabled' },
          true
        ]
      }
    }
  },
  {
    type: 'textfield',
    input: true,
    key: 'uploadUrl',
    label: 'Image Upload Url',
    weight: 415.3,
    placeholder: 'Enter the url to post the files to.',
    tooltip: 'See <a href=\'https://github.com/danialfarid/ng-file-upload#server-side\' target=\'_blank\'>https://github.com/danialfarid/ng-file-upload#server-side</a> for how to set up the server.',
    conditional: {
      json: { '===': [{ var: 'data.uploadStorage' }, 'url'] }
    }
  },
  {
    type: 'textarea',
    key: 'uploadOptions',
    label: 'Image Upload Custom request options',
    tooltip: 'Pass your custom xhr options(optional)',
    rows: 5,
    editor: 'ace',
    input: true,
    weight: 415.4,
    placeholder: `{
      "withCredentials": true
    }`,
    conditional: {
      json: {
        '===': [{
          var: 'data.uploadStorage'
        }, 'url']
      }
    }
  },
  {
    type: 'textfield',
    input: true,
    key: 'uploadDir',
    label: 'Image Upload Directory',
    placeholder: '(optional) Enter a directory for the files',
    tooltip: 'This will place all the files uploaded in this field in the directory',
    weight: 415.5,
    conditional: {
      json: {
        '===': [
          { var: 'data.isUploadEnabled' },
          true
        ]
      }
    }
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
        { label: 'String', value: 'string' },
        { label: 'JSON', value: 'json' },
        { label: 'HTML', value: 'html' }
      ]
    },
    conditional: {
      json: {
        or: [
          { '===': [
            { var: 'data.editor' },
            'quill'
          ] },
          { '===': [
            { var: 'data.editor' },
            'ace'
          ] }
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
    customDefaultValue(value, component, row, data, instance) {
      return instance.wysiwygDefault;
    },
    conditional: {
      json: {
        or: [
          { '===': [
            { var: 'data.editor' },
            'quill'
          ] },
          { '===': [
            { var: 'data.editor' },
            'ace'
          ] }
        ]
      }
    },
    weight: 417
  }
];
