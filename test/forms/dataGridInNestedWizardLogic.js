export default {
  mainForm: {
    _id: 'aaaaaaaaaaaaaaaaaaaaaaaa',
    title: 'outer',
    name: 'outer',
    path: 'outer',
    type: 'form',
    display: 'wizard',
    components: [
      {
        label: 'Outer Page 1',
        title: 'Outer Page 1',
        key: 'outerPage1',
        type: 'panel',
        input: false,
        tableView: false,
        components: [
          {
            label: 'Nested Wizard',
            tableView: true,
            form: 'bbbbbbbbbbbbbbbbbbbbbbbb',
            useOriginalRevision: false,
            key: 'nestedWizard',
            type: 'form',
            input: true,
          },
        ],
      },
      {
        label: 'Outer Page 2',
        title: 'Outer Page 2',
        key: 'outerPage2',
        type: 'panel',
        input: false,
        tableView: false,
        components: [
          {
            label: 'Note',
            key: 'note',
            type: 'textfield',
            input: true,
            tableView: true,
          },
        ],
      },
    ],
  },
  'bbbbbbbbbbbbbbbbbbbbbbbb': {
    _id: 'bbbbbbbbbbbbbbbbbbbbbbbb',
    title: 'nestedWizard',
    name: 'nestedWizard',
    path: 'nestedwizard',
    type: 'form',
    display: 'wizard',
    components: [
      {
        label: 'Certs Page',
        title: 'Certs Page',
        key: 'certsPage',
        type: 'panel',
        input: false,
        tableView: false,
        components: [
          {
            label: 'Validation',
            hidden: true,
            tableView: false,
            defaultValue: true,
            clearOnHide: false,
            validateWhenHidden: false,
            key: 'validation',
            type: 'checkbox',
            input: true,
          },
          {
            label: 'Certifications DG',
            reorder: false,
            addAnother: 'Add Another',
            addAnotherPosition: 'bottom',
            initEmpty: true,
            tableView: false,
            clearOnHide: false,
            validateWhenHidden: false,
            key: 'certsDG',
            type: 'datagrid',
            input: true,
            components: [
              {
                title: 'Cert Panel',
                collapsible: false,
                hideLabel: true,
                key: 'certPanel',
                type: 'panel',
                label: 'Panel',
                input: false,
                tableView: false,
                components: [
                  {
                    label: 'Name of Responsible Official',
                    widget: 'choicesjs',
                    tableView: true,
                    dataSrc: 'values',
                    data: {
                      values: [
                        { label: 'A', value: 'A' },
                        { label: 'B', value: 'B' },
                      ],
                    },
                    validateWhenHidden: false,
                    key: 'nameResponsibleOfficial',
                    logic: [
                      {
                        name: 'setRequiredAction',
                        trigger: {
                          type: 'simple',
                          simple: {
                            show: true,
                            conjunction: 'all',
                            conditions: [
                              {
                                component: 'validation',
                                operator: 'isEqual',
                                value: true,
                              },
                            ],
                          },
                        },
                        actions: [
                          {
                            name: 'setRequiredAction',
                            type: 'property',
                            property: {
                              label: 'Required',
                              value: 'validate.required',
                              type: 'boolean',
                            },
                            state: true,
                          },
                        ],
                      },
                    ],
                    type: 'select',
                    input: true,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        label: 'Second Page',
        title: 'Second Page',
        key: 'secondPage',
        type: 'panel',
        input: false,
        tableView: false,
        components: [
          { label: 'X', key: 'x', type: 'textfield', input: true, tableView: true },
        ],
      },
    ],
  },
};
