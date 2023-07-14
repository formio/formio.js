declare namespace _default {
    export { form };
    export { submission1 };
    export { submission2 };
    export { submission3 };
}
export default _default;
declare namespace form {
    const type: string;
    const components: (
        | {
              label: string;
              reorder: boolean;
              addAnotherPosition: string;
              defaultOpen: boolean;
              layoutFixed: boolean;
              enableRowGroups: boolean;
              initEmpty: boolean;
              tableView: boolean;
              defaultValue: {
                  textField: string;
              }[];
              key: string;
              type: string;
              input: boolean;
              components: {
                  collapsible: boolean;
                  key: string;
                  type: string;
                  label: string;
                  input: boolean;
                  tableView: boolean;
                  components: {
                      label: string;
                      tableView: boolean;
                      key: string;
                      type: string;
                      input: boolean;
                  }[];
              }[];
              disableOnInvalid?: undefined;
          }
        | {
              label: string;
              reorder: boolean;
              addAnotherPosition: string;
              defaultOpen: boolean;
              layoutFixed: boolean;
              enableRowGroups: boolean;
              initEmpty: boolean;
              tableView: boolean;
              defaultValue: {
                  textArea: string;
                  number: number;
              }[];
              key: string;
              type: string;
              input: boolean;
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
                        autoExpand?: undefined;
                    }
                  | {
                        label: string;
                        autoExpand: boolean;
                        tableView: boolean;
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
              defaultOpen?: undefined;
              layoutFixed?: undefined;
              enableRowGroups?: undefined;
              initEmpty?: undefined;
              defaultValue?: undefined;
              components?: undefined;
          }
    )[];
    const title: string;
    const display: string;
    const name: string;
    const path: string;
    const machineName: string;
}
declare namespace submission1 {
    namespace data {
        const dataGrid: never[];
        const dataGrid1: never[];
        const submit: boolean;
    }
}
declare namespace submission2 {
    export namespace data_1 {
        const dataGrid_1: {
            textField: string;
        }[];
        export { dataGrid_1 as dataGrid };
        const dataGrid1_1: {
            textArea: string;
            number: number;
        }[];
        export { dataGrid1_1 as dataGrid1 };
        const submit_1: boolean;
        export { submit_1 as submit };
    }
    export { data_1 as data };
}
declare namespace submission3 {
    export namespace data_2 {
        const dataGrid_2: {
            textField: string;
        }[];
        export { dataGrid_2 as dataGrid };
        const dataGrid1_2: {
            textArea: string;
            number: number;
        }[];
        export { dataGrid1_2 as dataGrid1 };
        const submit_2: boolean;
        export { submit_2 as submit };
    }
    export { data_2 as data };
}
