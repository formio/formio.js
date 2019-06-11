import builder from './builder';
import builderComponent from './builderComponent';
import builderComponents from './builderComponents';
import builderEditForm from './builderEditForm';
import builderPlaceholder from './builderPlaceholder';
import builderSidebar from './builderSidebar';
import builderWizard from './builderWizard';
import button from './button';
import checkbox from './checkbox';
import columns from './columns';
import component from './component';
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
import loader from './loader';
import loading from './loading';
import map from './map';
import message from './message';
import multiValueRow from './multiValueRow';
import multiValueTable from './multiValueTable';
import panel from './panel';
import pdf from './pdf';
import pdfBuilder from './pdfBuilder';
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
import cssClasses from './cssClasses';

export default {
  transform(type, text) {
    if (!text) {
      return text;
    }
    switch (type) {
      case 'class':
        return this.cssClasses.hasOwnProperty(text.toString()) ? this.cssClasses[text.toString()] : text;
    }
    return text;
  },
  defaultIconset: 'fa',
  iconClass,
  cssClasses,
  builder,
  builderComponent,
  builderComponents,
  builderEditForm,
  builderPlaceholder,
  builderSidebar,
  builderWizard,
  button,
  checkbox,
  columns,
  component,
  components,
  container,
  datagrid,
  day,
  dialog,
  editgrid,
  field,
  fieldset,
  file,
  html,
  icon,
  input,
  loader,
  loading,
  map,
  message,
  multiValueRow,
  multiValueTable,
  panel,
  pdf,
  pdfBuilder,
  radio,
  resourceAdd,
  select,
  selectOption,
  signature,
  survey,
  tab,
  table,
  tree,
  ...treePartials,
  webform,
  well,
  wizard,
};
