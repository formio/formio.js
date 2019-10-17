import Component from '../_classes/component/Component';

export default class DataSourceComponent extends Component {
  static schema(...extend) {
    return Component.schema({
      label: 'Data Source',
      key: 'dataSource',
      type: 'datasource',
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Data Source',
      icon: 'cloud',
      group: 'data',
      documentation: 'http://help.form.io/userguide/#datasource',
      weight: 30,
      schema: DataSourceComponent.schema()
    };
  }

  constructor(component, options, data) {
    super(component, options, data);
  }

  init() {
    super.init();
  }

  render() {
    return super.render();
  }

  attach(element) {
    return super.attach(element);
  }
}
