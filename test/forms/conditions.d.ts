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
          validate: {
            json: {
              if: (
                | string
                | boolean
                | {
                    '==': (
                      | string
                      | {
                          var: string;
                        }
                    )[];
                  }
              )[];
            };
          };
          conditional?: undefined;
          tag?: undefined;
          attrs?: undefined;
          className?: undefined;
          content?: undefined;
        }
      | {
          type: string;
          label: string;
          key: string;
          input: boolean;
          inputType: string;
          validate: {
            json: {
              if: (
                | string
                | boolean
                | {
                    '==': (
                      | string
                      | {
                          var: string;
                        }
                    )[];
                  }
              )[];
            };
          };
          conditional: {
            json: {
              '===': (
                | string
                | {
                    var: string;
                  }
              )[];
            };
          };
          tag?: undefined;
          attrs?: undefined;
          className?: undefined;
          content?: undefined;
        }
      | {
          key: string;
          input: boolean;
          tag: string;
          attrs: {
            attr: string;
            value: string;
          }[];
          className: string;
          content: string;
          type: string;
          conditional: {
            json: {
              '===': (
                | string
                | {
                    var: string;
                  }
              )[];
            };
          };
          label?: undefined;
          inputType?: undefined;
          validate?: undefined;
        }
    )[];
  }
  const tests: {
    'Test hidden components'(form: any, done: any): void;
    'Test validation errors on typeShow field'(form: any, done: any): void;
    'Test validation errors on typeMe field'(form: any, done: any): void;
    'Test validation errors on typeThe field'(form: any, done: any): void;
    'Test validation errors on typeMonkey field'(form: any, done: any): void;
    'Test conditional when typeShow is set'(form: any, done: any): void;
    'Test conditional when typeShow, typeMe is set'(form: any, done: any): void;
    'Test conditional when typeShow, typeMe, typeThe is set'(form: any, done: any): void;
    'Test conditional when typeShow, typeMe, typeThe, typeMonkey is set'(
      form: any,
      done: any,
    ): void;
  };
}
export default _default;
