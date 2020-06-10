var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { escapeRegExCharacters } from '../../utils/utils';
import _ from 'lodash';
import NativePromise from 'native-promise-only';
var Rule = require('./Rule');
module.exports = /** @class */ (function (_super) {
    __extends(Unique, _super);
    function Unique() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultMessage = '{{field}} must be unique';
        return _this;
    }
    Unique.prototype.check = function (value) {
        var _this = this;
        // Skip if value is empty
        if (!value || _.isEmpty(value)) {
            return true;
        }
        // Skip if we don't have a database connection
        if (!this.config.db) {
            return true;
        }
        return new NativePromise(function (resolve) {
            var form = _this.config.form;
            var submission = _this.config.submission;
            var path = "data." + _this.component.path;
            // Build the query
            var query = { form: form._id };
            if (_.isString(value)) {
                query[path] = {
                    $regex: new RegExp("^" + escapeRegExCharacters(value) + "$"),
                    $options: 'i'
                };
            }
            else if (_.isPlainObject(value) &&
                value.address &&
                value.address['address_components'] &&
                value.address['place_id']) {
                query[path + ".address.place_id"] = {
                    $regex: new RegExp("^" + escapeRegExCharacters(value.address['place_id']) + "$"),
                    $options: 'i'
                };
            }
            // Compare the contents of arrays vs the order.
            else if (_.isArray(value)) {
                query[path] = { $all: value };
            }
            else if (_.isObject(value)) {
                query[path] = { $eq: value };
            }
            // Only search for non-deleted items
            query.deleted = { $eq: null };
            // Try to find an existing value within the form
            _this.config.db.findOne(query, function (err, result) {
                if (err) {
                    return resolve(false);
                }
                else if (result) {
                    // Only OK if it matches the current submission
                    return resolve(submission._id && (result._id.toString() === submission._id));
                }
                else {
                    return resolve(true);
                }
            });
        }).catch(function () { return false; });
    };
    return Unique;
}(Rule));
