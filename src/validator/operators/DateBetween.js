import moment from 'moment';

import { Operator } from './Operator';

export class DateBetweenOperator extends Operator {
  static get name() {
    return 'dateBetween';
  }

  static get title() {
    return 'Date Between';
  }

  static get hasComplementaryOperator() {
    return true;
  }

  static get arguments() {
    return [
      {
        name: 'Value',
        key: 'value',
        required: true,
      },
      {
        name: 'From',
        key: 'from',
        required: false,
      },
      {
        name: 'To',
        key: 'to',
        required: false,
      },
    ];
  }

  static get optionsEditForm() {
    return [
      {
        label: 'Columns',
        key: 'optionsColumns',
        type: 'columns',
        input: false,
        columns: [
          {
            components: [
              {
                label: 'Exclude "From"',
                key: 'excludeFrom',
                type: 'checkbox',
                input: true,
              },
            ],
            width: 6,
          },
          {
            components: [
              {
                label: 'Exclude "To"',
                key: 'excludeTo',
                type: 'checkbox',
                input: true,
              },
            ],
            width: 6,
          },
        ],
      },
    ];
  }

  execute(args, opts = {}) {
    const {
      value,
      from,
      to,
    } = args;
    const {
      excludeFrom = false,
      excludeTo = false,
    } = opts;

    return moment(value).isBetween(from, to, null, `${excludeFrom ? '(' : '['}${excludeTo ? ')' : ']'}`);
  }
}
