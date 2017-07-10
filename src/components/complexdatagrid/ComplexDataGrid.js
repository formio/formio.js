import _each from 'lodash/each';
import _cloneDeep from 'lodash/cloneDeep';
import _clone from 'lodash/clone';
import _isArray from 'lodash/isArray';
import { FormioComponents } from '../Components';
import { ColumnsComponent } from '../columns/Columns';
export class ComplexDataGridComponent extends FormioComponents {
	
	constructor(component, options, data) {
		super(component, options, data);
		this.type = 'complexdatagrid';
		this.columnEditValues = [];
		this.rowindex = null;
	}
	
	get defaultValue() {
		return {};
	}

	build() {
		this.createElement();
		this.createLabel(this.element);
		if (!this.data.hasOwnProperty(this.component.key)) {
			this.addNewValue();
		}
		this.visibleColumns = true;
		this.createPropertyWindowGroup('propertyGrid', this.element, 'row');
		this.buildTable();
		this.createDescription(this.element);
	}

	buildTable(data) {
		data = data || {};
		if (this.tableElement) {
			this.element.removeChild(this.tableElement);
			this.tableElement.innerHTML = '';
		}

		let tableClass = 'table datagrid-table table-bordered form-group formio-data-grid ';
		_each([ 'striped', 'bordered', 'hover', 'condensed' ], (prop) => {
			if (this.component[prop]) {
				tableClass += 'table-' + prop + ' ';
			}
		});
		this.tableElement = this.ce('element', 'table', {
			class : tableClass
		});

		let thead = this.ce('header', 'thead');

		// Build the header.
		let tr = this.ce('headerRow', 'tr');
		_each(this.component.components, (comp) => {
			if ((this.visibleColumns === true) || (this.visibleColumns[comp.key])) {
				let th = this.ce('headerColumn', 'th');
				if (comp.validate && comp.validate.required) {
					th.setAttribute('class', 'field-required');
				}
				let title = comp.label || comp.title;
				if (title) {
					th.appendChild(this.text(title));
				}
				tr.appendChild(th);
			}
		});
		let th1 = this.ce('headerExtra1', 'th');
		tr.appendChild(th1);
		let th2 = this.ce('headerExtra2', 'th');
		tr.appendChild(th2);
		thead.appendChild(tr);
		this.tableElement.appendChild(thead);

		// Create the table body.
		this.tbody = this.ce('table', 'tbody');

		// Build the rows.
		this.buildRows(data);

		// Add the body to the table and to the element.
		this.tableElement.appendChild(this.tbody);
		this.element.appendChild(this.tableElement);
	}

	buildRows(data) {
		let components = require('../index');
		this.tbody.innerHTML = '';
		this.rows = [];
		_each(this.data[this.component.key], (row, index) => {
			let tr = this.ce('tableRow', 'tr');
			let cols = {};
			_each(this.component.components, (col) => {
				let column = _cloneDeep(col);
				column.label = false;
				column.row = this.row + '-' + index;
				let options = _clone(this.options);
				options.name += '[' + index + ']';
				let comp = components.create(column, options, row);
				if (row.hasOwnProperty(column.key)) {
					comp.setValue(row[column.key]);
				} else if (comp.type === 'components') {
					comp.setValue(row);
				}
				cols[column.key] = comp;
				if ((this.visibleColumns === true) || this.visibleColumns[col.key]) {
					let td = this.ce('tableColumn', 'td');
					td.appendChild(comp.element);
					tr.appendChild(td);
					comp.checkConditions(data);
				}
			});
			this.rows.push(cols);
			let tdEdit = this.ce('tableEditRow', 'td');
			tdEdit.appendChild(this.editButton(index));
			tr.appendChild(tdEdit);
			let tdDelete = this.ce('tableRemoveRow', 'td');
			tdDelete.appendChild(this.removeButton(index));
			tr.appendChild(tdDelete);
			this.tbody.appendChild(tr);
		});

		// Add the add button.
		let tr = this.ce('tableAddRow', 'tr');
		let td = this.ce('tableAddColumn', 'td', {
			colspan : (this.component.components.length + 2)
		});
		td.appendChild(this.addButton());
		tr.appendChild(td);
		this.tbody.appendChild(tr);
	}

	checkConditions(data) {
		let show = super.checkConditions(data);
		let rebuild = false;
		if (this.visibleColumns === true) {
			this.visibleColumns = {};
		}
		_each(this.component.components, (col) => {
			let showColumn = false;
			_each(this.rows, (comps) => {
				showColumn |= comps[col.key].checkConditions(data);
			});
			if (
				(this.visibleColumns[col.key] && !showColumn) ||
				(!this.visibleColumns[col.key] && showColumn)
			) {
				rebuild = true
			}

			this.visibleColumns[col.key] = showColumn;
			show |= showColumn;
		});

		// If a rebuild is needed, then rebuild the table.
		if (rebuild && show) {
			this.buildTable(data);
		}

		// Return if this table should show.
		return show;
	}

	setValue(value, noUpdate, noValidate) {
		if (!value) {
			return;
		}
		if (!_isArray(value)) {
			return;
		}

		this.value = value;

		// Add needed rows.
		for (let i = this.rows.length; i < value.length; i++) {
			this.addValue();
		}

		_each(this.rows, (row, index) => {
			if (value.length <= index) {
				return;
			}
			_each(row, (col, key) => {
				if (col.type === 'components') {
					col.setValue(value[index], noUpdate, noValidate);
				} else if (value[index].hasOwnProperty(key)) {
					col.setValue(value[index][key], noUpdate, noValidate);
				}
			});
		});
	}

	/**
	 * Get the value of this component.
	 *
	 * @returns {*}
	 */
	getValue() {
		let values = [];
		_each(this.rows, (row) => {
			let value = {};
			_each(row, (col) => {
				if (
					col &&
					col.component &&
					col.component.key
				) {
					value[col.component.key] = col.getValue();
				}
			});
			values.push(value);
		});
		return values;
	}
	
	  /**
	   * Add new input element listeners.
	   *
	   * @param input
	   */
	  addRowInputEventListener(input) {
	    this.addEventListener(input, this.info.changeEvent, () => {
	    	this.updateRowValue();
	    });
	  }
	
	updateRowValue(noValidate) {
		let doRebuild = false;
		_each(this.columnEditValues, (col) => {
			let propertyElement = document.getElementById(col);
			let newValue = propertyElement.value;
		    let value = this.data[this.component.key][this.rowindex][col];
		    let changed = newValue != value;
		    if (changed) {
			    this.data[this.component.key][this.rowindex][col] = newValue;
			    doRebuild = true;
		    }
		});
		if (doRebuild) {
			this.buildTable(this.data);
		}
	  }
	
	  addValue() {
		    this.addNewValue();
		    this.buildRows();
		    let tableRowIndex = this.data[this.component.key].length - 1;
		    this.editValue(tableRowIndex);
		  }
	  
	  /**
	   * Open data on edit layout.
	   * @param {number} index - The index of the data element in row.
	   */
	  editValue(index) {
	    if (this.data.hasOwnProperty(this.component.key)) {
	      let selectedRow = this.data[this.component.key];
	      this.buildPropertyWindow(index, this.component.key);
	    }
	  }
	  
		createPropertyWindowGroup(divName, container, cssClass) {
		    let inputGroup = null;
		    //if (this.component.prefix || this.component.suffix) {
		      inputGroup = this.ce(divName, 'div', {
		    	id: divName,
		        class: cssClass
		      });
		      container.appendChild(inputGroup);
		    //}
		   return inputGroup;
		  }
	  
	  /**
	   * Rebuild the rows to contain the values of this component.
	   */
	  buildPropertyWindow(index, key) {
	    if (!this.tbody && !selectedRow) {
	      return;
	    }
	    let propertyGrid = document.getElementById('propertyGrid');
	    while (propertyGrid.hasChildNodes()) {
	    	propertyGrid.removeChild(propertyGrid.lastChild);
	    }
	    this.columnEditValues = [];
	    _each(this.data[this.component.key], (value, i) => {
	    	let json = value;
	    	if (index == i) {
	    		this.rowindex = i;
	    		_each(this.component.components, (component) => {
	    			this.columnEditValues.push(component.key);
			    	let propertyDiv = this.createPropertyWindowGroup('propertyDiv' + index + component.key, propertyGrid, 'col-sm-4');
			    	this.info = this.elementInfo();
			    	this.info.attr = {};
			    	this.info.attr.id = component.key;
			    	this.info.attr.class = "form-control";
			    	//this.info.attr.name = "data[" + key + "][" + index + "][" + component.key + "]";
			    	//this.info.attr.type = "text";
			    	//this.info.type = "input";
			    	this.createFieldLabel(propertyDiv, component);
			    	//propertyDiv.appendChild(input);
			    	let fieldValue = json[component.key];
			    	//this.data[component.key]=this.data[key][index][component.key];
			    	let input = this.createInput(propertyDiv, fieldValue);
			    	//input.component = component;
			    	//this.addComponent(component, component.element, data[key][index][component.key]);
			    	propertyDiv.appendChild(input);
	    		});
	    	}
	     });
	    
	    if (this.options.readOnly) {
	      this.disabled = true;
	    }
	  }
	  
	  createInput(container, value) {
		    let input = this.ce('input', this.info.type, this.info.attr);
		    input.value = value;
		    this.addRowInputEventListener(input);
		    //this.setInputMask(input);
		    let inputGroup = this.addInputGroup(input, container);
		    this.addPrefix(input, inputGroup);
		    this.addInput(input, inputGroup || container);
		    //this.addSuffix(input, inputGroup);
		    this.errorContainer = container;
		    return inputGroup || input;
		  }
	  
	  /**
	   * Creates a new "edit" row button and returns the html element of that button.
	   * @param {number} index - The index of the row that should be edit.
	   * @returns {HTMLElement} - The html element of the edit button.
	   */
	  editButton(index) {
	    let editButton = this.ce('editButton', 'button', {
	      type: 'button',
	      class: 'btn btn-default',
	      tabindex: '-1'
	    });

	    this.addEventListener(editButton, 'click', (event) => {
	      event.preventDefault();
	      this.editValue(index);
	    });

	    let editIcon = this.ce('editIcon', 'span', {
	      class: 'glyphicon glyphicon-edit'
	    });
	    editButton.appendChild(editIcon);
	    return editButton;
	  }
	  
	  /**
	   * Create the HTML element for the label of this component.
	   * @param {HTMLElement} container - The containing element that will contain this label.
	   */
	  createFieldLabel(container, component) {
	    let label = this.ce('label', 'label', {
	      class: 'control-label'
	    });
	    if (this.info.attr.id) {
	      label.setAttribute('for', this.info.attr.id);
	    }
	    label.appendChild(this.text(component.label));
	    container.appendChild(label);
	  }

	
}