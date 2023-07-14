declare namespace _default {
    const type: string;
    const components: (
        | {
              title: string;
              label: string;
              type: string;
              key: string;
              components: {
                  label: string;
                  tableView: boolean;
                  validate: {
                      required: boolean;
                  };
                  key: string;
                  type: string;
                  input: boolean;
              }[];
              input: boolean;
              tableView: boolean;
          }
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
                  components: {
                      label: string;
                      tableView: boolean;
                      key: string;
                      type: string;
                      input: boolean;
                  }[];
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
