declare namespace _default {
  const _id: string;
  const title: string;
  const name: string;
  const path: string;
  const type: string;
  const display: string;
  const tags: never[];
  const access: {
    type: string;
    roles: string[];
  }[];
  const submissionAccess: {
    type: string;
    roles: string[];
  }[];
  const owner: string;
  const components: {
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
  }[];
  const settings: {};
  const properties: {};
  const project: string;
  const controller: string;
  const revisions: string;
  const submissionRevisions: string;
  const _vid: number;
  const created: string;
  const modified: string;
  const machineName: string;
  namespace fieldMatchAccess {
    export const read: {
      formFieldPath: string;
      value: string;
      operator: string;
      valueType: string;
      roles: never[];
    }[];
    export const write: {
      formFieldPath: string;
      value: string;
      operator: string;
      valueType: string;
      roles: never[];
    }[];
    export const create: {
      formFieldPath: string;
      value: string;
      operator: string;
      valueType: string;
      roles: never[];
    }[];
    export const admin: {
      formFieldPath: string;
      value: string;
      operator: string;
      valueType: string;
      roles: never[];
    }[];
    const _delete: {
      formFieldPath: string;
      value: string;
      operator: string;
      valueType: string;
      roles: never[];
    }[];
    export { _delete as delete };
    export const update: {
      formFieldPath: string;
      value: string;
      operator: string;
      valueType: string;
      roles: never[];
    }[];
    const _id_1: string;
    export { _id_1 as _id };
  }
}
export default _default;
