export default {
  type: 'form',
  components: [
    {
      label: 'Inspection Data Grid',
      reorder: false,
      addAnother: 'Add Another Initial Inspection',
      addAnotherPosition: 'bottom',
      defaultOpen: false,
      layoutFixed: false,
      enableRowGroups: false,
      initEmpty: false,
      hideLabel: true,
      tableView: false,
      defaultValue: [
        {
          compartment: '',
          of: '',
          weldComponentLocation: '',
          examinationDateInitial: '',
          initialExam: ''
        }
      ],
      key: 'inspectionDataGrid',
      customConditional: 'show = (row.reliabilityAndMaintenanceForms.other == true)',
      type: 'datagrid',
      input: true,
      components: [
        {
          label: 'Inspection Well',
          hideLabel: true,
          key: 'inspectionWell',
          type: 'well',
          input: false,
          tableView: false,
          components: [
            {
              label: 'Table',
              numRows: 1,
              cellAlignment: 'left',
              key: 'table',
              type: 'table',
              input: false,
              tableView: false,
              rows: [
                [
                  {
                    components: [

                    ]
                  },
                  {
                    components: [

                    ]
                  },
                  {
                    components: [
                      {
                        label: 'Initial Exam',
                        optionsLabelPosition: 'right',
                        inline: true,
                        tableView: false,
                        values: [
                          {
                            label: 'Accept',
                            value: 'accept',
                            shortcut: ''
                          },
                          {
                            label: 'Reject',
                            value: 'reject',
                            shortcut: ''
                          }
                        ],
                        validate: {
                          required: true
                        },
                        key: 'initialExam',
                        type: 'radio',
                        input: true
                      }
                    ]
                  }
                ]
              ]
            },
            {
              label: 'Repair Data Grid',
              reorder: false,
              addAnother: 'Add Another Repaired Inspection',
              addAnotherPosition: 'bottom',
              defaultOpen: false,
              layoutFixed: false,
              enableRowGroups: false,
              initEmpty: false,
              hideLabel: true,
              tableView: false,
              defaultValue: [
                {
                  weldComponentLocationRepair: '',
                  examinationDateRepair: '',
                  repairExam: ''
                }
              ],
              key: 'repairDataGrid',
              conditional: {
                show: true,
                when: 'inspectionDataGrid.initialExam',
                eq: 'reject'
              },
              type: 'datagrid',
              input: true,
              components: [
                {
                  label: 'Table',
                  numRows: 1,
                  cellAlignment: 'left',
                  key: 'table',
                  type: 'table',
                  input: false,
                  tableView: false,
                  rows: [
                    [
                      {
                        components: [

                        ]
                      },
                      {
                        components: [

                        ]
                      },
                      {
                        components: [
                          {
                            label: 'Repair Exam',
                            optionsLabelPosition: 'right',
                            inline: true,
                            tableView: false,
                            values: [
                              {
                                label: 'Accept',
                                value: 'accept',
                                shortcut: ''
                              },
                              {
                                label: 'Reject',
                                value: 'reject',
                                shortcut: ''
                              }
                            ],
                            validate: {
                              required: true
                            },
                            key: 'repairExam',
                            type: 'radio',
                            input: true
                          }
                        ]
                      }
                    ]
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: 'button',
      label: 'Submit',
      key: 'submit',
      disableOnInvalid: true,
      input: true,
      tableView: false
    }
  ],
  title: 'FIO-3090',
  display: 'form',
};
