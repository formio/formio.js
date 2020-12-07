"use strict";

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _File = _interopRequireDefault(require("./File"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('File Component', function () {
  it('Should create a File Component', function () {
    return _harness.default.testCreate(_File.default, _fixtures.comp1).then(function (component) {
      var parentNode = document.createElement('div');
      var element = document.createElement('div');
      parentNode.appendChild(element);
      component.build(element);

      _harness.default.testElements(component, 'ul.list-group-striped li.list-group-header', 1);

      _harness.default.testElements(component, 'ul.list-group-striped li.list-group-item', 1);

      _harness.default.testElements(component, 'a.browse', 1);

      (0, _powerAssert.default)(component.checkValidity(component.getValue()), 'Item should be valid');
      component.setValue([{
        storage: 'base64',
        name: 'IMG_5235-ce0abe18-5d3e-4ab4-84ca-b3e06684bc86.jpg',
        url: 'data:image/jpg;base64,AAAAIGZ0eXBoZWljAAAAAG1pZjF',
        size: 1159732,
        type: 'image/jpeg',
        originalName: 'IMG_5235.jpg'
      }, {
        storage: 'base64',
        name: 'IMG_5235-ce0abe18-5d3e-4ab4-84ca-b3e06684bc86.png',
        url: 'data:image/jpg;base64,AAAAIGZ0eXBoZWljAAAAAG1pZjF',
        size: 34533,
        type: 'image/png',
        originalName: 'IMG_5235.png'
      }]);

      _harness.default.testElements(component, 'ul.list-group-striped li.list-group-header', 1);

      _harness.default.testElements(component, 'ul.list-group-striped li.list-group-item', 3);

      _harness.default.testElements(component, 'a.browse', 0);

      (0, _powerAssert.default)(component.checkValidity(component.getValue()), 'Item should be valid');
    });
  });
  it('Should create a multiple File Component', function () {
    _fixtures.comp1.multiple = true;
    return _harness.default.testCreate(_File.default, _fixtures.comp1).then(function (component) {
      var parentNode = document.createElement('div');
      var element = document.createElement('div');
      parentNode.appendChild(element);
      component.build(element);

      _harness.default.testElements(component, 'ul.list-group-striped li.list-group-header', 1);

      _harness.default.testElements(component, 'ul.list-group-striped li.list-group-item', 1);

      _harness.default.testElements(component, 'a.browse', 1);

      (0, _powerAssert.default)(component.checkValidity(component.getValue()), 'Item should be valid');
      component.setValue([{
        storage: 'base64',
        name: 'IMG_5235-ce0abe18-5d3e-4ab4-84ca-b3e06684bc86.jpg',
        url: 'data:image/jpg;base64,AAAAIGZ0eXBoZWljAAAAAG1pZjF',
        size: 1159732,
        type: 'image/jpeg',
        originalName: 'IMG_5235.jpg'
      }, {
        storage: 'base64',
        name: 'IMG_5235-ce0abe18-5d3e-4ab4-84ca-b3e06684bc86.png',
        url: 'data:image/jpg;base64,AAAAIGZ0eXBoZWljAAAAAG1pZjF',
        size: 34533,
        type: 'image/png',
        originalName: 'IMG_5235.png'
      }]);

      _harness.default.testElements(component, 'ul.list-group-striped li.list-group-header', 1);

      _harness.default.testElements(component, 'ul.list-group-striped li.list-group-item', 3);

      _harness.default.testElements(component, 'a.browse', 1);

      (0, _powerAssert.default)(component.checkValidity(component.getValue()), 'Item should be valid');
    });
  });
});