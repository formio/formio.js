declare namespace _default {
    const type: string;
    const components: (
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
              selectThreshold: number;
              key: string;
              type: string;
              indexeddb: {
                  filter: {};
              };
              input: boolean;
              collapsible?: undefined;
              conditional?: undefined;
              components?: undefined;
              action?: undefined;
              showValidations?: undefined;
              theme?: undefined;
              disableOnInvalid?: undefined;
          }
        | {
              collapsible: boolean;
              key: string;
              conditional: {
                  show: boolean;
                  when: string;
                  eq: string;
              };
              type: string;
              label: string;
              input: boolean;
              tableView: boolean;
              components: (
                  | {
                        label: string;
                        tableView: boolean;
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
                    }
              )[];
              widget?: undefined;
              data?: undefined;
              selectThreshold?: undefined;
              indexeddb?: undefined;
              action?: undefined;
              showValidations?: undefined;
              theme?: undefined;
              disableOnInvalid?: undefined;
          }
        | {
              label: string;
              action: string;
              showValidations: boolean;
              theme: string;
              tableView: boolean;
              key: string;
              type: string;
              input: boolean;
              widget?: undefined;
              data?: undefined;
              selectThreshold?: undefined;
              indexeddb?: undefined;
              collapsible?: undefined;
              conditional?: undefined;
              components?: undefined;
              disableOnInvalid?: undefined;
          }
        | {
              type: string;
              label: string;
              key: string;
              disableOnInvalid: boolean;
              input: boolean;
              tableView: boolean;
              widget?: undefined;
              data?: undefined;
              selectThreshold?: undefined;
              indexeddb?: undefined;
              collapsible?: undefined;
              conditional?: undefined;
              components?: undefined;
              action?: undefined;
              showValidations?: undefined;
              theme?: undefined;
          }
    )[];
    const title: string;
    const display: string;
}
export default _default;
