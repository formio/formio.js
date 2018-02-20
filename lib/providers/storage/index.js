'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base64');

var _base2 = _interopRequireDefault(_base);

var _dropbox = require('./dropbox');

var _dropbox2 = _interopRequireDefault(_dropbox);

var _s = require('./s3');

var _s2 = _interopRequireDefault(_s);

var _url = require('./url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  base64: _base2.default,
  dropbox: _dropbox2.default,
  s3: _s2.default,
  url: _url2.default
};