import EventEmitter from 'eventemitter3';
import Plugins from './Plugins';

export interface FormioLibrarySource {
    type: string;
    src: string;
}

/**
 * The Formio class options interface.
 */
export interface FormioOptions {
    /**
     * The base API url of the Form.io Platform. Example: https://api.form.io
     */
    base?: string;
    /**
     * The project API url of the Form.io Project. Example: https://examples.form.io
     */
    project?: string;
    useSessionToken?: boolean;
    formOnly?: boolean;
}
/**
 * The different path types for a project.
 */
export declare enum FormioPathType {
    Subdirectories = 'Subdirectories',
    Subdomains = 'Subdomains'
}

export interface ConditionalOptions {
  /** If the field should show if the condition is true */
  show?: boolean;
  /** The field API key that it should compare its value against to determine if the condition is triggered. */
  when?: string;
  /** The value that should be checked against the comparison component */
  eq?: string;
  /** The JSON Logic to determine if this component is conditionally available.
   * Fyi: http://jsonlogic.com/
   */
  json?: Object;
}

export interface ValidateOptions {
  /**
   * If this component is required.
   */
  required?: boolean;

  /**
   * For text input, this checks the minimum length of text for valid input
   */
  minLength?: number;

  /**
   * For text input, this checks the maximum length of text for valid input
   */
  maxLength?: number;

  /**
   * For text input, this checks the text agains a Regular expression pattern.
   */
  pattern?: string;

  /**
   * A custom javascript based validation or a JSON object for using JSON Logic
   */
  custom?: any;

  /**
   * If the custom validation should remain private (only the backend will see it and execute it).
   */
  customPrivate?: boolean;

  /**
   * Minimum value for numbers
   */
  min?: number;

  /**
   * Maximum value for numbers
   */
  max?: number;

  minSelectedCount?: number;
  maxSelectedCount?: number;
  minWords?: number;
  maxWords?: number;
  email?: boolean;
  url?: boolean;
  date?: boolean;
  day?: boolean;
  json?: string;
  mask?: boolean;
  minDate?: any;
  maxDate?: any;
}

/**
 * The Formio interface class. This is a minimalistic API library that allows you to work with the Form.io API's within JavaScript.
 *
 * ## Usage
 * Creating an instance of Formio is simple, and takes only a path (URL String). The path can be different, depending on the desired output.
 * The Formio instance can also access higher level operations, depending on how granular of a path you start with.
 *
 * ```ts
 * var formio = new Formio(<endpoint>, [options]);
 * ```
 *
 * Where **endpoint** is any valid API endpoint within Form.io. These URL's can provide a number of different methods depending on the granularity of the endpoint. This allows you to use the same interface but have access to different methods depending on how granular the endpoint url is.
 * **options** is defined within the {link Formio.constructor} documentation.
 *
 * Here is an example of how this library can be used to load a form JSON from the Form.io API's
 *
 * ```ts
 * const formio = new Formio('https://examples.form.io/example');
 * formio.loadForm().then((form) => {
 *   console.log(form);
 * });
 * ```
 */
export declare class Formio {
    path?: string | undefined;
    options: FormioOptions;
    /**
     * The base API url of the Form.io Platform. Example: https://api.form.io
     */
    static baseUrl: string;
    /**
     * The project API url of the Form.io Project. Example: https://examples.form.io
     */
    static projectUrl: string;
    /**
     * The project url to use for Authentication.
     */
    static authUrl: string;
    /**
     * The path type for the project.
     */
    static pathType?: FormioPathType;
    /**
     * Set to true if the project url has been established with ```Formio.setProjectUrl()```
     */
    static projectUrlSet: boolean;
    /**
     * The Form.io API Cache. This ensures that requests to the same API endpoint are cached.
     */
    static cache: any;
    /**
     * The namespace used to save the Form.io Token's and variables within an application.
     */
    static namespace: string;
    /**
     * Handles events fired within this SDK library.
     */
    static events: EventEmitter;
    /**
     * Stores all of the libraries lazy loaded with ```Formio.requireLibrary``` method.
     */
    static libraries: any;
    /**
     * The Library license for this application.
     */
    static license: string;
    /**
     * A direct interface to the Form.io fetch polyfill.
     */
    static fetch: any;
    /**
     * A direct interface to the Form.io fetch Headers polyfill.
     */
    static Headers: any;
    /**
     * The rules definitions.
     */
    static rulesEntities: any;
    /**
     * All of the auth tokens for this session.
     */
    static tokens: any;
    static config: any;
    static icons: string;
    /**
     * The version of this library.
     */
    static version: string;
    static formOnly: boolean;
    /**
     * The base API url of the Form.io Platform. Example: https://api.form.io
     */
    base: string;
    /**
     * The Projects Endpoint derived from the provided source.
     *
     * @example https://api.form.io/project
     */
    projectsUrl: string;
    /**
     * A specific project endpoint derived from the provided source.
     *
     * @example https://examples.form.io
     */
    projectUrl: string;
    /**
     * The Project ID found within the provided source.
     */
    projectId: string;
    /**
     * A specific Role URL provided the source.
     *
     * @example https://examples.form.io/role/2342343234234234
     */
    roleUrl: string;
    /**
     * The roles endpoint derived from the provided source.
     *
     * @example https://examples.form.io/role
     */
    rolesUrl: string;
    /**
     * The roleID derieved from the provided source.
     */
    roleId: string;
    /**
     * A specific form url derived from the provided source.
     *
     * @example https://examples.form.io/example
     */
    formUrl: string;
    /**
     * The forms url derived from the provided source.
     *
     * @example https://example.form.io/form
     */
    formsUrl: string;
    /**
     * The Form ID derived from the provided source.
     */
    formId: string;
    /**
     * The submissions URL derived from the provided source.
     *
     * @example https://examples.form.io/example/submission
     */
    submissionsUrl: string;
    /**
     * A specific submissions URL derived from a provided source.
     *
     * @example https://examples.form.io/example/submission/223423423423
     */
    submissionUrl: string;
    /**
     * The submission ID provided a submission url.
     */
    submissionId: string;
    /**
     * The actions url provided a form url as the source.
     *
     * @example https://examples.form.io/example/action
     */
    actionsUrl: string;
    /**
     * The Action ID derived from a provided Action url.
     */
    actionId: string;
    /**
     * A specific action api endoint.
     */
    actionUrl: string;
    vsUrl: string;
    vId: string;
    vUrl: string;
    /**
     * The query string derived from the provided src url.
     */
    query: string;
    /**
     * The project type.
     */
    pathType?: FormioPathType;
    /**
     * If this is a non-project url, such is the case for Open Source API.
     */
    noProject: boolean;
    /**
     * @constructor
     * @param {string} path - A project, form, and submission API Url.
     * @param {FormioOptions} options - Available options to configure the Javascript API.
     */
    constructor(path?: string | undefined, options?: FormioOptions);
    /**
     * Deletes a remote resource of any provided type.
     *
     * @param {string} type - The type of resource to delete. "submission", "form", etc.
     * @param {object} options - The options passed to {@link Formio.request}
     * @return {Promise<Response>}
     */
    delete(type: string, opts?: any): any;
    /**
     * Returns the index (array of records) for any provided type.
     *
     * @param {string} type - The type of resource to fetch the index of. "submission", "form", etc.
     * @param {object} query - A query object to pass to the request.
     * @param {object} query.params - A map (key-value pairs) of URL query parameters to add to the url.
     * @param {object} options - Options to pass to {@link Formio.request}
     * @return {Promise<Response>}
     */
    index(type: string, query?: any, opts?: any): any;
    /**
     * Save a document record using "upsert". If the document does not exist, it will be created, if the _id is provided,
     * it will be updated.
     *
     * @param {string} type - The type of resource to fetch the index of. "submission", "form", etc.
     * @param {object} data - The resource data object.
     * @param {object} options - Options to pass to {@link Formio.request}
     * @return {Promise<object>}
     */
    save(type: string, data?: any, opts?: any): any;
    /**
     * @summary Load (GET) a document record.
     *
     * @param {string} type - The type of resource to fetch the index of. "submission", "form", etc.
     * @param {object} query - A query object to pass to the request.
     * @param {object} query.params - A map (key-value pairs) of URL query parameters to add to the url.
     * @param {object} options - Options to pass to {@link Formio.request}
     * @return {Promise<object>}
     */
    load(type: string, query?: any, opts?: any): any;
    /**
     * @summary Call {@link Formio.makeRequest} for this Formio instance.
     *
     * @param {string} type - The request resource type. "submission", "form", etc.
     * @param {string} url - The URL to request.
     * @param {string} method - The request method. GET, PUT, POST, DELETE, or PATCH
     * @param {object} data - The data to pass to the request (for PUT, POST, and PATCH methods)
     * @param {object} options - An object of options to pass to the request method.
     * @param {boolean} options.ignoreCache - To ignore internal caching of the request.
     * @param {object} options.headers - An object of headers to pass along to the request.
     * @param {boolean} options.noToken - If set to true, this will not include the Form.io x-jwt-token along with the request.
     * @param {string} options.namespace - The Form.io namespace to prepend to all LocalStorage variables such as formioToken.
     * @param {boolean} options.getHeaders - Set this if you wish to include the response headers with the return of this method.
     * @return {Promise<Response>}
     */
    makeRequest(type: string, url: string, method?: string, data?: any, opts?: any): any;
    /**
     * @summary Loads a project.
     *
     * ```ts
     * const formio = new Formio('https://examples.form.io');
     * formio.loadProject().then((project) => {
     *   console.log(project);
     * });
     * ```
     *
     * @param {object} query - Query parameters to pass to {@link Formio#load}.
     * @param {object} options - Options to pass to {@link Formio.request}
     * @return {Promise<Object>}
     */
    loadProject(query?: any, opts?: any): any;
    /**
     * Saves or Updates a project.
     *
     * ### Create a new project
     * ```ts
     * const formio = new Formio();
     * formio.saveProject({
     *   title: 'My Project',
     *   path: 'myproject',
     *   name: 'myproject'
     * });
     * ```
     *
     * ### Update an existing project
     * ```ts
     * const formio = new Formio('https://examples.form.io');
     * formio.loadProject().then((project) => {
     *   project.title = 'Title changed';
     *   formio.saveProject(project).then(() => {
     *     console.log('Done saving project!');
     *   });
     * });
     * ```
     *
     * @param {object} data - The project JSON to create or update.
     * @param {object} options - Options to pass to {@link Formio.request}
     * @return {Promise<Object>}
     */
    saveProject(data?: any, opts?: any): any;
    /**
     * Deletes a project
     *
     * ```ts
     * const formio = new Formio('https://examples.form.io');
     * formio.deleteProject();
     * ```
     *
     * @param {object} options - Options to pass to {@link Formio.request}
     * @return {Promise<Object>}
     */
    deleteProject(opts?: any): any;
    /**
     * Loads a list of all projects.
     *
     * ```ts
     * Formio.loadProjects().then((projects) => {
     *   console.log(projects);
     * });
     * ```
     *
     * @param {object} query - Query parameters similar to {@link Formio#load}.
     * @param {object} options - Options to pass to {@link Formio.request}
     * @return {*}
     */
    static loadProjects(query?: any, opts?: any): any;
    /**
     * Loads a role within a project.
     *
     * ```ts
     * const formio = new Formio('https://examples.form.io/role/234234234234');
     * formio.loadRole().then((role) => {
     *   console.log(role);
     * });
     * ```
     *
     * @param {object} options - Options to pass to {@link Formio.request}
     * @return {Promise<Object>}
     */
    loadRole(opts?: any): any;
    /**
     * Create a new or Update an existing role within a project.
     *
     * ### Create new Role example
     * ```ts
     * const formio = new Formio('https://examples.form.io');
     * formio.saveRole({
     *   title: 'Employee',
     *   description: 'A person who belongs to a company.'
     * }).then((role) => {
     *   console.log(role);
     * });
     * ```
     *
     * ### Update existing role example
     * ```ts
     * const formio = new Formio('https://examples.form.io/role/234234234234234');
     * formio.loadRole().then((role) => {
     *   role.title = 'Manager';
     *   formio.saveRole(role).then(() => {
     *     console.log('DONE');
     *   });
     * });
     * ```
     *
     * @param {object} role - The Role JSON to create or update.
     * @param {object} options - Options to pass to {@link Formio.request}
     * @return {Promise<Object>}
     */
    saveRole(data?: any, opts?: any): any;
    /**
     * Deletes a role within a project.
     *
     * @param {object} options - Options to pass to {@link Formio.request}
     * @return {Promise<Response>}
     */
    deleteRole(opts?: any): any;
    /**
     * Load all roles within a project.
     *
     * ```ts
     * const formio = new Formio('https://examples.form.io');
     * formio.loadRoles().then((roles) => {
     *   console.log(roles);
     * });
     * ```
     *
     * @param {object} options - Options to pass to {@link Formio.request}
     * @return {Promise<Response>}
     */
    loadRoles(opts?: any): any;
    /**
     * Loads a form.
     *
     * ```ts
     * const formio = new Formio('https://examples.form.io/example');
     * formio.loadForm().then((form) => {
     *   console.log(form);
     * });
     * ```
     *
     * @param {object} query - Query parameters similar to {@link Formio#load}.
     * @param {object} options - Options to pass to {@link Formio.request}
     * @return {Promise<object>}
     */
    loadForm(query?: any, opts?: any): any;
    /**
     * Create or Update a specific form.
     *
     * ### Create form example
     * ```ts
     * const formio = new Formio('https://examples.form.io');
     * formio.saveForm({
     *   title: 'Employee',
     *   type: 'resource',
     *   path: 'employee',
     *   name: 'employee',
     *   components: [
     *     {
     *       type: 'textfield',
     *       key: 'firstName',
     *       label: 'First Name'
     *     },
     *     {
     *       type: 'textfield',
     *       key: 'lastName',
     *       label: 'Last Name'
     *     }
     *   ]
     * });
     * ```
     *
     * ### Update a form example
     * ```ts
     * const formio = new Formio('https://examples.form.io/example');
     * formio.loadForm().then((form) => {
     *   form.title = 'Changed Title';
     *   formio.saveForm(form).then(() => {
     *     console.log('DONE!!!');
     *   });
     * });
     * ```
     *
     * @param {object} data - The Form JSON to create or update.
     * @param {object} options - Options to pass to {@link Formio.request}
     * @return {Promise<Object>}
     */
    saveForm(data?: any, opts?: any): any;
    /**
     * Deletes a form.
     *
     * ```ts
     * const formio = new Formio('https://examples.form.io/example');
     * formio.deleteForm().then(() => {
     *   console.log('Deleted!');
     * });
     * ```
     *
     * @param {object} options - Options to pass to {@link Formio.request}
     * @return {Promise<Response>}
     */
    deleteForm(opts?: any): any;
    /**
     * Loads all forms within a project.
     *
     * ```ts
     * const formio = new Formio('https://examples.form.io');
     * formio.loadForms().then((forms) => {
     *   console.log(forms);
     * });
     * ```
     *
     * @param {object} query - Query parameters similar to {@link Formio#load}.
     * @param {object} options - Options to pass to {@link Formio.request}
     * @return {Promise<Response>}
     */
    loadForms(query?: any, opts?: any): any;
    /**
     * Loads a specific submissionn.
     *
     * ```ts
     * const formio = new Formio('https://examples.form.io/example/submission/23423423423423423');
     * formio.loadSubmission().then((submission) => {
     *   console.log(submission);
     * });
     * ```
     *
     * @param {object} query - Query parameters similar to {@link Formio#load}.
     * @param {object} options - Options to pass to {@link Formio.request}
     * @return {Promise<object>}
     */
    loadSubmission(query?: any, opts?: any): any;
    /**
     * Creates a new or Updates an existing submission.
     *
     * ### Create a new submission
     * ```ts
     * const formio = new Formio('https://examples.form.io/example');
     * formio.saveSubmission({
     *   data: {
     *     firstName: 'Joe',
     *     lastName: 'Smith'
     *   }
     * }).then((submission) => {
     *   // This will now be the complete submission object saved on the server.
     *   console.log(submission);
     * });
     * ```
     *
     * ### Update an existing submission
     * ```ts
     * const formio = new Formio('https://examples.form.io/example/submission/23423423423423423');
     * formio.loadSubmission().then((submission) => {
     *   submission.data.lastName = 'Thompson';
     *   formio.saveSubmission(submission).then(() => {
     *     console.log('DONE');
     *   });
     * });
     * ```
     *
     * @param {object} data - The submission JSON object.
     * @param {object} options - Options to pass to {@link Formio.request}
     * @return {Promise<Object>}
     */
    saveSubmission(data?: any, opts?: any): any;
    /**
     * Deletes a submission.
     *
     * @param {object} options - Options to pass to {@link Formio.request}
     * @return {Promise<Response>}
     */
    deleteSubmission(opts?: any): any;
    /**
     * Loads all submissions within a form.
     *
     * ```ts
     * const formio = new Formio('https://examples.form.io/example');
     * formio.loadSubmissions({
     *   params: {
     *     limit: 25,
     *     'data.lastName__regex': 'smith'
     *   }
     * }).then((submissions) => {
     *   // Should print out 25 submissions where the last name contains "smith".
     *   console.log(submissions);
     * });
     * ```
     *
     * @param {object} query - Query parameters similar to {@link Formio#load}.
     * @param {object} options - Options to pass to {@link Formio.request}
     * @return {Promise<Response>}
     */
    loadSubmissions(query?: any, opts?: any): any;
    /**
     * Loads a form action.
     *
     * ```ts
     * const formio = new Formio('https://examples.form.io/example/action/234234234234');
     * formio.loadAction().then((action) => {
     *   console.log(action);
     * });
     * ```
     *
     * @param {object} query - Query parameters similar to {@link Formio#load}.
     * @param {object} options - Options to pass to {@link Formio.request}
     * @return {Promise<Object>}
     */
    loadAction(query?: any, opts?: any): any;
    /**
     * Create a new or update an existing action.
     *
     * ### Create a new action for a form.
     * ```ts
     * const formio = new Formio('https://examples.form.io/example');
     * formio.saveAction({
     *   data: {
     *     name: 'webhook',
     *     title: 'Webhook Action',
     *     method: ['create', 'update', 'delete'],
     *     handler: ['after'],
     *     condition: {},
     *     settings: {
     *       url: 'https://example.com',
     *       headers: [{}],
     *       block: false,
     *       forwardHeaders: false
     *     }
     *   }
     * }).then((action) => {
     *   console.log(action);
     * });
     * ```
     *
     * ### Update an action
     * ```ts
     * const formio = new Formio('https://examples.form.io/example/action/234234234234');
     * formio.loadAction().then((action) => {
     *   action.title = 'Updated title';
     *   formio.saveAction(action).then(() => {
     *     console.log('Done!');
     *   });
     * });
     * ```
     *
     * @param {object} data - The action JSON
     * @param {object} options - Options to pass to {@link Formio.request}
     * @return {Promise<Object>}
     */
    saveAction(data?: any, opts?: any): any;
    /**
     * Delete an action
     *
     * ```ts
     * const formio = new Formio('https://examples.form.io/example/action/234234234234');
     * formio.deleteAction().then(() => {
     *   console.log('Action was deleted.');
     * });
     * ```
     *
     * @param {object} options - Options to pass to {@link Formio.request}
     * @return {Promise<Response>}
     */
    deleteAction(opts?: any): any;
    /**
     * Loads all actions within a form.
     *
     * ```ts
     * const formio = new Formio('https://examples.form.io/example');
     * formio.loadActions().then((actions) => {
     *   console.log(actions);
     * });
     * ```
     *
     * @param {object} query - Query parameters similar to {@link Formio#load}.
     * @param {object} options - Options to pass to {@link Formio.request}
     * @return {Promise<Response>}
     */
    loadActions(query?: any, opts?: any): any;
    /**
     * Returns a list of available actions
     *
     * @return {Promise<Response>}
     */
    availableActions(): any;
    /**
     * Returns the action information for a specific action, such as "save".
     *
     * ```ts
     * const formio = new Formio('https://examples.form.io/example/actions/save');
     * formio.actionInfo().then((info) => {
     *   console.log(info);
     * });
     * ```
     *
     * @param {string} name - The name of the action you would like to get information for. i.e. "save", "webhook", etc.
     * @return {Promise<Response>}
     */
    actionInfo(name: string): any;
    /**
     * Determine if a string ID is a valid MongoID.
     *
     * @param {string} id - The id that should be tested if it is avalid id.
     * @return {boolean} - true if it is a valid MongoId, false otherwise.
     */
    isObjectId(id: string): boolean;
    /**
     * Get the project ID of project.
     *
     * ```ts
     * const formio = new Formio('https://examples.form.io');
     * formio.getProjectId().then((projectId) => {
     *   console.log(projectId);
     * };
     * ```
     *
     * @return {Promise<string>}
     */
    getProjectId(): any;
    /**
     * Get the ID of a form.
     *
     * ```ts
     * const formio = new Formio('https://examples.form.io/example');
     * formio.getFormId().then((formId) => {
     *   console.log(formId);
     * });
     * ```
     *
     * @return {Promise<string>}
     */
    getFormId(): any;
    /**
     * Instance method for {@link Formio.currentUser}
     *
     * @param {object} options - Options to pass to {@link Formio.request}
     * @return {Promise<object>}
     */
    currentUser(options?: any): any;
    /**
     * Instance method for {@link Formio.accessInfo}
     *
     * @return {Promise<Response>}
     */
    accessInfo(): any;
    /**
     * Sets OAuth Logout URL.
     *
     * @param {string} uri - Logout URL.
     * @param {string} options.namespace - The localStorage namespace to use when retrieving tokens from storage.
     * @return {string}
     */
    oauthLogoutURI(uri: string, options: string | {
        namespace: string;
    }): string;
    /**
     * Returns the JWT token for this instance.
     *
     * @param {object} options - The following options are provided.
     * @param {string} options.namespace - The localStorage namespace to use when retrieving tokens from storage.
     * @return {string} - The JWT token for this user.
     */
    getToken(options?: any): any;
    /**
     * Sets the JWT token for this instance.
     *
     * @param {string} token - The JWT token to set.
     * @param {object} options - The following options are provided.
     * @param {string} options.namespace - The localStorage namespace to use when retrieving tokens from storage.
     * @return {string} - The JWT token that was set.
     */
    setToken(token: any, options?: any): any;
    /**
     * Returns a temporary authentication token for single purpose token generation.
     *
     * @param {number|string} expire - The amount of seconds to wait before this temp token expires.
     * @param {string} allowed - The allowed path string inn the format GET:/path
     * @param {object} options - The options passed to {@link Formio#getToken}
     */
    getTempToken(expire: any, allowed: string, options?: any): any;
    /**
     * Get a PDF download url for a submission, which will generate a new PDF of the submission. This method will first
     * fetch a temporary download token, and then append this to the download url for this form.
     *
     * ```ts
     * const formio = new Formio('https://examples.form.io/example/submission/324234234234234');
     * formio.getDownloadUrl().then((url) => {
     *   console.log(url);
     * });
     * ```
     *
     * @param {object} [form] - The form JSON to fetch a download url for.
     * @return {Promise<string>} - The download url.
     */
    getDownloadUrl(form: any): any;
    /**
     * Returns the user permissions to a form and submission.
     *
     * @param user - The user or current user if undefined. For anonymous, use "null"
     * @param form - The form or current form if undefined. For no form check, use "null"
     * @param submission - The submisison or "index" if undefined.
     *
     * @return {{create: boolean, read: boolean, edit: boolean, delete: boolean}}
     */
    userPermissions(user?: any, form?: any, submission?: any): Promise<any>;
    /**
     * `Determine if the current user can submit a form.
     * @return {*}
     */
    canSubmit(): Promise<any>;
    getUrlParts(url: string): RegExpMatchArray | null;
    uploadFile(storage: any, file: any, fileName: any, dir: any, progressCallback: any, url: any): any;
    downloadFile(file: any): any;
    deleteFile(file: any): any;
    static getUrlParts(url: string, formio: any): RegExpMatchArray | null;
    static serialize(obj: any, _interpolate?: any): string;
    static getRequestArgs(formio: any, type: string, url: string, method?: any, data?: any, opts?: any): any;
    static makeStaticRequest(url: string, method?: any, data?: any, opts?: any): any;
    /**
     * Make an API request and wrap that request with the Form.io Request plugin system.  This is very similar to the
     * {Formio.request} method with a difference being that it will pass the request through the Form.io request plugin.
     *
     * @param {Formio} formio - An instance of the Formio class.
     * @param {string} type - The request resource type. "submission", "form", etc.
     * @param {string} url - The URL to request.
     * @param {string} method - The request method. GET, PUT, POST, DELETE, or PATCH
     * @param {object} data - The data to pass to the request (for PUT, POST, and PATCH methods)
     * @param {object} options - An object of options to pass to the request method.
     * @param {boolean} options.ignoreCache - To ignore internal caching of the request.
     * @param {object} options.headers - An object of headers to pass along to the request.
     * @param {boolean} options.noToken - If set to true, this will not include the Form.io x-jwt-token along with the request.
     * @param {string} options.namespace - The Form.io namespace to prepend to all LocalStorage variables such as formioToken.
     * @param {boolean} options.getHeaders - Set this if you wish to include the response headers with the return of this method.
     * @return {Promise<Response>}
     */
    static makeRequest(formio: any, type: string, url: string, method?: string, data?: any, opts?: any): any;
    /**
     * Execute an API request to any external system. This is a wrapper around the Web fetch method.
     *
     * ```ts
     * Formio.request('https://examples.form.io').then((form) => {
     *   console.log(form);
     * });
     * ```
     *
     * @param {string} url - The URL to request.
     * @param {string} method - The request method. GET, PUT, POST, DELETE, or PATCH
     * @param {object} data - The data to pass to the request (for PUT, POST, and PATCH methods)
     * @param {Headers} header - An object of headers to pass to the request.
     * @param {object} options - An object of options to pass to the request method.
     * @param {boolean} options.ignoreCache - To ignore internal caching of the request.
     * @param {object} options.headers - An object of headers to pass along to the request.
     * @param {boolean} options.noToken - If set to true, this will not include the Form.io x-jwt-token along with the request.
     * @param {string} options.namespace - The Form.io namespace to prepend to all LocalStorage variables such as formioToken.
     * @param {boolean} options.getHeaders - Set this if you wish to include the response headers with the return of this method.
     * @return {Promise<Response>|*}
     */
    static request(url: string, method?: any, data?: any, header?: any, opts?: any): any;
    static get token(): any;
    static set token(token: any);
    static useSessionToken(options: string | {
        namespace: string;
    }): void;
    /**
     * Sets the JWT in storage to be used within an application.
     *
     * @param {string} token - The JWT token to set.
     * @param {object} options - Options as follows
     * @param {string} options.namespace - The namespace to save the token within. i.e. "formio"
     * @param {Formio} options.formio - The Formio instance.
     * @return {Promise<object>|void}
     */
    static setToken(token?: any, opts?: any): any;
    /**
     * Returns the token set within the application for the user.
     *
     * @param {object} options - The options as follows.
     * @param {string} options.namespace - The namespace of the token you wish to fetch.
     * @param {boolean} options.decode - If you would like the token returned as decoded JSON.
     * @return {*}
     */
    static getToken(options?: any): any;
    /**
     * Sets the current user within the application cache.
     *
     * @param {object} user - JSON object of the user you wish to set.
     * @param {object} options - Options as follows
     * @param {string} options.namespace - The namespace of the tokens
     */
    static setUser(user: any, opts?: any): void;
    /**
     * Returns the user JSON.
     *
     * @param {object} options - Options as follows
     * @param {string} namespace - The namespace of the tokens stored within this application.
     * @return {object} - The user object.
     */
    static getUser(options?: any): any;
    /**
     * Sets the BaseURL for the application.
     *
     * @description Every application developed using the JavaScript SDK must set both the {@link Formio.setBaseUrl} and
     * {@link Formio.setProjectUrl} methods. These two functions ensure that every URL passed into the constructor of this
     * class can determine the "project" context for which the application is running.
     *
     * Any Open Source server applications will set both the {@link Formio.setBaseUrl} and {@link Formio.setProjectUrl}
     * values will be the same value.
     *
     * ```ts
     * Formio.setBaseUrl('https://yourwebsite.com/forms');
     * Formio.setProjectUrl('https://yourwebsite.com/forms/project');
     *
     * // Now the Formio constructor will know what is the "project" and what is the form alias name. Without setBaseUrl
     * // and setProjectUrl, this would throw an error.
     *
     * const formio = new Formio('https://yourwebsite.com/forms/project/user');
     * formio.loadForm().then((form) => {
     *   console.log(form);
     * });
     * ```
     *
     * @param {string} url - The URL of the Base API url.
     */
    static setBaseUrl(url: string): void;
    /**
     * Returns the current base url described at {@link Formio.setBaseUrl}
     *
     * @return {string} - The base url of the application.
     */
    static getBaseUrl(): string;
    static setApiUrl(url: string): void;
    static getApiUrl(): string;
    static setAppUrl(url: string): void;
    /**
     * Sets the Project Url for the application. This is an important method that needs to be set for all applications. It
     * is documented @ {@link Formio.setBaseUrl}.
     *
     * @param {string} url - The project api url.
     */
    static setProjectUrl(url: string): void;
    /**
     * The Auth URL can be set to customize the authentication requests made from an application. By default, this is
     * just the same value as {@link Formio.projectUrl}
     *
     * @param {string} url - The authentication url
     */
    static setAuthUrl(url: string): void;
    static getAppUrl(): string;
    /**
     * Returns the Project url described at {@link Formio.setProjectUrl}
     *
     * @return {string|string} - The Project Url.
     */
    static getProjectUrl(): string;
    /**
     * Clears the runtime internal API cache.
     *
     * @description By default, the Formio class will cache all API requests in memory so that any subsequent requests
     * using GET method will return the cached results as long as the API URl is the same as what was cached previously.
     * This cache can be cleared using this method as follows.
     *
     * ```ts
     * Formio.clearCache();
     * ```
     *
     * Or, if you just wish to clear a single request, then the {@link Formio.request#options.ignoreCache} option can be
     * provided when making an API request as follows.
     *
     * ```ts
     * Formio.loadForm({}, {
     *   ignoreCache: true
     * }).then((form) => {
     *   console.log(form);
     * });
     * ```
     *
     * Both of the following will ensure that a new request is made to the API server and that the results will not be
     * from the cached result.
     */
    static clearCache(): void;
    /**
     * Return the access information about a Project, such as the Role ID's for that project, and if the server is
     * configured to do so, the Form and Resource access configurations that the authenticated user has access to.
     *
     * @description This is useful for an application to determine the UI for a specific user to identify which forms they have
     * access to submit or read.
     *
     * @param {Formio} formio - The Formio instance.
     * @return {Promise<Response>}
     */
    static accessInfo(formio?: any): any;
    /**
     * Returns an array of roles for the project, which includes the ID's and names of those roles.
     *
     * @param {Formio} formio - The Formio instance.
     * @return {Promise<Response>}
     */
    static projectRoles(formio?: any): any;
    /**
     * Return the currentUser object. This will fetch the user from the server and respond with the Submission JSON
     * of that user object.
     *
     * @param {Formio} formio - The Formio instance
     * @param {object} options - The options passed to {@link Formio.getUser}
     * @return {Promise<R>|*}
     */
    static currentUser(formio?: any, options?: any): any;
    /**
     * Performs a logout of the Form.io application. This will reset all cache, as well as make a request to the logout
     * endpoint of the Form.io api platform.
     *
     * @param {Formio} formio - A Formio instance.
     * @param {object} options - Options passed to both {@link Formio.setToken} as well as {@link Formio.setUser}
     * @return {Promise<Response>}
     */
    static logout(formio?: any, options?: any): any;
    /**
     * Returns the query passed to a page in JSON object format.
     *
     * @description For example, lets say you visit your application using
     * the url as follows.
     *
     * ```
     *   https://yourapplication.com/?token=23423423423&username=Joe
     * ```
     *
     * The following code will provide your application with the following.
     *
     * ```ts
     * const query Formio.pageQuery();
     * console.log(query.token); // Will print 23423423423
     * console.log(query.username); // Will print Joe
     * ```
     *
     * @return {{}} - A JSON object representation of the query that was passed to the URL of an application.
     */
    static pageQuery(): any;
    /**
     * Much like {@link Formio.currentUser}, but instead automatically injects the Bearer tokens into the headers to
     * perform a Token swap of the OAuth token which will then return the JWT token for that user.
     *
     * @param {Formio} formio - The Formio instance
     * @param {string} token - An OAuth Bearer token to use for a token swap between the OAuth provider and Form.io
     * @return {Promise<R>|*}
     */
    static oAuthCurrentUser(formio: any, token: string): any;
    static oauthLogoutURI(uri: string, options: string | {
        namespace: string;
    }): string;
    /**
     * Perform a SAML initialization.
     *
     * @description Typically, you would use the {@link Formio.ssoInit} method to perform this function
     * since this method is an alias for the following.
     *
     * ```ts
     * Formio.samlInit();
     * Formio.ssoInit('saml');  // This is the exact same thing as calling Formio.samlInit
     * ```
     *
     * This method will return false if the process is just starting. The code below is a typical block of code that is
     * used to automatically trigger the SAML authentication process within your application using a Button component.
     *
     * ```ts
     * if (Formio.pageQuery().saml) {
     *   const sso = Formio.samlInit();
     *   if (sso) {
     *     sso.then((user) => {
     *       // The SSO user is now loaded!
     *       console.log(user);
     *     });
     *   }
     * }
     * ```
     *
     * You can then place the following code withiin the "Custom" action of a Button component on your form.
     *
     * ```ts
     * Formio.samlInit();
     * ```
     *
     * Now when you click on this button, it will start the handshake process with SAML, and once it returns, will pass
     * a "saml" query parameter back to your application which will execute the code to load the current user from SAML.
     *
     * @param {object} options - Options to pass to the SAML initialization process.
     * @param {string} options.relay - The URL that will be used as the authentication "relay" that occurs during a SAML handshake process.
     * @return {boolean|Promise<Object>|void}
     */
    static samlInit(options?: any): any;
    /**
     * Perform an Okta Authentication process using the {@link https://developer.okta.com/code/javascript/okta_auth_sdk|Okta SDK}.
     *
     * @description This method does require that you first include the Okta JavaScript SDK within your application as follows.
     *
     * First you need to include the Okta Authentication script.
     *
     * ```html
     * <script src="https://ok1static.oktacdn.com/assets/js/sdk/okta-auth-js/2.0.1/okta-auth-js.min.js" type="text/javascript"></script>
     * ```
     *
     * Then you can call this method as follows.
     *
     * ```ts
     * Formio.oktaInit();
     * ```
     *
     * @param {object} options - Options that are passed directly to the {@link https://github.com/okta/okta-auth-js#configuration-reference|Okta SDK constructor}
     * @param {constructor} options.OktaAuth - If the OktaAuth constructor is not provided global to the application, it can be provided to this method using this property.
     * @param {Formio} options.formio - The Formio instance.
     * @param {Array<string>} options.scopes - Scopes that are passed to the {@link https://github.com/okta/okta-auth-js#tokengetwithredirectoptions|getWithRedirect} method from the Okta SDK.
     * @return {Promise<Object>}
     */
    static oktaInit(options?: any): Promise<unknown>;
    /**
     * A common static method to trigger any SSO processes. This method is really just an alias for other static methods.
     *
     * @param {('saml'|'okta')} type - The type of SSO to trigger. 'saml' is an alias for {@link Formio.samlInit}, and 'okta' is an alias for {@link Formio.oktaInit}.
     * @param {object} options - Options to pass to the specific sso methods
     * @return {*|Promise<Object>|boolean|void}
     */
    static ssoInit(type: string, options?: any): any;
    /**
     * Lazy load a remote library dependency.
     *
     * @description This is useful for components that wish to lazy load a required library
     * by adding that library to the <scripts> section of the HTML webpage, and then provide a promise that will resolve
     * when the library becomes available for use.
     *
     * @example Load Google Maps API.
     * ```ts
     * Formio.requireLibrary('googleMaps', 'google.maps.Map', 'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap', true).then(() => {
     *   // Once the promise resolves, the following can now be used within your application.
     *   const map = new google.maps.Map(document.getElementById("map"), {...});
     * });
     * ```
     *
     * @param {string} name - The internal name to give to the library you are loading. This is useful for caching the library for later use.
     * @param {string} property - The name of the global property that will be added to the global namespace once the library has been loaded. This is used to check to see if the property exists before resolving the promise that the library is ready for use.
     * @param {string} src - The URL of the library to lazy load.
     * @param {boolean} polling - Determines if polling should be used to determine if they library is ready to use. If set to false, then it will rely on a global callback called ${name}Callback where "name" is the first property passed to this method. When this is called, that will indicate when the library is ready. In most cases, you will want to pass true to this parameter to initiate a polling method to check for the library availability in the global context.
     * @return {Promise<object>} - A promise that will resolve when the plugin is ready to be used.
     */
    static requireLibrary(name: string, property: string, src: string | Array<string> | FormioLibrarySource | Array<FormioLibrarySource>, polling?: boolean, onload?: (ready: Promise<any>) => void): any;
    /**
     * Determines if a lazy loaded library is ready to be used.
     *
     * @description Example: Let's assume that the example provided at {@link Formio.requireLibrary} was used elsewhere in your application.
     * You could now use the following within a separate place that will also resolve once the library is ready to be used.
     *
     * ```js
     * Formio.libraryReady('googleMaps').then(() => {
     *   // Once the promise resolves, the following can now be used within your application.
     *   const map = new google.maps.Map(document.getElementById("map"), {...});
     * });
     * ```
     *
     * @param {string} name - The name of the library to check.
     * @return {Promise<object>} - A promise that will resolve when the library is ready to be used.
     */
    static libraryReady(name: string): any;
    /**
     * Clones the response from the API so that it cannot be mutated.
     *
     * @param response
     */
    static cloneResponse(response: any): any;
    /**
     * Sets the project path type.
     *
     * @param type
     */
    static setPathType(type: FormioPathType): void;
    static createForm(element: HTMLElement, form: any, options: any): any;
    static builder(element: HTMLElement, form: any, options: any): any;
    static use(plugin: any): void;

    /**
     * Gets the project path type.
     */
    static getPathType(): FormioPathType | undefined;
    static plugins: import('./Plugins').Plugin[];
    static deregisterPlugin: typeof Plugins.deregisterPlugin;
    static registerPlugin: typeof Plugins.registerPlugin;
    static getPlugin: typeof Plugins.getPlugin;
    static pluginWait: typeof Plugins.pluginWait;
    static pluginGet: typeof Plugins.pluginGet;
    static pluginAlter: typeof Plugins.pluginAlter;
}
