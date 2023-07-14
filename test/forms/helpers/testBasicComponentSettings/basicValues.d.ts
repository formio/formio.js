declare namespace _default {
  namespace form {
    namespace data {
      const dataGridChild: {
        textAreaInsideChildDataGrid: string;
      }[];
      const numberInsideChildPanel: number;
      const textFieldChild: string;
      const timeChild: string;
    }
  }
  const textField: string;
  const textArea: string;
  const number: number;
  const password: string;
  const checkbox: boolean;
  namespace selectBoxes {
    const a: boolean;
    const b: boolean;
    const c: boolean;
  }
  const select: string;
  const radio: string;
  const email: string;
  const url: string;
  const phoneNumber: string;
  const tags: string;
  namespace address {
    export namespace address_1 {
      const county: string;
      const state: string;
      const country: string;
      const country_code: string;
    }
    export { address_1 as address };
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
  const dateTime: string;
  const day: string;
  const time: string;
  const currency: number;
  namespace survey {
    const question1: string;
    const question2: string;
  }
  const signature: string;
  namespace columns {
    const numberColumn: number;
    const textFieldColumn: string;
  }
  namespace fieldset {
    const numberFieldset: number;
  }
  namespace panel {
    const numberPanel: number;
  }
  namespace table {
    const selectTable: string;
    const checkboxTable: boolean;
    const dateTimeTable: string;
    const currencyTable: number;
  }
  namespace tabs {
    const numberTab: number;
    const textFieldTab: string;
  }
  namespace well {
    const textFieldWell: string;
  }
  const hidden: string;
  namespace container {
    const textFieldContainer: string;
  }
  namespace dataMap {
    const key: string;
    const key1: string;
  }
  const dataGrid: {
    textFieldDataGrid: string;
  }[];
  const editGrid: {
    textFieldEditGrid: string;
  }[];
  namespace tree {
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
  const file: {
    name: string;
    originalName: string;
    size: number;
    storage: string;
    type: string;
    url: string;
  }[];
  const submit: boolean;
}
export default _default;
