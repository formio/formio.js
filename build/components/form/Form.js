'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _formio = require('../../formio.form');

var _formio2 = _interopRequireDefault(_formio);

var _utils = require('../../utils');

var _utils2 = _interopRequireDefault(_utils);

var _formio3 = require('../../formio');

var _formio4 = _interopRequireDefault(_formio3);

var _merge2 = require('lodash/merge');

var _merge3 = _interopRequireDefault(_merge2);

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormComponent = exports.FormComponent = function (_FormioForm) {
  _inherits(FormComponent, _FormioForm);

  function FormComponent(component, options, data) {
    _classCallCheck(this, FormComponent);

    // Ensure this component does not make it to the global forms array.
    var _this = _possibleConstructorReturn(this, (FormComponent.__proto__ || Object.getPrototypeOf(FormComponent)).call(this, null, options));

    delete _formio4.default.forms[_this.id];

    _this.type = 'formcomponent';
    _this.component = component;
    _this.submitted = false;
    _this.data = data;
    var srcOptions = {};

    // Make sure that if reference is provided, the form must submit.
    if (_this.component.reference) {
      _this.component.submit = true;
    }

    if (!component.src && !_this.options.formio && component.form) {
      component.src = _formio4.default.getBaseUrl();
      if (component.project) {
        // Check to see if it is a MongoID.
        if (_utils2.default.isMongoId(component.project)) {
          component.src += '/project';
        }
        component.src += '/' + component.project;
        srcOptions.project = component.src;
      }
      component.src += '/form/' + component.form;
    }

    // Build the source based on the root src path.
    if (!component.src && _this.options.formio) {
      var rootSrc = _this.options.formio.formsUrl;
      if (component.path) {
        var parts = rootSrc.split('/');
        parts.pop();
        component.src = parts.join('/') + '/' + component.path;
      }
      if (component.form) {
        component.src = rootSrc + '/' + component.form;
      }
    }

    // Add the source to this actual submission if the component is a reference.
    if (data[component.key] && _this.component.reference && component.src.indexOf('/submission/') === -1) {
      component.src += '/submission/' + data[component.key]._id;
    }

    // Set the src if the property is provided in the JSON.
    if (component.src) {
      _this.setSrc(component.src, srcOptions);
    }

    // Directly set the submission if it isn't a reference.
    if (data[component.key] && !_this.component.reference) {
      _this.setSubmission(data[component.key]);
    }

    _this.readyPromise = new Promise(function (resolve) {
      _this.readyResolve = resolve;
    });
    return _this;
  }

  _createClass(FormComponent, [{
    key: 'checkValidity',
    value: function checkValidity(data) {
      return _get(FormComponent.prototype.__proto__ || Object.getPrototypeOf(FormComponent.prototype), 'checkValidity', this).call(this, data[this.component.key] ? data[this.component.key].data : {});
    }
  }, {
    key: 'checkConditions',
    value: function checkConditions(data) {
      return _get(FormComponent.prototype.__proto__ || Object.getPrototypeOf(FormComponent.prototype), 'checkConditions', this).call(this, data[this.component.key] ? data[this.component.key].data : {});
    }
  }, {
    key: 'calculateValue',
    value: function calculateValue(data, flags) {
      return _get(FormComponent.prototype.__proto__ || Object.getPrototypeOf(FormComponent.prototype), 'calculateValue', this).call(this, data[this.component.key] ? data[this.component.key].data : {}, flags);
    }

    /**
     * Submit the form before the next page is triggered.
     */

  }, {
    key: 'beforeNext',
    value: function beforeNext() {
      // If we wish to submit the form on next page, then do that here.
      if (this.component.submit) {
        this.submitted = true;
        return this.submit(true);
      } else {
        return _get(FormComponent.prototype.__proto__ || Object.getPrototypeOf(FormComponent.prototype), 'beforeNext', this).call(this);
      }
    }

    /**
     * Submit the form before the whole form is triggered.
     */

  }, {
    key: 'beforeSubmit',
    value: function beforeSubmit() {
      var _this2 = this;

      // Ensure we submit the form.
      if (this.component.submit && !this.submitted) {
        return this.submit(true).then(function (submission) {
          // Before we submit, we need to filter out the references.
          _this2.data[_this2.component.key] = _this2.component.reference ? { _id: submission._id, form: submission.form } : submission;

          return _this2.data[_this2.component.key];
        });
      } else {
        return _get(FormComponent.prototype.__proto__ || Object.getPrototypeOf(FormComponent.prototype), 'beforeSubmit', this).call(this);
      }
    }
  }, {
    key: 'build',
    value: function build() {
      if (!this.element) {
        this.createElement();
        this.setElement(this.element);
      }

      // Iterate through every component and hide the submit button.
      _utils2.default.eachComponent(this.component.components, function (component) {
        if (component.type === 'button' && component.action === 'submit') {
          component.hidden = true;
        }
      });

      // Set the submission data.
      var submissionData = this.data[this.component.key] ? this.data[this.component.key].data : {};

      // Add components using the data of the submission.
      this.addComponents(this.element, submissionData);

      // Restore default values.
      this.restoreValue();

      // Set the value if it is not set already.
      if (!this.data[this.component.key]) {
        this.data[this.component.key] = { data: {} };
      }

      // Check conditions for this form.
      this.checkConditions(this.getValue());
    }
  }, {
    key: 'whenReady',
    value: function whenReady() {
      var _this3 = this;

      return this.ready.then(function () {
        return _this3.readyPromise;
      });
    }
  }, {
    key: 'setValue',
    value: function setValue(submission, flags) {
      var _this4 = this;

      flags = this.getFlags.apply(this, arguments);
      if (!submission) {
        this.data[this.component.key] = this._submission = { data: {} };
        this.readyResolve();
        return;
      }

      // Set the url of this form to the url for a submission if it exists.
      if (submission._id) {
        var submissionUrl = this.options.formio.formsUrl + '/' + submission.form + '/submission/' + submission._id;
        this.setUrl(submissionUrl, this.options);
        this.nosubmit = false;
      }

      if (!(0, _isEmpty3.default)(submission.data) || flags.noload) {
        (0, _merge3.default)(this.data[this.component.key], submission);
        var superValue = _get(FormComponent.prototype.__proto__ || Object.getPrototypeOf(FormComponent.prototype), 'setValue', this).call(this, submission, flags);
        this.readyResolve();
        return superValue;
      } else if (submission._id) {
        this.formio.submissionId = submission._id;
        this.formio.submissionUrl = this.formio.submissionsUrl + '/' + submission._id;
        this.formReady.then(function () {
          _this4._loading = false;
          _this4.loading = true;
          _this4.formio.loadSubmission().then(function (result) {
            _this4.loading = false;
            _this4.setValue(result, {
              noload: true
            });
          });
        });

        // Assume value has changed.
        return true;
      }
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.data[this.component.key];
    }
  }]);

  return FormComponent;
}(_formio2.default);