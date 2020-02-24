import baseEditForm from '../_classes/component/Component.form';
import SketchpadEditDisplay from './editForm/Sketchpad.edit.display';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: SketchpadEditDisplay
    }
  ], ...extend);
}
