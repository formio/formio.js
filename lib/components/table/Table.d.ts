export default class TableComponent extends NestedComponent {
    static emptyTable(numRows: any, numCols: any): {
        components: any[];
    }[][];
    static get builderInfo(): {
        title: string;
        group: string;
        icon: string;
        weight: number;
        documentation: string;
        schema: any;
    };
    constructor(...args: any[]);
    get cellClassName(): string;
    get tableKey(): string;
    noField: boolean;
    table: any[];
}
import NestedComponent from "../_classes/nested/NestedComponent";
