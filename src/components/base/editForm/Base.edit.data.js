import { EditFormUtils } from './utils';
export let BaseEditData = [
  {
    type: 'textfield',
    label: 'Default Value',
    key: 'defaultValue',
    placeholder: 'Default Value',
    tooltip: 'The will be the value for this field, before user interaction. Having a default value will override the placeholder text.',
    input: true
  },
  EditFormUtils.javaScriptValue('Custom Default Value', 'customDefaultValue'),
  EditFormUtils.javaScriptValue('Calculated Value', 'calculateValue')
];
