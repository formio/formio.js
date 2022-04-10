import builderSidebar from './builderSidebar';
import builderSidebarGroup from './builderSidebarGroup';
import builderWizard from './builderWizard';
import componentModal from './componentModal';
import datagrid from './datagrid';
import dialog from './dialog';
import file from './file';
import input from './input';
import label from './label';
import modalPreview from './modalPreview';
import radio from './radio';
import table from './table';
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
  builderSidebar,
  builderSidebarGroup,
  builderWizard,
  componentModal,
  datagrid,
  dialog,
  file,
  input,
  label,
  modalPreview,
  radio,
  table,
  cssClasses
};
