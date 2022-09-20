import EditFormUtils from './utils';

/* eslint-disable quotes, max-len */
export default [
  {
    type: 'panel',
    title: 'Simple',
    key: 'simple-conditional',
    theme: 'default',
    components: EditFormUtils.simpleConditionalComponents(),
  },
  EditFormUtils.javaScriptValue(
    'Advanced Conditions',
    'customConditional',
    'conditional.json',
    110,
    '<p>You must assign the <strong>show</strong> variable a boolean result.</p>' +
      '<p><strong>Note: Advanced Conditional logic will override the results of the Simple Conditional logic.</strong></p>' +
      '<h5>Example</h5><pre>show = !!data.showMe;</pre>',
    '<p><a href="http://formio.github.io/formio.js/app/examples/conditions.html" target="_blank">Click here for an example</a></p>'
  ),
];
/* eslint-enable quotes, max-len */
