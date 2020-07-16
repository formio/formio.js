"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.construct");

require("core-js/modules/es.regexp.constructor");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

var _utils = require("../../utils/utils");

var _lodash = _interopRequireDefault(require("lodash"));

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

var _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Rule = require('./Rule');

module.exports = (_temp = /*#__PURE__*/function (_Rule) {
  _inherits(Unique, _Rule);

  var _super = _createSuper(Unique);

  function Unique() {
    var _this;

    _classCallCheck(this, Unique);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "defaultMessage", '{{field}} must be unique');

    return _this;
  }

  _createClass(Unique, [{
    key: "check",
    value: function check(value) {
      var _this2 = this;

      // Skip if value is empty
      if (!value || _lodash.default.isEmpty(value)) {
        return true;
      } // Skip if we don't have a database connection


      if (!this.config.db) {
        return true;
      }

      return new _nativePromiseOnly.default(function (resolve) {
        var form = _this2.config.form;
        var submission = _this2.config.submission;
        var path = "data.".concat(_this2.component.path); // Build the query

        var query = {
          form: form._id
        };

        if (_lodash.default.isString(value)) {
          query[path] = {
            $regex: new RegExp("^".concat((0, _utils.escapeRegExCharacters)(value), "$")),
            $options: 'i'
          };
        } else if (_lodash.default.isPlainObject(value) && value.address && value.address['address_components'] && value.address['place_id']) {
          query["".concat(path, ".address.place_id")] = {
            $regex: new RegExp("^".concat((0, _utils.escapeRegExCharacters)(value.address['place_id']), "$")),
            $options: 'i'
          };
        } // Compare the contents of arrays vs the order.
        else if (_lodash.default.isArray(value)) {
            query[path] = {
              $all: value
            };
          } else if (_lodash.default.isObject(value)) {
            query[path] = {
              $eq: value
            };
          } // Only search for non-deleted items


        query.deleted = {
          $eq: null
        }; // Try to find an existing value within the form

        _this2.config.db.findOne(query, function (err, result) {
          if (err) {
            return resolve(false);
          } else if (result) {
            // Only OK if it matches the current submission
            return resolve(submission._id && result._id.toString() === submission._id);
          } else {
            return resolve(true);
          }
        });
      }).catch(function () {
        return false;
      });
    }
  }]);

  return Unique;
}(Rule), _temp);