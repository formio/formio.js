export default class EditGridComponent extends NestedArrayComponent {
    static get builderInfo(): {
        title: string;
        icon: string;
        group: string;
        documentation: string;
        weight: number;
        schema: any;
    };
    static get defaultHeaderTemplate(): string;
    static get defaultRowTemplate(): string;
    constructor(...args: any[]);
    get editgridKey(): string;
    get rowRef(): string;
    get rowElements(): any;
    get addRowRef(): string;
    get addRowElements(): any;
    get saveRowRef(): string;
    get saveRowElements(): any;
    get cancelRowRef(): string;
    get cancelRowElements(): any;
    get inlineEditMode(): any;
    get saveEditMode(): boolean;
    get minLength(): any;
    hasRemoveButtons(): boolean;
    get lazyComponentsInstantiation(): any;
    editRows: any;
    isOpen(editRow: any): any;
    renderRow(row: any, rowIndex: any): any;
    addRow(data?: {}): {
        components: any;
        data: {};
        state: string;
        backup: any;
        error: any;
    };
    cloneRow(rowIndex: any): {
        components: any;
        data: {};
        state: string;
        backup: any;
        error: any;
    };
    addRowModal(rowIndex: any): any;
    editRow(rowIndex: any): any;
    clearErrors(rowIndex: any): void;
    cancelRow(rowIndex: any): void;
    saveRow(rowIndex: any): boolean;
    updateComponentsRowIndex(components: any, rowIndex: any): void;
    updateRowsComponents(rowIndex: any): void;
    baseRemoveRow(rowIndex: any): any;
    removeRow(rowIndex: any): void;
    createRowComponents(row: any, rowIndex: any): any;
    validateRow(editRow: any, dirty: any): boolean;
    restoreRowContext(editRow: any, flags?: {}): void;
}
import NestedArrayComponent from "../_classes/nestedarray/NestedArrayComponent";
