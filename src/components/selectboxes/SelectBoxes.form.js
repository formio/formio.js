import radioEditForm from '../radio/Radio.form';
import SelectBoxesEditValidation from './editForm/SelectBoxes.edit.validation';

export default function(...extend) {
  return radioEditForm([
    {
      key: 'data',
      components: [
        {
          key: 'dataType',
          ignore: true,
        }
      ]
    },
    {
      key: 'validation',
      components: SelectBoxesEditValidation
    }
  ], ...extend);
}
