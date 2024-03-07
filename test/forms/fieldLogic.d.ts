declare namespace _default {
    const title: string;
    namespace form {
        const components: (
            | {
                  properties: {};
                  tags: never[];
                  labelPosition: string;
                  hideLabel: boolean;
                  type: string;
                  conditional: {
                      eq: string;
                      when: null;
                      show: string;
                  };
                  validate: {
                      customPrivate: boolean;
                      custom: string;
                      pattern: string;
                      maxLength: string;
                      minLength: string;
                      required: boolean;
                  };
                  clearOnHide: boolean;
                  hidden: boolean;
                  persistent: boolean;
                  unique: boolean;
                  protected: boolean;
                  defaultValue: string;
                  multiple: boolean;
                  suffix: string;
                  prefix: string;
                  placeholder: string;
                  key: string;
                  label: string;
                  inputMask: string;
                  inputType: string;
                  tableView: boolean;
                  input: boolean;
                  logic?: undefined;
              }
            | {
                  properties: {};
                  tags: never[];
                  labelPosition: string;
                  hideLabel: boolean;
                  type: string;
                  conditional: {
                      eq: string;
                      when: null;
                      show: string;
                  };
                  validate: {
                      customPrivate: boolean;
                      custom: string;
                      pattern: string;
                      maxLength: string;
                      minLength: string;
                      required: boolean;
                  };
                  clearOnHide: boolean;
                  hidden: boolean;
                  persistent: boolean;
                  unique: boolean;
                  protected: boolean;
                  defaultValue: string;
                  multiple: boolean;
                  suffix: string;
                  prefix: string;
                  placeholder: string;
                  key: string;
                  label: string;
                  inputMask: string;
                  inputType: string;
                  tableView: boolean;
                  input: boolean;
                  logic: (
                      | {
                            name: string;
                            trigger: {
                                javascript: string;
                                type: string;
                            };
                            actions: (
                                | {
                                      name: string;
                                      text: string;
                                      property: {
                                          type: string;
                                          value: string;
                                          label: string;
                                      };
                                      type: string;
                                      state?: undefined;
                                  }
                                | {
                                      name: string;
                                      type: string;
                                      property: {
                                          label: string;
                                          value: string;
                                          type: string;
                                      };
                                      state: boolean;
                                      text?: undefined;
                                  }
                            )[];
                        }
                      | {
                            name: string;
                            trigger: {
                                javascript: string;
                                type: string;
                            };
                            actions: {
                                name: string;
                                type: string;
                                value: string;
                            }[];
                        }
                  )[];
              }
        )[];
    }
    const tests: {
        'Test Title, Description and Disabled'(form: any, done: any): void;
        'Test Required'(form: any, done: any): void;
        'Test Set Value'(form: any, done: any): void;
    };
}
export default _default;
