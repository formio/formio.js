declare namespace _default {
  export { form };
  export { submission };
}
export default _default;
declare namespace form {
  const type: string;
  const components: (
    | {
        title: string;
        label: string;
        type: string;
        key: string;
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
          dataGridLabel: boolean;
          showCharCount: boolean;
          showWordCount: boolean;
          allowMultipleMasks: boolean;
          id: string;
          defaultValue: null;
        }[];
        input: boolean;
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
        tableView: boolean;
        modalEdit: boolean;
        dataGridLabel: boolean;
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
        widget: null;
        attributes: {};
        validateOn: string;
        validate: {
          required: boolean;
          custom: string;
          customPrivate: boolean;
          strictDateValidation: boolean;
          multiple: boolean;
          unique: boolean;
        };
        conditional: {
          show: null;
          when: null;
          eq: string;
        };
        overlay: {
          style: string;
          left: string;
          top: string;
          width: string;
          height: string;
        };
        allowCalculateOverride: boolean;
        encrypted: boolean;
        showCharCount: boolean;
        showWordCount: boolean;
        properties: {};
        allowMultipleMasks: boolean;
        tree: boolean;
        theme: string;
        breadcrumb: string;
        id: string;
      }
    | {
        title: string;
        label: string;
        type: string;
        key: string;
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
          inputMask: string;
          allowMultipleMasks: boolean;
          customClass: string;
          tabindex: string;
          autocomplete: string;
          hidden: boolean;
          hideLabel: boolean;
          showWordCount: boolean;
          showCharCount: boolean;
          mask: boolean;
          autofocus: boolean;
          spellcheck: boolean;
          disabled: boolean;
          tableView: boolean;
          modalEdit: boolean;
          multiple: boolean;
          persistent: boolean;
          inputFormat: string;
          protected: boolean;
          dbIndex: boolean;
          case: string;
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
            pattern: string;
            customMessage: string;
            custom: string;
            customPrivate: boolean;
            json: string;
            minLength: string;
            maxLength: string;
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
          refreshOn: string;
          dataGridLabel: boolean;
          inputType: string;
          id: string;
          defaultValue: null;
        }[];
        input: boolean;
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
        tableView: boolean;
        modalEdit: boolean;
        dataGridLabel: boolean;
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
        widget: null;
        attributes: {};
        validateOn: string;
        validate: {
          required: boolean;
          custom: string;
          customPrivate: boolean;
          strictDateValidation: boolean;
          multiple: boolean;
          unique: boolean;
        };
        conditional: {
          show: null;
          when: null;
          eq: string;
        };
        overlay: {
          style: string;
          left: string;
          top: string;
          width: string;
          height: string;
        };
        allowCalculateOverride: boolean;
        encrypted: boolean;
        showCharCount: boolean;
        showWordCount: boolean;
        properties: {};
        allowMultipleMasks: boolean;
        tree: boolean;
        theme: string;
        breadcrumb: string;
        id: string;
      }
  )[];
  const title: string;
  const display: string;
  const name: string;
  const path: string;
}
declare namespace submission {
  namespace data {
    const number: number;
    const textField: string;
  }
}
