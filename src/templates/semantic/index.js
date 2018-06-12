import button from './button';
import checkbox from './checkbox';
import columns from './columns';
import component from './component';
import day from './day';
import field from './field';
import fieldset from './fieldset';
import icon from './icon';
import iconClass from './iconClass';
import input from './input';
import multiValueRow from './multiValueRow';
import multiValueTable from './multiValueTable';
import panel from './panel';
import radio from './radio';
import select from './select';
import selectOption from './selectOption';
import tab from './tab';
import table from './table';
import webform from './webform';
import well from './well';

export default {
  transform: (type, text) => {
    const columns = {
      '1': 'one',
      '2': 'two',
      '3': 'three',
      '4': 'four',
      '5': 'five',
      '6': 'six',
      '7': 'seven',
      '8': 'eight',
      '9': 'nine',
      '10': 'ten',
      '11': 'eleven',
      '12': 'twelve',
      '13': 'thirteen',
      '14': 'fourteen',
      '15': 'fifteen',
      '16': 'sixteen'
    };
    switch (type) {
      case 'columns':
        return columns.hasOwnProperty(text.toString()) ? columns[text.toString()] : text;
    }
    return text;
  },
  iconClass,
  button,
  checkbox,
  columns,
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
  tab,
  table,
  webform,
  well,
};
