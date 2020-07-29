var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import address from './address';
import builder from './builder';
import builderComponent from './builderComponent';
import builderComponents from './builderComponents';
import builderEditForm from './builderEditForm';
import builderPlaceholder from './builderPlaceholder';
import builderForm from './builderForm';
import builderFormEditForm from './builderFormEditForm';
import builderSidebar from './builderSidebar';
import builderSidebarGroup from './builderSidebarGroup';
import builderWizard from './builderWizard';
import button from './button';
import checkbox from './checkbox';
import columns from './columns';
import component from './component';
import componentModal from './componentModal';
import components from './components';
import container from './container';
import datagrid from './datagrid';
import day from './day';
import dialog from './dialog';
import editgrid from './editgrid';
import field from './field';
import fieldset from './fieldset';
import file from './file';
import html from './html';
import icon from './icon';
import iconClass from './iconClass';
import input from './input';
import label from './label';
import loader from './loader';
import loading from './loading';
import map from './map';
import message from './message';
import modaldialog from './modaldialog';
import modaledit from './modaledit';
import modalPreview from './modalPreview';
import multipleMasksInput from './multipleMasksInput';
import multiValueRow from './multiValueRow';
import multiValueTable from './multiValueTable';
import panel from './panel';
import pdf from './pdf';
import pdfBuilder from './pdfBuilder';
import pdfBuilderUpload from './pdfBuilderUpload';
import radio from './radio';
import resourceAdd from './resourceAdd';
import select from './select';
import selectOption from './selectOption';
import signature from './signature';
import survey from './survey';
import tab from './tab';
import table from './table';
import tree from './tree';
import treePartials from './tree/partials';
import webform from './webform';
import well from './well';
import wizard from './wizard';
import wizardHeader from './wizardHeader';
import wizardNav from './wizardNav';
import cssClasses from './cssClasses';
export default __assign(__assign({ transform: function (type, text) {
        var _a;
        if (!text) {
            return text;
        }
        switch (type) {
            case 'class':
                return (_a = this.cssClasses[text]) !== null && _a !== void 0 ? _a : text;
        }
        return text;
    }, defaultIconset: 'fa', iconClass: iconClass,
    cssClasses: cssClasses,
    address: address,
    builder: builder,
    builderComponent: builderComponent,
    builderComponents: builderComponents,
    builderEditForm: builderEditForm,
    builderFormEditForm: builderFormEditForm,
    builderForm: builderForm,
    builderPlaceholder: builderPlaceholder,
    builderSidebar: builderSidebar,
    builderSidebarGroup: builderSidebarGroup,
    builderWizard: builderWizard,
    button: button,
    checkbox: checkbox,
    columns: columns,
    component: component,
    componentModal: componentModal,
    components: components,
    container: container,
    datagrid: datagrid,
    day: day,
    dialog: dialog,
    editgrid: editgrid,
    field: field,
    fieldset: fieldset,
    file: file,
    html: html,
    icon: icon,
    input: input,
    label: label,
    loader: loader,
    loading: loading,
    map: map,
    message: message,
    modaledit: modaledit,
    modaldialog: modaldialog,
    modalPreview: modalPreview,
    multipleMasksInput: multipleMasksInput,
    multiValueRow: multiValueRow,
    multiValueTable: multiValueTable,
    panel: panel,
    pdf: pdf,
    pdfBuilder: pdfBuilder,
    pdfBuilderUpload: pdfBuilderUpload,
    radio: radio,
    resourceAdd: resourceAdd,
    select: select,
    selectOption: selectOption,
    signature: signature,
    survey: survey,
    tab: tab,
    table: table,
    tree: tree }, treePartials), { webform: webform,
    well: well,
    wizard: wizard,
    wizardHeader: wizardHeader,
    wizardNav: wizardNav });
