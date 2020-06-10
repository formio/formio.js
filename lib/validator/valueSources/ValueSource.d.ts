export class ValueSource extends BaseEntity {
    static get weight(): number;
    static getInputEditForm(options: any): any;
    constructor(context?: {});
    getValue(input: any): void;
}
import { BaseEntity } from "../BaseEntity";
