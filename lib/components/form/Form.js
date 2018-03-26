'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _formio = require('../../formio.form');

var _formio2 = _interopRequireDefault(_formio);

var _utils = require('../../utils');

var _utils2 = _interopRequireDefault(_utils);

var _formio3 = require('../../formio');

var _formio4 = _interopRequireDefault(_formio3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormComponent = exports.FormComponent = function (_FormioForm) {
  _inherits(FormComponent, _FormioForm);

  function FormComponent(component, options, data) {
    _classCallCheck(this, FormComponent);

    data = data || {};

    // Ensure this component does not make it to the global forms array.
    var _this = _possibleConstructorReturn(this, (FormComponent.__proto__ || Object.getPrototypeOf(FormComponent)).call(this, null, options));

    delete _formio4.default.forms[_this.id];
    _this.type = 'formcomponent';
    _this.component = component;
    _this.submitted = false;
    _this.data = data;
    _this.readyPromise = new Promise(function (resolve) {
      _this.readyResolve = resolve;
    });
    return _this;
  }

  _createClass(FormComponent, [{
    key: 'loadSubForm',


    /**
     * Load the subform.
     */
    value: function loadSubForm() {
      // Only load the subform if the subform isn't loaded and the conditions apply.
      if (this.subFormLoaded || !_get(FormComponent.prototype.__proto__ || Object.getPrototypeOf(FormComponent.prototype), 'checkConditions', this).call(this, this.root ? this.root.data : this.data)) {
        return true;
      }
      this.subFormLoaded = true;
      var srcOptions = {};
      if (this.options && this.options.base) {
        srcOptions.base = this.options.base;
      }
      if (this.options && this.options.project) {
        srcOptions.project = this.options.project;
      }

      // Make sure that if reference is provided, the form must submit.
      if (this.component.reference) {
        this.component.submit = true;
      }

      if (!this.component.src && !this.options.formio && this.component.form) {
        this.component.src = _formio4.default.getBaseUrl();
        if (this.component.project) {
          // Check to see if it is a MongoID.
          if (_utils2.default.isMongoId(this.component.project)) {
            this.component.src += '/project';
          }
          this.component.src += '/' + this.component.project;
          srcOptions.project = this.component.src;
        }
        this.component.src += '/form/' + this.component.form;
      }

      // Build the source based on the root src path.
      if (!this.component.src && this.options.formio) {
        var rootSrc = this.options.formio.formsUrl;
        if (this.component.path) {
          var parts = rootSrc.split('/');
          parts.pop();
          this.component.src = parts.join('/') + '/' + this.component.path;
        }
        if (this.component.form) {
          this.component.src = rootSrc + '/' + this.component.form;
        }
      }

      // Add the source to this actual submission if the component is a reference.
      if (this.data && this.data[this.component.key] && this.data[this.component.key]._id && this.component.reference && !(this.component.src.indexOf('/submission/') !== -1)) {
        this.component.src += '/submission/' + this.data[this.component.key]._id;
      }

      // Set the src if the property is provided in the JSON.
      if (this.component.src) {
        this.setSrc(this.component.src, srcOptions);
      }

      // Directly set the submission if it isn't a reference.
      if (this.data && this.data[this.component.key] && !this.component.reference) {
        this.setSubmission(this.data[this.component.key]);
      }
    }
  }, {
    key: 'checkValidity',
    value: function checkValidity(data, dirty) {
      // Maintain isolated data scope when passing root data for validity checks.
      return _get(FormComponent.prototype.__proto__ || Object.getPrototypeOf(FormComponent.prototype), 'checkValidity', this).call(this, this.subData, dirty);
    }
  }, {
    key: 'checkConditions',
    value: function checkConditions() {
      if (this.subFormLoaded) {
        return _get(FormComponent.prototype.__proto__ || Object.getPrototypeOf(FormComponent.prototype), 'checkConditions', this).call(this, this.subData);
      }

      // Check the conditions against the component if the subform has not loaded.
      if (_get(FormComponent.prototype.__proto__ || Object.getPrototypeOf(FormComponent.prototype), 'checkConditions', this).call(this, this.root ? this.root.data : this.data)) {
        // Only load the subform if this component is visible.
        this.loadSubForm();
        return true;
      }

      return false;
    }
  }, {
    key: 'calculateValue',
    value: function calculateValue(data, flags) {
      // Maintain isolated data scope when calculating values.
      return _get(FormComponent.prototype.__proto__ || Object.getPrototypeOf(FormComponent.prototype), 'calculateValue', this).call(this, this.subData, flags);
    }

    /**
     * Submit the form before the next page is triggered.
     */

  }, {
    key: 'beforeNext',
    value: function beforeNext() {
      var _this2 = this;

      // If we wish to submit the form on next page, then do that here.
      if (this.component.submit) {
        this.submitted = true;
        return this.submit(true).then(function (submission) {
          // Set data to submission.
          _this2.dataValue = submission;
          return submission;
        });
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
      var _this3 = this;

      // Ensure we submit the form.
      if (this.component.submit && !this.submitted) {
        return this.submit(true).then(function (submission) {
          // Before we submit, we need to filter out the references.
          _this3.data[_this3.component.key] = _this3.component.reference ? {
            _id: submission._id,
            form: submission.form
          } : submission;
          return _this3.data[_this3.component.key];
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

      // Set the data for this form.
      if (!this.data[this.component.key]) {
        this.data[this.component.key] = this.defaultValue;
      }

      // Add components using the data of the submission.
      this.addComponents(this.element, this.data[this.component.key].data);

      // Restore default values.
      this.restoreValue();

      // Get the submission value.
      var submission = this.getValue();

      // Check conditions for this form.
      this.checkConditions(submission);

      // Check the data for default values.
      this.checkData(submission.data, {
        noValidate: true
      });
    }
  }, {
    key: 'whenReady',
    value: function whenReady() {
      var _this4 = this;

      return this.ready.then(function () {
        return _this4.readyPromise;
      });
    }
  }, {
    key: 'emit',
    value: function emit(event, data) {
      switch (event) {
        case 'submit':
          event = 'formComponentSubmit';
          break;
        case 'submitDone':
          event = 'formComponentSubmitDone';
          break;
        case 'formLoad':
          event = 'formComponentLoad';
          break;
        case 'render':
          event = 'formComponentRender';
          break;
      }

      _get(FormComponent.prototype.__proto__ || Object.getPrototypeOf(FormComponent.prototype), 'emit', this).call(this, event, data);
    }
  }, {
    key: 'setValue',
    value: function setValue(submission, flags) {
      var _this5 = this;

      flags = this.getFlags.apply(this, arguments);
      if (!submission) {
        this.dataValue = this._submission = this.emptyValue;
        this.readyResolve();
        return;
      }

      // Load the subform if we have data.
      if (submission._id || !_lodash2.default.isEmpty(this.dataValue)) {
        this.loadSubForm();
      }

      // Set the url of this form to the url for a submission if it exists.
      if (submission._id) {
        var submissionUrl = this.options.formio.formsUrl + '/' + submission.form + '/submission/' + submission._id;
        this.setUrl(submissionUrl, this.options);
        this.nosubmit = false;
      }

      if (submission._id && !flags.noload) {
        this.formio.submissionId = submission._id;
        this.formio.submissionUrl = this.formio.submissionsUrl + '/' + submission._id;
        this.formReady.then(function () {
          _this5._loading = false;
          _this5.loading = true;
          _this5.formio.loadSubmission().then(function (result) {
            _this5.loading = false;
            _this5.setValue(result, {
              noload: true
            });
          });
        });

        // Assume value has changed.
        return true;
      } else {
        var superValue = _get(FormComponent.prototype.__proto__ || Object.getPrototypeOf(FormComponent.prototype), 'setValue', this).call(this, submission, flags, this.dataValue.data);
        this.readyResolve();
        return superValue;
      }
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.dataValue;
    }
  }, {
    key: 'emptyValue',
    get: function get() {
      return { data: {} };
    }
  }, {
    key: 'subData',
    get: function get() {
      if (!this.data[this.component.key]) {
        this.data[this.component.key] = this.emptyValue;
      }
      return this.data[this.component.key].data;
    }
  }]);

  return FormComponent;
}(_formio2.default);