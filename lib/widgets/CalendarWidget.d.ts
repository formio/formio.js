export default class CalendarWidget {
    static get defaultSettings(): {
        type: string;
        altInput: boolean;
        allowInput: boolean;
        clickOpens: boolean;
        enableDate: boolean;
        enableTime: boolean;
        mode: string;
        noCalendar: boolean;
        format: string;
        dateFormat: string;
        useLocaleSettings: boolean;
        language: string;
        hourIncrement: number;
        minuteIncrement: number;
        time_24hr: boolean;
        saveAs: string;
        displayInTimezone: string;
        timezone: string;
        disable: any[];
        minDate: string;
        maxDate: string;
    };
    constructor(settings: any, component: any);
    /**
     * Load the timezones.
     *
     * @return {boolean} TRUE if the zones are loading, FALSE otherwise.
     */
    loadZones(): boolean;
    attach(input: any): any;
    defaultFormat: {
        date: string;
        time: string;
    };
    closedOn: number;
    valueFormat: any;
    valueMomentFormat: string;
    calendar: any;
    get disableWeekends(): (date: any) => boolean;
    get disableWeekdays(): (date: any) => boolean;
    get disableFunction(): (date: any) => any;
    get timezone(): any;
    get defaultSettings(): {
        type: string;
        altInput: boolean;
        allowInput: boolean;
        clickOpens: boolean;
        enableDate: boolean;
        enableTime: boolean;
        mode: string;
        noCalendar: boolean;
        format: string;
        dateFormat: string;
        useLocaleSettings: boolean;
        language: string;
        hourIncrement: number;
        minuteIncrement: number;
        time_24hr: boolean;
        saveAs: string;
        displayInTimezone: string;
        timezone: string;
        disable: any[];
        minDate: string;
        maxDate: string;
    };
    addSuffix(suffix: any): any;
    set disabled(arg: any);
    get input(): any;
    get disabledDates(): any;
    get localeFormat(): string;
    get dateTimeFormat(): string;
    get dateFormat(): any;
    /**
     * Return the date value.
     *
     * @param date
     * @param format
     * @return {string}
     */
    getDateValue(date: any, format: any): string;
    /**
     * Return the value of the selected date.
     *
     * @return {*}
     */
    getValue(): any;
    /**
     * Set the selected date value.
     *
     * @param value
     */
    setValue(value: any): any;
    getValueAsString(value: any, format: any): string;
    validationValue(value: any): any;
    destroy(): void;
}
