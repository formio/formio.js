export default class CalendarWidget extends InputWidget {
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
}
import InputWidget from "./InputWidget";
