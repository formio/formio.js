declare namespace _default {
  const title: string;
  const name: string;
  const path: string;
  const type: string;
  const display: string;
  const components: (
    | {
        label: string;
        reorder: boolean;
        addAnotherPosition: string;
        layoutFixed: boolean;
        enableRowGroups: boolean;
        initEmpty: boolean;
        tableView: boolean;
        defaultValue: {}[];
        key: string;
        type: string;
        input: boolean;
        components: {
          label: string;
          optionsLabelPosition: string;
          inline: boolean;
          tableView: boolean;
          values: {
            label: string;
            value: string;
            shortcut: string;
          }[];
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
        reorder?: undefined;
        addAnotherPosition?: undefined;
        layoutFixed?: undefined;
        enableRowGroups?: undefined;
        initEmpty?: undefined;
        defaultValue?: undefined;
        components?: undefined;
      }
  )[];
}
export default _default;
