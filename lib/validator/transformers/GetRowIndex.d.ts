export class GetRowIndexTransformer extends Transformer {
    static get name(): string;
    static get title(): string;
    static get optionsEditForm(): {
        label: string;
        dataSrc: string;
        data: {
            custom({ instance }: {
                instance: any;
            }): any;
        };
        valueProperty: string;
        dataType: string;
        template: string;
        key: string;
        type: string;
        input: boolean;
    }[];
    constructor(context?: {});
}
import { Transformer } from "./Transformer";
