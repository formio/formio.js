export default Evaluator;
declare namespace Evaluator {
    export const noeval: boolean;
    export const cache: {};
    export namespace templateSettings {
        export const evaluate: RegExp;
        export const interpolate: RegExp;
        export const escape: RegExp;
    }
    export function evaluator(func: any, ...params: any[]): any;
    export function evaluator(func: any, ...params: any[]): any;
    export function template(template: any, hash: any): any;
    export function template(template: any, hash: any): any;
    export function interpolate(rawTemplate: any, data: any): any;
    export function interpolate(rawTemplate: any, data: any): any;
    export function evaluate(func: any, args: any): any;
    export function evaluate(func: any, args: any): any;
}
