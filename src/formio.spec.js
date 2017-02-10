'use strict';
import Formio from './formio';
import _each from 'lodash/each';
import assert from 'power-assert';
import sinon from 'sinon';
import Chance from 'chance';
import fetchMock from 'fetch-mock/es5/client';
import _ from 'lodash';

let chance = Chance();
let protocol = 'https';
let domain = 'localhost:3000';
let baseUrl = protocol + '://api.' + domain;
Formio.setBaseUrl(baseUrl);
Formio.setToken(null);

var generateID = function() {
  return chance.string({length: 24, pool: '0123456789abcdef'});
};

describe('Formio Constructor Tests', () => {
  it('Should allow a number of different URLs', () => {
    var tests = {};
    var addUrlTest = function(url, test) {
      tests[url] = test;
    };
    addUrlTest('http://form.io/project/234234234234/form/23234234234234', {
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
    });
    addUrlTest('http://form.io/form/23234234234234', {
      projectUrl: '',
      projectsUrl: 'http://form.io/project',
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
    });
    addUrlTest('http://form.io/form/23234234234234/submission/982398220983', {
      projectUrl: '',
      projectsUrl: 'http://form.io/project',
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
    });
    addUrlTest('http://form.io/form/23234234234234/action/234230987872', {
      projectUrl: '',
      projectsUrl: 'http://form.io/project',
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
    });
    addUrlTest('http://form.io/project/092934882/form/23234234234234/action/234230987872', {
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
    });
    addUrlTest('http://api.form.io/project/092934882', {
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
    });
    addUrlTest('http://form.io/project/092934882/form/23234234234234/submission/2987388987982', {
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
    });
    addUrlTest('http://form.io/project/092934882/form/23234234234234?test=hello&test2=there', {
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
    });
    addUrlTest('http://project.form.io/user/login', {
      projectUrl: 'http://project.form.io',
      projectsUrl: '',
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
    });
    addUrlTest('http://project.form.io/user/login/submission/234234243234', {
      projectUrl: 'http://project.form.io',
      projectsUrl: '',
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
    });
    addUrlTest('http://project.form.io/user/login/action/234234243234', {
      projectUrl: 'http://project.form.io',
      projectsUrl: '',
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
    });
    addUrlTest('http://project.form.io/user/login/action/234234243234?test=test2', {
      projectUrl: 'http://project.form.io',
      projectsUrl: '',
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
    }),
      addUrlTest('http://project.form.io/user/loginform/action/234234243234?test=test2', {
        projectUrl: 'http://project.form.io',
        projectsUrl: '',
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
      });
    addUrlTest('http://project.form.io/user/loginform/submission', {
      projectUrl: 'http://project.form.io',
      projectsUrl: '',
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
    });
    addUrlTest('http://project.form.io/user', {
      projectUrl: 'http://project.form.io',
      projectsUrl: '',
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
    });
    addUrlTest('http://project.form.io/user/actionform/submission/2342424234234', {
      projectUrl: 'http://project.form.io',
      projectsUrl: '',
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
    });
    addUrlTest('http://project.form.io/user/actionform/?test=foo', {
      projectUrl: 'http://project.form.io',
      projectsUrl: '',
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
    });
    addUrlTest(baseUrl + '/user/actionform/?test=foo', {
      projectUrl: baseUrl,
      projectsUrl: '',
      projectId: 'api',
      formsUrl: baseUrl + '/form',
      formUrl: baseUrl + '/user/actionform',
      formId: 'user/actionform',
      actionsUrl: baseUrl + '/user/actionform/action',
      actionUrl: '',
      actionId: '',
      submissionsUrl: baseUrl + '/user/actionform/submission',
      submissionUrl: '',
      submissionId: '',
      query: '?test=foo'
    });
    addUrlTest(baseUrl + '/user', {
      projectUrl: baseUrl,
      projectsUrl: '',
      projectId: 'api',
      formsUrl: baseUrl + '/form',
      formUrl: baseUrl + '/user',
      formId: 'user',
      actionsUrl: baseUrl + '/user/action',
      actionUrl: '',
      actionId: '',
      submissionsUrl: baseUrl + '/user/submission',
      submissionUrl: '',
      submissionId: '',
      query: ''
    });

    _each(tests, function(test, path) {
      var formio = new Formio(path);
      for (var param in test) {
        assert.equal(formio[param], test[param], param + ' must match.');
      }
    });
  });
});
describe('Plugins', () => {
  var plugin = null;
  beforeEach(() => {
    assert.equal(Formio.getPlugin('test-plugin'), undefined, 'No plugin may be returned under the name `test-plugin`');
    plugin = {init: sinon.spy()};
    Formio.registerPlugin(plugin, 'test-plugin');
    assert.ok(plugin.init.calledOnce, 'plugin.init must be called exactly once');
    assert.ok(plugin.init.calledOn(plugin), 'plugin.init must be called on plugin as `this`');
    assert.ok(plugin.init.calledWithExactly(Formio), 'plugin.init must be given Formio as argument');
    assert.equal(Formio.getPlugin('test-plugin'), plugin, 'getPlugin must return plugin');
  });

  afterEach(() => {
    assert.equal(Formio.getPlugin('test-plugin'), plugin, 'getPlugin must return plugin');
    plugin.deregister = sinon.spy();
    Formio.deregisterPlugin(plugin, 'test-plugin');
    assert.ok(plugin.deregister.calledOnce, 'plugin.deregister must be called exactly once');
    assert.ok(plugin.deregister.calledOn(plugin), 'plugin.deregister must be called on plugin as `this`');
    assert.ok(plugin.deregister.calledWithExactly(Formio), 'plugin.deregister must be given Formio as argument');
    assert.equal(Formio.getPlugin('test-plugin'), undefined, 'No plugin may be returned under the name `test-plugin`');
  });

  // Test a request to see if the plugin flow order is correct
  var testRequest = function testRequest(url, method, type) {
    var fnName;
    switch (method) {
      case 'GET': fnName = 'load' + _.capitalize(type); break;
      case 'POST':
      case 'PUT': fnName = 'save' + _.capitalize(type); break;
      case 'DELETE': fnName = 'delete' + _.capitalize(type); break;
    }

    it('Plugin ' + method + ' ' + fnName, function(done) {
      let step = 0;
      var formio = new Formio(url);
      method = method.toUpperCase();
      var testData = {testRequest: 'TEST_REQUEST'};
      var testOpts = {testOption: true};
      var testResult = {_id: 'TEST_ID', testResult: 'TEST_RESULT'};

      var expectedArgs = {
        formio: formio,
        type: type,
        method: method,
        url: formio[type + (method === 'POST' ? 'sUrl' : 'Url')],
        data: _.startsWith(fnName, 'save') ? testData : null,
        opts: testOpts
      };

      // Set up plugin hooks
      plugin.preRequest = function(requestArgs) {
        assert.equal(++step, 1, 'preRequest hook should be called first');
        assert.deepEqual(requestArgs, expectedArgs, 'Request hook arguments match expected arguments');
        return Promise.resolve()
          .then(function() {
            assert.equal(++step, 3, 'preRequest promise should resolve third');
            // TODO
          });
      };
      plugin.request = function(requestArgs) {
        assert.equal(++step, 4, 'request hook should be called fourth');
        assert.deepEqual(requestArgs, expectedArgs, 'Request hook arguments match expected arguments');
        return Promise.resolve()
          .then(function() {
            assert.equal(++step, 5, 'request promise should resolve fifth');
            return testResult;
          });
      };
      plugin.wrapRequestPromise = function(promise, requestArgs) {
        assert.equal(++step, 2, 'wrapRequestPromise hook should be called second');
        assert.deepEqual(requestArgs, expectedArgs, 'Request hook arguments match expected arguments');
        return promise.then(function(result) {
          assert.equal(++step, 6, 'wrapRequestPromise post-result promise should resolve sixth');
          assert.deepEqual(result, testResult, 'Result should match result from request hook');
          return result;
        });
      };

      var promise;
      if (_.startsWith(fnName, 'save')) {
        promise = formio[fnName](testData, testOpts);
      }
      else if (_.startsWith(fnName, 'load')) {
        promise = formio[fnName](null, testOpts);
      }
      else {
        promise = formio[fnName](testOpts);
      }
      promise.then(function(result) {
        assert.equal(++step, 7, 'post request promise should resolve last');
        assert.deepEqual(result, testResult, 'Result should match result from request hook');
        done();
      });
    });
  };

  var tests = [
    {
      url: 'https://api.localhost:3000/project/myproject',
      method: 'GET',
      type: 'project'
    },
    {
      url: '',
      method: 'POST',
      type: 'project'
    },
    {
      url: 'https://api.localhost:3000/project/myproject',
      method: 'PUT',
      type: 'project'
    },
    {
      url: 'https://api.localhost:3000/project/myproject',
      method: 'DELETE',
      type: 'project'
    },

    {
      url: 'https://api.localhost:3000/project/myproject/form/0123456789ABCDEF01234567',
      method: 'GET',
      type: 'form'
    },
    {
      url: 'https://api.localhost:3000/project/myproject',
      method: 'POST',
      type: 'form'
    },
    {
      url: 'https://api.localhost:3000/project/myproject/form/0123456789ABCDEF01234567',
      method: 'PUT',
      type: 'form'
    },
    {
      url: 'https://api.localhost:3000/project/myproject/form/0123456789ABCDEF01234567',
      method: 'DELETE',
      type: 'form'
    },
    {
      url: 'https://api.localhost:3000/project/myproject/',
      method: 'GET',
      type: 'forms'
    },

    {
      url: 'https://api.localhost:3000/project/myproject/form/0123456789ABCDEF01234567/submission/76543210FEDCBA9876543210',
      method: 'GET',
      type: 'submission'
    },
    {
      url: 'https://api.localhost:3000/project/myproject/form/0123456789ABCDEF01234567',
      method: 'POST',
      type: 'submission'
    },
    {
      url: 'https://api.localhost:3000/project/myproject/form/0123456789ABCDEF01234567/submission/76543210FEDCBA9876543210',
      method: 'PUT',
      type: 'submission'
    },
    {
      url: 'https://api.localhost:3000/project/myproject/form/0123456789ABCDEF01234567/submission/76543210FEDCBA9876543210',
      method: 'DELETE',
      type: 'submission'
    },
    {
      url: 'https://api.localhost:3000/project/myproject/form/0123456789ABCDEF01234567',
      method: 'GET',
      type: 'submissions'
    },

    {
      url: 'https://api.localhost:3000/project/myproject/form/0123456789ABCDEF01234567/action/76543210FEDCBA9876543210',
      method: 'GET',
      type: 'action'
    },
    {
      url: 'https://api.localhost:3000/project/myproject/form/0123456789ABCDEF01234567',
      method: 'POST',
      type: 'action'
    },
    {
      url: 'https://api.localhost:3000/project/myproject/form/0123456789ABCDEF01234567/action/76543210FEDCBA9876543210',
      method: 'PUT',
      type: 'action'
    },
    {
      url: 'https://api.localhost:3000/project/myproject/form/0123456789ABCDEF01234567/action/76543210FEDCBA9876543210',
      method: 'DELETE',
      type: 'action'
    },
    {
      url: 'https://api.localhost:3000/project/myproject/form/0123456789ABCDEF01234567',
      method: 'GET',
      type: 'actions'
    }
  ];

  tests.forEach(function(test) {
    testRequest(test.url, test.method, test.type);
  });

  var testStaticRequest = function testStaticRequest(fnName, url, method, data) {
    it('Plugin ' + fnName, function(done) {
      var step = 0;
      var testResult = {_id: 'TEST_ID', testResult: 'TEST_RESULT'};
      var expectedArgs = {
        url: url,
        method: method,
        data: data
      };

      // Set up plugin hooks
      plugin.preRequest = function(requestArgs) {
        assert.equal(++step, 1, 'preRequest hook should be called first');
        assert.deepEqual(requestArgs, expectedArgs, 'Request hook arguments match expected arguments');
        return Promise.resolve()
          .then(function() {
            assert.equal(++step, 3, 'preRequest promise should resolve third');
            // TODO
          });
      };
      plugin.staticRequest = function(requestArgs) {
        assert.equal(++step, 4, 'request hook should be called fourth');
        assert.deepEqual(requestArgs, expectedArgs, 'Request hook arguments match expected arguments');
        return Promise.resolve()
          .then(function() {
            assert.equal(++step, 5, 'request promise should resolve fifth');
            return testResult;
          });
      };
      plugin.wrapStaticRequestPromise = function(promise, requestArgs) {
        assert.equal(++step, 2, 'wrapRequestPromise hook should be called second');
        assert.deepEqual(requestArgs, expectedArgs, 'Request hook arguments match expected arguments');
        return promise.then(function(result) {
          assert.equal(++step, 6, 'wrapRequestPromise post-result promise should resolve sixth');
          assert.deepEqual(result, testResult, 'Result should match result from request hook');
          return result;
        });
      };

      Formio[fnName]()
        .then(function(result) {
          assert.equal(++step, 7, 'post request promise should resolve last');
          assert.deepEqual(result, testResult, 'Result should match result from request hook');
          done();
        });
    });
  };

  var staticTests = [
    {
      fnName: 'loadProjects',
      url: 'https://api.localhost:3000/project',
      method: 'GET',
      data: undefined
    },
    {
      fnName: 'logout',
      url: 'https://api.localhost:3000/logout',
      method: 'GET',
      data: undefined
    }
  ];

  staticTests.forEach(function(test) {
    testStaticRequest(test.fnName, test.url, test.method, test.type);
  });

  var testFileRequest = function testFileRequest(fnName, formUrl, args) {
    it('Plugin ' + fnName, function(done) {
      var step = 0;
      var testResult = {_id: 'TEST_ID', testResult: 'TEST_RESULT'};

      if (fnName == 'downloadFile') {
        var expectedArgs = {
          method: 'download',
          file: args[0]
        };
      }
      else if(fnName === 'uploadFile') {
        var expectedArgs = {
          provider: args[0],
          method: 'upload',
          file: args[1],
          fileName: args[2],
          dir: args[3]
        }
      }

      // Set up plugin hooks
      plugin.preRequest = function(requestArgs) {
        assert.equal(++step, 1, 'preRequest hook should be called first');
        assert.deepEqual(requestArgs, expectedArgs, 'Request hook arguments match expected arguments');
        return Promise.resolve()
          .then(function() {
            assert.equal(++step, 3, 'preRequest promise should resolve third');
            // TODO
          });
      };
      plugin.fileRequest = function(requestArgs) {
        assert.equal(++step, 4, 'request hook should be called fourth');
        assert.deepEqual(requestArgs, expectedArgs, 'Request hook arguments match expected arguments');
        return Promise.resolve()
          .then(function() {
            assert.equal(++step, 5, 'request promise should resolve fifth');
            return testResult;
          });
      };
      plugin.wrapFileRequestPromise = function(promise, requestArgs) {
        assert.equal(++step, 2, 'wrapFileRequestPromise hook should be called second');
        assert.deepEqual(requestArgs, expectedArgs, 'Request hook arguments match expected arguments');
        return promise.then(function(result) {
          assert.equal(++step, 6, 'wrapFileRequestPromise post-result promise should resolve sixth');
          assert.deepEqual(result, testResult, 'Result should match result from request hook');
          return result;
        });
      };

      var formio = new Formio(formUrl);
      formio[fnName].apply(null, args)
        .then(function(result) {
          assert.equal(++step, 7, 'post request promise should resolve last');
          assert.deepEqual(result, testResult, 'Result should match result from request hook');
          done();
        });
    });
  };

  var fileTests = [
    {
      fnName: 'uploadFile',
      formUrl: 'https://api.localhost:3000/project/123/form/123',
      args: [
        's3',
        'FILE',
        'file.jpg',
        'dir/'
      ]
    },
    {
      fnName: 'uploadFile',
      formUrl: 'https://api.localhost:3000/project/123/form/123',
      args: [
        'dropbox',
        'FILE',
        'file.jpg',
        'dir/'
      ]
    },
    {
      fnName: 'downloadFile',
      formUrl: 'https://api.localhost:3000/project/123/form/123',
      args: [
        {
          storage: 's3',
          name: 'test'
        }
      ]
    },
    {
      fnName: 'downloadFile',
      formUrl: 'https://api.localhost:3000/project/123/form/123',
      args: [
        {
          storage: 'dropbox',
          name: 'test'
        }
      ]
    }
  ];

  fileTests.forEach(function(test) {
    testFileRequest(test.fnName, test.formUrl, test.args);
  });
});
describe('Test Formio.js capabilities', () => {
  var testCapability = function(test) {
    it(test.name, function(done) {
      if (test.mock) {
        var mock = test.mock();
        if (mock instanceof Array) {
          _.each(mock, (_mock) => {
            fetchMock.mock(_mock.url, _mock.method, _mock.response);
          });
        }
        else {
          fetchMock.mock(mock.url, mock.method, mock.response);
        }
      }
      Promise.resolve()
        .then(function() {
          return test.test();
        })
        .then(function() {
          if (test.mock) fetchMock.restore();
          done();
        })
        .catch(function(err) {
          assert.equal(err, null, 'Caught error during test');
          if (err) console.error(err.stack);
          if (test.mock) fetchMock.restore();
          done();
        });
    });
  };

  var user;
  var userPassword;
  var userToken = chance.string({length: 450});
  var userFormId = generateID();
  var project;
  var form;
  var submission;

  var tests = [
    {
      name: 'Registering user.',
      test: function() {
        var req = {
          data: {
            'user.name': chance.string({
              length: 10,
              pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
            }),
            'user.email': chance.email(),
            'user.password': chance.string({length: 12})
          }
        };
        var formio = new Formio(Formio.getBaseUrl() + '/user/register');
        return formio.saveSubmission(req)
          .then(function(response) {
            assert.deepEqual(response, user, 'saveSubmission response should match test user');
            assert.equal(Formio.getToken(), userToken, 'Formio should save the user token');
          });
      },
      mock: function() {
        return [
          {
            url: Formio.getBaseUrl() + '/current',
            method: 'GET',
            response: function() {
              return {
                headers: {
                  'Content-Type': 'application/json',
                  'x-jwt-token': userToken
                },
                body: user
              };
            }
          },
          {
            url: Formio.getBaseUrl() + '/user/register/submission',
            method: 'POST',
            response: function(url, opts) {
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
          }
        ];
      }
    },
    {
      name: 'Logging in.',
      test: function() {
        var req = {
          data: {
            'user.email': user.data.email,
            'user.password': userPassword
          }
        };
        var formio = new Formio(Formio.getBaseUrl() + '/user/login');
        return formio.saveSubmission(req)
          .then(function(response) {
            assert.deepEqual(response, user, 'saveSubmission response should match test user');
            assert.equal(Formio.getToken(), userToken, 'Formio should save the user token');
          });
      },
      mock: function() {
        return {
          url: Formio.getBaseUrl() + '/user/login/submission',
          method: 'POST',
          response: function(url, opts) {
            var body = JSON.parse(opts.body);
            userToken = chance.string({length: 450});
            assert.equal(body.data['user.email'], user.data.email, 'Login email must be correct.');
            assert.equal(body.data['user.password'], userPassword, 'Login password must be correct.');
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
    },
    {
      name: 'Current user.',
      test: function() {
        return Formio.currentUser()
          .then(function(response) {
            assert.deepEqual(response, user, 'currentUser response should match test user');
            return Formio.currentUser();
          })
          .then(function(response) {
            assert.deepEqual(response, user, 'currentUser response should match test user');
          });
      },
      mock: function() {
        var called = false;
        return {
          url: Formio.getBaseUrl() + '/current',
          method: 'GET',
          response: function() {
            assert.ok(!called, 'User should be requested only once.');
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
    },
    {
      name: 'Create Project',
      test: function() {
        var formio = new Formio();
        var req = {
          title: chance.string({
            length: 10,
            pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
          }),
          name: chance.string({
            length: 10,
            pool: 'abcdefghijklmnopqrstuvwxyz'
          }),
          description: chance.paragraph({sentences: 1}),
          settings: {
            cors: '*'
          },
          template: 'http://help.form.io/templates/empty.json'
        };
        return formio.saveProject(req)
          .then(function(response) {
            assert.deepEqual(response, project, 'saveProject response should match test user');
          });
      },
      mock: function() {
        return {
          url: Formio.getBaseUrl() + '/project',
          method: 'POST',
          response: function(url, opts) {
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
    },
    {
      name: 'Getting Projects',
      test: function() {
        return Formio.loadProjects()
          .then(function(projects) {
            assert.equal(projects.length, 1, 'Should return only one project.');
            assert.equal(projects.skip, 0, 'skip should be 0.');
            assert.equal(projects.limit, 1, 'limit should be 1.');
            assert.equal(projects.serverCount, 1, 'serverCount should be 1.');
            assert.deepEqual(projects[0], project, 'Should match project');
          });
      },
      mock: function() {
        return {
          url: Formio.getBaseUrl() + '/project',
          method: 'GET',
          response: function() {
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
    },
    {
      name: 'Read Project',
      test: function() {
        var formio = new Formio(Formio.getBaseUrl() + '/project/' + project._id);
        return formio.loadProject()
          .then(function(response) {
            assert.deepEqual(response, project, 'Should match project');
          });
      },
      mock: function() {
        return {
          url: Formio.getBaseUrl() + '/project/' + project._id,
          method: 'GET',
          response: function() {
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
    },
    {
      name: 'Update Project',
      test: function() {
        var formio = new Formio('/project/' + project._id);
        var newProject = _.cloneDeep(project);
        newProject.name = chance.string({
          length: 10,
          pool: 'abcdefghijklmnopqrstuvwxyz'
        });
        newProject.title = chance.string({
          length: 10,
          pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        });
        newProject.description = chance.paragraph({sentences: 1});
        return formio.saveProject(newProject)
          .then(function(response) {
            assert.deepEqual(response, project, 'Project should match');
          });
      },
      mock: function() {
        return {
          url: Formio.getBaseUrl() + '/project/' + project._id,
          method: 'PUT',
          response: function(url, opts) {
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
    },
    {
      name: 'Create Form',
      test: function() {
        var formio = new Formio('/project/' + project._id + '/form');
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
          components: [
            {
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
            },
            {
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
            }
          ],
          type: 'form',
          access: [],
          submissionAccess: []
        };
        return formio.saveForm(req)
          .then(function(response) {
            assert.deepEqual(response, form, 'Form should match');
          });
      },
      mock: function() {
        return {
          url: Formio.getBaseUrl() + '/project/' + project._id + '/form',
          method: 'POST',
          response: function(url, opts) {
            var body = JSON.parse(opts.body);
            var formId = generateID();
            form = _.cloneDeep(body);
            _.assign(form, {
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
    },
    {
      name: 'Load Forms',
      test: function() {
        var formio = new Formio('/project/' + project._id + '/form');
        return formio.loadForms()
          .then(function(forms) {
            assert.equal(forms.length, 1, 'Should return only one form.');
            assert.equal(forms.skip, 0, 'skip should be 0.');
            assert.equal(forms.limit, 1, 'limit should be 1.');
            assert.equal(forms.serverCount, 1, 'serverCount should be 1.');
            assert.deepEqual(forms[0], form, 'Should match form');
          });
      },
      mock: function() {
        return {
          url: Formio.getBaseUrl() + '/project/' + project._id + '/form',
          method: 'GET',
          response: function() {
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
    },
    {
      name: 'Read Form',
      test: function() {
        var formio = new Formio('/project/' + project._id + '/form/' + form._id);
        return formio.loadForm()
          .then(function(response) {
            assert.deepEqual(response, form, 'Form should match');
          });
      },
      mock: function() {
        return {
          url: Formio.getBaseUrl() + '/project/' + project._id + '/form/' + form._id,
          method: 'GET',
          response: function() {
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
    },
    {
      name: 'Update Form',
      test: function() {
        var formio = new Formio('/project/' + project._id + '/form/' + form._id);
        var newForm = _.cloneDeep(form);
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
        return formio.saveForm(newForm)
          .then(function(response) {
            assert.deepEqual(response, form, 'Form should match');
          });
      },
      mock: function() {
        return {
          url: Formio.getBaseUrl() + '/project/' + project._id + '/form/' + form._id,
          method: 'PUT',
          response: function(url, opts) {
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
    },
    {
      name: 'Create Submission',
      test: function () {
        var formio = new Formio('/project/' + project._id + '/form/' + form._id + '/submission');
        var req = {
          data: {
            fieldLabel: chance.string()
          }
        };
        return formio.saveSubmission(req)
          .then(function(response) {
            assert.deepEqual(response, submission, 'Submission should match');
          });
      },
      mock: function() {
        return {
          url: Formio.getBaseUrl() + '/project/' + project._id + '/form/' + form._id + '/submission',
          method: 'POST',
          response: function(url, opts) {
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
    },
    {
      name: 'Load Submissions',
      test: function() {
        var formio = new Formio('/project/' + project._id + '/form/' + form._id + '/submission');
        return formio.loadSubmissions()
          .then(function(submissions) {
            assert.equal(submissions.length, 1, 'Should return only one submission.');
            assert.equal(submissions.skip, 0, 'skip should be 0.');
            assert.equal(submissions.limit, 1, 'limit should be 1.');
            assert.equal(submissions.serverCount, 1, 'serverCount should be 1.');
            assert.deepEqual(submissions[0], submission, 'Should match submission');
          });
      },
      mock: function() {
        return {
          url: Formio.getBaseUrl() + '/project/' + project._id + '/form/' + form._id + '/submission',
          method: 'GET',
          response: function() {
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
    },
    {
      name: 'Read Submission',
      test: function() {
        var formio = new Formio('/project/' + project._id + '/form/' + form._id + '/submission/' + submission._id);
        return formio.loadSubmission()
          .then(function(response) {
            assert.deepEqual(response, submission, 'Submission should match');
          });
      },
      mock: function() {
        return {
          url: Formio.getBaseUrl() + '/project/' + project._id + '/form/' + form._id + '/submission/' + submission._id,
          method: 'GET',
          response: function() {
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
    {
      name: 'Update Submission',
      test: function() {
        var formio = new Formio('/project/' + project._id + '/form/' + form._id + '/submission/' + submission._id);
        var newSubmission = _.cloneDeep(submission);
        newSubmission.data.fieldLabel = chance.string();
        return formio.saveSubmission(newSubmission)
          .then(function(response) {
            assert.deepEqual(response, submission, 'Submission should match');
          });
      },
      mock: function() {
        return {
          url: Formio.getBaseUrl() + '/project/' + project._id + '/form/' + form._id + '/submission/' + submission._id,
          method: 'PUT',
          response: function(url, opts) {
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
    {
      name: 'Update Submission without ID',
      test: function() {
        var formio = new Formio('/project/' + project._id + '/form/' + form._id);
        var newSubmission = _.cloneDeep(submission);
        newSubmission.data.fieldLabel = chance.string();
        return formio.saveSubmission(newSubmission)
          .then(function(response) {
            assert.deepEqual(response, submission, 'Submission should match');
          });
      },
      mock: function() {
        return {
          url: Formio.getBaseUrl() + '/project/' + project._id + '/form/' + form._id + '/submission/' + submission._id,
          method: 'PUT',
          response: function(url, opts) {
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
      test: function() {
        var formio = new Formio('/project/' + project._id + '/form/' + form._id + '/submission/' + submission._id);
        return formio.deleteSubmission()
          .then(function(response) {
            assert.equal(response, 'OK', 'Submission should be deleted.');
          });
      },
      mock: function() {
        return {
          url: Formio.getBaseUrl() + '/project/' + project._id + '/form/' + form._id + '/submission/' + submission._id,
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
    },
    {
      name: 'Delete Form',
      test: function() {
        var formio = new Formio('/project/' + project._id + '/form/' + form._id);
        return formio.deleteForm()
          .then(function(response) {
            assert.equal(response, 'OK', 'Submission should be deleted.');
          });
      },
      mock: function() {
        return {
          url: Formio.getBaseUrl() + '/project/' + project._id + '/form/' + form._id,
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
    },
    {
      name: 'Delete Project',
      test: function() {
        var formio = new Formio('/project/' + project._id);
        return formio.deleteProject()
          .then(function(response) {
            assert.equal(response, 'OK', 'Submission should be deleted.');
          });
      },
      mock: function() {
        return {
          url: Formio.getBaseUrl() + '/project/' + project._id,
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
    },
    {
      name: 'Getting Projects',
      test: function() {
        return Formio.loadProjects()
          .then(function(projects) {
            assert.equal(projects.length, 0, 'Should return no projects.');
            assert.equal(projects.skip, undefined, 'skip should be undefined.');
            assert.equal(projects.limit, undefined, 'limit should be undefined.');
            assert.equal(projects.serverCount, 0, 'serverCount should be 0.');
          });
      },
      mock: function() {
        return {
          url: Formio.getBaseUrl() + '/project',
          method: 'GET',
          response: function() {
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
    },
    {
      name: 'Logging Out',
      test: function() {
        return Formio.logout()
          .then(function() {
            assert.equal(Formio.getToken(), '', 'Logged out');
          });
      },
      mock: function() {
        return {
          url: Formio.getBaseUrl() + '/logout',
          method: 'GET',
          response: function() {
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
    }
  ];

  tests.forEach(testCapability);
});
describe('Formio.currentUser', () => {
  var plugin = null;
  beforeEach(function() {
    plugin = {
      wrapStaticRequestPromise: sinon.spy(function(promise, promiseArgs) {
        return promise;
      }),
      staticRequest: sinon.spy(function() {
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
    Formio.registerPlugin(plugin, 'currentUserTestPlugin');
  });

  afterEach(function() {
    Formio.deregisterPlugin(plugin);
  });

  it('Initial currentUser() should make static request', function(done) {
    // Force token
    Formio.token = chance.string({length: 30});
    Formio.currentUser()
      .then(function() {
        assert.ok(plugin.staticRequest.calledOnce, 'staticRequest should be called once');
        done();
      })
    assert.ok(plugin.wrapStaticRequestPromise.calledOnce, 'wrapStaticRequestPromise should be called once');
  });

  it('Next currentUser() should return cached value', function(done) {
    // Clear token
    Formio.currentUser()
      .then(function() {
        assert.ok(!plugin.staticRequest.called, 'staticRequest should not be called');
        done();
      })
    assert.ok(plugin.wrapStaticRequestPromise.calledOnce, 'wrapStaticRequestPromise should be called once');
  });
});
