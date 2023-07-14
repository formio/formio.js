declare namespace _default {
    const type: string;
    const tags: never[];
    const components: (
        | {
              title: string;
              label: string;
              type: string;
              key: string;
              components: {
                  label: string;
                  tableView: boolean;
                  key: string;
                  type: string;
                  input: boolean;
                  defaultValue: boolean;
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
              conditional: {
                  show: boolean;
                  when: string;
                  eq: string;
              };
              type: string;
              label: string;
              components: {
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
              }[];
              input: boolean;
              tableView: boolean;
          }
    )[];
    const title: string;
    const display: string;
    const name: string;
    const path: string;
    const machineName: string;
}
export default _default;
