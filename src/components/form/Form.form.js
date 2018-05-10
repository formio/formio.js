import nestedComponentForm from '../NestedComponent.form';
/* eslint-disable max-len */
export default function(...extend) {
  return nestedComponentForm([
    {
      label: 'Form',
      key: 'form',
      weight: 10,
      components: [
        {
          type: 'select',
          input: true,
          dataSrc: 'url',
          data: {
            url: '/form?limit=4294967295&select=_id,title'
          },
          template: '<span>{{ item.title }}</span>',
          valueProperty: '_id',
          label: 'Form',
          key: 'form',
          weight: 10,
          tooltip: 'The form to load within this form component.'
        },
        {
          type: 'checkbox',
          input: true,
          weight: 20,
          key: 'reference',
          label: 'Save as reference',
          tooltip: 'Using this option will save this field as a reference and link its value to the value of the origin record.'
        }
      ]
    }
  ], ...extend);
}
/* eslint-disable max-len */
