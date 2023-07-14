declare namespace _default {
    const type: string;
    const tags: never[];
    const components: (
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
              components?: undefined;
              useOriginalRevision?: undefined;
              display?: undefined;
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
              conditional: {
                  show: boolean;
                  when: string;
                  eq: string;
              };
              type: string;
              input: boolean;
              components?: undefined;
              useOriginalRevision?: undefined;
              display?: undefined;
              disableOnInvalid?: undefined;
          }
        | {
              label: string;
              tableView: boolean;
              components: (
                  | {
                        title: string;
                        label: string;
                        type: string;
                        key: string;
                        components: {
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
                        }[];
                        input: boolean;
                        tableView: boolean;
                        breadcrumbClickable?: undefined;
                        buttonSettings?: undefined;
                        collapsible?: undefined;
                        conditional?: undefined;
                    }
                  | {
                        title: string;
                        breadcrumbClickable: boolean;
                        buttonSettings: {
                            previous: boolean;
                            cancel: boolean;
                            next: boolean;
                        };
                        collapsible: boolean;
                        key: string;
                        type: string;
                        label: string;
                        input: boolean;
                        tableView: boolean;
                        components: (
                            | {
                                  label: string;
                                  inputType: string;
                                  tableView: boolean;
                                  key: string;
                                  type: string;
                                  name: string;
                                  value: string;
                                  input: boolean;
                                  defaultValue: boolean;
                                  reorder?: undefined;
                                  addAnotherPosition?: undefined;
                                  defaultOpen?: undefined;
                                  layoutFixed?: undefined;
                                  enableRowGroups?: undefined;
                                  initEmpty?: undefined;
                                  hideLabel?: undefined;
                                  components?: undefined;
                              }
                            | {
                                  label: string;
                                  reorder: boolean;
                                  addAnotherPosition: string;
                                  defaultOpen: boolean;
                                  layoutFixed: boolean;
                                  enableRowGroups: boolean;
                                  initEmpty: boolean;
                                  hideLabel: boolean;
                                  tableView: boolean;
                                  defaultValue: {
                                      textField: string;
                                  }[];
                                  key: string;
                                  customConditional: string;
                                  type: string;
                                  input: boolean;
                                  components: (
                                      | {
                                            label: string;
                                            tableView: boolean;
                                            validate: {
                                                required: boolean;
                                            };
                                            key: string;
                                            type: string;
                                            input: boolean;
                                            mask?: undefined;
                                            spellcheck?: undefined;
                                            delimiter?: undefined;
                                            requireDecimal?: undefined;
                                            inputFormat?: undefined;
                                        }
                                      | {
                                            label: string;
                                            mask: boolean;
                                            spellcheck: boolean;
                                            tableView: boolean;
                                            delimiter: boolean;
                                            requireDecimal: boolean;
                                            inputFormat: string;
                                            validate: {
                                                required: boolean;
                                            };
                                            key: string;
                                            type: string;
                                            input: boolean;
                                        }
                                  )[];
                                  inputType?: undefined;
                                  name?: undefined;
                                  value?: undefined;
                              }
                        )[];
                        conditional?: undefined;
                    }
                  | {
                        title: string;
                        breadcrumbClickable: boolean;
                        buttonSettings: {
                            previous: boolean;
                            cancel: boolean;
                            next: boolean;
                        };
                        collapsible: boolean;
                        key: string;
                        conditional: {
                            show: boolean;
                            when: string;
                            eq: string;
                        };
                        type: string;
                        label: string;
                        components: {
                            label: string;
                            tableView: boolean;
                            key: string;
                            type: string;
                            input: boolean;
                        }[];
                        input: boolean;
                        tableView: boolean;
                    }
              )[];
              useOriginalRevision: boolean;
              key: string;
              display: string;
              conditional: {
                  show: boolean;
                  when: string;
                  eq: string;
              };
              type: string;
              input: boolean;
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
              optionsLabelPosition?: undefined;
              inline?: undefined;
              values?: undefined;
              conditional?: undefined;
              components?: undefined;
              useOriginalRevision?: undefined;
              display?: undefined;
          }
    )[];
    const title: string;
    const display: string;
    const name: string;
    const path: string;
}
export default _default;
