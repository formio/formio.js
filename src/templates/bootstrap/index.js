import button from './button';
import checkbox from './checkbox';
import component from './component';
import day from './day';
import field from './field';
import fieldset from './fieldset';
import html from './html';
import icon from './icon';
import input from './input';
import multiValueRow from './multiValueRow';
import multiValueTable from './multiValueTable';
import panel from './panel';
import radio from './radio';
import select from './select';
import selectOption from './selectOption';
import webform from './webform';
import well from './well';

export default {
  iconClass: (iconset, name, spinning) => {
    if (iconset === 'fa') {
      switch (name) {
        case 'zoom-in':
          name = 'search-plus';
          break;
        case 'zoom-out':
          name = 'search-minus';
          break;
        case 'question-sign':
          name = 'question-circle';
          break;
        case 'remove-circle':
          name = 'times-circle-o';
          break;
        case 'new-window':
          name = 'window-restore';
          break;
      }
    }

    return spinning ? `${iconset} ${iconset}-${name} ${iconset}-spin` : `${iconset} ${iconset}-${name}`;
  },
  button,
  checkbox,
  component,
  day,
  field,
  fieldset,
  html,
  icon,
  input,
  multiValueRow,
  multiValueTable,
  panel,
  radio,
  select,
  selectOption,
  webform,
  well,
};
