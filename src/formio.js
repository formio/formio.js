'use strict';

// Intentionally use native-promise-only here... Other promise libraries (es6-promise)
// duck-punch the global Promise definition which messes up Angular 2 since it
// also duck-punches the global Promise definition. For now, keep native-promise-only.
var Promise = require("native-promise-only");
require('whatwg-fetch');
var EventEmitter = require('eventemitter2').EventEmitter2;
var copy = require('shallow-copy');

/**
 * The Formio interface class.
 *
 *   let formio = new Formio('https://examples.form.io/example');
 */
export class Formio {
  constructor(path) {
    // Ensure we have an instance of Formio.
    if (!(this instanceof Formio)) { return new Formio(path); }
    if (!path) {
      // Allow user to create new projects if this was instantiated without
      // a url
      this.projectUrl = Formio.baseUrl + '/project';
      this.projectsUrl = Formio.baseUrl + '/project';
      this.projectId = false;
      this.query = '';
      return;
    }

    // Initialize our variables.
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
    this.query = '';

    // Normalize to an absolute path.
    if ((path.indexOf('http') !== 0) && (path.indexOf('//') !== 0)) {
      Formio.baseUrl = Formio.baseUrl ? Formio.baseUrl : window.location.href.match(/http[s]?:\/\/api./)[0];
      path = Formio.baseUrl + path;
    }

    var hostparts = Formio.getUrlParts(path);
    var parts = [];
    var hostName = hostparts[1] + hostparts[2];
    path = hostparts.length > 3 ? hostparts[3] : '';
    var queryparts = path.split('?');
    if (queryparts.length > 1) {
      path = queryparts[0];
      this.query = '?' + queryparts[1];
    }

    // See if this is a form path.
    if ((path.search(/(^|\/)(form|project)($|\/)/) !== -1)) {

      // Register a specific path.
      var registerPath = function(name, base) {
        this[name + 'sUrl'] = base + '/' + name;
        var regex = new RegExp('\/' + name + '\/([^/]+)');
        if (path.search(regex) !== -1) {
          parts = path.match(regex);
          this[name + 'Url'] = parts ? (base + parts[0]) : '';
          this[name + 'Id'] = (parts.length > 1) ? parts[1] : '';
          base += parts[0];
        }
        return base;
      }.bind(this);

      // Register an array of items.
      var registerItems = function(items, base, staticBase) {
        for (var i in items) {
          if (items.hasOwnProperty(i)) {
            var item = items[i];
            if (item instanceof Array) {
              registerItems(item, base, true);
            }
            else {
              var newBase = registerPath(item, base);
              base = staticBase ? base : newBase;
            }
          }
        }
      };

      registerItems(['project', 'form', ['submission', 'action']], hostName);

      if (!this.projectId) {
        if (hostparts.length > 2 && hostparts[2].split('.').length > 2) {
          this.projectUrl = hostName;
          this.projectId = hostparts[2].split('.')[0];
        }
      }
    }
    else {

      // This is an aliased url.
      this.projectUrl = hostName;
      this.projectId = (hostparts.length > 2) ? hostparts[2].split('.')[0] : '';
      var subRegEx = new RegExp('\/(submission|action)($|\/.*)');
      var subs = path.match(subRegEx);
      this.pathType = (subs && (subs.length > 1)) ? subs[1] : '';
      path = path.replace(subRegEx, '');
      path = path.replace(/\/$/, '');
      this.formsUrl = hostName + '/form';
      this.formUrl = hostName + path;
      this.formId = path.replace(/^\/+|\/+$/g, '');
      var items = ['submission', 'action'];
      for (var i in items) {
        if (items.hasOwnProperty(i)) {
          var item = items[i];
          this[item + 'sUrl'] = hostName + path + '/' + item;
          if ((this.pathType === item) && (subs.length > 2) && subs[2]) {
            this[item + 'Id'] = subs[2].replace(/^\/+|\/+$/g, '');
            this[item + 'Url'] = hostName + path + subs[0];
          }
        }
      }
    }

    // Set the app url if it is not set.
    if (!Formio.appUrlSet) {
      Formio.appUrl = this.projectUrl;
    }
  }

  delete(type, opts) {
    var _id = type + 'Id';
    var _url = type + 'Url';
    if (!this[_id]) { Promise.reject('Nothing to delete'); }
    Formio.cache = {};
    return this.makeRequest(type, this[_url], 'delete', null, opts);
  }

  index(type, query, opts) {
    var _url = type + 'Url';
    query = query || '';
    if (query && typeof query === 'object') {
      query = '?' + Formio.serialize(query.params);
    }
    return this.makeRequest(type, this[_url] + query, 'get', null, opts);
  }

  save(type, data, opts) {
    var _id = type + 'Id';
    var _url = type + 'Url';
    var method = (this[_id] || data._id) ? 'put' : 'post';
    var reqUrl = this[_id] ? this[_url] : this[type + 'sUrl'];
    if (!this[_id] && data._id && (method === 'put')) {
      reqUrl += '/' + data._id;
    }
    Formio.cache = {};
    return this.makeRequest(type, reqUrl + this.query, method, data, opts);
  }

  load(type, query, opts) {
    var _id = type + 'Id';
    var _url = type + 'Url';
    if (query && typeof query === 'object') {
      query = Formio.serialize(query.params);
    }
    if (query) {
      query = this.query ? (this.query + '&' + query) : ('?' + query);
    }
    else {
      query = this.query;
    }
    if (!this[_id]) { return Promise.reject('Missing ' + _id); }
    return this.makeRequest(type, this[_url] + query, 'get', null, opts);
  }

  makeRequest(type, url, method, data, opts) {
    method = (method || 'GET').toUpperCase();
    if(!opts || typeof opts !== 'object') {
      opts = {};
    }

    var requestArgs = {
      formio: this,
      type: type,
      url: url,
      method: method,
      data: data,
      opts: opts
    };

    var request = Formio.pluginWait('preRequest', requestArgs)
      .then(function() {
        return Formio.pluginGet('request', requestArgs)
          .then(function(result) {
            if (result === null || result === undefined) {
              return Formio.request(url, method, data, opts.header, opts);
            }
            return result;
          });
      });

    return Formio.pluginAlter('wrapRequestPromise', request, requestArgs);
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
    if (typeof query === 'object') {
      query = '?' + serialize(query.params);
    }
    return Formio.makeStaticRequest(Formio.baseUrl + '/project' + query);
  }

  loadForm(query, opts) {
    return this.load('form', query, opts);
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
    return this.load('submission', query, opts);
  }

  saveSubmission(data, opts) {
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
    return this.makeRequest('availableActions', this.formUrl + '/actions');
  }

  actionInfo() {
    return this.makeRequest('actionInfo', this.formUrl + '/actions/' + name);
  }

  uploadFile(storage, file, fileName, dir, progressCallback, url) {
    var requestArgs = {
      provider: storage,
      method: 'upload',
      file: file,
      fileName: fileName,
      dir: dir
    }
    var request = Formio.pluginWait('preRequest', requestArgs)
      .then(function() {
        return Formio.pluginGet('fileRequest', requestArgs)
          .then(function(result) {
            if (storage && (result === null || result === undefined)) {
              if (Formio.providers.storage.hasOwnProperty(storage)) {
                var provider = new Formio.providers.storage[storage](this);
                return provider.uploadFile(file, fileName, dir, progressCallback, url);
              }
              else {
                throw('Storage provider not found');
              }
            }
            return result || {url: ''};
          }.bind(this));
      }.bind(this));

    return Formio.pluginAlter('wrapFileRequestPromise', request, requestArgs);
  }

  downloadFile(file) {
    var requestArgs = {
      method: 'download',
      file: file
    };

    var request = Formio.pluginWait('preRequest', requestArgs)
      .then(function() {
        return Formio.pluginGet('fileRequest', requestArgs)
          .then(function(result) {
            if (file.storage && (result === null || result === undefined)) {
              if (Formio.providers.storage.hasOwnProperty(file.storage)) {
                var provider = new Formio.providers.storage[file.storage](this);
                return provider.downloadFile(file);
              }
              else {
                throw('Storage provider not found');
              }
            }
            return result || {url: ''};
          }.bind(this));
      }.bind(this));

    return Formio.pluginAlter('wrapFileRequestPromise', request, requestArgs);
  }

  static getUrlParts(url) {
    var regex = '^(http[s]?:\\/\\/)';
    if (Formio.baseUrl && url.indexOf(Formio.baseUrl) === 0) {
      regex += '(' + Formio.baseUrl.replace(/^http[s]?:\/\//, '') + ')';
    }
    else {
      regex += '([^/]+)';
    }
    regex += '($|\\/.*)';
    return url.match(new RegExp(regex));
  }

  static serialize(obj) {
    var str = [];
    for(var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }

  static makeStaticRequest(url, method, data, opts) {
    method = (method || 'GET').toUpperCase();
    if(!opts || typeof opts !== 'object') {
      opts = {};
    }
    var requestArgs = {
      url: url,
      method: method,
      data: data
    };

    var request = Formio.pluginWait('preRequest', requestArgs)
      .then(function() {
        return Formio.pluginGet('staticRequest', requestArgs)
          .then(function(result) {
            if (result === null || result === undefined) {
              return Formio.request(url, method, data, opts.header, opts);
            }
            return result;
          });
      });

    return Formio.pluginAlter('wrapStaticRequestPromise', request, requestArgs);
  }

  static request(url, method, data, header, opts) {
    if (!url) {
      return Promise.reject('No url provided');
    }
    method = (method || 'GET').toUpperCase();

    // For reverse compatibility, if they provided the ignoreCache parameter,
    // then change it back to the options format where that is a parameter.
    if (typeof opts === 'boolean') {
      opts = {ignoreCache: opts};
    }
    if(!opts || typeof opts !== 'object') {
      opts = {};
    }

    var cacheKey = btoa(url);

    return new Promise(function(resolve, reject) {
      // Get the cached promise to save multiple loads.
      if (!opts.ignoreCache && method === 'GET' && Formio.cache.hasOwnProperty(cacheKey)) {
        return resolve(Formio.cache[cacheKey]);
      }

      resolve(new Promise(function(resolve, reject) {
        // Set up and fetch request
        var headers = header || new Headers({
            'Accept': 'application/json',
            'Content-type': 'application/json; charset=UTF-8'
          });
        var token = Formio.getToken();
        if (token) {
          headers.append('x-jwt-token', token);
        }

        var options = {
          method: method,
          headers: headers,
          mode: 'cors'
        };
        if (data) {
          options.body = JSON.stringify(data);
        }

        resolve(fetch(url, options));
      })
        .catch(function(err) {
          err.message = 'Could not connect to API server (' + err.message + ')';
          err.networkError = true;
          throw err;
        })
        .then(function(response) {
          if (!response.ok) {
            if (response.status === 440) {
              Formio.setToken(null);
              Formio.events.emit('formio.sessionExpired', response.body);
            }
            else if (response.status === 401) {
              Formio.events.emit('formio.unauthorized', response.body);
            }
            // Parse and return the error as a rejected promise to reject this promise
            return (response.headers.get('content-type').indexOf('application/json') !== -1 ?
              response.json() : response.text())
              .then(function(error){
                throw error;
              });
          }

          // Handle fetch results
          var token = response.headers.get('x-jwt-token');
          if (response.status >= 200 && response.status < 300 && token && token !== '') {
            Formio.setToken(token);
          }
          // 204 is no content. Don't try to .json() it.
          if (response.status === 204) {
            return {};
          }
          return (response.headers.get('content-type').indexOf('application/json') !== -1
              ? response.json()
              : response.text()
          ).then(function(result) {
            // Add some content-range metadata to the result here
            var range = response.headers.get('content-range');
            if (range && typeof result === 'object') {
              range = range.split('/');
              if(range[0] !== '*') {
                var skipLimit = range[0].split('-');
                result.skip = Number(skipLimit[0]);
                result.limit = skipLimit[1] - skipLimit[0] + 1;
              }
              result.serverCount = range[1] === '*' ? range[1] : Number(range[1]);
            }

            if (!opts.getHeaders) {
              return result;
            }

            var headers = {};
            response.headers.forEach(function(item, key) {
              headers[key] = item;
            });

            return new Promise(function(resolve, reject) {
              resolve({result: result, headers: headers});
            });
          });
        })
        .catch(function(err) {
          if (err === 'Bad Token') {
            Formio.setToken(null);
            Formio.events.emit('formio.badToken', err);
          }
          if (Formio.cache.hasOwnProperty(cacheKey)) {
            // Remove failed promises from cache
            delete Formio.cache[cacheKey];
          }
          // Propagate error so client can handle accordingly
          throw err;
        }));
    })
      .then(function(result) {
        // Save the cache
        if (method === 'GET') {
          Formio.cache[cacheKey] = Promise.resolve(result);
        }

        // Shallow copy result so modifications don't end up in cache
        if(Array.isArray(result)) {
          var resultCopy = result.map(copy);
          resultCopy.skip = result.skip;
          resultCopy.limit = result.limit;
          resultCopy.serverCount = result.serverCount;
          return resultCopy;
        }
        return copy(result);
      });
  }

  static setToken(token) {
    token = token || '';
    if (token === this.token) { return; }
    this.token = token;
    if (!token) {
      Formio.setUser(null);
      // iOS in private browse mode will throw an error but we can't detect ahead of time that we are in private mode.
      try {
        return localStorage.removeItem('formioToken');
      }
      catch(err) {
        return;
      }
    }
    // iOS in private browse mode will throw an error but we can't detect ahead of time that we are in private mode.
    try {
      localStorage.setItem('formioToken', token);
    }
    catch(err) {
      // Do nothing.
    }
    return Formio.currentUser(); // Run this so user is updated if null
  }

  static getToken() {
    if (this.token) { return this.token; }
    try {
      var token = localStorage.getItem('formioToken') || '';
      this.token = token;
      return token;
    }
    catch (e) {
      return '';
    }
  }

  static setUser(user) {
    if (!user) {
      this.setToken(null);
      // iOS in private browse mode will throw an error but we can't detect ahead of time that we are in private mode.
      try {
        return localStorage.removeItem('formioUser');
      }
      catch(err) {
        return;
      }
    }
    // iOS in private browse mode will throw an error but we can't detect ahead of time that we are in private mode.
    try {
      localStorage.setItem('formioUser', JSON.stringify(user));
    }
    catch(err) {
      // Do nothing.
    }
  }

  static getUser() {
    try {
      return JSON.parse(localStorage.getItem('formioUser') || null);
    }
    catch (e) {
      return;
    }
  }

  static setBaseUrl(url) {
    Formio.baseUrl = url;
    if (!Formio.appUrlSet) {
      Formio.appUrl = url;
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
    Formio.appUrl = url;
    Formio.appUrlSet = true;
  }

  static getAppUrl() {
    return Formio.appUrl;
  }

  static clearCache() {
    Formio.cache = {};
  }

  static noop() {}
  static identity(value) { return value; }

  static deregisterPlugin(plugin) {
    var beforeLength = Formio.plugins.length;
    Formio.plugins = Formio.plugins.filter(function(p) {
      if(p !== plugin && p.__name !== plugin) return true;
      (p.deregister || Formio.noop).call(p, Formio);
      return false;
    });
    return beforeLength !== Formio.plugins.length;
  }

  static registerPlugin(plugin, name) {
    Formio.plugins.push(plugin);
    Formio.plugins.sort(function(a, b) {
      return (b.priority || 0) - (a.priority || 0);
    });
    plugin.__name = name;
    (plugin.init || Formio.noop).call(plugin, Formio);
  }

  static getPlugin(name) {
    return Formio.plugins.reduce(function(result, plugin) {
      if (result) return result;
      if (plugin.__name === name) return plugin;
    }, null);
  }

  static pluginWait(pluginFn) {
    var args = [].slice.call(arguments, 1);
    return Promise.all(Formio.plugins.map(function(plugin) {
      return (plugin[pluginFn] || Formio.noop).apply(plugin, args);
    }));
  }

  static pluginGet(pluginFn) {
    var args = [].slice.call(arguments, 0);
    var callPlugin = function(index, pluginFn) {
      var plugin = Formio.plugins[index];
      if (!plugin) return Promise.resolve(null);
      return Promise.resolve((plugin && plugin[pluginFn] || Formio.noop).apply(plugin, [].slice.call(arguments, 2)))
        .then(function(result) {
          if (result !== null && result !== undefined) return result;
          return callPlugin.apply(null, [index + 1].concat(args));
        });
    };
    return callPlugin.apply(null, [0].concat(args));
  }

  static pluginAlter(pluginFn, value) {
    var args = [].slice.call(arguments, 2);
    return Formio.plugins.reduce(function(value, plugin) {
      return (plugin[pluginFn] || Formio.identity).apply(plugin, [value].concat(args));
    }, value);
  }

  static currentUser() {
    var url = Formio.baseUrl + '/current';
    var user = this.getUser();
    if (user) {
      return Formio.pluginAlter('wrapStaticRequestPromise', Promise.resolve(user), {
        url: url,
        method: 'GET'
      })
    }
    var token = this.getToken();
    if (!token) {
      return Formio.pluginAlter('wrapStaticRequestPromise', Promise.resolve(null), {
        url: url,
        method: 'GET'
      })
    }
    return Formio.makeStaticRequest(url)
      .then(function(response) {
        Formio.setUser(response);
        return response;
      });
  }

  static logout() {
    var onLogout = function(result) {
      Formio.setToken(null);
      Formio.setUser(null);
      Formio.clearCache();
      return result;
    };
    return Formio.makeStaticRequest(Formio.baseUrl + '/logout').then(onLogout).catch(onLogout);
  }

  /**
   * Attach an HTML form to Form.io.
   *
   * @param form
   */
  static form(form, options, done) {
    // Fix the parameters.
    if (!done && typeof options === 'function') {
      done = options;
      options = {};
    }

    done = done || (function() { console.log(arguments); });
    options = options || {};

    // IF they provide a jquery object, then select the element.
    if (form.jquery) { form = form[0]; }
    if (!form) {
      return done('Invalid Form');
    }

    var getAction = function() {
      return options.form || form.getAttribute('action');
    };

    /**
     * Returns the current submission object.
     * @returns {{data: {}}}
     */
    var getSubmission = function() {
      var submission = {data: {}};
      var setValue = function(path, value) {
        var isArray = path.substr(-2) === '[]';
        if (isArray) {
          path = path.replace('[]', '');
        }
        var paths = path.replace(/\[|\]\[/g, '.').replace(/\]$/g, '').split('.');
        var current = submission;
        while (path = paths.shift()) {
          if (!paths.length) {
            if (isArray) {
              if (!current[path]) {
                current[path] = [];
              }
              current[path].push(value);
            }
            else {
              current[path] = value;
            }
          }
          else {
            if (!current[path]) {
              current[path] = {};
            }
            current = current[path];
          }
        }
      };

      // Get the form data from this form.
      var formData = new FormData(form);
      var entries = formData.entries();
      var entry = null;
      while (entry = entries.next().value) {
        setValue(entry[0], entry[1]);
      }
      return submission;
    };

    // Submits the form.
    var submit = function(event) {
      if (event) {
        event.preventDefault();
      }
      var action = getAction();
      if (!action) {
        return;
      }
      (new Formio(action)).saveSubmission(getSubmission()).then(function(sub) {
        done(null, sub);
      }, done);
    };

    // Attach formio to the provided form.
    if (form.attachEvent) {
      form.attachEvent('submit', submit);
    } else {
      form.addEventListener('submit', submit);
    }

    return {
      submit: submit,
      getAction: getAction,
      getSubmission: getSubmission
    };
  }

  static fieldData(data, component) {
    if (!data) { return ''; }
    if (!component || !component.key) { return data; }
    if (component.key.indexOf('.') !== -1) {
      var value = data;
      var parts = component.key.split('.');
      var key = '';
      for (var i = 0; i < parts.length; i++) {
        key = parts[i];

        // Handle nested resources
        if (value.hasOwnProperty('_id')) {
          value = value.data;
        }

        // Return if the key is not found on the value.
        if (!value.hasOwnProperty(key)) {
          return;
        }

        // Convert old single field data in submissions to multiple
        if (key === parts[parts.length - 1] && component.multiple && !Array.isArray(value[key])) {
          value[key] = [value[key]];
        }

        // Set the value of this key.
        value = value[key];
      }
      return value;
    }
    else {
      // Convert old single field data in submissions to multiple
      if (component.multiple && !Array.isArray(data[component.key])) {
        data[component.key] = [data[component.key]];
      }
      return data[component.key];
    }
  }
}

// Define all the static properties.
Formio.baseUrl = 'https://api.form.io';
Formio.appUrl = Formio.baseUrl;
Formio.appUrlSet = false;
Formio.plugins = [];
Formio.cache = {};
Formio.providers = require('./providers');
Formio.events = new EventEmitter({
  wildcard: false,
  maxListeners: 0
});
