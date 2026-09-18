export default {
  type: 'form',
  display: 'form',
  components: [
    {
      label: 'Address',
      tableView: false,
      provider: 'google',
      enableNewPlacesApi: true,
      apiKey: 'testApiKey',
      // The builder persists an empty object by default; a truthy object here is
      // what triggered the FIO-10428 QA failure (legacy fields leaking into fetchFields).
      autocompleteOptions: {},
      key: 'address',
      type: 'address',
      input: true,
      components: [],
    },
  ],
};
