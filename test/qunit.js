/*global Formio: true, QUnit: true, chance: true, Promise: true, sinon: true, _: true, fetchMock: true*/
var protocol = 'https';
var domain = 'localhost:3000';
var baseUrl = protocol + '://api.' + domain;
Formio.setBaseUrl(baseUrl);
Formio.setToken(null);
QUnit.config.reorder = false;

var generateID = function() {
  return chance.string({length: 24, pool: '0123456789abcdef'});
};

QUnit.module('Base URL capabilities', function() {
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
});

QUnit.module('Localhost URL capabilities', function() {
  var tests = {};
  var addUrlTest = function(url, test) {
    tests[url] = test;
  };

  protocol = 'http://';
  testBaseUrl = 'localhost:3000';
  projectName = 'api';
  projectUrl = protocol + projectName + '.' + testBaseUrl;

  addUrlTest(projectUrl + '/user/actionform/?test=foo', {
    projectUrl: projectUrl,
    projectsUrl: '',
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
  });
  addUrlTest(projectUrl + '/user', {
    projectUrl: projectUrl,
    projectsUrl: '',
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
  });

  _.each(tests, function(test, path) {
    QUnit.test('Test URL: ' + path, function(assert) {
      Formio.setBaseUrl(protocol + testBaseUrl);
      var formio = new Formio(path);
      for (var param in test) {
        assert.equal(formio[param], test[param], param + ' must match.');
      }
    });
  });
});

QUnit.module('Subdomains URL capabilities', function() {
  var tests = {};
  var addUrlTest = function(url, test) {
    tests[url] = test;
  };

  // Test multiple subdomains.
  protocol = 'http://';
  testBaseUrl = 'foo.blah.form.io';
  projectName = 'myproject';
  projectUrl = protocol + projectName + '.' + testBaseUrl;

  addUrlTest(projectUrl + '/user/actionform/?test=foo', {
    projectUrl: projectUrl,
    projectsUrl: '',
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
  });
  addUrlTest(projectUrl + '/user', {
    projectUrl: projectUrl,
    projectsUrl: '',
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
  });

  _.each(tests, function(test, path) {
    QUnit.test('Test URL: ' + path, function(assert) {
      Formio.setBaseUrl(protocol + testBaseUrl);
      var formio = new Formio(path);
      for (var param in test) {
        assert.equal(formio[param], test[param], param + ' must match.');
      }
    });
  });

  projectUrl = protocol + testBaseUrl + '/' + projectName;

  addUrlTest(projectUrl + '/user/actionform/?test=foo', {
    projectUrl: projectUrl,
    projectsUrl: '',
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
  });
  addUrlTest(projectUrl + '/user', {
    projectUrl: projectUrl,
    projectsUrl: '',
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
  });

  _.each(tests, function(test, path) {
    QUnit.test('Test URL: ' + path, function(assert) {
      Formio.setBaseUrl(protocol + testBaseUrl);
      var formio = new Formio(path);
      for (var param in test) {
        assert.equal(formio[param], test[param], param + ' must match.');
      }
    });
  });
});

QUnit.module('Test Formio.js capabilities', function () {

  var testCapability = function(test) {
    QUnit.test(test.name, function(assert) {
      var done = assert.async();
      if (test.mock) {
        var mock = test.mock(assert);
        fetchMock.mock(mock.url, mock.method, mock.response);
      }
      Promise.resolve()
      .then(function() {
        return test.test(assert);
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
      test: function(assert) {
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
        return {
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
        };
      }
    },
    {
      name: 'Logging in.',
      test: function(assert) {
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
      mock: function(assert) {
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
      test: function(assert) {
        return Formio.currentUser()
        .then(function(response) {
          assert.deepEqual(response, user, 'currentUser response should match test user');
          return Formio.currentUser();
        })
        .then(function(response) {
          assert.deepEqual(response, user, 'currentUser response should match test user');
        });
      },
      mock: function(assert) {
        var called = false;
        return {
          url: Formio.getBaseUrl() + '/current',
          method: 'GET',
          response: function() {
            assert.notOk(called, 'User should be requested only once.');
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
      test: function(assert) {
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
      test: function(assert) {
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
      test: function(assert) {
        Formio.setBaseUrl(baseUrl);
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
      test: function(assert) {
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
      test: function(assert) {
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
      test: function(assert) {
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
      test: function(assert) {
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
      test: function(assert) {
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
      test: function (assert) {
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
      test: function(assert) {
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
      test: function(assert) {
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
      test: function(assert) {
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
      test: function(assert) {
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
      test: function(assert) {
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
      test: function(assert) {
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
      test: function(assert) {
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
      test: function(assert) {
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
      test: function(assert) {
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

QUnit.module('Formio.currentUser', function(hooks) {
  var plugin;

  hooks.beforeEach(function() {
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

  hooks.afterEach(function() {
    Formio.deregisterPlugin(plugin);
  });

  QUnit.test('Initial currentUser() should make static request', function(assert) {
    var done = assert.async();
    // Force token
    Formio.token = chance.string({length: 30});
    Formio.currentUser()
    .then(function() {
      assert.ok(plugin.staticRequest.calledOnce, 'staticRequest should be called once');
      done();
    })
    assert.ok(plugin.wrapStaticRequestPromise.calledOnce, 'wrapStaticRequestPromise should be called once');
  });

  QUnit.test('Next currentUser() should return cached value', function(assert) {
    var done = assert.async();
    // Clear token
    Formio.currentUser()
    .then(function() {
      assert.notOk(plugin.staticRequest.called, 'staticRequest should not be called');
      done();
    })
    assert.ok(plugin.wrapStaticRequestPromise.calledOnce, 'wrapStaticRequestPromise should be called once');
  });
})
