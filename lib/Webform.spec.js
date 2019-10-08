"use strict";

require("core-js/modules/es.string.trim");

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _chai = require("chai");

var _sinon = _interopRequireDefault(require("sinon"));

var _each = _interopRequireDefault(require("lodash/each"));

var _harness = _interopRequireDefault(require("../test/harness"));

var _forms = _interopRequireDefault(require("../test/forms"));

var _Formio = _interopRequireDefault(require("./Formio"));

var _Webform = _interopRequireDefault(require("./Webform"));

var _APIMock = require("../test/APIMock");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Formio Form Renderer tests', function () {
  var simpleForm = null;
  it('Should create a simple form', function (done) {
    var formElement = document.createElement('div');
    simpleForm = new _Webform.default(formElement);
    simpleForm.setForm({
      title: 'Simple Form',
      components: [{
        type: 'textfield',
        key: 'firstName',
        input: true
      }, {
        type: 'textfield',
        key: 'lastName',
        input: true
      }]
    }).then(function () {
      _harness.default.testElements(simpleForm, 'input[type="text"]', 2);

      _harness.default.testElements(simpleForm, 'input[name="data[firstName]"]', 1);

      _harness.default.testElements(simpleForm, 'input[name="data[lastName]"]', 1);

      done();
    }).catch(done);
  });
  it('Should set a submission to the form.', function () {
    _harness.default.testSubmission(simpleForm, {
      data: {
        firstName: 'Joe',
        lastName: 'Smith'
      }
    });
  });
  it('Should translate a form from options', function (done) {
    var formElement = document.createElement('div');
    var translateForm = new _Webform.default(formElement, {
      template: 'bootstrap3',
      language: 'es',
      i18n: {
        es: {
          'Default Label': 'Spanish Label'
        }
      }
    });
    translateForm.setForm({
      title: 'Translate Form',
      components: [{
        type: 'textfield',
        label: 'Default Label',
        key: 'myfield',
        input: true,
        inputType: 'text',
        validate: {}
      }]
    }).then(function () {
      var label = formElement.querySelector('.control-label');

      _powerAssert.default.equal(label.innerHTML.trim(), 'Spanish Label');

      done();
    }).catch(done);
  });
  it('Should translate a form after instantiate', function (done) {
    var formElement = document.createElement('div');
    var translateForm = new _Webform.default(formElement, {
      template: 'bootstrap3',
      i18n: {
        es: {
          'Default Label': 'Spanish Label'
        }
      }
    });
    translateForm.setForm({
      title: 'Translate Form',
      components: [{
        type: 'textfield',
        label: 'Default Label',
        key: 'myfield',
        input: true,
        inputType: 'text',
        validate: {}
      }]
    }).then(function () {
      translateForm.language = 'es';
      var label = formElement.querySelector('.control-label');

      _powerAssert.default.equal(label.innerHTML.trim(), 'Spanish Label');

      done();
    }).catch(done);
  });
  it('Should add a translation after instantiate', function (done) {
    var formElement = document.createElement('div');
    var translateForm = new _Webform.default(formElement, {
      template: 'bootstrap3',
      i18n: {
        language: 'es',
        es: {
          'Default Label': 'Spanish Label'
        },
        fr: {
          'Default Label': 'French Label'
        }
      }
    });
    translateForm.setForm({
      title: 'Translate Form',
      components: [{
        type: 'textfield',
        label: 'Default Label',
        key: 'myfield',
        input: true,
        inputType: 'text',
        validate: {}
      }]
    }).then(function () {
      translateForm.language = 'fr';
      var label = formElement.querySelector('.control-label');

      _powerAssert.default.equal(label.innerHTML.trim(), 'French Label');

      done();
    }).catch(done);
  });
  it('Should switch a translation after instantiate', function (done) {
    var formElement = document.createElement('div');
    var translateForm = new _Webform.default(formElement, {
      template: 'bootstrap3'
    });
    translateForm.setForm({
      title: 'Translate Form',
      components: [{
        type: 'textfield',
        label: 'Default Label',
        key: 'myfield',
        input: true,
        inputType: 'text',
        validate: {}
      }]
    }).then(function () {
      translateForm.addLanguage('es', {
        'Default Label': 'Spanish Label'
      }, true);
      var label = formElement.querySelector('.control-label');

      _powerAssert.default.equal(label.innerHTML.trim(), 'Spanish Label');

      done();
    }).catch(done);
  });
  it('Should keep translation after redraw', function (done) {
    var formElement = document.createElement('div');
    var form = new _Webform.default(formElement, {
      template: 'bootstrap3'
    });
    var schema = {
      title: 'Translate Form',
      components: [{
        type: 'textfield',
        label: 'Default Label',
        key: 'myfield',
        input: true,
        inputType: 'text',
        validate: {}
      }]
    };

    try {
      form.setForm(schema).then(function () {
        form.addLanguage('ru', {
          'Default Label': 'Russian Label'
        }, true);
        return form.language = 'ru';
      }, done).then(function () {
        (0, _chai.expect)(form.options.language).to.equal('ru');
        (0, _chai.expect)(formElement.querySelector('.control-label').innerHTML.trim()).to.equal('Russian Label');
        form.redraw();
        (0, _chai.expect)(form.options.language).to.equal('ru');
        (0, _chai.expect)(formElement.querySelector('.control-label').innerHTML.trim()).to.equal('Russian Label');
        done();
      }, done).catch(done);
    } catch (error) {
      done(error);
    }
  });
  it('Should fire languageChanged event when language is set', function (done) {
    var isLanguageChangedEventFired = false;
    var formElement = document.createElement('div');
    var form = new _Webform.default(formElement, {
      template: 'bootstrap3'
    });
    var schema = {
      title: 'Translate Form',
      components: [{
        type: 'textfield',
        label: 'Default Label',
        key: 'myfield',
        input: true,
        inputType: 'text',
        validate: {}
      }]
    };

    try {
      form.setForm(schema).then(function () {
        form.addLanguage('ru', {
          'Default Label': 'Russian Label'
        }, false);
        form.on('languageChanged', function () {
          isLanguageChangedEventFired = true;
        });
        return form.language = 'ru';
      }, done).then(function () {
        (0, _powerAssert.default)(isLanguageChangedEventFired);
        done();
      }, done).catch(done);
    } catch (error) {
      done(error);
    }
  });
  it('When submitted should strip fields with persistent: client-only from submission', function (done) {
    var formElement = document.createElement('div');
    simpleForm = new _Webform.default(formElement);
    /* eslint-disable quotes */

    simpleForm.setForm({
      title: 'Simple Form',
      components: [{
        "label": "Name",
        "allowMultipleMasks": false,
        "showWordCount": false,
        "showCharCount": false,
        "tableView": true,
        "type": "textfield",
        "input": true,
        "key": "name",
        "widget": {
          "type": ""
        }
      }, {
        "label": "Age",
        "persistent": "client-only",
        "mask": false,
        "tableView": true,
        "type": "number",
        "input": true,
        "key": "age"
      }]
    });
    /* eslint-enable quotes */

    _harness.default.testSubmission(simpleForm, {
      data: {
        name: 'noname',
        age: '1'
      }
    });

    simpleForm.submit().then(function (submission) {
      _powerAssert.default.deepEqual(submission.data, {
        name: 'noname'
      });

      done();
    });
  });
  describe('set/get nosubmit', function () {
    it('should set/get nosubmit flag and emit nosubmit event', function () {
      var form = new _Webform.default(null, {});

      var emit = _sinon.default.spy(form, 'emit');

      (0, _chai.expect)(form.nosubmit).to.be.false;
      form.nosubmit = true;
      (0, _chai.expect)(form.nosubmit).to.be.true;
      (0, _chai.expect)(emit.callCount).to.equal(1);
      (0, _chai.expect)(emit.args[0]).to.deep.equal(['nosubmit', true]);
      form.nosubmit = false;
      (0, _chai.expect)(form.nosubmit).to.be.false;
      (0, _chai.expect)(emit.callCount).to.equal(2);
      (0, _chai.expect)(emit.args[1]).to.deep.equal(['nosubmit', false]);
    });
  });
  (0, _each.default)(_forms.default, function (formTest) {
    (0, _each.default)(formTest.tests, function (formTestTest, title) {
      it(title, function (done) {
        var formElement = document.createElement('div');
        var form = new _Webform.default(formElement, {
          language: 'en',
          template: 'bootstrap3'
        });
        form.setForm(formTest.form).then(function () {
          formTestTest(form, done);
        }).catch(done);
      });
    });
  });
});
describe('Test the saveDraft and restoreDraft feature', function () {
  _APIMock.APIMock.submission('https://savedraft.form.io/myform', {
    components: [{
      type: 'textfield',
      key: 'a',
      label: 'A'
    }, {
      type: 'textfield',
      key: 'b',
      label: 'B'
    }]
  });

  var saveDraft = function saveDraft(user, draft, newData, done) {
    var formElement = document.createElement('div');
    var form = new _Webform.default(formElement, {
      saveDraft: true,
      saveDraftThrottle: false
    });
    form.src = 'https://savedraft.form.io/myform';

    _Formio.default.setUser(user);

    form.on('restoreDraft', function (existing) {
      _powerAssert.default.deepEqual(existing ? existing.data : null, draft);

      form.setSubmission({
        data: newData
      }, {
        modified: true
      });
    });
    form.on('saveDraft', function (saved) {
      // Make sure the modified class was added to the components.
      var a = form.getComponent('a');
      var b = form.getComponent('b');

      _powerAssert.default.equal(a.hasClass(a.getElement(), 'formio-modified'), true);

      _powerAssert.default.equal(b.hasClass(b.getElement(), 'formio-modified'), true);

      _powerAssert.default.deepEqual(saved.data, newData);

      form.draftEnabled = false;
      done();
    });
    form.formReady.then(function () {
      _powerAssert.default.equal(form.savingDraft, true);
    });
  };

  it('Should allow a user to start a save draft session.', function (done) {
    return saveDraft({
      _id: '1234',
      data: {
        firstName: 'Joe',
        lastName: 'Smith'
      }
    }, null, {
      a: 'one',
      b: 'two'
    }, done);
  });
  it('Should allow a different user to start a new draft session', function (done) {
    return saveDraft({
      _id: '2468',
      data: {
        firstName: 'Sally',
        lastName: 'Thompson'
      }
    }, null, {
      a: 'three',
      b: 'four'
    }, done);
  });
  it('Should restore a users existing draft', function (done) {
    return saveDraft({
      _id: '1234',
      data: {
        firstName: 'Joe',
        lastName: 'Smith'
      }
    }, {
      a: 'one',
      b: 'two'
    }, {
      a: 'five',
      b: 'six'
    }, done);
  });
});