declare namespace _default {
    const _id: string;
    const type: string;
    const components: (
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
              disableOnInvalid?: undefined;
          }
        | {
              type: string;
              label: string;
              key: string;
              disableOnInvalid: boolean;
              input: boolean;
              tableView: boolean;
              hideInputLabels?: undefined;
              inputsLabelPosition?: undefined;
              useLocaleSettings?: undefined;
              fields?: undefined;
              defaultValue?: undefined;
          }
    )[];
    const title: string;
    const display: string;
    const controller: string;
    const name: string;
    const path: string;
}
export default _default;
