declare namespace _default {
    const type: string;
    const components: (
        | {
              label: string;
              optionsLabelPosition: string;
              values: {
                  value: string;
                  label: string;
                  shortcut: string;
              }[];
              inline: boolean;
              mask: boolean;
              tableView: boolean;
              alwaysEnabled: boolean;
              type: string;
              input: boolean;
              key: string;
              defaultValue: string;
              conditional: {
                  show: string;
                  when?: undefined;
                  eq?: undefined;
              };
              properties: {};
              encrypted: boolean;
              tags?: undefined;
              hideLabel?: undefined;
              submit?: undefined;
              components?: undefined;
              theme?: undefined;
          }
        | {
              input: boolean;
              tableView: boolean;
              key: string;
              label: string;
              type: string;
              tags: never[];
              conditional: {
                  show: string;
                  when: string;
                  eq: string;
              };
              properties: {};
              hideLabel: boolean;
              submit: boolean;
              components: {
                  input: boolean;
                  key: string;
                  label: string;
                  validate: {
                      required: boolean;
                      customMessage: string;
                      json: string;
                  };
                  type: string;
              }[];
              optionsLabelPosition?: undefined;
              values?: undefined;
              inline?: undefined;
              mask?: undefined;
              alwaysEnabled?: undefined;
              defaultValue?: undefined;
              encrypted?: undefined;
              theme?: undefined;
          }
        | {
              input: boolean;
              label: string;
              tableView: boolean;
              key: string;
              theme: string;
              type: string;
              optionsLabelPosition?: undefined;
              values?: undefined;
              inline?: undefined;
              mask?: undefined;
              alwaysEnabled?: undefined;
              defaultValue?: undefined;
              conditional?: undefined;
              properties?: undefined;
              encrypted?: undefined;
              tags?: undefined;
              hideLabel?: undefined;
              submit?: undefined;
              components?: undefined;
          }
    )[];
    const title: string;
    const display: string;
}
export default _default;
