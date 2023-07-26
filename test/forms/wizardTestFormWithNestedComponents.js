const form = {
  title: 'Test Form With Nested Components',
  name: 'testFormWithNestedComponents',
  path: 'testFormWithNestedComponents',
  type: 'form',
  display: 'wizard',
  tags: [],
  components: [
    {
      title: 'Page 1',
      breadcrumbClickable: true,
      buttonSettings: {
        previous: true,
        cancel: true,
        next: true,
      },
      navigateOnEnter: false,
      saveOnEnter: false,
      scrollToTop: true,
      collapsible: false,
      key: 'page1',
      type: 'panel',
      label: 'Page 1',
      input: false,
      tableView: false,
      components: [
        {
          label: 'Outer Container',
          tableView: false,
          calculateValue: '',
          key: 'outerContainer',
          type: 'container',
          input: true,
          components: [
            {
              legend: 'Inner Field Set',
              customClass: 'form-page',
              key: 'innerFieldSet',
              type: 'fieldset',
              label: 'Inner Field Set',
              input: false,
              tableView: false,
              components: [
                {
                  legend: 'Innermost Field Set A',
                  key: 'innermostFieldSetA',
                  type: 'fieldset',
                  label: 'Innermost Field Set A',
                  input: false,
                  tableView: false,
                  components: [
                    {
                      label: 'First Component',
                      optionsLabelPosition: 'right',
                      inline: false,
                      tableView: false,
                      values: [
                        {
                          label: 'a',
                          value: 'a',
                          shortcut: '',
                        },
                        {
                          label: 'b',
                          value: 'b',
                          shortcut: '',
                        },
                        {
                          label: 'c',
                          value: 'c',
                          shortcut: '',
                        },
                      ],
                      validate: {
                        required: true,
                      },
                      key: 'firstComponent',
                      type: 'radio',
                      input: true,
                    },
                  ],
                },
                {
                  legend: 'Innermost Field Set B',
                  key: 'innermostFieldSetB',
                  customConditional:
                    "show=!!_.get(data,'outerContainer.firstComponent');",
                  type: 'fieldset',
                  label: 'Field Set',
                  input: false,
                  tableView: false,
                  components: [
                    {
                      label: 'Second Component',
                      optionsLabelPosition: 'right',
                      inline: false,
                      tableView: false,
                      values: [
                        {
                          label: 'q',
                          value: 'q',
                          shortcut: '',
                        },
                        {
                          label: 'w',
                          value: 'w',
                          shortcut: '',
                        },
                        {
                          label: 'e',
                          value: 'e',
                          shortcut: '',
                        },
                      ],
                      validate: {
                        required: true,
                      },
                      key: 'secondComponent',
                      type: 'radio',
                      input: true,
                    },
                  ],
                },
                {
                  legend: 'Innermost Field Set C',
                  key: 'innermostFieldSetC',
                  customConditional: "let firstComponent=row.firstComponent;\nlet secondComponent=row.secondComponent;\nshow=false;\nif (!!firstComponent && !!secondComponent) {\n  let selected=_.find(_.find(_.get(form,'config.containerDataSource',[]),item=>item.firstComponent===firstComponent).types,item=>item.secondComponent===secondComponent);\n  show=_.isEmpty(_.get(selected,'requiredComponent'))===false;\n}\n",
                  type: 'fieldset',
                  label: 'Innermost Field Set C',
                  input: false,
                  tableView: false,
                  components: [
                    {
                      label: 'Required Component',
                      tableView: false,
                      defaultValue: false,
                      validate: {
                        required: true,
                      },
                      key: 'requiredComponent',
                      type: 'checkbox',
                      input: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      title: 'Page 2',
      breadcrumbClickable: true,
      buttonSettings: {
        previous: true,
        cancel: true,
        next: true,
      },
      navigateOnEnter: false,
      saveOnEnter: false,
      scrollToTop: false,
      collapsible: false,
      key: 'page3',
      type: 'panel',
      label: 'Page 3',
      input: false,
      tableView: false,
      components: [],
    },
  ],
  settings: {},
  properties: {},
  controller: '',
  revisions: '',
  submissionRevisions: '',
  _vid: 0,
  config: {
    containerDataSource: [
      {
        firstComponent: 'a',
        types: [
          {
            secondComponent: 'q',
            requiredComponent: {},
          },
          {
            secondComponent: 'w',
            requiredComponent: {},
          },
          {
            secondComponent: 'e',
            requiredComponent: {},
          },
        ],
      },
      {
        firstComponent: 'b',
        types: [
          {
            secondComponent: 'q',
            requiredComponent: {},
          },
          {
            secondComponent: 'w',
            requiredComponent: {},
          },
          {
            secondComponent: 'e',
            requiredComponent: {},
          },
        ],
      },
      {
        firstComponent: 'c',
        types: [
          {
            secondComponent: 'q',
            requiredComponent: 'Hello, world!',
          },
          {
            secondComponent: 'w',
            requiredComponent: {},
          },
          {
            secondComponent: 'e',
            requiredComponent: {},
          },
        ],
      },
    ],
  },
};

export default { form };
