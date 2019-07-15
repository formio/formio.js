import _ from 'lodash';
import DataGridComponent from '../../components/datagrid/DataGrid';
import ModalEdit from '../modaledit/ModalEdit';
import EditTableForm from './EditTable.form';

export default class EditTableComponent extends DataGridComponent {
  static schema(...extend) {
    return DataGridComponent.schema({
      label: 'Edit Table',
      key: 'editTable',
      type: 'edittable',
      input: true,
      tree: true,
      components: [],
      columns: [],
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Edit Table',
      icon: 'th',
      group: 'data',
      weight: 50,
      schema: EditTableComponent.schema()
    };
  }

  constructor(...args) {
    super(...args);

    const groups  = _.get(this.component, 'rowGroups', []);

    if (this.hasColumns()) {
      this.component.components = this.componentComponents;
    }

    if (this.groupsMode) {
      this.addEmptyRows(this.totalRowsNumber(groups));
    }
  }

  /**
   * Checks whether columns are available
   * @return {Boolean}
   */
  hasColumns() {
    return this.getColumns().length > 0;
  }

  /** Don't show last col in header **/
  /** @override **/
  hasExtraColumn() {
    return false;
  }

  /** @override **/
  hasAddButton() {
    return super.hasAddButton() && this.hasColumns();
  }

  componentSchema(...extend) {
    return ModalEdit.schema({
      rows: 0,
      editor: 'ckeditor',
      hideLabel: true,
    }, ...extend);
  }

  /**
   * Returns all non-empty columns.
   *
   * @return {Array}
   */
  getColumns() {
    const cols = _.get(this, 'component.columns', []);

    return _.filter(
      _.map(cols, c => _.pick(c, ['label', 'key'])),
      c => !_.isEqual(c, this.emptyColumn),
    );
  }

  getGroups() {
    return _.get(this.component, 'rowGroups', []);
  }

  totalRowsNumber(groups) {
    return _.sum(_.map(groups, 'numberOfRows'));
  }

  addEmptyRows(n) {
    this.dataValue = _.range(n).map(() => ({}));
  }

  get emptyColumn() {
    return { label: '', key: '' };
  }

  get componentComponents() {
    return this.getColumns().map(({ label, key }) => {
      return this.componentSchema({ label, key });
    });
  }

  get tableClass() {
    const type = _.get(this.component, 'type', 'edittable');
    const defaultClass = [
      'table',
      'table-bordered',
      `table-${type}`,
      'form-group',
      `formio-${type}-table`
    ].join(' ');
    let className = _.get(this.component, 'tableClass');

    if (className === '' || !_.isString(className)) {
      className = defaultClass;
    }

    ['striped', 'bordered', 'hover', 'condensed'].forEach((prop) => {
      if (this.component[prop]) {
        className = `${className} table-${prop}`;
      }
    });

    return className;
  }

  get groupsMode() {
    return _.get(this.component, 'enableRowGroups', false);
  }

  /** @override **/
  build(state = {}) {
    super.build(state);

    this.tableElement.className = this.tableClass;

    if (this.builderMode && !this.hasColumns()) {
      this.element.appendChild(this.builderView());
    }

    this.setMeta();
  }

  buildRows() {
    super.buildRows();

    if (this.groupsMode) {
      this.buildGroups();
    }
  }

  buildGroups() {
    const groups = _.get(this.component, 'rowGroups', []);
    const ranges = _.map(groups, 'numberOfRows');
    const rows = this.tableElement.querySelectorAll('tbody>tr');
    const tbody = this.tableElement.querySelector('tbody');
    const chunks = this.getRowChunks(ranges, rows);
    const firstElements = chunks.map(_.head);
    const groupElements = groups.map(g => this.buildGroup(g));

    groupElements.forEach((elt, index) => {
      const row = firstElements[index];

      if (row) {
        tbody.insertBefore(elt, row);
      }
    });
  }

  /**
   * @param {Numbers[]} groups
   * @param {Array<T>} coll - collection
   *
   * @return {Array<T[]>}
   */
  getRowChunks(groups, coll) {
    const [, chunks] = groups.reduce(
      ([startIndex, acc], size) => {
        const endIndex = startIndex +  size;
        return [endIndex, [...acc, [startIndex, endIndex]]];
      },
      [0, []]
    );

    return chunks.map(range => _.slice(coll, ...range));
  }

  buildGroup({ label }) {
    const colsNumber = this.getColumns().length;
    const cell = this.ce('td', {
      colspan: colsNumber,
      class: 'edittable-group-label',
    }, label);
    return this.ce('tr', null, cell);
  }

  /** @override **/
  buildRow(row, index, state = {}) {
    if (this.builderMode) {
      return null;
    }

    this.rows[index] = {};

    const colSchemes = this.componentComponents;
    const lastIndex = colSchemes.length - 1;
    const columns = colSchemes.map(
      (col, colIndex) => {
        const colContainer = this.buildComponent(
          col,
          colIndex,
          row,
          index,
          this.getComponentState(col, state)
        );

        if (this.hasRemoveButtons() && colIndex === lastIndex) {
          colContainer.append(this.removeButton(index));
        }

        return colContainer;
      }
    );

    return this.ce('tr', null, columns);
  }

  /** override **/
  removeButton(index) {
    const type = _.get(this.component, 'type', 'edittable');
    const button = this.ce(
      'button',
      {
        type: 'button',
        class: `btn btn-xxs btn-danger formio-${type}-remove`,
      },
      this.ce('i', {
        class: this.iconClass('remove')
      })
    );

    this.addEventListener(button, 'click', (event) => {
      event.preventDefault();
      this.removeValue(index);
    });

    return button;
  }

  builderView() {
    return this.ce('div', { class: 'well edittable-placeholder' }, [
      this.ce('i', { class: this.iconClass('warning-sign') }),
      ' ',
      this.t('No columns provided')
    ]);
  }

  getMeta() {
    const groups = this.getGroups();
    if (this.hasColumns && groups.length) {
      return groups.reduce((info, g) => {
        info[g.label] = g.numberOfRows;
        return info;
      }, {});
    }
    else {
      return null;
    }
  }

  setMeta() {
    const key = _.get(this.component, 'key');
    const data = this.getMeta();

    if (key && data) {
      _.set(this.root, ['_submission', 'metadata', key], data);
    }
  }
}

EditTableComponent.editForm = EditTableForm;
