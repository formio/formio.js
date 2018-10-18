export default [
  {
    key: 'logic',
    components: [
      {
        key: 'actions',
        components: [
          {
            key: 'actionPanel',
            components: [
              {
                data: {
                  json: [
                    {
                      label: 'Hidden',
                      value: 'hidden',
                      type: 'boolean'
                    },
                    {
                      label: 'Required',
                      value: 'validate.required',
                      type: 'boolean'
                    },
                    {
                      label: 'Disabled',
                      value: 'disabled',
                      type: 'boolean'
                    },
                    {
                      label: 'Label',
                      value: 'label',
                      type: 'string'
                    },
                    {
                      label: 'Title',
                      value: 'title',
                      type: 'string'
                    },
                    {
                      label: 'Tooltip',
                      value: 'tooltip',
                      type: 'string'
                    },
                    {
                      label: 'Decription',
                      value: 'description',
                      type: 'string'
                    },
                    {
                      label: 'Paceholder',
                      value: 'placeholder',
                      type: 'string'
                    },
                    {
                      label: 'CSS Class',
                      value: 'className',
                      type: 'string'
                    },
                    {
                      label: 'Container Custom Class',
                      value: 'customClass',
                      type: 'string'
                    },
                    {
                      label: 'Content',
                      value: 'html',
                      type: 'string'
                    }
                  ],
                },
                key: 'property',
              }
            ],
          }
        ],
      }
    ]
  }
];
