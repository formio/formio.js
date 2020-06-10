export default class Builders {
    static builders: {
        pdf: typeof pdf;
        webform: typeof webform;
        wizard: typeof wizard;
    };
    static addBuilder(name: any, builder: any): void;
    static addBuilders(builders: any): void;
    static getBuilder(name: any): any;
    static getBuilders(): {
        pdf: typeof pdf;
        webform: typeof webform;
        wizard: typeof wizard;
    };
}
import pdf from "./pdf/PDFBuilder";
import webform from "./webform/WebformBuilder";
import wizard from "./wizard/WizardBuilder";
