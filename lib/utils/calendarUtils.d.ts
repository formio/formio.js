/**
 * Checks the value for a min date and max date.
 *
 * @param {moment} value
 *   The value to check.
 * @param {[String]} format
 *   A moment formats.
 * @param {Date} maxDate
 *   The max date.
 * @param {Date} minDate
 *   The min date.
 * * @return {{message: string, result: boolean}}
 */
export function lessOrGreater(value: any, format: [string], maxDate: Date, minDate: Date): {
    message: string;
    result: boolean;
};
/**
 * Checks the entered date for validity.
 *
 * @param {String} value
 *   The value to check.
 * @param {[String]} format
 *   A moment formats.
 * @param {Date} maxDate
 *   The max date.
 * @param {Date} minDate
 *   The min date.
 * * @return {{message: string, result: boolean}}
 */
export function checkInvalidDate(value: string, format: [string], minDate: Date, maxDate: Date): {
    message: string;
    result: boolean;
};
export namespace CALENDAR_ERROR_MESSAGES {
    export const INVALID: string;
    export const INCOMPLETE: string;
    export function greater(date: any, format: any): string;
    export function greater(date: any, format: any): string;
    export function less(date: any, format: any): string;
    export function less(date: any, format: any): string;
}
