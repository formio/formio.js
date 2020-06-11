export class PDF extends Webform {
    constructor(element: any, options: any);
    submitButton: any;
    iframeReady: any;
    iframeReadyResolve: any;
    iframeReadyReject: any;
    iframeElement: HTMLElement;
    /**
     * Get the submission from the iframe.
     *
     * @return {Promise<any>}
     */
    getSubmission(): Promise<any>;
    getSrc(): string;
    downloadButton: HTMLElement;
    postMessage(message: any): void;
    checkSubmitButtonHiddenness(): boolean;
}
import { Webform } from "../webform/Webform";
