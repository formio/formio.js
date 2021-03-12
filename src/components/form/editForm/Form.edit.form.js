export default [
  {
    type: 'select',
    input: true,
    dataSrc: 'url',
    data: {
      url: '/form?limit=4294967295&select=_id,title,display'
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
      const formInfo = instance.root?.getComponent('form')?.defaultDownloadedResources.find(res => res._id === data.form);
      const displayMode = 'wizard';

      return instance.options?.editForm?.display === displayMode && formInfo && formInfo.display !== displayMode;
    },
  },
  {
    type: 'textfield',
    input: true,
    label: 'Form Revision',
    placeholder: 'Current',
    tooltip: 'You can lock the nested form to a specific revision by entering the revision number here.',
    key: 'revision',
    weight: 11,
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
    label: 'Save as reference',
    tooltip: 'Using this option will save this field as a reference and link its value to the value of the origin record.'
  }
];
