import nestedComponentForm from '../_classes/nested/NestedComponent.form';

import PanelEditDisplay from './editForm/Panel.edit.display';
import PanelEditConditional from './editForm/Panel.edit.conditional';

/**
 * The Edit Form function.
 * @param {...any} extend - The components that extend the edit form.
 * @returns {import('@formio/core').Component[]} - The edit form components.
 */
export default function(...extend) {
  return nestedComponentForm([
    {
      key: 'display',
      components: PanelEditDisplay
    },
    {
      key: 'conditional',
      components: PanelEditConditional,
    },
  ], ...extend);
}
