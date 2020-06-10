export default class ContentComponent extends Component {
    static get builderInfo(): {
        title: string;
        group: string;
        icon: string;
        preview: boolean;
        documentation: string;
        weight: number;
        schema: any;
    };
    constructor(component: any, options: any, data: any);
    get content(): any;
}
import Component from "../_classes/component/Component";
