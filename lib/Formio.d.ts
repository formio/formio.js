/**
 * The Formio interface class.
 *
 *   let formio = new Formio('https://examples.form.io/example');
 */
export class Formio {
    static loadProjects(query: any, opts: any): any;
    static getUrlParts(url: any, formio: any): any;
    static serialize(obj: any, _interpolate: any): string;
    static getRequestArgs(formio: any, type: any, url: any, method: any, data: any, opts: any): {
        url: any;
        method: any;
        data: any;
        opts: any;
    };
    static makeStaticRequest(url: any, method: any, data: any, opts: any): any;
    static makeRequest(formio: any, type: any, url: any, method: any, data: any, opts: any): any;
    static request(url: any, method: any, data: any, header: any, opts: any): any;
    static set token(arg: any);
    static get token(): any;
    static setToken(token: string, opts: any): any;
    static getToken(options: any): any;
    static setUser(user: any, opts?: {}): any;
    static getUser(options: any): any;
    static setBaseUrl(url: any): void;
    static getBaseUrl(): string;
    static setApiUrl(url: any): void;
    static getApiUrl(): string;
    static setAppUrl(url: any): void;
    static setProjectUrl(url: any): void;
    static setAuthUrl(url: any): void;
    static getAppUrl(): string;
    static getProjectUrl(): string;
    static clearCache(): void;
    static noop(): void;
    static identity(value: any): any;
    static deregisterPlugin(plugin: any): boolean;
    static registerPlugin(plugin: any, name: any): void;
    static getPlugin(name: any): any;
    static pluginWait(pluginFn: any, ...args: any[]): any;
    static pluginGet(pluginFn: any, ...args: any[]): any;
    static pluginAlter(pluginFn: any, value: any, ...args: any[]): any;
    static accessInfo(formio: any): any;
    static projectRoles(formio: any): any;
    static currentUser(formio: any, options: any): any;
    static logout(formio: any, options: any): any;
    static pageQuery(): {
        paths: any[];
    };
    static oAuthCurrentUser(formio: any, token: any): any;
    static samlInit(options: any): any;
    static oktaInit(options: any): any;
    static ssoInit(type: any, options: any): any;
    static requireLibrary(name: any, property: any, src: any, polling: any): any;
    static libraryReady(name: any): any;
    static addToGlobal(global: any): void;
    constructor(path: any, options?: {});
    base: any;
    projectsUrl: any;
    projectUrl: any;
    projectId: any;
    roleUrl: string;
    rolesUrl: string;
    roleId: string;
    formUrl: any;
    formsUrl: string;
    formId: any;
    submissionsUrl: string;
    submissionUrl: string;
    submissionId: string;
    actionsUrl: string;
    actionId: string;
    actionUrl: string;
    vsUrl: string;
    vId: string;
    vUrl: string;
    query: string;
    path: any;
    options: {};
    noProject: boolean;
    pathType: any;
    delete(type: any, opts: any): any;
    index(type: any, query: any, opts: any): any;
    save(type: any, data: any, opts: any): any;
    load(type: any, query: any, opts: any): any;
    makeRequest(...args: any[]): any;
    loadProject(query: any, opts: any): any;
    saveProject(data: any, opts: any): any;
    deleteProject(opts: any): any;
    loadRole(opts: any): any;
    saveRole(data: any, opts: any): any;
    deleteRole(opts: any): any;
    loadRoles(opts: any): any;
    loadForm(query: any, opts: any): any;
    saveForm(data: any, opts: any): any;
    deleteForm(opts: any): any;
    loadForms(query: any, opts: any): any;
    loadSubmission(query: any, opts: any): any;
    saveSubmission(data: any, opts: any): any;
    deleteSubmission(opts: any): any;
    loadSubmissions(query: any, opts: any): any;
    loadAction(query: any, opts: any): any;
    saveAction(data: any, opts: any): any;
    deleteAction(opts: any): any;
    loadActions(query: any, opts: any): any;
    availableActions(): any;
    actionInfo(name: any): any;
    isObjectId(id: any): boolean;
    getProjectId(): any;
    getFormId(): any;
    currentUser(options: any): any;
    accessInfo(): any;
    /**
     * Returns the JWT token for this instance.
     *
     * @return {*}
     */
    getToken(options: any): any;
    /**
     * Sets the JWT token for this instance.
     *
     * @return {*}
     */
    setToken(token: any, options: any): any;
    /**
     * Returns a temporary authentication token for single purpose token generation.
     */
    getTempToken(expire: any, allowed: any, options: any): any;
    /**
     * Get a download url for a submission PDF of this submission.
     *
     * @return {*}
     */
    getDownloadUrl(form: any): any;
    uploadFile(storage: any, file: any, fileName: any, dir: any, progressCallback: any, url: any, options: any, fileKey: any): any;
    downloadFile(file: any, options: any): any;
    /**
     * Returns the user permissions to a form and submission.
     *
     * @param user - The user or current user if undefined. For anonymous, use "null"
     * @param form - The form or current form if undefined. For no form check, use "null"
     * @param submission - The submisison or "index" if undefined.
     *
     * @return {create: boolean, read: boolean, edit: boolean, delete: boolean}
     */
    userPermissions(user: any, form: any, submission: any): any;
    /**
     * Determine if the current user can submit a form.
     * @return {*}
     */
    canSubmit(): any;
    getUrlParts(url: any): any;
}
export namespace Formio {
    export const libraries: {};
    export { NativePromise as Promise };
    export { fetch };
    export { Headers };
    export const baseUrl: string;
    import projectUrl = baseUrl;
    export { projectUrl };
    export const authUrl: string;
    export const projectUrlSet: boolean;
    export const plugins: any[];
    export const cache: {};
    export { Providers };
    export const version: string;
    export const events: EventEmitter;
}
declare const fetch: any;
declare const Headers: any;
import { Providers } from "./providers/Providers";
import { EventEmitter2 as EventEmitter } from "eventemitter2";
export {};
