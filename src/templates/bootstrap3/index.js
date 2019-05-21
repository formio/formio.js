import ResizeObserver from 'resize-observer-polyfill';

import builder from './builder';
import builderComponent from './builderComponent';
import builderComponents from './builderComponents';
import builderEditForm from './builderEditForm';
import builderPlaceholder from './builderPlaceholder';
import builderSidebar from './builderSidebar';
import columns from './columns';
import datagrid from './datagrid';
import day from './day';
import dialog from './dialog';
import editgrid from './editgrid';
import field from './field';
import file from './file';
import icon from './icon';
import iconClass from './iconClass';
import input from './input';
import message from './message';
import modaldialog from './modaldialog';
import modaledit from './modaledit';
import multiValueRow from './multiValueRow';
import multiValueTable from './multiValueTable';
import panel from './panel';
import radio from './radio';
import resourceAdd from './resourceAdd';
import signature from './signature';
import survey from './survey';
import tab from './tab';
import table from './table';
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
  handleBuilderSidebarScroll(builder) {
    if (builder.scrollResizeObserver) {
      builder.scrollResizeObserver.disconnect();
    }
    builder.scrollResizeObserver = new ResizeObserver(() => {
      setTimeout(() => {
        const {
          form: {
            parentNode: {
              clientHeight: formHeight,
            }
          },
          sidebar: {
            clientHeight: sidebarHeight,
            parentNode: {
              style,
            },
          },
        } = builder.refs;

        style.height = `${Math.max(sidebarHeight + 20, formHeight)}px`;
      });
    });

    builder.scrollResizeObserver.observe(builder.refs.form);
    builder.scrollResizeObserver.observe(builder.refs.sidebar);
  },
  clearBuilderSidebarScroll(builder) {
    if (builder.scrollResizeObserver) {
      builder.scrollResizeObserver.disconnect();
      builder.scrollResizeObserver = null;
    }
  },
  defaultIconset: 'glyphicon',
  iconClass,
  cssClasses,
  builder,
  builderComponent,
  builderComponents,
  builderEditForm,
  builderPlaceholder,
  builderSidebar,
  columns,
  datagrid,
  day,
  dialog,
  editgrid,
  field,
  file,
  icon,
  input,
  message,
  modaldialog,
  modaledit,
  multiValueRow,
  multiValueTable,
  panel,
  radio,
  resourceAdd,
  signature,
  survey,
  tab,
  table,
  well,
  wizard,
};
