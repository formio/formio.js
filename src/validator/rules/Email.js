const Rule = require('./Rule');

module.exports = class Email extends Rule {
  defaultMessage = '{{field}} must be a valid email.';

  check(value) {
    if (!value) {
      return true;
    }

    /* eslint-disable max-len */
    // From http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    /* eslint-enable max-len */

    // Allow emails to be valid if the component is pristine and no value is provided.
    return re.test(value);
  }
};
