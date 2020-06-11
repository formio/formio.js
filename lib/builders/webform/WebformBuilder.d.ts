export default class WebformBuilder extends Component {
    constructor(...args: any[]);
    builderHeight: number;
    schemas: {};
    repeatablePaths: any[];
    sideBarScroll: any;
    sideBarScrollOffset: any;
    dragDropEnabled: boolean;
    builder: any;
    groups: {};
    groupOrder: any;
    webform: any;
    pathComponentsMapping: {};
    arrayDataComponentPaths: any[];
    nestedDataComponents: any[];
    arrayDataComponents: any[];
    allowDrop(): boolean;
    addExistingResourceFields(resources: any): void;
    getNestedComponents(components?: any[], path?: string): void;
    getNestedComponentsMap(): void;
    getComponents(): any;
    createForm(options: any): any;
    get defaultGroups(): {
        basic: {
            title: string;
            weight: number;
            default: boolean;
        };
        advanced: {
            title: string;
            weight: number;
        };
        layout: {
            title: string;
            weight: number;
        };
        data: {
            title: string;
            weight: number;
        };
        premium: {
            title: string;
            weight: number;
        };
    };
    set form(arg: any);
    get form(): any;
    get container(): any;
    /**
     * When a component sets its api key, we need to check if it is unique within its namespace. Find the namespace root
     * so we can calculate this correctly.
     * @param component
     */
    findNamespaceRoot(component: any): any;
    recurseNamespace(component: any): any;
    initDragula(): void;
    dragula: any;
    getComponentInfo(key: any, group: any): any;
    getComponentsPath(component: any, parent: any): string;
    onDrop(element: any, target: any, source: any, sibling: any): any;
    setForm(form: any): any;
    populateRecaptchaSettings(form: any): void;
    removeComponent(component: any, parent: any, original: any): boolean;
    updateComponent(component: any, changed: any): void;
    findRepeatablePaths(): any[];
    highlightInvalidComponents(): void;
    /**
     * Called when a new component is saved.
     *
     * @param parent
     * @param component
     * @return {boolean}
     */
    saveComponent(component: any, parent: any, isNew: any, original: any): boolean;
    editBuildingForm(isJsonEdit: any): void;
    editForm: Webform;
    componentEdit: HTMLElement;
    dialog: HTMLElement;
    editComponent(component: any, parent: any, isNew: any, isJsonEdit: any, original: any): void;
    sidebarForm: Webform;
    editFormWrapper: Element;
    sidebarFormWrapper: Element;
    /**
     * Creates copy of component schema and stores it under sessionStorage.
     * @param {Component} component
     * @return {*}
     */
    copyComponent(component: Component): any;
    /**
     * Paste copied component after the current component.
     * @param {Component} component
     * @return {*}
     */
    pasteComponent(component: Component): any;
    getParentElement(element: any): any;
    addBuilderComponentInfo(component: any): any;
    addBuilderGroup(name: any, group: any): void;
    updateBuilderGroup(name: any, group: any): void;
}
import Component from "../../components/_classes/component/Component";
import { Webform } from "../../displays/webform/Webform";
