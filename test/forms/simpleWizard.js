export default {
    components: [
        {
            title: 'Page 1',
            label: 'Page 1',
            type: 'panel',
            key: 'page1',
            components: [
                {
                    label: 'Date / Time',
                    tableView: false,
                    datePicker: {
                        disableWeekends: false,
                        disableWeekdays: false,
                        showWeeks: true,
                        startingDay: 0,
                        initDate: '',
                        minMode: 'day',
                        maxMode: 'year',
                        yearRows: 4,
                        yearColumns: 5,
                        minDate: null,
                        maxDate: null,
                    },
                    enableMinDateInput: false,
                    enableMaxDateInput: false,
                    key: 'dateTime',
                    type: 'datetime',
                    input: true,
                    widget: {
                        type: 'calendar',
                        displayInTimezone: 'viewer',
                        locale: 'en',
                        useLocaleSettings: false,
                        allowInput: true,
                        mode: 'single',
                        enableTime: true,
                        noCalendar: false,
                        format: 'yyyy-MM-dd hh:mm a',
                        hourIncrement: 1,
                        minuteIncrement: 1,
                        time_24hr: false,
                        minDate: null,
                        disableWeekends: false,
                        disableWeekdays: false,
                        maxDate: null,
                    },
                    placeholder: '',
                    prefix: '',
                    customClass: '',
                    suffix: '',
                    multiple: false,
                    defaultValue: '',
                    protected: false,
                    unique: false,
                    persistent: true,
                    hidden: false,
                    clearOnHide: true,
                    refreshOn: '',
                    redrawOn: '',
                    modalEdit: false,
                    dataGridLabel: false,
                    labelPosition: 'top',
                    description: '',
                    errorLabel: '',
                    tooltip: '',
                    hideLabel: false,
                    tabindex: '',
                    disabled: false,
                    autofocus: false,
                    dbIndex: false,
                    customDefaultValue: '',
                    calculateValue: '',
                    calculateServer: false,
                    attributes: {},
                    validateOn: 'change',
                    validate: {
                        required: false,
                        custom: '',
                        customPrivate: false,
                        strictDateValidation: false,
                        multiple: false,
                        unique: false,
                    },
                    conditional: {
                        show: null,
                        when: null,
                        eq: '',
                    },
                    overlay: {
                        style: '',
                        left: '',
                        top: '',
                        width: '',
                        height: '',
                    },
                    allowCalculateOverride: false,
                    encrypted: false,
                    showCharCount: false,
                    showWordCount: false,
                    properties: {},
                    allowMultipleMasks: false,
                    addons: [],
                    format: 'yyyy-MM-dd hh:mm a',
                    useLocaleSettings: false,
                    allowInput: true,
                    enableDate: true,
                    enableTime: true,
                    defaultDate: '',
                    displayInTimezone: 'viewer',
                    timezone: '',
                    datepickerMode: 'day',
                    timePicker: {
                        hourStep: 1,
                        minuteStep: 1,
                        showMeridian: true,
                        readonlyInput: false,
                        mousewheel: true,
                        arrowkeys: true,
                    },
                    customOptions: {},
                    id: 'en3rnqk',
                },
            ],
            input: false,
            placeholder: '',
            prefix: '',
            customClass: '',
            suffix: '',
            multiple: false,
            defaultValue: null,
            protected: false,
            unique: false,
            persistent: false,
            hidden: false,
            clearOnHide: false,
            refreshOn: '',
            redrawOn: '',
            tableView: false,
            modalEdit: false,
            dataGridLabel: false,
            labelPosition: 'top',
            description: '',
            errorLabel: '',
            tooltip: '',
            hideLabel: false,
            tabindex: '',
            disabled: false,
            autofocus: false,
            dbIndex: false,
            customDefaultValue: '',
            calculateValue: '',
            calculateServer: false,
            widget: null,
            attributes: {},
            validateOn: 'change',
            validate: {
                required: false,
                custom: '',
                customPrivate: false,
                strictDateValidation: false,
                multiple: false,
                unique: false,
            },
            conditional: {
                show: null,
                when: null,
                eq: '',
            },
            overlay: {
                style: '',
                left: '',
                top: '',
                width: '',
                height: '',
            },
            allowCalculateOverride: false,
            encrypted: false,
            showCharCount: false,
            showWordCount: false,
            properties: {},
            allowMultipleMasks: false,
            addons: [],
            tree: false,
            lazyLoad: false,
            theme: 'default',
            breadcrumb: 'default',
            id: 'elx26b',
        },
        {
            title: 'Page 2',
            label: 'Page 2',
            type: 'panel',
            key: 'page2',
            components: [
                {
                    label: 'Text Field',
                    labelPosition: 'top',
                    placeholder: '',
                    description: '',
                    tooltip: '',
                    prefix: '',
                    suffix: '',
                    widget: {
                        type: 'input',
                    },
                    inputMask: '',
                    displayMask: '',
                    allowMultipleMasks: false,
                    customClass: '',
                    tabindex: '',
                    autocomplete: '',
                    hidden: false,
                    hideLabel: false,
                    showWordCount: false,
                    showCharCount: false,
                    mask: false,
                    autofocus: false,
                    spellcheck: true,
                    disabled: false,
                    tableView: true,
                    modalEdit: false,
                    multiple: false,
                    persistent: true,
                    inputFormat: 'plain',
                    protected: false,
                    dbIndex: false,
                    case: '',
                    truncateMultipleSpaces: false,
                    encrypted: false,
                    redrawOn: '',
                    clearOnHide: true,
                    customDefaultValue: '',
                    calculateValue: '',
                    calculateServer: false,
                    allowCalculateOverride: false,
                    validateOn: 'change',
                    validate: {
                        required: false,
                        pattern: '',
                        customMessage: '',
                        custom: '',
                        customPrivate: false,
                        json: '',
                        minLength: '',
                        maxLength: '',
                        strictDateValidation: false,
                        multiple: false,
                        unique: false,
                    },
                    unique: false,
                    errorLabel: '',
                    errors: '',
                    key: 'textField',
                    tags: [],
                    properties: {},
                    conditional: {
                        show: null,
                        when: null,
                        eq: '',
                        json: '',
                    },
                    customConditional: '',
                    logic: [],
                    attributes: {},
                    overlay: {
                        style: '',
                        page: '',
                        left: '',
                        top: '',
                        width: '',
                        height: '',
                    },
                    type: 'textfield',
                    input: true,
                    refreshOn: '',
                    dataGridLabel: false,
                    addons: [],
                    inputType: 'text',
                    id: 'euivbgw',
                    defaultValue: null,
                },
            ],
            input: false,
            placeholder: '',
            prefix: '',
            customClass: '',
            suffix: '',
            multiple: false,
            defaultValue: null,
            protected: false,
            unique: false,
            persistent: false,
            hidden: false,
            clearOnHide: false,
            refreshOn: '',
            redrawOn: '',
            tableView: false,
            modalEdit: false,
            dataGridLabel: false,
            labelPosition: 'top',
            description: '',
            errorLabel: '',
            tooltip: '',
            hideLabel: false,
            tabindex: '',
            disabled: false,
            autofocus: false,
            dbIndex: false,
            customDefaultValue: '',
            calculateValue: '',
            calculateServer: false,
            widget: null,
            attributes: {},
            validateOn: 'change',
            validate: {
                required: false,
                custom: '',
                customPrivate: false,
                strictDateValidation: false,
                multiple: false,
                unique: false,
            },
            conditional: {
                show: null,
                when: null,
                eq: '',
            },
            overlay: {
                style: '',
                left: '',
                top: '',
                width: '',
                height: '',
            },
            allowCalculateOverride: false,
            encrypted: false,
            showCharCount: false,
            showWordCount: false,
            properties: {},
            allowMultipleMasks: false,
            addons: [],
            tree: false,
            lazyLoad: false,
            theme: 'default',
            breadcrumb: 'default',
            id: 'edm9ey',
        },
        {
            title: 'Page 3',
            label: 'Page 3',
            type: 'panel',
            key: 'page3',
            components: [
                {
                    label: 'Text Field',
                    labelPosition: 'top',
                    placeholder: '',
                    description: '',
                    tooltip: '',
                    prefix: '',
                    suffix: '',
                    widget: {
                        type: 'input',
                    },
                    inputMask: '',
                    displayMask: '',
                    allowMultipleMasks: false,
                    customClass: '',
                    tabindex: '',
                    autocomplete: '',
                    hidden: false,
                    hideLabel: false,
                    showWordCount: false,
                    showCharCount: false,
                    mask: false,
                    autofocus: false,
                    spellcheck: true,
                    disabled: false,
                    tableView: true,
                    modalEdit: false,
                    multiple: false,
                    persistent: true,
                    inputFormat: 'plain',
                    protected: false,
                    dbIndex: false,
                    case: '',
                    truncateMultipleSpaces: false,
                    encrypted: false,
                    redrawOn: '',
                    clearOnHide: true,
                    customDefaultValue: '',
                    calculateValue: '',
                    calculateServer: false,
                    allowCalculateOverride: false,
                    validateOn: 'change',
                    validate: {
                        required: false,
                        pattern: '',
                        customMessage: '',
                        custom: '',
                        customPrivate: false,
                        json: '',
                        minLength: '',
                        maxLength: '',
                        strictDateValidation: false,
                        multiple: false,
                        unique: false,
                    },
                    unique: false,
                    errorLabel: '',
                    errors: '',
                    key: 'textField1',
                    tags: [],
                    properties: {},
                    conditional: {
                        show: null,
                        when: null,
                        eq: '',
                        json: '',
                    },
                    customConditional: '',
                    logic: [],
                    attributes: {},
                    overlay: {
                        style: '',
                        page: '',
                        left: '',
                        top: '',
                        width: '',
                        height: '',
                    },
                    type: 'textfield',
                    input: true,
                    refreshOn: '',
                    dataGridLabel: false,
                    addons: [],
                    inputType: 'text',
                    id: 'ea1kbm9',
                    defaultValue: null,
                },
            ],
            input: false,
            placeholder: '',
            prefix: '',
            customClass: '',
            suffix: '',
            multiple: false,
            defaultValue: null,
            protected: false,
            unique: false,
            persistent: false,
            hidden: false,
            clearOnHide: false,
            refreshOn: '',
            redrawOn: '',
            tableView: false,
            modalEdit: false,
            dataGridLabel: false,
            labelPosition: 'top',
            description: '',
            errorLabel: '',
            tooltip: '',
            hideLabel: false,
            tabindex: '',
            disabled: false,
            autofocus: false,
            dbIndex: false,
            customDefaultValue: '',
            calculateValue: '',
            calculateServer: false,
            widget: null,
            attributes: {},
            validateOn: 'change',
            validate: {
                required: false,
                custom: '',
                customPrivate: false,
                strictDateValidation: false,
                multiple: false,
                unique: false,
            },
            conditional: {
                show: null,
                when: null,
                eq: '',
            },
            overlay: {
                style: '',
                left: '',
                top: '',
                width: '',
                height: '',
            },
            allowCalculateOverride: false,
            encrypted: false,
            showCharCount: false,
            showWordCount: false,
            properties: {},
            allowMultipleMasks: false,
            addons: [],
            tree: false,
            lazyLoad: false,
            theme: 'default',
            breadcrumb: 'default',
            id: 'ej30156',
        },
        {
            title: 'Page 4',
            label: 'Page 4',
            type: 'panel',
            key: 'page4',
            components: [
                {
                    label: 'Text Field',
                    labelPosition: 'top',
                    placeholder: '',
                    description: '',
                    tooltip: '',
                    prefix: '',
                    suffix: '',
                    widget: {
                        type: 'input',
                    },
                    inputMask: '',
                    displayMask: '',
                    allowMultipleMasks: false,
                    customClass: '',
                    tabindex: '',
                    autocomplete: '',
                    hidden: false,
                    hideLabel: false,
                    showWordCount: false,
                    showCharCount: false,
                    mask: false,
                    autofocus: false,
                    spellcheck: true,
                    disabled: false,
                    tableView: true,
                    modalEdit: false,
                    multiple: false,
                    persistent: true,
                    inputFormat: 'plain',
                    protected: false,
                    dbIndex: false,
                    case: '',
                    truncateMultipleSpaces: false,
                    encrypted: false,
                    redrawOn: '',
                    clearOnHide: true,
                    customDefaultValue: '',
                    calculateValue: '',
                    calculateServer: false,
                    allowCalculateOverride: false,
                    validateOn: 'change',
                    validate: {
                        required: false,
                        pattern: '',
                        customMessage: '',
                        custom: '',
                        customPrivate: false,
                        json: '',
                        minLength: '',
                        maxLength: '',
                        strictDateValidation: false,
                        multiple: false,
                        unique: false,
                    },
                    unique: false,
                    errorLabel: '',
                    errors: '',
                    key: 'textField2',
                    tags: [],
                    properties: {},
                    conditional: {
                        show: null,
                        when: null,
                        eq: '',
                        json: '',
                    },
                    customConditional: '',
                    logic: [],
                    attributes: {},
                    overlay: {
                        style: '',
                        page: '',
                        left: '',
                        top: '',
                        width: '',
                        height: '',
                    },
                    type: 'textfield',
                    input: true,
                    refreshOn: '',
                    dataGridLabel: false,
                    addons: [],
                    inputType: 'text',
                    id: 'e6qc7ks',
                    defaultValue: null,
                },
            ],
            input: false,
            placeholder: '',
            prefix: '',
            customClass: '',
            suffix: '',
            multiple: false,
            defaultValue: null,
            protected: false,
            unique: false,
            persistent: false,
            hidden: false,
            clearOnHide: false,
            refreshOn: '',
            redrawOn: '',
            tableView: false,
            modalEdit: false,
            dataGridLabel: false,
            labelPosition: 'top',
            description: '',
            errorLabel: '',
            tooltip: '',
            hideLabel: false,
            tabindex: '',
            disabled: false,
            autofocus: false,
            dbIndex: false,
            customDefaultValue: '',
            calculateValue: '',
            calculateServer: false,
            widget: null,
            attributes: {},
            validateOn: 'change',
            validate: {
                required: false,
                custom: '',
                customPrivate: false,
                strictDateValidation: false,
                multiple: false,
                unique: false,
            },
            conditional: {
                show: null,
                when: null,
                eq: '',
            },
            overlay: {
                style: '',
                left: '',
                top: '',
                width: '',
                height: '',
            },
            allowCalculateOverride: false,
            encrypted: false,
            showCharCount: false,
            showWordCount: false,
            properties: {},
            allowMultipleMasks: false,
            addons: [],
            tree: false,
            lazyLoad: false,
            theme: 'default',
            breadcrumb: 'default',
            id: 'e6kih4r',
        },
        {
            title: 'Page 5',
            label: 'Page 5',
            type: 'panel',
            key: 'page5',
            components: [
                {
                    label: 'Text Field',
                    labelPosition: 'top',
                    placeholder: '',
                    description: '',
                    tooltip: '',
                    prefix: '',
                    suffix: '',
                    widget: {
                        type: 'input',
                    },
                    inputMask: '',
                    displayMask: '',
                    allowMultipleMasks: false,
                    customClass: '',
                    tabindex: '',
                    autocomplete: '',
                    hidden: false,
                    hideLabel: false,
                    showWordCount: false,
                    showCharCount: false,
                    mask: false,
                    autofocus: false,
                    spellcheck: true,
                    disabled: false,
                    tableView: true,
                    modalEdit: false,
                    multiple: false,
                    persistent: true,
                    inputFormat: 'plain',
                    protected: false,
                    dbIndex: false,
                    case: '',
                    truncateMultipleSpaces: false,
                    encrypted: false,
                    redrawOn: '',
                    clearOnHide: true,
                    customDefaultValue: '',
                    calculateValue: '',
                    calculateServer: false,
                    allowCalculateOverride: false,
                    validateOn: 'change',
                    validate: {
                        required: false,
                        pattern: '',
                        customMessage: '',
                        custom: '',
                        customPrivate: false,
                        json: '',
                        minLength: '',
                        maxLength: '',
                        strictDateValidation: false,
                        multiple: false,
                        unique: false,
                    },
                    unique: false,
                    errorLabel: '',
                    errors: '',
                    key: 'textField3',
                    tags: [],
                    properties: {},
                    conditional: {
                        show: null,
                        when: null,
                        eq: '',
                        json: '',
                    },
                    customConditional: '',
                    logic: [],
                    attributes: {},
                    overlay: {
                        style: '',
                        page: '',
                        left: '',
                        top: '',
                        width: '',
                        height: '',
                    },
                    type: 'textfield',
                    input: true,
                    refreshOn: '',
                    dataGridLabel: false,
                    addons: [],
                    inputType: 'text',
                    id: 'edk9c1d',
                    defaultValue: null,
                },
                {
                    input: true,
                    key: 'textArea',
                    placeholder: '',
                    prefix: '',
                    customClass: '',
                    suffix: '',
                    multiple: false,
                    defaultValue: null,
                    protected: false,
                    unique: false,
                    persistent: true,
                    hidden: false,
                    clearOnHide: true,
                    refreshOn: '',
                    redrawOn: '',
                    tableView: true,
                    modalEdit: false,
                    label: 'Text Area',
                    dataGridLabel: false,
                    labelPosition: 'top',
                    description: '',
                    errorLabel: '',
                    tooltip: '',
                    hideLabel: false,
                    tabindex: '',
                    disabled: false,
                    autofocus: false,
                    dbIndex: false,
                    customDefaultValue: '',
                    calculateValue: '',
                    calculateServer: false,
                    widget: {
                        type: 'input',
                    },
                    attributes: {},
                    validateOn: 'change',
                    validate: {
                        required: false,
                        custom: '',
                        customPrivate: false,
                        strictDateValidation: false,
                        multiple: false,
                        unique: false,
                        minLength: '',
                        maxLength: '',
                        pattern: '',
                        minWords: '',
                        maxWords: '',
                    },
                    conditional: {
                        show: null,
                        when: null,
                        eq: '',
                    },
                    overlay: {
                        style: '',
                        left: '',
                        top: '',
                        width: '',
                        height: '',
                    },
                    allowCalculateOverride: false,
                    encrypted: false,
                    showCharCount: false,
                    showWordCount: false,
                    properties: {},
                    allowMultipleMasks: false,
                    addons: [],
                    type: 'textarea',
                    mask: false,
                    inputType: 'text',
                    inputFormat: 'html',
                    inputMask: '',
                    displayMask: '',
                    spellcheck: true,
                    truncateMultipleSpaces: false,
                    rows: 3,
                    wysiwyg: false,
                    editor: '',
                    fixedSize: true,
                    id: 'e7dd0e8',
                },
            ],
            input: false,
            placeholder: '',
            prefix: '',
            customClass: '',
            suffix: '',
            multiple: false,
            defaultValue: null,
            protected: false,
            unique: false,
            persistent: false,
            hidden: false,
            clearOnHide: false,
            refreshOn: '',
            redrawOn: '',
            tableView: false,
            modalEdit: false,
            dataGridLabel: false,
            labelPosition: 'top',
            description: '',
            errorLabel: '',
            tooltip: '',
            hideLabel: false,
            tabindex: '',
            disabled: false,
            autofocus: false,
            dbIndex: false,
            customDefaultValue: '',
            calculateValue: '',
            calculateServer: false,
            widget: null,
            attributes: {},
            validateOn: 'change',
            validate: {
                required: false,
                custom: '',
                customPrivate: false,
                strictDateValidation: false,
                multiple: false,
                unique: false,
            },
            conditional: {
                show: null,
                when: null,
                eq: '',
            },
            overlay: {
                style: '',
                left: '',
                top: '',
                width: '',
                height: '',
            },
            allowCalculateOverride: false,
            encrypted: false,
            showCharCount: false,
            showWordCount: false,
            properties: {},
            allowMultipleMasks: false,
            addons: [],
            tree: false,
            lazyLoad: false,
            theme: 'default',
            breadcrumb: 'default',
            id: 'euq9qhq',
        },
    ],
    display: 'wizard',
    type: 'form',
};
