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
import radio from './radio';
import resourceAdd from './resourceAdd';
import select from './select';
import selectOption from './selectOption';
import signature from './signature';
import survey from './survey';
import tab from './tab';
import table from './table';
import webform from './webform';
import well from './well';
import wizard from './wizard';

export default {
  transform: (type, text) => {
    const classes = {
      'border-default': '',
    };
    switch (type) {
      case 'class':
        return classes.hasOwnProperty(text.toString()) ? classes[text.toString()] : text;
    }
    return text;
  },
  defaultIconset: 'fa',
  iconClass,
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
  radio,
  resourceAdd,
  select,
  selectOption,
  signature,
  survey,
  tab,
  table,
  webform,
  well,
  wizard,
};
