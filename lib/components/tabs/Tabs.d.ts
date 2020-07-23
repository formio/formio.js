export default class TabsComponent extends NestedComponent {
    static get builderInfo(): {
        title: string;
        group: string;
        icon: string;
        weight: number;
        documentation: string;
        schema: any;
    };
    constructor(...args: any[]);
    get tabKey(): string;
    get tabLikey(): string;
    get tabLinkKey(): string;
    currentTab: number;
    noField: boolean;
    tabs: any[];
    /**
     * Set the current tab.
     *
     * @param index
     */
    setTab(index: any): void;
    beforeFocus(component: any): void;
}
import NestedComponent from "../_classes/nested/NestedComponent";
