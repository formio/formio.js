export default class TreeComponent extends NestedComponent {
    static get builderInfo(): {
        title: string;
        icon: string;
        group: string;
        weight: number;
        schema: any;
    };
    constructor(...args: any[]);
    get viewComponents(): any;
    viewComponentsInstantiated: boolean;
    _viewComponents: any;
    componentOptions: {
        parent: TreeComponent;
        root: Component | TreeComponent;
    };
    createComponents(data: any, node: any): any;
    removeComponents(components: any): any;
    renderTree(node?: {}, odd?: boolean): any;
    renderChildNodes(nodes: any[], odd: any): any[];
    renderEdit(node?: {}): any;
    renderView(node?: {}): any;
    attachNode(element: any, node: any): any;
    attachActions(node: any): void;
    attachChildren(node: any): any;
    addChild(parent: any): void;
    cancelNode(node: any): void;
    editNode(node: any): void;
    removeNode(node: any): void;
    revertNode(node: any): void;
    saveNode(node: any): void;
    toggleNode(node: any): void;
    removeRoot(): void;
    setRoot(): void;
    treeRoot: Node;
    updateTree(): void;
    checkNode(data: any, node: any, flags: any, row: any): any;
}
import NestedComponent from "../_classes/nested/NestedComponent";
import Component from "../_classes/component/Component";
import Node from "./Node";
