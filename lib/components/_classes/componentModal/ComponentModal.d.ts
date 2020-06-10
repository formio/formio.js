export default class ComponentModal {
    static render(component: any, data: any, topLevel: any): any;
    constructor(component: any, modal: any);
    component: any;
    modal: any;
    currentValue: any;
    dataLoaded: boolean;
    get refs(): any;
    init(): void;
    setValue(value: any): void;
    setOpenModalElement(template: any): void;
    openModalTemplate: any;
    loadRefs(): void;
    setEventListeners(): void;
    setOpenEventListener(): void;
    openModalHandler(event: any): void;
    updateView(): void;
    closeModal(): void;
    closeModalHandler(event: any): void;
    showDialog(): void;
    saveModalValueHandler(event: any): void;
}
