declare namespace _default {
    const title: string;
    namespace form {
        const components: (
            | {
                  type: string;
                  label: string;
                  key: string;
                  input: boolean;
                  inputType: string;
                  disabled?: undefined;
              }
            | {
                  type: string;
                  label: string;
                  key: string;
                  input: boolean;
                  inputType: string;
                  disabled: boolean;
                  calculateValue: {
                      '+': {
                          var: string;
                      }[];
                  };
              }
        )[];
    }
    const tests: {
        'Test calculated fields'(form: any, done: any): void;
    };
}
export default _default;
