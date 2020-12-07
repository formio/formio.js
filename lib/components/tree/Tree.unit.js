"use strict";

require("core-js/modules/es.string.trim");

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _Tree = _interopRequireDefault(require("./Tree"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Tree Component', function () {
  it('Should set and render values in readOnly mode', function (done) {
    _harness.default.testCreate(_Tree.default, _fixtures.comp1).then(function (component) {
      component.setValue({
        data: {
          number: 111
        },
        children: [{
          data: {
            number: 222
          },
          children: [{
            data: {
              number: 333
            },
            children: []
          }]
        }]
      });

      _powerAssert.default.equal(component.element.querySelectorAll('.tree__node-content').length, 3);

      _powerAssert.default.equal(component.element.querySelectorAll('.editNode').length, 3);

      component.options.readOnly = true;
      component.redraw();
      var valueContainers = component.element.querySelectorAll('.col-sm-2');

      _powerAssert.default.equal(component.element.querySelectorAll('.tree__node-content').length, 3);

      _powerAssert.default.equal(component.element.querySelectorAll('.editNode').length, 0);

      _powerAssert.default.equal(valueContainers[0].innerHTML.trim(), '111');

      _powerAssert.default.equal(valueContainers[1].innerHTML.trim(), '222');

      _powerAssert.default.equal(valueContainers[2].innerHTML.trim(), '333');

      done();
    });
  });
});