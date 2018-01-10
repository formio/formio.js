import _each from 'lodash/each';
import _map from 'lodash/map';
import _cloneDeep from 'lodash/cloneDeep';
import _clone from 'lodash/clone';
import _isArray from 'lodash/isArray';
import { FormioComponents } from '../Components';
import FormioUtils from '../../utils';

export class EditGridComponent extends FormioComponents {
  constructor(component, options, data) {
    super(component, options, data);
    this.type = 'datagrid';
    this.rows = [];
    this.openRows = [];
  }

  build() {
    this.createElement();
    this.createLabel(this.element);
    if (!this.data.hasOwnProperty(this.component.key)) {
      this.addNewValue();
    }
    this.visibleColumns = true;
    this.buildTable();
    this.createDescription(this.element);
    this.createAddButton();
  }

  buildTable() {
    if (this.tableElement) {
      // this.element.removeChild(this.tableElement);
      this.tableElement.innerHTML = '';
    }

    let tableClass = 'editgrid-listgroup list-group ';
    _each(['striped', 'bordered', 'hover', 'condensed'], (prop) => {
      if (this.component[prop]) {
        tableClass += 'table-' + prop + ' ';
      }
    });
    this.tableElement = this.ce('ul', {class: tableClass}, [
      this.headerElement = this.createHeader(),
      this.rowElements = _map(this.rows, this.createRow.bind(this)),
      this.footerElement = this.createFooter(),
    ]);

    this.element.appendChild(this.tableElement);
  }

  createHeader() {
    return this.component.templates.header ?
      this.ce('li', {class: 'list-group-item list-group-header'}, this.renderTemplate(this.component.templates.header, {
        components: this.component.components,
        util: FormioUtils,
        value: this.rows
      })) :
      this.text('');
  }

  createRow(row, rowIndex) {
    const wrapper = this.ce('li', {class: 'list-group-item'});

    // Store info so we can detect changes later.
    wrapper.rowData = row;
    wrapper.rowIndex = rowIndex;
    wrapper.rowOpen = this.openRows.includes(rowIndex);

    if (wrapper.rowOpen) {
      wrapper.appendChild(this.text('open ' + rowIndex));
    }
    else {
      wrapper.appendChild(this.renderTemplate(this.component.templates.row,
          {
            row,
            rowIndex,
            components: this.component.components,
            util: FormioUtils
          },
          [
            {
              class: 'removeRow',
              event: 'click',
              action: this.removeRow.bind(this, rowIndex)
            },
            {
              class: 'editRow',
              event: 'click',
              action: this.editRow.bind(this, rowIndex)
            }
          ]
        )
      );
    }
    return wrapper;
  }

  createFooter() {
    return this.component.templates.footer ?
      this.ce('li', {class: 'list-group-item list-group-footer'}, this.renderTemplate(this.component.templates.footer, {
        components: this.component.components,
        util: FormioUtils,
        value: this.rows
      })) :
      this.text('');
  }

  createAddButton() {
    this.element.appendChild(this.ce('div', {class: 'editgrid-add'},
      this.ce('a', {
          class: 'btn btn-primary',
          onClick: this.addRow.bind(this)
        },
        [
          this.ce('span', {class: 'glyphicon glyphicon-plus', 'aria-hidden': true}),
          ' ',
          this.t(this.component.addAnother ? this.component.addAnother : 'Add Another', {})
        ],
      )
    ));
  }

  refreshDOM() {
    const newHeader = this.createHeader();
    this.tableElement.replaceChild(newHeader, this.headerElement);
    this.headerElement = newHeader;

    const newFooter = this.createFooter();
    this.tableElement.replaceChild(newFooter, this.footerElement);
    this.footerElement = newFooter;

    this.rows.forEach((row, rowIndex) => {
      if (!this.rowElements[rowIndex]) {
        // New row
        this.rowElements[rowIndex] = this.createRow(row, rowIndex);
        this.tableElement.insertBefore(this.rowElements[rowIndex], this.tableElement.children[rowIndex + 1]);
      }
      else if (
        this.rowElements[rowIndex].rowData !== row ||
        this.rowElements[rowIndex].rowIndex !== rowIndex ||
        this.rowElements[rowIndex].rowOpen !== this.openRows.includes(rowIndex)
      ) {
        // Row has changed due to an edit or delete.
        const newRow = this.createRow(row, rowIndex);
        this.tableElement.replaceChild(newRow, this.rowElements[rowIndex]);
        this.rowElements[rowIndex] = newRow;
      }
    });
  }

  addRow() {
    this.rows.push({});
    this.openRows.push(this.rows.length - 1);
    this.updateValue();
    this.refreshDOM();
  }

  editRow(rowIndex) {
    this.openRows.push(rowIndex);
    this.refreshDOM();
  }

  cancelRow(rowIndex) {
    const index = this.openRows.indexOf(rowIndex);
    if (index !== -1) {
      this.openRows.splice(index, 1);
    }
    this.refreshDOM();
  }

  saveRow(row, rowIndex) {
    const index = this.openRows.indexOf(rowIndex);
    if (index !== -1) {
      this.openRows.splice(index, 1);
    }
    this.rows[rowIndex] = row;
    this.updateValue();
    this.refreshDOM();
  }

  removeRow(rowIndex) {
    this.rows.splice(rowIndex, 1);
    const index = this.openRows.indexOf(rowIndex);
    if (index !== -1) {
      this.openRows.splice(index, 1);
    }
    // Any open rows below the delete row need to be decremented.
    this.openRows = this.openRows.map(index => index > rowIndex ? --index : index);

    // Manually remove the dom element so it doesn't have more items than this.rows.
    this.tableElement.removeChild(this.rowElements[rowIndex]);
    this.rowElements.splice(rowIndex, 1);
    this.updateValue();
    this.refreshDOM();
  }

  get defaultValue() {
    return {};
  }

  setValue(value, flags) {
    flags = this.getFlags.apply(this, arguments);
    if (!value) {
      return;
    }
    if (!_isArray(value)) {
      return;
    }

    this.rows = this.data[this.component.key] = value;
    this.refreshDOM();
  }

  /**
   * Get the value of this component.
   *
   * @returns {*}
   */
  getValue() {
    return this.rows;
  }
}
