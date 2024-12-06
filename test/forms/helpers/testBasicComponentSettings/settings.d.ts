declare const _default: {
  placeholder: any;
  description: any;
  tooltip: any;
  prefix: any;
  suffix: any;
  customClass: any;
  tabindex: any;
  hidden: any;
  hideLabel: any;
  disabled: any;
  defaultValue: {
    textField: string;
    textArea: string;
    number: number;
    checkbox: boolean;
    selectBoxes: {
      a: boolean;
      b: boolean;
      c: boolean;
    };
    select: string;
    radio: string;
    email: string;
    url: string;
    phoneNumber: string;
    tags: string;
    address: {
      address: {
        county: string;
        state: string;
        country: string;
        country_code: string;
      };
      boundingbox: any;
      class: string;
      display_name: string;
      icon: string;
      importance: number;
      lat: string;
      licence: string;
      lon: string;
      osm_id: number;
      osm_type: string;
      place_id: number;
      type: string;
    };
    dateTime: string;
    day: string;
    time: string;
    currency: number;
    survey: {
      question1: string;
      question2: string;
    };
    dataGrid: {
      textFieldDataGrid: string;
    }[];
    tree: {
      children: {
        children: never[];
        data: {
          textFieldTree: string;
        };
      }[];
      data: {
        textFieldTree: string;
      };
    };
  };
  customDefaultValue: {
    form: {
      js: string;
      expectedValue: {
        data: {
          dataGridChild: {
            textAreaInsideChildDataGrid: string;
          }[];
          numberInsideChildPanel: number;
          textFieldChild: string;
          timeChild: string;
        };
      };
    };
    textField: {
      js: string;
      expectedValue: string;
    };
    textArea: {
      js: string;
      expectedValue: string;
    };
    number: {
      js: string;
      expectedValue: number;
    };
    selectBoxes: {
      js: string;
      expectedValue: {
        a: boolean;
        b: boolean;
        c: boolean;
      };
    };
    select: {
      js: string;
      expectedValue: string;
    };
    radio: {
      js: string;
      expectedValue: string;
    };
    email: {
      js: string;
      expectedValue: string;
    };
    url: {
      js: string;
      expectedValue: string;
    };
    phoneNumber: {
      js: string;
      expectedValue: string;
    };
    tags: {
      js: string;
      expectedValue: string;
    };
    dateTime: {
      js: string;
      expectedValue: string;
    };
    day: {
      js: string;
      expectedValue: string;
    };
    time: {
      js: string;
      expectedValue: string;
    };
    currency: {
      js: string;
      expectedValue: number;
    };
    survey: {
      js: string;
      expectedValue: {
        question1: string;
        question2: string;
      };
    };
    hidden: {
      js: string;
      expectedValue: number;
    };
    container: {
      js: string;
      expectedValue: {
        textFieldContainer: string;
      };
    };
    dataMap: {
      js: string;
      expectedValue: {
        key: string;
      };
    };
    dataGrid: {
      js: string;
      expectedValue: {
        textFieldDataGrid: string;
      }[];
    };
    editGrid: {
      js: string;
      expectedValue: {
        textFieldEditGrid: string;
      }[];
    };
    tree: {
      js: string;
      expectedValue: {
        children: never[];
        data: {
          textFieldTree: string;
        };
      };
    };
    file: {
      js: string;
      expectedValue: {
        name: string;
        originalName: string;
        size: number;
        storage: string;
        type: string;
        url: string;
      }[];
    };
  };
  redrawOn: any;
  multiple: any;
  modalEdit: any;
  calculateValue: {
    form: {
      js: string;
      expectedValue: (basis: any) => {
        data: {
          dataGridChild: {
            textAreaInsideChildDataGrid: string;
          }[];
          numberInsideChildPanel: any;
          textFieldChild: string;
          timeChild: string;
        };
      };
    };
    textField: {
      js: string;
      expectedValue: (basis: any) => string;
    };
    textArea: {
      js: string;
      expectedValue: (basis: any) => string;
    };
    number: {
      js: string;
      expectedValue: (basis: any) => any;
    };
    checkbox: {
      js: string;
      expectedValue: (basis: any) => boolean;
    };
    selectBoxes: {
      js: string;
      expectedValue: (basis: any) => {
        a: boolean;
        b: boolean;
        c: boolean;
      };
    };
    select: {
      js: string;
      expectedValue: (basis: any) => 'a' | 'b';
    };
    radio: {
      js: string;
      expectedValue: (basis: any) => 'b' | 'c';
    };
    email: {
      js: string;
      expectedValue: (basis: any) => string;
    };
    url: {
      js: string;
      expectedValue: (basis: any) => string;
    };
    phoneNumber: {
      js: string;
      expectedValue: (basis: any) => string;
    };
    tags: {
      js: string;
      expectedValue: (basis: any) => any;
    };
    dateTime: {
      js: string;
      expectedValue: (basis: any) => '2023-03-03T12:00:00' | '2003-12-12T12:00:00';
    };
    day: {
      js: string;
      expectedValue: (basis: any) => '05/05/2015' | '03/03/2003';
    };
    time: {
      js: string;
      expectedValue: (basis: any) => '04:45:00' | '04:05:00';
    };
    currency: {
      js: string;
      expectedValue: (basis: any) => any;
    };
    survey: {
      js: string;
      expectedValue: (basis: any) => {
        question1: string;
        question2: string;
      };
    };
    hidden: {
      js: string;
      expectedValue: (basis: any) => any;
    };
    container: {
      js: string;
      expectedValue: (basis: any) => {
        textFieldContainer: string;
      };
    };
    dataMap: {
      js: string;
      expectedValue: (basis: any) => {
        key: string;
      };
    };
    dataGrid: {
      js: string;
      expectedValue: (basis: any) => {
        textFieldDataGrid: string;
      }[];
    };
    editGrid: {
      js: string;
      expectedValue: (basis: any) => {
        textFieldEditGrid: string;
      }[];
    };
    tree: {
      js: string;
      expectedValue: (basis: any) => {
        children: never[];
        data: {
          textFieldTree: string;
        };
      };
    };
    file: {
      js: string;
      expectedValue: (basis: any) => {
        name: string;
        originalName: string;
        size: number;
        storage: string;
        type: string;
        url: string;
      }[];
    };
  };
  clearOnHide: any;
  'validate.required': any;
  'validate.custom': any;
  validate_nested_components: any;
  conditional: any;
  customConditional: any;
  logic: any;
  set_get_value: any;
};
export default _default;
