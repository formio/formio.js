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
    get widget(): any;
    createWrapper(): boolean;
}
import Input from "../_classes/input/Input";
