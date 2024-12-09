declare namespace _default {
  const _id: string;
  const type: string;
  const components: (
    | {
        label: string;
        tableView: boolean;
        questions: {
          label: string;
          value: string;
          tooltip: string;
        }[];
        values: {
          label: string;
          value: string;
          tooltip: string;
        }[];
        key: string;
        type: string;
        input: boolean;
        showValidations?: undefined;
      }
    | {
        label: string;
        showValidations: boolean;
        tableView: boolean;
        key: string;
        type: string;
        input: boolean;
        questions?: undefined;
        values?: undefined;
      }
  )[];
  const title: string;
  const display: string;
  const name: string;
  const path: string;
  const machineName: string;
}
export default _default;
