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
        this.queue.push(() => {
            this.addEditGridValue(this.variables, variable);
        });
    }
    addCondition(condition) {
        this.queue.push(() => {
            this.addEditGridValue(this.conditions, condition);
        });
    }
    addValidation(validation) {
        this.queue.push(() => {
            this.addEditGridValue(this.validations, validation, EditRowState.New);
        });
    }
    addEditGridValue(editGrid, value, editRowState = EditRowState.Saved) {
        editGrid.dataValue.push(value);
        const index = editGrid.editRows.length;
        const editRow = {
            components: editGrid.createRowComponents(value, index),
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
        this.queue.forEach((handler) => handler());
        this.queue = [];
    }
}
