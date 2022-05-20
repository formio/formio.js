"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.embed = embed;

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.array.join.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.string.match.js");

require("core-js/modules/es.array.concat.js");

// eslint-disable-next-line max-statements
function embed() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var scripts = document.getElementsByTagName('script');
  config = Object.assign(config, window.FormioConfig);
  var thisScript = null;
  var i = scripts.length;
  var scriptName = config.scriptName || 'formio.embed.';

  while (i--) {
    if (scripts[i].src && scripts[i].src.indexOf(scriptName) !== -1) {
      thisScript = scripts[i];
      break;
    }
  }

  if (thisScript) {
    var query = {};
    var queryString = thisScript.src.replace(/^[^?]+\??/, '');
    queryString.replace(/\?/g, '&').split('&').forEach(function (item) {
      query[item.split('=')[0]] = item.split('=')[1] && decodeURIComponent(item.split('=')[1]);
    });
    var scriptSrc = thisScript.src.replace(/^([^?]+).*/, '$1').split('/');
    scriptSrc.pop();

    if (config.formioPath) {
      config.formioPath(scriptSrc);
    }

    scriptSrc = scriptSrc.join('/');
    query.script = query.script || "".concat(scriptSrc, "/formio.form.min.js");
    query.styles = query.styles || "".concat(scriptSrc, "/formio.form.min.css");
    var cdn = query.cdn || 'https://cdn.jsdelivr.net/npm';
    config = Object.assign({
      script: query.script,
      style: query.styles,
      libs: {
        uswds: {
          fa: true,
          js: "".concat(cdn, "/uswds@2.10.0/dist/js/uswds.min.js"),
          css: "".concat(cdn, "/uswds@2.10.0/dist/css/uswds.min.css")
        },
        fontawesome: {
          css: "".concat(cdn, "/font-awesome@4.7.0/css/font-awesome.min.css")
        },
        bootstrap: {
          css: "".concat(cdn, "/bootstrap@4.6.0/dist/css/bootstrap.min.css")
        }
      },
      class: query.class || 'formio-form-wrapper',
      src: query.src,
      form: null,
      submission: null,
      project: query.project,
      base: query.base,
      submit: query.submit,
      includeLibs: query.libs === 'true' || query.libs === '1',
      template: query.template,
      debug: query.debug === 'true' || query.debug === '1',
      config: {},
      redirect: query.return || query.redirect,
      before: function before() {},
      after: function after() {}
    }, config);
    /**
     * Print debug statements.
     *
     * @param  {...any} args Arguments to pass to the console.log method.
     */

    var debug = function debug() {
      if (config.debug) {
        var _console;

        (_console = console).log.apply(_console, arguments);
      }
    };
    /**
     * Creates a new DOM element.
     *
     * @param {string} tag The HTMLElement to add to the wrapper or shadow dom.
     * @param {Object} attrs The attributes to add to this element.
     * @param {Array<Object>} children The children attached to this element.
     */


    var createElement = function createElement(tag, attrs, children) {
      var element = document.createElement(tag);

      for (var attr in attrs) {
        if (attrs.hasOwnProperty(attr)) {
          element.setAttribute(attr, attrs[attr]);
        }
      }

      (children || []).forEach(function (child) {
        element.appendChild(createElement(child.tag, child.attrs, child.children));
      });
      return element;
    };

    debug('Embedding Configuration', config); // The id for this embedded form.

    var id = "formio-".concat(Math.random().toString(36).substring(7));
    config.id = id;
    debug('Creating form wrapper');
    var wrapper = createElement('div', {
      'id': "\"".concat(id, "-wrapper\"")
    }); // insertAfter doesn't exist, but effect is identical.

    thisScript.parentNode.insertBefore(wrapper, thisScript.parentNode.firstElementChild.nextSibling); // If we include the libraries, then we will attempt to run this in shadow dom.

    if (config.includeLibs && typeof wrapper.attachShadow === 'function') {
      wrapper = wrapper.attachShadow({
        mode: 'open'
      });
      config.config.shadowRoot = wrapper;
    }

    var global = function global(name) {
      var globalValue = window[name];
      debug("Getting global ".concat(name), globalValue);
      return globalValue;
    };

    var addStyles = function addStyles(href, global) {
      if (!href) {
        return;
      }

      if (typeof href !== 'string' && href.length) {
        href.forEach(function (ref) {
          return addStyles(ref);
        });
        return;
      }

      debug('Adding Styles', href);
      var link = createElement('link', {
        rel: 'stylesheet',
        href: href
      });

      if (global) {
        // Add globally as well.
        document.head.appendChild(link);
      }

      wrapper.appendChild(createElement('link', {
        rel: 'stylesheet',
        href: href
      }));
    };

    var addScript = function addScript(src, globalProp, onReady) {
      if (!src) {
        return;
      }

      if (typeof src !== 'string' && src.length) {
        src.forEach(function (ref) {
          return addScript(ref);
        });
        return;
      }

      if (globalProp && global(globalProp)) {
        debug("".concat(globalProp, " already loaded."));
        return global(globalProp);
      }

      debug('Adding Script', src);
      wrapper.appendChild(createElement('script', {
        src: src
      }));

      if (globalProp && onReady) {
        debug("Waiting to load ".concat(globalProp));
        var wait = setInterval(function () {
          if (global(globalProp)) {
            clearInterval(wait);
            debug("".concat(globalProp, " loaded."));
            onReady(global(globalProp));
          }
        }, 100);
      }
    }; // Create a loader


    addStyles("".concat(scriptSrc, "/formio.embed.min.css"));
    debug('Creating loader');
    var loader = createElement('div', {
      'class': 'formio-loader'
    }, [{
      tag: 'div',
      attrs: {
        class: 'loader-wrapper'
      },
      children: [{
        tag: 'div',
        attrs: {
          class: 'loader text-center'
        }
      }]
    }]);
    wrapper.appendChild(loader); // Add the wrapper for the rendered form.

    debug('Creating form element');
    var formElement = createElement('div', {
      class: config.class
    });
    wrapper.appendChild(formElement); // Add the main formio script.

    addScript(config.script, 'Formio', function (Formio) {
      var renderForm = function renderForm() {
        addStyles(config.style);
        var isReady = config.before(Formio, formElement, config) || Formio.Promise.resolve();
        var form = config.form || config.src;
        debug('Creating form', form, config.config);
        isReady.then(function () {
          Formio.license = true;
          Formio.createForm(formElement, form, config.config).then(function (instance) {
            var submitDone = function submitDone(submission) {
              debug('Submision Complete', submission);
              var returnUrl = config.redirect; // Allow form based configuration for return url.

              if (!returnUrl && instance._form && instance._form.settings && (instance._form.settings.returnUrl || instance._form.settings.redirect)) {
                debug('Return url found in form configuration');
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

                debug('Return URL', returnUrl);
                window.location.href = returnUrl;

                if (isOrigin) {
                  window.location.reload();
                }
              }
            };

            if (config.submit) {
              instance.nosubmit = true;
            }

            debug('Form created', instance); // Remove the loader.

            debug('Removing loader');
            wrapper.removeChild(loader); // Set the default submission data.

            if (config.submission) {
              debug('Setting submission', config.submission);
              instance.submission = config.submission;
            } // Allow them to provide additional configs.


            debug('Triggering embed event');
            Formio.events.emit('formEmbedded', instance);
            debug('Calling ready callback');
            config.after(instance, config); // Configure a redirect.

            instance.on('submit', function (submission) {
              debug("on('submit')", submission);

              if (config.submit) {
                debug("Sending submission to ".concat(config.submit));
                var headers = {
                  'content-type': 'application/json'
                };
                var token = Formio.getToken();

                if (token) {
                  headers['x-jwt-token'] = token;
                }

                Formio.fetch(config.submit, {
                  body: JSON.stringify(submission),
                  headers: headers,
                  method: 'POST',
                  mode: 'cors'
                }).then(function (resp) {
                  return resp.json();
                }).then(function (submission) {
                  return submitDone(submission);
                });
              } else {
                submitDone(submission);
              }
            });
          });
        });
      };

      if (config.base) {
        Formio.setBaseUrl(config.base);
      }

      if (config.project) {
        Formio.setProjectUrl(config.project);
      } // Add premium modules


      if (global('premium')) {
        debug('Using premium module.');
        Formio.use(global('premium'));
      }

      if (global('vpat')) {
        debug('Using vpat module.');
        Formio.use(global('vpat'));
      }

      if (config.template) {
        if (config.includeLibs) {
          addStyles(config.libs[config.template].css);
          addScript(config.libs[config.template].js);

          if (config.libs[config.template].fa) {
            addStyles(config.libs.fontawesome.css, true);
          }
        }

        var templateSrc = "".concat(cdn, "/@formio/").concat(config.template, "@latest/dist/").concat(config.template, ".min");
        addStyles("".concat(templateSrc, ".css"));
        addScript("".concat(templateSrc, ".js"), config.template, function (template) {
          debug("Using ".concat(config.template));
          Formio.use(template);
          renderForm();
        });
      } else if (global('uswds')) {
        debug('Using uswds module.');
        Formio.use(global('uswds'));
      } // Default bootstrap + fontawesome.
      else if (config.includeLibs) {
        addStyles(config.libs.fontawesome.css, true);
        addStyles(config.libs.bootstrap.css);
      } // Render the form if no template is provided.


      if (!config.template) {
        renderForm();
      }
    });
  } else {
    // Show an error if the script cannot be found.
    document.write('<span>Could not locate the Embedded form.</span>');
  }
}