export default class ColumnsComponent extends NestedComponent {
    static get builderInfo(): {
        title: string;
        icon: string;
        group: string;
        documentation: string;
        weight: number;
        schema: any;
    };
    constructor(component: any, options: any, data: any);
    rows: any[];
    get columnKey(): string;
    columns: any[];
    get gridSize(): number;
    justifyRow(columns: any): void;
    /**
     * Group columns in rows.
     * @return {Array.<ColumnComponent[]>}
     */
    groupByRow(): Array<any[]>;
    justify(): void;
}
import NestedComponent from "../_classes/nested/NestedComponent";
