export default class FileComponent extends Field {
    static get builderInfo(): {
        title: string;
        group: string;
        icon: string;
        documentation: string;
        weight: number;
        schema: any;
    };
    constructor(component: any, options: any, data: any);
    support: {
        filereader: boolean;
        formdata: boolean;
        hasWarning: boolean;
        progress: boolean;
    };
    filesReady: any;
    filesReadyResolve: any;
    filesReadyReject: any;
    set cameraMode(arg: any);
    get cameraMode(): any;
    statuses: any[];
    loadImage(fileInfo: any): any;
    get hasTypes(): boolean;
    getVideoStream(constraints: any): Promise<MediaStream>;
    stopVideoStream(videoStream: any): void;
    getFrame(videoPlayer: any): any;
    startVideo(): void;
    videoStream: MediaStream;
    stopVideo(): void;
    takePicture(): void;
    browseFiles(attrs?: {}): any;
    _cameraMode: any;
    get useWebViewCamera(): any;
    get imageUpload(): boolean;
    get browseOptions(): {
        multiple: boolean;
        accept: string;
    };
    deleteFile(fileInfo: any): void;
    fileSize(a: any, b: any, c: any, d: any, e: any): string;
    globStringToRegex(str: any): any;
    translateScalars(str: any): any;
    validatePattern(file: any, val: any): boolean;
    validateMinSize(file: any, val: any): boolean;
    validateMaxSize(file: any, val: any): boolean;
    upload(files: any): void;
    getFile(fileInfo: any): void;
}
import Field from "../_classes/field/Field";
