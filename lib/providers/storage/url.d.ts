export default url;
declare function url(formio: any): {
    title: string;
    name: string;
    uploadFile(file: any, name: any, dir: any, progressCallback: any, url: any, options: any, fileKey: any): any;
    deleteFile(fileInfo: any): any;
    downloadFile(file: any): any;
};
declare namespace url {
    export const title: string;
}
