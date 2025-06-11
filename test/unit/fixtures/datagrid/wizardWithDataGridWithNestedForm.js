export default {
  _id: '68060aea27191cd69fda54a7',
  type: 'form',
  components: [
    {
      title: 'Page 1',
      breadcrumbClickable: true,
      buttonSettings: {
        previous: true,
        cancel: true,
        next: true
      },
      navigateOnEnter: false,
      saveOnEnter: false,
      scrollToTop: false,
      collapsible: false,
      key: 'page1',
      type: 'panel',
      label: 'Page 1',
      input: false,
      tableView: false,
      components: [
        {
          label: 'Data Grid',
          reorder: false,
          addAnotherPosition: 'bottom',
          layoutFixed: false,
          enableRowGroups: false,
          initEmpty: false,
          tableView: false,
          defaultValue: [{}],
          validateWhenHidden: false,
          key: 'dataGrid',
          type: 'datagrid',
          input: true,
          components: [
            {
              label: 'Form',
              tableView: true,
              form: '6800c965a969b07fbd8d7077',
              useOriginalRevision: false,
              reference: false,
              key: 'form1',
              type: 'form',
              input: true,
              lazyLoad: true
            }
          ]
        }
      ]
    },
    {
      title: 'Page 2',
      label: 'Page 2',
      type: 'panel',
      key: 'page2',
      input: false,
      tableView: false,
      components: []
    }
  ],
  revisions: '',
  _vid: 0,
  title: 'Wizard with dataGrid with nestedForm',
  display: 'wizard',
  name: 'dataGridWithNestedForm',
  path: 'datagridwithnestedform'
};
