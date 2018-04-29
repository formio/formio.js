'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Base = require('../base/Base');

var _nativePromiseOnly = require('native-promise-only');

var _nativePromiseOnly2 = _interopRequireDefault(_nativePromiseOnly);

var _utils = require('../../utils');

var _utils2 = _interopRequireDefault(_utils);

var _formio = require('../../formio');

var _formio2 = _interopRequireDefault(_formio);

var _formFactory = require('../../formFactory');

var _formFactory2 = _interopRequireDefault(_formFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormComponent = exports.FormComponent = function (_BaseComponent) {
  _inherits(FormComponent, _BaseComponent);

  function FormComponent(component, options, data) {
    _classCallCheck(this, FormComponent);

    var _this = _possibleConstructorReturn(this, (FormComponent.__proto__ || Object.getPrototypeOf(FormComponent)).call(this, component, options, data));

    _this.submitted = false;
    _this.subForm = null;
    _this.subData = { data: {} };
    _this.subFormReady = new _nativePromiseOnly2.default(function (resolve, reject) {
      _this.subFormReadyResolve = resolve;
      _this.subFormReadyReject = reject;
    });
    return _this;
  }

  _createClass(FormComponent, [{
    key: 'loadSubForm',


    /**
     * Load the subform.
     */
    value: function loadSubForm(submission) {
      var _this2 = this;

      // Only load the subform if the subform isn't loaded and the conditions apply.
      if (this.subFormLoaded || !_get(FormComponent.prototype.__proto__ || Object.getPrototypeOf(FormComponent.prototype), 'checkConditions', this).call(this, this.root ? this.root.data : this.data)) {
        return this.subFormReady;
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
        this.component.src = _formio2.default.getBaseUrl();
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

      var loadSubmission = false;
      // Add the source to this actual submission if the component is a reference.
      if (submission._id && this.component.reference && !(this.component.src.indexOf('/submission/') !== -1)) {
        this.component.src += '/submission/' + submission._id;
        loadSubmission = true;
      }

      new _formio2.default(this.component.src).loadForm({ params: { live: 1 } }).then(function (formObj) {
        // Iterate through every component and hide the submit button.
        _utils2.default.eachComponent(formObj.components, function (component) {
          if (component.type === 'button' && component.action === 'submit') {
            component.hidden = true;
          }
        });

        _this2.subForm = (0, _formFactory2.default)(_this2.element, formObj, srcOptions);
        _this2.dataValue.data = _this2.subForm.data;

        // Forward along changes to parent form.
        _this2.subForm.on('change', function () {
          return _this2.onChange();
        });
        _this2.subForm.url = _this2.component.src;
        _this2.subForm.nosubmit = false;
        if (loadSubmission) {
          _this2.subForm.loadSubmission();
        } else {
          _this2.subForm.setSubmission(submission);
        }
        _this2.subFormReadyResolve(_this2.subForm);
      }).catch(function (err) {
        return _this2.subFormReadyReject(err);
      });
      return this.subFormReady;
    }
  }, {
    key: 'checkValidity',
    value: function checkValidity(data, dirty) {
      if (this.subForm) {
        return this.subForm.checkValidity(this.dataValue.data, dirty);
      }

      return _get(FormComponent.prototype.__proto__ || Object.getPrototypeOf(FormComponent.prototype), 'checkValidity', this).call(this, data, dirty);
    }
  }, {
    key: 'checkConditions',
    value: function checkConditions(data) {
      if (this.subForm) {
        return this.subForm.checkConditions(this.dataValue.data);
      }

      if (_get(FormComponent.prototype.__proto__ || Object.getPrototypeOf(FormComponent.prototype), 'checkConditions', this).call(this, data)) {
        this.loadSubForm(this.dataValue);
        return true;
      }

      return false;
    }
  }, {
    key: 'calculateValue',
    value: function calculateValue(data, flags) {
      if (this.subForm) {
        return this.subForm.calculateValue(this.dataValue.data, flags);
      }

      return _get(FormComponent.prototype.__proto__ || Object.getPrototypeOf(FormComponent.prototype), 'calculateValue', this).call(this, data, flags);
    }

    /**
     * Submit the form before the next page is triggered.
     */

  }, {
    key: 'beforeNext',
    value: function beforeNext() {
      var _this3 = this;

      // If we wish to submit the form on next page, then do that here.
      if (this.subForm && this.component.submit && !this.submitted) {
        this.submitted = true;
        return this.subForm.submit(true).then(function (submission) {
          _this3.dataValue = submission;
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
      var _this4 = this;

      // Ensure we submit the form.
      if (this.subForm && this.component.submit && !this.submitted) {
        this.submitted = true;
        return this.subForm.submit(true).then(function (submission) {
          _this4.dataValue = _this4.component.reference ? {
            data: submission.data,
            _id: submission._id,
            form: submission.form
          } : submission;
          return _this4.dataValue;
        });
      } else {
        return _get(FormComponent.prototype.__proto__ || Object.getPrototypeOf(FormComponent.prototype), 'beforeSubmit', this).call(this);
      }
    }
  }, {
    key: 'build',
    value: function build() {
      this.createElement();
      this.restoreValue();
    }
  }, {
    key: 'setValue',
    value: function setValue(submission, flags) {
      var _this5 = this;

      if (submission && (submission._id || !_lodash2.default.isEmpty(submission.data))) {
        this.loadSubForm(submission).then(function (form) {
          if (submission._id && !flags.noload) {
            var submissionUrl = form.formio.formsUrl + '/' + submission.form + '/submission/' + submission._id;
            form.setSrc(submissionUrl, _this5.options);
          } else {
            form.setSubmission(submission);
          }
        });
      }
      this.subData = submission;
      return _get(FormComponent.prototype.__proto__ || Object.getPrototypeOf(FormComponent.prototype), 'updateValue', this).call(this, flags);
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.subData;
    }
  }, {
    key: 'emptyValue',
    get: function get() {
      return { data: {} };
    }
  }]);

  return FormComponent;
}(_Base.BaseComponent);