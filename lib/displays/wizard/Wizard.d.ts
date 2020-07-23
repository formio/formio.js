export class Wizard extends Webform {
    /**
     * Constructor for wizard based forms
     * @param element Dom element to place this wizard.
     * @param {Object} options Options object, supported options are:
     *    - breadcrumbSettings.clickable: true (default) determines if the breadcrumb bar is clickable or not
     *    - buttonSettings.show*(Previous, Next, Cancel): true (default) determines if the button is shown or not
     */
    constructor(...args: any[]);
    pages: any[];
    prefixComps: any[];
    suffixComps: any[];
    originalComponents: any[];
    page: number;
    currentPanel: any;
    currentNextPage: number;
    _seenPages: number[];
    getPages(args?: {}): any[];
    get wizardKey(): string;
    get buttons(): {};
    get renderContext(): {
        wizardKey: string;
        isBreadcrumbClickable: any;
        panels: any[];
        buttons: {};
        currentPage: number;
    };
    prepareNavigationSettings(ctx: any): any;
    prepareHeaderSettings(ctx: any): any;
    redrawNavigation(): void;
    redrawHeader(): void;
    isBreadcrumbClickable(): any;
    attachNav(): void;
    attachHeader(): void;
    detachNav(): void;
    detachHeader(): void;
    establishPages(): any[];
    setPage(num: any): any;
    pageFieldLogic(page: any): void;
    get currentPage(): any;
    getNextPage(): number;
    getPreviousPage(): number;
    nextPage(): any;
    prevPage(): any;
    getPageIndexByKey(key: any): number;
    setComponentSchema(): void;
    wizard: any;
    isClickable(page: any, index: any): any;
    hasButton(name: any, nextPage?: number): any;
    pageId(page: any): any;
}
import { Webform } from "../webform/Webform";
