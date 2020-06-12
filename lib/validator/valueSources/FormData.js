import { FormValueSource } from './Form';
export class FormDataValueSource extends FormValueSource {
    static get name() {
        return 'formData';
    }
    static get title() {
        return 'Form Data';
    }
    static get weight() {
        return 310;
    }
    getValue() {
        var _a, _b;
        return (_b = (_a = super.getValue()) === null || _a === void 0 ? void 0 : _a.data) !== null && _b !== void 0 ? _b : null;
    }
}
