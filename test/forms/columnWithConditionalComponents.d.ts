declare namespace _default {
  const type: string;
  const components: (
    | {
        label: string;
        optionsLabelPosition: string;
        tableView: boolean;
        values: {
          label: string;
          value: string;
          shortcut: string;
        }[];
        key: string;
        type: string;
        input: boolean;
        inputType: string;
        columns?: undefined;
        autoAdjust?: undefined;
        disableOnInvalid?: undefined;
      }
    | {
        label: string;
        columns: (
          | {
              components: {
                label: string;
                tableView: boolean;
                key: string;
                customConditional: string;
                type: string;
                input: boolean;
                hideOnChildrenHidden: boolean;
              }[];
              width: number;
              offset: number;
              push: number;
              pull: number;
              size: string;
              currentWidth: number;
              element: {};
            }
          | {
              components: {
                label: string;
                hidden: boolean;
                tableView: boolean;
                key: string;
                customConditional: string;
                type: string;
                input: boolean;
                hideOnChildrenHidden: boolean;
              }[];
              size: string;
              width: number;
              offset: number;
              push: number;
              pull: number;
              currentWidth: number;
              element: {};
            }
        )[];
        autoAdjust: boolean;
        key: string;
        type: string;
        input: boolean;
        tableView: boolean;
        optionsLabelPosition?: undefined;
        values?: undefined;
        inputType?: undefined;
        disableOnInvalid?: undefined;
      }
    | {
        type: string;
        label: string;
        key: string;
        disableOnInvalid: boolean;
        input: boolean;
        tableView: boolean;
        optionsLabelPosition?: undefined;
        values?: undefined;
        inputType?: undefined;
        columns?: undefined;
        autoAdjust?: undefined;
      }
  )[];
  const title: string;
  const display: string;
  const name: string;
  const path: string;
  const machineName: string;
}
export default _default;
