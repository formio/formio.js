import { ConditionalAssignmentValueSource } from './ConditionalAssignment';
import { ValueSource } from './ValueSource';

export class ListValueSource extends ValueSource {
  static get name() {
    return 'list';
  }

  static get title() {
    return 'List';
  }

  static get weight() {
    return 470;
  }

  static getInputEditForm({
    customConditions,
    customVariables,
    editFormUtils,
    excludeConditions,
    excludeValueSources,
    excludeVariables,
  }) {
    return {
      label: 'Values',
      input: true,
      type: 'editgrid',
      templates: {
        header: (
          `<div class="row">
            <div class="col-sm-10">Value</div>
            <div class="col-sm-2"></div>
          </div>`
        ),
        row({ flattenedComponents, row }) {
          function displayFullPath(componentPath) {
            return componentPath.map((pathPart, pathPartIndex) => {
              const pathFlattenedComponents = flattenedComponents.componentPathInput.flattenComponents(pathPartIndex);
              const componentKey = pathFlattenedComponents.component.getView(pathPart.component);
              const inputName = `${pathPart.indexType}Index`;
              const index = (pathPart.indexType === 'same')
                ? 'Same Index'
                : pathFlattenedComponents[inputName]
                  ? pathFlattenedComponents[inputName].getView(pathPart[inputName])
                  : '';
              return `${componentKey}${index ?  ` [${index}]` : ''}`;
            }).join('.');
          }

          const inputName = `${row.valueSource}Input`;
          const value = (row.valueSource === 'thisComponent')
            ? 'This Component Value'
            : (row.valueSource === 'componentPath')
              ? displayFullPath(row[inputName])
              : flattenedComponents[inputName]
                ? flattenedComponents[inputName].getView(row[inputName])
                : '';

          return (
            `<div class="row">
              <div class="col-sm-10">${value}</div>
              <div class="col-sm-2">
                <button class="btn btn-default btn-light btn-sm editRow">E</button>
                <button class="btn btn-danger btn-sm removeRow">D</button>
              </div>
            </div>`
          );
        },
      },
      addAnother: 'Add Value',
      saveRow: 'Save Value',
      components: [
        ...editFormUtils.valueDeclaration({
          customConditions,
          customVariables,
          excludeConditions,
          excludeValueSources: [
            ...excludeValueSources,
            // Exclude current valueSource to prevent infinite recursion.
            ConditionalAssignmentValueSource.name,
            ListValueSource.name,
          ],
          excludeVariables,
        }),
      ],
    };
  }

  getValue(input) {
    return input.map(({
      valueSource,
      [`${valueSource}Input`]: valueSourceInput,
    }) => this.targetComponentInstance.calculateValueDefinition(valueSource, valueSourceInput, this.context));
  }
}
