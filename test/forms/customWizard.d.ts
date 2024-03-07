declare namespace _default {
    const type: string;
    const components: (
        | {
              title: string;
              breadcrumbClickable: boolean;
              buttonSettings: {
                  previous: boolean;
                  cancel: boolean;
                  next: boolean;
              };
              scrollToTop: boolean;
              collapsible: boolean;
              key: string;
              type: string;
              label: string;
              components: (
                  | {
                        label: string;
                        tableView: boolean;
                        protected: boolean;
                        key: string;
                        type: string;
                        input: boolean;
                        columns?: undefined;
                    }
                  | {
                        label: string;
                        columns: {
                            components: {
                                label: string;
                                action: string;
                                showValidations: boolean;
                                theme: string;
                                block: boolean;
                                tableView: boolean;
                                key: string;
                                type: string;
                                input: boolean;
                                event: string;
                                hideOnChildrenHidden: boolean;
                            }[];
                            width: number;
                            offset: number;
                            push: number;
                            pull: number;
                            size: string;
                        }[];
                        key: string;
                        type: string;
                        input: boolean;
                        tableView: boolean;
                        protected?: undefined;
                    }
              )[];
              input: boolean;
              tableView: boolean;
          }
        | {
              title: string;
              breadcrumbClickable: boolean;
              buttonSettings: {
                  previous: boolean;
                  cancel: boolean;
                  next: boolean;
              };
              scrollToTop: boolean;
              collapsible: boolean;
              key: string;
              type: string;
              label: string;
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
                        columns?: undefined;
                    }
                  | {
                        label: string;
                        columns: (
                            | {
                                  components: {
                                      label: string;
                                      action: string;
                                      showValidations: boolean;
                                      block: boolean;
                                      tableView: boolean;
                                      key: string;
                                      type: string;
                                      input: boolean;
                                      event: string;
                                      hideOnChildrenHidden: boolean;
                                  }[];
                                  width: number;
                                  offset: number;
                                  push: number;
                                  pull: number;
                                  size: string;
                              }
                            | {
                                  components: {
                                      label: string;
                                      action: string;
                                      showValidations: boolean;
                                      theme: string;
                                      block: boolean;
                                      tableView: boolean;
                                      key: string;
                                      type: string;
                                      input: boolean;
                                      event: string;
                                      hideOnChildrenHidden: boolean;
                                  }[];
                                  width: number;
                                  offset: number;
                                  push: number;
                                  pull: number;
                                  size: string;
                              }
                        )[];
                        key: string;
                        type: string;
                        input: boolean;
                        tableView: boolean;
                        mask?: undefined;
                        spellcheck?: undefined;
                        delimiter?: undefined;
                        requireDecimal?: undefined;
                        inputFormat?: undefined;
                    }
              )[];
              input: boolean;
              tableView: boolean;
          }
        | {
              title: string;
              breadcrumbClickable: boolean;
              buttonSettings: {
                  previous: boolean;
                  cancel: boolean;
                  next: boolean;
              };
              scrollToTop: boolean;
              collapsible: boolean;
              key: string;
              type: string;
              label: string;
              components: (
                  | {
                        label: string;
                        autoExpand: boolean;
                        tableView: boolean;
                        key: string;
                        type: string;
                        input: boolean;
                        columns?: undefined;
                    }
                  | {
                        label: string;
                        columns: (
                            | {
                                  components: {
                                      label: string;
                                      action: string;
                                      showValidations: boolean;
                                      block: boolean;
                                      tableView: boolean;
                                      key: string;
                                      type: string;
                                      input: boolean;
                                      event: string;
                                      hideOnChildrenHidden: boolean;
                                  }[];
                                  width: number;
                                  offset: number;
                                  push: number;
                                  pull: number;
                                  size: string;
                              }
                            | {
                                  components: {
                                      label: string;
                                      action: string;
                                      showValidations: boolean;
                                      theme: string;
                                      block: boolean;
                                      tableView: boolean;
                                      key: string;
                                      type: string;
                                      input: boolean;
                                      event: string;
                                  }[];
                                  width: number;
                                  offset: number;
                                  push: number;
                                  pull: number;
                                  size: string;
                              }
                        )[];
                        key: string;
                        type: string;
                        input: boolean;
                        tableView: boolean;
                        autoExpand?: undefined;
                    }
              )[];
              input: boolean;
              tableView: boolean;
          }
    )[];
    const revisions: string;
    const _vid: number;
    const title: string;
    const display: string;
    const name: string;
    const path: string;
}
export default _default;
