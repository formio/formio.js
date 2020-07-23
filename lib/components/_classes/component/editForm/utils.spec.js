"use strict";

var _chai = require("chai");

var _lodash = _interopRequireDefault(require("lodash"));

var _utils = _interopRequireDefault(require("./utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Edit Form Utils', function () {
  describe('unifyComponents', function () {
    it('should merge all objects with the same key', function () {
      var components = [{
        key: 'a',
        label: 1,
        input: true
      }, {
        key: 'a',
        one: 1,
        two: 2
      }, {
        key: 'b',
        one: 1,
        two: 2
      }];
      (0, _chai.expect)(_lodash.default.unionWith(components, _utils.default.unifyComponents)).to.deep.equal([{
        key: 'a',
        label: 1,
        input: true,
        one: 1,
        two: 2
      }, {
        key: 'b',
        one: 1,
        two: 2
      }]);
    });
    it('should not merge objects with "skipMerge" flag', function () {
      var components = [{
        key: 'a',
        label: 1
      }, {
        key: 'a',
        label: 2,
        skipMerge: true
      }, {
        key: 'b',
        one: 1,
        two: 2
      }, {
        key: 'b',
        one: 1
      }, {
        key: 'b',
        one: 1,
        ok: true
      }];
      (0, _chai.expect)(_lodash.default.unionWith(components, _utils.default.unifyComponents)).to.deep.equal([{
        key: 'a',
        label: 1
      }, {
        key: 'a',
        label: 2,
        skipMerge: true
      }, {
        key: 'b',
        one: 1,
        two: 2,
        ok: true
      }]);
    });
    it('should override with "override" flag', function () {
      var components = [{
        key: 'a',
        label: 1,
        ok: true
      }, {
        key: 'a',
        label: 2,
        overrideEditForm: true
      }];
      (0, _chai.expect)(_lodash.default.unionWith(components, _utils.default.unifyComponents)).to.deep.equal([{
        key: 'a',
        label: 2,
        ok: true,
        overrideEditForm: true
      }]);
    });
  });
});