export default {
    label: 'Select',
    widget: 'choicesjs',
    tableView: true,
    dataSrc: 'resource',
    data:
    {
        resource: '635fb8f20da97be7f0d5b664'
    },
    template: '<span>{{ item.data }}</span>',
    searchEnabled: false,
    key: 'select',
    type: 'select',
    searchField: 'data__regex',
    input: true,
    addResource: false,
    reference: false,
    valueProperty: 'data'
};
