declare namespace _default {
  const _id: string;
  const type: string;
  const tags: never[];
  const owner: string;
  const components: (
    | {
        label: string;
        tableView: boolean;
        modal: boolean;
        validate: {
          required: boolean;
        };
        key: string;
        type: string;
        input: boolean;
        components: {
          label: string;
          tableView: boolean;
          components: (
            | {
                label: string;
                components: {
                  label: string;
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
                }[];
                tableView: boolean;
                key: string;
                type: string;
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
                components?: undefined;
              }
          )[];
          key: string;
          type: string;
          input: boolean;
        }[];
        showValidations?: undefined;
      }
    | {
        label: string;
        showValidations: boolean;
        tableView: boolean;
        key: string;
        type: string;
        input: boolean;
        modal?: undefined;
        validate?: undefined;
        components?: undefined;
      }
  )[];
  const controller: string;
  const revisions: string;
  const _vid: number;
  const title: string;
  const display: string;
  const access: {
    roles: string[];
    type: string;
  }[];
  const submissionAccess: never[];
  const settings: {};
  const properties: {};
  const name: string;
  const path: string;
}
export default _default;
