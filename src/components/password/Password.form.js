import TextEditForm from '../textfield/TextField.form';
export default function (...extend) {
  return TextEditForm(...extend, [
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
};