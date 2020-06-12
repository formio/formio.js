export default class HTMLComponent extends Component {
    static get builderInfo(): {
        title: string;
        group: string;
        icon: string;
        weight: number;
        documentation: string;
        schema: any;
    };
    constructor(component: any, options: any, data: any);
    get content(): any;
    get singleTags(): string[];
    renderContent(): any;
}
import Component from "../_classes/component/Component";
