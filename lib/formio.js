'use strict';
// Intentionally use native-promise-only here... Other promise libraries (es6-promise)
// duck-punch the global Promise definition which messes up Angular 2 since it
// also duck-punches the global Promise definition. For now, keep native-promise-only.

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _nativePromiseOnly = require('native-promise-only');

var _nativePromiseOnly2 = _interopRequireDefault(_nativePromiseOnly);

require('whatwg-fetch');

var _eventemitter = require('eventemitter2');

var _browserCookies = require('browser-cookies');

var _browserCookies2 = _interopRequireDefault(_browserCookies);

var _shallowCopy = require('shallow-copy');

var _shallowCopy2 = _interopRequireDefault(_shallowCopy);

var _providers = require('./providers');

var _providers2 = _interopRequireDefault(_providers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var isBoolean = function isBoolean(val) {
  return (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === _typeof(true);
};
var isNil = function isNil(val) {
  return val === null || val === undefined;
};
var isObject = function isObject(val) {
  return val && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object';
};

/**
 * The Formio interface class.
 *
 *   let formio = new Formio('https://examples.form.io/example');
 */

var Formio = function () {
  function Formio(path) {
    var _this = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Formio);

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
    } else if (Formio.baseUrl) {
      this.base = Formio.baseUrl;
    } else {
      this.base = window.location.href.match(/http[s]?:\/\/api./)[0];
    }

    if (!path) {
      // Allow user to create new projects if this was instantiated without
      // a url
      this.projectUrl = this.base + '/project';
      this.projectsUrl = this.base + '/project';
      this.projectId = false;
      this.query = '';
      return;
    }

    if (options.hasOwnProperty('project')) {
      this.projectUrl = options.project;
    }

    var project = this.projectUrl || Formio.projectUrl;

    // The baseURL is the same as the projectUrl. This is almost certainly against
    // the Open Source server.
    if (project && this.base === project) {
      this.noProject = true;
      this.projectUrl = this.base;
    }

    // Normalize to an absolute path.
    if (path.indexOf('http') !== 0 && path.indexOf('//') !== 0) {
      path = this.base + path;
    }

    var hostparts = this.getUrlParts(path);
    var parts = [];
    var hostName = hostparts[1] + hostparts[2];
    path = hostparts.length > 3 ? hostparts[3] : '';
    var queryparts = path.split('?');
    if (queryparts.length > 1) {
      path = queryparts[0];
      this.query = '?' + queryparts[1];
    }

    // Register a specific path.
    var registerPath = function registerPath(name, base) {
      _this[name + 'sUrl'] = base + '/' + name;
      var regex = new RegExp('/' + name + '/([^/]+)');
      if (path.search(regex) !== -1) {
        parts = path.match(regex);
        _this[name + 'Url'] = parts ? base + parts[0] : '';
        _this[name + 'Id'] = parts.length > 1 ? parts[1] : '';
        base += parts[0];
      }
      return base;
    };

    // Register an array of items.
    var registerItems = function registerItems(items, base, staticBase) {
      for (var i in items) {
        if (items.hasOwnProperty(i)) {
          var item = items[i];
          if (Array.isArray(item)) {
            registerItems(item, base, true);
          } else {
            var newBase = registerPath(item, base);
            base = staticBase ? base : newBase;
          }
        }
      }
    };

    if (!this.projectUrl || this.projectUrl === this.base) {
      this.projectUrl = hostName;
    }

    if (!this.noProject) {
      // Determine the projectUrl and projectId
      if (path.search(/(^|\/)(project)($|\/)/) !== -1) {
        // Get project id as project/:projectId.
        registerItems(['project'], hostName);
      } else if (hostName === this.base) {
        // Get project id as first part of path (subdirectory).
        if (hostparts.length > 3 && path.split('/').length > 1) {
          var pathParts = path.split('/');
          pathParts.shift(); // Throw away the first /.
          this.projectId = pathParts.shift();
          path = '/' + pathParts.join('/');
          this.projectUrl = hostName + '/' + this.projectId;
        }
      } else {
        // Get project id from subdomain.
        if (hostparts.length > 2 && (hostparts[2].split('.').length > 2 || hostName.indexOf('localhost') !== -1)) {
          this.projectUrl = hostName;
          this.projectId = hostparts[2].split('.')[0];
        }
      }
      this.projectsUrl = this.projectsUrl || this.base + '/project';
    }

    // Configure Form urls and form ids.
    if (path.search(/(^|\/)(project|form)($|\/)/) !== -1) {
      registerItems(['form', ['submission', 'action', 'v']], this.projectUrl);
    } else {
      var subRegEx = new RegExp('/(submission|action|v)($|/.*)');
      var subs = path.match(subRegEx);
      this.pathType = subs && subs.length > 1 ? subs[1] : '';
      path = path.replace(subRegEx, '');
      path = path.replace(/\/$/, '');
      this.formsUrl = this.projectUrl + '/form';
      this.formUrl = this.projectUrl + path;
      this.formId = path.replace(/^\/+|\/+$/g, '');
      var items = ['submission', 'action', 'v'];
      for (var i in items) {
        if (items.hasOwnProperty(i)) {
          var item = items[i];
          this[item + 'sUrl'] = this.projectUrl + path + '/' + item;
          if (this.pathType === item && subs.length > 2 && subs[2]) {
            this[item + 'Id'] = subs[2].replace(/^\/+|\/+$/g, '');
            this[item + 'Url'] = this.projectUrl + path + subs[0];
          }
        }
      }
    }

    // Set the app url if it is not set.
    if (!Formio.projectUrlSet) {
      Formio.projectUrl = this.projectUrl;
    }
  }

  _createClass(Formio, [{
    key: 'delete',
    value: function _delete(type, opts) {
      var _id = type + 'Id';
      var _url = type + 'Url';
      if (!this[_id]) {
        _nativePromiseOnly2.default.reject('Nothing to delete');
      }
      Formio.cache = {};
      return this.makeRequest(type, this[_url], 'delete', null, opts);
    }
  }, {
    key: 'index',
    value: function index(type, query, opts) {
      var _url = type + 'Url';
      query = query || '';
      if (query && isObject(query)) {
        query = '?' + Formio.serialize(query.params);
      }
      return this.makeRequest(type, this[_url] + query, 'get', null, opts);
    }
  }, {
    key: 'save',
    value: function save(type, data, opts) {
      var _id = type + 'Id';
      var _url = type + 'Url';
      var method = this[_id] || data._id ? 'put' : 'post';
      var reqUrl = this[_id] ? this[_url] : this[type + 'sUrl'];
      if (!this[_id] && data._id && method === 'put' && !(reqUrl.indexOf(data._id) !== -1)) {
        reqUrl += '/' + data._id;
      }
      Formio.cache = {};
      return this.makeRequest(type, reqUrl + this.query, method, data, opts);
    }
  }, {
    key: 'load',
    value: function load(type, query, opts) {
      var _id = type + 'Id';
      var _url = type + 'Url';
      if (query && isObject(query)) {
        query = Formio.serialize(query.params);
      }
      if (query) {
        query = this.query ? this.query + '&' + query : '?' + query;
      } else {
        query = this.query;
      }
      if (!this[_id]) {
        return _nativePromiseOnly2.default.reject('Missing ' + _id);
      }
      return this.makeRequest(type, this[_url] + query, 'get', null, opts);
    }
  }, {
    key: 'makeRequest',
    value: function makeRequest() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return Formio.makeRequest.apply(Formio, [this].concat(args));
    }
  }, {
    key: 'loadProject',
    value: function loadProject(query, opts) {
      return this.load('project', query, opts);
    }
  }, {
    key: 'saveProject',
    value: function saveProject(data, opts) {
      return this.save('project', data, opts);
    }
  }, {
    key: 'deleteProject',
    value: function deleteProject(opts) {
      return this.delete('project', opts);
    }
  }, {
    key: 'loadForm',
    value: function loadForm(query, opts) {
      var _this2 = this;

      return this.load('form', query, opts).then(function (currentForm) {
        // Check to see if there isn't a number in vId.
        if (!currentForm.revisions || isNaN(parseInt(_this2.vId))) {
          return currentForm;
        }
        // If a submission already exists but form is marked to load current version of form.
        if (currentForm.revisions === 'current' && _this2.submissionId) {
          return currentForm;
        }
        // If they specified a revision form, load the revised form components.
        if (query && isObject(query)) {
          query = Formio.serialize(query.params);
        }
        if (query) {
          query = _this2.query ? _this2.query + '&' + query : '?' + query;
        } else {
          query = _this2.query;
        }
        return _this2.makeRequest('form', _this2.vUrl + query, 'get', null, opts).then(function (revisionForm) {
          currentForm.components = revisionForm.components;
          // Using object.assign so we don't cross polinate multiple form loads.
          return Object.assign({}, currentForm);
        })
        // If we couldn't load the revision, just return the original form.
        .catch(function () {
          return Object.assign({}, currentForm);
        });
      });
    }
  }, {
    key: 'saveForm',
    value: function saveForm(data, opts) {
      return this.save('form', data, opts);
    }
  }, {
    key: 'deleteForm',
    value: function deleteForm(opts) {
      return this.delete('form', opts);
    }
  }, {
    key: 'loadForms',
    value: function loadForms(query, opts) {
      return this.index('forms', query, opts);
    }
  }, {
    key: 'loadSubmission',
    value: function loadSubmission(query, opts) {
      var _this3 = this;

      return this.load('submission', query, opts).then(function (submission) {
        _this3.vId = submission._fvid;
        _this3.vUrl = _this3.formUrl + '/v/' + _this3.vId;
        return submission;
      });
    }
  }, {
    key: 'saveSubmission',
    value: function saveSubmission(data, opts) {
      if (!isNaN(parseInt(this.vId))) {
        data._fvid = this.vId;
      }
      return this.save('submission', data, opts);
    }
  }, {
    key: 'deleteSubmission',
    value: function deleteSubmission(opts) {
      return this.delete('submission', opts);
    }
  }, {
    key: 'loadSubmissions',
    value: function loadSubmissions(query, opts) {
      return this.index('submissions', query, opts);
    }
  }, {
    key: 'loadAction',
    value: function loadAction(query, opts) {
      return this.load('action', query, opts);
    }
  }, {
    key: 'saveAction',
    value: function saveAction(data, opts) {
      return this.save('action', data, opts);
    }
  }, {
    key: 'deleteAction',
    value: function deleteAction(opts) {
      return this.delete('action', opts);
    }
  }, {
    key: 'loadActions',
    value: function loadActions(query, opts) {
      return this.index('actions', query, opts);
    }
  }, {
    key: 'availableActions',
    value: function availableActions() {
      return this.makeRequest('availableActions', this.formUrl + '/actions');
    }
  }, {
    key: 'actionInfo',
    value: function actionInfo(name) {
      return this.makeRequest('actionInfo', this.formUrl + '/actions/' + name);
    }
  }, {
    key: 'isObjectId',
    value: function isObjectId(id) {
      var checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');
      return checkForHexRegExp.test(id);
    }
  }, {
    key: 'getProjectId',
    value: function getProjectId() {
      if (!this.projectId) {
        return _nativePromiseOnly2.default.resolve('');
      }
      if (this.isObjectId(this.projectId)) {
        return _nativePromiseOnly2.default.resolve(this.projectId);
      } else {
        return this.loadProject().then(function (project) {
          return project._id;
        });
      }
    }
  }, {
    key: 'getFormId',
    value: function getFormId() {
      if (!this.formId) {
        return _nativePromiseOnly2.default.resolve('');
      }
      if (this.isObjectId(this.formId)) {
        return _nativePromiseOnly2.default.resolve(this.formId);
      } else {
        return this.loadForm().then(function (form) {
          return form._id;
        });
      }
    }
  }, {
    key: 'currentUser',
    value: function currentUser(options) {
      return Formio.currentUser(this, options);
    }
  }, {
    key: 'accessInfo',
    value: function accessInfo() {
      return Formio.accessInfo(this);
    }

    /**
     * Returns the JWT token for this instance.
     *
     * @return {*}
     */

  }, {
    key: 'getToken',
    value: function getToken() {
      return Formio.getToken();
    }

    /**
     * Returns a temporary authentication token for single purpose token generation.
     */

  }, {
    key: 'getTempToken',
    value: function getTempToken(expire, allowed) {
      var token = Formio.getToken();
      if (!token) {
        return _nativePromiseOnly2.default.reject('You must be authenticated to generate a temporary auth token.');
      }
      return this.makeRequest('tempToken', this.projectUrl + '/token', 'GET', null, {
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

  }, {
    key: 'getDownloadUrl',
    value: function getDownloadUrl(form) {
      var _this4 = this;

      if (!this.submissionId) {
        return _nativePromiseOnly2.default.resolve('');
      }

      if (!form) {
        // Make sure to load the form first.
        return this.loadForm().then(function (_form) {
          if (!_form) {
            return '';
          }
          return _this4.getDownloadUrl(_form);
        });
      }

      var apiUrl = '/project/' + form.project;
      apiUrl += '/form/' + form._id;
      apiUrl += '/submission/' + this.submissionId;
      apiUrl += '/download';

      var download = this.base + apiUrl;
      return new _nativePromiseOnly2.default(function (resolve, reject) {
        _this4.getTempToken(3600, 'GET:' + apiUrl).then(function (tempToken) {
          download += '?token=' + tempToken.key;
          resolve(download);
        }, function () {
          resolve(download);
        }).catch(reject);
      });
    }
  }, {
    key: 'uploadFile',
    value: function uploadFile(storage, file, fileName, dir, progressCallback, url) {
      var _this5 = this;

      var requestArgs = {
        provider: storage,
        method: 'upload',
        file: file,
        fileName: fileName,
        dir: dir
      };
      var request = Formio.pluginWait('preRequest', requestArgs).then(function () {
        return Formio.pluginGet('fileRequest', requestArgs).then(function (result) {
          if (storage && isNil(result)) {
            if (Formio.providers.storage.hasOwnProperty(storage)) {
              var provider = new Formio.providers.storage[storage](_this5);
              return provider.uploadFile(file, fileName, dir, progressCallback, url);
            } else {
              throw 'Storage provider not found';
            }
          }
          return result || { url: '' };
        });
      });

      return Formio.pluginAlter('wrapFileRequestPromise', request, requestArgs);
    }
  }, {
    key: 'downloadFile',
    value: function downloadFile(file) {
      var _this6 = this;

      var requestArgs = {
        method: 'download',
        file: file
      };

      var request = Formio.pluginWait('preRequest', requestArgs).then(function () {
        return Formio.pluginGet('fileRequest', requestArgs).then(function (result) {
          if (file.storage && isNil(result)) {
            if (Formio.providers.storage.hasOwnProperty(file.storage)) {
              var provider = new Formio.providers.storage[file.storage](_this6);
              return provider.downloadFile(file);
            } else {
              throw 'Storage provider not found';
            }
          }
          return result || { url: '' };
        });
      });

      return Formio.pluginAlter('wrapFileRequestPromise', request, requestArgs);
    }

    // Determine if the user can submit the form.

  }, {
    key: 'canSubmit',
    value: function canSubmit() {
      return _nativePromiseOnly2.default.all([this.loadForm(), this.currentUser(), this.accessInfo()]).then(function (results) {
        var form = results.shift();
        var user = results.shift();
        var access = results.shift();

        // Get the anonymous and admin roles.
        var anonRole = {};
        var adminRole = {};
        for (var roleName in access.roles) {
          if (access.roles.hasOwnProperty(roleName)) {
            var role = access.roles[roleName];
            if (role.default) {
              anonRole = role;
            }
            if (role.admin) {
              adminRole = role;
            }
          }
        }

        var canSubmit = false;
        var canSubmitAnonymously = false;

        // If the user is an admin, then they can submit this form.
        if (user && user.roles.indexOf(adminRole._id) !== -1) {
          return true;
        }

        for (var i in form.submissionAccess) {
          if (form.submissionAccess.hasOwnProperty(i)) {
            var subRole = form.submissionAccess[i];
            if (subRole.type === 'create_all' || subRole.type === 'create_own') {
              for (var j in subRole.roles) {
                if (subRole.roles.hasOwnProperty(j)) {
                  // Check if anonymous is allowed.
                  if (anonRole._id === subRole.roles[j]) {
                    canSubmitAnonymously = true;
                  }
                  // Check if the logged in user has the appropriate role.
                  if (user && user.roles.indexOf(subRole.roles[j]) !== -1) {
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
    }
  }, {
    key: 'getUrlParts',
    value: function getUrlParts(url) {
      return Formio.getUrlParts(url, this);
    }
  }], [{
    key: 'loadProjects',
    value: function loadProjects(query, opts) {
      query = query || '';
      if (isObject(query)) {
        query = '?' + Formio.serialize(query.params);
      }
      return Formio.makeStaticRequest(Formio.baseUrl + '/project' + query, 'GET', null, opts);
    }
  }, {
    key: 'getUrlParts',
    value: function getUrlParts(url, formio) {
      var base = formio && formio.base ? formio.base : Formio.baseUrl;
      var regex = '^(http[s]?:\\/\\/)';
      if (base && url.indexOf(base) === 0) {
        regex += '(' + base.replace(/^http[s]?:\/\//, '') + ')';
      } else {
        regex += '([^/]+)';
      }
      regex += '($|\\/.*)';
      return url.match(new RegExp(regex));
    }
  }, {
    key: 'serialize',
    value: function serialize(obj) {
      var str = [];
      for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
          str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        }
      }
      return str.join('&');
    }
  }, {
    key: 'getRequestArgs',
    value: function getRequestArgs(formio, type, url, method, data, opts) {
      method = (method || 'GET').toUpperCase();
      if (!opts || !isObject(opts)) {
        opts = {};
      }

      var requestArgs = {
        url: url,
        method: method,
        data: data || null,
        opts: opts
      };

      if (type) {
        requestArgs.type = type;
      }

      if (formio) {
        requestArgs.formio = formio;
      }
      return requestArgs;
    }
  }, {
    key: 'makeStaticRequest',
    value: function makeStaticRequest(url, method, data, opts) {
      var requestArgs = Formio.getRequestArgs(null, '', url, method, data, opts);
      var request = Formio.pluginWait('preRequest', requestArgs).then(function () {
        return Formio.pluginGet('staticRequest', requestArgs).then(function (result) {
          if (isNil(result)) {
            return Formio.request(url, method, requestArgs.data, requestArgs.opts.header, requestArgs.opts);
          }
          return result;
        });
      });

      return Formio.pluginAlter('wrapStaticRequestPromise', request, requestArgs);
    }
  }, {
    key: 'makeRequest',
    value: function makeRequest(formio, type, url, method, data, opts) {
      if (!formio) {
        return Formio.makeStaticRequest(url, method, data, opts);
      }

      var requestArgs = Formio.getRequestArgs(formio, type, url, method, data, opts);
      var request = Formio.pluginWait('preRequest', requestArgs).then(function () {
        return Formio.pluginGet('request', requestArgs).then(function (result) {
          if (isNil(result)) {
            return Formio.request(url, method, requestArgs.data, requestArgs.opts.header, requestArgs.opts);
          }
          return result;
        });
      });

      return Formio.pluginAlter('wrapRequestPromise', request, requestArgs);
    }
  }, {
    key: 'request',
    value: function request(url, method, data, header, opts) {
      if (!url) {
        return _nativePromiseOnly2.default.reject('No url provided');
      }
      method = (method || 'GET').toUpperCase();

      // For reverse compatibility, if they provided the ignoreCache parameter,
      // then change it back to the options format where that is a parameter.
      if (isBoolean(opts)) {
        opts = { ignoreCache: opts };
      }
      if (!opts || !isObject(opts)) {
        opts = {};
      }

      // Generate a cachekey.
      var cacheKey = btoa(url);

      // Get the cached promise to save multiple loads.
      if (!opts.ignoreCache && method === 'GET' && Formio.cache.hasOwnProperty(cacheKey)) {
        return _nativePromiseOnly2.default.resolve(Formio.cache[cacheKey]);
      }

      // Set up and fetch request
      var headers = header || new Headers(opts.headers || {
        'Accept': 'application/json',
        'Content-type': 'application/json; charset=UTF-8'
      });
      var token = Formio.getToken();
      if (token && !opts.noToken) {
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

      // Allow plugins to alter the options.
      options = Formio.pluginAlter('requestOptions', options, url);

      var requestToken = options.headers.get('x-jwt-token');
      return fetch(url, options).then(function (response) {
        // Allow plugins to respond.
        response = Formio.pluginAlter('requestResponse', response, Formio);

        if (!response.ok) {
          if (response.status === 440) {
            Formio.setToken(null);
            Formio.events.emit('formio.sessionExpired', response.body);
          } else if (response.status === 401) {
            Formio.events.emit('formio.unauthorized', response.body);
          }
          // Parse and return the error as a rejected promise to reject this promise
          return (response.headers.get('content-type').indexOf('application/json') !== -1 ? response.json() : response.text()).then(function (error) {
            throw error;
          });
        }

        // Handle fetch results
        var token = response.headers.get('x-jwt-token');

        // In some strange cases, the fetch library will return an x-jwt-token without sending
        // one to the server. This has even been debugged on the server to verify that no token
        // was introduced with the request, but the response contains a token. This is an Invalid
        // case where we do not send an x-jwt-token and get one in return for any GET request.
        var tokenIntroduced = false;
        if (method === 'GET' && !requestToken && token && !(url.indexOf('token=') !== -1) && !(url.indexOf('x-jwt-token=') !== -1)) {
          console.warn('Token was introduced in request.');
          tokenIntroduced = true;
        }

        if (response.status >= 200 && response.status < 300 && token && token !== '' && !tokenIntroduced) {
          Formio.setToken(token);
        }
        // 204 is no content. Don't try to .json() it.
        if (response.status === 204) {
          return {};
        }

        var getResult = response.headers.get('content-type').indexOf('application/json') !== -1 ? response.json() : response.text();
        return getResult.then(function (result) {
          // Add some content-range metadata to the result here
          var range = response.headers.get('content-range');
          if (range && isObject(result)) {
            range = range.split('/');
            if (range[0] !== '*') {
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
          response.headers.forEach(function (item, key) {
            headers[key] = item;
          });

          // Return the result with the headers.
          return {
            result: result,
            headers: headers
          };
        });
      }).then(function (result) {
        if (opts.getHeaders) {
          return result;
        }

        var resultCopy = {};

        // Shallow copy result so modifications don't end up in cache
        if (Array.isArray(result)) {
          resultCopy = result.map(_shallowCopy2.default);
          resultCopy.skip = result.skip;
          resultCopy.limit = result.limit;
          resultCopy.serverCount = result.serverCount;
        } else {
          resultCopy = (0, _shallowCopy2.default)(result);
        }

        // Cache the response.
        if (method === 'GET') {
          Formio.cache[cacheKey] = resultCopy;
        }

        return resultCopy;
      }).catch(function (err) {
        if (err === 'Bad Token') {
          Formio.setToken(null);
          Formio.events.emit('formio.badToken', err);
        }
        if (err.message) {
          err.message = 'Could not connect to API server (' + err.message + ')';
          err.networkError = true;
        }
        // Propagate error so client can handle accordingly
        throw err;
      });
    }
  }, {
    key: 'setToken',
    value: function setToken(token) {
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
        } catch (err) {
          return _browserCookies2.default.erase('formioToken', { path: '/' });
        }
      }
      // iOS in private browse mode will throw an error but we can't detect ahead of time that we are in private mode.
      try {
        localStorage.setItem('formioToken', token);
      } catch (err) {
        _browserCookies2.default.set('formioToken', token, { path: '/' });
      }
      return Formio.currentUser(); // Run this so user is updated if null
    }
  }, {
    key: 'getToken',
    value: function getToken() {
      if (this.token) {
        return this.token;
      }
      try {
        this.token = localStorage.getItem('formioToken') || '';
        return this.token;
      } catch (e) {
        this.token = _browserCookies2.default.get('formioToken');
        return this.token;
      }
    }
  }, {
    key: 'setUser',
    value: function setUser(user) {
      if (!user) {
        this.setToken(null);
        // iOS in private browse mode will throw an error but we can't detect ahead of time that we are in private mode.
        try {
          return localStorage.removeItem('formioUser');
        } catch (err) {
          return _browserCookies2.default.erase('formioUser', { path: '/' });
        }
      }
      // iOS in private browse mode will throw an error but we can't detect ahead of time that we are in private mode.
      try {
        localStorage.setItem('formioUser', JSON.stringify(user));
      } catch (err) {
        _browserCookies2.default.set('formioUser', JSON.stringify(user), { path: '/' });
      }
    }
  }, {
    key: 'getUser',
    value: function getUser() {
      try {
        return JSON.parse(localStorage.getItem('formioUser') || null);
      } catch (e) {
        return JSON.parse(_browserCookies2.default.get('formioUser'));
      }
    }
  }, {
    key: 'setBaseUrl',
    value: function setBaseUrl(url) {
      Formio.baseUrl = url;
      if (!Formio.projectUrlSet) {
        Formio.projectUrl = url;
      }
    }
  }, {
    key: 'getBaseUrl',
    value: function getBaseUrl() {
      return Formio.baseUrl;
    }
  }, {
    key: 'setApiUrl',
    value: function setApiUrl(url) {
      return Formio.setBaseUrl(url);
    }
  }, {
    key: 'getApiUrl',
    value: function getApiUrl() {
      return Formio.getBaseUrl();
    }
  }, {
    key: 'setAppUrl',
    value: function setAppUrl(url) {
      console.warn('Formio.setAppUrl() is deprecated. Use Formio.setProjectUrl instead.');
      Formio.projectUrl = url;
      Formio.projectUrlSet = true;
    }
  }, {
    key: 'setProjectUrl',
    value: function setProjectUrl(url) {
      Formio.projectUrl = url;
      Formio.projectUrlSet = true;
    }
  }, {
    key: 'getAppUrl',
    value: function getAppUrl() {
      console.warn('Formio.getAppUrl() is deprecated. Use Formio.getProjectUrl instead.');
      return Formio.projectUrl;
    }
  }, {
    key: 'getProjectUrl',
    value: function getProjectUrl() {
      return Formio.projectUrl;
    }
  }, {
    key: 'clearCache',
    value: function clearCache() {
      Formio.cache = {};
    }
  }, {
    key: 'noop',
    value: function noop() {}
  }, {
    key: 'identity',
    value: function identity(value) {
      return value;
    }
  }, {
    key: 'deregisterPlugin',
    value: function deregisterPlugin(plugin) {
      var beforeLength = Formio.plugins.length;
      Formio.plugins = Formio.plugins.filter(function (p) {
        if (p !== plugin && p.__name !== plugin) {
          return true;
        }

        (p.deregister || Formio.noop).call(plugin, Formio);
        return false;
      });
      return beforeLength !== Formio.plugins.length;
    }
  }, {
    key: 'registerPlugin',
    value: function registerPlugin(plugin, name) {
      Formio.plugins.push(plugin);
      Formio.plugins.sort(function (a, b) {
        return (b.priority || 0) - (a.priority || 0);
      });
      plugin.__name = name;
      (plugin.init || Formio.noop).call(plugin, Formio);
    }
  }, {
    key: 'getPlugin',
    value: function getPlugin(name) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Formio.plugins[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var plugin = _step.value;

          if (plugin.__name === name) {
            return plugin;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return null;
    }
  }, {
    key: 'pluginWait',
    value: function pluginWait(pluginFn) {
      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      return _nativePromiseOnly2.default.all(Formio.plugins.map(function (plugin) {
        var _ref;

        return (_ref = plugin[pluginFn] || Formio.noop).call.apply(_ref, [plugin].concat(args));
      }));
    }
  }, {
    key: 'pluginGet',
    value: function pluginGet(pluginFn) {
      for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      var callPlugin = function callPlugin(index) {
        var _ref2;

        var plugin = Formio.plugins[index];

        if (!plugin) {
          return _nativePromiseOnly2.default.resolve(null);
        }

        return _nativePromiseOnly2.default.resolve((_ref2 = plugin[pluginFn] || Formio.noop).call.apply(_ref2, [plugin].concat(args))).then(function (result) {
          if (!isNil(result)) {
            return result;
          }

          return callPlugin(index + 1);
        });
      };
      return callPlugin(0);
    }
  }, {
    key: 'pluginAlter',
    value: function pluginAlter(pluginFn, value) {
      for (var _len4 = arguments.length, args = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
        args[_key4 - 2] = arguments[_key4];
      }

      return Formio.plugins.reduce(function (value, plugin) {
        return (plugin[pluginFn] || Formio.identity).apply(undefined, [value].concat(args));
      }, value);
    }
  }, {
    key: 'accessInfo',
    value: function accessInfo(formio) {
      var projectUrl = formio ? formio.projectUrl : Formio.projectUrl;
      return Formio.makeRequest(formio, 'accessInfo', projectUrl + '/access');
    }
  }, {
    key: 'currentUser',
    value: function currentUser(formio, options) {
      var projectUrl = formio ? formio.projectUrl : Formio.baseUrl;
      projectUrl += '/current';
      var user = this.getUser();
      if (user) {
        return Formio.pluginAlter('wrapStaticRequestPromise', _nativePromiseOnly2.default.resolve(user), {
          url: projectUrl,
          method: 'GET',
          options: options
        });
      }
      var token = Formio.getToken();
      if (!token) {
        return Formio.pluginAlter('wrapStaticRequestPromise', _nativePromiseOnly2.default.resolve(null), {
          url: projectUrl,
          method: 'GET',
          options: options
        });
      }
      return Formio.makeRequest(formio, 'currentUser', projectUrl, 'GET', null, options).then(function (response) {
        Formio.setUser(response);
        return response;
      });
    }
  }, {
    key: 'logout',
    value: function logout(formio) {
      Formio.setToken(null);
      Formio.setUser(null);
      Formio.clearCache();
      var projectUrl = formio ? formio.projectUrl : Formio.baseUrl;
      return Formio.makeRequest(formio, 'logout', projectUrl + '/logout');
    }

    /**
     * Attach an HTML form to Form.io.
     *
     * @param form
     * @param options
     * @param done
     */

  }, {
    key: 'form',
    value: function form(_form2, options, done) {
      // Fix the parameters.
      if (!done && typeof options === 'function') {
        done = options;
        options = {};
      }

      done = done || function () {
        for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
          args[_key5] = arguments[_key5];
        }

        return console.log(args);
      };
      options = options || {};

      // IF they provide a jquery object, then select the element.
      if (_form2.jquery) {
        _form2 = _form2[0];
      }
      if (!_form2) {
        return done('Invalid Form');
      }

      var getAction = function getAction() {
        return options.form || _form2.getAttribute('action');
      };

      /**
       * Returns the current submission object.
       * @returns {{data: {}}}
       */
      var getSubmission = function getSubmission() {
        var submission = { data: {} };

        var setValue = function setValue(path, value) {
          var isArray = path.substr(-2) === '[]';
          if (isArray) {
            path = path.replace('[]', '');
          }

          var paths = path.replace(/\[|\]\[/g, '.').replace(/\]$/g, '').split('.');
          var current = submission;

          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = paths.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var _ref3 = _step2.value;

              var _ref4 = _slicedToArray(_ref3, 2);

              var index = _ref4[0];
              var _path = _ref4[1];

              if (index !== paths.length - 1) {
                if (!current[_path]) {
                  current[_path] = {};
                }
                current = current[_path];
                continue;
              }

              if (isArray) {
                current[_path] = (current[_path] || []).concat(value);
              } else {
                current[_path] = value;
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        };

        // Get the form data from this form.
        var formData = new FormData(_form2);

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = formData[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var entry = _step3.value;

            setValue(entry[0], entry[1]);
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

        return submission;
      };

      // Submits the form.
      var submit = function submit(event) {
        if (event) {
          event.preventDefault();
        }
        var action = getAction();
        if (!action) {
          return;
        }
        new Formio(action).saveSubmission(getSubmission()).then(function (sub) {
          done(null, sub);
        }, done);
      };

      // Attach formio to the provided form.
      if (_form2.attachEvent) {
        _form2.attachEvent('submit', submit);
      } else {
        _form2.addEventListener('submit', submit);
      }

      return {
        submit: submit,
        getAction: getAction,
        getSubmission: getSubmission
      };
    }
  }, {
    key: 'fieldData',
    value: function fieldData(data, component) {
      if (!data) {
        return '';
      }
      if (!component || !component.key) {
        return data;
      }
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
      } else {
        // Convert old single field data in submissions to multiple
        if (component.multiple && !Array.isArray(data[component.key])) {
          data[component.key] = [data[component.key]];
        }
        return data[component.key];
      }
    }
  }]);

  return Formio;
}();

// Define all the static properties.


Formio.Headers = Headers;
Formio.baseUrl = 'https://api.form.io';
Formio.projectUrl = Formio.baseUrl;
Formio.projectUrlSet = false;
Formio.plugins = [];
Formio.cache = {};
Formio.providers = _providers2.default;
Formio.events = new _eventemitter.EventEmitter2({
  wildcard: false,
  maxListeners: 0
});

// Support ES5 require and globals.
module.exports = global.Formio = Formio;
exports.default = Formio;