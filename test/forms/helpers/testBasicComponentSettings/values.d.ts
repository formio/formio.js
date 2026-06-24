declare namespace _default {
  export { values };
  export { multipleValues };
  export { stringValues };
  export { submission };
}
export default _default;
declare const values: {
  form: {
    data: {
      dataGridChild: {
        textAreaInsideChildDataGrid: string;
      }[];
      numberInsideChildPanel: number;
      textFieldChild: string;
      timeChild: string;
    };
  };
  textField: string;
  textArea: string;
  number: number;
  password: string;
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
    boundingbox: string[];
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
  signature: string;
  columns: {
    numberColumn: number;
    textFieldColumn: string;
  };
  fieldset: {
    numberFieldset: number;
  };
  panel: {
    numberPanel: number;
  };
  table: {
    selectTable: string;
    checkboxTable: boolean;
    dateTimeTable: string;
    currencyTable: number;
  };
  tabs: {
    numberTab: number;
    textFieldTab: string;
  };
  well: {
    textFieldWell: string;
  };
  hidden: string;
  container: {
    textFieldContainer: string;
  };
  dataMap: {
    key: string;
    key1: string;
  };
  dataGrid: {
    textFieldDataGrid: string;
  }[];
  editGrid: {
    textFieldEditGrid: string;
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
  file: {
    name: string;
    originalName: string;
    size: number;
    storage: string;
    type: string;
    url: string;
  }[];
  submit: boolean;
};
declare const multipleValues: any;
declare namespace stringValues {
  const form: string;
  const textField: string;
  const textArea: string;
  const number: string;
  const password: string;
  const checkbox: string;
  const selectBoxes: string;
  const select: string;
  const radio: string;
  const email: string;
  const url: string;
  const phoneNumber: string;
  const tags: string;
  const address: string;
  const dateTime: string;
  const day: string;
  const time: string;
  const currency: string;
  const survey: string;
  const numberColumn: string;
  const textFieldColumn: string;
  const numberFieldset: string;
  const numberPanel: string;
  const selectTable: string;
  const checkboxTable: string;
  const dateTimeTable: string;
  const currencyTable: string;
  const numberTab: string;
  const textFieldTab: string;
  const textFieldWell: string;
  const hidden: string;
  const container: string;
  const dataMap: string;
  const dataGrid: string;
  const editGrid: string;
  const tree: string;
  const file: string;
  const submit: string;
}
declare namespace submission {
  export namespace form_1 {
    namespace data {
      const dataGridChild: {
        textAreaInsideChildDataGrid: string;
      }[];
      const numberInsideChildPanel: number;
      const textFieldChild: string;
      const timeChild: string;
    }
  }
  export { form_1 as form };
  const textField_1: string;
  export { textField_1 as textField };
  const textArea_1: string;
  export { textArea_1 as textArea };
  const number_1: number;
  export { number_1 as number };
  const password_1: string;
  export { password_1 as password };
  const checkbox_1: boolean;
  export { checkbox_1 as checkbox };
  export namespace selectBoxes_1 {
    const a: boolean;
    const b: boolean;
    const c: boolean;
  }
  export { selectBoxes_1 as selectBoxes };
  const select_1: string;
  export { select_1 as select };
  const radio_1: string;
  export { radio_1 as radio };
  const email_1: string;
  export { email_1 as email };
  const url_1: string;
  export { url_1 as url };
  const phoneNumber_1: string;
  export { phoneNumber_1 as phoneNumber };
  const tags_1: string;
  export { tags_1 as tags };
  export namespace address_1 {
    export namespace address_2 {
      const county: string;
      const state: string;
      const country: string;
      const country_code: string;
    }
    export { address_2 as address };
    export const boundingbox: string[];
    const _class: string;
    export { _class as class };
    export const display_name: string;
    export const icon: string;
    export const importance: number;
    export const lat: string;
    export const licence: string;
    export const lon: string;
    export const osm_id: number;
    export const osm_type: string;
    export const place_id: number;
    export const type: string;
  }
  export { address_1 as address };
  const dateTime_1: string;
  export { dateTime_1 as dateTime };
  const day_1: string;
  export { day_1 as day };
  const time_1: string;
  export { time_1 as time };
  const currency_1: number;
  export { currency_1 as currency };
  export namespace survey_1 {
    const question1: string;
    const question2: string;
  }
  export { survey_1 as survey };
  export const signature: string;
  const numberColumn_1: number;
  export { numberColumn_1 as numberColumn };
  const textFieldColumn_1: string;
  export { textFieldColumn_1 as textFieldColumn };
  const numberFieldset_1: number;
  export { numberFieldset_1 as numberFieldset };
  const numberPanel_1: number;
  export { numberPanel_1 as numberPanel };
  const selectTable_1: string;
  export { selectTable_1 as selectTable };
  const checkboxTable_1: boolean;
  export { checkboxTable_1 as checkboxTable };
  const dateTimeTable_1: string;
  export { dateTimeTable_1 as dateTimeTable };
  const currencyTable_1: number;
  export { currencyTable_1 as currencyTable };
  const numberTab_1: number;
  export { numberTab_1 as numberTab };
  const textFieldTab_1: string;
  export { textFieldTab_1 as textFieldTab };
  const textFieldWell_1: string;
  export { textFieldWell_1 as textFieldWell };
  const hidden_1: string;
  export { hidden_1 as hidden };
  export namespace container_1 {
    const textFieldContainer: string;
  }
  export { container_1 as container };
  export namespace dataMap_1 {
    const key: string;
    const key1: string;
  }
  export { dataMap_1 as dataMap };
  const dataGrid_1: {
    textFieldDataGrid: string;
  }[];
  export { dataGrid_1 as dataGrid };
  const editGrid_1: {
    textFieldEditGrid: string;
  }[];
  export { editGrid_1 as editGrid };
  export namespace tree_1 {
    export const children: {
      children: never[];
      data: {
        textFieldTree: string;
      };
    }[];
    export namespace data_1 {
      const textFieldTree: string;
    }
    export { data_1 as data };
  }
  export { tree_1 as tree };
  const file_1: {
    name: string;
    originalName: string;
    size: number;
    storage: string;
    type: string;
    url: string;
  }[];
  export { file_1 as file };
  const submit_1: boolean;
  export { submit_1 as submit };
}
