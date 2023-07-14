declare namespace _default {
    const _id: string;
    const type: string;
    const tags: never[];
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
              scrollToTop: boolean;
              collapsible: boolean;
              key: string;
              type: string;
              label: string;
              input: boolean;
              tableView: boolean;
              components: (
                  | {
                        label: string;
                        tableView: boolean;
                        validate: {
                            required: boolean;
                        };
                        key: string;
                        type: string;
                        input: boolean;
                    }
                  | {
                        label: string;
                        tableView: boolean;
                        validate: {
                            required: boolean;
                            custom: string;
                        };
                        key: string;
                        type: string;
                        input: boolean;
                    }
              )[];
          }
        | {
              title: string;
              breadcrumbClickable: boolean;
              buttonSettings: {
                  previous: boolean;
                  cancel: boolean;
                  next: boolean;
              };
              scrollToTop: boolean;
              collapsible: boolean;
              key: string;
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
    const revisions: string;
    const _vid: number;
    const title: string;
    const display: string;
    const access: {
        roles: string[];
        type: string;
    }[];
    const submissionAccess: {
        roles: never[];
        type: string;
    }[];
    const controller: string;
    const properties: {};
    const settings: {};
    const name: string;
    const path: string;
    const project: string;
    const created: string;
    const modified: string;
    const machineName: string;
}
export default _default;
