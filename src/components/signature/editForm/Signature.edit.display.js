export default [
  {
    type: 'textfield',
    input: true,
    key: 'footer',
    label: 'Footer Label',
    tooltip: 'The footer text that appears below the signature area.',
    placeholder: 'Footer Label',
    weight: 10
  },
  {
    type: 'textfield',
    input: true,
    key: 'width',
    label: 'Width',
    tooltip: 'The width of the signature area.',
    placeholder: 'Width',
    weight: 50
  },
  {
    type: 'textfield',
    input: true,
    key: 'height',
    label: 'Height',
    tooltip: 'The height of the signature area.',
    placeholder: 'Height',
    weight: 51
  },
  {
    type: 'textfield',
    input: true,
    key: 'backgroundColor',
    label: 'Background Color',
    tooltip: 'The background color of the signature area.',
    placeholder: 'Background Color',
    weight: 52
  },
  {
    type: 'textfield',
    input: true,
    key: 'penColor',
    label: 'Pen Color',
    tooltip: 'The ink color for the signature area.',
    placeholder: 'Pen Color',
    weight: 53
  },
  {
    key: 'placeholder',
    ignore: true,
  },
  {
    key: 'autofocus',
    ignore: true,
  },
];
