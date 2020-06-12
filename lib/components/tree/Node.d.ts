export default class Node {
    constructor(parent: any, { data, children, }?: {
        data?: {};
        children?: any[];
    }, { checkNode, createComponents, isNew, removeComponents, }?: {
        checkNode: any;
        createComponents: any;
        isNew?: boolean;
        removeComponents: any;
    });
    parent: any;
    previousData: any;
    persistentData: any;
    new: boolean;
    createComponents: any;
    checkNode: any;
    removeComponents: any;
    revertAvailable: boolean;
    editing: boolean;
    collapsed: boolean;
    components: any[];
    children: any[];
    get value(): {
        data: any;
        children: any[];
    };
    get isRoot(): boolean;
    get changing(): boolean;
    get hasChangingChildren(): any;
    get hasData(): boolean;
    get hasChildren(): boolean;
    eachChild(iteratee: any): Node;
    getComponents(): any;
    addChild(): Node;
    removeChild(childToRemove: any): Node;
    edit(): Node;
    save(): Node;
    cancel(): Node;
    remove(): Node;
    revert(): Node;
    data: any;
    commitData(): Node;
    resetData(): Node;
    updateComponentsContext(): Node;
    instantiateComponents(): void;
    clearComponents(): void;
}
