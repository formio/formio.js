'use strict';

var _TextArea = require('./TextArea');

var _index = require('./fixtures/index');

var _harness = require('../../../test/harness');

describe('TextArea Component', function () {
  it('Should build a TextArea component', function (done) {
    _harness.Harness.testCreate(_TextArea.TextAreaComponent, _index.components.comp1).then(function (component) {
      _harness.Harness.testElements(component, 'textarea', 1);
      done();
    });
  });
});