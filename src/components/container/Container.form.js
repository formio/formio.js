import baseEditForm from '../base/Base.form';
export default function(...extend) {
  return baseEditForm([{
    key: 'data',
    components: [{
      key: 'defaultValue',
      ignore: true
    }]
  }], ...extend);
}
