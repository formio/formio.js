export default {
  type: 'form',
  components: [
    {
      label: 'Role',
      widget: 'choicesjs',
      tableView: true,
      multiple: true,
      data: {
        values: [
          {
            label: 'Client',
            value: 'client',
          },
          {
            label: 'Not client',
            value: 'notClient',
          },
        ],
      },
      key: 'role',
      type: 'select',
      input: true,
    },
    {
      label: 'Registered address information',
      disableAddingRemovingRows: true,
      reorder: false,
      addAnotherPosition: 'bottom',
      layoutFixed: false,
      enableRowGroups: false,
      initEmpty: false,
      hidden: true,
      hideLabel: true,
      disableSortingAndFiltering: false,
      tableView: false,
      clearOnHide: false,
      validate: {
        custom:
          "instance.emit('registeredAddressInformationChanged', _.cloneDeep(input));\ninstance.prevRegisteredAddressInformation = _.cloneDeep(input);\n",
      },
      key: 'registeredAddressInformation',
      logic: [
        {
          name: 'Show if role includes client',
          trigger: {
            type: 'simple',
            simple: {
              show: true,
              when: 'role',
              eq: 'client',
            },
          },
          actions: [
            {
              name: 'Show',
              type: 'property',
              property: {
                label: 'Hidden',
                value: 'hidden',
                type: 'boolean',
              },
              state: false,
            },
          ],
        },
      ],
      type: 'datagrid',
      input: true,
      components: [
        {
          label: 'Columns',
          columns: [
            {
              components: [
                {
                  label: 'HTML',
                  tag: 'h6',
                  attrs: [
                    {
                      attr: '',
                      value: '',
                    },
                  ],
                  content: 'Registered address',
                  refreshOnChange: false,
                  key: 'html',
                  type: 'htmlelement',
                  input: false,
                  tableView: false,
                },
              ],
              width: 12,
              offset: 0,
              push: 0,
              pull: 0,
              size: 'md',
              currentWidth: 12,
            },
            {
              components: [
                {
                  label: 'Street address',
                  hideLabel: true,
                  disableSortingAndFiltering: false,
                  tableView: false,
                  clearOnHide: false,
                  key: 'streetAddress',
                  logic: [
                    {
                      name: 'Populate data when regular address information changes',
                      trigger: {
                        type: 'event',
                        simple: {},
                        event: 'addressInformationChanged',
                      },
                      actions: [
                        {
                          name: 'Populate',
                          type: 'value',
                          value: 'value = result[0][0].streetAddress;',
                        },
                        {
                          name: 'Redraw',
                          type: 'customAction',
                          customAction: 'instance.redraw();',
                        },
                      ],
                    },
                  ],
                  type: 'textfield',
                  delimiter: false,
                  requireDecimal: false,
                  enableManualMode: true,
                  input: true,
                },
              ],
              width: 12,
              offset: 0,
              push: 0,
              pull: 0,
              size: 'md',
              currentWidth: 12,
            },
          ],
          hideLabel: true,
          disableSortingAndFiltering: false,
          key: 'columns1',
          type: 'columns',
          input: false,
          tableView: false,
        },
      ],
    },
    {
      label: 'Address information',
      disableAddingRemovingRows: true,
      reorder: false,
      addAnotherPosition: 'bottom',
      layoutFixed: false,
      enableRowGroups: false,
      initEmpty: false,
      hideLabel: true,
      disableSortingAndFiltering: false,
      tableView: false,
      clearOnHide: false,
      validate: {
        custom:
          "instance.emit('addressInformationChanged', _.cloneDeep(input));\ninstance.prevAddressInformation = _.cloneDeep(input);\n",
      },
      key: 'addressInformation',
      logic: [
        {
          name: 'Hide if role includes client',
          trigger: {
            type: 'simple',
            simple: {
              show: true,
              when: 'role',
              eq: 'client',
            },
          },
          actions: [
            {
              name: 'Hide',
              type: 'property',
              property: {
                label: 'Hidden',
                value: 'hidden',
                type: 'boolean',
              },
              state: true,
            },
          ],
        },
      ],
      type: 'datagrid',
      input: true,
      components: [
        {
          label: 'Columns',
          columns: [
            {
              components: [
                {
                  label: 'HTML',
                  tag: 'h6',
                  attrs: [
                    {
                      attr: '',
                      value: '',
                    },
                  ],
                  content: 'Address',
                  refreshOnChange: false,
                  key: 'html',
                  type: 'htmlelement',
                  input: false,
                  tableView: false,
                },
              ],
              width: 12,
              offset: 0,
              push: 0,
              pull: 0,
              size: 'md',
              currentWidth: 12,
            },
            {
              components: [
                {
                  label: 'Street address',
                  hideLabel: true,
                  disableSortingAndFiltering: false,
                  tableView: false,
                  clearOnHide: false,
                  key: 'streetAddress',
                  logic: [
                    {
                      name: 'Populate data when registered address information changes',
                      trigger: {
                        type: 'event',
                        event: 'registeredAddressInformationChanged',
                      },
                      actions: [
                        {
                          name: 'Populate',
                          type: 'value',
                          value: 'value = result[0][0].streetAddress;',
                        },
                        {
                          name: 'Redraw',
                          type: 'customAction',
                          customAction: 'instance.redraw();',
                        },
                      ],
                    },
                  ],
                  type: 'textfield',
                  delimiter: false,
                  requireDecimal: false,
                  input: true,
                },
              ],
              width: 12,
              offset: 0,
              push: 0,
              pull: 0,
              size: 'md',
              currentWidth: 12,
            },
          ],
          hideLabel: true,
          disableSortingAndFiltering: false,
          key: 'columns2',
          type: 'columns',
          input: false,
          tableView: false,
        },
      ],
    },
    {
      label: 'Submit',
      showValidations: false,
      tableView: false,
      key: 'submit',
      logic: [
        {
          name: 'Disable button',
          trigger: {
            type: 'event',
            event: 'disableButton',
          },
          actions: [
            {
              name: 'Disabled property true',
              type: 'property',
              property: {
                label: 'Disabled',
                value: 'disabled',
                type: 'boolean',
              },
              state: true,
            },
          ],
        },
        {
          name: 'Enable button',
          trigger: {
            type: 'event',
            event: 'enableButton',
          },
          actions: [
            {
              name: 'Disabled proprty false',
              type: 'property',
              property: {
                label: 'Disabled',
                value: 'disabled',
                type: 'boolean',
              },
              state: false,
            },
          ],
        },
      ],
      type: 'button',
      saveOnEnter: false,
      input: true,
    },
  ],
  title: 'test',
  display: 'form',
  name: 'test',
  path: 'test',
  machineName: 'ovlcumjiwedukxe:test',
};
