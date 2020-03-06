import Formio from './Formio';
import { fastCloneDeep } from './utils/utils';
import _each from 'lodash/each';
import assert from 'power-assert';
import sinon from 'sinon';
import Chance from 'chance';
import fetchMock from 'fetch-mock/es5/server';
import _ from 'lodash';
import NativePromise from 'native-promise-only';

const chance = Chance();
const protocol = 'https';
const domain = 'localhost:3000';
const baseUrl = `${protocol}://api.${domain}`;
Formio.setBaseUrl(baseUrl);
Formio.setToken(null);
Formio.fetch = fetchMock.fetchHandler;

const projectId = '59bbe2ec8c246100079191aa';
const formId = '59bbe2ec8c246100079191ab';
const submissionId = '59bbe2ec8c246100079191ac';
const actionId = '59bbe2ec8c246100079191ad';

const generateID = function() {
  return chance.string({ length: 24, pool: '0123456789abcdef' });
};

const runTests = function(fn, options) {
  const tests = {};
  const noBefore = fn(tests);
  if (!noBefore) {
    beforeEach(() => {
      Formio.setBaseUrl(baseUrl);
      Formio.projectUrlSet = false;
      Formio.projectUrl = 'https://api.form.io';
    });
  }
  _each(tests, (test, path) => {
    it(`Should initialize for ${path}`, (done) => {
      if (typeof test === 'function') {
        test();
      }
      else {
        const formio = new Formio(path, options);
        for (const param in test) {
          assert.equal(formio[param], test[param], `${param} is not equal. ${formio[param]} == ${test[param]}\n`);
        }
      }
      done();
    });
  });
};

describe('Formio.js Tests', () => {
  describe('Formio Constructor Tests', () => {
    runTests((tests) => {
      tests[`http://form.io/project/${  projectId  }/form/${  formId}`] = {
        projectUrl: `http://form.io/project/${  projectId}`,
        projectsUrl: 'http://form.io/project',
        projectId: projectId,
        formsUrl: `http://form.io/project/${  projectId  }/form`,
        formUrl: `http://form.io/project/${  projectId  }/form/${  formId}`,
        formId: formId,
        actionsUrl: `http://form.io/project/${  projectId  }/form/${  formId  }/action`,
        actionUrl: '',
        actionId: '',
        submissionsUrl: `http://form.io/project/${  projectId  }/form/${  formId  }/submission`,
        submissionUrl: '',
        submissionId: '',
        query: ''
      };
      tests[`http://form.io/form/${  formId}`] = {
        projectUrl: 'http://form.io',
        projectsUrl: `${baseUrl}/project`,
        projectId: '',
        formsUrl: 'http://form.io/form',
        formUrl: `http://form.io/form/${  formId}`,
        formId: formId,
        actionsUrl: `http://form.io/form/${  formId  }/action`,
        actionUrl: '',
        actionId: '',
        submissionsUrl: `http://form.io/form/${  formId  }/submission`,
        submissionUrl: '',
        submissionId: '',
        query: ''
      };
      tests[`http://form.io/form/${  formId  }/submission/${  submissionId}`] = {
        projectUrl: 'http://form.io',
        projectsUrl: `${baseUrl}/project`,
        projectId: '',
        formsUrl: 'http://form.io/form',
        formUrl: `http://form.io/form/${  formId}`,
        formId: formId,
        actionsUrl: `http://form.io/form/${  formId  }/action`,
        actionUrl: '',
        actionId: '',
        submissionsUrl: `http://form.io/form/${  formId  }/submission`,
        submissionUrl: `http://form.io/form/${  formId  }/submission/${  submissionId}`,
        submissionId: submissionId,
        query: ''
      };
      tests[`http://form.io/form/${  formId  }/action/${  actionId}`] = {
        projectUrl: 'http://form.io',
        projectsUrl: `${baseUrl}/project`,
        projectId: '',
        formsUrl: 'http://form.io/form',
        formUrl: `http://form.io/form/${  formId}`,
        formId: formId,
        actionsUrl: `http://form.io/form/${  formId  }/action`,
        actionUrl: `http://form.io/form/${  formId  }/action/${  actionId}`,
        actionId: actionId,
        submissionsUrl: `http://form.io/form/${  formId  }/submission`,
        submissionUrl: '',
        submissionId: '',
        query: ''
      };
      tests[`http://form.io/project/${  projectId  }/form/${  formId  }/action/${  actionId}`] = {
        projectUrl: `http://form.io/project/${  projectId}`,
        projectsUrl: 'http://form.io/project',
        projectId: projectId,
        formsUrl: `http://form.io/project/${  projectId  }/form`,
        formUrl: `http://form.io/project/${  projectId  }/form/${  formId}`,
        formId: formId,
        actionsUrl: `http://form.io/project/${  projectId  }/form/${  formId  }/action`,
        actionUrl: `http://form.io/project/${  projectId  }/form/${  formId  }/action/${  actionId}`,
        actionId: actionId,
        submissionsUrl: `http://form.io/project/${  projectId  }/form/${  formId  }/submission`,
        submissionUrl: '',
        submissionId: '',
        query: ''
      };
      tests[`http://api.form.io/project/${  projectId}`] = {
        projectUrl: `http://api.form.io/project/${  projectId}`,
        projectsUrl: 'http://api.form.io/project',
        projectId: projectId,
        formsUrl: `http://api.form.io/project/${  projectId  }/form`,
        formUrl: '',
        formId: '',
        actionsUrl: `http://api.form.io/project/${  projectId  }/action`,
        actionUrl: '',
        actionId: '',
        submissionsUrl: `http://api.form.io/project/${  projectId  }/submission`,
        submissionUrl: '',
        submissionId: '',
        query: ''
      };
      tests[`http://form.io/project/${  projectId  }/form/${  formId  }/submission/${  submissionId}`] = {
        projectUrl: `http://form.io/project/${  projectId}`,
        projectsUrl: 'http://form.io/project',
        projectId: projectId,
        formsUrl: `http://form.io/project/${  projectId  }/form`,
        formUrl: `http://form.io/project/${  projectId  }/form/${  formId}`,
        formId: formId,
        actionsUrl: `http://form.io/project/${  projectId  }/form/${  formId  }/action`,
        actionUrl: '',
        actionId: '',
        submissionsUrl: `http://form.io/project/${  projectId  }/form/${  formId  }/submission`,
        submissionUrl: `http://form.io/project/${  projectId  }/form/${  formId  }/submission/${  submissionId}`,
        submissionId: submissionId,
        query: ''
      };
      tests[`http://form.io/project/${  projectId  }/form/${  formId  }?test=hello&test2=there`] = {
        projectUrl: `http://form.io/project/${  projectId}`,
        projectsUrl: 'http://form.io/project',
        projectId: projectId,
        formsUrl: `http://form.io/project/${  projectId  }/form`,
        formUrl: `http://form.io/project/${  projectId  }/form/${  formId}`,
        formId: formId,
        actionsUrl: `http://form.io/project/${  projectId  }/form/${  formId  }/action`,
        actionUrl: '',
        actionId: '',
        submissionsUrl: `http://form.io/project/${  projectId  }/form/${  formId  }/submission`,
        submissionUrl: '',
        submissionId: '',
        query: '?test=hello&test2=there'
      };
      tests['http://project.form.io/user/login'] = {
        projectUrl: 'http://project.form.io',
        projectsUrl: `${baseUrl}/project`,
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
      tests[`http://project.form.io/user/login/submission/${  submissionId}`] = {
        projectUrl: 'http://project.form.io',
        projectsUrl: `${baseUrl}/project`,
        projectId: 'project',
        formsUrl: 'http://project.form.io/form',
        formUrl: 'http://project.form.io/user/login',
        formId: 'user/login',
        actionsUrl: 'http://project.form.io/user/login/action',
        actionUrl: '',
        actionId: '',
        submissionsUrl: 'http://project.form.io/user/login/submission',
        submissionUrl: `http://project.form.io/user/login/submission/${  submissionId}`,
        submissionId: submissionId,
        query: ''
      };
      tests[`http://project.form.io/user/login/action/${  actionId}`] = {
        projectUrl: 'http://project.form.io',
        projectsUrl: `${baseUrl}/project`,
        projectId: 'project',
        formsUrl: 'http://project.form.io/form',
        formUrl: 'http://project.form.io/user/login',
        formId: 'user/login',
        actionsUrl: 'http://project.form.io/user/login/action',
        actionUrl: `http://project.form.io/user/login/action/${  actionId}`,
        actionId: actionId,
        submissionsUrl: 'http://project.form.io/user/login/submission',
        submissionUrl: '',
        submissionId: '',
        query: ''
      };
      tests[`http://project.form.io/user/login/action/${  actionId  }?test=test2`] = {
        projectUrl: 'http://project.form.io',
        projectsUrl: `${baseUrl}/project`,
        projectId: 'project',
        formsUrl: 'http://project.form.io/form',
        formUrl: 'http://project.form.io/user/login',
        formId: 'user/login',
        actionsUrl: 'http://project.form.io/user/login/action',
        actionUrl: `http://project.form.io/user/login/action/${  actionId}`,
        actionId: actionId,
        submissionsUrl: 'http://project.form.io/user/login/submission',
        submissionUrl: '',
        submissionId: '',
        query: '?test=test2'
      };
      tests[`http://project.form.io/user/loginform/action/${  actionId  }?test=test2`] = {
        projectUrl: 'http://project.form.io',
        projectsUrl: `${baseUrl}/project`,
        projectId: 'project',
        formsUrl: 'http://project.form.io/form',
        formUrl: 'http://project.form.io/user/loginform',
        formId: 'user/loginform',
        actionsUrl: 'http://project.form.io/user/loginform/action',
        actionUrl: `http://project.form.io/user/loginform/action/${  actionId}`,
        actionId: actionId,
        submissionsUrl: 'http://project.form.io/user/loginform/submission',
        submissionUrl: '',
        submissionId: '',
        query: '?test=test2'
      };
      tests['http://project.form.io/user/loginform/submission'] = {
        projectUrl: 'http://project.form.io',
        projectsUrl: `${baseUrl}/project`,
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
        projectsUrl: `${baseUrl}/project`,
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
      tests[`http://project.form.io/user/actionform/submission/${  submissionId}`] = {
        projectUrl: 'http://project.form.io',
        projectsUrl: `${baseUrl}/project`,
        projectId: 'project',
        formsUrl: 'http://project.form.io/form',
        formUrl: 'http://project.form.io/user/actionform',
        formId: 'user/actionform',
        actionsUrl: 'http://project.form.io/user/actionform/action',
        actionUrl: '',
        actionId: '',
        submissionsUrl: 'http://project.form.io/user/actionform/submission',
        submissionUrl: `http://project.form.io/user/actionform/submission/${  submissionId}`,
        submissionId: submissionId,
        query: ''
      };
      tests['http://project.form.io/user/actionform/?test=foo'] = {
        projectUrl: 'http://project.form.io',
        projectsUrl: `${baseUrl}/project`,
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

  describe('Localhost Constructor Tests', () => {
    const testBaseUrl = 'localhost:3000';
    const projectName = 'myproject';
    const projectUrl = `${protocol}://${projectName}.${testBaseUrl}`;
    runTests((tests) => {
      tests[`${projectUrl}/user/actionform/?test=foo`] = {
        projectUrl: projectUrl,
        projectsUrl: `${baseUrl}/project`,
        projectId: projectName,
        formsUrl: `${projectUrl}/form`,
        formUrl: `${projectUrl}/user/actionform`,
        formId: 'user/actionform',
        actionsUrl: `${projectUrl}/user/actionform/action`,
        actionUrl: '',
        actionId: '',
        submissionsUrl: `${projectUrl}/user/actionform/submission`,
        submissionUrl: '',
        submissionId: '',
        query: '?test=foo'
      };
      tests[`${projectUrl}/user`] = {
        projectUrl: projectUrl,
        projectsUrl: `${baseUrl}/project`,
        projectId: projectName,
        formsUrl: `${projectUrl}/form`,
        formUrl: `${projectUrl}/user`,
        formId: 'user',
        actionsUrl: `${projectUrl}/user/action`,
        actionUrl: '',
        actionId: '',
        submissionsUrl: `${projectUrl}/user/submission`,
        submissionUrl: '',
        submissionId: '',
        query: ''
      };
    }, { base: baseUrl });
  });

  describe('Subdomain Constructor Tests', () => {
    const testBaseUrl = 'foo.blah.form.io';
    const projectName = 'myproject';
    const projectUrl = `${protocol}://${projectName}.${testBaseUrl}`;
    runTests((tests) => {
      tests[`${projectUrl}/user/actionform/?test=foo`] = {
        projectUrl: projectUrl,
        projectsUrl: `${baseUrl}/project`,
        projectId: projectName,
        formsUrl: `${projectUrl}/form`,
        formUrl: `${projectUrl}/user/actionform`,
        formId: 'user/actionform',
        actionsUrl: `${projectUrl}/user/actionform/action`,
        actionUrl: '',
        actionId: '',
        submissionsUrl: `${projectUrl}/user/actionform/submission`,
        submissionUrl: '',
        submissionId: '',
        query: '?test=foo'
      };
      tests[`${projectUrl}/user`] = {
        projectUrl: projectUrl,
        projectsUrl: `${baseUrl}/project`,
        projectId: projectName,
        formsUrl: `${projectUrl}/form`,
        formUrl: `${projectUrl}/user`,
        formId: 'user',
        actionsUrl: `${projectUrl}/user/action`,
        actionUrl: '',
        actionId: '',
        submissionsUrl: `${projectUrl}/user/submission`,
        submissionUrl: '',
        submissionId: '',
        query: ''
      };
    }, { base: baseUrl });
  });

  describe('Subdirectory Constructor Tests', () => {
    const testBaseUrl = 'foo.blah.form.io';
    const projectName = 'myproject';
    const projectUrl = `${protocol}://${testBaseUrl}/${projectName}`;
    runTests((tests) => {
      tests[`${projectUrl}/user/actionform/?test=foo`] = {
        projectUrl: projectUrl,
        projectsUrl: `${protocol}://${testBaseUrl}/project`,
        projectId: projectName,
        formsUrl: `${projectUrl}/form`,
        formUrl: `${projectUrl}/user/actionform`,
        formId: 'user/actionform',
        actionsUrl: `${projectUrl}/user/actionform/action`,
        actionUrl: '',
        actionId: '',
        submissionsUrl: `${projectUrl}/user/actionform/submission`,
        submissionUrl: '',
        submissionId: '',
        query: '?test=foo'
      };
      tests[`${projectUrl}/user`] = {
        projectUrl: projectUrl,
        projectsUrl: `${protocol}://${testBaseUrl}/project`,
        projectId: projectName,
        formsUrl: `${projectUrl}/form`,
        formUrl: `${projectUrl}/user`,
        formId: 'user',
        actionsUrl: `${projectUrl}/user/action`,
        actionUrl: '',
        actionId: '',
        submissionsUrl: `${projectUrl}/user/submission`,
        submissionUrl: '',
        submissionId: '',
        query: ''
      };
      tests[projectUrl] = {
        projectUrl: projectUrl,
        projectsUrl: `${protocol}://${testBaseUrl}/project`,
        projectId: projectName,
        formsUrl: `${projectUrl}/form`,
        formUrl: '',
        formId: '',
        actionsUrl: `${projectUrl}/action`,
        actionUrl: '',
        actionId: '',
        submissionsUrl: `${projectUrl}/submission`,
        submissionUrl: '',
        submissionId: '',
        query: ''
      };
    }, { base: `${protocol}://${testBaseUrl}` });
  });

  describe('Simple Form Constructor Tests', () => {
    runTests((tests) => {
      tests['init'] = () => {
        Formio.setBaseUrl('https://api.form.io');
        Formio.projectUrlSet = false;
        Formio.projectUrl = 'https://api.form.io';
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

  describe('Open Source Constructor Tests', () => {
    const formBaseUrl = 'http://localhost:3000';
    runTests((tests) => {
      tests[`${formBaseUrl}/user`] = {
        projectUrl: formBaseUrl,
        projectsUrl: '',
        projectId: '',
        formsUrl: `${formBaseUrl}/form`,
        formUrl: `${formBaseUrl}/user`,
        formId: 'user',
        actionsUrl: `${formBaseUrl}/user/action`,
        actionUrl: '',
        actionId: '',
        submissionsUrl: `${formBaseUrl}/user/submission`,
        submissionUrl: '',
        submissionId: '',
        query: ''
      };
      tests[`${formBaseUrl}/user/actionform/?test=foo`] = {
        projectUrl: formBaseUrl,
        projectsUrl: '',
        projectId: '',
        formsUrl: `${formBaseUrl}/form`,
        formUrl: `${formBaseUrl}/user/actionform`,
        formId: 'user/actionform',
        actionsUrl: `${formBaseUrl}/user/actionform/action`,
        actionUrl: '',
        actionId: '',
        submissionsUrl: `${formBaseUrl}/user/actionform/submission`,
        submissionUrl: '',
        submissionId: '',
        query: '?test=foo'
      };
    }, { base: formBaseUrl, project: formBaseUrl });
  });

  describe('Plugins', () => {
    let plugin = null;
    beforeEach(() => {
      assert.equal(Formio.getPlugin('test-plugin'), undefined, 'No plugin may be returned under the name `test-plugin`');
      plugin = { init: sinon.spy() };
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
    const testRequest = function testRequest(url, method, type) {
      let fnName;
      switch (method) {
        case 'GET': fnName = `load${_.capitalize(type)}`; break;
        case 'POST':
        case 'PUT': fnName = `save${_.capitalize(type)}`; break;
        case 'DELETE': fnName = `delete${_.capitalize(type)}`; break;
      }

      it(`Plugin ${method} ${fnName}`, (done) => {
        let step = 0;
        const formio = new Formio(url);
        method = method.toUpperCase();
        const testData = { testRequest: 'TEST_REQUEST' };
        const testOpts = { testOption: true };
        const testResult = { _id: 'TEST_ID', testResult: 'TEST_RESULT' };

        const expectedArgs = {
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
          return NativePromise.resolve()
            .then(() => {
              assert.equal(++step, 3, 'preRequest promise should resolve third');
              // TODO
            });
        };
        plugin.request = function(requestArgs) {
          assert.equal(++step, 4, 'request hook should be called fourth');
          assert.deepEqual(requestArgs, expectedArgs, 'Request hook arguments match expected arguments');
          return NativePromise.resolve()
            .then(() => {
              assert.equal(++step, 5, 'request promise should resolve fifth');
              return testResult;
            });
        };
        plugin.wrapRequestPromise = function(promise, requestArgs) {
          assert.equal(++step, 2, 'wrapRequestPromise hook should be called second');
          assert.deepEqual(requestArgs, expectedArgs, 'Request hook arguments match expected arguments');
          return promise.then((result) => {
            assert.equal(++step, 6, 'wrapRequestPromise post-result promise should resolve sixth');
            assert.deepEqual(result, testResult, 'Result should match result from request hook');
            return result;
          });
        };

        let promise;
        if (_.startsWith(fnName, 'save')) {
          promise = formio[fnName](testData, testOpts);
        }
        else if (_.startsWith(fnName, 'load')) {
          promise = formio[fnName](null, testOpts);
        }
        else {
          promise = formio[fnName](testOpts);
        }
        promise.then((result) => {
          assert.equal(++step, 7, 'post request promise should resolve last');
          assert.deepEqual(result, testResult, 'Result should match result from request hook');
          done();
        });
      });
    };

    const tests = [
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

    tests.forEach((test) => {
      testRequest(test.url, test.method, test.type);
    });

    const testStaticRequest = function testStaticRequest(fnName, url, method) {
      it(`Plugin ${fnName}`, (done) => {
        let step = 0;
        const testResult = { _id: 'TEST_ID', testResult: 'TEST_RESULT' };
        const expectedArgs = {
          url: url,
          method: method,
          data: null,
          opts: {}
        };

        // Set up plugin hooks
        plugin.preRequest = function(requestArgs) {
          assert.equal(++step, 1, 'preRequest hook should be called first');
          assert.deepEqual(requestArgs, expectedArgs, 'Request hook arguments match expected arguments');
          return NativePromise.resolve()
            .then(() => {
              assert.equal(++step, 3, 'preRequest promise should resolve third');
              // TODO
            });
        };
        plugin.staticRequest = function(requestArgs) {
          assert.equal(++step, 4, 'request hook should be called fourth');
          assert.deepEqual(requestArgs, expectedArgs, 'Request hook arguments match expected arguments');
          return NativePromise.resolve()
            .then(() => {
              assert.equal(++step, 5, 'request promise should resolve fifth');
              return testResult;
            });
        };
        plugin.wrapStaticRequestPromise = function(promise, requestArgs) {
          assert.equal(++step, 2, 'wrapRequestPromise hook should be called second');
          assert.deepEqual(requestArgs, expectedArgs, 'Request hook arguments match expected arguments');
          return promise.then((result) => {
            assert.equal(++step, 6, 'wrapRequestPromise post-result promise should resolve sixth');
            assert.deepEqual(result, testResult, 'Result should match result from request hook');
            return result;
          });
        };

        Formio[fnName]()
          .then((result) => {
            assert.equal(++step, 7, 'post request promise should resolve last');
            assert.deepEqual(result, testResult, 'Result should match result from request hook');
            done();
          });
      });
    };

    const staticTests = [
      {
        fnName: 'loadProjects',
        url: 'https://api.localhost:3000/project',
        method: 'GET'
      },
      {
        fnName: 'logout',
        url: 'https://api.localhost:3000/logout',
        method: 'GET'
      }
    ];

    staticTests.forEach((test) => {
      testStaticRequest(test.fnName, test.url, test.method, test.type);
    });

    const testFileRequest = function testFileRequest(fnName, formUrl, args) {
      it(`Plugin ${fnName}`, (done) => {
        let step = 0;
        const testResult = { _id: 'TEST_ID', testResult: 'TEST_RESULT' };
        let expectedArgs;

        if (fnName === 'downloadFile') {
          expectedArgs = {
            method: 'download',
            file: args[0]
          };
        }
        else if (fnName === 'uploadFile') {
          expectedArgs = {
            provider: args[0],
            method: 'upload',
            file: args[1],
            fileName: args[2],
            dir: args[3]
          };
        }

        // Set up plugin hooks
        plugin.preRequest = function(requestArgs) {
          assert.equal(++step, 1, 'preRequest hook should be called first');
          assert.deepEqual(requestArgs, expectedArgs, 'Request hook arguments match expected arguments');
          return NativePromise.resolve()
            .then(() => {
              assert.equal(++step, 3, 'preRequest promise should resolve third');
              // TODO
            });
        };
        plugin.fileRequest = function(requestArgs) {
          assert.equal(++step, 4, 'request hook should be called fourth');
          assert.deepEqual(requestArgs, expectedArgs, 'Request hook arguments match expected arguments');
          return NativePromise.resolve()
            .then(() => {
              assert.equal(++step, 5, 'request promise should resolve fifth');
              return testResult;
            });
        };
        plugin.wrapFileRequestPromise = function(promise, requestArgs) {
          assert.equal(++step, 2, 'wrapFileRequestPromise hook should be called second');
          assert.deepEqual(requestArgs, expectedArgs, 'Request hook arguments match expected arguments');
          return promise.then((result) => {
            assert.equal(++step, 6, 'wrapFileRequestPromise post-result promise should resolve sixth');
            assert.deepEqual(result, testResult, 'Result should match result from request hook');
            return result;
          });
        };

        const formio = new Formio(formUrl);
        formio[fnName].apply(null, args)
          .then((result) => {
            assert.equal(++step, 7, 'post request promise should resolve last');
            assert.deepEqual(result, testResult, 'Result should match result from request hook');
            done();
          });
      });
    };

    const fileTests = [
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

    fileTests.forEach((test) => {
      testFileRequest(test.fnName, test.formUrl, test.args);
    });
  });

  describe('Test Formio.js capabilities', () => {
    const testCapability = function(test) {
      it(test.name, (done) => {
        // need to clear Formio cache before every test, otherwise mock results might be ignored for same URLs
        Formio.clearCache();
        if (test.mock) {
          const mock = test.mock();
          if (mock instanceof Array) {
            _.each(mock, (_mock) => {
              fetchMock.mock(_mock.url, _mock.response, { method: _mock.method });
            });
          }
          else {
            fetchMock.mock(mock.url, mock.response, { method: mock.method });
          }
        }
        NativePromise.resolve()
          .then(() => {
            return test.test();
          })
          .then(() => {
            if (test.mock) {
              fetchMock.restore();
            }
            done();
          })
          .catch((err) => {
            if (test.mock) {
              fetchMock.restore();
            }
            done(typeof err === 'string' ? new Error(err) : err);
          });
      });
    };

    let user;
    let userPassword;
    let userToken = chance.string({ length: 450 });
    const userFormId = generateID();
    let project;
    let form;
    let submission;

    const tests = [
      {
        name: 'Registering user.',
        test() {
          const req = {
            data: {
              'user.name': chance.string({
                length: 10,
                pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
              }),
              'user.email': chance.email(),
              'user.password': chance.string({ length: 12 })
            }
          };
          Formio.setProjectUrl(Formio.getBaseUrl());
          const formio = new Formio(`${Formio.getBaseUrl()}/user/register`);
          return formio.saveSubmission(req)
            .then((response) => {
              assert.deepEqual(response, user, 'saveSubmission response should match test user');
              assert.equal(Formio.getToken(), userToken, 'Formio should save the user token');
            });
        },
        mock() {
          return [
            {
              url: `${Formio.getBaseUrl()}/current`,
              method: 'GET',
              response() {
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
              url: `${Formio.getBaseUrl()}/user/register/submission`,
              method: 'POST',
              response(url, opts) {
                const body = JSON.parse(opts.body);
                const userId = generateID();
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
        test() {
          const req = {
            data: {
              'user.email': user.data.email,
              'user.password': userPassword
            }
          };
          const formio = new Formio(`${Formio.getBaseUrl()}/user/login`);
          return formio.saveSubmission(req)
            .then((response) => {
              assert.deepEqual(response, user, 'saveSubmission response should match test user');
              assert.equal(Formio.getToken(), userToken, 'Formio should save the user token');
            });
        },
        mock() {
          return {
            url: `${Formio.getBaseUrl()}/user/login/submission`,
            method: 'POST',
            response(url, opts) {
              const body = JSON.parse(opts.body);
              userToken = chance.string({ length: 450 });
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
        test() {
          return Formio.currentUser()
            .then((response) => {
              assert.deepEqual(response, user, 'currentUser response should match test user');
              return Formio.currentUser();
            })
            .then((response) => {
              assert.deepEqual(response, user, 'currentUser response should match test user');
            });
        },
        mock() {
          let called = false;
          return {
            url: `${Formio.getBaseUrl()}/current`,
            method: 'GET',
            response() {
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
        test() {
          const formio = new Formio();
          const req = {
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
          return formio.saveProject(req)
            .then((response) => {
              assert.deepEqual(response, project, 'saveProject response should match test user');
            });
        },
        mock() {
          return {
            url: `${Formio.getBaseUrl()}/project`,
            method: 'POST',
            response(url, opts) {
              const body = JSON.parse(opts.body);
              const projectId = generateID();
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
        test() {
          return Formio.loadProjects()
            .then((projects) => {
              assert.equal(projects.length, 1, 'Should return only one project.');
              assert.equal(projects.skip, 0, 'skip should be 0.');
              assert.equal(projects.limit, 1, 'limit should be 1.');
              assert.equal(projects.serverCount, 1, 'serverCount should be 1.');
              assert.deepEqual(projects[0], project, 'Should match project');
            });
        },
        mock() {
          return {
            url: `${Formio.getBaseUrl()}/project`,
            method: 'GET',
            response() {
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
        test() {
          const formio = new Formio(`${Formio.getBaseUrl()}/project/${project._id}`);
          return formio.loadProject()
            .then((response) => {
              assert.deepEqual(response, project, 'Should match project');
            });
        },
        mock() {
          return {
            url: `${Formio.getBaseUrl()}/project/${project._id}`,
            method: 'GET',
            response() {
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
        test() {
          const formio = new Formio(`/project/${project._id}`);
          const newProject = fastCloneDeep(project);
          newProject.name = chance.string({
            length: 10,
            pool: 'abcdefghijklmnopqrstuvwxyz'
          });
          newProject.title = chance.string({
            length: 10,
            pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
          });
          newProject.description = chance.paragraph({ sentences: 1 });
          return formio.saveProject(newProject)
            .then((response) => {
              assert.deepEqual(response, project, 'Project should match');
            });
        },
        mock() {
          return {
            url: `${Formio.getBaseUrl()}/project/${project._id}`,
            method: 'PUT',
            response(url, opts) {
              const body = JSON.parse(opts.body);
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
        test() {
          const formio = new Formio(`/project/${project._id}/form`);
          const req = {
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
            .then((response) => {
              assert.deepEqual(response, form, 'Form should match');
            });
        },
        mock() {
          return {
            url: `${Formio.getBaseUrl()}/project/${project._id}/form`,
            method: 'POST',
            response(url, opts) {
              const body = JSON.parse(opts.body);
              const formId = generateID();
              form = fastCloneDeep(body);
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
        test() {
          const formio = new Formio(`/project/${project._id}/form`);
          return formio.loadForms()
            .then((forms) => {
              assert.equal(forms.length, 1, 'Should return only one form.');
              assert.equal(forms.skip, 0, 'skip should be 0.');
              assert.equal(forms.limit, 1, 'limit should be 1.');
              assert.equal(forms.serverCount, 1, 'serverCount should be 1.');
              assert.deepEqual(forms[0], form, 'Should match form');
            });
        },
        mock() {
          return {
            url: `${Formio.getBaseUrl()}/project/${project._id}/form`,
            method: 'GET',
            response() {
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
        test() {
          const formio = new Formio(`/project/${project._id}/form/${form._id}`);
          return formio.loadForm()
            .then((response) => {
              assert.deepEqual(response, form, 'Form should match');
            });
        },
        mock() {
          return {
            url: `${Formio.getBaseUrl()}/project/${project._id}/form/${form._id}`,
            method: 'GET',
            response() {
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
        test() {
          const formio = new Formio(`/project/${project._id}/form/${form._id}`);
          const newForm = fastCloneDeep(form);
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
            .then((response) => {
              assert.deepEqual(response, form, 'Form should match');
            });
        },
        mock() {
          return {
            url: `${Formio.getBaseUrl()}/project/${project._id}/form/${form._id}`,
            method: 'PUT',
            response(url, opts) {
              const body = JSON.parse(opts.body);
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
        test() {
          const formio = new Formio(`/project/${project._id}/form/${form._id}/submission`);
          const req = {
            data: {
              fieldLabel: chance.string()
            }
          };
          return formio.saveSubmission(req)
            .then((response) => {
              assert.deepEqual(response, submission, 'Submission should match');
            });
        },
        mock() {
          return {
            url: `${Formio.getBaseUrl()}/project/${project._id}/form/${form._id}/submission`,
            method: 'POST',
            response(url, opts) {
              const body = JSON.parse(opts.body);
              const submissionId = generateID();
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
        test() {
          const formio = new Formio(`/project/${project._id}/form/${form._id}/submission`);
          return formio.loadSubmissions()
            .then((submissions) => {
              assert.equal(submissions.length, 1, 'Should return only one submission.');
              assert.equal(submissions.skip, 0, 'skip should be 0.');
              assert.equal(submissions.limit, 1, 'limit should be 1.');
              assert.equal(submissions.serverCount, 1, 'serverCount should be 1.');
              assert.deepEqual(submissions[0], submission, 'Should match submission');
            });
        },
        mock() {
          return {
            url: `${Formio.getBaseUrl()}/project/${project._id}/form/${form._id}/submission`,
            method: 'GET',
            response() {
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
        test() {
          const formio = new Formio(`/project/${project._id}/form/${form._id}/submission/${submission._id}`);
          return formio.loadSubmission()
            .then((response) => {
              assert.deepEqual(response, submission, 'Submission should match');
            });
        },
        mock() {
          return {
            url: `${Formio.getBaseUrl()}/project/${project._id}/form/${form._id}/submission/${submission._id}`,
            method: 'GET',
            response() {
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
        test() {
          const formio = new Formio(`/project/${project._id}/form/${form._id}/submission/${submission._id}`);
          const newSubmission = fastCloneDeep(submission);
          newSubmission.data.fieldLabel = chance.string();
          return formio.saveSubmission(newSubmission)
            .then((response) => {
              assert.deepEqual(response, submission, 'Submission should match');
            });
        },
        mock() {
          return {
            url: `${Formio.getBaseUrl()}/project/${project._id}/form/${form._id}/submission/${submission._id}`,
            method: 'PUT',
            response(url, opts) {
              const body = JSON.parse(opts.body);
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
        test() {
          const formio = new Formio(`/project/${project._id}/form/${form._id}`);
          const newSubmission = fastCloneDeep(submission);
          newSubmission.data.fieldLabel = chance.string();
          return formio.saveSubmission(newSubmission)
            .then((response) => {
              assert.deepEqual(response, submission, 'Submission should match');
            });
        },
        mock() {
          return {
            url: `${Formio.getBaseUrl()}/project/${project._id}/form/${form._id}/submission/${submission._id}`,
            method: 'PUT',
            response(url, opts) {
              const body = JSON.parse(opts.body);
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
        test() {
          const formio = new Formio(`/project/${project._id}/form/${form._id}/submission/${submission._id}`);
          return formio.deleteSubmission()
            .then((response) => {
              assert.equal(response, 'OK', 'Submission should be deleted.');
            });
        },
        mock() {
          return {
            url: `${Formio.getBaseUrl()}/project/${project._id}/form/${form._id}/submission/${submission._id}`,
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
        test() {
          const formio = new Formio(`/project/${project._id}/form/${form._id}`);
          return formio.deleteForm()
            .then((response) => {
              assert.equal(response, 'OK', 'Submission should be deleted.');
            });
        },
        mock() {
          return {
            url: `${Formio.getBaseUrl()}/project/${project._id}/form/${form._id}`,
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
        test() {
          const formio = new Formio(`/project/${project._id}`);
          return formio.deleteProject()
            .then((response) => {
              assert.equal(response, 'OK', 'Submission should be deleted.');
            });
        },
        mock() {
          return {
            url: `${Formio.getBaseUrl()}/project/${project._id}`,
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
        test() {
          return Formio.loadProjects()
            .then((projects) => {
              assert.equal(projects.length, 0, 'Should return no projects.');
              assert.equal(projects.skip, undefined, 'skip should be undefined.');
              assert.equal(projects.limit, undefined, 'limit should be undefined.');
              assert.equal(projects.serverCount, 0, 'serverCount should be 0.');
            });
        },
        mock() {
          return {
            url: `${Formio.getBaseUrl()}/project`,
            method: 'GET',
            response() {
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
        name: 'Temporary Token',
        test() {
          const formio = new Formio(`/project/${project._id}`);
          return formio.getTempToken(200, 'GET:/current').then((tempToken) => {
            assert.equal(tempToken, userToken);
          });
        },
        mock() {
          return {
            url: `${Formio.getBaseUrl()}/project/${project._id}/token`,
            method: 'GET',
            response() {
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
      },
      {
        name: 'Logging Out',
        test() {
          return Formio.logout()
            .then(() => {
              assert.equal(Formio.getToken(), null, 'Logged out');
            });
        },
        mock() {
          return {
            url: `${Formio.getBaseUrl()}/logout`,
            method: 'GET',
            response() {
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
      },
      {
        name: 'userPermissions method should give create_all permission',
        test() {
          const user = {
            _id: 'test_user_id',
            roles: ['test_role_id']
          };

          const formio = new Formio(`${Formio.getBaseUrl()}/testform`);
          return formio.userPermissions(user)
            .then(permissions => {
              assert.equal(permissions.create, true);
              assert.equal(permissions.edit, false);
              assert.equal(permissions.delete, false);
              assert.equal(permissions.read, false);
            });
        },
        mock() {
          return [
            {
              url: `${Formio.getBaseUrl()}/testform`,
              method: 'GET',
              response() {
                return {
                  status: 200,
                  body: {
                    submissionAccess: [
                      {
                        type: 'create_all',
                        roles: ['test_role_id']
                      }
                    ]
                  },
                };
              }
            },
            {
              url: `${Formio.getBaseUrl()}/access`,
              method: 'GET',
              response() {
                return {
                  status: 200,
                  body: {
                    roles: []
                  }
                };
              }
            },
          ];
        }
      },
      {
        name: 'userPermissions method should give create_own permission',
        test() {
          const userId = 'test_user_id';
          const user = {
            _id: userId,
            roles: ['test_role_id']
          };
          const submission = {
            owner: userId
          };
          const formio = new Formio(`${Formio.getBaseUrl()}/testform`);
          return formio.userPermissions(user, undefined, submission)
            .then(permissions => {
              assert.equal(permissions.create, true);
              assert.equal(permissions.edit, false);
              assert.equal(permissions.read, false);
              assert.equal(permissions.delete, false);
            });
        },
        mock() {
          return [
            {
              url: `${Formio.getBaseUrl()}/testform`,
              method: 'GET',
              response() {
                return {
                  status: 200,
                  body: {
                    submissionAccess: [
                      {
                        type: 'create_own',
                        roles: ['test_role_id']
                      }
                    ]
                  },
                };
              }
            },
            {
              url: `${Formio.getBaseUrl()}/access`,
              method: 'GET',
              response() {
                return {
                  status: 200,
                  body: {
                    roles: []
                  }
                };
              }
            },
          ];
        }
      },
      {
        name: 'userPermissions method should give permissions for Anonymous role',
        test() {
          const user = {
            _id: false,
            roles: [],
          };
          const formio = new Formio(`${Formio.getBaseUrl()}/testform`);
          return formio.userPermissions(user)
            .then(permissions => {
              assert.equal(permissions.create, true);
              assert.equal(permissions.edit, false);
              assert.equal(permissions.read, false);
              assert.equal(permissions.delete, false);
            });
        },
        mock() {
          return [
            {
              url: `${Formio.getBaseUrl()}/testform`,
              method: 'GET',
              response() {
                return {
                  status: 200,
                  body: {
                    submissionAccess: [
                      {
                        type: 'create_all',
                        roles: ['test_anonymous_role_id']
                      }
                    ]
                  },
                };
              }
            },
            {
              url: `${Formio.getBaseUrl()}/access`,
              method: 'GET',
              response() {
                return {
                  status: 200,
                  body: {
                    roles: [
                      {
                        _id: 'test_anonymous_role_id',
                        default: true
                      }
                    ]
                  }
                };
              }
            },
          ];
        }
      },
      {
        name: 'userPermissions method should give all permissions for admin role',
        test() {
          const user = {
            roles: ['test_admin_role'],
          };
          const formio = new Formio(`${Formio.getBaseUrl()}/testform`);
          return formio.userPermissions(user)
            .then(permissions => {
              assert.equal(permissions.create, true);
              assert.equal(permissions.read, true);
              assert.equal(permissions.edit, true);
              assert.equal(permissions.delete, true);
            });
        },
        mock() {
          return [
            {
              url: `${Formio.getBaseUrl()}/testform`,
              method: 'GET',
              response() {
                return {
                  status: 200,
                  body: {
                    submissionAccess: []
                  },
                };
              }
            },
            {
              url: `${Formio.getBaseUrl()}/access`,
              method: 'GET',
              response() {
                return {
                  status: 200,
                  body: {
                    roles: [
                      {
                        _id: 'test_admin_role',
                        admin: true
                      }
                    ]
                  }
                };
              }
            },
          ];
        }
      },
      {
        name: 'userPermissions method should give only group read permission for `read` level',
        test() {
          const user = {
            roles: ['test_group_id'],
          };
          const submission = {
            data: {
              groupField: {
                _id: 'test_group_id'
              }
            }
          };
          const formio = new Formio(`${Formio.getBaseUrl()}/testform`);
          return formio.userPermissions(user, undefined, submission)
            .then(permissions => {
              assert.equal(permissions.create, false);
              assert.equal(permissions.read, true);
              assert.equal(permissions.edit, false);
              assert.equal(permissions.delete, false);
            });
        },
        mock() {
          return [
            {
              url: `${Formio.getBaseUrl()}/testform`,
              method: 'GET',
              response() {
                return {
                  status: 200,
                  body: {
                    submissionAccess: [],
                    components: [
                      {
                        defaultPermission: 'read',
                        key: 'groupField'
                      }
                    ]
                  },
                };
              }
            },
            {
              url: `${Formio.getBaseUrl()}/access`,
              method: 'GET',
              response() {
                return {
                  status: 200,
                  body: {
                    roles: []
                  }
                };
              }
            },
          ];
        }
      },
      {
        name: 'userPermissions method should give group read and create permissions for `create` level',
        test() {
          const user = {
            roles: ['test_group_id'],
          };
          const submission = {
            data: {
              groupField: {
                _id: 'test_group_id'
              }
            }
          };
          const formio = new Formio(`${Formio.getBaseUrl()}/testform`);
          return formio.userPermissions(user, undefined, submission)
            .then(permissions => {
              assert.equal(permissions.create, true);
              assert.equal(permissions.read, true);
              assert.equal(permissions.edit, false);
              assert.equal(permissions.delete, false);
            });
        },
        mock() {
          return [
            {
              url: `${Formio.getBaseUrl()}/testform`,
              method: 'GET',
              response() {
                return {
                  status: 200,
                  body: {
                    submissionAccess: [],
                    components: [
                      {
                        defaultPermission: 'create',
                        key: 'groupField'
                      }
                    ]
                  },
                };
              }
            },
            {
              url: `${Formio.getBaseUrl()}/access`,
              method: 'GET',
              response() {
                return {
                  status: 200,
                  body: {
                    roles: []
                  }
                };
              }
            },
          ];
        }
      },
      {
        name: 'userPermissions method should give group read, create and edit permissions for `write` level',
        test() {
          const user = {
            roles: ['test_group_id'],
          };
          const submission = {
            data: {
              groupField: {
                _id: 'test_group_id'
              }
            }
          };
          const formio = new Formio(`${Formio.getBaseUrl()}/testform`);
          return formio.userPermissions(user, undefined, submission)
            .then(permissions => {
              assert.equal(permissions.create, true);
              assert.equal(permissions.read, true);
              assert.equal(permissions.edit, true);
              assert.equal(permissions.delete, false);
            });
        },
        mock() {
          return [
            {
              url: `${Formio.getBaseUrl()}/testform`,
              method: 'GET',
              response() {
                return {
                  status: 200,
                  body: {
                    submissionAccess: [],
                    components: [
                      {
                        defaultPermission: 'write',
                        key: 'groupField'
                      }
                    ]
                  },
                };
              }
            },
            {
              url: `${Formio.getBaseUrl()}/access`,
              method: 'GET',
              response() {
                return {
                  status: 200,
                  body: {
                    roles: []
                  }
                };
              }
            },
          ];
        }
      },
      {
        name: 'userPermissions method should give all group permissions for `admin` level',
        test() {
          const user = {
            roles: ['test_group_id'],
          };
          const submission = {
            data: {
              groupField: {
                _id: 'test_group_id'
              }
            }
          };
          const formio = new Formio(`${Formio.getBaseUrl()}/testform`);
          return formio.userPermissions(user, undefined, submission)
            .then(permissions => {
              assert.equal(permissions.create, true);
              assert.equal(permissions.read, true);
              assert.equal(permissions.edit, true);
              assert.equal(permissions.delete, true);
            });
        },
        mock() {
          return [
            {
              url: `${Formio.getBaseUrl()}/testform`,
              method: 'GET',
              response() {
                return {
                  status: 200,
                  body: {
                    submissionAccess: [],
                    components: [
                      {
                        defaultPermission: 'admin',
                        key: 'groupField'
                      }
                    ]
                  },
                };
              }
            },
            {
              url: `${Formio.getBaseUrl()}/access`,
              method: 'GET',
              response() {
                return {
                  status: 200,
                  body: {
                    roles: []
                  }
                };
              }
            },
          ];
        }
      },
      {
        name: 'userPermissions method should handle submission with multiple groups',
        test() {
          const user1 = {
            roles: ['test_group_id1'],
          };
          const user2 = {
            roles: ['test_group_id2'],
          };
          const submission = {
            data: {
              groupField: [
                {
                  _id: 'test_group_id1'
                },
                {
                  _id: 'test_group_id2'
                }
              ]
            }
          };
          const formio = new Formio(`${Formio.getBaseUrl()}/testform`);
          return NativePromise.all([
            formio.userPermissions(user1, undefined, submission)
              .then(permissions => {
                assert.equal(permissions.create, false);
                assert.equal(permissions.read, true);
                assert.equal(permissions.edit, false);
                assert.equal(permissions.delete, false);
              }),
            formio.userPermissions(user2, undefined, submission)
              .then(permissions => {
                assert.equal(permissions.create, false);
                assert.equal(permissions.read, true);
                assert.equal(permissions.edit, false);
                assert.equal(permissions.delete, false);
              }),
          ]);
        },
        mock() {
          return [
            {
              url: `${Formio.getBaseUrl()}/testform`,
              method: 'GET',
              response() {
                return {
                  status: 200,
                  body: {
                    submissionAccess: [],
                    components: [
                      {
                        defaultPermission: 'read',
                        key: 'groupField'
                      }
                    ]
                  },
                };
              }
            },
            {
              url: `${Formio.getBaseUrl()}/access`,
              method: 'GET',
              response() {
                return {
                  status: 200,
                  body: {
                    roles: []
                  }
                };
              }
            },
          ];
        }
      },
    ];

    tests.forEach(testCapability);
  });

  describe('Formio.currentUser', () => {
    let plugin = null;
    beforeEach(() => {
      plugin = {
        wrapStaticRequestPromise: sinon.spy((promise) => promise),
        staticRequest: sinon.spy(() => {
          // Return dummy user
          const userId = generateID();
          return NativePromise.resolve({
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

    afterEach(() => {
      Formio.deregisterPlugin(plugin);
    });

    it('Initial currentUser() should make static request', (done) => {
      // Force token
      Formio.token = chance.string({ length: 30 });
      Formio.currentUser()
        .then(() => {
          assert.ok(plugin.staticRequest.calledOnce, 'staticRequest should be called once');
          done();
        });
      assert.ok(plugin.wrapStaticRequestPromise.calledOnce, 'wrapStaticRequestPromise should be called once');
    });

    it('Next currentUser() should return cached value', (done) => {
      // Clear token
      Formio.currentUser()
        .then(() => {
          assert.ok(!plugin.staticRequest.called, 'staticRequest should not be called');
          done();
        });
      assert.ok(plugin.wrapStaticRequestPromise.calledOnce, 'wrapStaticRequestPromise should be called once');
    });
  });
});
