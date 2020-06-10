export default class PDFBuilder extends WebformBuilder {
    constructor(...args: any[]);
    get hasPDF(): any;
    get projectUrl(): any;
    afterAttach(): void;
    upload(file: any): void;
    setUploadError(message: any): void;
    initIframeEvents(): void;
    initDropzoneEvents(): void;
    prepSidebarComponentsForDrag(): void;
    updateDropzoneDimensions(): void;
    onDragStart(e: any): void;
    itemOffsetX: any;
    itemOffsetY: any;
    onDropzoneDrop(e: any): boolean;
    dropEvent: any;
    onDragEnd(e: any): void;
}
import WebformBuilder from "../webform/WebformBuilder";
