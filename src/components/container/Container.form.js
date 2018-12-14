import baseEditForm from '../_classes/component/Component.form';
export default function(...extend) {
  return baseEditForm([{
    key: 'data',
    components: [{
      key: 'defaultValue',
      ignore: true
    }]
  }], ...extend);
}
