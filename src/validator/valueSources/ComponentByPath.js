import _ from 'lodash';

import { NumberValueSource } from './Number';
import { SameIndexValueSource } from './SameIndex';
import { ValueSource } from './ValueSource';
import { VariableValueSource } from './Variable';

const indexTypes = [
  NumberValueSource,
  SameIndexValueSource,
  VariableValueSource,
].reduce((result, indexType) => ({
  ...result,
  [indexType.name]: indexType,
}), {});

const commonIndexSources = [
  NumberValueSource,
  VariableValueSource,
];

export class ComponentByPathValueSource extends ValueSource {
  static get name() {
    return 'componentPath';
  }

  static get title() {
    return 'Component By Path';
  }

  static get weight() {
    return 100;
  }

  static getInputEditForm(options) {
    return {
      label: 'Component Path',
      inlineEdit: true,
      type: 'editgrid',
      input: true,
      templates: {
        header: (
          `<div class="row">
            <div class="col-sm-10">Path Part</div>
            <div class="col-sm-2"></div>
          </div>`
        ),
        row({ flattenedComponents, row }) {
          const componentKey = flattenedComponents.component.getView(row.component);
          const inputName = `${row.indexType}Index`;
          const index = (row.indexType === 'same')
            ? 'Same Index'
            : flattenedComponents[inputName]
              ? flattenedComponents[inputName].getView(row[inputName])
              : '';
          const path = `${componentKey}${index ?  ` [${index}]` : ''}`;

          return (
            `<div class="row">
              <div class="col-sm-10">${path}</div>
              <div class="col-sm-2">
                <button class="btn btn-default btn-light btn-sm editRow">E</button>
                <button class="btn btn-danger btn-sm removeRow">D</button>
              </div>
            </div>`
          );
        },
      },
      addAnother: 'Add Path Part',
      saveRow: 'Save Path Part',
      components: [
        {
          label: 'Component',
          dataSrc: 'custom',
          data: {
            custom({ instance, rowIndex }) {
              const { pathComponentsMapping } = instance.root;
              const path = instance.parent.dataValue;
              const currentPath = path.slice(0, rowIndex).map(({ component }) => component).join('.');
              // const contextRow = {
              //   label: 'Context',
              //   value: '[context]',
              // };

              return pathComponentsMapping[currentPath];
            },
          },
          valueProperty: 'key',
          dataType: 'string',
          template: '<span>{{ item.label || item.key }} ({{ item.key }})</span>',
          validate: {
            required: true,
            // custom({ instance, rowIndex, row }) {
            //   const { pathComponentsMapping } = instance.root;
            //   const path = instance.parent.dataValue;
            //   const currentPath = path.slice(0, rowIndex).map(({ component }) => component).join('.');
            //   const currentPathPart = row.component;
            //   const components = pathComponentsMapping[currentPath];
            //   const componentsExists = Boolean(components);
            //   const valid = !componentsExists || components.some(({ key }) => key === currentPathPart);

            //   return valid ? true : 'Path doesn\'t exist';
            // },
          },
          key: 'component',
          type: 'select',
          input: true,
        },
        {
          label: 'Index',
          dataSrc: 'custom',
          data: {
            custom({ instance, rowIndex }) {
              const { parentPath } = instance.root;
              const path = instance.parent.dataValue;
              const currentPath = path.slice(0, rowIndex + 1).map(({ component }) => component).join('.');
              const inSameScope = parentPath.startsWith(`${currentPath}.`) || (parentPath === currentPath);
              const commonOptions = commonIndexSources.map((indexSource) => ({
                label: indexSource.title,
                value: indexSource.name,
              }));

              return (
                inSameScope
                  ? [
                    {
                      label: SameIndexValueSource.title,
                      value: SameIndexValueSource.name,
                    },
                  ]
                  : []
                ).concat(commonOptions);
            },
          },
          valueProperty: 'value',
          dataType: 'string',
          key: 'indexType',
          customConditional({ instance, rowIndex }) {
            const { arrayDataComponentPaths } = instance.root;
            const path = instance.parent.dataValue;
            const currentPath = path.slice(0, rowIndex + 1).map(({ component }) => component).join('.');

            return arrayDataComponentPaths.includes(currentPath);
          },
          type: 'select',
          input: true,
        },
        ...commonIndexSources.map((indexSource) => ({
          ...indexSource.getInputEditForm(options),
          key: `${indexSource.name}Index`,
          conditional: {
            json: {
              '===': [
                {
                  var: 'row.indexType',
                },
                indexSource.name,
              ],
            },
          },
        })),
      ],
      conditionalAddButton({ value, instance }) {
        const { pathComponentsMapping } = instance.root;
        const currentPath = value.map(({ component }) => component).join('.');

        return Boolean(pathComponentsMapping[currentPath]);
      },
    };
  }

  getValue(input) {
    let pathForRowIndex;
    let lastIndex = null;

    const component = input.reduce((context, pathPart) => {
      if (_.isNil(context)) {
        return context;
      }

      const {
        component,
        indexType,
        [`${indexType}Index`]: indexInput,
      } = pathPart;

      const lastIndexExists = _.isNumber(lastIndex);

      const getNextContext = (prevContext) => {
        const nextContext = prevContext.getComponent(component);
        return (lastIndexExists && _.isArray(nextContext))
          ? nextContext[lastIndex]
          : nextContext;
      };

      const nextContext = Array.isArray(context)
        ? context.flatMap((contextElement) => getNextContext(contextElement))
        : getNextContext(context);

      pathForRowIndex = `${pathForRowIndex ? `${pathForRowIndex}${lastIndexExists ? `[${lastIndex}]` : ''}.` : ''}${component}`;

      if (lastIndexExists) {
        lastIndex = null;
      }

      if (indexType) {
        const IndexType = indexTypes[indexType];
        if (!IndexType) {
          return null;
        }

        const indexTypeInstance = new IndexType({
          ...this.context,
          options: {
            ...this.options,
            pathForRowIndex,
          },
        });
        lastIndex = indexTypeInstance.getValue(indexInput);
      }

      return nextContext;
    }, this.formInstance);

    return component ?? null;
  }
}
