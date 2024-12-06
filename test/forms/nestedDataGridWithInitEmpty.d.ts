declare namespace _default {
  export { form };
  export { submission };
}
export default _default;
declare namespace form {
  const type: string;
  const components: (
    | {
        label: string;
        tableView: boolean;
        clearOnHide: boolean;
        rowDrafts: boolean;
        key: string;
        type: string;
        displayAsTable: boolean;
        input: boolean;
        components: {
          label: string;
          reorder: boolean;
          addAnotherPosition: string;
          layoutFixed: boolean;
          enableRowGroups: boolean;
          initEmpty: boolean;
          tableView: boolean;
          defaultValue: {
            select: string;
            email: string;
          }[];
          key: string;
          type: string;
          input: boolean;
          components: (
            | {
                label: string;
                widget: string;
                hideLabel: boolean;
                tableView: boolean;
                data: {
                  values: {
                    label: string;
                    value: string;
                  }[];
                };
                key: string;
                type: string;
                input: boolean;
              }
            | {
                label: string;
                hideLabel: boolean;
                tableView: boolean;
                key: string;
                type: string;
                input: boolean;
                widget?: undefined;
                data?: undefined;
              }
          )[];
        }[];
        disableOnInvalid?: undefined;
      }
    | {
        type: string;
        label: string;
        key: string;
        disableOnInvalid: boolean;
        input: boolean;
        tableView: boolean;
        clearOnHide?: undefined;
        rowDrafts?: undefined;
        displayAsTable?: undefined;
        components?: undefined;
      }
  )[];
  const title: string;
  const display: string;
  const name: string;
  const path: string;
}
declare namespace submission {
  namespace data {
    const editGrid: {
      dataGrid: {
        select: string;
        email: string;
      }[];
    }[];
    const submit: boolean;
  }
}
