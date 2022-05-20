"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.function.name.js");

var _AzureAddressProvider2 = require("./AzureAddressProvider");

var _CustomAddressProvider = require("./CustomAddressProvider");

var _GoogleAddressProvider = require("./GoogleAddressProvider");

var _NominatimAddressProvider = require("./NominatimAddressProvider");

var _AzureAddressProvider;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_AzureAddressProvider = {}, _defineProperty(_AzureAddressProvider, _AzureAddressProvider2.AzureAddressProvider.name, _AzureAddressProvider2.AzureAddressProvider), _defineProperty(_AzureAddressProvider, _CustomAddressProvider.CustomAddressProvider.name, _CustomAddressProvider.CustomAddressProvider), _defineProperty(_AzureAddressProvider, _GoogleAddressProvider.GoogleAddressProvider.name, _GoogleAddressProvider.GoogleAddressProvider), _defineProperty(_AzureAddressProvider, _NominatimAddressProvider.NominatimAddressProvider.name, _NominatimAddressProvider.NominatimAddressProvider), _AzureAddressProvider);

exports.default = _default;