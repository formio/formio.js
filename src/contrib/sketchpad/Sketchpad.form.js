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
          key: 'width',
          weight: 20
        },
        {
          type: 'textfield',
          label: 'Height',
          input: true,
          key: 'height',
          weight: 20
        },
        {
          type: 'textfield',
          label: 'Default Zoom',
          input: true,
          key: 'defaultZoom',
          placeholder: '100',
          weight: 20
        },
        {
          type: 'textfield',
          label: 'Default Stroke Color',
          description: 'Start with # sign',
          input: true,
          key: 'defaultStroke',
          placeholder: '#333',
          weight: 20
        },
        {
          type: 'textfield',
          label: 'Default Fill Color',
          description: 'Start with # sign',
          input: true,
          key: 'defaultFill',
          placeholder: '#ccc',
          weight: 20
        },
        {
          type: 'number',
          label: 'Default Line Width',
          input: true,
          key: 'defaultLineWidth',
          placeholder: '1',
          weight: 20
        },
        {
          type: 'number',
          label: 'Default Circle Size',
          input: true,
          key: 'defaultCircleSize',
          placeholder: '10',
          weight: 20
        },
      ]
    }
  ], ...extend);
}
