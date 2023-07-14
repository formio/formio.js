declare namespace _default {
  const type: string;
  const tags: never[];
  const components: (
    | {
        title: string;
        label: string;
        type: string;
        key: string;
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
        disabled?: undefined;
      }
    | {
        title: string;
        label: string;
        type: string;
        key: string;
        components: {
          label: string;
          tableView: boolean;
          rowDrafts: boolean;
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
        disabled: boolean;
      }
  )[];
  const title: string;
  const display: string;
}
export default _default;
