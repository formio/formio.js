import EditFormUtils from '../../../components/_classes/component/editForm/utils';

export default [
  {
    ...EditFormUtils.getConditionsEditForm(EditFormUtils.getWebformLogicEditFormSettings()),
    key: 'settings.conditions',
  },
];
