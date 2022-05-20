"use strict";

require("core-js/modules/es.object.to-string.js");

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _Columns = _interopRequireDefault(require("./Columns"));

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Columns Component', function () {
  it('Should build a columns component', function () {
    return _harness.default.testCreate(_Columns.default, _fixtures.comp1).then(function (component) {
      _harness.default.testElements(component, 'input[type="text"]', 2);
    });
  });
  it('Should be auto-adjusting when auto adjust is set to true', function (done) {
    _harness.default.testCreate(_Columns.default, _fixtures.comp2).then(function (component) {
      var columns = component.component.columns;

      _powerAssert.default.equal(columns.every(function (col) {
        return col.currentWidth === 2;
      }), true);

      var oddIndexes = [0, 2, 4]; // 0 column has 2 textfields

      oddIndexes.forEach(function (i) {
        return columns[i].components[0].hidden = true;
      }); // we're setting hidden for odd columns
      // initially all components aren't hidden and have default width = 2

      component.rebuild(); // rebuild component to check conditions

      oddIndexes.forEach(function (i) {
        if (i === 0) {
          _powerAssert.default.equal(columns[i].currentWidth, 2, "column[".concat(i, "] should have width = 2")); // it has at least a component as visible

        } else {
          _powerAssert.default.equal(columns[i].currentWidth, 0, "column[".concat(i, "] should have width = 0")); // columns which has no visible components should have currentWidth as 0

        }
      });
      oddIndexes.forEach(function (i) {
        return columns[i].components[0].hidden = false;
      }); // we're setting visible for odd columns again

      component.rebuild(); // rebuild component to check conditions

      _powerAssert.default.equal(columns.every(function (col) {
        return col.currentWidth === 2;
      }), true, 'all columns should have width = 2'); // ensure we have initial width

    }).then(done).catch(done);
  });
  it('Should clear fields in modal window after confirming to clear data in dialog window', function (done) {
    _harness.default.testCreate(_Columns.default, _fixtures.comp3).then(function (component) {
      var hiddenModalWindow = component.element.querySelector('.component-rendering-hidden');

      _powerAssert.default.equal(!!hiddenModalWindow, true);

      var clickEvent = new Event('click');
      var openModalElement = component.refs.openModal; //open modal edit window

      openModalElement.dispatchEvent(clickEvent);
      setTimeout(function () {
        _powerAssert.default.equal(!!component.element.querySelector('.component-rendering-hidden'), false);

        var inputEvent = new Event('input');
        var columnsInputField = component.element.querySelector('[name="data[textField]"]');
        columnsInputField.value = 'alexy@form.io';
        columnsInputField.dispatchEvent(inputEvent);
        setTimeout(function () {
          _powerAssert.default.equal(component.element.querySelector('[name="data[textField]"]').value, 'alexy@form.io');

          var clickEvent = new Event('click');
          var modalOverlay = component.refs.modalOverlay; //click outside modal edit window

          modalOverlay.dispatchEvent(clickEvent);
          setTimeout(function () {
            _powerAssert.default.equal(!!component.componentModal.dialog, true);

            var clickEvent = new Event('click');
            var btnForCleaningValues = document.querySelector('[ref="dialogYesButton"]'); //click on 'yes, delete it' button inside alert window

            btnForCleaningValues.dispatchEvent(clickEvent);
            setTimeout(function () {
              var clickEvent = new Event('click');
              var openModalElement = component.refs.openModal; //open edit modal window again

              openModalElement.dispatchEvent(clickEvent);
              setTimeout(function () {
                _powerAssert.default.equal(component.element.querySelector('[name="data[textField]"]').value, '');

                done();
              }, 100);
            }, 100);
          }, 100);
        }, 100);
      }, 100);
    }).catch(done);
  });
});