import baseEditForm from '../base/Base.form';
import Formio from '../../Formio';
import _ from 'lodash';
/* eslint-disable quotes, max-len */
export default function(...extend) {
  return baseEditForm(...extend, [
    {
      label: 'File',
      key: 'file',
      weight: 5,
      components: [
        {
          type: 'select',
          input: true,
          key: 'storage',
          label: 'Storage',
          placeholder: 'Select your file storage provider',
          weight: 0,
          tooltip: 'Which storage to save the files in.',
          valueProperty: 'value',
          dataSrc: 'custom',
          data: {
            custom: () => {
              return _.map(Formio.providers.storage, function(storage, key) {
                return {
                  label: storage.title,
                  value: key
                };
              });
            }
          }
        },
        {
          type: 'textfield',
          input: true,
          key: 'url',
          label: 'Url',
          weight: 10,
          placeholder: 'Enter the url to post the files to.',
          tooltip: `See <a href='https://github.com/danialfarid/ng-file-upload#server-side' target='_blank'>https://github.com/danialfarid/ng-file-upload#server-side</a> for how to set up the server.`,
          conditional: {
            json: {'===': [{var: 'data.storage'}, 'url']}
          }
        },
        {
          type: 'textfield',
          input: true,
          key: 'dir',
          label: 'Directory',
          placeholder: '(optional) Enter a directory for the files',
          tooltip: 'This will place all the files uploaded in this field in the directory',
          weight: 20
        },
        {
          type: 'checkbox',
          input: true,
          key: 'image',
          label: 'Display as image(s)',
          tooltip: 'Instead of a list of linked files, images will be rendered in the view.',
          weight: 30
        },
        {
          type: 'textfield',
          input: true,
          key: 'imageSize',
          label: 'Image Size',
          placeholder: '100',
          tooltip: 'The image size for previewing images.',
          weight: 40,
          conditional: {
            json: {'==': [{var: 'data.image'}, true]}
          }
        },
        {
          type: 'textfield',
          input: true,
          key: 'filePattern',
          label: 'File Pattern',
          placeholder: '.pdf,.jpg',
          tooltip: 'See <a href=\'https://github.com/danialfarid/ng-file-upload#full-reference\' target=\'_blank\'>https://github.com/danialfarid/ng-file-upload#full-reference</a> for how to specify file patterns.',
          weight: 50
        },
        {
          type: 'textfield',
          input: true,
          key: 'fileMinSize',
          label: 'File Minimum Size',
          placeholder: '1MB',
          tooltip: 'See <a href=\'https://github.com/danialfarid/ng-file-upload#full-reference\' target=\'_blank\'>https://github.com/danialfarid/ng-file-upload#full-reference</a> for how to specify file sizes.',
          weight: 60
        },
        {
          type: 'textfield',
          input: true,
          key: 'fileMaxSize',
          label: 'File Maximum Size',
          placeholder: '10MB',
          tooltip: 'See <a href=\'https://github.com/danialfarid/ng-file-upload#full-reference\' target=\'_blank\'>https://github.com/danialfarid/ng-file-upload#full-reference</a> for how to specify file sizes.',
          weight: 70
        }
      ]
    }
  ]);
}
/* eslint-enable quotes, max-len */
