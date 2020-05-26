import { Transformer } from './Transformer';

export class GetRowTransformer extends Transformer {
  static get title() {
    return 'Get Row';
  }

  static get name() {
    return 'getRow';
  }

  static get optionsEditForm() {
    return [
      {
        label: 'Component',
        dataSrc: 'custom',
        data: {
          custom({ instance }) {
            return instance.root.nestedDataComponents;
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
      return value?.data ?? null;
    }

    let current = value;
    while (current?.parent && (current.parent.path !== component)) {
      current = current.parent;
    }

    return current?.data ?? null;
  }
}
