import { Transformer } from './Transformer';

export class GetRowIndexTransformer extends Transformer {
  static get name() {
    return 'getRowIndex';
  }

  static get title() {
    return 'Get Row Index';
  }

  static get optionsEditForm() {
    return [
      {
        label: 'Component',
        dataSrc: 'custom',
        data: {
          custom({ instance }) {
            return instance.root.arrayDataComponents;
          },
        },
        valueProperty: 'path',
        dataType: 'string',
        template: '<span>{{ item.component.label || item.component.key }} ({{ item.component.key }})</span>',
        key: 'component',
        type: 'select',
        input: true,
      },
    ];
  }

  transform(value, args, opts) {
    const {
      component,
    } = opts;

    if (!component) {
      return value?.rowIndex ?? null;
    }

    const rowIndexes = value?.getRowIndexes?.() ?? {};

    return rowIndexes[component] ?? null;
  }
}
