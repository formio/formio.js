import baseEditForm from './base/Base.form';
export default function(...extend) {
  return baseEditForm(...extend, [
    {
      key: 'data',
      ignore: true
    },
    {
      key: 'validation',
      ignore: true
    }
  ]);
}
