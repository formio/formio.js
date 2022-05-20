"use strict";

require("core-js/modules/es.string.trim.js");

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _Tree = _interopRequireDefault(require("./Tree"));

var _fixtures = require("./fixtures");

var _Webform = _interopRequireDefault(require("../../Webform"));

var _lodash = _interopRequireDefault(require("lodash"));

var _Formio = _interopRequireDefault(require("../../Formio"));

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
  it('Should render tree and allow to save node with basic, layout and data component inside', function (done) {
    _harness.default.testCreate(_Tree.default, _fixtures.comp2).then(function (component) {
      _powerAssert.default.equal(!!component.treeRoot.refs.content, true);

      _powerAssert.default.equal(!!component.treeRoot.refs.cancelNode, true);

      _powerAssert.default.equal(!!component.treeRoot.refs.saveNode, true);

      _powerAssert.default.equal(!!component.treeRoot.refs.addChild, false);

      _powerAssert.default.equal(!!component.treeRoot.refs.editNode, false);

      _powerAssert.default.equal(!!component.treeRoot.refs.removeNode, false);

      var value = {
        data: {
          dataGrid: [{
            textField: 'data grid 1st row text'
          }],
          number: 3333,
          select: '',
          textArea: 'text area text'
        },
        children: []
      };
      var inputFields = {
        'data[tree][dataGrid][0][textField]': value.data.dataGrid[0].textField,
        'data[tree][number]': value.data.number,
        'data[tree][textArea]': value.data.textArea
      };
      var inputEvent = new Event('input');

      _lodash.default.each(inputFields, function (value, fieldName) {
        var input = component.element.querySelector("[name=\"".concat(fieldName, "\"]"));
        input.value = value;
        input.dispatchEvent(inputEvent);
      });

      setTimeout(function () {
        var clickEvent = new Event('click');
        component.treeRoot.refs.saveNode.dispatchEvent(clickEvent);
        setTimeout(function () {
          _powerAssert.default.equal(!!component.treeRoot.refs.content, true);

          _powerAssert.default.equal(!!component.treeRoot.refs.cancelNode, false);

          _powerAssert.default.equal(!!component.treeRoot.refs.saveNode, false);

          _powerAssert.default.equal(!!component.treeRoot.refs.addChild, true);

          _powerAssert.default.equal(!!component.treeRoot.refs.editNode, true);

          _powerAssert.default.equal(!!component.treeRoot.refs.removeNode, true);

          _powerAssert.default.deepEqual(component.getValue(), value, 'setvalue');

          done();
        });
      });
    });
  });
  it('Should keep the node of parent tree opened when saving the node of a child tree', function (done) {
    _harness.default.testCreate(_Tree.default, _fixtures.comp3).then(function (component) {
      _powerAssert.default.equal(!!component.treeRoot.refs.cancelNode, true);

      _powerAssert.default.equal(!!component.treeRoot.refs.saveNode, true);

      _powerAssert.default.equal(!!component.treeRoot.refs.editNode, false);

      var clickEvent = new Event('click');
      var childSaveNodeBtn = component.element.querySelector('.formio-component-tree1').querySelector('[ref="saveNode"]');
      childSaveNodeBtn.dispatchEvent(clickEvent);
      setTimeout(function () {
        _powerAssert.default.equal(!!component.treeRoot.refs.cancelNode, true);

        _powerAssert.default.equal(!!component.treeRoot.refs.saveNode, true);

        _powerAssert.default.equal(!!component.treeRoot.refs.editNode, false);

        var childTree = component.element.querySelector('.formio-component-tree1');
        var saveBtn = childTree.querySelector('[ref="saveNode"]');
        var editBtn = childTree.querySelector('[ref="editNode"]');

        _powerAssert.default.equal(!!saveBtn, false);

        _powerAssert.default.equal(!!editBtn, true);

        done();
      });
    });
  });
  it('Should allow to open node of a child tree for editing after opening parent tree node', function (done) {
    _harness.default.testCreate(_Tree.default, _fixtures.comp3).then(function (component) {
      _powerAssert.default.equal(!!component.treeRoot.refs.cancelNode, true, 'Should show cancel btn for parent tree');

      _powerAssert.default.equal(!!component.treeRoot.refs.saveNode, true, 'Should show save btn for parent tree');

      _powerAssert.default.equal(!!component.treeRoot.refs.editNode, false, 'Should not show edit btn for parent node in editing tree');

      _powerAssert.default.equal(!!component.treeRoot.components[0].treeRoot.refs.cancelNode, true, 'Should show cancel btn for child tree');

      _powerAssert.default.equal(!!component.treeRoot.components[0].treeRoot.refs.saveNode, true, 'Should show save btn for child tree');

      _powerAssert.default.equal(!!component.treeRoot.components[0].treeRoot.refs.editNode, false, 'Should not show edit btn for child tree in editing tree');

      var clickEvent = new Event('click');
      var childSaveNodeBtn = component.treeRoot.components[0].treeRoot.refs.saveNode;
      var parentSaveNodeBtn = component.treeRoot.refs.saveNode;
      childSaveNodeBtn.dispatchEvent(clickEvent);
      parentSaveNodeBtn.dispatchEvent(clickEvent);
      setTimeout(function () {
        _powerAssert.default.equal(!!component.treeRoot.refs.cancelNode, false, 'Should not show cancel btn for parent tree');

        _powerAssert.default.equal(!!component.treeRoot.refs.saveNode, false, 'Should not show save btn for parent tree');

        _powerAssert.default.equal(!!component.treeRoot.refs.editNode, true, 'Should show edit btn for parent tree');

        var parentEditNodeBtn = component.treeRoot.refs.editNode;
        parentEditNodeBtn.dispatchEvent(clickEvent);
        setTimeout(function () {
          _powerAssert.default.equal(!!component.treeRoot.components[0].treeRoot.refs.saveNode, false, 'Should not show save btn for child tree');

          _powerAssert.default.equal(!!component.treeRoot.components[0].treeRoot.refs.editNode, true, 'Should show edit btn for child tree');

          var childEditNodeBtn = component.treeRoot.components[0].treeRoot.refs.editNode;
          childEditNodeBtn.dispatchEvent(clickEvent);

          _powerAssert.default.equal(component.treeRoot.components[0].treeRoot.editing, true, 'Should set editing mode for child tree');

          _powerAssert.default.equal(!!component.treeRoot.components[0].treeRoot.refs.saveNode, true, 'Should show save btn for child tree');

          done();
        });
      });
    });
  });
  it('Should stop the submission if component didn\'t saved and has required fields', function (done) {
    var formElement = document.createElement('div');
    var form = new _Webform.default(formElement);
    form.setForm(_fixtures.comp4).then(function () {
      var submitButton = form.getComponent(['submit']);

      _powerAssert.default.equal(submitButton.disabled, true, 'Submit button should being disabled');

      var tree = form.getComponent(['tree']);
      var textField = tree.getComponents()[0].getComponent(['textField']);
      textField.setValue('123');
      setTimeout(function () {
        _powerAssert.default.equal(submitButton.disabled, true, 'Submit button should being disabled');

        tree.saveNode(tree.treeRoot);
        setTimeout(function () {
          _powerAssert.default.equal(submitButton.disabled, false, 'Submit button should being disabled');

          done();
        }, 300);
      }, 300);
    }).catch(done);
  });
  it('Should work with empty data and no defaults', function (done) {
    var formElement = document.createElement('div');

    _Formio.default.createForm(formElement, {
      type: 'form',
      components: [_fixtures.comp1],
      display: 'form'
    }, {
      noDefaults: true
    }).then(function (form) {
      setTimeout(function () {
        var tree = form.getComponent(['tree']);

        _powerAssert.default.equal(tree.treeRoot.new, true);

        done();
      }, 300);
    }).catch(done);
  });
});