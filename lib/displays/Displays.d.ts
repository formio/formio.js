export class Displays {
    static displays: {
        pdf: typeof PDF;
        webform: typeof Webform;
        wizard: typeof Wizard;
    };
    static addDisplay(name: any, display: any): void;
    static addDisplays(displays: any): void;
    static getDisplay(name: any): any;
    static getDisplays(): {
        pdf: typeof PDF;
        webform: typeof Webform;
        wizard: typeof Wizard;
    };
}
import { PDF } from "./pdf/PDF";
import { Webform } from "./webform/Webform";
import { Wizard } from "./wizard/Wizard";
