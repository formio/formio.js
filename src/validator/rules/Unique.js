import { escapeRegExCharacters } from '../../utils/utils';
import _ from 'lodash';
import NativePromise from 'native-promise-only';

const Rule = require('./Rule');

module.exports = class Unique extends Rule {
  defaultMessage = '{{field}} must be unique';

  check(value) {
    // Skip if value is empty object or falsy
    if (!value || _.isObjectLike(value) && _.isEmpty(value)) {
      return true;
    }

    // Skip if we don't have a database connection
    if (!this.config.db) {
      return true;
    }

    return new NativePromise(resolve => {
      const form = this.config.form;
      const submission = this.config.submission;
      const path = `data.${this.component.path}`;

      // Build the query
      const query = { form: form._id };

      if (_.isString(value)) {
        query[path] = {
          $regex: new RegExp(`^${escapeRegExCharacters(value)}$`),
          $options: 'i'
        };
      }
      else if (
        _.isPlainObject(value) &&
        value.address &&
        value.address['address_components'] &&
        value.address['place_id']
      ) {
        query[`${path}.address.place_id`] = {
          $regex: new RegExp(`^${escapeRegExCharacters(value.address['place_id'])}$`),
          $options: 'i'
        };
      }
      // Compare the contents of arrays vs the order.
      else if (_.isArray(value)) {
        query[path] = { $all: value };
      }
      else if (_.isObject(value) || _.isNumber(value)) {
        query[path] = { $eq: value };
      }

      // Only search for non-deleted items
      query.deleted = { $eq: null };

      // Try to find an existing value within the form
      this.config.db.findOne(query, (err, result) => {
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
    }).catch(() => false);
  }
};
