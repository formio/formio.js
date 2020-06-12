export class QuickRule extends BaseEntity {
    static get weight(): number;
    static getEditForm(options: any): any;
    constructor(context?: {});
    addRule(input: any): void;
}
import { BaseEntity } from "../BaseEntity";
