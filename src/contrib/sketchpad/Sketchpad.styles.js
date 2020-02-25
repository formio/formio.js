export default function(attachFunctions) {
  return [
    {
      icon: 'square-o',
      title: 'Stroke Color',
      type: 'colorpicker',
      property: 'stroke',
      attach: attachFunctions.stroke
    },
    {
      icon: 'square',
      title: 'Fill Color',
      type: 'colorpicker',
      property: 'fill',
      attach: attachFunctions.fill
    },
    {
      icon: 'minus',
      title: 'Line Width',
      type: 'number',
      property: 'linewidth',
      attach: attachFunctions.lineWidth
    }
  ];
}
