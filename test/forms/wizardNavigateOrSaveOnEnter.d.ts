declare namespace _default {
    export { form };
}
export default _default;
declare namespace form {
    const display: string;
    const components: (
        | {
              title: string;
              label: string;
              type: string;
              key: string;
              navigateOnEnter: boolean;
              components: {
                  label: string;
                  tableView: boolean;
                  key: string;
                  type: string;
                  input: boolean;
              }[];
              input: boolean;
              tableView: boolean;
              saveOnEnter?: undefined;
          }
        | {
              title: string;
              label: string;
              type: string;
              key: string;
              saveOnEnter: boolean;
              components: {
                  label: string;
                  tableView: boolean;
                  key: string;
                  type: string;
                  input: boolean;
              }[];
              input: boolean;
              tableView: boolean;
              navigateOnEnter?: undefined;
          }
    )[];
}
