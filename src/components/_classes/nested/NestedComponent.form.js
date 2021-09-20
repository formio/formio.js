import Components from '../../Components';

export default function(...extend) {
  return Components.baseEditForm([
    {
      key: 'data',
      ignore: true
    },
    {
      key: 'validation',
      ignore: true
    }
  ], ...extend);
}
