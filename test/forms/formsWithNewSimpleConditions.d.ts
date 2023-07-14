declare namespace _default {
    export { form1 };
    export { form2 };
    export { form3 };
    export { form4 };
    export { form5 };
}
export default _default;
declare namespace form1 {
    const title: string;
    const name: string;
    const path: string;
    const type: string;
    const display: string;
    const components: (
        | {
              label: string;
              tableView: boolean;
              key: string;
              conditional: {
                  show: boolean;
                  conjunction: string;
                  conditions: (
                      | {
                            component: string;
                            operator: string;
                            value: number;
                        }
                      | {
                            component: string;
                            operator: string;
                            value: string;
                        }
                      | {
                            component: string;
                            operator: string;
                            value?: undefined;
                        }
                  )[];
              };
              type: string;
              input: boolean;
              mask?: undefined;
              delimiter?: undefined;
              requireDecimal?: undefined;
              inputFormat?: undefined;
              truncateMultipleSpaces?: undefined;
              optionsLabelPosition?: undefined;
              inline?: undefined;
              values?: undefined;
              disableOnInvalid?: undefined;
          }
        | {
              label: string;
              mask: boolean;
              tableView: boolean;
              delimiter: boolean;
              requireDecimal: boolean;
              inputFormat: string;
              truncateMultipleSpaces: boolean;
              key: string;
              type: string;
              input: boolean;
              conditional?: undefined;
              optionsLabelPosition?: undefined;
              inline?: undefined;
              values?: undefined;
              disableOnInvalid?: undefined;
          }
        | {
              label: string;
              tableView: boolean;
              key: string;
              type: string;
              input: boolean;
              conditional?: undefined;
              mask?: undefined;
              delimiter?: undefined;
              requireDecimal?: undefined;
              inputFormat?: undefined;
              truncateMultipleSpaces?: undefined;
              optionsLabelPosition?: undefined;
              inline?: undefined;
              values?: undefined;
              disableOnInvalid?: undefined;
          }
        | {
              label: string;
              optionsLabelPosition: string;
              inline: boolean;
              tableView: boolean;
              values: {
                  label: string;
                  value: string;
                  shortcut: string;
              }[];
              key: string;
              type: string;
              input: boolean;
              conditional?: undefined;
              mask?: undefined;
              delimiter?: undefined;
              requireDecimal?: undefined;
              inputFormat?: undefined;
              truncateMultipleSpaces?: undefined;
              disableOnInvalid?: undefined;
          }
        | {
              type: string;
              label: string;
              key: string;
              disableOnInvalid: boolean;
              input: boolean;
              tableView: boolean;
              conditional?: undefined;
              mask?: undefined;
              delimiter?: undefined;
              requireDecimal?: undefined;
              inputFormat?: undefined;
              truncateMultipleSpaces?: undefined;
              optionsLabelPosition?: undefined;
              inline?: undefined;
              values?: undefined;
          }
    )[];
    const created: string;
    const modified: string;
    const machineName: string;
}
declare namespace form2 {
    const title_1: string;
    export { title_1 as title };
    const name_1: string;
    export { name_1 as name };
    const path_1: string;
    export { path_1 as path };
    const type_1: string;
    export { type_1 as type };
    const display_1: string;
    export { display_1 as display };
    const components_1: (
        | {
              label: string;
              tableView: boolean;
              key: string;
              conditional: {
                  show: boolean;
                  conjunction: string;
                  conditions: (
                      | {
                            component: string;
                            operator: string;
                            value: string;
                        }
                      | {
                            component: string;
                            operator: string;
                            value: number;
                        }
                      | {
                            component: string;
                            operator: string;
                            value?: undefined;
                        }
                      | {
                            component: string;
                            operator: string;
                            value: boolean;
                        }
                  )[];
              };
              type: string;
              input: boolean;
              hideInputLabels?: undefined;
              inputsLabelPosition?: undefined;
              useLocaleSettings?: undefined;
              fields?: undefined;
              mask?: undefined;
              spellcheck?: undefined;
              currency?: undefined;
              inputFormat?: undefined;
              truncateMultipleSpaces?: undefined;
              delimiter?: undefined;
              questions?: undefined;
              values?: undefined;
              multiple?: undefined;
              requireDecimal?: undefined;
              optionsLabelPosition?: undefined;
              inputType?: undefined;
              inline?: undefined;
              widget?: undefined;
              data?: undefined;
              dataSrc?: undefined;
              dataType?: undefined;
              valueProperty?: undefined;
              showValidations?: undefined;
              saveOnEnter?: undefined;
          }
        | {
              label: string;
              tableView: boolean;
              key: string;
              type: string;
              input: boolean;
              conditional?: undefined;
              hideInputLabels?: undefined;
              inputsLabelPosition?: undefined;
              useLocaleSettings?: undefined;
              fields?: undefined;
              mask?: undefined;
              spellcheck?: undefined;
              currency?: undefined;
              inputFormat?: undefined;
              truncateMultipleSpaces?: undefined;
              delimiter?: undefined;
              questions?: undefined;
              values?: undefined;
              multiple?: undefined;
              requireDecimal?: undefined;
              optionsLabelPosition?: undefined;
              inputType?: undefined;
              inline?: undefined;
              widget?: undefined;
              data?: undefined;
              dataSrc?: undefined;
              dataType?: undefined;
              valueProperty?: undefined;
              showValidations?: undefined;
              saveOnEnter?: undefined;
          }
        | {
              label: string;
              hideInputLabels: boolean;
              inputsLabelPosition: string;
              useLocaleSettings: boolean;
              tableView: boolean;
              fields: {
                  day: {
                      hide: boolean;
                  };
                  month: {
                      hide: boolean;
                  };
                  year: {
                      hide: boolean;
                  };
              };
              key: string;
              type: string;
              input: boolean;
              conditional?: undefined;
              mask?: undefined;
              spellcheck?: undefined;
              currency?: undefined;
              inputFormat?: undefined;
              truncateMultipleSpaces?: undefined;
              delimiter?: undefined;
              questions?: undefined;
              values?: undefined;
              multiple?: undefined;
              requireDecimal?: undefined;
              optionsLabelPosition?: undefined;
              inputType?: undefined;
              inline?: undefined;
              widget?: undefined;
              data?: undefined;
              dataSrc?: undefined;
              dataType?: undefined;
              valueProperty?: undefined;
              showValidations?: undefined;
              saveOnEnter?: undefined;
          }
        | {
              label: string;
              mask: boolean;
              spellcheck: boolean;
              tableView: boolean;
              currency: string;
              inputFormat: string;
              truncateMultipleSpaces: boolean;
              key: string;
              type: string;
              input: boolean;
              delimiter: boolean;
              conditional?: undefined;
              hideInputLabels?: undefined;
              inputsLabelPosition?: undefined;
              useLocaleSettings?: undefined;
              fields?: undefined;
              questions?: undefined;
              values?: undefined;
              multiple?: undefined;
              requireDecimal?: undefined;
              optionsLabelPosition?: undefined;
              inputType?: undefined;
              inline?: undefined;
              widget?: undefined;
              data?: undefined;
              dataSrc?: undefined;
              dataType?: undefined;
              valueProperty?: undefined;
              showValidations?: undefined;
              saveOnEnter?: undefined;
          }
        | {
              label: string;
              tableView: boolean;
              questions: {
                  label: string;
                  value: string;
                  tooltip: string;
              }[];
              values: {
                  label: string;
                  value: string;
                  tooltip: string;
              }[];
              key: string;
              type: string;
              input: boolean;
              conditional?: undefined;
              hideInputLabels?: undefined;
              inputsLabelPosition?: undefined;
              useLocaleSettings?: undefined;
              fields?: undefined;
              mask?: undefined;
              spellcheck?: undefined;
              currency?: undefined;
              inputFormat?: undefined;
              truncateMultipleSpaces?: undefined;
              delimiter?: undefined;
              multiple?: undefined;
              requireDecimal?: undefined;
              optionsLabelPosition?: undefined;
              inputType?: undefined;
              inline?: undefined;
              widget?: undefined;
              data?: undefined;
              dataSrc?: undefined;
              dataType?: undefined;
              valueProperty?: undefined;
              showValidations?: undefined;
              saveOnEnter?: undefined;
          }
        | {
              label: string;
              mask: boolean;
              tableView: boolean;
              multiple: boolean;
              delimiter: boolean;
              requireDecimal: boolean;
              inputFormat: string;
              truncateMultipleSpaces: boolean;
              key: string;
              type: string;
              input: boolean;
              conditional?: undefined;
              hideInputLabels?: undefined;
              inputsLabelPosition?: undefined;
              useLocaleSettings?: undefined;
              fields?: undefined;
              spellcheck?: undefined;
              currency?: undefined;
              questions?: undefined;
              values?: undefined;
              optionsLabelPosition?: undefined;
              inputType?: undefined;
              inline?: undefined;
              widget?: undefined;
              data?: undefined;
              dataSrc?: undefined;
              dataType?: undefined;
              valueProperty?: undefined;
              showValidations?: undefined;
              saveOnEnter?: undefined;
          }
        | {
              label: string;
              optionsLabelPosition: string;
              tableView: boolean;
              values: {
                  label: string;
                  value: string;
                  shortcut: string;
              }[];
              key: string;
              type: string;
              input: boolean;
              inputType: string;
              conditional?: undefined;
              hideInputLabels?: undefined;
              inputsLabelPosition?: undefined;
              useLocaleSettings?: undefined;
              fields?: undefined;
              mask?: undefined;
              spellcheck?: undefined;
              currency?: undefined;
              inputFormat?: undefined;
              truncateMultipleSpaces?: undefined;
              delimiter?: undefined;
              questions?: undefined;
              multiple?: undefined;
              requireDecimal?: undefined;
              inline?: undefined;
              widget?: undefined;
              data?: undefined;
              dataSrc?: undefined;
              dataType?: undefined;
              valueProperty?: undefined;
              showValidations?: undefined;
              saveOnEnter?: undefined;
          }
        | {
              label: string;
              optionsLabelPosition: string;
              inline: boolean;
              tableView: boolean;
              values: {
                  label: string;
                  value: string;
                  shortcut: string;
              }[];
              key: string;
              type: string;
              input: boolean;
              conditional?: undefined;
              hideInputLabels?: undefined;
              inputsLabelPosition?: undefined;
              useLocaleSettings?: undefined;
              fields?: undefined;
              mask?: undefined;
              spellcheck?: undefined;
              currency?: undefined;
              inputFormat?: undefined;
              truncateMultipleSpaces?: undefined;
              delimiter?: undefined;
              questions?: undefined;
              multiple?: undefined;
              requireDecimal?: undefined;
              inputType?: undefined;
              widget?: undefined;
              data?: undefined;
              dataSrc?: undefined;
              dataType?: undefined;
              valueProperty?: undefined;
              showValidations?: undefined;
              saveOnEnter?: undefined;
          }
        | {
              label: string;
              widget: string;
              tableView: boolean;
              data: {
                  values: {
                      label: string;
                      value: string;
                  }[];
              };
              key: string;
              type: string;
              input: boolean;
              conditional?: undefined;
              hideInputLabels?: undefined;
              inputsLabelPosition?: undefined;
              useLocaleSettings?: undefined;
              fields?: undefined;
              mask?: undefined;
              spellcheck?: undefined;
              currency?: undefined;
              inputFormat?: undefined;
              truncateMultipleSpaces?: undefined;
              delimiter?: undefined;
              questions?: undefined;
              values?: undefined;
              multiple?: undefined;
              requireDecimal?: undefined;
              optionsLabelPosition?: undefined;
              inputType?: undefined;
              inline?: undefined;
              dataSrc?: undefined;
              dataType?: undefined;
              valueProperty?: undefined;
              showValidations?: undefined;
              saveOnEnter?: undefined;
          }
        | {
              label: string;
              widget: string;
              tableView: boolean;
              dataSrc: string;
              data: {
                  custom: string;
                  values?: undefined;
              };
              dataType: string;
              valueProperty: string;
              key: string;
              type: string;
              input: boolean;
              conditional?: undefined;
              hideInputLabels?: undefined;
              inputsLabelPosition?: undefined;
              useLocaleSettings?: undefined;
              fields?: undefined;
              mask?: undefined;
              spellcheck?: undefined;
              currency?: undefined;
              inputFormat?: undefined;
              truncateMultipleSpaces?: undefined;
              delimiter?: undefined;
              questions?: undefined;
              values?: undefined;
              multiple?: undefined;
              requireDecimal?: undefined;
              optionsLabelPosition?: undefined;
              inputType?: undefined;
              inline?: undefined;
              showValidations?: undefined;
              saveOnEnter?: undefined;
          }
        | {
              label: string;
              showValidations: boolean;
              tableView: boolean;
              key: string;
              type: string;
              input: boolean;
              saveOnEnter: boolean;
              conditional?: undefined;
              hideInputLabels?: undefined;
              inputsLabelPosition?: undefined;
              useLocaleSettings?: undefined;
              fields?: undefined;
              mask?: undefined;
              spellcheck?: undefined;
              currency?: undefined;
              inputFormat?: undefined;
              truncateMultipleSpaces?: undefined;
              delimiter?: undefined;
              questions?: undefined;
              values?: undefined;
              multiple?: undefined;
              requireDecimal?: undefined;
              optionsLabelPosition?: undefined;
              inputType?: undefined;
              inline?: undefined;
              widget?: undefined;
              data?: undefined;
              dataSrc?: undefined;
              dataType?: undefined;
              valueProperty?: undefined;
          }
    )[];
    export { components_1 as components };
    const created_1: string;
    export { created_1 as created };
    const modified_1: string;
    export { modified_1 as modified };
    const machineName_1: string;
    export { machineName_1 as machineName };
}
declare namespace form3 {
    const title_2: string;
    export { title_2 as title };
    const name_2: string;
    export { name_2 as name };
    const path_2: string;
    export { path_2 as path };
    const type_2: string;
    export { type_2 as type };
    const display_2: string;
    export { display_2 as display };
    const components_2: (
        | {
              label: string;
              mask: boolean;
              tableView: boolean;
              delimiter: boolean;
              requireDecimal: boolean;
              inputFormat: string;
              truncateMultipleSpaces: boolean;
              key: string;
              type: string;
              input: boolean;
              optionsLabelPosition?: undefined;
              inline?: undefined;
              values?: undefined;
              logic?: undefined;
              disableOnInvalid?: undefined;
          }
        | {
              label: string;
              optionsLabelPosition: string;
              inline: boolean;
              tableView: boolean;
              values: {
                  label: string;
                  value: string;
                  shortcut: string;
              }[];
              key: string;
              type: string;
              input: boolean;
              mask?: undefined;
              delimiter?: undefined;
              requireDecimal?: undefined;
              inputFormat?: undefined;
              truncateMultipleSpaces?: undefined;
              logic?: undefined;
              disableOnInvalid?: undefined;
          }
        | {
              label: string;
              tableView: boolean;
              key: string;
              logic: {
                  name: string;
                  trigger: {
                      type: string;
                      simple: {
                          show: boolean;
                          conjunction: string;
                          conditions: (
                              | {
                                    component: string;
                                    operator: string;
                                    value: number;
                                }
                              | {
                                    component: string;
                                    operator: string;
                                    value: string;
                                }
                          )[];
                      };
                  };
                  actions: {
                      name: string;
                      type: string;
                      value: string;
                  }[];
              }[];
              type: string;
              input: boolean;
              mask?: undefined;
              delimiter?: undefined;
              requireDecimal?: undefined;
              inputFormat?: undefined;
              truncateMultipleSpaces?: undefined;
              optionsLabelPosition?: undefined;
              inline?: undefined;
              values?: undefined;
              disableOnInvalid?: undefined;
          }
        | {
              type: string;
              label: string;
              key: string;
              disableOnInvalid: boolean;
              input: boolean;
              tableView: boolean;
              mask?: undefined;
              delimiter?: undefined;
              requireDecimal?: undefined;
              inputFormat?: undefined;
              truncateMultipleSpaces?: undefined;
              optionsLabelPosition?: undefined;
              inline?: undefined;
              values?: undefined;
              logic?: undefined;
          }
    )[];
    export { components_2 as components };
    const created_2: string;
    export { created_2 as created };
    const modified_2: string;
    export { modified_2 as modified };
    const machineName_2: string;
    export { machineName_2 as machineName };
}
declare namespace form4 {
    const title_3: string;
    export { title_3 as title };
    const name_3: string;
    export { name_3 as name };
    const path_3: string;
    export { path_3 as path };
    const type_3: string;
    export { type_3 as type };
    const display_3: string;
    export { display_3 as display };
    const components_3: (
        | {
              label: string;
              reorder: boolean;
              addAnotherPosition: string;
              layoutFixed: boolean;
              enableRowGroups: boolean;
              initEmpty: boolean;
              tableView: boolean;
              defaultValue: {}[];
              key: string;
              type: string;
              input: boolean;
              components: (
                  | {
                        label: string;
                        mask: boolean;
                        tableView: boolean;
                        delimiter: boolean;
                        requireDecimal: boolean;
                        inputFormat: string;
                        truncateMultipleSpaces: boolean;
                        key: string;
                        type: string;
                        input: boolean;
                        conditional?: undefined;
                    }
                  | {
                        label: string;
                        tableView: boolean;
                        key: string;
                        conditional: {
                            show: boolean;
                            conjunction: string;
                            conditions: {
                                component: string;
                                operator: string;
                                value: number;
                            }[];
                        };
                        type: string;
                        input: boolean;
                        mask?: undefined;
                        delimiter?: undefined;
                        requireDecimal?: undefined;
                        inputFormat?: undefined;
                        truncateMultipleSpaces?: undefined;
                    }
              )[];
              disableOnInvalid?: undefined;
          }
        | {
              type: string;
              label: string;
              key: string;
              disableOnInvalid: boolean;
              input: boolean;
              tableView: boolean;
              reorder?: undefined;
              addAnotherPosition?: undefined;
              layoutFixed?: undefined;
              enableRowGroups?: undefined;
              initEmpty?: undefined;
              defaultValue?: undefined;
              components?: undefined;
          }
    )[];
    export { components_3 as components };
    const created_3: string;
    export { created_3 as created };
    const modified_3: string;
    export { modified_3 as modified };
    const machineName_3: string;
    export { machineName_3 as machineName };
}
declare namespace form5 {
    const title_4: string;
    export { title_4 as title };
    const name_4: string;
    export { name_4 as name };
    const path_4: string;
    export { path_4 as path };
    const type_4: string;
    export { type_4 as type };
    const display_4: string;
    export { display_4 as display };
    const components_4: (
        | {
              label: string;
              tableView: boolean;
              key: string;
              conditional: {
                  show: boolean;
                  conjunction: string;
                  conditions: (
                      | {
                            component: string;
                            operator: string;
                            value: string;
                        }
                      | {
                            component: string;
                            operator: string;
                            value: number;
                        }
                      | {
                            component: string;
                            operator: string;
                            value?: undefined;
                        }
                  )[];
              };
              type: string;
              input: boolean;
              datePicker?: undefined;
              enableMinDateInput?: undefined;
              enableMaxDateInput?: undefined;
              widget?: undefined;
              hideInputLabels?: undefined;
              inputsLabelPosition?: undefined;
              useLocaleSettings?: undefined;
              fields?: undefined;
              defaultValue?: undefined;
              mask?: undefined;
              delimiter?: undefined;
              requireDecimal?: undefined;
              inputFormat?: undefined;
              truncateMultipleSpaces?: undefined;
              spellcheck?: undefined;
              currency?: undefined;
              data?: undefined;
              optionsLabelPosition?: undefined;
              inline?: undefined;
              values?: undefined;
              autoExpand?: undefined;
              multiple?: undefined;
              showValidations?: undefined;
          }
        | {
              label: string;
              tableView: boolean;
              datePicker: {
                  disableWeekends: boolean;
                  disableWeekdays: boolean;
              };
              enableMinDateInput: boolean;
              enableMaxDateInput: boolean;
              key: string;
              type: string;
              input: boolean;
              widget: {
                  type: string;
                  displayInTimezone: string;
                  locale: string;
                  useLocaleSettings: boolean;
                  allowInput: boolean;
                  mode: string;
                  enableTime: boolean;
                  noCalendar: boolean;
                  format: string;
                  hourIncrement: number;
                  minuteIncrement: number;
                  time_24hr: boolean;
                  minDate: null;
                  disableWeekends: boolean;
                  disableWeekdays: boolean;
                  maxDate: null;
              };
              conditional?: undefined;
              hideInputLabels?: undefined;
              inputsLabelPosition?: undefined;
              useLocaleSettings?: undefined;
              fields?: undefined;
              defaultValue?: undefined;
              mask?: undefined;
              delimiter?: undefined;
              requireDecimal?: undefined;
              inputFormat?: undefined;
              truncateMultipleSpaces?: undefined;
              spellcheck?: undefined;
              currency?: undefined;
              data?: undefined;
              optionsLabelPosition?: undefined;
              inline?: undefined;
              values?: undefined;
              autoExpand?: undefined;
              multiple?: undefined;
              showValidations?: undefined;
          }
        | {
              label: string;
              hideInputLabels: boolean;
              inputsLabelPosition: string;
              useLocaleSettings: boolean;
              tableView: boolean;
              fields: {
                  day: {
                      hide: boolean;
                  };
                  month: {
                      hide: boolean;
                  };
                  year: {
                      hide: boolean;
                  };
              };
              key: string;
              type: string;
              input: boolean;
              defaultValue: string;
              conditional?: undefined;
              datePicker?: undefined;
              enableMinDateInput?: undefined;
              enableMaxDateInput?: undefined;
              widget?: undefined;
              mask?: undefined;
              delimiter?: undefined;
              requireDecimal?: undefined;
              inputFormat?: undefined;
              truncateMultipleSpaces?: undefined;
              spellcheck?: undefined;
              currency?: undefined;
              data?: undefined;
              optionsLabelPosition?: undefined;
              inline?: undefined;
              values?: undefined;
              autoExpand?: undefined;
              multiple?: undefined;
              showValidations?: undefined;
          }
        | {
              label: string;
              tableView: boolean;
              key: string;
              type: string;
              input: boolean;
              conditional?: undefined;
              datePicker?: undefined;
              enableMinDateInput?: undefined;
              enableMaxDateInput?: undefined;
              widget?: undefined;
              hideInputLabels?: undefined;
              inputsLabelPosition?: undefined;
              useLocaleSettings?: undefined;
              fields?: undefined;
              defaultValue?: undefined;
              mask?: undefined;
              delimiter?: undefined;
              requireDecimal?: undefined;
              inputFormat?: undefined;
              truncateMultipleSpaces?: undefined;
              spellcheck?: undefined;
              currency?: undefined;
              data?: undefined;
              optionsLabelPosition?: undefined;
              inline?: undefined;
              values?: undefined;
              autoExpand?: undefined;
              multiple?: undefined;
              showValidations?: undefined;
          }
        | {
              label: string;
              mask: boolean;
              tableView: boolean;
              delimiter: boolean;
              requireDecimal: boolean;
              inputFormat: string;
              truncateMultipleSpaces: boolean;
              key: string;
              type: string;
              input: boolean;
              conditional?: undefined;
              datePicker?: undefined;
              enableMinDateInput?: undefined;
              enableMaxDateInput?: undefined;
              widget?: undefined;
              hideInputLabels?: undefined;
              inputsLabelPosition?: undefined;
              useLocaleSettings?: undefined;
              fields?: undefined;
              defaultValue?: undefined;
              spellcheck?: undefined;
              currency?: undefined;
              data?: undefined;
              optionsLabelPosition?: undefined;
              inline?: undefined;
              values?: undefined;
              autoExpand?: undefined;
              multiple?: undefined;
              showValidations?: undefined;
          }
        | {
              label: string;
              mask: boolean;
              spellcheck: boolean;
              tableView: boolean;
              currency: string;
              inputFormat: string;
              truncateMultipleSpaces: boolean;
              key: string;
              type: string;
              input: boolean;
              delimiter: boolean;
              conditional?: undefined;
              datePicker?: undefined;
              enableMinDateInput?: undefined;
              enableMaxDateInput?: undefined;
              widget?: undefined;
              hideInputLabels?: undefined;
              inputsLabelPosition?: undefined;
              useLocaleSettings?: undefined;
              fields?: undefined;
              defaultValue?: undefined;
              requireDecimal?: undefined;
              data?: undefined;
              optionsLabelPosition?: undefined;
              inline?: undefined;
              values?: undefined;
              autoExpand?: undefined;
              multiple?: undefined;
              showValidations?: undefined;
          }
        | {
              label: string;
              widget: string;
              tableView: boolean;
              data: {
                  values: {
                      label: string;
                      value: string;
                  }[];
              };
              key: string;
              type: string;
              input: boolean;
              conditional?: undefined;
              datePicker?: undefined;
              enableMinDateInput?: undefined;
              enableMaxDateInput?: undefined;
              hideInputLabels?: undefined;
              inputsLabelPosition?: undefined;
              useLocaleSettings?: undefined;
              fields?: undefined;
              defaultValue?: undefined;
              mask?: undefined;
              delimiter?: undefined;
              requireDecimal?: undefined;
              inputFormat?: undefined;
              truncateMultipleSpaces?: undefined;
              spellcheck?: undefined;
              currency?: undefined;
              optionsLabelPosition?: undefined;
              inline?: undefined;
              values?: undefined;
              autoExpand?: undefined;
              multiple?: undefined;
              showValidations?: undefined;
          }
        | {
              label: string;
              optionsLabelPosition: string;
              inline: boolean;
              tableView: boolean;
              values: {
                  label: string;
                  value: string;
                  shortcut: string;
              }[];
              key: string;
              type: string;
              input: boolean;
              conditional?: undefined;
              datePicker?: undefined;
              enableMinDateInput?: undefined;
              enableMaxDateInput?: undefined;
              widget?: undefined;
              hideInputLabels?: undefined;
              inputsLabelPosition?: undefined;
              useLocaleSettings?: undefined;
              fields?: undefined;
              defaultValue?: undefined;
              mask?: undefined;
              delimiter?: undefined;
              requireDecimal?: undefined;
              inputFormat?: undefined;
              truncateMultipleSpaces?: undefined;
              spellcheck?: undefined;
              currency?: undefined;
              data?: undefined;
              autoExpand?: undefined;
              multiple?: undefined;
              showValidations?: undefined;
          }
        | {
              label: string;
              autoExpand: boolean;
              tableView: boolean;
              key: string;
              type: string;
              input: boolean;
              conditional?: undefined;
              datePicker?: undefined;
              enableMinDateInput?: undefined;
              enableMaxDateInput?: undefined;
              widget?: undefined;
              hideInputLabels?: undefined;
              inputsLabelPosition?: undefined;
              useLocaleSettings?: undefined;
              fields?: undefined;
              defaultValue?: undefined;
              mask?: undefined;
              delimiter?: undefined;
              requireDecimal?: undefined;
              inputFormat?: undefined;
              truncateMultipleSpaces?: undefined;
              spellcheck?: undefined;
              currency?: undefined;
              data?: undefined;
              optionsLabelPosition?: undefined;
              inline?: undefined;
              values?: undefined;
              multiple?: undefined;
              showValidations?: undefined;
          }
        | {
              label: string;
              mask: boolean;
              tableView: boolean;
              multiple: boolean;
              delimiter: boolean;
              requireDecimal: boolean;
              inputFormat: string;
              truncateMultipleSpaces: boolean;
              key: string;
              type: string;
              input: boolean;
              defaultValue: null[];
              conditional?: undefined;
              datePicker?: undefined;
              enableMinDateInput?: undefined;
              enableMaxDateInput?: undefined;
              widget?: undefined;
              hideInputLabels?: undefined;
              inputsLabelPosition?: undefined;
              useLocaleSettings?: undefined;
              fields?: undefined;
              spellcheck?: undefined;
              currency?: undefined;
              data?: undefined;
              optionsLabelPosition?: undefined;
              inline?: undefined;
              values?: undefined;
              autoExpand?: undefined;
              showValidations?: undefined;
          }
        | {
              label: string;
              showValidations: boolean;
              tableView: boolean;
              key: string;
              type: string;
              input: boolean;
              conditional?: undefined;
              datePicker?: undefined;
              enableMinDateInput?: undefined;
              enableMaxDateInput?: undefined;
              widget?: undefined;
              hideInputLabels?: undefined;
              inputsLabelPosition?: undefined;
              useLocaleSettings?: undefined;
              fields?: undefined;
              defaultValue?: undefined;
              mask?: undefined;
              delimiter?: undefined;
              requireDecimal?: undefined;
              inputFormat?: undefined;
              truncateMultipleSpaces?: undefined;
              spellcheck?: undefined;
              currency?: undefined;
              data?: undefined;
              optionsLabelPosition?: undefined;
              inline?: undefined;
              values?: undefined;
              autoExpand?: undefined;
              multiple?: undefined;
          }
    )[];
    export { components_4 as components };
    const created_4: string;
    export { created_4 as created };
    const modified_4: string;
    export { modified_4 as modified };
    const machineName_4: string;
    export { machineName_4 as machineName };
}
