'use strict';
import Formio from './formio';
import _each from 'lodash/each';
import assert from 'power-assert';

let protocol = 'https';
let domain = 'localhost:3000';
let baseUrl = protocol + '://api.' + domain;

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
