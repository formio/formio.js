// TODO: share this with EditGrid.
const EditRowState = {
  New: 'new',
  Editing: 'editing',
  Saved: 'saved',
  Removed: 'removed',
};

export class QuickRulesHelper {
  constructor(editForm, options) {
    this.editForm = editForm;
    this.options = options;

    this.variables = this.editForm.getComponent('variables');
    this.conditions = this.editForm.getComponent('conditions');
    this.validations = this.editForm.getComponent('validations');

    this.queue = [];
  }

  addVariable(variable) {
    this.queue.push(() => this.addEditGridValue(this.variables, variable));
    return this;
  }

  addCondition(condition) {
    this.queue.push(() => this.addEditGridValue(this.conditions, condition));
    return this;
  }

  addValidation(validation) {
    this.queue.push(() => this.addEditGridValue(this.validations, validation, EditRowState.New));
    return this;
  }

  addEditGridValue(editGrid, value, editRowState = EditRowState.Saved) {
    editGrid.dataValue.push(value);
    const index = editGrid.editRows.length;
    const editRow = {
      components: (editRowState === EditRowState.Saved) ? [] : editGrid.createRowComponents(value, index),
      data: value,
      state: editRowState,
      backup: null,
      error: null,
    };
    editGrid.editRows.push(editRow);
    editGrid.redraw();
    return editRow;
  }

  execute() {
    const result = this.queue.map((handler) => handler());
    this.queue = [];
    return result;
  }
}
