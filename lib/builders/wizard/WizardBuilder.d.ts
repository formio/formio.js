export default class WizardBuilder extends WebformBuilder {
    constructor(...args: any[]);
    _form: any;
    page: number;
    get pages(): any;
    get currentPage(): any;
    addPage(): any;
    removePage(pageIndex: any, componentIndex: any): any;
    setPage(index: any): any;
    getPageConfig(index: any, components?: any[]): {
        title: string;
        label: string;
        type: string;
        key: string;
        components: any[];
    };
}
import WebformBuilder from "../webform/WebformBuilder";
