export default [
  {
    key: 'placeholder',
    ignore: true,
  },
  {
    type: 'hidden',
    label: 'Files Synchronization feature',
    tooltip:
      'Enable ability to control files synchronization. Files will be auto synced before submit.',
    key: 'autoSync',
    input: true,
    conditional: {
      json: {
        in: [
          {
            var: 'data.storage',
          },
          ['s3', 'azure', 'googledrive'],
        ],
      },
    },
  },
];
