export default {
  type: 'form',
  display: 'form',
  components: [
    {
      label: 'Tags',
      tableView: false,
      storeas: 'array',
      validate: {
        custom: "valid = data && data.tags.length <= 2 ? true : 'You cannot add more than 2 items'"
      },
      validateOn: 'blur',
      key: 'tags',
      type: 'tags',
      input: true
    },
  ]
};
