import _ from 'lodash';
import NestedComponent from '../_classes/nested/NestedComponent';

export default class ColumnsComponent extends NestedComponent {
  static schema(...extend) {
    return NestedComponent.schema({
      label: 'Columns',
      key: 'columns',
      type: 'columns',
      columns: [
        {components: [], width: 6, offset: 0, push: 0, pull: 0},
        {components: [], width: 6, offset: 0, push: 0, pull: 0}
      ],
      clearOnHide: false,
      input: false,
      tableView: false,
      persistent: false
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Columns',
      icon: 'fa fa-columns',
      group: 'layout',
      documentation: 'http://help.form.io/userguide/#columns',
      weight: 10,
      schema: ColumnsComponent.schema()
    };
  }

  get defaultSchema() {
    return ColumnsComponent.schema();
  }

  get schema() {
    const schema = _.omit(super.schema, 'components');
    schema.columns = [];
    this.eachComponent((component, index) => {
      _.merge(component.component, _.omit(this.component.columns[index], 'components'));
      schema.columns.push(component.schema);
    });
    for (let i = this.components.length; i < this.component.columns.length; i++) {
      schema.columns.push(this.component.columns[i]);
    }
    return schema;
  }

  get className() {
    return `row ${super.className}`;
  }

  get columnId() {
    return `column-${this.id}`;
  }

  init() {
    this.columns = [];
    _.each(this.component.columns, (column, index) => {
      this.columns[index] = [];
      _.each(column.components, (component) => {
        this.columns[index].push(this.createComponent(component));
      });
    });
  }

  render() {
    return super.render(this.renderTemplate('columns', {
      id: this.id,
      columnComponents: this.columns.map(column => this.renderComponents(column))
    }));
  }

  hydrate(element) {
    this.loadRefs(element, {[this.columnId]: 'multiple'});
    this.refs[this.columnId].forEach((column, index) => this.hydrateComponents(column, this.columns[index]));
  }

  destroy(all) {
    super.destroy(all);
    delete this.columns;
  }
}
