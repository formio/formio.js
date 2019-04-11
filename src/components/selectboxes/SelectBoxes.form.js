import radioEditForm from '../radio/Radio.form';
import SelectBoxesEditValidation from './editSelectBoxes/SelectBoxes.edit.validation';

export default function(...extend) {
  return radioEditForm([
    {
      key: 'validation',
      components: SelectBoxesEditValidation
    }
  ], ...extend);
}
