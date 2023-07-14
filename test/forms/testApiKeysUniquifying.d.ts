declare namespace _default {
    const type: string;
    const components: (
        | {
              label: string;
              tableView: boolean;
              key: string;
              type: string;
              input: boolean;
              components: {
                  label: string;
                  tableView: boolean;
                  rowDrafts: boolean;
                  key: string;
                  type: string;
                  displayAsTable: boolean;
                  input: boolean;
                  components: {
                      label: string;
                      columns: {
                          components: {
                              label: string;
                              tableView: boolean;
                              key: string;
                              type: string;
                              input: boolean;
                          }[];
                          width: number;
                          offset: number;
                          push: number;
                          pull: number;
                          size: string;
                          currentWidth: number;
                      }[];
                      key: string;
                      type: string;
                      input: boolean;
                      tableView: boolean;
                  }[];
              }[];
              collapsible?: undefined;
              disableOnInvalid?: undefined;
          }
        | {
              collapsible: boolean;
              key: string;
              type: string;
              label: string;
              input: boolean;
              tableView: boolean;
              components: {
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
                            key: string;
                            type: string;
                            label: string;
                            input: boolean;
                            tableView: boolean;
                            components: {
                                label: string;
                                columns: {
                                    components: {
                                        label: string;
                                        tableView: boolean;
                                        key: string;
                                        type: string;
                                        input: boolean;
                                    }[];
                                    width: number;
                                    offset: number;
                                    push: number;
                                    pull: number;
                                    size: string;
                                    currentWidth: number;
                                }[];
                                key: string;
                                type: string;
                                input: boolean;
                                tableView: boolean;
                            }[];
                            mask?: undefined;
                            delimiter?: undefined;
                            requireDecimal?: undefined;
                            inputFormat?: undefined;
                            truncateMultipleSpaces?: undefined;
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
                            components?: undefined;
                        }
                  )[];
              }[];
              disableOnInvalid?: undefined;
          }
        | {
              type: string;
              label: string;
              key: string;
              disableOnInvalid: boolean;
              input: boolean;
              tableView: boolean;
              components?: undefined;
              collapsible?: undefined;
          }
    )[];
    const title: string;
    const display: string;
}
export default _default;
