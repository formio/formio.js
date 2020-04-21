"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.function.name");

require("core-js/modules/es.string.starts-with");

require("core-js/modules/web.dom-collections.for-each");

var _Formio = _interopRequireDefault(require("./Formio"));

var _utils = require("./utils/utils");

var _each2 = _interopRequireDefault(require("lodash/each"));

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _sinon = _interopRequireDefault(require("sinon"));

var _chance = _interopRequireDefault(require("chance"));

var _server = _interopRequireDefault(require("fetch-mock/es5/server"));

var _lodash = _interopRequireDefault(require("lodash"));

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chance = (0, _chance.default)();
var protocol = 'https';
var domain = 'localhost:3000';
var baseUrl = "".concat(protocol, "://api.").concat(domain);

_Formio.default.setBaseUrl(baseUrl);

_Formio.default.setToken(null);

_Formio.default.fetch = _server.default.fetchHandler;
var projectId = '59bbe2ec8c246100079191aa';
var formId = '59bbe2ec8c246100079191ab';
var submissionId = '59bbe2ec8c246100079191ac';
var actionId = '59bbe2ec8c246100079191ad';

var generateID = function generateID() {
  return chance.string({
    length: 24,
    pool: '0123456789abcdef'
  });
};

var runTests = function runTests(fn, options) {
  var tests = {};
  var noBefore = fn(tests);

  if (!noBefore) {
    beforeEach(function () {
      _Formio.default.setBaseUrl(baseUrl);

      _Formio.default.projectUrlSet = false;
      _Formio.default.projectUrl = 'https://api.form.io';
    });
  }

  (0, _each2.default)(tests, function (test, path) {
    it("Should initialize for ".concat(path), function (done) {
      if (typeof test === 'function') {
        test();
      } else {
        var formio = new _Formio.default(path, options);

        for (var param in test) {
          _powerAssert.default.equal(formio[param], test[param], "".concat(param, " is not equal. ").concat(formio[param], " == ").concat(test[param], "\n"));
        }
      }

      done();
    });
  });
};

describe('Formio.js Tests', function () {
  describe('Formio Constructor Tests', function () {
    runTests(function (tests) {
      tests["http://form.io/project/".concat(projectId, "/form/").concat(formId)] = {
        projectUrl: "http://form.io/project/".concat(projectId),
        projectsUrl: 'http://form.io/project',
        projectId: projectId,
        formsUrl: "http://form.io/project/".concat(projectId, "/form"),
        formUrl: "http://form.io/project/".concat(projectId, "/form/").concat(formId),
        formId: formId,
        actionsUrl: "http://form.io/project/".concat(projectId, "/form/").concat(formId, "/action"),
        actionUrl: '',
        actionId: '',
        submissionsUrl: "http://form.io/project/".concat(projectId, "/form/").concat(formId, "/submission"),
        submissionUrl: '',
        submissionId: '',
        query: ''
      };
      tests["http://form.io/form/".concat(formId)] = {
        projectUrl: 'http://form.io',
        projectsUrl: "".concat(baseUrl, "/project"),
        projectId: '',
        formsUrl: 'http://form.io/form',
        formUrl: "http://form.io/form/".concat(formId),
        formId: formId,
        actionsUrl: "http://form.io/form/".concat(formId, "/action"),
        actionUrl: '',
        actionId: '',
        submissionsUrl: "http://form.io/form/".concat(formId, "/submission"),
        submissionUrl: '',
        submissionId: '',
        query: ''
      };
      tests["http://form.io/form/".concat(formId, "/submission/").concat(submissionId)] = {
        projectUrl: 'http://form.io',
        projectsUrl: "".concat(baseUrl, "/project"),
        projectId: '',
        formsUrl: 'http://form.io/form',
        formUrl: "http://form.io/form/".concat(formId),
        formId: formId,
        actionsUrl: "http://form.io/form/".concat(formId, "/action"),
        actionUrl: '',
        actionId: '',
        submissionsUrl: "http://form.io/form/".concat(formId, "/submission"),
        submissionUrl: "http://form.io/form/".concat(formId, "/submission/").concat(submissionId),
        submissionId: submissionId,
        query: ''
      };
      tests["http://form.io/form/".concat(formId, "/action/").concat(actionId)] = {
        projectUrl: 'http://form.io',
        projectsUrl: "".concat(baseUrl, "/project"),
        projectId: '',
        formsUrl: 'http://form.io/form',
        formUrl: "http://form.io/form/".concat(formId),
        formId: formId,
        actionsUrl: "http://form.io/form/".concat(formId, "/action"),
        actionUrl: "http://form.io/form/".concat(formId, "/action/").concat(actionId),
        actionId: actionId,
        submissionsUrl: "http://form.io/form/".concat(formId, "/submission"),
        submissionUrl: '',
        submissionId: '',
        query: ''
      };
      tests["http://form.io/project/".concat(projectId, "/form/").concat(formId, "/action/").concat(actionId)] = {
        projectUrl: "http://form.io/project/".concat(projectId),
        projectsUrl: 'http://form.io/project',
        projectId: projectId,
        formsUrl: "http://form.io/project/".concat(projectId, "/form"),
        formUrl: "http://form.io/project/".concat(projectId, "/form/").concat(formId),
        formId: formId,
        actionsUrl: "http://form.io/project/".concat(projectId, "/form/").concat(formId, "/action"),
        actionUrl: "http://form.io/project/".concat(projectId, "/form/").concat(formId, "/action/").concat(actionId),
        actionId: actionId,
        submissionsUrl: "http://form.io/project/".concat(projectId, "/form/").concat(formId, "/submission"),
        submissionUrl: '',
        submissionId: '',
        query: ''
      };
      tests["http://api.form.io/project/".concat(projectId)] = {
        projectUrl: "http://api.form.io/project/".concat(projectId),
        projectsUrl: 'http://api.form.io/project',
        projectId: projectId,
        formsUrl: "http://api.form.io/project/".concat(projectId, "/form"),
        formUrl: '',
        formId: '',
        actionsUrl: "http://api.form.io/project/".concat(projectId, "/action"),
        actionUrl: '',
        actionId: '',
        submissionsUrl: "http://api.form.io/project/".concat(projectId, "/submission"),
        submissionUrl: '',
        submissionId: '',
        query: ''
      };
      tests["http://form.io/project/".concat(projectId, "/form/").concat(formId, "/submission/").concat(submissionId)] = {
        projectUrl: "http://form.io/project/".concat(projectId),
        projectsUrl: 'http://form.io/project',
        projectId: projectId,
        formsUrl: "http://form.io/project/".concat(projectId, "/form"),
        formUrl: "http://form.io/project/".concat(projectId, "/form/").concat(formId),
        formId: formId,
        actionsUrl: "http://form.io/project/".concat(projectId, "/form/").concat(formId, "/action"),
        actionUrl: '',
        actionId: '',
        submissionsUrl: "http://form.io/project/".concat(projectId, "/form/").concat(formId, "/submission"),
        submissionUrl: "http://form.io/project/".concat(projectId, "/form/").concat(formId, "/submission/").concat(submissionId),
        submissionId: submissionId,
        query: ''
      };
      tests["http://form.io/project/".concat(projectId, "/form/").concat(formId, "?test=hello&test2=there")] = {
        projectUrl: "http://form.io/project/".concat(projectId),
        projectsUrl: 'http://form.io/project',
        projectId: projectId,
        formsUrl: "http://form.io/project/".concat(projectId, "/form"),
        formUrl: "http://form.io/project/".concat(projectId, "/form/").concat(formId),
        formId: formId,
        actionsUrl: "http://form.io/project/".concat(projectId, "/form/").concat(formId, "/action"),
        actionUrl: '',
        actionId: '',
        submissionsUrl: "http://form.io/project/".concat(projectId, "/form/").concat(formId, "/submission"),
        submissionUrl: '',
        submissionId: '',
        query: '?test=hello&test2=there'
      };
      tests['http://project.form.io/user/login'] = {
        projectUrl: 'http://project.form.io',
        projectsUrl: "".concat(baseUrl, "/project"),
        projectId: 'project',
        formsUrl: 'http://project.form.io/form',
        formUrl: 'http://project.form.io/user/login',
        formId: 'user/login',
        actionsUrl: 'http://project.form.io/user/login/action',
        actionUrl: '',
        actionId: '',
        submissionsUrl: 'http://project.form.io/user/login/submission',
        submissionUrl: '',
        submissionId: '',
        query: ''
      };
      tests["http://project.form.io/user/login/submission/".concat(submissionId)] = {
        projectUrl: 'http://project.form.io',
        projectsUrl: "".concat(baseUrl, "/project"),
        projectId: 'project',
        formsUrl: 'http://project.form.io/form',
        formUrl: 'http://project.form.io/user/login',
        formId: 'user/login',
        actionsUrl: 'http://project.form.io/user/login/action',
        actionUrl: '',
        actionId: '',
        submissionsUrl: 'http://project.form.io/user/login/submission',
        submissionUrl: "http://project.form.io/user/login/submission/".concat(submissionId),
        submissionId: submissionId,
        query: ''
      };
      tests["http://project.form.io/user/login/action/".concat(actionId)] = {
        projectUrl: 'http://project.form.io',
        projectsUrl: "".concat(baseUrl, "/project"),
        projectId: 'project',
        formsUrl: 'http://project.form.io/form',
        formUrl: 'http://project.form.io/user/login',
        formId: 'user/login',
        actionsUrl: 'http://project.form.io/user/login/action',
        actionUrl: "http://project.form.io/user/login/action/".concat(actionId),
        actionId: actionId,
        submissionsUrl: 'http://project.form.io/user/login/submission',
        submissionUrl: '',
        submissionId: '',
        query: ''
      };
      tests["http://project.form.io/user/login/action/".concat(actionId, "?test=test2")] = {
        projectUrl: 'http://project.form.io',
        projectsUrl: "".concat(baseUrl, "/project"),
        projectId: 'project',
        formsUrl: 'http://project.form.io/form',
        formUrl: 'http://project.form.io/user/login',
        formId: 'user/login',
        actionsUrl: 'http://project.form.io/user/login/action',
        actionUrl: "http://project.form.io/user/login/action/".concat(actionId),
        actionId: actionId,
        submissionsUrl: 'http://project.form.io/user/login/submission',
        submissionUrl: '',
        submissionId: '',
        query: '?test=test2'
      };
      tests["http://project.form.io/user/loginform/action/".concat(actionId, "?test=test2")] = {
        projectUrl: 'http://project.form.io',
        projectsUrl: "".concat(baseUrl, "/project"),
        projectId: 'project',
        formsUrl: 'http://project.form.io/form',
        formUrl: 'http://project.form.io/user/loginform',
        formId: 'user/loginform',
        actionsUrl: 'http://project.form.io/user/loginform/action',
        actionUrl: "http://project.form.io/user/loginform/action/".concat(actionId),
        actionId: actionId,
        submissionsUrl: 'http://project.form.io/user/loginform/submission',
        submissionUrl: '',
        submissionId: '',
        query: '?test=test2'
      };
      tests['http://project.form.io/user/loginform/submission'] = {
        projectUrl: 'http://project.form.io',
        projectsUrl: "".concat(baseUrl, "/project"),
        projectId: 'project',
        formsUrl: 'http://project.form.io/form',
        formUrl: 'http://project.form.io/user/loginform',
        formId: 'user/loginform',
        actionsUrl: 'http://project.form.io/user/loginform/action',
        actionUrl: '',
        actionId: '',
        submissionsUrl: 'http://project.form.io/user/loginform/submission',
        submissionUrl: '',
        submissionId: '',
        query: ''
      };
      tests['http://project.form.io/user'] = {
        projectUrl: 'http://project.form.io',
        projectsUrl: "".concat(baseUrl, "/project"),
        projectId: 'project',
        formsUrl: 'http://project.form.io/form',
        formUrl: 'http://project.form.io/user',
        formId: 'user',
        actionsUrl: 'http://project.form.io/user/action',
        actionUrl: '',
        actionId: '',
        submissionsUrl: 'http://project.form.io/user/submission',
        submissionUrl: '',
        submissionId: '',
        query: ''
      };
      tests["http://project.form.io/user/actionform/submission/".concat(submissionId)] = {
        projectUrl: 'http://project.form.io',
        projectsUrl: "".concat(baseUrl, "/project"),
        projectId: 'project',
        formsUrl: 'http://project.form.io/form',
        formUrl: 'http://project.form.io/user/actionform',
        formId: 'user/actionform',
        actionsUrl: 'http://project.form.io/user/actionform/action',
        actionUrl: '',
        actionId: '',
        submissionsUrl: 'http://project.form.io/user/actionform/submission',
        submissionUrl: "http://project.form.io/user/actionform/submission/".concat(submissionId),
        submissionId: submissionId,
        query: ''
      };
      tests['http://project.form.io/user/actionform/?test=foo'] = {
        projectUrl: 'http://project.form.io',
        projectsUrl: "".concat(baseUrl, "/project"),
        projectId: 'project',
        formsUrl: 'http://project.form.io/form',
        formUrl: 'http://project.form.io/user/actionform',
        formId: 'user/actionform',
        actionsUrl: 'http://project.form.io/user/actionform/action',
        actionUrl: '',
        actionId: '',
        submissionsUrl: 'http://project.form.io/user/actionform/submission',
        submissionUrl: '',
        submissionId: '',
        query: '?test=foo'
      };
    });
  });
  describe('Localhost Constructor Tests', function () {
    var testBaseUrl = 'localhost:3000';
    var projectName = 'myproject';
    var projectUrl = "".concat(protocol, "://").concat(projectName, ".").concat(testBaseUrl);
    runTests(function (tests) {
      tests["".concat(projectUrl, "/user/actionform/?test=foo")] = {
        projectUrl: projectUrl,
        projectsUrl: "".concat(baseUrl, "/project"),
        projectId: projectName,
        formsUrl: "".concat(projectUrl, "/form"),
        formUrl: "".concat(projectUrl, "/user/actionform"),
        formId: 'user/actionform',
        actionsUrl: "".concat(projectUrl, "/user/actionform/action"),
        actionUrl: '',
        actionId: '',
        submissionsUrl: "".concat(projectUrl, "/user/actionform/submission"),
        submissionUrl: '',
        submissionId: '',
        query: '?test=foo'
      };
      tests["".concat(projectUrl, "/user")] = {
        projectUrl: projectUrl,
        projectsUrl: "".concat(baseUrl, "/project"),
        projectId: projectName,
        formsUrl: "".concat(projectUrl, "/form"),
        formUrl: "".concat(projectUrl, "/user"),
        formId: 'user',
        actionsUrl: "".concat(projectUrl, "/user/action"),
        actionUrl: '',
        actionId: '',
        submissionsUrl: "".concat(projectUrl, "/user/submission"),
        submissionUrl: '',
        submissionId: '',
        query: ''
      };
    }, {
      base: baseUrl
    });
  });
  describe('Subdomain Constructor Tests', function () {
    var testBaseUrl = 'foo.blah.form.io';
    var projectName = 'myproject';
    var projectUrl = "".concat(protocol, "://").concat(projectName, ".").concat(testBaseUrl);
    runTests(function (tests) {
      tests["".concat(projectUrl, "/user/actionform/?test=foo")] = {
        projectUrl: projectUrl,
        projectsUrl: "".concat(baseUrl, "/project"),
        projectId: projectName,
        formsUrl: "".concat(projectUrl, "/form"),
        formUrl: "".concat(projectUrl, "/user/actionform"),
        formId: 'user/actionform',
        actionsUrl: "".concat(projectUrl, "/user/actionform/action"),
        actionUrl: '',
        actionId: '',
        submissionsUrl: "".concat(projectUrl, "/user/actionform/submission"),
        submissionUrl: '',
        submissionId: '',
        query: '?test=foo'
      };
      tests["".concat(projectUrl, "/user")] = {
        projectUrl: projectUrl,
        projectsUrl: "".concat(baseUrl, "/project"),
        projectId: projectName,
        formsUrl: "".concat(projectUrl, "/form"),
        formUrl: "".concat(projectUrl, "/user"),
        formId: 'user',
        actionsUrl: "".concat(projectUrl, "/user/action"),
        actionUrl: '',
        actionId: '',
        submissionsUrl: "".concat(projectUrl, "/user/submission"),
        submissionUrl: '',
        submissionId: '',
        query: ''
      };
    }, {
      base: baseUrl
    });
  });
  describe('Subdirectory Constructor Tests', function () {
    var testBaseUrl = 'foo.blah.form.io';
    var projectName = 'myproject';
    var projectUrl = "".concat(protocol, "://").concat(testBaseUrl, "/").concat(projectName);
    runTests(function (tests) {
      tests["".concat(projectUrl, "/user/actionform/?test=foo")] = {
        projectUrl: projectUrl,
        projectsUrl: "".concat(protocol, "://").concat(testBaseUrl, "/project"),
        projectId: projectName,
        formsUrl: "".concat(projectUrl, "/form"),
        formUrl: "".concat(projectUrl, "/user/actionform"),
        formId: 'user/actionform',
        actionsUrl: "".concat(projectUrl, "/user/actionform/action"),
        actionUrl: '',
        actionId: '',
        submissionsUrl: "".concat(projectUrl, "/user/actionform/submission"),
        submissionUrl: '',
        submissionId: '',
        query: '?test=foo'
      };
      tests["".concat(projectUrl, "/user")] = {
        projectUrl: projectUrl,
        projectsUrl: "".concat(protocol, "://").concat(testBaseUrl, "/project"),
        projectId: projectName,
        formsUrl: "".concat(projectUrl, "/form"),
        formUrl: "".concat(projectUrl, "/user"),
        formId: 'user',
        actionsUrl: "".concat(projectUrl, "/user/action"),
        actionUrl: '',
        actionId: '',
        submissionsUrl: "".concat(projectUrl, "/user/submission"),
        submissionUrl: '',
        submissionId: '',
        query: ''
      };
      tests[projectUrl] = {
        projectUrl: projectUrl,
        projectsUrl: "".concat(protocol, "://").concat(testBaseUrl, "/project"),
        projectId: projectName,
        formsUrl: "".concat(projectUrl, "/form"),
        formUrl: '',
        formId: '',
        actionsUrl: "".concat(projectUrl, "/action"),
        actionUrl: '',
        actionId: '',
        submissionsUrl: "".concat(projectUrl, "/submission"),
        submissionUrl: '',
        submissionId: '',
        query: ''
      };
    }, {
      base: "".concat(protocol, "://").concat(testBaseUrl)
    });
  });
  describe('Simple Form Constructor Tests', function () {
    runTests(function (tests) {
      tests['init'] = function () {
        _Formio.default.setBaseUrl('https://api.form.io');

        _Formio.default.projectUrlSet = false;
        _Formio.default.projectUrl = 'https://api.form.io';
      };

      tests['https://examples.form.io/example'] = {
        projectUrl: 'https://examples.form.io',
        projectsUrl: '',
        projectId: '',
        formsUrl: 'https://examples.form.io/form',
        formUrl: 'https://examples.form.io/example',
        formId: 'example',
        actionsUrl: 'https://examples.form.io/example/action',
        actionUrl: '',
        actionId: '',
        submissionsUrl: 'https://examples.form.io/example/submission',
        submissionUrl: '',
        submissionId: '',
        query: ''
      };
      return true;
    });
  });
  describe('Open Source Constructor Tests', function () {
    var formBaseUrl = 'http://localhost:3000';
    runTests(function (tests) {
      tests["".concat(formBaseUrl, "/user")] = {
        projectUrl: formBaseUrl,
        projectsUrl: '',
        projectId: '',
        formsUrl: "".concat(formBaseUrl, "/form"),
        formUrl: "".concat(formBaseUrl, "/user"),
        formId: 'user',
        actionsUrl: "".concat(formBaseUrl, "/user/action"),
        actionUrl: '',
        actionId: '',
        submissionsUrl: "".concat(formBaseUrl, "/user/submission"),
        submissionUrl: '',
        submissionId: '',
        query: ''
      };
      tests["".concat(formBaseUrl, "/user/actionform/?test=foo")] = {
        projectUrl: formBaseUrl,
        projectsUrl: '',
        projectId: '',
        formsUrl: "".concat(formBaseUrl, "/form"),
        formUrl: "".concat(formBaseUrl, "/user/actionform"),
        formId: 'user/actionform',
        actionsUrl: "".concat(formBaseUrl, "/user/actionform/action"),
        actionUrl: '',
        actionId: '',
        submissionsUrl: "".concat(formBaseUrl, "/user/actionform/submission"),
        submissionUrl: '',
        submissionId: '',
        query: '?test=foo'
      };
    }, {
      base: formBaseUrl,
      project: formBaseUrl
    });
  });
  describe('Plugins', function () {
    var plugin = null;
    beforeEach(function () {
      _powerAssert.default.equal(_Formio.default.getPlugin('test-plugin'), undefined, 'No plugin may be returned under the name `test-plugin`');

      plugin = {
        init: _sinon.default.spy()
      };

      _Formio.default.registerPlugin(plugin, 'test-plugin');

      _powerAssert.default.ok(plugin.init.calledOnce, 'plugin.init must be called exactly once');

      _powerAssert.default.ok(plugin.init.calledOn(plugin), 'plugin.init must be called on plugin as `this`');

      _powerAssert.default.ok(plugin.init.calledWithExactly(_Formio.default), 'plugin.init must be given Formio as argument');

      _powerAssert.default.equal(_Formio.default.getPlugin('test-plugin'), plugin, 'getPlugin must return plugin');
    });
    afterEach(function () {
      _powerAssert.default.equal(_Formio.default.getPlugin('test-plugin'), plugin, 'getPlugin must return plugin');

      plugin.deregister = _sinon.default.spy();

      _Formio.default.deregisterPlugin(plugin, 'test-plugin');

      _powerAssert.default.ok(plugin.deregister.calledOnce, 'plugin.deregister must be called exactly once');

      _powerAssert.default.ok(plugin.deregister.calledOn(plugin), 'plugin.deregister must be called on plugin as `this`');

      _powerAssert.default.ok(plugin.deregister.calledWithExactly(_Formio.default), 'plugin.deregister must be given Formio as argument');

      _powerAssert.default.equal(_Formio.default.getPlugin('test-plugin'), undefined, 'No plugin may be returned under the name `test-plugin`');
    }); // Test a request to see if the plugin flow order is correct

    var testRequest = function testRequest(url, method, type) {
      var fnName;

      switch (method) {
        case 'GET':
          fnName = "load".concat(_lodash.default.capitalize(type));
          break;

        case 'POST':
        case 'PUT':
          fnName = "save".concat(_lodash.default.capitalize(type));
          break;

        case 'DELETE':
          fnName = "delete".concat(_lodash.default.capitalize(type));
          break;
      }

      it("Plugin ".concat(method, " ").concat(fnName), function (done) {
        var step = 0;
        var formio = new _Formio.default(url);
        method = method.toUpperCase();
        var testData = {
          testRequest: 'TEST_REQUEST'
        };
        var testOpts = {
          testOption: true
        };
        var testResult = {
          _id: 'TEST_ID',
          testResult: 'TEST_RESULT'
        };
        var expectedArgs = {
          formio: formio,
          type: type,
          method: method,
          url: formio[type + (method === 'POST' ? 'sUrl' : 'Url')],
          data: _lodash.default.startsWith(fnName, 'save') ? testData : null,
          opts: testOpts
        }; // Set up plugin hooks

        plugin.preRequest = function (requestArgs) {
          _powerAssert.default.equal(++step, 1, 'preRequest hook should be called first');

          _powerAssert.default.deepEqual(requestArgs, expectedArgs, 'Request hook arguments match expected arguments');

          return _nativePromiseOnly.default.resolve().then(function () {
            _powerAssert.default.equal(++step, 3, 'preRequest promise should resolve third'); // TODO

          });
        };

        plugin.request = function (requestArgs) {
          _powerAssert.default.equal(++step, 4, 'request hook should be called fourth');

          _powerAssert.default.deepEqual(requestArgs, expectedArgs, 'Request hook arguments match expected arguments');

          return _nativePromiseOnly.default.resolve().then(function () {
            _powerAssert.default.equal(++step, 5, 'request promise should resolve fifth');

            return testResult;
          });
        };

        plugin.wrapRequestPromise = function (promise, requestArgs) {
          _powerAssert.default.equal(++step, 2, 'wrapRequestPromise hook should be called second');

          _powerAssert.default.deepEqual(requestArgs, expectedArgs, 'Request hook arguments match expected arguments');

          return promise.then(function (result) {
            _powerAssert.default.equal(++step, 6, 'wrapRequestPromise post-result promise should resolve sixth');

            _powerAssert.default.deepEqual(result, testResult, 'Result should match result from request hook');

            return result;
          });
        };

        var promise;

        if (_lodash.default.startsWith(fnName, 'save')) {
          promise = formio[fnName](testData, testOpts);
        } else if (_lodash.default.startsWith(fnName, 'load')) {
          promise = formio[fnName](null, testOpts);
        } else {
          promise = formio[fnName](testOpts);
        }

        promise.then(function (result) {
          _powerAssert.default.equal(++step, 7, 'post request promise should resolve last');

          _powerAssert.default.deepEqual(result, testResult, 'Result should match result from request hook');

          done();
        });
      });
    };

    var tests = [{
      url: 'https://api.localhost:3000/project/myproject',
      method: 'GET',
      type: 'project'
    }, {
      url: '',
      method: 'POST',
      type: 'project'
    }, {
      url: 'https://api.localhost:3000/project/myproject',
      method: 'PUT',
      type: 'project'
    }, {
      url: 'https://api.localhost:3000/project/myproject',
      method: 'DELETE',
      type: 'project'
    }, {
      url: 'https://api.localhost:3000/project/myproject/form/0123456789ABCDEF01234567',
      method: 'GET',
      type: 'form'
    }, {
      url: 'https://api.localhost:3000/project/myproject',
      method: 'POST',
      type: 'form'
    }, {
      url: 'https://api.localhost:3000/project/myproject/form/0123456789ABCDEF01234567',
      method: 'PUT',
      type: 'form'
    }, {
      url: 'https://api.localhost:3000/project/myproject/form/0123456789ABCDEF01234567',
      method: 'DELETE',
      type: 'form'
    }, {
      url: 'https://api.localhost:3000/project/myproject/',
      method: 'GET',
      type: 'forms'
    }, {
      url: 'https://api.localhost:3000/project/myproject/form/0123456789ABCDEF01234567/submission/76543210FEDCBA9876543210',
      method: 'GET',
      type: 'submission'
    }, {
      url: 'https://api.localhost:3000/project/myproject/form/0123456789ABCDEF01234567',
      method: 'POST',
      type: 'submission'
    }, {
      url: 'https://api.localhost:3000/project/myproject/form/0123456789ABCDEF01234567/submission/76543210FEDCBA9876543210',
      method: 'PUT',
      type: 'submission'
    }, {
      url: 'https://api.localhost:3000/project/myproject/form/0123456789ABCDEF01234567/submission/76543210FEDCBA9876543210',
      method: 'DELETE',
      type: 'submission'
    }, {
      url: 'https://api.localhost:3000/project/myproject/form/0123456789ABCDEF01234567',
      method: 'GET',
      type: 'submissions'
    }, {
      url: 'https://api.localhost:3000/project/myproject/form/0123456789ABCDEF01234567/action/76543210FEDCBA9876543210',
      method: 'GET',
      type: 'action'
    }, {
      url: 'https://api.localhost:3000/project/myproject/form/0123456789ABCDEF01234567',
      method: 'POST',
      type: 'action'
    }, {
      url: 'https://api.localhost:3000/project/myproject/form/0123456789ABCDEF01234567/action/76543210FEDCBA9876543210',
      method: 'PUT',
      type: 'action'
    }, {
      url: 'https://api.localhost:3000/project/myproject/form/0123456789ABCDEF01234567/action/76543210FEDCBA9876543210',
      method: 'DELETE',
      type: 'action'
    }, {
      url: 'https://api.localhost:3000/project/myproject/form/0123456789ABCDEF01234567',
      method: 'GET',
      type: 'actions'
    }];
    tests.forEach(function (test) {
      testRequest(test.url, test.method, test.type);
    });

    var testStaticRequest = function testStaticRequest(fnName, url, method) {
      it("Plugin ".concat(fnName), function (done) {
        var step = 0;
        var testResult = {
          _id: 'TEST_ID',
          testResult: 'TEST_RESULT'
        };
        var expectedArgs = {
          url: url,
          method: method,
          data: null,
          opts: {}
        }; // Set up plugin hooks

        plugin.preRequest = function (requestArgs) {
          _powerAssert.default.equal(++step, 1, 'preRequest hook should be called first');

          _powerAssert.default.deepEqual(requestArgs, expectedArgs, 'Request hook arguments match expected arguments');

          return _nativePromiseOnly.default.resolve().then(function () {
            _powerAssert.default.equal(++step, 3, 'preRequest promise should resolve third'); // TODO

          });
        };

        plugin.staticRequest = function (requestArgs) {
          _powerAssert.default.equal(++step, 4, 'request hook should be called fourth');

          _powerAssert.default.deepEqual(requestArgs, expectedArgs, 'Request hook arguments match expected arguments');

          return _nativePromiseOnly.default.resolve().then(function () {
            _powerAssert.default.equal(++step, 5, 'request promise should resolve fifth');

            return testResult;
          });
        };

        plugin.wrapStaticRequestPromise = function (promise, requestArgs) {
          _powerAssert.default.equal(++step, 2, 'wrapRequestPromise hook should be called second');

          _powerAssert.default.deepEqual(requestArgs, expectedArgs, 'Request hook arguments match expected arguments');

          return promise.then(function (result) {
            _powerAssert.default.equal(++step, 6, 'wrapRequestPromise post-result promise should resolve sixth');

            _powerAssert.default.deepEqual(result, testResult, 'Result should match result from request hook');

            return result;
          });
        };

        _Formio.default[fnName]().then(function (result) {
          _powerAssert.default.equal(++step, 7, 'post request promise should resolve last');

          _powerAssert.default.deepEqual(result, testResult, 'Result should match result from request hook');

          done();
        });
      });
    };

    var staticTests = [{
      fnName: 'loadProjects',
      url: 'https://api.localhost:3000/project',
      method: 'GET'
    }, {
      fnName: 'logout',
      url: 'https://api.localhost:3000/logout',
      method: 'GET'
    }];
    staticTests.forEach(function (test) {
      testStaticRequest(test.fnName, test.url, test.method, test.type);
    });

    var testFileRequest = function testFileRequest(fnName, formUrl, args) {
      it("Plugin ".concat(fnName), function (done) {
        var step = 0;
        var testResult = {
          _id: 'TEST_ID',
          testResult: 'TEST_RESULT'
        };
        var expectedArgs;

        if (fnName === 'downloadFile') {
          expectedArgs = {
            method: 'download',
            file: args[0]
          };
        } else if (fnName === 'uploadFile') {
          expectedArgs = {
            provider: args[0],
            method: 'upload',
            file: args[1],
            fileName: args[2],
            dir: args[3]
          };
        } // Set up plugin hooks


        plugin.preRequest = function (requestArgs) {
          _powerAssert.default.equal(++step, 1, 'preRequest hook should be called first');

          _powerAssert.default.deepEqual(requestArgs, expectedArgs, 'Request hook arguments match expected arguments');

          return _nativePromiseOnly.default.resolve().then(function () {
            _powerAssert.default.equal(++step, 3, 'preRequest promise should resolve third'); // TODO

          });
        };

        plugin.fileRequest = function (requestArgs) {
          _powerAssert.default.equal(++step, 4, 'request hook should be called fourth');

          _powerAssert.default.deepEqual(requestArgs, expectedArgs, 'Request hook arguments match expected arguments');

          return _nativePromiseOnly.default.resolve().then(function () {
            _powerAssert.default.equal(++step, 5, 'request promise should resolve fifth');

            return testResult;
          });
        };

        plugin.wrapFileRequestPromise = function (promise, requestArgs) {
          _powerAssert.default.equal(++step, 2, 'wrapFileRequestPromise hook should be called second');

          _powerAssert.default.deepEqual(requestArgs, expectedArgs, 'Request hook arguments match expected arguments');

          return promise.then(function (result) {
            _powerAssert.default.equal(++step, 6, 'wrapFileRequestPromise post-result promise should resolve sixth');

            _powerAssert.default.deepEqual(result, testResult, 'Result should match result from request hook');

            return result;
          });
        };

        var formio = new _Formio.default(formUrl);
        formio[fnName].apply(null, args).then(function (result) {
          _powerAssert.default.equal(++step, 7, 'post request promise should resolve last');

          _powerAssert.default.deepEqual(result, testResult, 'Result should match result from request hook');

          done();
        });
      });
    };

    var fileTests = [{
      fnName: 'uploadFile',
      formUrl: 'https://api.localhost:3000/project/123/form/123',
      args: ['s3', 'FILE', 'file.jpg', 'dir/']
    }, {
      fnName: 'uploadFile',
      formUrl: 'https://api.localhost:3000/project/123/form/123',
      args: ['dropbox', 'FILE', 'file.jpg', 'dir/']
    }, {
      fnName: 'downloadFile',
      formUrl: 'https://api.localhost:3000/project/123/form/123',
      args: [{
        storage: 's3',
        name: 'test'
      }]
    }, {
      fnName: 'downloadFile',
      formUrl: 'https://api.localhost:3000/project/123/form/123',
      args: [{
        storage: 'dropbox',
        name: 'test'
      }]
    }];
    fileTests.forEach(function (test) {
      testFileRequest(test.fnName, test.formUrl, test.args);
    });
  });
  describe('Test Formio.js capabilities', function () {
    var testCapability = function testCapability(test) {
      it(test.name, function (done) {
        // need to clear Formio cache before every test, otherwise mock results might be ignored for same URLs
        _Formio.default.clearCache();

        if (test.mock) {
          var mock = test.mock();

          if (mock instanceof Array) {
            _lodash.default.each(mock, function (_mock) {
              _server.default.mock(_mock.url, _mock.response, {
                method: _mock.method
              });
            });
          } else {
            _server.default.mock(mock.url, mock.response, {
              method: mock.method
            });
          }
        }

        _nativePromiseOnly.default.resolve().then(function () {
          return test.test();
        }).then(function () {
          if (test.mock) {
            _server.default.restore();
          }

          done();
        }).catch(function (err) {
          if (test.mock) {
            _server.default.restore();
          }

          done(typeof err === 'string' ? new Error(err) : err);
        });
      });
    };

    var user;
    var userPassword;
    var userToken = chance.string({
      length: 450
    });
    var userFormId = generateID();
    var project;
    var form;
    var submission;
    var tests = [{
      name: 'Registering user.',
      test: function test() {
        var req = {
          data: {
            'user.name': chance.string({
              length: 10,
              pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
            }),
            'user.email': chance.email(),
            'user.password': chance.string({
              length: 12
            })
          }
        };

        _Formio.default.setProjectUrl(_Formio.default.getBaseUrl());

        var formio = new _Formio.default("".concat(_Formio.default.getBaseUrl(), "/user/register"));
        return formio.saveSubmission(req).then(function (response) {
          _powerAssert.default.deepEqual(response, user, 'saveSubmission response should match test user');

          _powerAssert.default.equal(_Formio.default.getToken(), userToken, 'Formio should save the user token');
        });
      },
      mock: function mock() {
        return [{
          url: "".concat(_Formio.default.getBaseUrl(), "/current"),
          method: 'GET',
          response: function response() {
            return {
              headers: {
                'Content-Type': 'application/json',
                'x-jwt-token': userToken
              },
              body: user
            };
          }
        }, {
          url: "".concat(_Formio.default.getBaseUrl(), "/user/register/submission"),
          method: 'POST',
          response: function response(url, opts) {
            var body = JSON.parse(opts.body);
            var userId = generateID();
            user = {
              _id: userId,
              created: new Date().toISOString(),
              modified: new Date().toISOString(),
              data: {
                email: body.data['user.email'],
                name: body.data['user.name']
              },
              externalIds: [],
              externalTokens: [],
              form: userFormId,
              owner: userId
            };
            userPassword = body.data['user.password'];
            return {
              headers: {
                'Content-Type': 'application/json',
                'x-jwt-token': userToken
              },
              body: user
            };
          }
        }];
      }
    }, {
      name: 'Logging in.',
      test: function test() {
        var req = {
          data: {
            'user.email': user.data.email,
            'user.password': userPassword
          }
        };
        var formio = new _Formio.default("".concat(_Formio.default.getBaseUrl(), "/user/login"));
        return formio.saveSubmission(req).then(function (response) {
          _powerAssert.default.deepEqual(response, user, 'saveSubmission response should match test user');

          _powerAssert.default.equal(_Formio.default.getToken(), userToken, 'Formio should save the user token');
        });
      },
      mock: function mock() {
        return {
          url: "".concat(_Formio.default.getBaseUrl(), "/user/login/submission"),
          method: 'POST',
          response: function response(url, opts) {
            var body = JSON.parse(opts.body);
            userToken = chance.string({
              length: 450
            });

            _powerAssert.default.equal(body.data['user.email'], user.data.email, 'Login email must be correct.');

            _powerAssert.default.equal(body.data['user.password'], userPassword, 'Login password must be correct.');

            return {
              headers: {
                'Content-Type': 'application/json',
                'x-jwt-token': userToken
              },
              body: user
            };
          }
        };
      }
    }, {
      name: 'Current user.',
      test: function test() {
        return _Formio.default.currentUser().then(function (response) {
          _powerAssert.default.deepEqual(response, user, 'currentUser response should match test user');

          return _Formio.default.currentUser();
        }).then(function (response) {
          _powerAssert.default.deepEqual(response, user, 'currentUser response should match test user');
        });
      },
      mock: function mock() {
        var called = false;
        return {
          url: "".concat(_Formio.default.getBaseUrl(), "/current"),
          method: 'GET',
          response: function response() {
            _powerAssert.default.ok(!called, 'User should be requested only once.');

            called = true;
            return {
              headers: {
                'Content-Type': 'application/json',
                'x-jwt-token': userToken
              },
              body: user
            };
          }
        };
      }
    }, {
      name: 'Create Project',
      test: function test() {
        var formio = new _Formio.default();
        var req = {
          title: chance.string({
            length: 10,
            pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
          }),
          name: chance.string({
            length: 10,
            pool: 'abcdefghijklmnopqrstuvwxyz'
          }),
          description: chance.paragraph({
            sentences: 1
          }),
          settings: {
            cors: '*'
          },
          template: 'http://help.form.io/templates/empty.json'
        };
        return formio.saveProject(req).then(function (response) {
          _powerAssert.default.deepEqual(response, project, 'saveProject response should match test user');
        });
      },
      mock: function mock() {
        return {
          url: "".concat(_Formio.default.getBaseUrl(), "/project"),
          method: 'POST',
          response: function response(url, opts) {
            var body = JSON.parse(opts.body);
            var projectId = generateID();
            project = {
              _id: projectId,
              created: new Date().toISOString(),
              modified: new Date().toISOString(),
              apiCalls: {
                used: 0,
                limit: 1000,
                remaining: 1000,
                reset: new Date(Date.now() + 2.628e9).toISOString() // ~1 month later

              },
              access: [],
              title: body.title,
              name: body.name,
              description: body.description,
              plan: 'basic',
              owner: user._id
            };
            return {
              headers: {
                'Content-Type': 'application/json',
                'x-jwt-token': userToken
              },
              body: project
            };
          }
        };
      }
    }, {
      name: 'Getting Projects',
      test: function test() {
        return _Formio.default.loadProjects().then(function (projects) {
          _powerAssert.default.equal(projects.length, 1, 'Should return only one project.');

          _powerAssert.default.equal(projects.skip, 0, 'skip should be 0.');

          _powerAssert.default.equal(projects.limit, 1, 'limit should be 1.');

          _powerAssert.default.equal(projects.serverCount, 1, 'serverCount should be 1.');

          _powerAssert.default.deepEqual(projects[0], project, 'Should match project');
        });
      },
      mock: function mock() {
        return {
          url: "".concat(_Formio.default.getBaseUrl(), "/project"),
          method: 'GET',
          response: function response() {
            return {
              headers: {
                'Content-Type': 'application/json',
                'Content-Range': '0-0/1',
                'Range-Unit': 'items',
                'x-jwt-token': userToken
              },
              body: [project]
            };
          }
        };
      }
    }, {
      name: 'Read Project',
      test: function test() {
        var formio = new _Formio.default("".concat(_Formio.default.getBaseUrl(), "/project/").concat(project._id));
        return formio.loadProject().then(function (response) {
          _powerAssert.default.deepEqual(response, project, 'Should match project');
        });
      },
      mock: function mock() {
        return {
          url: "".concat(_Formio.default.getBaseUrl(), "/project/").concat(project._id),
          method: 'GET',
          response: function response() {
            return {
              headers: {
                'Content-Type': 'application/json',
                'x-jwt-token': userToken
              },
              body: project
            };
          }
        };
      }
    }, {
      name: 'Update Project',
      test: function test() {
        var formio = new _Formio.default("/project/".concat(project._id));
        var newProject = (0, _utils.fastCloneDeep)(project);
        newProject.name = chance.string({
          length: 10,
          pool: 'abcdefghijklmnopqrstuvwxyz'
        });
        newProject.title = chance.string({
          length: 10,
          pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        });
        newProject.description = chance.paragraph({
          sentences: 1
        });
        return formio.saveProject(newProject).then(function (response) {
          _powerAssert.default.deepEqual(response, project, 'Project should match');
        });
      },
      mock: function mock() {
        return {
          url: "".concat(_Formio.default.getBaseUrl(), "/project/").concat(project._id),
          method: 'PUT',
          response: function response(url, opts) {
            var body = JSON.parse(opts.body);
            project = body;
            return {
              headers: {
                'Content-Type': 'application/json',
                'x-jwt-token': userToken
              },
              body: project
            };
          }
        };
      }
    }, {
      name: 'Create Form',
      test: function test() {
        var formio = new _Formio.default("/project/".concat(project._id, "/form"));
        var req = {
          title: chance.string({
            length: 10,
            pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
          }),
          name: chance.string({
            length: 10,
            pool: 'abcdefghijklmnopqrstuvwxyz'
          }),
          path: chance.string({
            length: 10,
            pool: 'abcdefghijklmnopqrstuvwxyz'
          }),
          components: [{
            defaultValue: '',
            input: true,
            inputMask: '',
            inputType: 'text',
            isNew: false,
            key: 'fieldLabel',
            label: 'Field Label',
            multiple: false,
            persistent: true,
            placeholder: '',
            prefix: '',
            protected: false,
            suffix: '',
            tableView: true,
            type: 'textfield',
            unique: false,
            validate: {
              required: false,
              minLength: '',
              maxLength: '',
              pattern: '',
              custom: '',
              customPrivate: false
            }
          }, {
            action: 'submit',
            block: false,
            disableOnInvalid: true,
            input: true,
            key: 'submit',
            label: 'Submit',
            leftIcon: '',
            rightIcon: '',
            size: 'md',
            tableView: false,
            theme: 'primary',
            type: 'button'
          }],
          type: 'form',
          access: [],
          submissionAccess: []
        };
        return formio.saveForm(req).then(function (response) {
          _powerAssert.default.deepEqual(response, form, 'Form should match');
        });
      },
      mock: function mock() {
        return {
          url: "".concat(_Formio.default.getBaseUrl(), "/project/").concat(project._id, "/form"),
          method: 'POST',
          response: function response(url, opts) {
            var body = JSON.parse(opts.body);
            var formId = generateID();
            form = (0, _utils.fastCloneDeep)(body);

            _lodash.default.assign(form, {
              _id: formId,
              created: new Date().toISOString(),
              modified: new Date().toISOString(),
              project: project._id,
              owner: user._id
            });

            return {
              headers: {
                'Content-Type': 'application/json',
                'x-jwt-token': userToken
              },
              body: form
            };
          }
        };
      }
    }, {
      name: 'Load Forms',
      test: function test() {
        var formio = new _Formio.default("/project/".concat(project._id, "/form"));
        return formio.loadForms().then(function (forms) {
          _powerAssert.default.equal(forms.length, 1, 'Should return only one form.');

          _powerAssert.default.equal(forms.skip, 0, 'skip should be 0.');

          _powerAssert.default.equal(forms.limit, 1, 'limit should be 1.');

          _powerAssert.default.equal(forms.serverCount, 1, 'serverCount should be 1.');

          _powerAssert.default.deepEqual(forms[0], form, 'Should match form');
        });
      },
      mock: function mock() {
        return {
          url: "".concat(_Formio.default.getBaseUrl(), "/project/").concat(project._id, "/form"),
          method: 'GET',
          response: function response() {
            return {
              headers: {
                'Content-Type': 'application/json',
                'Content-Range': '0-0/1',
                'Range-Unit': 'items',
                'x-jwt-token': userToken
              },
              body: [form]
            };
          }
        };
      }
    }, {
      name: 'Read Form',
      test: function test() {
        var formio = new _Formio.default("/project/".concat(project._id, "/form/").concat(form._id));
        return formio.loadForm().then(function (response) {
          _powerAssert.default.deepEqual(response, form, 'Form should match');
        });
      },
      mock: function mock() {
        return {
          url: "".concat(_Formio.default.getBaseUrl(), "/project/").concat(project._id, "/form/").concat(form._id),
          method: 'GET',
          response: function response() {
            return {
              headers: {
                'Content-Type': 'application/json',
                'x-jwt-token': userToken
              },
              body: form
            };
          }
        };
      }
    }, {
      name: 'Update Form',
      test: function test() {
        var formio = new _Formio.default("/project/".concat(project._id, "/form/").concat(form._id));
        var newForm = (0, _utils.fastCloneDeep)(form);
        newForm.title = chance.string({
          length: 10,
          pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        });
        newForm.name = chance.string({
          length: 10,
          pool: 'abcdefghijklmnopqrstuvwxyz'
        });
        newForm.path = chance.string({
          length: 10,
          pool: 'abcdefghijklmnopqrstuvwxyz'
        });
        return formio.saveForm(newForm).then(function (response) {
          _powerAssert.default.deepEqual(response, form, 'Form should match');
        });
      },
      mock: function mock() {
        return {
          url: "".concat(_Formio.default.getBaseUrl(), "/project/").concat(project._id, "/form/").concat(form._id),
          method: 'PUT',
          response: function response(url, opts) {
            var body = JSON.parse(opts.body);
            form = body;
            return {
              headers: {
                'Content-Type': 'application/json',
                'x-jwt-token': userToken
              },
              body: form
            };
          }
        };
      }
    }, {
      name: 'Create Submission',
      test: function test() {
        var formio = new _Formio.default("/project/".concat(project._id, "/form/").concat(form._id, "/submission"));
        var req = {
          data: {
            fieldLabel: chance.string()
          }
        };
        return formio.saveSubmission(req).then(function (response) {
          _powerAssert.default.deepEqual(response, submission, 'Submission should match');
        });
      },
      mock: function mock() {
        return {
          url: "".concat(_Formio.default.getBaseUrl(), "/project/").concat(project._id, "/form/").concat(form._id, "/submission"),
          method: 'POST',
          response: function response(url, opts) {
            var body = JSON.parse(opts.body);
            var submissionId = generateID();
            submission = {
              _id: submissionId,
              created: new Date().toISOString(),
              modified: new Date().toISOString(),
              data: body.data,
              externalIds: [],
              externalTokens: [],
              form: form._id,
              owner: user._id,
              roles: []
            };
            return {
              headers: {
                'Content-Type': 'application/json',
                'x-jwt-token': userToken
              },
              body: submission
            };
          }
        };
      }
    }, {
      name: 'Load Submissions',
      test: function test() {
        var formio = new _Formio.default("/project/".concat(project._id, "/form/").concat(form._id, "/submission"));
        return formio.loadSubmissions().then(function (submissions) {
          _powerAssert.default.equal(submissions.length, 1, 'Should return only one submission.');

          _powerAssert.default.equal(submissions.skip, 0, 'skip should be 0.');

          _powerAssert.default.equal(submissions.limit, 1, 'limit should be 1.');

          _powerAssert.default.equal(submissions.serverCount, 1, 'serverCount should be 1.');

          _powerAssert.default.deepEqual(submissions[0], submission, 'Should match submission');
        });
      },
      mock: function mock() {
        return {
          url: "".concat(_Formio.default.getBaseUrl(), "/project/").concat(project._id, "/form/").concat(form._id, "/submission"),
          method: 'GET',
          response: function response() {
            return {
              headers: {
                'Content-Type': 'application/json',
                'Content-Range': '0-0/1',
                'Range-Unit': 'items',
                'x-jwt-token': userToken
              },
              body: [submission]
            };
          }
        };
      }
    }, {
      name: 'Read Submission',
      test: function test() {
        var formio = new _Formio.default("/project/".concat(project._id, "/form/").concat(form._id, "/submission/").concat(submission._id));
        return formio.loadSubmission().then(function (response) {
          _powerAssert.default.deepEqual(response, submission, 'Submission should match');
        });
      },
      mock: function mock() {
        return {
          url: "".concat(_Formio.default.getBaseUrl(), "/project/").concat(project._id, "/form/").concat(form._id, "/submission/").concat(submission._id),
          method: 'GET',
          response: function response() {
            return {
              headers: {
                'Content-Type': 'application/json',
                'x-jwt-token': userToken
              },
              body: submission
            };
          }
        };
      }
    }, {
      name: 'Update Submission',
      test: function test() {
        var formio = new _Formio.default("/project/".concat(project._id, "/form/").concat(form._id, "/submission/").concat(submission._id));
        var newSubmission = (0, _utils.fastCloneDeep)(submission);
        newSubmission.data.fieldLabel = chance.string();
        return formio.saveSubmission(newSubmission).then(function (response) {
          _powerAssert.default.deepEqual(response, submission, 'Submission should match');
        });
      },
      mock: function mock() {
        return {
          url: "".concat(_Formio.default.getBaseUrl(), "/project/").concat(project._id, "/form/").concat(form._id, "/submission/").concat(submission._id),
          method: 'PUT',
          response: function response(url, opts) {
            var body = JSON.parse(opts.body);
            submission = body;
            return {
              headers: {
                'Content-Type': 'application/json',
                'x-jwt-token': userToken
              },
              body: submission
            };
          }
        };
      }
    }, {
      name: 'Update Submission without ID',
      test: function test() {
        var formio = new _Formio.default("/project/".concat(project._id, "/form/").concat(form._id));
        var newSubmission = (0, _utils.fastCloneDeep)(submission);
        newSubmission.data.fieldLabel = chance.string();
        return formio.saveSubmission(newSubmission).then(function (response) {
          _powerAssert.default.deepEqual(response, submission, 'Submission should match');
        });
      },
      mock: function mock() {
        return {
          url: "".concat(_Formio.default.getBaseUrl(), "/project/").concat(project._id, "/form/").concat(form._id, "/submission/").concat(submission._id),
          method: 'PUT',
          response: function response(url, opts) {
            var body = JSON.parse(opts.body);
            submission = body;
            return {
              headers: {
                'Content-Type': 'application/json',
                'x-jwt-token': userToken
              },
              body: submission
            };
          }
        };
      }
    }, // // Actions
    // // Available Actions
    // // Action Info
    {
      name: 'Delete Submission',
      test: function test() {
        var formio = new _Formio.default("/project/".concat(project._id, "/form/").concat(form._id, "/submission/").concat(submission._id));
        return formio.deleteSubmission().then(function (response) {
          _powerAssert.default.equal(response, 'OK', 'Submission should be deleted.');
        });
      },
      mock: function mock() {
        return {
          url: "".concat(_Formio.default.getBaseUrl(), "/project/").concat(project._id, "/form/").concat(form._id, "/submission/").concat(submission._id),
          method: 'DELETE',
          response: {
            status: 200,
            body: 'OK',
            headers: {
              'Content-Type': 'text/plain; charset=utf-8',
              'x-jwt-token': userToken
            }
          }
        };
      }
    }, {
      name: 'Delete Form',
      test: function test() {
        var formio = new _Formio.default("/project/".concat(project._id, "/form/").concat(form._id));
        return formio.deleteForm().then(function (response) {
          _powerAssert.default.equal(response, 'OK', 'Submission should be deleted.');
        });
      },
      mock: function mock() {
        return {
          url: "".concat(_Formio.default.getBaseUrl(), "/project/").concat(project._id, "/form/").concat(form._id),
          method: 'DELETE',
          response: {
            status: 200,
            body: 'OK',
            headers: {
              'Content-Type': 'text/plain; charset=utf-8',
              'x-jwt-token': userToken
            }
          }
        };
      }
    }, {
      name: 'Delete Project',
      test: function test() {
        var formio = new _Formio.default("/project/".concat(project._id));
        return formio.deleteProject().then(function (response) {
          _powerAssert.default.equal(response, 'OK', 'Submission should be deleted.');
        });
      },
      mock: function mock() {
        return {
          url: "".concat(_Formio.default.getBaseUrl(), "/project/").concat(project._id),
          method: 'DELETE',
          response: {
            status: 200,
            body: 'OK',
            headers: {
              'Content-Type': 'text/plain; charset=utf-8',
              'x-jwt-token': userToken
            }
          }
        };
      }
    }, {
      name: 'Getting Projects',
      test: function test() {
        return _Formio.default.loadProjects().then(function (projects) {
          _powerAssert.default.equal(projects.length, 0, 'Should return no projects.');

          _powerAssert.default.equal(projects.skip, undefined, 'skip should be undefined.');

          _powerAssert.default.equal(projects.limit, undefined, 'limit should be undefined.');

          _powerAssert.default.equal(projects.serverCount, 0, 'serverCount should be 0.');
        });
      },
      mock: function mock() {
        return {
          url: "".concat(_Formio.default.getBaseUrl(), "/project"),
          method: 'GET',
          response: function response() {
            return {
              headers: {
                'Content-Type': 'application/json',
                'Content-Range': '*/0',
                'Range-Unit': 'items',
                'x-jwt-token': userToken
              },
              body: []
            };
          }
        };
      }
    }, {
      name: 'Temporary Token',
      test: function test() {
        var formio = new _Formio.default("/project/".concat(project._id));
        return formio.getTempToken(200, 'GET:/current').then(function (tempToken) {
          _powerAssert.default.equal(tempToken, userToken);
        });
      },
      mock: function mock() {
        return {
          url: "".concat(_Formio.default.getBaseUrl(), "/project/").concat(project._id, "/token"),
          method: 'GET',
          response: function response() {
            return {
              status: 200,
              body: userToken,
              headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'x-jwt-token': userToken
              }
            };
          }
        };
      }
    }, {
      name: 'Logging Out',
      test: function test() {
        return _Formio.default.logout().then(function () {
          _powerAssert.default.equal(_Formio.default.getToken(), null, 'Logged out');
        });
      },
      mock: function mock() {
        return {
          url: "".concat(_Formio.default.getBaseUrl(), "/logout"),
          method: 'GET',
          response: function response() {
            userToken = null;
            return {
              status: 200,
              body: 'OK',
              headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'x-jwt-token': ''
              }
            };
          }
        };
      }
    }, {
      name: 'userPermissions method should give create_all permission',
      test: function test() {
        var user = {
          _id: 'test_user_id',
          roles: ['test_role_id']
        };
        var formio = new _Formio.default("".concat(_Formio.default.getBaseUrl(), "/testform"));
        return formio.userPermissions(user).then(function (permissions) {
          _powerAssert.default.equal(permissions.create, true);

          _powerAssert.default.equal(permissions.edit, false);

          _powerAssert.default.equal(permissions.delete, false);

          _powerAssert.default.equal(permissions.read, false);
        });
      },
      mock: function mock() {
        return [{
          url: "".concat(_Formio.default.getBaseUrl(), "/testform"),
          method: 'GET',
          response: function response() {
            return {
              status: 200,
              body: {
                submissionAccess: [{
                  type: 'create_all',
                  roles: ['test_role_id']
                }]
              }
            };
          }
        }, {
          url: "".concat(_Formio.default.getBaseUrl(), "/access"),
          method: 'GET',
          response: function response() {
            return {
              status: 200,
              body: {
                roles: []
              }
            };
          }
        }];
      }
    }, {
      name: 'userPermissions method should give create_own permission',
      test: function test() {
        var userId = 'test_user_id';
        var user = {
          _id: userId,
          roles: ['test_role_id']
        };
        var submission = {
          owner: userId
        };
        var formio = new _Formio.default("".concat(_Formio.default.getBaseUrl(), "/testform"));
        return formio.userPermissions(user, undefined, submission).then(function (permissions) {
          _powerAssert.default.equal(permissions.create, true);

          _powerAssert.default.equal(permissions.edit, false);

          _powerAssert.default.equal(permissions.read, false);

          _powerAssert.default.equal(permissions.delete, false);
        });
      },
      mock: function mock() {
        return [{
          url: "".concat(_Formio.default.getBaseUrl(), "/testform"),
          method: 'GET',
          response: function response() {
            return {
              status: 200,
              body: {
                submissionAccess: [{
                  type: 'create_own',
                  roles: ['test_role_id']
                }]
              }
            };
          }
        }, {
          url: "".concat(_Formio.default.getBaseUrl(), "/access"),
          method: 'GET',
          response: function response() {
            return {
              status: 200,
              body: {
                roles: []
              }
            };
          }
        }];
      }
    }, {
      name: 'userPermissions method should give permissions for Anonymous role',
      test: function test() {
        var user = {
          _id: false,
          roles: []
        };
        var formio = new _Formio.default("".concat(_Formio.default.getBaseUrl(), "/testform"));
        return formio.userPermissions(user).then(function (permissions) {
          _powerAssert.default.equal(permissions.create, true);

          _powerAssert.default.equal(permissions.edit, false);

          _powerAssert.default.equal(permissions.read, false);

          _powerAssert.default.equal(permissions.delete, false);
        });
      },
      mock: function mock() {
        return [{
          url: "".concat(_Formio.default.getBaseUrl(), "/testform"),
          method: 'GET',
          response: function response() {
            return {
              status: 200,
              body: {
                submissionAccess: [{
                  type: 'create_all',
                  roles: ['test_anonymous_role_id']
                }]
              }
            };
          }
        }, {
          url: "".concat(_Formio.default.getBaseUrl(), "/access"),
          method: 'GET',
          response: function response() {
            return {
              status: 200,
              body: {
                roles: [{
                  _id: 'test_anonymous_role_id',
                  default: true
                }]
              }
            };
          }
        }];
      }
    }, {
      name: 'userPermissions method should give all permissions for admin role',
      test: function test() {
        var user = {
          roles: ['test_admin_role']
        };
        var formio = new _Formio.default("".concat(_Formio.default.getBaseUrl(), "/testform"));
        return formio.userPermissions(user).then(function (permissions) {
          _powerAssert.default.equal(permissions.create, true);

          _powerAssert.default.equal(permissions.read, true);

          _powerAssert.default.equal(permissions.edit, true);

          _powerAssert.default.equal(permissions.delete, true);
        });
      },
      mock: function mock() {
        return [{
          url: "".concat(_Formio.default.getBaseUrl(), "/testform"),
          method: 'GET',
          response: function response() {
            return {
              status: 200,
              body: {
                submissionAccess: []
              }
            };
          }
        }, {
          url: "".concat(_Formio.default.getBaseUrl(), "/access"),
          method: 'GET',
          response: function response() {
            return {
              status: 200,
              body: {
                roles: [{
                  _id: 'test_admin_role',
                  admin: true
                }]
              }
            };
          }
        }];
      }
    }, {
      name: 'userPermissions method should give only group read permission for `read` level',
      test: function test() {
        var user = {
          roles: ['test_group_id']
        };
        var submission = {
          data: {
            groupField: {
              _id: 'test_group_id'
            }
          }
        };
        var formio = new _Formio.default("".concat(_Formio.default.getBaseUrl(), "/testform"));
        return formio.userPermissions(user, undefined, submission).then(function (permissions) {
          _powerAssert.default.equal(permissions.create, false);

          _powerAssert.default.equal(permissions.read, true);

          _powerAssert.default.equal(permissions.edit, false);

          _powerAssert.default.equal(permissions.delete, false);
        });
      },
      mock: function mock() {
        return [{
          url: "".concat(_Formio.default.getBaseUrl(), "/testform"),
          method: 'GET',
          response: function response() {
            return {
              status: 200,
              body: {
                submissionAccess: [],
                components: [{
                  defaultPermission: 'read',
                  key: 'groupField'
                }]
              }
            };
          }
        }, {
          url: "".concat(_Formio.default.getBaseUrl(), "/access"),
          method: 'GET',
          response: function response() {
            return {
              status: 200,
              body: {
                roles: []
              }
            };
          }
        }];
      }
    }, {
      name: 'userPermissions method should give group read and create permissions for `create` level',
      test: function test() {
        var user = {
          roles: ['test_group_id']
        };
        var submission = {
          data: {
            groupField: {
              _id: 'test_group_id'
            }
          }
        };
        var formio = new _Formio.default("".concat(_Formio.default.getBaseUrl(), "/testform"));
        return formio.userPermissions(user, undefined, submission).then(function (permissions) {
          _powerAssert.default.equal(permissions.create, true);

          _powerAssert.default.equal(permissions.read, true);

          _powerAssert.default.equal(permissions.edit, false);

          _powerAssert.default.equal(permissions.delete, false);
        });
      },
      mock: function mock() {
        return [{
          url: "".concat(_Formio.default.getBaseUrl(), "/testform"),
          method: 'GET',
          response: function response() {
            return {
              status: 200,
              body: {
                submissionAccess: [],
                components: [{
                  defaultPermission: 'create',
                  key: 'groupField'
                }]
              }
            };
          }
        }, {
          url: "".concat(_Formio.default.getBaseUrl(), "/access"),
          method: 'GET',
          response: function response() {
            return {
              status: 200,
              body: {
                roles: []
              }
            };
          }
        }];
      }
    }, {
      name: 'userPermissions method should give group read, create and edit permissions for `write` level',
      test: function test() {
        var user = {
          roles: ['test_group_id']
        };
        var submission = {
          data: {
            groupField: {
              _id: 'test_group_id'
            }
          }
        };
        var formio = new _Formio.default("".concat(_Formio.default.getBaseUrl(), "/testform"));
        return formio.userPermissions(user, undefined, submission).then(function (permissions) {
          _powerAssert.default.equal(permissions.create, true);

          _powerAssert.default.equal(permissions.read, true);

          _powerAssert.default.equal(permissions.edit, true);

          _powerAssert.default.equal(permissions.delete, false);
        });
      },
      mock: function mock() {
        return [{
          url: "".concat(_Formio.default.getBaseUrl(), "/testform"),
          method: 'GET',
          response: function response() {
            return {
              status: 200,
              body: {
                submissionAccess: [],
                components: [{
                  defaultPermission: 'write',
                  key: 'groupField'
                }]
              }
            };
          }
        }, {
          url: "".concat(_Formio.default.getBaseUrl(), "/access"),
          method: 'GET',
          response: function response() {
            return {
              status: 200,
              body: {
                roles: []
              }
            };
          }
        }];
      }
    }, {
      name: 'userPermissions method should give all group permissions for `admin` level',
      test: function test() {
        var user = {
          roles: ['test_group_id']
        };
        var submission = {
          data: {
            groupField: {
              _id: 'test_group_id'
            }
          }
        };
        var formio = new _Formio.default("".concat(_Formio.default.getBaseUrl(), "/testform"));
        return formio.userPermissions(user, undefined, submission).then(function (permissions) {
          _powerAssert.default.equal(permissions.create, true);

          _powerAssert.default.equal(permissions.read, true);

          _powerAssert.default.equal(permissions.edit, true);

          _powerAssert.default.equal(permissions.delete, true);
        });
      },
      mock: function mock() {
        return [{
          url: "".concat(_Formio.default.getBaseUrl(), "/testform"),
          method: 'GET',
          response: function response() {
            return {
              status: 200,
              body: {
                submissionAccess: [],
                components: [{
                  defaultPermission: 'admin',
                  key: 'groupField'
                }]
              }
            };
          }
        }, {
          url: "".concat(_Formio.default.getBaseUrl(), "/access"),
          method: 'GET',
          response: function response() {
            return {
              status: 200,
              body: {
                roles: []
              }
            };
          }
        }];
      }
    }, {
      name: 'userPermissions method should handle submission with multiple groups',
      test: function test() {
        var user1 = {
          roles: ['test_group_id1']
        };
        var user2 = {
          roles: ['test_group_id2']
        };
        var submission = {
          data: {
            groupField: [{
              _id: 'test_group_id1'
            }, {
              _id: 'test_group_id2'
            }]
          }
        };
        var formio = new _Formio.default("".concat(_Formio.default.getBaseUrl(), "/testform"));
        return _nativePromiseOnly.default.all([formio.userPermissions(user1, undefined, submission).then(function (permissions) {
          _powerAssert.default.equal(permissions.create, false);

          _powerAssert.default.equal(permissions.read, true);

          _powerAssert.default.equal(permissions.edit, false);

          _powerAssert.default.equal(permissions.delete, false);
        }), formio.userPermissions(user2, undefined, submission).then(function (permissions) {
          _powerAssert.default.equal(permissions.create, false);

          _powerAssert.default.equal(permissions.read, true);

          _powerAssert.default.equal(permissions.edit, false);

          _powerAssert.default.equal(permissions.delete, false);
        })]);
      },
      mock: function mock() {
        return [{
          url: "".concat(_Formio.default.getBaseUrl(), "/testform"),
          method: 'GET',
          response: function response() {
            return {
              status: 200,
              body: {
                submissionAccess: [],
                components: [{
                  defaultPermission: 'read',
                  key: 'groupField'
                }]
              }
            };
          }
        }, {
          url: "".concat(_Formio.default.getBaseUrl(), "/access"),
          method: 'GET',
          response: function response() {
            return {
              status: 200,
              body: {
                roles: []
              }
            };
          }
        }];
      }
    }];
    tests.forEach(testCapability);
  });
  describe('Formio.currentUser', function () {
    var plugin = null;
    beforeEach(function () {
      plugin = {
        wrapStaticRequestPromise: _sinon.default.spy(function (promise) {
          return promise;
        }),
        staticRequest: _sinon.default.spy(function () {
          // Return dummy user
          var userId = generateID();
          return _nativePromiseOnly.default.resolve({
            _id: userId,
            created: new Date().toISOString(),
            modified: new Date().toISOString(),
            data: {
              email: 'user@place.com',
              name: 'user'
            },
            externalIds: [],
            externalTokens: [],
            form: generateID(),
            owner: userId
          });
        })
      };

      _Formio.default.registerPlugin(plugin, 'currentUserTestPlugin');
    });
    afterEach(function () {
      _Formio.default.deregisterPlugin(plugin);
    });
    it('Initial currentUser() should make static request', function (done) {
      // Force token
      _Formio.default.token = chance.string({
        length: 30
      });

      _Formio.default.currentUser().then(function () {
        _powerAssert.default.ok(plugin.staticRequest.calledOnce, 'staticRequest should be called once');

        done();
      });

      _powerAssert.default.ok(plugin.wrapStaticRequestPromise.calledOnce, 'wrapStaticRequestPromise should be called once');
    });
    it('Next currentUser() should return cached value', function (done) {
      // Clear token
      _Formio.default.currentUser().then(function () {
        _powerAssert.default.ok(!plugin.staticRequest.called, 'staticRequest should not be called');

        done();
      });

      _powerAssert.default.ok(plugin.wrapStaticRequestPromise.calledOnce, 'wrapStaticRequestPromise should be called once');
    });
  });
});