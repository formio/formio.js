"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _base = _interopRequireDefault(require("./base64"));

var _dropbox = _interopRequireDefault(require("./dropbox"));

var _s = _interopRequireDefault(require("./s3"));

var _azure = _interopRequireDefault(require("./azure"));

var _url = _interopRequireDefault(require("./url"));

var _indexeddb = _interopRequireDefault(require("./indexeddb"));

var _googleDrive = _interopRequireDefault(require("./googleDrive"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  base64: _base.default,
  dropbox: _dropbox.default,
  s3: _s.default,
  url: _url.default,
  azure: _azure.default,
  indexeddb: _indexeddb.default,
  googledrive: _googleDrive.default
};
exports.default = _default;