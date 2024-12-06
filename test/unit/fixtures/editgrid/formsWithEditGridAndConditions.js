const form1 = {
  title: 'form1',
  name: 'form1',
  path: 'form1',
  type: 'form',
  display: 'form',
  components: [
    {
      label: 'Checkbox',
      tableView: false,
      key: 'checkbox',
      type: 'checkbox',
      input: true,
    },
    {
      collapsible: false,
      key: 'panel',
      conditional: {
        show: true,
        conjunction: 'all',
        conditions: [
          {
            component: 'checkbox',
            operator: 'isEqual',
            value: true,
          },
        ],
      },
      type: 'panel',
      label: 'Panel',
      input: false,
      tableView: false,
      components: [
        {
          label: 'Radio',
          optionsLabelPosition: 'right',
          inline: false,
          tableView: false,
          values: [
            {
              label: 'yes',
              value: 'yes',
              shortcut: '',
            },
            {
              label: 'no',
              value: 'no',
              shortcut: '',
            },
          ],
          key: 'radio',
          type: 'radio',
          input: true,
        },
        {
          label: 'Edit Grid',
          tableView: false,
          rowDrafts: false,
          key: 'editGrid',
          conditional: {
            show: true,
            conjunction: 'all',
            conditions: [
              {
                component: 'radio',
                operator: 'isEqual',
                value: 'yes',
              },
            ],
          },
          type: 'editgrid',
          displayAsTable: false,
          input: true,
          components: [
            {
              label: 'Text Field',
              applyMaskOn: 'change',
              tableView: true,
              key: 'textField',
              type: 'textfield',
              input: true,
            },
            {
              label: 'Number',
              applyMaskOn: 'change',
              mask: false,
              tableView: true,
              delimiter: false,
              requireDecimal: false,
              inputFormat: 'plain',
              truncateMultipleSpaces: false,
              calculateValue: 'value = row.textField.length;',
              key: 'number',
              type: 'number',
              input: true,
            },
          ],
        },
      ],
    },
    {
      type: 'button',
      label: 'Submit',
      key: 'submit',
      disableOnInvalid: true,
      input: true,
      tableView: false,
    },
  ],
};

const form2 = {
  title: 'form2',
  name: 'testyyy',
  path: 'testyyy',
  type: 'form',
  display: 'form',
  components: [
    {
      label: 'Text Area',
      autoExpand: false,
      tableView: true,
      key: 'textArea',
      type: 'textarea',
      input: true,
    },
    {
      label: 'Edit Grid',
      tableView: false,
      rowDrafts: false,
      key: 'editGrid1',
      type: 'editgrid',
      displayAsTable: false,
      input: true,
      components: [
        {
          label: 'Set Panel Value',
          action: 'custom',
          showValidations: false,
          tableView: false,
          key: 'setPanelValue',
          type: 'button',
          custom:
            "var rowIndex = instance.rowIndex;\nvar rowComponents = instance.parent?.editRows[rowIndex]?.components;\nvar panel = rowComponents?.find(comp => comp.component.key === 'panel');\npanel.setValue({radio: 'a', editGrid: [{textField:'testyyyy' }]});",
          input: true,
        },
        {
          collapsible: false,
          key: 'panel',
          type: 'panel',
          label: 'Panel',
          input: false,
          tableView: false,
          components: [
            {
              label: 'Radio',
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
              ],
              key: 'radio',
              type: 'radio',
              input: true,
            },
            {
              title: 'Grid Panel',
              collapsible: false,
              key: 'panel1',
              customConditional: "show = row.radio === 'a'",
              type: 'panel',
              label: 'Grid Panel',
              input: false,
              tableView: false,
              components: [
                {
                  label: 'Edit Grid',
                  openWhenEmpty: true,
                  disableAddingRemovingRows: true,
                  tableView: false,
                  rowDrafts: false,
                  key: 'editGrid',
                  conditional: {
                    show: true,
                    conjunction: 'all',
                    conditions: [
                      {
                        component: 'radio',
                        operator: 'isEqual',
                        value: 'a',
                      },
                    ],
                  },
                  type: 'editgrid',
                  displayAsTable: false,
                  input: true,
                  components: [
                    {
                      label: 'Text Field',
                      tableView: true,
                      key: 'textField',
                      type: 'textfield',
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
      type: 'button',
      label: 'Submit',
      key: 'submit',
      disableOnInvalid: true,
      input: true,
      tableView: false,
    },
  ],
};

const form3 = {
  title: 'form3',
  name: 'form3',
  path: 'form3',
  type: 'form',
  display: 'form',
  components: [
    {
      label: 'Tabs',
      components: [
        {
          label: 'tab1',
          key: 'generalInformationTab',
          components: [
            {
              title: 'Fill first this tab, then the second one',
              theme: 'primary',
              collapsible: false,
              key: 'riskInfo',
              type: 'panel',
              label: 'Risk Information',
              tableView: false,
              input: false,
              components: [
                {
                  label: 'Select the second option',
                  optionsLabelPosition: 'right',
                  tableView: false,
                  defaultValue: {
                    creditRisk: false,
                    marketRisk: false,
                    operationalRisk: false,
                    counterpartyCreditRisk: false,
                    creditValuationRiskAdjustment: false,
                  },
                  values: [
                    {
                      label: 'Do not select',
                      value: 'creditRisk',
                      shortcut: '',
                    },
                    {
                      label: 'Select this one',
                      value: 'marketRisk',
                      shortcut: '',
                    },
                    {
                      label: 'Do not select',
                      value: 'operationalRisk',
                      shortcut: '',
                    },
                    {
                      label: 'Do not select',
                      value: 'counterpartyCreditRisk',
                      shortcut: '',
                    },
                    {
                      label: 'Do not select',
                      value: 'creditValuationRiskAdjustment',
                      shortcut: '',
                    },
                  ],
                  key: 'affectedRiskTypes',
                  type: 'selectboxes',
                  input: true,
                  inputType: 'checkbox',
                },
              ],
            },
            {
              title: '1.4 Details of change',
              theme: 'primary',
              collapsible: false,
              key: 'changeInformationPanel',
              type: 'panel',
              label: 'Change information',
              input: false,
              tableView: false,
              components: [
                {
                  title: 'select options according to the label',
                  collapsible: false,
                  key: 'rwaImpactPanel',
                  type: 'panel',
                  label: 'Panel',
                  input: false,
                  tableView: false,
                  components: [
                    {
                      label: 'here select yes',
                      optionsLabelPosition: 'right',
                      customClass: 'tooltip-text-left',
                      inline: true,
                      tableView: true,
                      values: [
                        {
                          label: 'Yes',
                          value: 'yes',
                          shortcut: '',
                        },
                        {
                          label: 'No',
                          value: 'no',
                          shortcut: '',
                        },
                      ],
                      key: 'rwaImpact',
                      type: 'radio',
                      labelWidth: 100,
                      input: true,
                    },
                    {
                      label: 'here select the first option, then go to the second tab',
                      optionsLabelPosition: 'right',
                      customClass: 'ml-3',
                      inline: false,
                      tableView: false,
                      values: [
                        {
                          label: 'Select this one',
                          value: 'EUParent',
                          shortcut: '',
                        },
                        {
                          label: 'Do not select',
                          value: 'other',
                          shortcut: '',
                        },
                      ],
                      key: 'euParentInstitution',
                      conditional: {
                        show: true,
                        conjunction: 'all',
                        conditions: [
                          {
                            component: 'rwaImpact',
                            operator: 'isEqual',
                            value: 'yes',
                          },
                        ],
                      },
                      type: 'radio',
                      input: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'tab3',
          key: 'marketRiskTab',
          components: [
            {
              label: 'mr',
              tableView: true,
              key: 'mr',
              conditional: {
                show: true,
                conjunction: 'all',
                conditions: [
                  {
                    component: 'affectedRiskTypes',
                    operator: 'isEqual',
                    value: 'marketRisk',
                  },
                ],
              },
              type: 'container',
              input: true,
              components: [
                {
                  label: 'Quantitative Information',
                  tableView: false,
                  key: 'quantitativeInformation',
                  type: 'container',
                  input: true,
                  components: [
                    {
                      title: 'Fill this tab after tab1',
                      theme: 'primary',
                      customClass: 'tooltip-text-left',
                      collapsible: false,
                      key: 'quantitativeInformation',
                      type: 'panel',
                      label: '3.2 Quantitative information',
                      input: false,
                      tableView: false,
                      components: [
                        {
                          label: 'Here select yes',
                          labelPosition: 'left-left',
                          optionsLabelPosition: 'right',
                          inline: true,
                          tableView: false,
                          values: [
                            {
                              label: 'Yes',
                              value: 'yes',
                              shortcut: '',
                            },
                            {
                              label: 'No',
                              value: 'no',
                              shortcut: '',
                            },
                          ],
                          key: 'cva',
                          customConditional:
                            "show = _.get(data, 'affectedRiskTypes.creditValuationRiskAdjustment') === false && data.rwaImpact === 'yes';",
                          type: 'radio',
                          labelWidth: 100,
                          input: true,
                        },
                        {
                          label: 'Do not select',
                          tableView: false,
                          defaultValue: false,
                          key: 'sameRiskCategories',
                          conditional: {
                            show: true,
                            conjunction: 'all',
                            conditions: [
                              {
                                component: 'rwaImpact',
                                operator: 'isEqual',
                                value: 'yes',
                              },
                            ],
                          },
                          type: 'checkbox',
                          input: true,
                        },
                        {
                          label: 'Do not select',
                          tableView: true,
                          key: 'sameImpactAcrossEntities',
                          conditional: {
                            show: true,
                            conjunction: 'all',
                            conditions: [
                              {
                                component: 'euParentInstitution',
                                operator: 'isEqual',
                                value: 'EUParent',
                              },
                            ],
                          },
                          type: 'checkbox',
                          optionsLabelPosition: 'right',
                          input: true,
                          defaultValue: false,
                        },
                        {
                          label: 'Try to add a row in this grid, it will disappear',
                          tableView: true,
                          templates: {
                            header:
                              '<div class="row">\n  <div class="col-sm-4"><strong>Legal entities</strong></div>\n  <div class="col-sm-3"><strong>Level of consolidation</strong></div>\n   <div class="col-sm-3"><strong>Max change of risk number</strong></div>\n  <div class="col-sm-1"></div>\n</div>',
                            row: "<div class=\"row\">\r\n  <div class=\"col-sm-4\">\r\n   {{ _.get(row, 'legalEntity.longName', '') }}\r\n  </div>\r\n  <div class=\"col-sm-3\">\r\n   {{ _.get(row, 'consolidationLevel', '') }}\r\n  </div>\r\n    <div class=\"col-sm-3\">\r\n    <!-- Calculates max absolute value of all risk numbers in the row -->\r\n\t{% \r\n\tvar items = [\r\n      _.get(row, 'VaRRelChange1Day', ''),\r\n      _.get(row, 'VaRRelChange', ''),\r\n      _.get(row, 'sVarRelChange1Day', ''),\r\n      _.get(row, 'sVarRelChange', ''),\r\n      _.get(row, 'IRCRelChange1Day', ''),\r\n      _.get(row, 'IRCRelChange', ''),\r\n      _.get(row, 'CRMRelChange1Day', ''),\r\n      _.get(row, 'CRMRelChange', ''),\r\n    ].filter((i) => typeof i !== 'undefined' && !isNaN(i))\r\n      .map((i) => Math.abs(i));\r\n\tif (items.length) { %}\r\n    {{Math.max(\r\n    ...items).toFixed(3)}}%\r\n  {% } else { %}\r\n    {{0.000}}%\r\n  {% } %}\r\n  </div>\r\n  <div class=\"col-sm-1\">\r\n  {% if (instance.options.readOnly) { %}\r\n    <div class=\"btn-group pull-right\">\r\n      <div class=\"btn btn-default btn-light btn-sm editRow\">\r\n        <i class=\"{{ iconClass('eye') }}\"></i>\r\n      </div>\r\n    </div>\r\n  {% } else { %}\r\n    <div class=\"btn-group pull-right\">\r\n      <button class=\"btn btn-secondary btn-sm editRow\" title = \"Edit MR figures\">\r\n        <i class=\"{{ iconClass('edit') }}\"></i>\r\n      </button>\r\n      <button class=\"btn btn-danger btn-sm removeRow\" title = \"Delete MR figures\">\r\n        <i class=\"{{ iconClass('trash') }}\"></i>\r\n      </button>\r\n    </div>\r\n  {% } %}\r\n  </div>\r\n</div>",
                          },
                          addAnother: 'Add legal entity',
                          modal: true,
                          saveRow: 'Close',
                          rowDrafts: false,
                          key: 'impactsPerEntity',
                          conditional: {
                            show: true,
                            conjunction: 'all',
                            conditions: [
                              {
                                component: 'rwaImpact',
                                operator: 'isEqual',
                                value: 'yes',
                              },
                            ],
                          },
                          type: 'editgrid',
                          displayAsTable: false,
                          alwaysEnabled: true,
                          input: true,
                          components: [
                            {
                              title: 'Try to add a row in this grid, it will disappear',
                              theme: 'primary',
                              collapsible: false,
                              key: 'entitiesPanel',
                              type: 'panel',
                              label: 'Panel',
                              input: false,
                              tableView: false,
                              components: [
                                {
                                  title: 'Try to add a row in this grid, it will disappear',
                                  collapsible: false,
                                  key: 'periodImpactEstimationPanel',
                                  customConditional:
                                    "show = (\n  (_.get(data, 'mr.quantitativeInformation.sameImpactAcrossEntities') === false) ||\n  (_.get(data, 'euParentInstitution') === 'other')\n)",
                                  type: 'panel',
                                  label: 'Panel',
                                  input: false,
                                  tableView: false,
                                  components: [
                                    {
                                      label: 'Number',
                                      applyMaskOn: 'change',
                                      mask: false,
                                      tableView: true,
                                      delimiter: false,
                                      requireDecimal: false,
                                      inputFormat: 'plain',
                                      truncateMultipleSpaces: false,
                                      key: 'number',
                                      type: 'number',
                                      input: true,
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                          path: 'mrEditGrid',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      key: 'nmcTab',
      type: 'tabs',
      tableView: false,
      input: false,
      keyModified: true,
    },
    {
      label: 'Submit',
      action: 'saveState',
      showValidations: false,
      tableView: false,
      key: 'submit',
      type: 'button',
      input: true,
      alwaysEnabled: false,
      state: 'draft',
    },
  ],
};

const form4 = {
  title: 'form4',
  name: 'form4',
  path: 'form4',
  type: 'form',
  display: 'form',
  components: [
    {
      label: 'Text Field',
      applyMaskOn: 'change',
      tableView: true,
      key: 'textField',
      type: 'textfield',
      input: true,
    },
    {
      label: 'Edit Grid',
      tableView: false,
      calculateValue: 'if (options.server){\r\nvalue = [{ "textArea": "test"}];\r\n}',
      calculateServer: true,
      rowDrafts: false,
      key: 'editGrid',
      type: 'editgrid',
      displayAsTable: false,
      input: true,
      components: [
        {
          label: 'Text Area',
          applyMaskOn: 'change',
          autoExpand: false,
          tableView: true,
          key: 'textArea',
          type: 'textarea',
          input: true,
        },
      ],
    },
    {
      type: 'button',
      label: 'Submit',
      key: 'submit',
      disableOnInvalid: true,
      input: true,
      tableView: false,
    },
  ],
};

const form5 = {
  title: 'form5',
  name: 'form5',
  path: 'form5',
  type: 'form',
  display: 'form',
  components: [
    {
      label: 'generalInformation',
      tableView: false,
      key: 'generalInformation',
      type: 'container',
      input: true,
      components: [
        {
          title: 'Select here one entry',
          theme: 'primary',
          collapsible: false,
          key: 'sectionOutsourcingSupervisedEntites',
          type: 'panel',
          label: 'Outsourcing supervised entities',
          tableView: false,
          input: false,
          components: [
            {
              label: 'Select the only option here',
              widget: 'choicesjs',
              description: '<br>',
              tableView: true,
              multiple: true,
              dataSrc: 'json',
              data: {
                json: [
                  {
                    id: 6256,
                    longName: 'Bank_DE',
                    leiCode: 'LEI6256',
                    countryCode: 'DE',
                  },
                ],
              },
              template: '<span>{{ item.longName }} [{{item.countryCode}}] {{item.leiCode}}</span>',
              customOptions: {
                searchResultLimit: 100,
                fuseOptions: {
                  threshold: 0.1,
                  distance: 9000,
                },
              },
              validate: {
                required: true,
              },
              key: 'listSupervisedEntitiesCovered',
              type: 'select',
              input: true,
              searchThreshold: 0.3,
            },
          ],
          path: 'section12OutsourcingSupervisedEntities',
        },
        {
          title: '1.5 Country-specific questions',
          collapsible: false,
          key: 'countrySpecificQuestionsPanel',
          customConditional:
            'var listSupervisedEntitiesCovered = _.get(data, "generalInformation.listSupervisedEntitiesCovered", []);\r\nshow = listSupervisedEntitiesCovered.some(entity => (entity.countryCode == "LU") || (entity.countryCode == "DE"));',
          type: 'panel',
          label: 'Panel',
          input: false,
          tableView: false,
          components: [
            {
              label: 'DE specific questions',
              tableView: false,
              key: 'deSpecific',
              customConditional:
                'var listSupervisedEntitiesCovered = _.get(data, "generalInformation.listSupervisedEntitiesCovered", []);\r\nshow = listSupervisedEntitiesCovered.some(entity => entity.countryCode == "DE");',
              type: 'container',
              input: true,
              components: [
                {
                  title: 'Additional questions for DE entities',
                  collapsible: false,
                  key: 'panel',
                  type: 'panel',
                  label: 'Panel',
                  input: false,
                  tableView: false,
                  components: [
                    {
                      title: 'Sub-outsourcing',
                      collapsible: false,
                      key: 'suboutsourcing',
                      type: 'panel',
                      label: 'Panel',
                      input: false,
                      tableView: false,
                      components: [
                        {
                          label: 'Here select yes',
                          optionsLabelPosition: 'right',
                          customClass: 'tooltip-text-left',
                          inline: true,
                          tableView: false,
                          values: [
                            {
                              label: 'Yes',
                              value: 'yes',
                              shortcut: '',
                            },
                            {
                              label: 'No',
                              value: 'no',
                              shortcut: '',
                            },
                          ],
                          validate: {
                            required: true,
                          },
                          key: 'criticalPartsToBeOutsourcedSuboutsourcer',
                          type: 'radio',
                          labelWidth: 100,
                          input: true,
                        },
                        {
                          label: 'add a row, it will be removed upon save',
                          customClass: 'ml-3',
                          tableView: true,
                          templates: {
                            header:
                              '<div class="row">\r\n  <div class="col-sm-4"><strong>Name</strong></div>\r\n   <div class="col-sm-4"><strong>Location</strong></div>\r\n   <div class="col-sm-3"><strong>Location of the data</strong></div>\r\n   <div class="col-sm-1"></div>\r\n</div>',
                            row: '<div class="row">\r\n  <div class="col-sm-4">\r\n   {{ _.get(row, \'nameSuboutsourcer\', \'\') }}\r\n  </div>\r\n  <div class="col-sm-4">\r\n   {{ _.get(row, \'locationSuboutsourcer.name\', \'\') }}\r\n  </div>\r\n  <div class="col-sm-3">\r\n   {{ _.get(row, \'locationDataSub.name\', \'\') }}\r\n  </div> \r\n  <div class="col-sm-1">\r\n  {% if (instance.options.readOnly) { %}\r\n    <div class="btn-group pull-right">\r\n      <div class="btn btn-default btn-light btn-sm editRow">\r\n        <i class="{{ iconClass(\'eye\') }}"></i>\r\n      </div>\r\n    </div>\r\n  {% } else { %}\r\n    <div class="btn-group pull-right">\r\n      <button class="btn btn-secondary btn-sm editRow" title = "Edit row">\r\n        <i class="{{ iconClass(\'edit\') }}"></i>\r\n      </button>\r\n      <button class="btn btn-danger btn-sm removeRow" title = "Delete row">\r\n        <i class="{{ iconClass(\'trash\') }}"></i>\r\n      </button>\r\n    </div>\r\n  {% } %}\r\n  </div>\r\n</div>',
                          },
                          addAnother: 'Add suboutsourcer',
                          modal: true,
                          saveRow: 'Close',
                          validate: {
                            required: true,
                          },
                          rowDrafts: false,
                          key: 'suboutsourcers',
                          conditional: {
                            show: true,
                            conjunction: 'all',
                            conditions: [
                              {
                                component:
                                  'generalInformation.deSpecific.criticalPartsToBeOutsourcedSuboutsourcer',
                                operator: 'isEqual',
                                value: 'yes',
                              },
                            ],
                          },
                          type: 'editgrid',
                          displayAsTable: false,
                          input: true,
                          components: [
                            {
                              title: 'Sub-outsourcer(s)',
                              theme: 'primary',
                              collapsible: false,
                              key: 'suboutsourcerS',
                              type: 'panel',
                              label: 'Panel',
                              input: false,
                              tableView: false,
                              components: [
                                {
                                  label: 'This edit grid row will disappear',
                                  applyMaskOn: 'change',
                                  tableView: true,
                                  validate: {
                                    required: true,
                                    maxLength: 100,
                                  },
                                  key: 'nameSuboutsourcer',
                                  type: 'textfield',
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
              ],
            },
          ],
        },
      ],
    },
    {
      label: 'Submit',
      action: 'saveState',
      showValidations: false,
      tableView: false,
      key: 'submit',
      type: 'button',
      input: true,
      state: 'draft',
    },
  ],
};

const form6 = {
  title: 'form6',
  name: 'form6',
  path: 'form6',
  type: 'form',
  display: 'form',
  components: [
    {
      label: 'Text Field',
      applyMaskOn: 'change',
      tableView: true,
      key: 'textField',
      type: 'textfield',
      input: true,
    },
    {
      label: 'Container',
      tableView: false,
      key: 'container',
      type: 'container',
      input: true,
      components: [
        {
          label: 'Edit Grid',
          tableView: false,
          rowDrafts: false,
          key: 'editGrid',
          logic: [
            {
              name: 'ret',
              trigger: {
                type: 'simple',
                simple: {
                  show: true,
                  conjunction: 'all',
                  conditions: [
                    {
                      component: 'textField',
                      operator: 'isEqual',
                      value: 'show',
                    },
                  ],
                },
              },
              actions: [
                {
                  name: 'ter',
                  type: 'value',
                  value: "value = [{number:1, textArea: 'test'}, {number:2, textArea: 'test2'}]",
                },
              ],
            },
          ],
          type: 'editgrid',
          displayAsTable: false,
          input: true,
          components: [
            {
              label: 'Number',
              applyMaskOn: 'change',
              mask: false,
              tableView: false,
              delimiter: false,
              requireDecimal: false,
              inputFormat: 'plain',
              truncateMultipleSpaces: false,
              key: 'number',
              type: 'number',
              input: true,
            },
            {
              label: 'Text Area',
              applyMaskOn: 'change',
              autoExpand: false,
              tableView: true,
              key: 'textArea',
              type: 'textarea',
              input: true,
            },
          ],
        },
      ],
    },
    {
      type: 'button',
      label: 'Submit',
      key: 'submit',
      disableOnInvalid: true,
      input: true,
      tableView: false,
    },
  ],
};

export default { form1, form2, form3, form4, form5, form6 };
