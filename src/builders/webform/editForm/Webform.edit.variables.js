import EditFormUtils from '../../../components/_classes/component/editForm/utils';

export default [
  {
    ...EditFormUtils.getVariablesEditForm(EditFormUtils.getWebformLogicEditFormSettings()),
    key: 'settings.variables',
  },
];
