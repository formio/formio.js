import baseEditForm from '../component/Component.form';

export default (...extend) => {
  return baseEditForm([
    {
      key: 'data',
      ignore: true,
    },
  ], ...extend);
};
