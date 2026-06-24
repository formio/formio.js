declare namespace _default {
  const type: string;
  const components: (
    | {
        title: string;
        label: string;
        type: string;
        key: string;
        components: never[];
        input?: undefined;
      }
    | {
        title: string;
        label: string;
        type: string;
        key: string;
        components: {
          label: string;
          display: string;
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
          useOriginalRevision: boolean;
          reference: boolean;
          clearOnHide: boolean;
          key: string;
          type: string;
          persistent: boolean;
        }[];
        input: boolean;
      }
  )[];
  const title: string;
  const display: string;
}
export default _default;
