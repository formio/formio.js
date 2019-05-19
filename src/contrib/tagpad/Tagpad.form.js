import baseEditForm from '../../components/base/Base.form';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: [
        {
          type: 'textfield',
          label: 'Image Url',
          input: true,
          key: 'imageUrl',
          weight: 20,
        },
        {
          type: 'textfield',
          label: 'Width',
          input: true,
          key: 'canvasWidth',
          weight: 20
        },
        {
          type: 'textfield',
          label: 'Height',
          input: true,
          key: 'canvasHeight',
          weight: 20
        },
        {
          type: 'textfield',
          label: 'Dot Size',
          input: true,
          key: 'dotSize',
          placeholder: '10',
          weight: 20
        },
        {
          type: 'textfield',
          label: 'Dot Stroke Size',
          input: true,
          key: 'dotStrokeSize',
          placeholder: '2',
          weight: 20
        },
        {
          type: 'textfield',
          label: 'Dot Stroke Color',
          input: true,
          key: 'dotStrokeColor',
          placeholder: '#333',
          weight: 20
        },
        {
          type: 'textfield',
          label: 'Dot Fill Color',
          input: true,
          key: 'dotFillColor',
          placeholder: '#ccc',
          weight: 20
        },
      ]
    }
  ], ...extend);
}
