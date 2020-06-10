export default class DataGridComponent extends NestedArrayComponent {
    static get builderInfo(): {
        title: string;
        icon: string;
        group: string;
        documentation: string;
        weight: number;
        schema: any;
    };
    constructor(...args: any[]);
    rows: any[];
    visibleColumns: {};
    get addAnotherPosition(): any;
    get minLength(): any;
    get datagridKey(): string;
    get allowReorder(): any;
    /**
     * Split rows into chunks.
     * @param {Number[]} groups - array of numbers where each item is size of group
     * @param {Array<T>} rows - rows collection
     * @return {Array<T[]>}
     */
    getRowChunks(groups: number[], rows: Array<any>): Array<any[]>;
    /**
     * Create groups object.
     * Each key in object represents index of first row in group.
     * @return {Object}
     */
    getGroups(): any;
    /**
     * Retrun group sizes.
     * @return {Number[]}
     */
    getGroupSizes(): number[];
    hasRowGroups(): boolean;
    totalRowsNumber(groups: any): any;
    setStaticValue(n: any): void;
    hasExtraColumn(): boolean;
    hasRemoveButtons(): boolean;
    hasTopSubmit(): boolean;
    hasBottomSubmit(): boolean;
    get canAddColumn(): boolean;
    getRows(): {}[];
    getColumns(): any;
    hasHeader(): any;
    dragula: any;
    onReorder(element: any, _target: any, _source: any, sibling: any): void;
    addRow(): void;
    removeRow(index: any): void;
    getRowValues(): any[];
    setRowComponentsData(rowIndex: any, rowData: any): void;
    createRows(init: any): boolean;
    createRowComponents(row: any, rowIndex: any): {};
    checkColumns(data: any, flags?: {}): {
        rebuild: boolean;
        show: boolean;
    };
    toggleGroup(element: any, index: any): void;
}
import NestedArrayComponent from "../_classes/nestedarray/NestedArrayComponent";
