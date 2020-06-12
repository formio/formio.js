export class BaseEntity {
    static get name(): void;
    static get title(): void;
    constructor(context?: {});
    context: {};
    get options(): any;
    get engineOptions(): any;
    get targetComponentInstance(): any;
    get sourceComponentInstance(): any;
    get formInstance(): any;
    getOption(name: any): any;
    getRequiredOption(name: any): any;
}
