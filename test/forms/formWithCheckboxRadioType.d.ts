declare namespace _default {
    const title: string;
    const name: string;
    const path: string;
    const type: string;
    const display: string;
    const components: (
        | {
              label: string;
              inputType: string;
              tableView: boolean;
              defaultValue: boolean;
              key: string;
              type: string;
              name: string;
              value: string;
              input: boolean;
              radio: boolean;
          }
        | {
              label: string;
              inputType: string;
              tableView: boolean;
              defaultValue: boolean;
              key: string;
              type: string;
              name: string;
              value: string;
              input: boolean;
              radio?: undefined;
          }
        | {
              label: string;
              tableView: boolean;
              key: string;
              type: string;
              input: boolean;
              inputType?: undefined;
              defaultValue?: undefined;
              name?: undefined;
              value?: undefined;
              radio?: undefined;
          }
    )[];
    const created: string;
    const modified: string;
    const machineName: string;
}
export default _default;
