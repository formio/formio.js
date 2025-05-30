export default [
  {
    type: 'select',
    input: true,
    dataSrc: 'url',
    data: {
      url: '/form?limit=1000000&select=_id,title,display'
    },
    searchField: 'title__regex',
    template: '<span>{{ item.title }}</span>',
    valueProperty: '_id',
    authenticate: true,
    label: 'Form',
    key: 'form',
    weight: 10,
    lazyLoad: false,
    tooltip: 'The form to load within this form component.',
    validate: {
      required: true,
    },
  },
  {
    label: 'Lazy Load',
    inputType: 'checkbox',
    defaultValue: true,
    clearOnHide: true,
    errorLabel: '',
    key: 'lazyLoad',
    type: 'checkbox',
    tooltip: 'if it is checked, the subform is loaded after navigation to the page with this component within the wizard.',
    input: true,
    customConditional( { instance, data }) {
      const formComp = instance.root?.getComponent('form');
      const formInfo = formComp?.defaultDownloadedResources.find(res => res._id === data.form);
      const displayMode = 'wizard';

      return instance.options?.editForm?.display === displayMode && ((data.form && !formInfo) || (formInfo && formInfo.display !== displayMode));
    },
  },
  {
    type: 'select',
    input: true,
    dataSrc: 'url',
    data: {
      url: '/form/{{ data.form }}/v'
    },
    searchField: 'title__regex',
    template: '<span>{{ item._vid }}</span>',
    valueProperty: 'revisionId',
    authenticate: true,
    label: 'Form Revision',
    key: 'revision',
    weight: 10,
    lazyLoad: true,
    tooltip: 'You can lock the nested form to a specific revision by choosing the revision number here.',
    customConditional: 'show = !!data.form'
  },
  {
    type: 'checkbox',
    input: true,
    weight: 19,
    key: 'useOriginalRevision',
    label: 'Use Original Revision while Submissions Viewing',
    tooltip: 'Using this option will make form load the original revision (the one which was used to make a submission) when viewing a submission.'
  },
  {
    type: 'checkbox',
    input: true,
    weight: 20,
    key: 'reference',
    label: 'Submit as reference',
    tooltip: 'When "Submit as reference" is enabled, the form submission will be recorded against the Parent Form as well as the Child Form. When a submission recorded with "Submit as reference" is edited, the update is applied to each submission made against the Parent Form and Child Form.'
  }
];
