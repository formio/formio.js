export default class DataMapComponent extends DataGridComponent {
    constructor(component: any, options: any, data: any);
    get keySchema(): {
        type: string;
        input: boolean;
        hideLabel: boolean;
        label: any;
        key: string;
    };
    get valueKey(): any;
    getRowKey(rowIndex: any): string;
    addChildComponent(component: any): void;
    saveChildComponent(component: any): void;
    removeChildComponent(): void;
}
import DataGridComponent from "../datagrid/DataGrid";
