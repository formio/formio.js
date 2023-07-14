declare namespace _default {
    const type: string;
    const components: (
        | {
              label: string;
              tableView: boolean;
              key: string;
              type: string;
              input: boolean;
              autoExpand?: undefined;
              disableOnInvalid?: undefined;
          }
        | {
              label: string;
              autoExpand: boolean;
              tableView: boolean;
              key: string;
              type: string;
              input: boolean;
              disableOnInvalid?: undefined;
          }
        | {
              type: string;
              label: string;
              key: string;
              disableOnInvalid: boolean;
              input: boolean;
              tableView: boolean;
              autoExpand?: undefined;
          }
    )[];
    const title: string;
    const display: string;
}
export default _default;
