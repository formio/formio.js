export default {
  components: [
    {
      label: 'Phone Number',
      applyMaskOn: 'change',
      allowMultipleMasks: true,
      tableView: true,
      key: 'phoneNumber',
      type: 'phoneNumber',
      inputMasks: [
        {
          label: 'Canada',
          mask: '(999) 999-9999',
        },
        {
          label: 'Other',
          mask: '',
        },
      ],
      input: true,
    },
  ],
};
