import _ from 'lodash';
import NestedComponent from '../nested/NestedComponent';

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
      tableView: false
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
    this.eachComponent((component) => {
      if (!schema.columns[component.columnIndex]) {
        schema.columns[component.columnIndex] = {components: []};
      }
      schema.columns[component.columnIndex].components.push(component.schema);
    });
    return schema;
  }

  get className() {
    return `row ${super.className}`;
  }

  addComponents() {
    const container = this.getContainer();
    container.noDrop = true;
    _.each(this.component.columns, (column, index) => {
      column.type = 'column';
      const comp = this.addComponent(column, container, this.data);
      comp.columnIndex = index;
    });
  }
}
