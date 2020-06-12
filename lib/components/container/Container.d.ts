export default class ContainerComponent extends NestedDataComponent {
    static get builderInfo(): {
        title: string;
        icon: string;
        group: string;
        documentation: string;
        weight: number;
        schema: any;
    };
    constructor(...args: any[]);
}
import NestedDataComponent from "../_classes/nesteddata/NestedDataComponent";
