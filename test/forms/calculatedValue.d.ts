declare namespace _default {
    const type: string;
    const owner: string;
    const components: (
        | {
              title: string;
              breadcrumbClickable: boolean;
              buttonSettings: {
                  previous: boolean;
                  cancel: boolean;
                  next: boolean;
              };
              collapsible: boolean;
              alwaysEnabled: boolean;
              tableView: boolean;
              key: string;
              type: string;
              label: string;
              components: {
                  legend: string;
                  alwaysEnabled: boolean;
                  tableView: boolean;
                  key: string;
                  type: string;
                  label: string;
                  input: boolean;
                  components: (
                      | {
                            label: string;
                            mask: boolean;
                            alwaysEnabled: boolean;
                            tableView: boolean;
                            delimiter: boolean;
                            requireDecimal: boolean;
                            inputFormat: string;
                            key: string;
                            type: string;
                            input: boolean;
                        }
                      | {
                            label: string;
                            mask: boolean;
                            alwaysEnabled: boolean;
                            tableView: boolean;
                            delimiter: boolean;
                            requireDecimal: boolean;
                            inputFormat: string;
                            calculateValue: string;
                            key: string;
                            type: string;
                            input: boolean;
                        }
                  )[];
                  path: string;
              }[];
              input: boolean;
              showValidations?: undefined;
          }
        | {
              label: string;
              showValidations: boolean;
              tableView: boolean;
              key: string;
              type: string;
              input: boolean;
              title?: undefined;
              breadcrumbClickable?: undefined;
              buttonSettings?: undefined;
              collapsible?: undefined;
              alwaysEnabled?: undefined;
              components?: undefined;
          }
    )[];
    const title: string;
    const display: string;
}
export default _default;
