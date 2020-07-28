export default class FormComponent extends Component {
    static get builderInfo(): {
        title: string;
        icon: string;
        group: string;
        documentation: string;
        weight: number;
        schema: any;
    };
    constructor(component: any, options: any, data: any);
    formObj: any;
    valueChanged: boolean;
    subForm: any;
    formSrc: any;
    getComponent(path: any, fn: any): any;
    getSubOptions(options?: {}): {};
    subFormReady: any;
    /**
     * Pass everyComponent to subform.
     * @param args
     * @returns {*|void}
     */
    everyComponent(...args: any[]): any | void;
    /**
     * Create a subform instance.
     *
     * @return {*}
     */
    createSubForm(): any;
    /**
     * Load the subform.
     */
    loadSubForm(): any;
    /**
     * Determine if the subform should be submitted.
     * @return {*|boolean}
     */
    get shouldSubmit(): any;
    /**
     * Returns the data for the subform.
     *
     * @return {*}
     */
    getSubFormData(): any;
    /**
     * Submit the subform if configured to do so.
     *
     * @return {*}
     */
    submitSubForm(rejectOnError: any): any;
    isHidden(): boolean;
    updateSubFormVisibility(): void;
    isInternalEvent(event: any): boolean;
    createEmitter(): any;
}
import Component from "../_classes/component/Component";
