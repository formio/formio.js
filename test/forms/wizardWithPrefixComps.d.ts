declare namespace _default {
    export { form };
    export { submission };
}
export default _default;
declare namespace form {
    const type: string;
    const title: string;
    const display: string;
    const name: string;
    const path: string;
    const components: (
        | {
              label: string;
              tableView: boolean;
              key: string;
              type: string;
              input: boolean;
              title?: undefined;
              components?: undefined;
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
              }[];
              input: boolean;
              tableView: boolean;
          }
    )[];
}
declare namespace submission {
    namespace data {
        const prefixTextField: string;
        const page1TextField: string;
        const page2TextField: string;
        const suffixTextField: string;
    }
}
