import EditFormUtils from '../../_classes/component/editForm/utils';
/* eslint-disable max-len */
export default [
  EditFormUtils.javaScriptValue('Custom Default Value', 'customDefaultValue', 'customDefaultValue', 120,
    '<p><h4>Example:</h4><pre>value = data.firstName + " " + data.lastName;</pre></p>',
    '<p><h4>Example:</h4><pre>{"cat": [{"var": "data.firstName"}, " ", {"var": "data.lastName"}]}</pre>'
  ),
  EditFormUtils.javaScriptValue('Calculated Value', 'calculateValue', 'calculateValue', 130,
    '<p><h4>Example:</h4><pre>value = data.a + data.b + data.c;</pre></p>',
    '<p><h4>Example:</h4><pre>{"+": [{"var": "data.a"}, {"var": "data.b"}, {"var": "data.c"}]}</pre><p><a href="https://help.form.io/userguide/form-building/logic-and-conditions#calculated-values" target="_blank" rel="noopener noreferrer">Click here for an example</a></p>'
  ),
  {
    weight: 140,
    type: 'checkbox',
    label: 'Omit Value From Submission Data When Conditionally Hidden',
    key: 'clearOnHide',
    defaultValue: true,
    tooltip: 'When a field is hidden, clear the value.',
    input: true
  },
  {
    weight: 100,
    type: 'checkbox',
    label: 'Validate When Hidden',
    tooltip: 'Validates the component when it is hidden/conditionally hidden. Vaildation errors are displayed in the error alert on the form submission. Use caution when enabling this setting, as it can cause a hidden component to be invalid with no way for the form user to correct it.',
    key: 'validateWhenHidden',
    input: true
  },
];
/* eslint-enable max-len */
