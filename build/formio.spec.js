'use strict';

var _formio = require('./formio');

var _formio2 = _interopRequireDefault(_formio);

var _each2 = require('lodash/each');

var _each3 = _interopRequireDefault(_each2);

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

var _client = require('fetch-mock/es5/client');

var _client2 = _interopRequireDefault(_client);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chance = (0, _chance2.default)();
var protocol = 'https';
var domain = 'localhost:3000';
var baseUrl = protocol + '://api.' + domain;
_formio2.default.setBaseUrl(baseUrl);
_formio2.default.setToken(null);

var generateID = function generateID() {
  return chance.string({ length: 24, pool: '0123456789abcdef' });
};

var runTests = function runTests(cb, options) {
  var tests = {};
  var noBefore = cb(tests);
  if (!noBefore) {
    beforeEach(function () {
      _formio2.default.setBaseUrl(baseUrl);
      _formio2.default.projectUrlSet = false;
      _formio2.default.projectUrl = 'https://api.form.io';
    });
  }
  (0, _each3.default)(tests, function (test, path) {
    it('Should initialize for ' + path, function (done) {
      if (typeof test === 'function') {
        test();
      } else {
        var formio = new _formio2.default(path, options);
        for (var param in test) {
          _powerAssert2.default.equal(formio[param], test[param], param + ' is not equal. ' + formio[param] + ' == ' + test[param] + '\n');
        }
      }
      done();
    });
  });
};

describe('Formio Constructor Tests', function () {
  runTests(function (tests) {
    tests['http://form.io/project/234234234234/form/23234234234234'] = {
      projectUrl: 'http://form.io/project/234234234234',
      projectsUrl: 'http://form.io/project',
      projectId: '234234234234',
      formsUrl: 'http://form.io/project/234234234234/form',
      formUrl: 'http://form.io/project/234234234234/form/23234234234234',
      formId: '23234234234234',
      actionsUrl: 'http://form.io/project/234234234234/form/23234234234234/action',
      actionUrl: '',
      actionId: '',
      submissionsUrl: 'http://form.io/project/234234234234/form/23234234234234/submission',
      submissionUrl: '',
      submissionId: '',
      query: ''
    };
    tests['http://form.io/form/23234234234234'] = {
      projectUrl: 'http://form.io',
      projectsUrl: baseUrl + '/project',
      projectId: '',
      formsUrl: 'http://form.io/form',
      formUrl: 'http://form.io/form/23234234234234',
      formId: '23234234234234',
      actionsUrl: 'http://form.io/form/23234234234234/action',
      actionUrl: '',
      actionId: '',
      submissionsUrl: 'http://form.io/form/23234234234234/submission',
      submissionUrl: '',
      submissionId: '',
      query: ''
    };
    tests['http://form.io/form/23234234234234/submission/982398220983'] = {
      projectUrl: 'http://form.io',
      projectsUrl: baseUrl + '/project',
      projectId: '',
      formsUrl: 'http://form.io/form',
      formUrl: 'http://form.io/form/23234234234234',
      formId: '23234234234234',
      actionsUrl: 'http://form.io/form/23234234234234/action',
      actionUrl: '',
      actionId: '',
      submissionsUrl: 'http://form.io/form/23234234234234/submission',
      submissionUrl: 'http://form.io/form/23234234234234/submission/982398220983',
      submissionId: '982398220983',
      query: ''
    };
    tests['http://form.io/form/23234234234234/action/234230987872'] = {
      projectUrl: 'http://form.io',
      projectsUrl: baseUrl + '/project',
      projectId: '',
      formsUrl: 'http://form.io/form',
      formUrl: 'http://form.io/form/23234234234234',
      formId: '23234234234234',
      actionsUrl: 'http://form.io/form/23234234234234/action',
      actionUrl: 'http://form.io/form/23234234234234/action/234230987872',
      actionId: '234230987872',
      submissionsUrl: 'http://form.io/form/23234234234234/submission',
      submissionUrl: '',
      submissionId: '',
      query: ''
    };
    tests['http://form.io/project/092934882/form/23234234234234/action/234230987872'] = {
      projectUrl: 'http://form.io/project/092934882',
      projectsUrl: 'http://form.io/project',
      projectId: '092934882',
      formsUrl: 'http://form.io/project/092934882/form',
      formUrl: 'http://form.io/project/092934882/form/23234234234234',
      formId: '23234234234234',
      actionsUrl: 'http://form.io/project/092934882/form/23234234234234/action',
      actionUrl: 'http://form.io/project/092934882/form/23234234234234/action/234230987872',
      actionId: '234230987872',
      submissionsUrl: 'http://form.io/project/092934882/form/23234234234234/submission',
      submissionUrl: '',
      submissionId: '',
      query: ''
    };
    tests['http://api.form.io/project/092934882'] = {
      projectUrl: 'http://api.form.io/project/092934882',
      projectsUrl: 'http://api.form.io/project',
      projectId: '092934882',
      formsUrl: 'http://api.form.io/project/092934882/form',
      formUrl: '',
      formId: '',
      actionsUrl: 'http://api.form.io/project/092934882/action',
      actionUrl: '',
      actionId: '',
      submissionsUrl: 'http://api.form.io/project/092934882/submission',
      submissionUrl: '',
      submissionId: '',
      query: ''
    };
    tests['http://form.io/project/092934882/form/23234234234234/submission/2987388987982'] = {
      projectUrl: 'http://form.io/project/092934882',
      projectsUrl: 'http://form.io/project',
      projectId: '092934882',
      formsUrl: 'http://form.io/project/092934882/form',
      formUrl: 'http://form.io/project/092934882/form/23234234234234',
      formId: '23234234234234',
      actionsUrl: 'http://form.io/project/092934882/form/23234234234234/action',
      actionUrl: '',
      actionId: '',
      submissionsUrl: 'http://form.io/project/092934882/form/23234234234234/submission',
      submissionUrl: 'http://form.io/project/092934882/form/23234234234234/submission/2987388987982',
      submissionId: '2987388987982',
      query: ''
    };
    tests['http://form.io/project/092934882/form/23234234234234?test=hello&test2=there'] = {
      projectUrl: 'http://form.io/project/092934882',
      projectsUrl: 'http://form.io/project',
      projectId: '092934882',
      formsUrl: 'http://form.io/project/092934882/form',
      formUrl: 'http://form.io/project/092934882/form/23234234234234',
      formId: '23234234234234',
      actionsUrl: 'http://form.io/project/092934882/form/23234234234234/action',
      actionUrl: '',
      actionId: '',
      submissionsUrl: 'http://form.io/project/092934882/form/23234234234234/submission',
      submissionUrl: '',
      submissionId: '',
      query: '?test=hello&test2=there'
    };
    tests['http://project.form.io/user/login'] = {
      projectUrl: 'http://project.form.io',
      projectsUrl: baseUrl + '/project',
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
    tests['http://project.form.io/user/login/submission/234234243234'] = {
      projectUrl: 'http://project.form.io',
      projectsUrl: baseUrl + '/project',
      projectId: 'project',
      formsUrl: 'http://project.form.io/form',
      formUrl: 'http://project.form.io/user/login',
      formId: 'user/login',
      actionsUrl: 'http://project.form.io/user/login/action',
      actionUrl: '',
      actionId: '',
      submissionsUrl: 'http://project.form.io/user/login/submission',
      submissionUrl: 'http://project.form.io/user/login/submission/234234243234',
      submissionId: '234234243234',
      query: ''
    };
    tests['http://project.form.io/user/login/action/234234243234'] = {
      projectUrl: 'http://project.form.io',
      projectsUrl: baseUrl + '/project',
      projectId: 'project',
      formsUrl: 'http://project.form.io/form',
      formUrl: 'http://project.form.io/user/login',
      formId: 'user/login',
      actionsUrl: 'http://project.form.io/user/login/action',
      actionUrl: 'http://project.form.io/user/login/action/234234243234',
      actionId: '234234243234',
      submissionsUrl: 'http://project.form.io/user/login/submission',
      submissionUrl: '',
      submissionId: '',
      query: ''
    };
    tests['http://project.form.io/user/login/action/234234243234?test=test2'] = {
      projectUrl: 'http://project.form.io',
      projectsUrl: baseUrl + '/project',
      projectId: 'project',
      formsUrl: 'http://project.form.io/form',
      formUrl: 'http://project.form.io/user/login',
      formId: 'user/login',
      actionsUrl: 'http://project.form.io/user/login/action',
      actionUrl: 'http://project.form.io/user/login/action/234234243234',
      actionId: '234234243234',
      submissionsUrl: 'http://project.form.io/user/login/submission',
      submissionUrl: '',
      submissionId: '',
      query: '?test=test2'
    };
    tests['http://project.form.io/user/loginform/action/234234243234?test=test2'] = {
      projectUrl: 'http://project.form.io',
      projectsUrl: baseUrl + '/project',
      projectId: 'project',
      formsUrl: 'http://project.form.io/form',
      formUrl: 'http://project.form.io/user/loginform',
      formId: 'user/loginform',
      actionsUrl: 'http://project.form.io/user/loginform/action',
      actionUrl: 'http://project.form.io/user/loginform/action/234234243234',
      actionId: '234234243234',
      submissionsUrl: 'http://project.form.io/user/loginform/submission',
      submissionUrl: '',
      submissionId: '',
      query: '?test=test2'
    };
    tests['http://project.form.io/user/loginform/submission'] = {
      projectUrl: 'http://project.form.io',
      projectsUrl: baseUrl + '/project',
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
      projectsUrl: baseUrl + '/project',
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
    tests['http://project.form.io/user/actionform/submission/2342424234234'] = {
      projectUrl: 'http://project.form.io',
      projectsUrl: baseUrl + '/project',
      projectId: 'project',
      formsUrl: 'http://project.form.io/form',
      formUrl: 'http://project.form.io/user/actionform',
      formId: 'user/actionform',
      actionsUrl: 'http://project.form.io/user/actionform/action',
      actionUrl: '',
      actionId: '',
      submissionsUrl: 'http://project.form.io/user/actionform/submission',
      submissionUrl: 'http://project.form.io/user/actionform/submission/2342424234234',
      submissionId: '2342424234234',
      query: ''
    };
    tests['http://project.form.io/user/actionform/?test=foo'] = {
      projectUrl: 'http://project.form.io',
      projectsUrl: baseUrl + '/project',
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
  var projectUrl = protocol + '://' + projectName + '.' + testBaseUrl;
  runTests(function (tests) {
    tests[projectUrl + '/user/actionform/?test=foo'] = {
      projectUrl: projectUrl,
      projectsUrl: baseUrl + '/project',
      projectId: projectName,
      formsUrl: projectUrl + '/form',
      formUrl: projectUrl + '/user/actionform',
      formId: 'user/actionform',
      actionsUrl: projectUrl + '/user/actionform/action',
      actionUrl: '',
      actionId: '',
      submissionsUrl: projectUrl + '/user/actionform/submission',
      submissionUrl: '',
      submissionId: '',
      query: '?test=foo'
    };
    tests[projectUrl + '/user'] = {
      projectUrl: projectUrl,
      projectsUrl: baseUrl + '/project',
      projectId: projectName,
      formsUrl: projectUrl + '/form',
      formUrl: projectUrl + '/user',
      formId: 'user',
      actionsUrl: projectUrl + '/user/action',
      actionUrl: '',
      actionId: '',
      submissionsUrl: projectUrl + '/user/submission',
      submissionUrl: '',
      submissionId: '',
      query: ''
    };
  }, { base: baseUrl });
});

describe('Subdomain Constructor Tests', function () {
  var testBaseUrl = 'foo.blah.form.io';
  var projectName = 'myproject';
  var projectUrl = protocol + '://' + projectName + '.' + testBaseUrl;
  runTests(function (tests) {
    tests[projectUrl + '/user/actionform/?test=foo'] = {
      projectUrl: projectUrl,
      projectsUrl: baseUrl + '/project',
      projectId: projectName,
      formsUrl: projectUrl + '/form',
      formUrl: projectUrl + '/user/actionform',
      formId: 'user/actionform',
      actionsUrl: projectUrl + '/user/actionform/action',
      actionUrl: '',
      actionId: '',
      submissionsUrl: projectUrl + '/user/actionform/submission',
      submissionUrl: '',
      submissionId: '',
      query: '?test=foo'
    };
    tests[projectUrl + '/user'] = {
      projectUrl: projectUrl,
      projectsUrl: baseUrl + '/project',
      projectId: projectName,
      formsUrl: projectUrl + '/form',
      formUrl: projectUrl + '/user',
      formId: 'user',
      actionsUrl: projectUrl + '/user/action',
      actionUrl: '',
      actionId: '',
      submissionsUrl: projectUrl + '/user/submission',
      submissionUrl: '',
      submissionId: '',
      query: ''
    };
  }, { base: baseUrl });
});

describe('Subdirectory Constructor Tests', function () {
  var testBaseUrl = 'foo.blah.form.io';
  var projectName = 'myproject';
  var projectUrl = protocol + '://' + testBaseUrl + '/' + projectName;
  runTests(function (tests) {
    tests[projectUrl + '/user/actionform/?test=foo'] = {
      projectUrl: projectUrl,
      projectsUrl: protocol + '://' + testBaseUrl + '/project',
      projectId: projectName,
      formsUrl: projectUrl + '/form',
      formUrl: projectUrl + '/user/actionform',
      formId: 'user/actionform',
      actionsUrl: projectUrl + '/user/actionform/action',
      actionUrl: '',
      actionId: '',
      submissionsUrl: projectUrl + '/user/actionform/submission',
      submissionUrl: '',
      submissionId: '',
      query: '?test=foo'
    };
    tests[projectUrl + '/user'] = {
      projectUrl: projectUrl,
      projectsUrl: protocol + '://' + testBaseUrl + '/project',
      projectId: projectName,
      formsUrl: projectUrl + '/form',
      formUrl: projectUrl + '/user',
      formId: 'user',
      actionsUrl: projectUrl + '/user/action',
      actionUrl: '',
      actionId: '',
      submissionsUrl: projectUrl + '/user/submission',
      submissionUrl: '',
      submissionId: '',
      query: ''
    };
    tests[projectUrl] = {
      projectUrl: projectUrl,
      projectsUrl: protocol + '://' + testBaseUrl + '/project',
      projectId: projectName,
      formsUrl: projectUrl + '/form',
      formUrl: projectUrl,
      formId: '',
      actionsUrl: projectUrl + '/action',
      actionUrl: '',
      actionId: '',
      submissionsUrl: projectUrl + '/submission',
      submissionUrl: '',
      submissionId: '',
      query: ''
    };
  }, { base: protocol + '://' + testBaseUrl });
});

describe('Simple Form Constructor Tests', function () {
  runTests(function (tests) {
    tests['init'] = function () {
      _formio2.default.setBaseUrl('https://api.form.io');
      _formio2.default.projectUrlSet = false;
      _formio2.default.projectUrl = 'https://api.form.io';
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
    tests[formBaseUrl + '/user'] = {
      projectUrl: formBaseUrl,
      projectsUrl: '',
      projectId: '',
      formsUrl: formBaseUrl + '/form',
      formUrl: formBaseUrl + '/user',
      formId: 'user',
      actionsUrl: formBaseUrl + '/user/action',
      actionUrl: '',
      actionId: '',
      submissionsUrl: formBaseUrl + '/user/submission',
      submissionUrl: '',
      submissionId: '',
      query: ''
    };
    tests[formBaseUrl + '/user/actionform/?test=foo'] = {
      projectUrl: formBaseUrl,
      projectsUrl: '',
      projectId: '',
      formsUrl: formBaseUrl + '/form',
      formUrl: formBaseUrl + '/user/actionform',
      formId: 'user/actionform',
      actionsUrl: formBaseUrl + '/user/actionform/action',
      actionUrl: '',
      actionId: '',
      submissionsUrl: formBaseUrl + '/user/actionform/submission',
      submissionUrl: '',
      submissionId: '',
      query: '?test=foo'
    };
  }, { base: formBaseUrl, project: formBaseUrl });
});

describe('Plugins', function () {
  var plugin = null;
  beforeEach(function () {
    _powerAssert2.default.equal(_formio2.default.getPlugin('test-plugin'), undefined, 'No plugin may be returned under the name `test-plugin`');
    plugin = { init: _sinon2.default.spy() };
    _formio2.default.registerPlugin(plugin, 'test-plugin');
    _powerAssert2.default.ok(plugin.init.calledOnce, 'plugin.init must be called exactly once');
    _powerAssert2.default.ok(plugin.init.calledOn(plugin), 'plugin.init must be called on plugin as `this`');
    _powerAssert2.default.ok(plugin.init.calledWithExactly(_formio2.default), 'plugin.init must be given Formio as argument');
    _powerAssert2.default.equal(_formio2.default.getPlugin('test-plugin'), plugin, 'getPlugin must return plugin');
  });

  afterEach(function () {
    _powerAssert2.default.equal(_formio2.default.getPlugin('test-plugin'), plugin, 'getPlugin must return plugin');
    plugin.deregister = _sinon2.default.spy();
    _formio2.default.deregisterPlugin(plugin, 'test-plugin');
    _powerAssert2.default.ok(plugin.deregister.calledOnce, 'plugin.deregister must be called exactly once');
    _powerAssert2.default.ok(plugin.deregister.calledOn(plugin), 'plugin.deregister must be called on plugin as `this`');
    _powerAssert2.default.ok(plugin.deregister.calledWithExactly(_formio2.default), 'plugin.deregister must be given Formio as argument');
    _powerAssert2.default.equal(_formio2.default.getPlugin('test-plugin'), undefined, 'No plugin may be returned under the name `test-plugin`');
  });

  // Test a request to see if the plugin flow order is correct
  var testRequest = function testRequest(url, method, type) {
    var fnName;
    switch (method) {
      case 'GET':
        fnName = 'load' + _lodash2.default.capitalize(type);break;
      case 'POST':
      case 'PUT':
        fnName = 'save' + _lodash2.default.capitalize(type);break;
      case 'DELETE':
        fnName = 'delete' + _lodash2.default.capitalize(type);break;
    }

    it('Plugin ' + method + ' ' + fnName, function (done) {
      var step = 0;
      var formio = new _formio2.default(url);
      method = method.toUpperCase();
      var testData = { testRequest: 'TEST_REQUEST' };
      var testOpts = { testOption: true };
      var testResult = { _id: 'TEST_ID', testResult: 'TEST_RESULT' };

      var expectedArgs = {
        formio: formio,
        type: type,
        method: method,
        url: formio[type + (method === 'POST' ? 'sUrl' : 'Url')],
        data: _lodash2.default.startsWith(fnName, 'save') ? testData : null,
        opts: testOpts
      };

      // Set up plugin hooks
      plugin.preRequest = function (requestArgs) {
        _powerAssert2.default.equal(++step, 1, 'preRequest hook should be called first');
        _powerAssert2.default.deepEqual(requestArgs, expectedArgs, 'Request hook arguments match expected arguments');
        return Promise.resolve().then(function () {
          _powerAssert2.default.equal(++step, 3, 'preRequest promise should resolve third');
          // TODO
        });
      };
      plugin.request = function (requestArgs) {
        _powerAssert2.default.equal(++step, 4, 'request hook should be called fourth');
        _powerAssert2.default.deepEqual(requestArgs, expectedArgs, 'Request hook arguments match expected arguments');
        return Promise.resolve().then(function () {
          _powerAssert2.default.equal(++step, 5, 'request promise should resolve fifth');
          return testResult;
        });
      };
      plugin.wrapRequestPromise = function (promise, requestArgs) {
        _powerAssert2.default.equal(++step, 2, 'wrapRequestPromise hook should be called second');
        _powerAssert2.default.deepEqual(requestArgs, expectedArgs, 'Request hook arguments match expected arguments');
        return promise.then(function (result) {
          _powerAssert2.default.equal(++step, 6, 'wrapRequestPromise post-result promise should resolve sixth');
          _powerAssert2.default.deepEqual(result, testResult, 'Result should match result from request hook');
          return result;
        });
      };

      var promise;
      if (_lodash2.default.startsWith(fnName, 'save')) {
        promise = formio[fnName](testData, testOpts);
      } else if (_lodash2.default.startsWith(fnName, 'load')) {
        promise = formio[fnName](null, testOpts);
      } else {
        promise = formio[fnName](testOpts);
      }
      promise.then(function (result) {
        _powerAssert2.default.equal(++step, 7, 'post request promise should resolve last');
        _powerAssert2.default.deepEqual(result, testResult, 'Result should match result from request hook');
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

  var testStaticRequest = function testStaticRequest(fnName, url, method, data) {
    it('Plugin ' + fnName, function (done) {
      var step = 0;
      var testResult = { _id: 'TEST_ID', testResult: 'TEST_RESULT' };
      var expectedArgs = {
        url: url,
        method: method,
        data: data
      };

      // Set up plugin hooks
      plugin.preRequest = function (requestArgs) {
        _powerAssert2.default.equal(++step, 1, 'preRequest hook should be called first');
        _powerAssert2.default.deepEqual(requestArgs, expectedArgs, 'Request hook arguments match expected arguments');
        return Promise.resolve().then(function () {
          _powerAssert2.default.equal(++step, 3, 'preRequest promise should resolve third');
          // TODO
        });
      };
      plugin.staticRequest = function (requestArgs) {
        _powerAssert2.default.equal(++step, 4, 'request hook should be called fourth');
        _powerAssert2.default.deepEqual(requestArgs, expectedArgs, 'Request hook arguments match expected arguments');
        return Promise.resolve().then(function () {
          _powerAssert2.default.equal(++step, 5, 'request promise should resolve fifth');
          return testResult;
        });
      };
      plugin.wrapStaticRequestPromise = function (promise, requestArgs) {
        _powerAssert2.default.equal(++step, 2, 'wrapRequestPromise hook should be called second');
        _powerAssert2.default.deepEqual(requestArgs, expectedArgs, 'Request hook arguments match expected arguments');
        return promise.then(function (result) {
          _powerAssert2.default.equal(++step, 6, 'wrapRequestPromise post-result promise should resolve sixth');
          _powerAssert2.default.deepEqual(result, testResult, 'Result should match result from request hook');
          return result;
        });
      };

      _formio2.default[fnName]().then(function (result) {
        _powerAssert2.default.equal(++step, 7, 'post request promise should resolve last');
        _powerAssert2.default.deepEqual(result, testResult, 'Result should match result from request hook');
        done();
      });
    });
  };

  var staticTests = [{
    fnName: 'loadProjects',
    url: 'https://api.localhost:3000/project',
    method: 'GET',
    data: undefined
  }, {
    fnName: 'logout',
    url: 'https://api.localhost:3000/logout',
    method: 'GET',
    data: undefined
  }];

  staticTests.forEach(function (test) {
    testStaticRequest(test.fnName, test.url, test.method, test.type);
  });

  var testFileRequest = function testFileRequest(fnName, formUrl, args) {
    it('Plugin ' + fnName, function (done) {
      var step = 0;
      var testResult = { _id: 'TEST_ID', testResult: 'TEST_RESULT' };

      if (fnName == 'downloadFile') {
        var expectedArgs = {
          method: 'download',
          file: args[0]
        };
      } else if (fnName === 'uploadFile') {
        var expectedArgs = {
          provider: args[0],
          method: 'upload',
          file: args[1],
          fileName: args[2],
          dir: args[3]
        };
      }

      // Set up plugin hooks
      plugin.preRequest = function (requestArgs) {
        _powerAssert2.default.equal(++step, 1, 'preRequest hook should be called first');
        _powerAssert2.default.deepEqual(requestArgs, expectedArgs, 'Request hook arguments match expected arguments');
        return Promise.resolve().then(function () {
          _powerAssert2.default.equal(++step, 3, 'preRequest promise should resolve third');
          // TODO
        });
      };
      plugin.fileRequest = function (requestArgs) {
        _powerAssert2.default.equal(++step, 4, 'request hook should be called fourth');
        _powerAssert2.default.deepEqual(requestArgs, expectedArgs, 'Request hook arguments match expected arguments');
        return Promise.resolve().then(function () {
          _powerAssert2.default.equal(++step, 5, 'request promise should resolve fifth');
          return testResult;
        });
      };
      plugin.wrapFileRequestPromise = function (promise, requestArgs) {
        _powerAssert2.default.equal(++step, 2, 'wrapFileRequestPromise hook should be called second');
        _powerAssert2.default.deepEqual(requestArgs, expectedArgs, 'Request hook arguments match expected arguments');
        return promise.then(function (result) {
          _powerAssert2.default.equal(++step, 6, 'wrapFileRequestPromise post-result promise should resolve sixth');
          _powerAssert2.default.deepEqual(result, testResult, 'Result should match result from request hook');
          return result;
        });
      };

      var formio = new _formio2.default(formUrl);
      formio[fnName].apply(null, args).then(function (result) {
        _powerAssert2.default.equal(++step, 7, 'post request promise should resolve last');
        _powerAssert2.default.deepEqual(result, testResult, 'Result should match result from request hook');
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
      if (test.mock) {
        var mock = test.mock();
        if (mock instanceof Array) {
          _lodash2.default.each(mock, function (_mock) {
            _client2.default.mock(_mock.url, _mock.response, { method: _mock.method });
          });
        } else {
          _client2.default.mock(mock.url, mock.response, { method: mock.method });
        }
      }
      Promise.resolve().then(function () {
        return test.test();
      }).then(function () {
        if (test.mock) _client2.default.restore();
        done();
      }).catch(function (err) {
        _powerAssert2.default.equal(err, null, 'Caught error during test');
        if (err) console.error(err.stack);
        if (test.mock) _client2.default.restore();
        done();
      });
    });
  };

  var user;
  var userPassword;
  var userToken = chance.string({ length: 450 });
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
          'user.password': chance.string({ length: 12 })
        }
      };
      var formio = new _formio2.default(_formio2.default.getBaseUrl() + '/user/register');
      return formio.saveSubmission(req).then(function (response) {
        _powerAssert2.default.deepEqual(response, user, 'saveSubmission response should match test user');
        _powerAssert2.default.equal(_formio2.default.getToken(), userToken, 'Formio should save the user token');
      });
    },
    mock: function mock() {
      return [{
        url: _formio2.default.getBaseUrl() + '/current',
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
        url: _formio2.default.getBaseUrl() + '/user/register/submission',
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
      var formio = new _formio2.default(_formio2.default.getBaseUrl() + '/user/login');
      return formio.saveSubmission(req).then(function (response) {
        _powerAssert2.default.deepEqual(response, user, 'saveSubmission response should match test user');
        _powerAssert2.default.equal(_formio2.default.getToken(), userToken, 'Formio should save the user token');
      });
    },
    mock: function mock() {
      return {
        url: _formio2.default.getBaseUrl() + '/user/login/submission',
        method: 'POST',
        response: function response(url, opts) {
          var body = JSON.parse(opts.body);
          userToken = chance.string({ length: 450 });
          _powerAssert2.default.equal(body.data['user.email'], user.data.email, 'Login email must be correct.');
          _powerAssert2.default.equal(body.data['user.password'], userPassword, 'Login password must be correct.');
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
      return _formio2.default.currentUser().then(function (response) {
        _powerAssert2.default.deepEqual(response, user, 'currentUser response should match test user');
        return _formio2.default.currentUser();
      }).then(function (response) {
        _powerAssert2.default.deepEqual(response, user, 'currentUser response should match test user');
      });
    },
    mock: function mock() {
      var called = false;
      return {
        url: _formio2.default.getBaseUrl() + '/current',
        method: 'GET',
        response: function response() {
          _powerAssert2.default.ok(!called, 'User should be requested only once.');
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
      var formio = new _formio2.default();
      var req = {
        title: chance.string({
          length: 10,
          pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        }),
        name: chance.string({
          length: 10,
          pool: 'abcdefghijklmnopqrstuvwxyz'
        }),
        description: chance.paragraph({ sentences: 1 }),
        settings: {
          cors: '*'
        },
        template: 'http://help.form.io/templates/empty.json'
      };
      return formio.saveProject(req).then(function (response) {
        _powerAssert2.default.deepEqual(response, project, 'saveProject response should match test user');
      });
    },
    mock: function mock() {
      return {
        url: _formio2.default.getBaseUrl() + '/project',
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
      return _formio2.default.loadProjects().then(function (projects) {
        _powerAssert2.default.equal(projects.length, 1, 'Should return only one project.');
        _powerAssert2.default.equal(projects.skip, 0, 'skip should be 0.');
        _powerAssert2.default.equal(projects.limit, 1, 'limit should be 1.');
        _powerAssert2.default.equal(projects.serverCount, 1, 'serverCount should be 1.');
        _powerAssert2.default.deepEqual(projects[0], project, 'Should match project');
      });
    },
    mock: function mock() {
      return {
        url: _formio2.default.getBaseUrl() + '/project',
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
      var formio = new _formio2.default(_formio2.default.getBaseUrl() + '/project/' + project._id);
      return formio.loadProject().then(function (response) {
        _powerAssert2.default.deepEqual(response, project, 'Should match project');
      });
    },
    mock: function mock() {
      return {
        url: _formio2.default.getBaseUrl() + '/project/' + project._id,
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
      var formio = new _formio2.default('/project/' + project._id);
      var newProject = _lodash2.default.cloneDeep(project);
      newProject.name = chance.string({
        length: 10,
        pool: 'abcdefghijklmnopqrstuvwxyz'
      });
      newProject.title = chance.string({
        length: 10,
        pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      });
      newProject.description = chance.paragraph({ sentences: 1 });
      return formio.saveProject(newProject).then(function (response) {
        _powerAssert2.default.deepEqual(response, project, 'Project should match');
      });
    },
    mock: function mock() {
      return {
        url: _formio2.default.getBaseUrl() + '/project/' + project._id,
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
      var formio = new _formio2.default('/project/' + project._id + '/form');
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
        _powerAssert2.default.deepEqual(response, form, 'Form should match');
      });
    },
    mock: function mock() {
      return {
        url: _formio2.default.getBaseUrl() + '/project/' + project._id + '/form',
        method: 'POST',
        response: function response(url, opts) {
          var body = JSON.parse(opts.body);
          var formId = generateID();
          form = _lodash2.default.cloneDeep(body);
          _lodash2.default.assign(form, {
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
      var formio = new _formio2.default('/project/' + project._id + '/form');
      return formio.loadForms().then(function (forms) {
        _powerAssert2.default.equal(forms.length, 1, 'Should return only one form.');
        _powerAssert2.default.equal(forms.skip, 0, 'skip should be 0.');
        _powerAssert2.default.equal(forms.limit, 1, 'limit should be 1.');
        _powerAssert2.default.equal(forms.serverCount, 1, 'serverCount should be 1.');
        _powerAssert2.default.deepEqual(forms[0], form, 'Should match form');
      });
    },
    mock: function mock() {
      return {
        url: _formio2.default.getBaseUrl() + '/project/' + project._id + '/form',
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
      var formio = new _formio2.default('/project/' + project._id + '/form/' + form._id);
      return formio.loadForm().then(function (response) {
        _powerAssert2.default.deepEqual(response, form, 'Form should match');
      });
    },
    mock: function mock() {
      return {
        url: _formio2.default.getBaseUrl() + '/project/' + project._id + '/form/' + form._id,
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
      var formio = new _formio2.default('/project/' + project._id + '/form/' + form._id);
      var newForm = _lodash2.default.cloneDeep(form);
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
        _powerAssert2.default.deepEqual(response, form, 'Form should match');
      });
    },
    mock: function mock() {
      return {
        url: _formio2.default.getBaseUrl() + '/project/' + project._id + '/form/' + form._id,
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
      var formio = new _formio2.default('/project/' + project._id + '/form/' + form._id + '/submission');
      var req = {
        data: {
          fieldLabel: chance.string()
        }
      };
      return formio.saveSubmission(req).then(function (response) {
        _powerAssert2.default.deepEqual(response, submission, 'Submission should match');
      });
    },
    mock: function mock() {
      return {
        url: _formio2.default.getBaseUrl() + '/project/' + project._id + '/form/' + form._id + '/submission',
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
      var formio = new _formio2.default('/project/' + project._id + '/form/' + form._id + '/submission');
      return formio.loadSubmissions().then(function (submissions) {
        _powerAssert2.default.equal(submissions.length, 1, 'Should return only one submission.');
        _powerAssert2.default.equal(submissions.skip, 0, 'skip should be 0.');
        _powerAssert2.default.equal(submissions.limit, 1, 'limit should be 1.');
        _powerAssert2.default.equal(submissions.serverCount, 1, 'serverCount should be 1.');
        _powerAssert2.default.deepEqual(submissions[0], submission, 'Should match submission');
      });
    },
    mock: function mock() {
      return {
        url: _formio2.default.getBaseUrl() + '/project/' + project._id + '/form/' + form._id + '/submission',
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
      var formio = new _formio2.default('/project/' + project._id + '/form/' + form._id + '/submission/' + submission._id);
      return formio.loadSubmission().then(function (response) {
        _powerAssert2.default.deepEqual(response, submission, 'Submission should match');
      });
    },
    mock: function mock() {
      return {
        url: _formio2.default.getBaseUrl() + '/project/' + project._id + '/form/' + form._id + '/submission/' + submission._id,
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
      var formio = new _formio2.default('/project/' + project._id + '/form/' + form._id + '/submission/' + submission._id);
      var newSubmission = _lodash2.default.cloneDeep(submission);
      newSubmission.data.fieldLabel = chance.string();
      return formio.saveSubmission(newSubmission).then(function (response) {
        _powerAssert2.default.deepEqual(response, submission, 'Submission should match');
      });
    },
    mock: function mock() {
      return {
        url: _formio2.default.getBaseUrl() + '/project/' + project._id + '/form/' + form._id + '/submission/' + submission._id,
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
      var formio = new _formio2.default('/project/' + project._id + '/form/' + form._id);
      var newSubmission = _lodash2.default.cloneDeep(submission);
      newSubmission.data.fieldLabel = chance.string();
      return formio.saveSubmission(newSubmission).then(function (response) {
        _powerAssert2.default.deepEqual(response, submission, 'Submission should match');
      });
    },
    mock: function mock() {
      return {
        url: _formio2.default.getBaseUrl() + '/project/' + project._id + '/form/' + form._id + '/submission/' + submission._id,
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
  },
  // // Actions
  // // Available Actions
  // // Action Info
  {
    name: 'Delete Submission',
    test: function test() {
      var formio = new _formio2.default('/project/' + project._id + '/form/' + form._id + '/submission/' + submission._id);
      return formio.deleteSubmission().then(function (response) {
        _powerAssert2.default.equal(response, 'OK', 'Submission should be deleted.');
      });
    },
    mock: function mock() {
      return {
        url: _formio2.default.getBaseUrl() + '/project/' + project._id + '/form/' + form._id + '/submission/' + submission._id,
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
      var formio = new _formio2.default('/project/' + project._id + '/form/' + form._id);
      return formio.deleteForm().then(function (response) {
        _powerAssert2.default.equal(response, 'OK', 'Submission should be deleted.');
      });
    },
    mock: function mock() {
      return {
        url: _formio2.default.getBaseUrl() + '/project/' + project._id + '/form/' + form._id,
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
      var formio = new _formio2.default('/project/' + project._id);
      return formio.deleteProject().then(function (response) {
        _powerAssert2.default.equal(response, 'OK', 'Submission should be deleted.');
      });
    },
    mock: function mock() {
      return {
        url: _formio2.default.getBaseUrl() + '/project/' + project._id,
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
      return _formio2.default.loadProjects().then(function (projects) {
        _powerAssert2.default.equal(projects.length, 0, 'Should return no projects.');
        _powerAssert2.default.equal(projects.skip, undefined, 'skip should be undefined.');
        _powerAssert2.default.equal(projects.limit, undefined, 'limit should be undefined.');
        _powerAssert2.default.equal(projects.serverCount, 0, 'serverCount should be 0.');
      });
    },
    mock: function mock() {
      return {
        url: _formio2.default.getBaseUrl() + '/project',
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
      var formio = new _formio2.default('/project/' + project._id);
      return formio.getTempToken(200, 'GET:/current').then(function (tempToken) {
        _powerAssert2.default.equal(tempToken, userToken);
      });
    },
    mock: function mock() {
      return {
        url: _formio2.default.getBaseUrl() + '/project/' + project._id + '/token',
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
      return _formio2.default.logout().then(function () {
        _powerAssert2.default.equal(_formio2.default.getToken(), '', 'Logged out');
      });
    },
    mock: function mock() {
      return {
        url: _formio2.default.getBaseUrl() + '/logout',
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
  }];

  tests.forEach(testCapability);
});
describe('Formio.currentUser', function () {
  var plugin = null;
  beforeEach(function () {
    plugin = {
      wrapStaticRequestPromise: _sinon2.default.spy(function (promise, promiseArgs) {
        return promise;
      }),
      staticRequest: _sinon2.default.spy(function () {
        // Return dummy user
        var userId = generateID();
        return Promise.resolve({
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
    _formio2.default.registerPlugin(plugin, 'currentUserTestPlugin');
  });

  afterEach(function () {
    _formio2.default.deregisterPlugin(plugin);
  });

  it('Initial currentUser() should make static request', function (done) {
    // Force token
    _formio2.default.token = chance.string({ length: 30 });
    _formio2.default.currentUser().then(function () {
      _powerAssert2.default.ok(plugin.staticRequest.calledOnce, 'staticRequest should be called once');
      done();
    });
    _powerAssert2.default.ok(plugin.wrapStaticRequestPromise.calledOnce, 'wrapStaticRequestPromise should be called once');
  });

  it('Next currentUser() should return cached value', function (done) {
    // Clear token
    _formio2.default.currentUser().then(function () {
      _powerAssert2.default.ok(!plugin.staticRequest.called, 'staticRequest should not be called');
      done();
    });
    _powerAssert2.default.ok(plugin.wrapStaticRequestPromise.calledOnce, 'wrapStaticRequestPromise should be called once');
  });
});