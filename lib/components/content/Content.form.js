var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import baseEditForm from '../_classes/component/Component.form';
import ContentEditDisplay from './editForm/Content.edit.display';
import ContentEditLogic from './editForm/Content.edit.logic';
export default (function () {
    var extend = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        extend[_i] = arguments[_i];
    }
    var editForm = baseEditForm.apply(void 0, __spreadArrays([[
            {
                key: 'display',
                components: ContentEditDisplay,
            },
            {
                key: 'data',
                ignore: true,
            },
            {
                key: 'logic',
                components: ContentEditLogic,
            },
        ]], extend));
    // Add content as full width above the settings.
    editForm.components = [{
            weight: 0,
            type: 'textarea',
            editor: 'ckeditor',
            label: 'Content',
            hideLabel: true,
            input: true,
            key: 'html',
            as: 'html',
            rows: 3,
            tooltip: 'The HTML template for the result data items.',
        }].concat(editForm.components);
    return editForm;
});
