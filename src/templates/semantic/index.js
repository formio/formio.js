import button from './button';
import checkbox from './checkbox';
import component from './component';
import day from './day';
import field from './field';
import fieldset from './fieldset';
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
    return spinning ? `icon ${name} loading` : `icon ${name}`;
  },
  button,
  checkbox,
  component,
  day,
  field,
  fieldset,
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
