import BaseEditForm from './base/Base.form';
export default function(...extend) {
  return BaseEditForm([
    {
      key: 'data',
      ignore: true
    },
    {
      key: 'validation',
      ignore: true
    }
  ], ...extend);
};
