import { ValueSource } from './ValueSource';

export class ConditionalAssignmentValueSource extends ValueSource {
  static get name() {
    return 'conditionalAssignment';
  }

  static get title() {
    return 'Conditional Assignment';
  }

  static get weight() {
    return 720;
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
      label: 'Conditional Assignment',
      input: true,
      type: 'editgrid',
      templates: {
        header: (
          `<div class="row">
            <div class="col-sm-5">Condition</div>
            <div class="col-sm-5">Value</div>
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

          const condition = flattenedComponents.condition.getView(row.condition);
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
              <div class="col-sm-5">${condition}</div>
              <div class="col-sm-5">${value}</div>
              <div class="col-sm-2">
                <button class="btn btn-default btn-light btn-sm editRow">E</button>
                <button class="btn btn-danger btn-sm removeRow">D</button>
              </div>
            </div>`
          );
        },
      },
      addAnother: 'Add Assignment',
      saveRow: 'Save Assignment',
      components: [
        editFormUtils.conditionSelector({
          customValues: customConditions,
          exclude: excludeConditions,
        }),
        ...editFormUtils.valueDeclaration({
          customConditions,
          customVariables,
          excludeConditions,
          excludeValueSources: [
            ...excludeValueSources,
            // Exclude current valueSource to prevent infinite recursion.
            ConditionalAssignmentValueSource.name,
          ],
          excludeVariables,
        }),
      ],
    };
  }

  getValue(input) {
    const branch = input.find(({ condition }) => (!condition || this.targetComponentInstance.calculateCondition(condition)));

    return (
      branch
        ? this.targetComponentInstance.calculateValueDefinition(
          branch.valueSource,
          branch[`${branch.valueSource}Input`],
          this.context,
        )
        : null
    );
  }
}
