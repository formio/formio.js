declare namespace _default {
    const type: string;
    const components: (
        | {
              title: string;
              label: string;
              type: string;
              key: string;
              components: (
                  | {
                        label: string;
                        mask: boolean;
                        spellcheck: boolean;
                        tableView: boolean;
                        delimiter: boolean;
                        requireDecimal: boolean;
                        inputFormat: string;
                        key: string;
                        type: string;
                        input: boolean;
                        components?: undefined;
                    }
                  | {
                        label: string;
                        tableView: boolean;
                        components: {
                            type: string;
                            components: (
                                | {
                                      label: string;
                                      autoExpand: boolean;
                                      tableView: boolean;
                                      key: string;
                                      type: string;
                                      input: boolean;
                                      disableOnInvalid?: undefined;
                                  }
                                | {
                                      type: string;
                                      label: string;
                                      key: string;
                                      disableOnInvalid: boolean;
                                      input: boolean;
                                      tableView: boolean;
                                      autoExpand?: undefined;
                                  }
                            )[];
                            title: string;
                            display: string;
                            name: string;
                            path: string;
                        }[];
                        key: string;
                        type: string;
                        input: boolean;
                        mask?: undefined;
                        spellcheck?: undefined;
                        delimiter?: undefined;
                        requireDecimal?: undefined;
                        inputFormat?: undefined;
                    }
              )[];
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
    const title: string;
    const display: string;
    const name: string;
    const path: string;
}
export default _default;
