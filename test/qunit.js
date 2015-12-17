Formio.setBaseUrl('https://api.form.io');

QUnit.module('URL capabilities', function() {
  var tests = {
    'http://form.io/project/234234234234/form/23234234234234': {
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
    },
    'http://form.io/form/23234234234234': {
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
    },
    'http://form.io/form/23234234234234/submission/982398220983': {
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
    },
    'http://form.io/form/23234234234234/action/234230987872': {
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
    },
    'http://form.io/project/092934882/form/23234234234234/action/234230987872': {
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
    },
    'http://api.form.io/project/092934882': {
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
    },
    'http://form.io/project/092934882/form/23234234234234/submission/2987388987982': {
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
    },
    'http://form.io/project/092934882/form/23234234234234?test=hello&test2=there': {
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
    },
    'http://project.form.io/user/login': {
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
    },
    'http://project.form.io/user/login/submission/234234243234': {
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
    },
    'http://project.form.io/user/login/action/234234243234': {
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
    },
    'http://project.form.io/user/login/action/234234243234?test=test2': {
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
    },
    'http://project.form.io/user/loginform/action/234234243234?test=test2': {
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
    },
    'http://project.form.io/user/loginform/submission': {
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
    },
    'http://project.form.io/user': {
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
    },
    'http://project.form.io/user/actionform/submission/2342424234234': {
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
    },
    'http://project.form.io/user/actionform/?test=foo': {
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
    }
  };

  _.each(tests, function(test, path) {
    QUnit.test('Test URL: ' + path, function(assert) {
      var formio = new Formio(path);
      for (var param in test) {
        console.log(path, param, formio[param], test[param]);
        assert.equal(formio[param], test[param], param + ' must match.');
      }
    });
  });
});


QUnit.module('Plugins', function(hooks) {
  var plugin;

  hooks.beforeEach(function(assert) {
    assert.equal(Formio.getPlugin('test-plugin'), undefined, 'No plugin may be returned under the name `test-plugin`');

    plugin = {
      init: sinon.spy()
    };

    Formio.registerPlugin(plugin, 'test-plugin');
    assert.ok(plugin.init.calledOnce, 'plugin.init must be called exactly once');
    assert.ok(plugin.init.calledOn(plugin), 'plugin.init must be called on plugin as `this`');
    assert.ok(plugin.init.calledWithExactly(Formio), 'plugin.init must be given Formio as argument');
    assert.equal(Formio.getPlugin('test-plugin'), plugin, 'getPlugin must return plugin');

  });

  hooks.afterEach(function(assert) {
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
    switch(method) {
      case 'GET': fnName = 'load' + _.capitalize(type); break;
      case 'POST':
      case 'PUT': fnName = 'save' + _.capitalize(type); break;
      case 'DELETE': fnName = 'delete' + _.capitalize(type); break;
    }

    QUnit.test('Plugin ' + method + ' ' + fnName, function(assert) {
      var done = assert.async();

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
        assert.step(1, 'preRequest hook should be called first');
        assert.deepEqual(requestArgs, expectedArgs, 'Request hook arguments match expected arguments');
        return Q()
        .then(function() {
          assert.step(3, 'preRequest promise should resolve third');
          // TODO
        });
      };
      plugin.request = function(requestArgs) {
        assert.step(4, 'request hook should be called fourth');
        assert.deepEqual(requestArgs, expectedArgs, 'Request hook arguments match expected arguments');
        return Q()
        .then(function() {
          assert.step(5, 'request promise should resolve fifth');
          return testResult;
        });
      };
      plugin.wrapRequestPromise = function(promise, requestArgs) {
        assert.step(2, 'wrapRequestPromise hook should be called second');
        assert.deepEqual(requestArgs, expectedArgs, 'Request hook arguments match expected arguments');
        return promise.then(function(result) {
          assert.step(6, 'wrapRequestPromise post-result promise should resolve sixth');
          assert.deepEqual(result, testResult, 'Result should match result from request hook');
          return result;
        });
      };

      var promise;
      if(_.startsWith(fnName, 'save')) {
        promise = formio[fnName](testData, testOpts);
      }
      else if(_.startsWith(fnName, 'load')) {
        promise = formio[fnName](null, testOpts);
      }
      else {
        promise = formio[fnName](testOpts);
      }
      promise.then(function(result) {
        assert.step(7, 'post request promise should resolve last');
        assert.deepEqual(result, testResult, 'Result should match result from request hook');
        done();
      });
    });
  };

  var tests = [
    {
      url: 'https://api.form.io/project/myproject',
      method: 'GET',
      type: 'project'
    },
    {
      url: '',
      method: 'POST',
      type: 'project'
    },
    {
      url: 'https://api.form.io/project/myproject',
      method: 'PUT',
      type: 'project'
    },
    {
      url: 'https://api.form.io/project/myproject',
      method: 'DELETE',
      type: 'project'
    },

    {
      url: 'https://api.form.io/project/myproject/form/0123456789ABCDEF01234567',
      method: 'GET',
      type: 'form'
    },
    {
      url: 'https://api.form.io/project/myproject',
      method: 'POST',
      type: 'form'
    },
    {
      url: 'https://api.form.io/project/myproject/form/0123456789ABCDEF01234567',
      method: 'PUT',
      type: 'form'
    },
    {
      url: 'https://api.form.io/project/myproject/form/0123456789ABCDEF01234567',
      method: 'DELETE',
      type: 'form'
    },
    {
      url: 'https://api.form.io/project/myproject/',
      method: 'GET',
      type: 'forms'
    },

    {
      url: 'https://api.form.io/project/myproject/form/0123456789ABCDEF01234567/submission/76543210FEDCBA9876543210',
      method: 'GET',
      type: 'submission'
    },
    {
      url: 'https://api.form.io/project/myproject/form/0123456789ABCDEF01234567',
      method: 'POST',
      type: 'submission'
    },
    {
      url: 'https://api.form.io/project/myproject/form/0123456789ABCDEF01234567/submission/76543210FEDCBA9876543210',
      method: 'PUT',
      type: 'submission'
    },
    {
      url: 'https://api.form.io/project/myproject/form/0123456789ABCDEF01234567/submission/76543210FEDCBA9876543210',
      method: 'DELETE',
      type: 'submission'
    },
    {
      url: 'https://api.form.io/project/myproject/form/0123456789ABCDEF01234567',
      method: 'GET',
      type: 'submissions'
    },

    {
      url: 'https://api.form.io/project/myproject/form/0123456789ABCDEF01234567/action/76543210FEDCBA9876543210',
      method: 'GET',
      type: 'action'
    },
    {
      url: 'https://api.form.io/project/myproject/form/0123456789ABCDEF01234567',
      method: 'POST',
      type: 'action'
    },
    {
      url: 'https://api.form.io/project/myproject/form/0123456789ABCDEF01234567/action/76543210FEDCBA9876543210',
      method: 'PUT',
      type: 'action'
    },
    {
      url: 'https://api.form.io/project/myproject/form/0123456789ABCDEF01234567/action/76543210FEDCBA9876543210',
      method: 'DELETE',
      type: 'action'
    },
    {
      url: 'https://api.form.io/project/myproject/form/0123456789ABCDEF01234567',
      method: 'GET',
      type: 'actions'
    }
  ]

  tests.forEach(function(test) {
    testRequest(test.url, test.method, test.type);
  });

  var testStaticRequest = function testStaticRequest(fnName, url, method, data) {
    QUnit.test('Plugin ' + fnName, function(assert) {
      var done = assert.async();

      var testResult = {_id: 'TEST_ID', testResult: 'TEST_RESULT'};

      var expectedArgs = {
        url: url,
        method: method,
        data: data,
      };

      // Set up plugin hooks
      plugin.preStaticRequest = function(requestArgs) {
        assert.step(1, 'preRequest hook should be called first');
        assert.deepEqual(requestArgs, expectedArgs, 'Request hook arguments match expected arguments');
        return Q()
        .then(function() {
          assert.step(3, 'preRequest promise should resolve third');
          // TODO
        });
      };
      plugin.staticRequest = function(requestArgs) {
        assert.step(4, 'request hook should be called fourth');
        assert.deepEqual(requestArgs, expectedArgs, 'Request hook arguments match expected arguments');
        return Q()
        .then(function() {
          assert.step(5, 'request promise should resolve fifth');
          return testResult;
        });
      };
      plugin.wrapStaticRequestPromise = function(promise, requestArgs) {
        assert.step(2, 'wrapRequestPromise hook should be called second');
        assert.deepEqual(requestArgs, expectedArgs, 'Request hook arguments match expected arguments');
        return promise.then(function(result) {
          assert.step(6, 'wrapRequestPromise post-result promise should resolve sixth');
          assert.deepEqual(result, testResult, 'Result should match result from request hook');
          return result;
        });
      };

      Formio[fnName]()
      .then(function(result) {
        assert.step(7, 'post request promise should resolve last');
        assert.deepEqual(result, testResult, 'Result should match result from request hook');
        done();
      });
    });
  }

  var staticTests = [
    {
      fnName: 'loadProjects',
      url: 'https://api.form.io/project',
      method: 'GET',
      data: undefined
    },
    {
      fnName: 'logout',
      url: 'https://api.form.io/logout',
      method: 'GET',
      data: undefined
    }
  ];

  staticTests.forEach(function(test) {
    testStaticRequest(test.fnName, test.url, test.method, test.type);
  });

});
