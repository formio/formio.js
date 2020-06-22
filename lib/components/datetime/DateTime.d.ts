export default class DateTimeComponent extends Input {
    static get builderInfo(): {
        title: string;
        group: string;
        icon: string;
        documentation: string;
        weight: number;
        schema: any;
    };
    constructor(component: any, options: any, data: any);
    calendars: any[];
    calOptions: any;
    get timezone(): any;
    get disabledDates(): any;
    get localeFormat(): string;
    get dateTimeFormat(): string;
    get dateFormat(): any;
    get disableWeekends(): (date: any) => boolean;
    get disableWeekdays(): (date: any) => boolean;
    get disableFunction(): (date: any) => any;
    /**
     * Load the timezones.
     *
     * @return {boolean} TRUE if the zones are loading, FALSE otherwise.
     */
    loadZones(): boolean;
    createWrapper(): boolean;
    defaultFormat: {
        date: string;
        time: string;
    };
    closedOn: number;
    valueFormat: any;
    valueMomentFormat: string;
    /**
     * Return the date value.
     *
     * @param date
     * @param format
     * @return {string}
     */
    getDateValue(date: any, format: any): string;
}
import Input from "../_classes/input/Input";
