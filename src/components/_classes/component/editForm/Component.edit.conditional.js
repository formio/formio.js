import EditFormUtils from './utils';
import { getContextComponents } from '../../../../utils/utils';
/* eslint-disable quotes, max-len */
export default [
  {
    type: 'panel',
    title: 'Simple',
    key: 'simple-conditional',
    theme: 'default',
    components: [
      {
        type: 'select',
        input: true,
        label: 'This component should Display:',
        key: 'conditional.show',
        dataSrc: 'values',
        data: {
          values: [
            { label: 'True', value: 'true' },
            { label: 'False', value: 'false' }
          ]
        }
      },
      {
        type: 'select',
        input: true,
        label: 'When the form component:',
        key: 'conditional.when',
        dataSrc: 'custom',
        valueProperty: 'value',
        data: {
          custom(context) {
            return getContextComponents(context);
          }
        }
      },
      {
        type: 'textfield',
        input: true,
        label: 'Has the value:',
        key: 'conditional.eq'
      }
    ]
  },
  EditFormUtils.javaScriptValue('Advanced Conditions', 'customConditional', 'conditional.json', 110,
    '<p>You must assign the <strong>show</strong> variable a boolean result.</p>' +
    '<p><strong>Note: Advanced Conditional logic will override the results of the Simple Conditional logic.</strong></p>' +
    '<h5>Example</h5><pre>show = !!data.showMe;</pre>',
    '<p><a href="http://formio.github.io/formio.js/app/examples/conditions.html" target="_blank">Click here for an example</a></p>'
  )
];
/* eslint-enable quotes, max-len */
