export default class ReCaptchaComponent extends Component {
    static get builderInfo(): {
        title: string;
        group: string;
        icon: string;
        documentation: string;
        weight: number;
        schema: any;
    };
    constructor(component: any, options: any, data: any);
    createInput(): void;
    recaptchaApiReady: any;
    createLabel(): void;
    verify(actionName: any): void;
    recaptchaVerifiedPromise: any;
    sendVerificationRequest(token: any): any;
}
import Component from "../_classes/component/Component";
