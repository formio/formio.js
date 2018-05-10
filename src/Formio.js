'use strict';
// Intentionally use native-promise-only here... Other promise libraries (es6-promise)
// duck-punch the global Promise definition which messes up Angular 2 since it
// also duck-punches the global Promise definition. For now, keep native-promise-only.
import Promise from 'native-promise-only';
import 'whatwg-fetch';
import {EventEmitter2 as EventEmitter} from 'eventemitter2';
import cookies from 'browser-cookies';
import copy from 'shallow-copy';
import providers from './providers';

const isBoolean = (val) => typeof val === typeof true;
const isNil = (val) => val === null || val === undefined;
const isObject = (val) => val && typeof val === 'object';

/**
 * The Formio interface class.
 *
 *   let formio = new Formio('https://examples.form.io/example');
 */
export default class Formio {
  /* eslint-disable max-statements */
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
      this.projectUrl = `${this.base}/project`;
      this.projectsUrl = `${this.base}/project`;
      this.projectId = false;
      this.query = '';
      return;
    }

    if (options.hasOwnProperty('project')) {
      this.projectUrl = options.project;
    }

    const project = this.projectUrl || Formio.projectUrl;

    // The baseURL is the same as the projectUrl. This is almost certainly against
    // the Open Source server.
    if (project && this.base === project) {
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
      if ((path.search(/(^|\/)(project)($|\/)/) !== -1)) {
        // Get project id as project/:projectId.
        registerItems(['project'], hostName);
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

    // Configure Form urls and form ids.
    if ((path.search(/(^|\/)(project|form)($|\/)/) !== -1)) {
      registerItems(['form', ['submission', 'action', 'v']], this.projectUrl);
    }
    else {
      const subRegEx = new RegExp('/(submission|action|v)($|/.*)');
      const subs = path.match(subRegEx);
      this.pathType = (subs && (subs.length > 1)) ? subs[1] : '';
      path = path.replace(subRegEx, '');
      path = path.replace(/\/$/, '');
      this.formsUrl = `${this.projectUrl}/form`;
      this.formUrl = this.projectUrl + path;
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

  delete(type, opts) {
    const _id = `${type}Id`;
    const _url = `${type}Url`;
    if (!this[_id]) {
      Promise.reject('Nothing to delete');
    }
    Formio.cache = {};
    return this.makeRequest(type, this[_url], 'delete', null, opts);
  }

  index(type, query, opts) {
    const _url = `${type}Url`;
    query = query || '';
    if (query && isObject(query)) {
      query = `?${Formio.serialize(query.params)}`;
    }
    return this.makeRequest(type, this[_url] + query, 'get', null, opts);
  }

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
      return Promise.reject(`Missing ${_id}`);
    }
    return this.makeRequest(type, this[_url] + query, 'get', null, opts);
  }

  makeRequest(...args) {
    return Formio.makeRequest(this, ...args);
  }

  loadProject(query, opts) {
    return this.load('project', query, opts);
  }

  saveProject(data, opts) {
    return this.save('project', data, opts);
  }

  deleteProject(opts) {
    return this.delete('project', opts);
  }

  static loadProjects(query, opts) {
    query = query || '';
    if (isObject(query)) {
      query = `?${Formio.serialize(query.params)}`;
    }
    return Formio.makeStaticRequest(`${Formio.baseUrl}/project${query}`, 'GET', null, opts);
  }

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
            // Using object.assign so we don't cross polinate multiple form loads.
            return Object.assign({}, currentForm);
          })
          // If we couldn't load the revision, just return the original form.
          .catch(() => Object.assign({}, currentForm));
      });
  }

  saveForm(data, opts) {
    return this.save('form', data, opts);
  }

  deleteForm(opts) {
    return this.delete('form', opts);
  }

  loadForms(query, opts) {
    return this.index('forms', query, opts);
  }

  loadSubmission(query, opts) {
    return this.load('submission', query, opts)
      .then((submission) => {
        this.vId = submission._fvid;
        this.vUrl = `${this.formUrl}/v/${this.vId}`;
        return submission;
      });
  }

  saveSubmission(data, opts) {
    if (!isNaN(parseInt(this.vId))) {
      data._fvid = this.vId;
    }
    return this.save('submission', data, opts);
  }

  deleteSubmission(opts) {
    return this.delete('submission', opts);
  }

  loadSubmissions(query, opts) {
    return this.index('submissions', query, opts);
  }

  loadAction(query, opts) {
    return this.load('action', query, opts);
  }

  saveAction(data, opts) {
    return this.save('action', data, opts);
  }

  deleteAction(opts) {
    return this.delete('action', opts);
  }

  loadActions(query, opts) {
    return this.index('actions', query, opts);
  }

  availableActions() {
    return this.makeRequest('availableActions', `${this.formUrl}/actions`);
  }

  actionInfo(name) {
    return this.makeRequest('actionInfo', `${this.formUrl}/actions/${name}`);
  }

  isObjectId(id) {
    const checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');
    return checkForHexRegExp.test(id);
  }

  getProjectId() {
    if (!this.projectId) {
      return Promise.resolve('');
    }
    if (this.isObjectId(this.projectId)) {
      return Promise.resolve(this.projectId);
    }
    else {
      return this.loadProject().then((project) => {
        return project._id;
      });
    }
  }

  getFormId() {
    if (!this.formId) {
      return Promise.resolve('');
    }
    if (this.isObjectId(this.formId)) {
      return Promise.resolve(this.formId);
    }
    else {
      return this.loadForm().then((form) => {
        return form._id;
      });
    }
  }

  currentUser(options) {
    return Formio.currentUser(this, options);
  }

  accessInfo() {
    return Formio.accessInfo(this);
  }

  /**
   * Returns the JWT token for this instance.
   *
   * @return {*}
   */
  getToken() {
    return Formio.getToken();
  }

  /**
   * Returns a temporary authentication token for single purpose token generation.
   */
  getTempToken(expire, allowed) {
    const token = Formio.getToken();
    if (!token) {
      return Promise.reject('You must be authenticated to generate a temporary auth token.');
    }
    return this.makeRequest('tempToken', `${this.projectUrl}/token`, 'GET', null, {
      ignoreCache: true,
      header: new Headers({
        'x-expire': expire,
        'x-allow': allowed
      })
    });
  }

  /**
   * Get a download url for a submission PDF of this submission.
   *
   * @return {*}
   */
  getDownloadUrl(form) {
    if (!this.submissionId) {
      return Promise.resolve('');
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
    return new Promise((resolve, reject) => {
      this.getTempToken(3600, `GET:${apiUrl}`).then((tempToken) => {
        download += `?token=${tempToken.key}`;
        resolve(download);
      }, () => {
        resolve(download);
      }).catch(reject);
    });
  }

  uploadFile(storage, file, fileName, dir, progressCallback, url) {
    const requestArgs = {
      provider: storage,
      method: 'upload',
      file: file,
      fileName: fileName,
      dir: dir
    };
    const request = Formio.pluginWait('preRequest', requestArgs)
      .then(() => {
        return Formio.pluginGet('fileRequest', requestArgs)
          .then((result) => {
            if (storage && isNil(result)) {
              if (Formio.providers.storage.hasOwnProperty(storage)) {
                const provider = new Formio.providers.storage[storage](this);
                return provider.uploadFile(file, fileName, dir, progressCallback, url);
              }
              else {
                throw ('Storage provider not found');
              }
            }
            return result || {url: ''};
          });
      });

    return Formio.pluginAlter('wrapFileRequestPromise', request, requestArgs);
  }

  downloadFile(file) {
    const requestArgs = {
      method: 'download',
      file: file
    };

    const request = Formio.pluginWait('preRequest', requestArgs)
      .then(() => {
        return Formio.pluginGet('fileRequest', requestArgs)
          .then((result) => {
            if (file.storage && isNil(result)) {
              if (Formio.providers.storage.hasOwnProperty(file.storage)) {
                const provider = new Formio.providers.storage[file.storage](this);
                return provider.downloadFile(file);
              }
              else {
                throw ('Storage provider not found');
              }
            }
            return result || {url: ''};
          });
      });

    return Formio.pluginAlter('wrapFileRequestPromise', request, requestArgs);
  }

  // Determine if the user can submit the form.
  canSubmit() {
    /* eslint-disable max-statements, max-depth */
    return Promise.all([
      this.loadForm(),
      this.currentUser(),
      this.accessInfo()
    ]).then((results) => {
      const form = results.shift();
      const user = results.shift();
      const access = results.shift();

      // Get the anonymous and admin roles.
      let anonRole = {};
      let adminRole = {};
      for (const roleName in access.roles) {
        if (access.roles.hasOwnProperty(roleName)) {
          const role = access.roles[roleName];
          if (role.default) {
            anonRole = role;
          }
          if (role.admin) {
            adminRole = role;
          }
        }
      }

      let canSubmit = false;
      let canSubmitAnonymously = false;

      // If the user is an admin, then they can submit this form.
      if (user && user.roles.includes(adminRole._id)) {
        return true;
      }

      for (const i in form.submissionAccess) {
        if (form.submissionAccess.hasOwnProperty(i)) {
          const subRole = form.submissionAccess[i];
          if (subRole.type === 'create_all' || subRole.type === 'create_own') {
            for (const j in subRole.roles) {
              if (subRole.roles.hasOwnProperty(j)) {
                // Check if anonymous is allowed.
                if (anonRole._id === subRole.roles[j]) {
                  canSubmitAnonymously = true;
                }
                // Check if the logged in user has the appropriate role.
                if (user && user.roles.includes(subRole.roles[j])) {
                  canSubmit = true;
                  break;
                }
              }
            }
            if (canSubmit) {
              break;
            }
          }
        }
      }
      // If their user cannot submit, but anonymous can, then delete token and allow submission.
      if (!canSubmit && canSubmitAnonymously) {
        canSubmit = true;
        Formio.setUser(null);
      }
      return canSubmit;
    });
    /* eslint-enable max-statements, max-depth */
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

  static serialize(obj) {
    const str = [];
    for (const p in obj) {
      if (obj.hasOwnProperty(p)) {
        str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
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

  static makeRequest(formio, type, url, method, data, opts) {
    if (!formio) {
      return Formio.makeStaticRequest(url, method, data, opts);
    }

    const requestArgs = Formio.getRequestArgs(formio, type, url, method, data, opts);
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

  static request(url, method, data, header, opts) {
    if (!url) {
      return Promise.reject('No url provided');
    }
    method = (method || 'GET').toUpperCase();

    // For reverse compatibility, if they provided the ignoreCache parameter,
    // then change it back to the options format where that is a parameter.
    if (isBoolean(opts)) {
      opts = {ignoreCache: opts};
    }
    if (!opts || !isObject(opts)) {
      opts = {};
    }

    // Generate a cachekey.
    const cacheKey = btoa(url);

    // Get the cached promise to save multiple loads.
    if (!opts.ignoreCache && method === 'GET' && Formio.cache.hasOwnProperty(cacheKey)) {
      return Promise.resolve(Formio.cache[cacheKey]);
    }

    // Set up and fetch request
    const headers = header || new Headers(opts.headers || {
      'Accept': 'application/json',
      'Content-type': 'application/json; charset=UTF-8'
    });
    const token = Formio.getToken();
    if (token && !opts.noToken) {
      headers.append('x-jwt-token', token);
    }

    let options = {
      method: method,
      headers: headers,
      mode: 'cors'
    };
    if (data) {
      options.body = JSON.stringify(data);
    }

    // Allow plugins to alter the options.
    options = Formio.pluginAlter('requestOptions', options, url);

    const requestToken = options.headers.get('x-jwt-token');
    return fetch(url, options)
      .then((response) => {
        // Allow plugins to respond.
        response = Formio.pluginAlter('requestResponse', response, Formio);

        if (!response.ok) {
          if (response.status === 440) {
            Formio.setToken(null);
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
              return Promise.reject(error);
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
          Formio.setToken(token);
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
            result: result,
            headers: headers
          };
        });
      })
      .then((result) => {
        if (opts.getHeaders) {
          return result;
        }

        let resultCopy = {};

        // Shallow copy result so modifications don't end up in cache
        if (Array.isArray(result)) {
          resultCopy = result.map(copy);
          resultCopy.skip = result.skip;
          resultCopy.limit = result.limit;
          resultCopy.serverCount = result.serverCount;
        }
        else {
          resultCopy = copy(result);
        }

        // Cache the response.
        if (method === 'GET') {
          Formio.cache[cacheKey] = resultCopy;
        }

        return resultCopy;
      })
      .catch((err) => {
        if (err === 'Bad Token') {
          Formio.setToken(null);
          Formio.events.emit('formio.badToken', err);
        }
        if (err.message) {
          err.message = `Could not connect to API server (${err.message})`;
          err.networkError = true;
        }
        return Promise.reject(err);
      });
  }

  static setToken(token) {
    token = token || '';
    if (token === this.token) {
      return;
    }
    this.token = token;
    if (!token) {
      Formio.setUser(null);
      // iOS in private browse mode will throw an error but we can't detect ahead of time that we are in private mode.
      try {
        return localStorage.removeItem('formioToken');
      }
      catch (err) {
        return cookies.erase('formioToken', {path: '/'});
      }
    }
    // iOS in private browse mode will throw an error but we can't detect ahead of time that we are in private mode.
    try {
      localStorage.setItem('formioToken', token);
    }
    catch (err) {
      cookies.set('formioToken', token, {path: '/'});
    }
    return Formio.currentUser(); // Run this so user is updated if null
  }

  static getToken() {
    if (this.token) {
      return this.token;
    }
    try {
      this.token = localStorage.getItem('formioToken') || '';
      return this.token;
    }
    catch (e) {
      this.token = cookies.get('formioToken');
      return this.token;
    }
  }

  static setUser(user) {
    if (!user) {
      this.setToken(null);
      // iOS in private browse mode will throw an error but we can't detect ahead of time that we are in private mode.
      try {
        return localStorage.removeItem('formioUser');
      }
      catch (err) {
        return cookies.erase('formioUser', {path: '/'});
      }
    }
    // iOS in private browse mode will throw an error but we can't detect ahead of time that we are in private mode.
    try {
      localStorage.setItem('formioUser', JSON.stringify(user));
    }
    catch (err) {
      cookies.set('formioUser', JSON.stringify(user), {path: '/'});
    }
  }

  static getUser() {
    try {
      return JSON.parse(localStorage.getItem('formioUser') || null);
    }
    catch (e) {
      return JSON.parse(cookies.get('formioUser'));
    }
  }

  static setBaseUrl(url) {
    Formio.baseUrl = url;
    if (!Formio.projectUrlSet) {
      Formio.projectUrl = url;
    }
  }

  static getBaseUrl() {
    return Formio.baseUrl;
  }

  static setApiUrl(url) {
    return Formio.setBaseUrl(url);
  }

  static getApiUrl() {
    return Formio.getBaseUrl();
  }

  static setAppUrl(url) {
    console.warn('Formio.setAppUrl() is deprecated. Use Formio.setProjectUrl instead.');
    Formio.projectUrl = url;
    Formio.projectUrlSet = true;
  }

  static setProjectUrl(url) {
    Formio.projectUrl = url;
    Formio.projectUrlSet = true;
  }

  static getAppUrl() {
    console.warn('Formio.getAppUrl() is deprecated. Use Formio.getProjectUrl instead.');
    return Formio.projectUrl;
  }

  static getProjectUrl() {
    return Formio.projectUrl;
  }

  static clearCache() {
    Formio.cache = {};
  }

  static noop() {}
  static identity(value) {
    return value;
  }

  static deregisterPlugin(plugin) {
    const beforeLength = Formio.plugins.length;
    Formio.plugins = Formio.plugins.filter((p) => {
      if (p !== plugin && p.__name !== plugin) {
        return true;
      }

      (p.deregister || Formio.noop).call(plugin, Formio);
      return false;
    });
    return beforeLength !== Formio.plugins.length;
  }

  static registerPlugin(plugin, name) {
    Formio.plugins.push(plugin);
    Formio.plugins.sort((a, b) => (b.priority || 0) - (a.priority || 0));
    plugin.__name = name;
    (plugin.init || Formio.noop).call(plugin, Formio);
  }

  static getPlugin(name) {
    for (const plugin of Formio.plugins) {
      if (plugin.__name === name) {
        return plugin;
      }
    }

    return null;
  }

  static pluginWait(pluginFn, ...args) {
    return Promise.all(Formio.plugins.map((plugin) =>
      (plugin[pluginFn] || Formio.noop).call(plugin, ...args)));
  }

  static pluginGet(pluginFn, ...args) {
    const callPlugin = (index) => {
      const plugin = Formio.plugins[index];

      if (!plugin) {
        return Promise.resolve(null);
      }

      return Promise.resolve((plugin[pluginFn] || Formio.noop).call(plugin, ...args))
        .then((result) => {
          if (!isNil(result)) {
            return result;
          }

          return callPlugin(index + 1);
        });
    };
    return callPlugin(0);
  }

  static pluginAlter(pluginFn, value, ...args) {
    return Formio.plugins.reduce((value, plugin) =>
      (plugin[pluginFn] || Formio.identity)(value, ...args), value);
  }

  static accessInfo(formio) {
    const projectUrl = formio ? formio.projectUrl : Formio.projectUrl;
    return Formio.makeRequest(formio, 'accessInfo', `${projectUrl}/access`);
  }

  static currentUser(formio, options) {
    let projectUrl = formio ? formio.projectUrl : Formio.baseUrl;
    projectUrl += '/current';
    const user = this.getUser();
    if (user) {
      return Formio.pluginAlter('wrapStaticRequestPromise', Promise.resolve(user), {
        url: projectUrl,
        method: 'GET',
        options
      });
    }
    const token = Formio.getToken();
    if (!token) {
      return Formio.pluginAlter('wrapStaticRequestPromise', Promise.resolve(null), {
        url: projectUrl,
        method: 'GET',
        options
      });
    }
    return Formio.makeRequest(formio, 'currentUser', projectUrl, 'GET', null, options)
      .then((response) => {
        Formio.setUser(response);
        return response;
      });
  }

  static logout(formio) {
    Formio.setToken(null);
    Formio.setUser(null);
    Formio.clearCache();
    const projectUrl = formio ? formio.projectUrl : Formio.baseUrl;
    return Formio.makeRequest(formio, 'logout', `${projectUrl}/logout`);
  }
}

// Define all the static properties.
Formio.Headers = Headers;
Formio.baseUrl = 'https://api.form.io';
Formio.projectUrl = Formio.baseUrl;
Formio.projectUrlSet = false;
Formio.plugins = [];
Formio.cache = {};
Formio.providers = providers;
Formio.events = new EventEmitter({
  wildcard: false,
  maxListeners: 0
});

if (typeof global === 'object') {
  global.Formio = Formio;
}
