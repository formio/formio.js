export namespace KEY_CODES {
    export const BACK_KEY: number;
    export const DELETE_KEY: number;
    export const TAB_KEY: number;
    export const ENTER_KEY: number;
    export const A_KEY: number;
    export const ESC_KEY: number;
    export const UP_KEY: number;
    export const DOWN_KEY: number;
    export const PAGE_UP_KEY: number;
    export const PAGE_DOWN_KEY: number;
}
export default ChoicesWrapper;
declare class ChoicesWrapper extends Choices {
    constructor(...args: any[]);
    _onTabKey({ activeItems, hasActiveDropdown }: {
        activeItems: any;
        hasActiveDropdown: any;
    }): void;
    isDirectionUsing: boolean;
    shouldOpenDropDown: boolean;
    _handleButtonAction(activeItems: any, element: any): any;
    _onDirectionKey(...args: any[]): any;
    _selectHighlightedChoice(activeItems: any): void;
    _onKeyDown(event: any): any;
    onSelectValue({ event, activeItems, hasActiveDropdown }: {
        event: any;
        activeItems: any;
        hasActiveDropdown: any;
    }): void;
}
import Choices from "choices.js";
