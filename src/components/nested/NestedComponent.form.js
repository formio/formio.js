import baseEditForm from '../base/Base.form';

export default function(...extend) {
  return baseEditForm([
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
