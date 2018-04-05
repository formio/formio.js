import BaseEditForm from './base/Base.form';
export default function(...extend) {
  return BaseEditForm([
    {
      type: 'tabs',
      key: 'tabs',
      components: [
        {
          key: 'data',
          ignore: true
        },
        {
          key: 'validation',
          ignore: true
        }
      ]
    }
  ], ...extend);
};
