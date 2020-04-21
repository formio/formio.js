"use strict";

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.join");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.match");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.split");

require("core-js/modules/web.dom-collections.for-each");

/*global Formio*/
var scripts = document.getElementsByTagName('script');
var thisScript = null;
var i = scripts.length;

while (i--) {
  if (scripts[i].src && scripts[i].src.indexOf('formio.embed') !== -1) {
    thisScript = scripts[i];
    break;
  }
}

if (thisScript) {
  var Form = require('./formio.form').Form;

  Formio.loadModules();
  var query = {};
  var scriptSrc = thisScript.src.replace(/^([^?]+).*/, '$1').split('/');
  scriptSrc.pop();
  scriptSrc = scriptSrc.join('/');
  var queryString = thisScript.src.replace(/^[^?]+\??/, '');
  queryString.replace(/\?/g, '&').split('&').forEach(function (item) {
    query[item.split('=')[0]] = item.split('=')[1] && decodeURIComponent(item.split('=')[1]);
  });
  query.styles = query.styles || "".concat(scriptSrc, "/formio.full.min.css");
  Form.embed(query).then(function (instance) {
    Formio.events.emit('formEmbedded', instance);
    instance.on('submit', function (submission) {
      var returnUrl = query.return || query.redirect; // Allow form based configuration for return url.

      if (!returnUrl && instance._form && instance._form.settings && (instance._form.settings.returnUrl || instance._form.settings.redirect)) {
        returnUrl = instance._form.settings.returnUrl || instance._form.settings.redirect;
      }

      if (returnUrl) {
        var formSrc = instance.formio ? instance.formio.formUrl : '';
        var hasQuery = !!returnUrl.match(/\?/);
        var isOrigin = returnUrl.indexOf(location.origin) === 0;
        returnUrl += hasQuery ? '&' : '?';
        returnUrl += "sub=".concat(submission._id);

        if (!isOrigin && formSrc) {
          returnUrl += "&form=".concat(encodeURIComponent(formSrc));
        }

        window.location.href = returnUrl;

        if (isOrigin) {
          window.location.reload();
        }
      }
    });
  });
} else {
  // Show an error if the script cannot be found.
  document.write('<span>Could not locate the Embedded form.</span>');
}