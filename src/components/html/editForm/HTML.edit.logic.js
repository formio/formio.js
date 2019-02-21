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
                      type: 'boolean',
                    },
                    {
                      label: 'Required',
                      value: 'validate.required',
                      type: 'boolean',
                    },
                    {
                      label: 'Disabled',
                      value: 'disabled',
                      type: 'boolean',
                    },
                    {
                      label: 'Label',
                      value: 'label',
                      type: 'string',
                    },
                    {
                      label: 'Title',
                      value: 'title',
                      type: 'string',
                    },
                    {
                      label: 'Tooltip',
                      value: 'tooltip',
                      type: 'string',
                    },
                    {
                      label: 'Description',
                      value: 'description',
                      type: 'string',
                    },
                    {
                      label: 'Placeholder',
                      value: 'placeholder',
                      type: 'string',
                    },
                    {
                      label: 'CSS Class',
                      value: 'className',
                      type: 'string',
                    },
                    {
                      label: 'Container Custom Class',
                      value: 'customClass',
                      type: 'string',
                    },
                    {
                      label: 'Content',
                      value: 'content',
                      type: 'string',
                      component: 'content',
                    },
                  ],
                },
                key: 'property',
              },
              {
                type: 'textarea',
                editor: 'ace',
                rows: 10,
                as: 'html',
                label: 'Content',
                tooltip: 'The content of this HTML element.',
                defaultValue: '<div class="well">Content</div>',
                key: 'content',
                weight: 30,
                input: true,
                customConditional: 'show = row.type === "property" && row.hasOwnProperty("property") && row.property.type === "string" && row.property.component === "content";',
              },
            ],
          },
        ],
      },
    ],
  },
];
