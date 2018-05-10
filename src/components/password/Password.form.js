import textEditForm from '../textfield/TextField.form';
export default function(...extend) {
  return textEditForm(...extend, [
    {
      key: 'display',
      components: [
        {
          key: 'inputMask',
          ignore: true
        },
        {
          key: 'allowMultipleMasks',
          ignore: true
        }
      ]
    }
  ]);
}
