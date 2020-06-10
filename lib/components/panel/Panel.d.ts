export default class PanelComponent extends NestedComponent {
    static get builderInfo(): {
        title: string;
        icon: string;
        group: string;
        documentation: string;
        weight: number;
        schema: any;
    };
    constructor(...args: any[]);
    noField: boolean;
}
import NestedComponent from "../_classes/nested/NestedComponent";
