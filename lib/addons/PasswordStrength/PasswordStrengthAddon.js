"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.reflect.get.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.array.slice.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.array.sort.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.math.log2.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.regexp.constructor.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.array.join.js");

require("core-js/modules/es.object.get-prototype-of.js");

var _lodash = _interopRequireDefault(require("lodash"));

var _FormioAddon2 = _interopRequireDefault(require("../FormioAddon"));

var _PasswordStrengthAddon = _interopRequireDefault(require("./PasswordStrengthAddon.form"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var PasswordStrengthAddon = /*#__PURE__*/function (_FormioAddon) {
  _inherits(PasswordStrengthAddon, _FormioAddon);

  var _super = _createSuper(PasswordStrengthAddon);

  function PasswordStrengthAddon(settings, componentInstance) {
    var _this;

    _classCallCheck(this, PasswordStrengthAddon);

    _this = _super.call(this, settings, componentInstance);
    _this._entropy = 0; // Set initial value of entropy

    _this.levels = _toConsumableArray(_this.settings.levels || _this.defaultSettings.levels);

    _this.levels.sort(function (a, b) {
      return a.maxEntropy - b.maxEntropy;
    }); // Sort levels from the lowest one to the highest


    _this.level = _this.levels[0]; // Set currnt level to the lowest one

    _this.maxEntropy = _this.levels[_this.levels.length - 1].maxEntropy; // Set maximal amount of security points based on the highest level

    return _this;
  }

  _createClass(PasswordStrengthAddon, [{
    key: "defaultSettings",
    get: function get() {
      return PasswordStrengthAddon.info.defaultSettings;
    }
  }, {
    key: "rules",
    get: function get() {
      var _this2 = this;

      return {
        length: {
          check: function check(value, options) {
            var minLength = options.minLength || _this2.component.component.validate.minLength || 6;

            if (value.length < minLength) {
              return "Value must be longer than ".concat(minLength, " characters");
            }

            return true;
          }
        },
        upperCase: {
          check: function check(value) {
            if (/[A-Z]/g.test(value)) {
              return true;
            }

            return 'Value must contain uppercased alphabetical characters';
          },
          increaseCharactersPoolSize: 26
        },
        numeric: {
          check: function check(value) {
            if (/[0-9]/g.test(value)) {
              return true;
            }

            return 'Value must contain numeric characters';
          },
          increaseCharactersPoolSize: 10
        },
        lowerCase: {
          check: function check(value) {
            if (/[a-z]/g.test(value)) {
              return true;
            }

            return 'Value must contain lowercased alphabetical characters';
          },
          increaseCharactersPoolSize: 26
        },
        symbols: {
          check: function check(value) {
            if (/[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(value)) {
              return true;
            }

            return 'Value must contain symbols';
          },
          increaseCharactersPoolSize: 32
        }
      };
    }
  }, {
    key: "charactersPoolLength",
    get: function get() {
      return this._charactersPoolLength;
    },
    set: function set(value) {
      this._charactersPoolLength = value;
    }
  }, {
    key: "level",
    get: function get() {
      return this._level || this.getLevel();
    },
    set: function set(level) {
      this._level = level;
    }
  }, {
    key: "entropy",
    get: function get() {
      return this._entropy;
    },
    set: function set(value) {
      var oldLevel = this.getLevel();
      var updateOnEntropyChange = this.settings.updateOn === 'entropyChange' && this._entropy !== value;
      this._entropy = value;
      this.level = this.getLevel();
      var updateOnLevelChange = this.settings.updateOn === 'levelChange' && oldLevel.name !== this.level.name;

      if (updateOnLevelChange || updateOnEntropyChange) {
        this.updateView();
      }
    }
  }, {
    key: "dictionarySize",
    get: function get() {
      return this.settings.dictionarySize || 171476;
    }
  }, {
    key: "template",
    get: function get() {
      return this.settings.template;
    }
  }, {
    key: "tooltip",
    get: function get() {
      var _this$level, _this$level2;

      return ((_this$level = this.level) === null || _this$level === void 0 ? void 0 : _this$level.tooltip) || "".concat((_this$level2 = this.level) === null || _this$level2 === void 0 ? void 0 : _this$level2.name, " strongness");
    }
  }, {
    key: "rulesSettings",
    get: function get() {
      return this.settings.rulesSettings || [];
    }
  }, {
    key: "customRules",
    get: function get() {
      return this.settings.customRules || [];
    }
  }, {
    key: "log2",
    value: function log2(value) {
      if (typeof Math.log2 === 'function') {
        return Math.log2(value);
      }

      return Math.log(value) * Math.LOG2E;
    }
  }, {
    key: "calculatePasswordEntropy",
    value: function calculatePasswordEntropy(passwordLength, charactersPoolSize) {
      return !passwordLength || !charactersPoolSize ? 0 : this.log2(Math.pow(charactersPoolSize, passwordLength));
    }
  }, {
    key: "calculatePasswordEntropyWords",
    value: function calculatePasswordEntropyWords(wordsCount) {
      return !this.dictionarySize ? 0 : this.log2(this.dictionarySize) * wordsCount;
    }
  }, {
    key: "render",
    value: function render() {
      var view = this.component.interpolate(this.template, {
        entropy: this.entropy,
        maxEntropy: this.maxEntropy,
        level: this.level,
        levelName: this.level.name.replace(' ', '-').toLowerCase(),
        levels: this.levels,
        readOnly: this.component.options.readOnly,
        pristine: this.component.pristine,
        t: this.t.bind(this),
        tooltip: this.tooltip
      });
      return this.component.sanitize(view);
    }
  }, {
    key: "checkBlackList",
    value: function checkBlackList(value) {
      var blackList = _toConsumableArray(this.settings.blackList);

      var customBlacklistedWords = this.settings.customBlacklistedWords;

      if (customBlacklistedWords && typeof customBlacklistedWords === 'string') {
        customBlacklistedWords = this.evaluate(customBlacklistedWords, this.component.evalContext({
          value: value
        }), 'values');

        if (customBlacklistedWords && customBlacklistedWords.length) {
          blackList.push.apply(blackList, _toConsumableArray(customBlacklistedWords));
        }
      }

      var restValue = value;
      var blacklistedWords = [];

      for (var i = 0; i < blackList.length; i++) {
        var word = blackList[i];
        var regExp = new RegExp("".concat(word), 'gi');

        if (regExp.test(value)) {
          blacklistedWords.push(word);
          restValue = restValue.replace(regExp, '');
        } // If less the 3 symboles left, just stop iterating


        if (restValue.length < 3) {
          break;
        }
      }

      if (blacklistedWords.length) {
        // If there are some random characters except of blacklisted words in the password,
        // calculate the entropy for them
        var _ref = restValue.length ? this.performChecks(restValue) : 0,
            charactersPoolSize = _ref.charactersPoolSize;

        var entropyOfNonblacklistedValue = this.calculatePasswordEntropy(restValue.length, charactersPoolSize); // Calculate the entropy if the biggest part of the password could be picked up from dictionary words

        var dictionaryCheckEntropy = this.calculatePasswordEntropyWords(blacklistedWords.length);
        var entropy = dictionaryCheckEntropy + entropyOfNonblacklistedValue;
        return {
          entropy: entropy,
          blacklistedWords: blacklistedWords
        };
      }

      return true;
    }
    /**
     * Determines is a password is secure enough to submit
     * @return {boolean}
     */

  }, {
    key: "isValid",
    value: function isValid() {
      var isValidCheck = this.settings.isValid;

      if (isValidCheck && typeof isValidCheck === 'string') {
        var valid = this.evaluate(isValidCheck, this.component.evalContext({
          entropy: this.entropy,
          level: this.level
        }), 'valid');
        return valid;
      }

      return this.entropy >= Math.round(this.maxEntropy / 2);
    }
    /**
     * Handles the result of check and constructs a new error object or returns an amount of points to add to the current entropy
     * @param {boolean|number} valid - Determines if the validation was failed or an amount of points if it was passed
     * @param {*} validation - Validation configuration
     * @param {string} value - Value which was validated
     * @param {string} message - Message which should be shown if validation was not passed
     */

  }, {
    key: "handleRuleCheckResult",
    value: function handleRuleCheckResult(valid, validation, message, errors) {
      if (valid !== true) {
        errors.push({
          validation: validation.name,
          message: message,
          level: validation.required ? 'error' : 'warning'
        });
      } else if (validation.increaseCharactersPoolSize) {
        return validation.increaseCharactersPoolSize;
      }

      return 0;
    }
  }, {
    key: "performChecks",
    value: function performChecks(value) {
      var _this3 = this;

      var errors = [];
      var charactersPoolSize = 0;
      this.rulesSettings.forEach(function (settings) {
        if (_this3.rules[settings.name]) {
          var rule = _lodash.default.merge({}, _this3.rules[settings.name], settings);

          var valid = rule.check(value, settings.options || {});
          var message = settings.message || valid;
          charactersPoolSize += _this3.handleRuleCheckResult(valid, rule, message, errors);
        }
      });
      this.customRules.forEach(function (rule) {
        if (rule.check && typeof rule.check === 'string') {
          var valid = _this3.evaluate(rule.check, _this3.component.evalContext({
            value: value
          }), 'valid');

          var message = typeof valid === 'string' ? valid : "Password does not meet ".concat(rule.name, " validation");
          charactersPoolSize += _this3.handleRuleCheckResult(valid, rule, message, errors);
        }
      });
      return {
        charactersPoolSize: charactersPoolSize,
        errors: errors
      };
    }
    /**
     * Performs checks to validate password security
     * @param {string} value - Suggested password
     */

  }, {
    key: "checkValidity",
    value: function checkValidity(value) {
      var _this$settings$blackL;

      var passwordLength = value.length;

      var _this$performChecks = this.performChecks(value),
          charactersPoolSize = _this$performChecks.charactersPoolSize,
          errors = _this$performChecks.errors;

      this.errors = errors;
      var entropy = this.calculatePasswordEntropy(passwordLength, charactersPoolSize);
      var blackListCheck = (_this$settings$blackL = this.settings.blackList) !== null && _this$settings$blackL !== void 0 && _this$settings$blackL.length || this.settings.customBlacklistedWords ? this.checkBlackList(value) : null; // If there were found some words from the black list

      if (blackListCheck && blackListCheck !== true) {
        this.handleBlackListCheckResult(blackListCheck); // Select the mininal entropy based on the dictionary check or symbolic check

        this.entropy = Math.min(entropy, blackListCheck.entropy);
      } else {
        this.entropy = entropy;
      }

      var isValid = this.isValid();

      if (!isValid) {
        this.errors.push({
          message: 'Password is not strong enough',
          level: this.settings.required ? 'error' : 'warning'
        });
      }

      return !this.errors.length;
    }
  }, {
    key: "handleBlackListCheckResult",
    value: function handleBlackListCheckResult(result) {
      var blacklistedWords = result.blacklistedWords;
      var isRequired = this.settings.disableBlacklistedWords;
      var message = "Password ".concat(isRequired ? 'must' : 'should', " not include common words: ").concat(blacklistedWords.join(', '));
      var validation = {
        name: 'blacklist',
        required: isRequired
      };
      this.handleRuleCheckResult(false, validation, message, this.errors);
    }
  }, {
    key: "attach",
    value: function attach(element) {
      var _this4 = this;

      _get(_getPrototypeOf(PasswordStrengthAddon.prototype), "attach", this).call(this, element);

      var container = this.component.ce('div', {
        ref: 'passwordStrengthIndicator'
      });
      var inserted = this.insertContainer(element, container);

      if (!inserted) {
        this.component.append(container);
      }

      this._element = container;
      this.component.on('redraw', function () {
        return _this4.updateView();
      });
      this.component.on('componentError', function () {
        return _this4.updateView();
      });
      this.updateView();
    }
  }, {
    key: "insertContainer",
    value: function insertContainer(element, container) {
      var _this$settings$locati, _this$settings$locati2;

      if (!element || !container) {
        return false;
      }

      var insert = (_this$settings$locati = this.settings.location) === null || _this$settings$locati === void 0 ? void 0 : _this$settings$locati.insert;
      var selector = (_this$settings$locati2 = this.settings.location) === null || _this$settings$locati2 === void 0 ? void 0 : _this$settings$locati2.selector;
      var reference;

      if (selector) {
        reference = element.querySelector(selector);
      }

      if (reference) {
        var parent = reference.parentNode;

        switch (insert) {
          case 'after':
            if (parent) {
              parent.insertBefore(container, reference.nextSibling || null);
              return true;
            }

            return false;

          case 'before':
            if (parent) {
              parent.insertBefore(container, reference);
              return true;
            }

            return false;

          default:
            console.warn("Unknown insert option: ".concat(insert));
            return false;
        }
      } else {
        console.warn("No elements found using selector: ".concat(selector));
        return false;
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      _get(_getPrototypeOf(PasswordStrengthAddon.prototype), "destroy", this).call(this);
    }
    /**
     * Finds the level which one the passed entropy suits
     * @param {number} entropy - Points of password's security
     */

  }, {
    key: "getLevel",
    value: function getLevel() {
      var entropy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.entropy;
      var lowestLevel = this.levels[0];
      var prevMaxEntropy = lowestLevel.maxEntropy;

      if (entropy <= lowestLevel.maxEntropy) {
        return lowestLevel;
      }

      if (entropy >= this.maxEntropy) {
        return this.levels[this.levels.length - 1];
      } // Iterate through levels and find the one which the passed entropy belongs to


      for (var i = 1; i < this.levels.length; i++) {
        var level = this.levels[i];

        if (entropy > prevMaxEntropy && entropy <= level.maxEntropy) {
          return level;
        }

        prevMaxEntropy = level.maxEntropy;
      }

      return lowestLevel;
    }
    /**
     * Update the current view of the password's security indicator
     */

  }, {
    key: "updateView",
    value: function updateView() {
      if (!this.element) {
        return;
      }

      var view = this.render();
      this.element.innerHTML = view;
    }
  }], [{
    key: "info",
    get: function get() {
      return {
        supportedComponents: ['password'],
        name: 'passwordStrength',
        components: _PasswordStrengthAddon.default,
        label: 'Password Strength',
        defaultSettings: {
          rulesSettings: [{
            name: 'length',
            required: false,
            message: 'Value should be longer'
          }, {
            name: 'upperCase',
            required: false,
            message: 'Value should have uppercase letters'
          }, {
            name: 'numeric',
            required: false,
            message: 'Value should have numeric symbols'
          }, {
            name: 'lowerCase',
            required: false,
            message: 'Value should be have lowercase letters'
          }, {
            name: 'symbols',
            required: false,
            message: 'Value should have symbols'
          }],
          updateOn: 'levelChange',
          required: true,
          levels: [{
            name: 'Low',
            maxEntropy: 28,
            style: 'danger'
          }, {
            name: 'Medium',
            maxEntropy: 45,
            style: 'warning'
          }, {
            name: 'High',
            maxEntropy: 59,
            style: 'info'
          }, {
            name: 'Very High',
            maxEntropy: 85,
            style: 'success'
          }],
          blackList: [],
          template: "\n          <div class=\"formio-security-indicator\">\n            {% if (!ctx.readOnly && !ctx.pristine) { %}\n              <div\n                title=\"{{ctx.t(ctx.tooltip)}}\"\n                class=\"security-{{ctx.levelName}} {{ ctx.level.style ? 'bg-' + ctx.level.style : ''}}\"\n                style=\"{{ctx.level.color ? 'background-color: ' + ctx.level.color + ';' : ''}}\"\n              ></div>\n            {% } %}\n          </div>\n        ",
          location: {
            insert: 'after',
            selector: '[ref="element"]'
          }
        }
      };
    }
  }]);

  return PasswordStrengthAddon;
}(_FormioAddon2.default);

exports.default = PasswordStrengthAddon;