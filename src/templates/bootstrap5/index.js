import builderSidebar from './builderSidebar';
import builderSidebarGroup from './builderSidebarGroup';
import panel from './panel';
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
  panel,
  cssClasses
};
