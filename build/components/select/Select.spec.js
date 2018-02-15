'use strict';

var _Select = require('./Select');

var _index = require('./fixtures/index');

var _harness = require('../../../test/harness');

describe('Select Component', function () {
  it('Should build a Select component', function (done) {
    _harness.Harness.testCreate(_Select.SelectComponent, _index.components.comp1).then(function (component) {
      _harness.Harness.testElements(component, 'select', 1);
      done();
    });
  });

  it('Should preserve the tabindex', function (done) {
    _harness.Harness.testCreate(_Select.SelectComponent, _index.components.comp2).then(function (component) {
      var element = component.element.getElementsByClassName("choices__list choices__list--single")[0];
      _harness.Harness.testElementAttribute(element, 'tabindex', '10');
      done();
    });
  });

  it('Should default to 0 when tabindex is not specified', function (done) {
    _harness.Harness.testCreate(_Select.SelectComponent, _index.components.comp1).then(function (component) {
      var element = component.element.getElementsByClassName("choices__list choices__list--single")[0];
      _harness.Harness.testElementAttribute(element, 'tabindex', '0');
      done();
    });
  });
});