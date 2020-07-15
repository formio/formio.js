"use strict";

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.match");

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _EventEmitter = _interopRequireDefault(require("../../EventEmitter"));

var _powerAssert = _interopRequireDefault(require("power-assert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('TextField Builder', function () {
  var builder = null;
  before(function (done) {
    // Incrise Events limit for this tests set
    _harness.default.builderBefore(done, {
      editForm: {
        events: new _EventEmitter.default({
          wildcard: false,
          maxListeners: 0,
          loadLimit: 250,
          log: true
        })
      }
    });
  });
  after(function () {
    _harness.default.builderAfter();
  });
  it('Should create a new textfield component', function () {
    builder = _harness.default.buildComponent('textfield');
    return builder.editForm.formReady.then(function () {
      // Make sure default preview is correct.
      var preview = builder.componentPreview.innerHTML;
      (0, _powerAssert.default)(preview.indexOf('formio-component formio-component-textfield formio-component-textField') !== -1, 'Must have correct classes');
      (0, _powerAssert.default)(preview.indexOf('<label class="control-label" style="">Text Field</label>') !== -1, 'Must have a label');
      (0, _powerAssert.default)(preview.indexOf('<input name="data[textField]" type="text" class="form-control"') !== -1, 'Must have an input');
    });
  });
  it('Should allow you to change the label', function (done) {
    _harness.default.setComponentProperty('label', 'Text Field', 'First Name', function (preview) {
      (0, _powerAssert.default)(preview.match(/label.*input/), 'Label must be on top.');
      (0, _powerAssert.default)(preview.indexOf('<label class="control-label" style="">First Name</label>') !== -1, 'Must have a label');
      done();
    });
  });
  it('Should allow you to hide/show the label', function (done) {
    _harness.default.setComponentProperty('hideLabel', false, true, function (preview) {
      (0, _powerAssert.default)(preview.indexOf('<label class="control-label"') === -1, 'Must not have a label');

      _harness.default.setComponentProperty('hideLabel', true, false, function (preview) {
        (0, _powerAssert.default)(preview.indexOf('<label class="control-label"') !== -1, 'Must have a label');
        done();
      });
    });
  });
  it('Should allow you to change the label position', function (done) {
    _harness.default.setComponentProperty('labelPosition', 'top', 'bottom', function (preview) {
      (0, _powerAssert.default)(preview.match(/input.*label/), 'Label must be on bottom.');

      _harness.default.setComponentProperty('labelPosition', 'bottom', 'left-left', function (preview) {
        (0, _powerAssert.default)(preview.match(/label.*style=".*float: left; width: 30%; margin-right: 3%;.*input/), 'Label must be positioned on the left floated left');

        _harness.default.setComponentProperty('labelPosition', 'left-left', 'left-right', function (preview) {
          (0, _powerAssert.default)(preview.match(/label.*style=".*float: left; width: 30%; margin-right: 3%; text-align: right;.*input/), 'Label must be positioned on the left floated right');

          _harness.default.setComponentProperty('labelPosition', 'left-right', 'right-left', function (preview) {
            (0, _powerAssert.default)(preview.match(/label.*style=".*float: right; width: 30%; margin-left: 3%;.*input/), 'Label must be positioned on the right floated left');

            _harness.default.setComponentProperty('labelPosition', 'right-left', 'right-right', function (preview) {
              (0, _powerAssert.default)(preview.match(/label.*style=".*float: right; width: 30%; margin-left: 3%; text-align: right;.*input/), 'Label must be positioned on the right floated right');
              done();
            });
          });
        });
      });
    });
  });
  it('Should allow you to change the label width and margin', function (done) {
    _harness.default.setComponentProperty('labelPosition', 'right-right', 'top', function () {
      _harness.default.testVisibility(builder.editForm, '.formio-component-labelWidth', false);

      _harness.default.testVisibility(builder.editForm, '.formio-component-labelMargin', false);

      _harness.default.setComponentProperty('labelPosition', 'top', 'left-left', function () {
        _harness.default.testVisibility(builder.editForm, '.formio-component-labelWidth', true);

        _harness.default.testVisibility(builder.editForm, '.formio-component-labelMargin', true);

        _harness.default.setComponentProperty('labelWidth', 30, 20, function () {
          _harness.default.setComponentProperty('labelMargin', 3, 5, function (preview) {
            (0, _powerAssert.default)(preview.match(/label.*style=".*float: left; width: 20%; margin-right: 5%;.*input/), 'Label must be positioned on the left floated left');

            _harness.default.setComponentProperty('labelPosition', 'left-left', 'right-right', function (preview) {
              (0, _powerAssert.default)(preview.match(/label.*style=".*float: right; width: 20%; margin-left: 5%; text-align: right;.*input/), 'Label must be positioned on the right floated right');

              _harness.default.testVisibility(builder.editForm, '.formio-component-labelWidth', true);

              _harness.default.testVisibility(builder.editForm, '.formio-component-labelMargin', true);

              done();
            });
          });
        });
      });
    });
  });
  it('Should allow you to set the input mask', function (done) {
    _harness.default.testBuilderProperty('inputMask', '', '(999) 999-9999', null, function () {
      _powerAssert.default.equal(builder.preview.inputs[0].placeholder, '(___) ___-____');

      builder.preview.setValue('1234567890');

      _powerAssert.default.equal(builder.preview.inputs[0].value, '(123) 456-7890');

      _powerAssert.default.equal(builder.preview.getValue(), '(123) 456-7890');

      done();
    });
  });
  it('Should set the placeholder of the input', function (done) {
    _harness.default.setComponentProperty('labelPosition', 'right-right', 'top', function () {
      _harness.default.testBuilderProperty('placeholder', '', 'Enter something here', /input.*name="data\[firstName\].*placeholder="Enter something here"/, done);
    });
  });
  it('Should set the description of the input', function (done) {
    _harness.default.testBuilderProperty('description', '', 'This is a description', /input.*div.*class="help-block">This is a description<\/div>/, done);
  });
  it('Should set the tooltip of the input', function (done) {
    _harness.default.testBuilderProperty('tooltip', '', 'This is something you should fill out.', /label.*i.*class="glyphicon glyphicon-question-sign text-muted.*<\/label>/, function () {
      (0, _powerAssert.default)(builder.preview.tooltip, 'There should be a tooltip instance');
      builder.preview.tooltip.show();
      var toolTipText = builder.preview.element.querySelector('.tooltip-inner');

      _powerAssert.default.equal(toolTipText.innerHTML, 'This is something you should fill out.');

      done();
    });
  });
  it('Should set the prefix of the input', function (done) {
    _harness.default.testBuilderProperty('prefix', '', '$', /div class="input-group">.*<div class="input-group-addon">\$<\/div>.*input/, done);
  });
  it('Should set the suffix of the input', function (done) {
    _harness.default.testBuilderProperty('suffix', '', 'USD', /div class="input-group">.*input.*<div class="input-group-addon">USD<\/div>/, done);
  });
  it('Should set the custom css class of the input', function (done) {
    _harness.default.testBuilderProperty('customClass', '', 'custom-text-field', null, function () {
      (0, _powerAssert.default)(builder.preview.hasClass(builder.preview.element, 'custom-text-field'), 'Preview should have this custom class');
      done();
    });
  });
  it('Should set the tab index of the input element', function (done) {
    _harness.default.testBuilderProperty('tabindex', '', 10, null, function () {
      _powerAssert.default.equal(builder.preview.inputs[0].tabIndex, 10);

      done();
    });
  });
  it('Should allow you to set the multiple flag', function (done) {
    _harness.default.testBuilderProperty('multiple', false, true, null, function () {
      done();
    });
  });
});