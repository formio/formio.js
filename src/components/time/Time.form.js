import baseEditForm from '../base/Base.form';
export default function(...extend) {
  return baseEditForm(...extend, [
    {
      label: 'Display',
      key: 'display',
      weight: 0,
      components: [
        {
          type: 'textfield',
          input: true,
          key: 'format',
          label: 'Format',
          placeholder: 'Format',
          tooltip: 'The moment.js format for saving the value of this field.',
          weight: 50
        }
      ]
    }
  ]);
}
