declare namespace _default {
  const type: string;
  const components: (
    | {
        label: string;
        reorder: boolean;
        addAnotherPosition: string;
        layoutFixed: boolean;
        enableRowGroups: boolean;
        initEmpty: boolean;
        tableView: boolean;
        defaultValue: {
          label: string;
          value: string;
        }[];
        allowCalculateOverride: boolean;
        key: string;
        type: string;
        input: boolean;
        components: (
          | {
              label: string;
              tableView: boolean;
              key: string;
              type: string;
              input: boolean;
              allowCalculateOverride?: undefined;
            }
          | {
              label: string;
              tableView: boolean;
              calculateValue: string;
              allowCalculateOverride: boolean;
              key: string;
              type: string;
              input: boolean;
            }
        )[];
        disableOnInvalid?: undefined;
      }
    | {
        type: string;
        label: string;
        key: string;
        disableOnInvalid: boolean;
        input: boolean;
        tableView: boolean;
        reorder?: undefined;
        addAnotherPosition?: undefined;
        layoutFixed?: undefined;
        enableRowGroups?: undefined;
        initEmpty?: undefined;
        defaultValue?: undefined;
        allowCalculateOverride?: undefined;
        components?: undefined;
      }
  )[];
  const title: string;
  const display: string;
}
export default _default;
