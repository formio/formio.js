import { getContextButtons } from '../../../utils';
export default [
  {
    key: 'recaptchaInfo',
    weight: -10,
    type: 'htmlelement',
    tag: 'div',
    className: 'alert alert-danger',
    content: 'This component has been deprecated and will be removed. Use the CAPTCHA component instead.',
  },
  {
    key: 'eventType',
    label: 'Type of event',
    tooltip: 'Specify type of event that this CAPTCHA would react to. If Button Click is selected, then the CAPTCHA widget will be displayed and verification will occur after clicking on the button.',
    type: 'radio',
    values: [
      {
        label: 'Form Load',
        value: 'formLoad'
      },
      {
        label: 'Button Click',
        value: 'buttonClick'
      }
    ],
    validate: {
      required: true
    },
    weight: 650
  },
  {
    type: 'select',
    input: true,
    label: 'Button Key',
    key: 'buttonKey',
    dataSrc: 'custom',
    valueProperty: 'value',
    tooltip: 'Specify key of button on this form that this CAPTCHA should react to',
    weight: 660,
    customConditional(context) {
      return context.data.eventType === 'buttonClick';
    },
    data: {
      custom(context) {
        return getContextButtons(context);
      }
    }
  },
  {
    key: 'label',
    ignore: true
  },
  {
    key: 'hideLabel',
    ignore: true
  },
  {
    key: 'labelPosition',
    ignore: true
  },
  {
    key: 'placeholder',
    ignore: true
  },
  {
    key: 'description',
    ignore: true
  },
  {
    key: 'tooltip',
    ignore: true
  },
  {
    key: 'errorLabel',
    ignore: true
  },
  {
    key: 'customClass',
    ignore: true
  },
  {
    key: 'tabindex',
    ignore: true
  },
  {
    key: 'multiple',
    ignore: true
  },
  {
    key: 'clearOnHide',
    ignore: true
  },
  {
    key: 'hidden',
    ignore: true
  },
  {
    key: 'mask',
    ignore: true
  },
  {
    key: 'dataGridLabel',
    ignore: true
  },
  {
    key: 'disabled',
    ignore: true
  },
  {
    key: 'autofocus',
    ignore: true
  },
  {
    key: 'tableView',
    ignore: true
  },
];
