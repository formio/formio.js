declare namespace _default {
  export { form };
  export { submission1row };
  export { submission3rows };
}
export default _default;
declare namespace form {
  const _id: string;
  const type: string;
  const tags: never[];
  const owner: string;
  const components: (
    | {
        label: string;
        labelPosition: string;
        description: string;
        tooltip: string;
        disableAddingRemovingRows: boolean;
        conditionalAddButton: string;
        reorder: boolean;
        addAnother: string;
        addAnotherPosition: string;
        defaultOpen: boolean;
        layoutFixed: boolean;
        enableRowGroups: boolean;
        initEmpty: boolean;
        customClass: string;
        tabindex: string;
        hidden: boolean;
        hideLabel: boolean;
        autofocus: boolean;
        disabled: boolean;
        tableView: boolean;
        modalEdit: boolean;
        defaultValue: {}[];
        persistent: boolean;
        protected: boolean;
        dbIndex: boolean;
        encrypted: boolean;
        redrawOn: string;
        clearOnHide: boolean;
        customDefaultValue: string;
        calculateValue: string;
        calculateServer: boolean;
        allowCalculateOverride: boolean;
        validateOn: string;
        validate: {
          required: boolean;
          minLength: string;
          maxLength: string;
          customMessage: string;
          custom: string;
          customPrivate: boolean;
          json: string;
          strictDateValidation: boolean;
          multiple: boolean;
          unique: boolean;
        };
        unique: boolean;
        errorLabel: string;
        key: string;
        tags: never[];
        properties: {};
        conditional: {
          show: null;
          when: null;
          eq: string;
          json: string;
        };
        customConditional: string;
        logic: never[];
        attributes: {};
        overlay: {
          style: string;
          page: string;
          left: string;
          top: string;
          width: string;
          height: string;
        };
        type: string;
        input: boolean;
        placeholder: string;
        prefix: string;
        suffix: string;
        multiple: boolean;
        refreshOn: string;
        widget: null;
        showCharCount: boolean;
        showWordCount: boolean;
        allowMultipleMasks: boolean;
        tree: boolean;
        components: {
          label: string;
          labelPosition: string;
          placeholder: string;
          description: string;
          tooltip: string;
          prefix: string;
          suffix: string;
          widget: {
            type: string;
          };
          customClass: string;
          tabindex: string;
          autocomplete: string;
          hidden: boolean;
          hideLabel: boolean;
          mask: boolean;
          autofocus: boolean;
          spellcheck: boolean;
          disabled: boolean;
          tableView: boolean;
          modalEdit: boolean;
          multiple: boolean;
          persistent: boolean;
          delimiter: boolean;
          requireDecimal: boolean;
          inputFormat: string;
          protected: boolean;
          dbIndex: boolean;
          encrypted: boolean;
          redrawOn: string;
          clearOnHide: boolean;
          customDefaultValue: string;
          calculateValue: string;
          calculateServer: boolean;
          allowCalculateOverride: boolean;
          validateOn: string;
          validate: {
            required: boolean;
            customMessage: string;
            custom: string;
            customPrivate: boolean;
            json: string;
            min: string;
            max: string;
            strictDateValidation: boolean;
            multiple: boolean;
            unique: boolean;
            step: string;
            integer: string;
          };
          errorLabel: string;
          key: string;
          tags: never[];
          properties: {};
          conditional: {
            show: null;
            when: null;
            eq: string;
            json: string;
          };
          customConditional: string;
          logic: never[];
          attributes: {};
          overlay: {
            style: string;
            page: string;
            left: string;
            top: string;
            width: string;
            height: string;
          };
          type: string;
          input: boolean;
          unique: boolean;
          refreshOn: string;
          showCharCount: boolean;
          showWordCount: boolean;
          allowMultipleMasks: boolean;
          id: string;
          defaultValue: null;
        }[];
        id: string;
        disableOnInvalid?: undefined;
        size?: undefined;
        leftIcon?: undefined;
        rightIcon?: undefined;
        block?: undefined;
        action?: undefined;
        theme?: undefined;
        dataGridLabel?: undefined;
      }
    | {
        type: string;
        label: string;
        key: string;
        disableOnInvalid: boolean;
        input: boolean;
        tableView: boolean;
        placeholder: string;
        prefix: string;
        customClass: string;
        suffix: string;
        multiple: boolean;
        defaultValue: null;
        protected: boolean;
        unique: boolean;
        persistent: boolean;
        hidden: boolean;
        clearOnHide: boolean;
        refreshOn: string;
        redrawOn: string;
        modalEdit: boolean;
        labelPosition: string;
        description: string;
        errorLabel: string;
        tooltip: string;
        hideLabel: boolean;
        tabindex: string;
        disabled: boolean;
        autofocus: boolean;
        dbIndex: boolean;
        customDefaultValue: string;
        calculateValue: string;
        calculateServer: boolean;
        widget: {
          type: string;
        };
        attributes: {};
        validateOn: string;
        validate: {
          required: boolean;
          custom: string;
          customPrivate: boolean;
          strictDateValidation: boolean;
          multiple: boolean;
          unique: boolean;
          minLength?: undefined;
          maxLength?: undefined;
          customMessage?: undefined;
          json?: undefined;
        };
        conditional: {
          show: null;
          when: null;
          eq: string;
          json?: undefined;
        };
        overlay: {
          style: string;
          left: string;
          top: string;
          width: string;
          height: string;
          page?: undefined;
        };
        allowCalculateOverride: boolean;
        encrypted: boolean;
        showCharCount: boolean;
        showWordCount: boolean;
        properties: {};
        allowMultipleMasks: boolean;
        size: string;
        leftIcon: string;
        rightIcon: string;
        block: boolean;
        action: string;
        theme: string;
        dataGridLabel: boolean;
        id: string;
        disableAddingRemovingRows?: undefined;
        conditionalAddButton?: undefined;
        reorder?: undefined;
        addAnother?: undefined;
        addAnotherPosition?: undefined;
        defaultOpen?: undefined;
        layoutFixed?: undefined;
        enableRowGroups?: undefined;
        initEmpty?: undefined;
        tags?: undefined;
        logic?: undefined;
        tree?: undefined;
        components?: undefined;
      }
  )[];
  const title: string;
  const display: string;
  const name: string;
  const path: string;
  const machineName: string;
}
declare namespace submission1row {
  namespace data {
    const dataGrid: {
      number: number;
    }[];
  }
}
declare namespace submission3rows {
  export namespace data_1 {
    const dataGrid_1: {
      number: number;
    }[];
    export { dataGrid_1 as dataGrid };
  }
  export { data_1 as data };
}
