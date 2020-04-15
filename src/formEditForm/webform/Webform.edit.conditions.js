import EditFormUtils from '../../components/_classes/component/editForm/utils';

export default [
  {
    ...EditFormUtils.getConditionsEditForm({
      customConditions({ data }) {
        return data.settings?.conditions ?? [];
      },
      customVariables({ data }) {
        return data.settings?.variables ?? [];
      },
      excludeValueSources: [
        'thisComponent',
        'thisComponentValue',
      ],
    }),
    key: 'settings.conditions',
  },
];
