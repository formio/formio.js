declare namespace _default {
  export { form };
  export { submission };
}
export default _default;
declare namespace form {
  const type: string;
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
  const title: string;
  const display: string;
  const name: string;
  const path: string;
  const machineName: string;
}
declare namespace submission {
  namespace data {
    const signature: string;
  }
}
