// TODO: share this with EditGrid.
var EditRowState = {
    New: 'new',
    Editing: 'editing',
    Saved: 'saved',
    Removed: 'removed',
};
var QuickRulesHelper = /** @class */ (function () {
    function QuickRulesHelper(editForm, options) {
        this.editForm = editForm;
        this.options = options;
        this.variables = this.editForm.getComponent('variables');
        this.conditions = this.editForm.getComponent('conditions');
        this.validations = this.editForm.getComponent('validations');
        this.queue = [];
    }
    QuickRulesHelper.prototype.addVariable = function (variable) {
        var _this = this;
        this.queue.push(function () {
            _this.addEditGridValue(_this.variables, variable);
        });
    };
    QuickRulesHelper.prototype.addCondition = function (condition) {
        var _this = this;
        this.queue.push(function () {
            _this.addEditGridValue(_this.conditions, condition);
        });
    };
    QuickRulesHelper.prototype.addValidation = function (validation) {
        var _this = this;
        this.queue.push(function () {
            _this.addEditGridValue(_this.validations, validation, EditRowState.New);
        });
    };
    QuickRulesHelper.prototype.addEditGridValue = function (editGrid, value, editRowState) {
        if (editRowState === void 0) { editRowState = EditRowState.Saved; }
        editGrid.dataValue.push(value);
        var index = editGrid.editRows.length;
        var editRow = {
            components: editGrid.createRowComponents(value, index),
            data: value,
            state: editRowState,
            backup: null,
            error: null,
        };
        editGrid.editRows.push(editRow);
        editGrid.redraw();
        return editRow;
    };
    QuickRulesHelper.prototype.execute = function () {
        this.queue.forEach(function (handler) { return handler(); });
        this.queue = [];
    };
    return QuickRulesHelper;
}());
export { QuickRulesHelper };
