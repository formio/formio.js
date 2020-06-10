export default class Providers {
    static providers: {
        address: {
            [x: string]: typeof import("./address/CustomAddressProvider").CustomAddressProvider;
        };
        auth: {};
        storage: {
            base64: {
                (): {
                    title: string;
                    name: string;
                    uploadFile(file: any, fileName: any): any;
                    downloadFile(file: any): any;
                };
                title: string;
            };
            url: {
                (formio: any): {
                    title: string;
                    name: string;
                    uploadFile(file: any, name: any, dir: any, progressCallback: any, url: any, options: any, fileKey: any): any;
                    deleteFile(fileInfo: any): any;
                    downloadFile(file: any): any;
                };
                title: string;
            };
        };
    };
    static addProvider(type: any, name: any, provider: any): void;
    static addProviders(type: any, providers: any): void;
    static getProvider(type: any, name: any): any;
    static getProviders(type: any): any;
}
