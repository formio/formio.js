export default base64;
declare function base64(): {
    title: string;
    name: string;
    uploadFile(file: any, fileName: any): any;
    downloadFile(file: any): any;
};
declare namespace base64 {
    export const title: string;
}
