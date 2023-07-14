declare namespace _default {
  const type: string;
  const components: (
    | {
        label: string;
        components: {
          label: string;
          key: string;
          components: never[];
        }[];
        key: string;
        type: string;
        input: boolean;
        tableView: boolean;
        disableOnInvalid?: undefined;
      }
    | {
        type: string;
        label: string;
        key: string;
        disableOnInvalid: boolean;
        input: boolean;
        tableView: boolean;
        components?: undefined;
      }
  )[];
  const title: string;
  const display: string;
}
export default _default;
