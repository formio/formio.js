import {BaseEditValidation} from "../base/editForm/Base.edit.validation";
import {BaseEditConditional} from "../base/editForm/Base.edit.conditional";
import {BaseEditDisplay} from "../base/editForm/Base.edit.display";
import {BaseEditData} from "../base/editForm/Base.edit.data";
import {BaseEditAPI} from "../base/editForm/Base.edit.api";

const BaseEditForm = require('../base/Base.form');
module.exports = function(...extend) {
  return BaseEditForm({
    components: [
      {
        weight: 0,
        type: 'tabs',
        key: 'tabs',
        components: [
          {
            label: 'Display',
            key: 'display',
            components: [
              {
                type: 'textfield',
                label: 'Add Another Text',
                key: 'addAnother',
                tooltip: 'Set the text of the Add Another button.',
                placeholder: 'Add Another',
                weight: 410,
                input: true
              },
              {
                type: 'select',
                label: 'Add Another Position',
                key: 'addAnotherPosition',
                dataSrc: 'values',
                tooltip: 'Position for Add Another button with respect to Data Grid Array.',
                defaultValue: 'bottom',
                input: true,
                data: {
                  values: [
                    {label: 'Top', value: 'top'},
                    {label: 'Bottom', value: 'bottom'},
                    {label: 'Both', value: 'both'}
                  ]
                },
                weight: 420
              }
            ]
          },
          {
            label: 'Data',
            key: 'data',
            components: []
          },
          {
            label: 'Validation',
            key: 'validation',
            components: []
          },
          {
            label: 'API',
            key: 'api',
            components: []
          },
          {
            label: 'Conditional',
            key: 'conditional',
            components: []
          }
        ]
      }
    ]
  }, ...extend);
};
