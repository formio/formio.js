/* globals OktaAuth */
// Intentionally use native-promise-only here... Other promise libraries (es6-promise)
// duck-punch the global Promise definition which messes up Angular 2 since it
// also duck-punches the global Promise definition. For now, keep native-promise-only.
import NativePromise from 'native-promise-only';
import fetchPonyfill from 'fetch-ponyfill';
import EventEmitter from './EventEmitter';
import cookies from 'browser-cookies';
import Providers from './providers';
import _intersection from 'lodash/intersection';
import _get from 'lodash/get';
import _cloneDeep from 'lodash/cloneDeep';
import _defaults from 'lodash/defaults';
import { eachComponent } from './utils/utils';
import * as Plugins from './Plugins';
import jwtDecode from 'jwt-decode';
import './polyfills';

const { fetch, Headers } = fetchPonyfill({
  Promise: NativePromise
});

const isBoolean = (val) => typeof val === typeof true;
const isNil = (val) => val === null || val === undefined;
const isObject = (val) => val && typeof val === 'object';

function cloneResponse(response) {
  const copy = _cloneDeep(response);

  if (Array.isArray(response)) {
    copy.skip = response.skip;
    copy.limit = response.limit;
    copy.serverCount = response.serverCount;
  }

  return copy;
}

/**
 * The Formio interface class. This is a minimalistic API library that allows you to work with the Form.io API's within JavaScript.
 *
 * #### Example
 * ```js
 * const formio = new Formio('https://examples.form.io/example');
 * formio.loadForm().then((form) => {
 *   console.log(form);
 * });
 * ```
 */
class Formio {
  /* eslint-disable max-statements */
  /**
   * @constructor
   * @param {string} path - A project, form, and submission API Url.
   * @param {object} options - Available options to configure the Javascript API.
   * @param {string} options.base - The base API url of the Form.io Platform. Example: https://api.form.io
   * @param {string} options.project - The project API url of the Form.io Project. Example: https://examples.form.io
   */
  constructor(path, options = {}) {
    // Ensure we have an instance of Formio.
    if (!(this instanceof Formio)) {
      return new Formio(path);
    }

    // Initialize our variables.
    this.base = '';
    this.projectsUrl = '';
    this.projectUrl = '';
    this.projectId = '';
    this.roleUrl = '';
    this.rolesUrl = '';
    this.roleId = '';
    this.formUrl = '';
    this.formsUrl = '';
    this.formId = '';
    this.submissionsUrl = '';
    this.submissionUrl = '';
    this.submissionId = '';
    this.actionsUrl = '';
    this.actionId = '';
    this.actionUrl = '';
    this.vsUrl = '';
    this.vId = '';
    this.vUrl = '';
    this.query = '';

    // Store the original path and options.
    this.path = path;
    this.options = options;

    if (options.hasOwnProperty('base')) {
      this.base = options.base;
    }
    else if (Formio.baseUrl) {
      this.base = Formio.baseUrl;
    }
    else {
      this.base = window.location.href.match(/http[s]?:\/\/api./)[0];
    }

    if (!path) {
      // Allow user to create new projects if this was instantiated without
      // a url
      this.projectUrl = Formio.projectUrl || `${this.base}/project`;
      this.projectsUrl = `${this.base}/project`;
      this.projectId = false;
      this.query = '';
      return;
    }

    if (options.hasOwnProperty('project')) {
      this.projectUrl = options.project;
    }

    const project = this.projectUrl || Formio.projectUrl;
    const projectRegEx = /(^|\/)(project)($|\/[^/]+)/;
    const isProjectUrl = (path.search(projectRegEx) !== -1);

    // The baseURL is the same as the projectUrl, and does not contain "/project/MONGO_ID" in
    // its domain. This is almost certainly against the Open Source server.
    if (project && this.base === project && !isProjectUrl) {
      this.noProject = true;
      this.projectUrl = this.base;
    }

    // Normalize to an absolute path.
    if ((path.indexOf('http') !== 0) && (path.indexOf('//') !== 0)) {
      path = this.base + path;
    }

    const hostparts = this.getUrlParts(path);
    let parts = [];
    const hostName = hostparts[1] + hostparts[2];
    path = hostparts.length > 3 ? hostparts[3] : '';
    const queryparts = path.split('?');
    if (queryparts.length > 1) {
      path = queryparts[0];
      this.query = `?${queryparts[1]}`;
    }

    // Register a specific path.
    const registerPath = (name, base) => {
      this[`${name}sUrl`] = `${base}/${name}`;
      const regex = new RegExp(`/${name}/([^/]+)`);
      if (path.search(regex) !== -1) {
        parts = path.match(regex);
        this[`${name}Url`] = parts ? (base + parts[0]) : '';
        this[`${name}Id`] = (parts.length > 1) ? parts[1] : '';
        base += parts[0];
      }
      return base;
    };

    // Register an array of items.
    const registerItems = (items, base, staticBase) => {
      for (const i in items) {
        if (items.hasOwnProperty(i)) {
          const item = items[i];
          if (Array.isArray(item)) {
            registerItems(item, base, true);
          }
          else {
            const newBase = registerPath(item, base);
            base = staticBase ? base : newBase;
          }
        }
      }
    };

    if (!this.projectUrl || (this.projectUrl === this.base)) {
      this.projectUrl = hostName;
    }

    if (!this.noProject) {
      // Determine the projectUrl and projectId
      if (isProjectUrl) {
        // Get project id as project/:projectId.
        registerItems(['project'], hostName);
        path = path.replace(projectRegEx, '');
      }
      else if (hostName === this.base) {
        // Get project id as first part of path (subdirectory).
        if (hostparts.length > 3 && path.split('/').length > 1) {
          const pathParts = path.split('/');
          pathParts.shift(); // Throw away the first /.
          this.projectId = pathParts.shift();
          path = `/${pathParts.join('/')}`;
          this.projectUrl = `${hostName}/${this.projectId}`;
        }
      }
      else {
        // Get project id from subdomain.
        if (hostparts.length > 2 && (hostparts[2].split('.').length > 2 || hostName.includes('localhost'))) {
          this.projectUrl = hostName;
          this.projectId = hostparts[2].split('.')[0];
        }
      }
      this.projectsUrl = this.projectsUrl || `${this.base}/project`;
    }

    // Configure Role urls and role ids.
    registerItems(['role'], this.projectUrl);

    // Configure Form urls and form ids.
    if (/(^|\/)(form)($|\/)/.test(path)) {
      registerItems(['form', ['submission', 'action', 'v']], this.projectUrl);
    }
    else {
      const subRegEx = new RegExp('/(submission|action|v)($|/.*)');
      const subs = path.match(subRegEx);
      this.pathType = (subs && (subs.length > 1)) ? subs[1] : '';
      path = path.replace(subRegEx, '');
      path = path.replace(/\/$/, '');
      this.formsUrl = `${this.projectUrl}/form`;
      this.formUrl = path ? this.projectUrl + path : '';
      this.formId = path.replace(/^\/+|\/+$/g, '');
      const items = ['submission', 'action', 'v'];
      for (const i in items) {
        if (items.hasOwnProperty(i)) {
          const item = items[i];
          this[`${item}sUrl`] = `${this.projectUrl + path}/${item}`;
          if ((this.pathType === item) && (subs.length > 2) && subs[2]) {
            this[`${item}Id`] = subs[2].replace(/^\/+|\/+$/g, '');
            this[`${item}Url`] = this.projectUrl + path + subs[0];
          }
        }
      }
    }

    // Set the app url if it is not set.
    if (!Formio.projectUrlSet) {
      Formio.projectUrl = this.projectUrl;
    }
  }
  /* eslint-enable max-statements */

  /**
   * Deletes a remote resource of any provided type.
   *
   * @param {string} type - The type of resource to delete. "submission", "form", etc.
   * @param {object} options - The options passed to {@link Formio.request}
   * @return {Promise<Response>}
   */
  delete(type, opts) {
    const _id = `${type}Id`;
    const _url = `${type}Url`;
    if (!this[_id]) {
      NativePromise.reject('Nothing to delete');
    }
    Formio.cache = {};
    return this.makeRequest(type, this[_url], 'delete', null, opts);
  }

  /**
   * Returns the index (array of records) for any provided type.
   *
   * @param {string} type - The type of resource to fetch the index of. "submission", "form", etc.
   * @param {object} query - A query object to pass to the request.
   * @param {object} query.params - A map (key-value pairs) of URL query parameters to add to the url.
   * @param {object} options - Options to pass to {@link Formio.request}
   * @return {Promise<Response>}
   */
  index(type, query, opts) {
    const _url = `${type}Url`;
    query = query || '';
    if (query && isObject(query)) {
      query = `?${Formio.serialize(query.params)}`;
    }
    return this.makeRequest(type, this[_url] + query, 'get', null, opts);
  }

  /**
   * Save a document record using "upsert". If the document does not exist, it will be created, if the _id is provided,
   * it will be updated.
   *
   * @param {string} type - The type of resource to fetch the index of. "submission", "form", etc.
   * @param {object} data - The resource data object.
   * @param {object} options - Options to pass to {@link Formio.request}
   * @return {Promise<object>}
   */
  save(type, data, opts) {
    const _id = `${type}Id`;
    const _url = `${type}Url`;
    const method = (this[_id] || data._id) ? 'put' : 'post';
    let reqUrl = this[_id] ? this[_url] : this[`${type}sUrl`];
    if (!this[_id] && data._id && (method === 'put') && !reqUrl.includes(data._id)) {
      reqUrl += `/${data._id}`;
    }
    Formio.cache = {};
    return this.makeRequest(type, reqUrl + this.query, method, data, opts);
  }

  /**
   * Load (GET) a document record.
   *
   * @param {string} type - The type of resource to fetch the index of. "submission", "form", etc.
   * @param {object} query - A query object to pass to the request.
   * @param {object} query.params - A map (key-value pairs) of URL query parameters to add to the url.
   * @param {object} options - Options to pass to {@link Formio.request}
   * @return {Promise<object>}
   */
  load(type, query, opts) {
    const _id = `${type}Id`;
    const _url = `${type}Url`;
    if (query && isObject(query)) {
      query = Formio.serialize(query.params);
    }
    if (query) {
      query = this.query ? (`${this.query}&${query}`) : (`?${query}`);
    }
    else {
      query = this.query;
    }
    if (!this[_id]) {
      return NativePromise.reject(`Missing ${_id}`);
    }
    return this.makeRequest(type, this[_url] + query, 'get', null, opts);
  }

  /**
   * Call {@link Formio.makeRequest} for this Formio instance.
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
  makeRequest(...args) {
    return Formio.makeRequest(this, ...args);
  }

  /**
   * Loads a project.
   *
   * #### Example
   * ```js
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
  loadProject(query, opts) {
    return this.load('project', query, opts);
  }

  /**
   * Saves or Updates a project.
   *
   * #### Create a new project
   * ```js
   * const formio = new Formio();
   * formio.saveProject({
   *   title: 'My Project',
   *   path: 'myproject',
   *   name: 'myproject'
   * });
   * ```
   *
   * #### Update an existing project
   * ```js
   * // Update a project
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
  saveProject(data, opts) {
    return this.save('project', data, opts);
  }

  /**
   * Deletes a project
   *
   * #### Example
   * ```js
   * const formio = new Formio('https://examples.form.io');
   * formio.deleteProject();
   * ```
   *
   * @param {object} options - Options to pass to {@link Formio.request}
   * @return {Promise<Object>}
   */
  deleteProject(opts) {
    return this.delete('project', opts);
  }

  /**
   * Loads a list of all projects.
   *
   * ```js
   * Formio.loadProjects().then((projects) => {
   *   console.log(projects);
   * });
   * ```
   *
   * @param {object} query - Query parameters similar to {@link Formio#load}.
   * @param {object} options - Options to pass to {@link Formio.request}
   * @return {*}
   */
  static loadProjects(query, opts) {
    query = query || '';
    if (isObject(query)) {
      query = `?${Formio.serialize(query.params)}`;
    }
    return Formio.makeStaticRequest(`${Formio.baseUrl}/project${query}`, 'GET', null, opts);
  }

  /**
   * Loads a role within a project.
   *
   * #### Example
   * ```js
   * const formio = new Formio('https://examples.form.io/role/234234234234');
   * formio.loadRole().then((role) => {
   *   console.log(role);
   * });
   * ```
   *
   * @param {object} options - Options to pass to {@link Formio.request}
   * @return {Promise<Object>}
   */
  loadRole(opts) {
    return this.load('role', null, opts);
  }

  /**
   * Create a new or Update an existing role within a project.
   *
   * #### Create new Role example
   * ```js
   * const formio = new Formio('https://examples.form.io');
   * formio.saveRole({
   *   title: 'Employee',
   *   description: 'A person who belongs to a company.'
   * }).then((role) => {
   *   console.log(role);
   * });
   * ```
   *
   * #### Update existing role example
   * ```js
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
  saveRole(data, opts) {
    return this.save('role', data, opts);
  }

  /**
   * Deletes a role within a project.
   *
   * @param {object} options - Options to pass to {@link Formio.request}
   * @return {Promise<Response>}
   */
  deleteRole(opts) {
    return this.delete('role', opts);
  }

  /**
   * Load all roles within a project.
   *
   * #### Example
   * ```js
   * const formio = new Formio('https://examples.form.io');
   * formio.loadRoles().then((roles) => {
   *   console.log(roles);
   * });
   * ```
   *
   * @param {object} options - Options to pass to {@link Formio.request}
   * @return {Promise<Response>}
   */
  loadRoles(opts) {
    return this.index('roles', null, opts);
  }

  /**
   * Loads a form.
   *
   * #### Example
   * ```
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
  loadForm(query, opts) {
    return this.load('form', query, opts)
      .then((currentForm) => {
        // Check to see if there isn't a number in vId.
        if (!currentForm.revisions || isNaN(parseInt(this.vId))) {
          return currentForm;
        }
        // If a submission already exists but form is marked to load current version of form.
        if (currentForm.revisions === 'current' && this.submissionId) {
          return currentForm;
        }
        // If they specified a revision form, load the revised form components.
        if (query && isObject(query)) {
          query = Formio.serialize(query.params);
        }
        if (query) {
          query = this.query ? (`${this.query}&${query}`) : (`?${query}`);
        }
        else {
          query = this.query;
        }
        return this.makeRequest('form', this.vUrl + query, 'get', null, opts)
          .then((revisionForm) => {
            currentForm.components = revisionForm.components;
            currentForm.settings = revisionForm.settings;
            // Using object.assign so we don't cross polinate multiple form loads.
            return Object.assign({}, currentForm);
          })
          // If we couldn't load the revision, just return the original form.
          .catch(() => Object.assign({}, currentForm));
      });
  }

  /**
   * Create or Update a specific form.
   *
   * #### Create form example
   * ```js
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
   * #### Update a form example
   * ```js
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
  saveForm(data, opts) {
    return this.save('form', data, opts);
  }

  /**
   * Deletes a form.
   *
   * #### Example
   * ```js
   * const formio = new Formio('https://examples.form.io/example');
   * formio.deleteForm().then(() => {
   *   console.log('Deleted!');
   * });
   * ```
   *
   * @param {object} options - Options to pass to {@link Formio.request}
   * @return {Promise<Response>}
   */
  deleteForm(opts) {
    return this.delete('form', opts);
  }

  /**
   * Loads all forms within a project.
   *
   * #### Example
   * ```js
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
  loadForms(query, opts) {
    return this.index('forms', query, opts);
  }

  /**
   * Loads a specific submissionn.
   *
   * #### Example
   * ```js
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
  loadSubmission(query, opts) {
    return this.load('submission', query, opts)
      .then((submission) => {
        this.vId = submission._fvid;
        this.vUrl = `${this.formUrl}/v/${this.vId}`;
        return submission;
      });
  }

  /**
   * Creates a new or Updates an existing submission.
   *
   * #### Create a new submission
   * ```js
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
   * #### Update an existing submission
   *```js
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
  saveSubmission(data, opts) {
    if (!isNaN(parseInt(this.vId))) {
      data._fvid = this.vId;
    }
    return this.save('submission', data, opts);
  }

  /**
   * Deletes a submission.
   *
   * @param {object} options - Options to pass to {@link Formio.request}
   * @return {Promise<Response>}
   */
  deleteSubmission(opts) {
    return this.delete('submission', opts);
  }

  /**
   * Loads all submissions within a form.
   *
   * #### Example
   * ```js
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
  loadSubmissions(query, opts) {
    return this.index('submissions', query, opts);
  }

  /**
   * Loads a form action.
   *
   * #### Example
   * ```js
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
  loadAction(query, opts) {
    return this.load('action', query, opts);
  }

  /**
   * Create a new or update an existing action.
   *
   * #### Create a new action for a form.
   * ```js
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
   * #### Update an action
   * ```js
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
  saveAction(data, opts) {
    return this.save('action', data, opts);
  }

  /**
   * Delete an action
   *
   * #### Example
   * ```js
   * const formio = new Formio('https://examples.form.io/example/action/234234234234');
   * formio.deleteAction().then(() => {
   *   console.log('Action was deleted.');
   * });
   * ```
   *
   * @param {object} options - Options to pass to {@link Formio.request}
   * @return {Promise<Response>}
   */
  deleteAction(opts) {
    return this.delete('action', opts);
  }

  /**
   * Loads all actions within a form.
   *
   * #### Example
   * ```js
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
  loadActions(query, opts) {
    return this.index('actions', query, opts);
  }

  /**
   * Returns a list of available actions
   *
   * @return {Promise<Response>}
   */
  availableActions() {
    return this.makeRequest('availableActions', `${this.formUrl}/actions`);
  }

  /**
   * Returns the action information for a specific action, such as "save".
   *
   * #### Example
   * ```js
   * const formio = new Formio('https://examples.form.io/example/actions/save');
   * formio.actionInfo().then((info) => {
   *   console.log(info);
   * });
   * ```
   *
   * @param {string} name - The name of the action you would like to get information for. i.e. "save", "webhook", etc.
   * @return {Promise<Response>}
   */
  actionInfo(name) {
    return this.makeRequest('actionInfo', `${this.formUrl}/actions/${name}`);
  }

  /**
   * Determine if a string ID is a valid MongoID.
   *
   * @param {string} id - The id that should be tested if it is avalid id.
   * @return {boolean} - true if it is a valid MongoId, false otherwise.
   */
  isObjectId(id) {
    const checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');
    return checkForHexRegExp.test(id);
  }

  /**
   * Get the project ID of project.
   *
   * #### Example
   * ```js
   * const formio = new Formio('https://examples.form.io');
   * formio.getProjectId().then((projectId) => {
   *   console.log(projectId);
   * };
   * ```
   *
   * @return {Promise<string>}
   */
  getProjectId() {
    if (!this.projectId) {
      return NativePromise.resolve('');
    }
    if (this.isObjectId(this.projectId)) {
      return NativePromise.resolve(this.projectId);
    }
    else {
      return this.loadProject().then((project) => {
        return project._id;
      });
    }
  }

  /**
   * Get the ID of a form.
   *
   * #### Example
   * ```js
   * const formio = new Formio('https://examples.form.io/example');
   * formio.getFormId().then((formId) => {
   *   console.log(formId);
   * });
   * ```
   *
   * @return {Promise<string>}
   */
  getFormId() {
    if (!this.formId) {
      return NativePromise.resolve('');
    }
    if (this.isObjectId(this.formId)) {
      return NativePromise.resolve(this.formId);
    }
    else {
      return this.loadForm().then((form) => {
        return form._id;
      });
    }
  }

  /**
   * Instance method for {@link Formio.currentUser}
   *
   * @param {object} options - Options to pass to {@link Formio.request}
   * @return {Promise<object>}
   */
  currentUser(options) {
    return Formio.currentUser(this, options);
  }

  /**
   * Instance method for {@link Formio.accessInfo}
   * @return {Promise<Response>}
   */
  accessInfo() {
    return Formio.accessInfo(this);
  }

  /**
   * Returns the JWT token for this instance.
   *
   * @param {object} options - The following options are provided.
   * @param {string} options.namespace - The localStorage namespace to use when retrieving tokens from storage.
   * @return {string} - The JWT token for this user.
   */
  getToken(options) {
    return Formio.getToken(Object.assign({ formio: this }, this.options, options));
  }

  /**
   * Sets the JWT token for this instance.
   *
   * @param {string} token - The JWT token to set.
   * @param {object} options - The following options are provided.
   * @param {string} options.namespace - The localStorage namespace to use when retrieving tokens from storage.
   * @return {string} - The JWT token that was set.
   */
  setToken(token, options) {
    return Formio.setToken(token, Object.assign({ formio: this }, this.options, options));
  }

  /**
   * Returns a temporary authentication token for single purpose token generation.
   *
   * @param {number|string} expire - The amount of seconds to wait before this temp token expires.
   * @param {string} allowed - The allowed path string inn the format GET:/path
   * @param {object} options - The options passed to {@link Formio#getToken}
   */
  getTempToken(expire, allowed, options) {
    const token = Formio.getToken(options);
    if (!token) {
      return NativePromise.reject('You must be authenticated to generate a temporary auth token.');
    }
    const authUrl = Formio.authUrl || this.projectUrl;
    return this.makeRequest('tempToken', `${authUrl}/token`, 'GET', null, {
      ignoreCache: true,
      header: new Headers({
        'x-expire': expire,
        'x-allow': allowed
      })
    });
  }

  /**
   * Get a PDF download url for a submission, which will generate a new PDF of the submission. This method will first
   * fetch a temporary download token, and then append this to the download url for this form.
   *
   * #### Example
   * ```js
   * const formio = new Formio('https://examples.form.io/example/submission/324234234234234');
   * formio.getDownloadUrl().then((url) => {
   *   console.log(url);
   * });
   * ```
   *
   * @param {object} [form] - The form JSON to fetch a download url for.
   * @return {Promise<string>} - The download url.
   */
  getDownloadUrl(form) {
    if (!this.submissionId) {
      return NativePromise.resolve('');
    }

    if (!form) {
      // Make sure to load the form first.
      return this.loadForm().then((_form) => {
        if (!_form) {
          return '';
        }
        return this.getDownloadUrl(_form);
      });
    }

    let apiUrl = `/project/${form.project}`;
    apiUrl += `/form/${form._id}`;
    apiUrl += `/submission/${this.submissionId}`;
    apiUrl += '/download';

    let download = this.base + apiUrl;
    return new NativePromise((resolve, reject) => {
      this.getTempToken(3600, `GET:${apiUrl}`).then((tempToken) => {
        download += `?token=${tempToken.key}`;
        resolve(download);
      }, () => {
        resolve(download);
      }).catch(reject);
    });
  }

  /**
   * Upload a file to the Form.io platform.
   *
   * @param {string} storage - The storage type for this file. i.e. "url", "s3", "dropbox", etc.
   * @param {File} file - The file object to upload.
   * @param {string} fileName - The filename to give to the file once it is uploaded.
   * @param {string} dir - The directory name to place the file.
   * @param {function} progressCallback - Called when the progress of the file updates.
   * @param {string} url - Used for IndexDB uploads (offline file uploads) to provide the url of the upload destination.
   * @param {object} options - Options used to pass to each upload provider for upload configurations.
   * @param {string} fileKey - Custom file key to pass to custom upload providers.
   * @return {*}
   */
  uploadFile(storage, file, fileName, dir, progressCallback, url, options, fileKey) {
    const requestArgs = {
      provider: storage,
      method: 'upload',
      file: file,
      fileName: fileName,
      dir: dir
    };
    fileKey = fileKey || 'file';
    const request = Formio.pluginWait('preRequest', requestArgs)
      .then(() => {
        return Formio.pluginGet('fileRequest', requestArgs)
          .then((result) => {
            if (storage && isNil(result)) {
              const Provider = Providers.getProvider('storage', storage);
              if (Provider) {
                const provider = new Provider(this);
                return provider.uploadFile(file, fileName, dir, progressCallback, url, options, fileKey);
              }
              else {
                throw ('Storage provider not found');
              }
            }
            return result || { url: '' };
          });
      });

    return Formio.pluginAlter('wrapFileRequestPromise', request, requestArgs);
  }

  downloadFile(file, options) {
    const requestArgs = {
      method: 'download',
      file: file
    };

    const request = Formio.pluginWait('preRequest', requestArgs)
      .then(() => {
        return Formio.pluginGet('fileRequest', requestArgs)
          .then((result) => {
            if (file.storage && isNil(result)) {
              const Provider = Providers.getProvider('storage', file.storage);
              if (Provider) {
                const provider = new Provider(this);
                return provider.downloadFile(file, options);
              }
              else {
                throw ('Storage provider not found');
              }
            }
            return result || { url: '' };
          });
      });

    return Formio.pluginAlter('wrapFileRequestPromise', request, requestArgs);
  }

  /**
   * Returns the user permissions to a form and submission.
   *
   * @param user - The user or current user if undefined. For anonymous, use "null"
   * @param form - The form or current form if undefined. For no form check, use "null"
   * @param submission - The submisison or "index" if undefined.
   *
   * @return {{create: boolean, read: boolean, edit: boolean, delete: boolean}}
   */
  userPermissions(user, form, submission) {
    return NativePromise.all([
      (form !== undefined) ? NativePromise.resolve(form) : this.loadForm(),
      (user !== undefined) ? NativePromise.resolve(user) : this.currentUser(),
      (submission !== undefined || !this.submissionId) ? NativePromise.resolve(submission) : this.loadSubmission(),
      this.accessInfo()
    ]).then((results) => {
      const form = results.shift();
      const user = results.shift() || { _id: false, roles: [] };
      const submission = results.shift();
      const access = results.shift();
      const permMap = {
        create: 'create',
        read: 'read',
        update: 'edit',
        delete: 'delete'
      };
      const perms = {
        user: user,
        form: form,
        access: access,
        create: false,
        read: false,
        edit: false,
        delete: false
      };
      for (const roleName in access.roles) {
        if (access.roles.hasOwnProperty(roleName)) {
          const role = access.roles[roleName];
          if (role.default && (user._id === false)) {
            // User is anonymous. Add the anonymous role.
            user.roles.push(role._id);
          }
          else if (role.admin && user.roles.indexOf(role._id) !== -1) {
            perms.create = true;
            perms.read = true;
            perms.delete = true;
            perms.edit = true;
            return perms;
          }
        }
      }
      if (form && form.submissionAccess) {
        for (let i = 0; i < form.submissionAccess.length; i++) {
          const permission = form.submissionAccess[i];
          const [perm, scope] = permission.type.split('_');
          if (['create', 'read', 'update', 'delete'].includes(perm)) {
            if (_intersection(permission.roles, user.roles).length) {
              perms[permMap[perm]] = (scope === 'all') || (!submission || (user._id === submission.owner));
            }
          }
        }
      }
      // check for Group Permissions
      if (submission) {
        // we would anyway need to loop through components for create permission, so we'll do that for all of them
        eachComponent(form.components, (component, path) => {
          if (component && component.defaultPermission) {
            const value = _get(submission.data, path);
            // make it work for single-select Group and multi-select Group
            const groups = Array.isArray(value) ? value : [value];
            groups.forEach(group => {
              if (
                group && group._id && // group id is present
                user.roles.indexOf(group._id) > -1 // user has group id in his roles
              ) {
                if (component.defaultPermission === 'read') {
                  perms[permMap.read] = true;
                }
                if (component.defaultPermission === 'create') {
                  perms[permMap.create] = true;
                  perms[permMap.read] = true;
                }
                if (component.defaultPermission === 'write') {
                  perms[permMap.create] = true;
                  perms[permMap.read] = true;
                  perms[permMap.update] = true;
                }
                if (component.defaultPermission === 'admin') {
                  perms[permMap.create] = true;
                  perms[permMap.read] = true;
                  perms[permMap.update] = true;
                  perms[permMap.delete] = true;
                }
              }
            });
          }
        });
      }
      return perms;
    });
  }

  /**
   * Determine if the current user can submit a form.
   * @return {*}
   */
  canSubmit() {
    return this.userPermissions().then((perms) => {
      // If there is user and they cannot create, then check anonymous user permissions.
      if (!perms.create && Formio.getUser()) {
        return this.userPermissions(null).then((anonPerms) => {
          if (anonPerms.create) {
            Formio.setUser(null);
            return true;
          }

          return false;
        });
      }

      return perms.create;
    });
  }

  getUrlParts(url) {
    return Formio.getUrlParts(url, this);
  }

  static getUrlParts(url, formio) {
    const base = (formio && formio.base) ? formio.base : Formio.baseUrl;
    let regex = '^(http[s]?:\\/\\/)';
    if (base && url.indexOf(base) === 0) {
      regex += `(${base.replace(/^http[s]?:\/\//, '')})`;
    }
    else {
      regex += '([^/]+)';
    }
    regex += '($|\\/.*)';
    return url.match(new RegExp(regex));
  }

  static serialize(obj, _interpolate) {
    const str = [];
    const interpolate = (item) => {
      return _interpolate ? _interpolate(item) : item;
    };
    for (const p in obj) {
      if (obj.hasOwnProperty(p)) {
        str.push(`${encodeURIComponent(p)}=${encodeURIComponent(interpolate(obj[p]))}`);
      }
    }
    return str.join('&');
  }

  static getRequestArgs(formio, type, url, method, data, opts) {
    method = (method || 'GET').toUpperCase();
    if (!opts || !isObject(opts)) {
      opts = {};
    }

    const requestArgs = {
      url,
      method,
      data: data || null,
      opts
    };

    if (type) {
      requestArgs.type = type;
    }

    if (formio) {
      requestArgs.formio = formio;
    }
    return requestArgs;
  }

  static makeStaticRequest(url, method, data, opts) {
    const requestArgs = Formio.getRequestArgs(null, '', url, method, data, opts);
    const request = Formio.pluginWait('preRequest', requestArgs)
      .then(() => Formio.pluginGet('staticRequest', requestArgs)
        .then((result) => {
          if (isNil(result)) {
            return Formio.request(url, method, requestArgs.data, requestArgs.opts.header, requestArgs.opts);
          }
          return result;
        }));

    return Formio.pluginAlter('wrapStaticRequestPromise', request, requestArgs);
  }

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
  static makeRequest(formio, type, url, method, data, opts) {
    if (!formio) {
      return Formio.makeStaticRequest(url, method, data, opts);
    }

    const requestArgs = Formio.getRequestArgs(formio, type, url, method, data, opts);
    requestArgs.opts = requestArgs.opts || {};
    requestArgs.opts.formio = formio;

    //for Formio requests default Accept and Content-type headers
    if (!requestArgs.opts.headers) {
      requestArgs.opts.headers = {};
    }
    requestArgs.opts.headers = _defaults(requestArgs.opts.headers, {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    });
    const request = Formio.pluginWait('preRequest', requestArgs)
      .then(() => Formio.pluginGet('request', requestArgs)
        .then((result) => {
          if (isNil(result)) {
            return Formio.request(url, method, requestArgs.data, requestArgs.opts.header, requestArgs.opts);
          }
          return result;
        }));

    return Formio.pluginAlter('wrapRequestPromise', request, requestArgs);
  }

  /**
   * Execute an API request to any external system. This is a wrapper around the Web fetch method.
   *
   * ### Example
   * ```js
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
  static request(url, method = 'GET', data = {}, header = {}, opts = {}) {
    if (!url) {
      return NativePromise.reject('No url provided');
    }
    method = method.toUpperCase();

    // For reverse compatibility, if they provided the ignoreCache parameter,
    // then change it back to the options format where that is a parameter.
    if (isBoolean(opts)) {
      opts = { ignoreCache: opts };
    }

    // Generate a cachekey.
    const cacheKey = btoa(url);

    // Get the cached promise to save multiple loads.
    if (!opts.ignoreCache && method === 'GET' && Formio.cache.hasOwnProperty(cacheKey)) {
      return NativePromise.resolve(cloneResponse(Formio.cache[cacheKey]));
    }

    // Set up and fetch request
    const headers = header || new Headers(opts.headers || {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    });
    const token = Formio.getToken(opts);
    if (token && !opts.noToken) {
      headers.append('x-jwt-token', token);
    }

    // The fetch-ponyfill can't handle a proper Headers class anymore. Change it back to an object.
    const headerObj = {};
    headers.forEach(function(value, name) {
      headerObj[name] = value;
    });

    let options = {
      method: method,
      headers: headerObj,
      mode: 'cors'
    };
    if (data) {
      options.body = JSON.stringify(data);
    }

    // Allow plugins to alter the options.
    options = Formio.pluginAlter('requestOptions', options, url);
    if (options.namespace || Formio.namespace) {
      opts.namespace = options.namespace ||  Formio.namespace;
    }

    const requestToken = options.headers['x-jwt-token'];
    const result = Formio.fetch(url, options)
      .then((response) => {
        // Allow plugins to respond.
        response = Formio.pluginAlter('requestResponse', response, Formio);

        if (!response.ok) {
          if (response.status === 440) {
            Formio.setToken(null, opts);
            Formio.events.emit('formio.sessionExpired', response.body);
          }
          else if (response.status === 401) {
            Formio.events.emit('formio.unauthorized', response.body);
          }
          // Parse and return the error as a rejected promise to reject this promise
          return (response.headers.get('content-type').includes('application/json')
            ? response.json()
            : response.text())
            .then((error) => {
              return NativePromise.reject(error);
            });
        }

        // Handle fetch results
        const token = response.headers.get('x-jwt-token');

        // In some strange cases, the fetch library will return an x-jwt-token without sending
        // one to the server. This has even been debugged on the server to verify that no token
        // was introduced with the request, but the response contains a token. This is an Invalid
        // case where we do not send an x-jwt-token and get one in return for any GET request.
        let tokenIntroduced = false;
        if (
          (method === 'GET') &&
          !requestToken &&
          token &&
          !opts.external &&
          !url.includes('token=') &&
          !url.includes('x-jwt-token=')
        ) {
          console.warn('Token was introduced in request.');
          tokenIntroduced = true;
        }

        if (
          response.status >= 200 &&
          response.status < 300 &&
          token &&
          token !== '' &&
          !tokenIntroduced
        ) {
          Formio.setToken(token, opts);
        }
        // 204 is no content. Don't try to .json() it.
        if (response.status === 204) {
          return {};
        }

        const getResult = response.headers.get('content-type').includes('application/json')
          ? response.json()
          : response.text();
        return getResult.then((result) => {
          // Add some content-range metadata to the result here
          let range = response.headers.get('content-range');
          if (range && isObject(result)) {
            range = range.split('/');
            if (range[0] !== '*') {
              const skipLimit = range[0].split('-');
              result.skip = Number(skipLimit[0]);
              result.limit = skipLimit[1] - skipLimit[0] + 1;
            }
            result.serverCount = range[1] === '*' ? range[1] : Number(range[1]);
          }

          if (!opts.getHeaders) {
            return result;
          }

          const headers = {};
          response.headers.forEach((item, key) => {
            headers[key] = item;
          });

          // Return the result with the headers.
          return {
            result,
            headers,
          };
        });
      })
      .then((result) => {
        if (opts.getHeaders) {
          return result;
        }

        // Cache the response.
        if (method === 'GET') {
          Formio.cache[cacheKey] = result;
        }

        return cloneResponse(result);
      })
      .catch((err) => {
        if (err === 'Bad Token') {
          Formio.setToken(null, opts);
          Formio.events.emit('formio.badToken', err);
        }
        if (err.message) {
          err.message = `Could not connect to API server (${err.message})`;
          err.networkError = true;
        }

        if (method === 'GET') {
          delete Formio.cache[cacheKey];
        }

        return NativePromise.reject(err);
      });

    return result;
  }

  // Needed to maintain reverse compatability...
  static get token() {
    if (!Formio.tokens) {
      Formio.tokens = {};
    }

    return Formio.tokens.formioToken ? Formio.tokens.formioToken : '';
  }

  // Needed to maintain reverse compatability...
  static set token(token) {
    if (!Formio.tokens) {
      Formio.tokens = {};
    }

    return Formio.tokens.formioToken = token || '';
  }

  /**
   * Sets the JWT in storage to be used within an application.
   *
   * @param {string} token - The JWT token to set.
   * @param {object} options - Options as follows
   * @param {string} options.namespace - The namespace to save the token within. i.e. "formio"
   * @param {Formio} options.formio - The Formio instance.
   * @return {Promise<object>|void}
   */
  static setToken(token = '', opts) {
    token = token || '';
    opts = (typeof opts === 'string') ? { namespace: opts } : opts || {};
    var tokenName = `${opts.namespace || Formio.namespace || 'formio'}Token`;
    if (!Formio.tokens) {
      Formio.tokens = {};
    }

    if (Formio.tokens[tokenName] && Formio.tokens[tokenName] === token) {
      return;
    }

    Formio.tokens[tokenName] = token;
    if (!token) {
      if (!opts.fromUser) {
        opts.fromToken = true;
        Formio.setUser(null, opts);
      }
      // iOS in private browse mode will throw an error but we can't detect ahead of time that we are in private mode.
      try {
        return localStorage.removeItem(tokenName);
      }
      catch (err) {
        return cookies.erase(tokenName, { path: '/' });
      }
    }
    // iOS in private browse mode will throw an error but we can't detect ahead of time that we are in private mode.
    try {
      localStorage.setItem(tokenName, token);
    }
    catch (err) {
      cookies.set(tokenName, token, { path: '/' });
    }
    return Formio.currentUser(opts.formio, opts); // Run this so user is updated if null
  }

  /**
   * Returns the token set within the application for the user.
   *
   * @param {object} options - The options as follows.
   * @param {string} namespace - The namespace of the token you wish to fetch.
   * @return {*}
   */
  static getToken(options) {
    options = (typeof options === 'string') ? { namespace: options } : options || {};
    const tokenName = `${options.namespace || Formio.namespace || 'formio'}Token`;
    const decodedTokenName = options.decode ? `${tokenName}Decoded` : tokenName;
    if (!Formio.tokens) {
      Formio.tokens = {};
    }

    if (Formio.tokens[decodedTokenName]) {
      return Formio.tokens[decodedTokenName];
    }
    try {
      Formio.tokens[tokenName] = localStorage.getItem(tokenName) || '';
      if (options.decode) {
        Formio.tokens[decodedTokenName] = Formio.tokens[tokenName] ? jwtDecode(Formio.tokens[tokenName]) : {};
        return Formio.tokens[decodedTokenName];
      }
      return Formio.tokens[tokenName];
    }
    catch (e) {
      Formio.tokens[tokenName] = cookies.get(tokenName);
      return Formio.tokens[tokenName];
    }
  }

  /**
   * Sets the current user within the application cache.
   *
   * @param {object} user - JSON object of the user you wish to set.
   * @param {object} options - Options as follows
   * @param {string} options.namespace - The namespace of the tokens
   */
  static setUser(user, opts = {}) {
    var userName = `${opts.namespace || Formio.namespace || 'formio'}User`;
    if (!user) {
      if (!opts.fromToken) {
        opts.fromUser = true;
        Formio.setToken(null, opts);
      }

      // Emit an event on the cleared user.
      Formio.events.emit('formio.user', null);

      // iOS in private browse mode will throw an error but we can't detect ahead of time that we are in private mode.
      try {
        return localStorage.removeItem(userName);
      }
      catch (err) {
        return cookies.erase(userName, { path: '/' });
      }
    }
    // iOS in private browse mode will throw an error but we can't detect ahead of time that we are in private mode.
    try {
      localStorage.setItem(userName, JSON.stringify(user));
    }
    catch (err) {
      cookies.set(userName, JSON.stringify(user), { path: '/' });
    }

    // Emit an event on the authenticated user.
    Formio.events.emit('formio.user', user);
  }

  /**
   * Returns the user JSON.
   *
   * @param {object} options - Options as follows
   * @param {string} namespace - The namespace of the tokens stored within this application.
   * @return {object} - The user object.
   */
  static getUser(options) {
    options = options || {};
    var userName = `${options.namespace || Formio.namespace || 'formio'}User`;
    try {
      return JSON.parse(localStorage.getItem(userName) || null);
    }
    catch (e) {
      return JSON.parse(cookies.get(userName));
    }
  }

  /**
   * Sets the BaseURL for the application. Every application developed using the JavaScript SDK must set both the
   * {@link Formio.setBaseUrl} and {@link Formio.setProjectUrl} methods. These two functions ensure that every URL
   * passed into the constructor of this class can determine the "project" context for which the application is running.
   *
   * Any Open Source server applications will set both the {@link Formio.setBaseUrl} and {@link Formio.setProjectUrl}
   * values will be the same value.
   *
   * #### Example
   * ```js
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
  static setBaseUrl(url) {
    Formio.baseUrl = url;
    if (!Formio.projectUrlSet) {
      Formio.projectUrl = url;
    }
  }

  /**
   * Returns the current base url described at {@link Formio.setBaseUrl}
   *
   * @return {string} - The base url of the application.
   */
  static getBaseUrl() {
    return Formio.baseUrl;
  }

  static setApiUrl(url) {
    console.warn('Formio.setApiUrl is deprecated. Use Formio.setBaseUrl instead.');
    return Formio.setBaseUrl(url);
  }

  static getApiUrl() {
    console.warn('Formio.getApiUrl is deprecated. Use Formio.getBaseUrl instead.');
    return Formio.getBaseUrl();
  }

  static setAppUrl(url) {
    console.warn('Formio.setAppUrl() is deprecated. Use Formio.setProjectUrl instead.');
    Formio.projectUrl = url;
    Formio.projectUrlSet = true;
  }

  /**
   * Sets the Project Url for the application. This is an important method that needs to be set for all applications. It
   * is documented @ {@link Formio.setBaseUrl}.
   *
   * @param {string} url - The project api url.
   */
  static setProjectUrl(url) {
    Formio.projectUrl = url;
    Formio.projectUrlSet = true;
  }

  /**
   * The Auth URL can be set to customize the authentication requests made from an application. By default, this is
   * just the same value as {@link Formio.projectUrl}
   *
   * @param {string} url - The authentication url
   */
  static setAuthUrl(url) {
    Formio.authUrl = url;
  }

  static getAppUrl() {
    console.warn('Formio.getAppUrl() is deprecated. Use Formio.getProjectUrl instead.');
    return Formio.projectUrl;
  }

  /**
   * Returns the Project url described at {@link Formio.setProjectUrl}
   *
   * @return {string|string} - The Project Url.
   */
  static getProjectUrl() {
    return Formio.projectUrl;
  }

  /**
   * Clears the runtime internal API cache. By default, the Formio class will cache all API requests in memory so that
   * any subsequent requests using GET method will return the cached results as long as the API URl is the same as what
   * was cached previously. This cache can be cleared using this method as follows.
   *
   * ```js
   * Formio.clearCache();
   * ```
   *
   * Or, if you just wish to clear a single request, then the {@link Formio.request#options.ignoreCache} option can be
   * provided when making an API request as follows.
   *
   * ```js
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
  static clearCache() {
    Formio.cache = {};
  }

  static get plugins() {
    return Plugins.getPlugins();
  }

  static deregisterPlugin(plugin) {
    return Plugins.deregisterPlugin(Formio, plugin);
  }

  static registerPlugin(plugin, name) {
    return Plugins.registerPlugin(Formio, plugin, name);
  }

  static getPlugin(name) {
    return Plugins.getPlugin(name);
  }

  static pluginWait(pluginFn, ...args) {
    return Plugins.pluginWait(pluginFn, ...args);
  }

  static pluginGet(pluginFn, ...args) {
    return Plugins.pluginGet(pluginFn, ...args);
  }

  static pluginAlter(pluginFn, value, ...args) {
    return Plugins.pluginAlter(pluginFn, value, ...args);
  }

  static accessInfo(formio) {
    const projectUrl = formio ? formio.projectUrl : Formio.projectUrl;
    return Formio.makeRequest(formio, 'accessInfo', `${projectUrl}/access`);
  }

  static projectRoles(formio) {
    const projectUrl = formio ? formio.projectUrl : Formio.projectUrl;
    return Formio.makeRequest(formio, 'projectRoles', `${projectUrl}/role`);
  }

  static currentUser(formio, options) {
    let authUrl = Formio.authUrl;
    if (!authUrl) {
      authUrl = formio ? formio.projectUrl : (Formio.projectUrl || Formio.baseUrl);
    }
    authUrl += '/current';
    const user = Formio.getUser(options);
    if (user) {
      return Formio.pluginAlter('wrapStaticRequestPromise', NativePromise.resolve(user), {
        url: authUrl,
        method: 'GET',
        options
      });
    }

    const token = Formio.getToken(options);
    if ((!options || !options.external) && !token) {
      return Formio.pluginAlter('wrapStaticRequestPromise', NativePromise.resolve(null), {
        url: authUrl,
        method: 'GET',
        options
      });
    }
    return Formio.makeRequest(formio, 'currentUser', authUrl, 'GET', null, options)
      .then((response) => {
        Formio.setUser(response, options);
        return response;
      });
  }

  static logout(formio, options) {
    options = options || {};
    options.formio = formio;
    Formio.setToken(null, options);
    Formio.setUser(null, options);
    Formio.clearCache();
    const projectUrl = Formio.authUrl ? Formio.authUrl : (formio ? formio.projectUrl : Formio.baseUrl);
    return Formio.makeRequest(formio, 'logout', `${projectUrl}/logout`);
  }

  static pageQuery() {
    if (Formio._pageQuery) {
      return Formio._pageQuery;
    }

    Formio._pageQuery = {};
    Formio._pageQuery.paths = [];
    const hashes = location.hash.substr(1).replace(/\?/g, '&').split('&');
    let parts = [];
    location.search.substr(1).split('&').forEach(function(item) {
      parts = item.split('=');
      if (parts.length > 1) {
        Formio._pageQuery[parts[0]] = parts[1] && decodeURIComponent(parts[1]);
      }
    });

    hashes.forEach(function(item) {
      parts = item.split('=');
      if (parts.length > 1) {
        Formio._pageQuery[parts[0]] = parts[1] && decodeURIComponent(parts[1]);
      }
      else if (item.indexOf('/') === 0) {
        Formio._pageQuery.paths = item.substr(1).split('/');
      }
    });
    return Formio._pageQuery;
  }

  static oAuthCurrentUser(formio, token) {
    return Formio.currentUser(formio, {
      external: true,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  static samlInit(options) {
    options = options || {};
    const query = Formio.pageQuery();
    if (query.saml) {
      Formio.setUser(null);
      const retVal = Formio.setToken(query.saml);
      let uri = window.location.toString();
      uri = uri.substring(0, uri.indexOf('?'));
      if (window.location.hash) {
        uri += window.location.hash;
      }
      window.history.replaceState({}, document.title, uri);
      return retVal;
    }

    // Set the relay if not provided.
    if (!options.relay) {
      options.relay = window.location.href;
    }

    // go to the saml sso endpoint for this project.
    const authUrl = Formio.authUrl || Formio.projectUrl;
    window.location.href = `${authUrl}/saml/sso?relay=${encodeURI(options.relay)}`;
    return false;
  }

  static oktaInit(options) {
    options = options || {};
    if (typeof OktaAuth !== undefined) {
      options.OktaAuth = OktaAuth;
    }

    if (typeof options.OktaAuth === undefined) {
      const errorMessage = 'Cannot find OktaAuth. Please include the Okta JavaScript SDK within your application. See https://developer.okta.com/code/javascript/okta_auth_sdk for an example.';
      console.warn(errorMessage);
      return NativePromise.reject(errorMessage);
    }
    return new NativePromise((resolve, reject) => {
      const Okta = options.OktaAuth;
      delete options.OktaAuth;
      var authClient = new Okta(options);
      authClient.tokenManager.get('accessToken')
        .then(accessToken => {
          if (accessToken) {
            resolve(Formio.oAuthCurrentUser(options.formio, accessToken.accessToken));
          }
          else if (location.hash) {
            authClient.token.parseFromUrl()
              .then(token => {
                authClient.tokenManager.add('accessToken', token);
                resolve(Formio.oAuthCurrentUser(options.formio, token.accessToken));
              })
              .catch(err => {
                console.warn(err);
                reject(err);
              });
          }
          else {
            authClient.token.getWithRedirect({
              responseType: 'token',
              scopes: options.scopes
            });
            resolve(false);
          }
        });
    });
  }

  static ssoInit(type, options) {
    switch (type) {
      case 'saml':
        return Formio.samlInit(options);
      case 'okta':
        return Formio.oktaInit(options);
      default:
        console.warn('Unknown SSO type');
        return NativePromise.reject('Unknown SSO type');
    }
  }

  static requireLibrary(name, property, src, polling) {
    if (!Formio.libraries.hasOwnProperty(name)) {
      Formio.libraries[name] = {};
      Formio.libraries[name].ready = new NativePromise((resolve, reject) => {
        Formio.libraries[name].resolve = resolve;
        Formio.libraries[name].reject = reject;
      });

      const callbackName = `${name}Callback`;

      if (!polling && !window[callbackName]) {
        window[callbackName] = () => Formio.libraries[name].resolve();
      }

      // See if the plugin already exists.
      const plugin = _get(window, property);
      if (plugin) {
        Formio.libraries[name].resolve(plugin);
      }
      else {
        src = Array.isArray(src) ? src : [src];
        src.forEach((lib) => {
          let attrs = {};
          let elementType = '';
          if (typeof lib === 'string') {
            lib = {
              type: 'script',
              src: lib,
            };
          }
          switch (lib.type) {
            case 'script':
              elementType = 'script';
              attrs = {
                src: lib.src,
                type: 'text/javascript',
                defer: true,
                async: true,
                referrerpolicy: 'origin',
              };
              break;
            case 'styles':
              elementType = 'link';
              attrs = {
                href: lib.src,
                rel: 'stylesheet',
              };
              break;
          }

          // Add the script to the top of the page.
          const element = document.createElement(elementType);
          if (element.setAttribute) {
            for (const attr in attrs) {
              element.setAttribute(attr, attrs[attr]);
            }
          }

          const { head } = document;
          if (head) {
            head.appendChild(element);
          }
        });

        // if no callback is provided, then check periodically for the script.
        if (polling) {
          const interval = setInterval(() => {
            const plugin = _get(window, property);
            if (plugin) {
              clearInterval(interval);
              Formio.libraries[name].resolve(plugin);
            }
          }, 200);
        }
      }
    }
    return Formio.libraries[name].ready;
  }

  static libraryReady(name) {
    if (
      Formio.libraries.hasOwnProperty(name) &&
      Formio.libraries[name].ready
    ) {
      return Formio.libraries[name].ready;
    }

    return NativePromise.reject(`${name} library was not required.`);
  }
}

// Define all the static properties.
Formio.libraries = {};
Formio.Promise = NativePromise;
Formio.fetch = fetch;
Formio.Headers = Headers;
Formio.baseUrl = 'https://api.form.io';
Formio.projectUrl = Formio.baseUrl;
Formio.authUrl = '';
Formio.projectUrlSet = false;
Formio.cache = {};
Formio.Providers = Providers;
Formio.version = '---VERSION---';
Formio.events = new EventEmitter({
  wildcard: false,
  maxListeners: 0
});

if (typeof global === 'object' && !global.Formio) {
  global.Formio = Formio;
}

export default Formio;
