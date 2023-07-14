declare namespace _default {
    const type: string;
    const input: boolean;
    const label: string;
    const key: string;
    const tooltip: string;
    const weight: number;
    const reorder: boolean;
    const defaultValue: {
        label: string;
        value: string;
    }[];
    const components: (
        | {
              label: string;
              key: string;
              input: boolean;
              type: string;
              allowCalculateOverride?: undefined;
          }
        | {
              label: string;
              key: string;
              input: boolean;
              type: string;
              allowCalculateOverride: boolean;
              calculateValue: {
                  _camelCase: {
                      var: string;
                  }[];
              };
          }
    )[];
}
export default _default;
