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
        }[];
        input: boolean;
        tableView: boolean;
        breadcrumbClickable?: undefined;
        buttonSettings?: undefined;
        collapsible?: undefined;
        conditional?: undefined;
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
  const submissionAccess: never[];
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
