import { Utils } from '@formio/core';
const {
  flattenComponents,
  guid,
  uniqueName,
  MODEL_TYPES,
  getModelType,
  getComponentAbsolutePath,
  getComponentPath,
  isComponentModelType,
  isComponentNestedDataType,
  componentPath,
  componentChildPath,
  eachComponentDataAsync,
  eachComponentData,
  getComponentKey,
  getContextualRowPath,
  getContextualRowData,
  componentInfo,
  eachComponent,
  eachComponentAsync,
  getComponentData,
  getComponentActualValue,
  isLayoutComponent,
  matchComponent,
  getComponent,
  searchComponents,
  removeComponent,
  hasCondition,
  parseFloatExt,
  formatAsCurrency,
  escapeRegExCharacters,
  getValue,
  getStrings,
  generateFormChange,
  applyFormChanges,
  findComponent,
  getEmptyValue,
  isComponentDataEmpty
} = Utils;

/**
 * Deprecated version of findComponents. Renamed to searchComponents.
 * @param {import('@formio/core').Component[]} components - The components to find components within.
 * @param {object} query - The query to use when searching for the components.
 * @returns {import('@formio/core').Component[]} - The result of the component that is found.
 */
export function findComponents(components, query) {
  console.warn('formio.js/utils findComponents is deprecated. Use searchComponents instead.');
  return searchComponents(components, query);
}

export {
  flattenComponents,
  guid,
  uniqueName,
  MODEL_TYPES,
  getModelType,
  getComponentAbsolutePath,
  getComponentPath,
  isComponentModelType,
  isComponentNestedDataType,
  componentPath,
  componentChildPath,
  eachComponentDataAsync,
  eachComponentData,
  getComponentKey,
  getContextualRowPath,
  getContextualRowData,
  componentInfo,
  eachComponent,
  eachComponentAsync,
  getComponentData,
  getComponentActualValue,
  isLayoutComponent,
  matchComponent,
  getComponent,
  searchComponents,
  removeComponent,
  hasCondition,
  parseFloatExt,
  formatAsCurrency,
  escapeRegExCharacters,
  getValue,
  getStrings,
  generateFormChange,
  applyFormChanges,
  findComponent,
  getEmptyValue,
  isComponentDataEmpty
};
