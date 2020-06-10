export default class SignatureComponent extends Input {
    static get builderInfo(): {
        title: string;
        group: string;
        icon: string;
        weight: number;
        documentation: string;
        schema: any;
    };
    constructor(component: any, options: any, data: any);
    currentWidth: any;
    scale: any;
    showCanvas(show: any): void;
    onDisabled(): void;
    checkSize(force: any, scale: any): void;
    signaturePad: any;
}
import Input from "../_classes/input/Input";
