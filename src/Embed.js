import CDN from './CDN';
// eslint-disable-next-line max-statements
export function embed(config = {}) {
  const scripts = document.getElementsByTagName('script');
  config = Object.assign(config, window.FormioConfig);
  let thisScript = null;
  let i = scripts.length;
  const scriptName = config.scriptName || 'formio.embed.';
  while (i--) {
    if (
      scripts[i].src && (scripts[i].src.indexOf(scriptName) !== -1)
    ) {
      thisScript = scripts[i];
      break;
    }
  }

  if (thisScript) {
    const query = {};
    const queryString = thisScript.src.replace(/^[^?]+\??/, '');
    queryString.replace(/\?/g, '&').split('&').forEach((item) => {
      query[item.split('=')[0]] = item.split('=')[1] && decodeURIComponent(item.split('=')[1]);
    });

    let scriptSrc = thisScript.src.replace(/^([^?]+).*/, '$1').split('/');
    scriptSrc.pop();
    if (config.formioPath) {
      config.formioPath(scriptSrc);
    }
    scriptSrc = scriptSrc.join('/');
    query.script = query.script || (`${config.updatePath ? config.updatePath() :scriptSrc}/formio.form.min.js`);
    query.styles = query.styles || (`${config.updatePath ? config.updatePath() :scriptSrc}/formio.form.min.css`);
    const cdn = query.cdn || 'https://cdn.jsdelivr.net/npm';

    const resolveLibs = (cdn) => {
      const libs = {
        uswds: {
          fa: true,
          js: `${cdn}/uswds@2.10.0/dist/js/uswds.min.js`,
          css: `${cdn}/uswds@2.10.0/dist/css/uswds.min.css`
        },
        fontawesome: {
          css: `${cdn}/font-awesome@4.7.0/css/font-awesome.min.css`
        },
        bootstrap: {
          css: `${cdn}/bootstrap@4.6.0/dist/css/bootstrap.min.css`
        }
      };
      // Check if using cdn.form.io standart folders format
      if (cdn instanceof CDN) {
        const url = cdn.baseUrl;
        libs.uswds.js = `${url}/uswds/${cdn.getVersion('uswds')}/uswds.min.js`;
        libs.uswds.css = `${url}/uswds/${cdn.getVersion('uswds')}/uswds.min.css`;
        libs.fontawesome.css = `${url}/font-awesome/${cdn.getVersion('font-awesome')}/css/font-awesome.min.css`;
        libs.bootstrap.css = `${url}/bootstrap/${cdn.getVersion('bootstrap')}/css/bootstrap.min.css`;
      }
      return libs;
    };

    config = Object.assign({
      script: query.script,
      style: query.styles,
      class: (query.class || 'formio-form-wrapper'),
      src: query.src,
      form: null,
      submission: null,
      project: query.project,
      base: query.base,
      submit: query.submit,
      includeLibs: (query.libs === 'true' || query.libs === '1'),
      template: query.template,
      debug: (query.debug === 'true' || query.debug === '1'),
      config: {},
      redirect: (query.return || query.redirect),
      before: () => {},
      after: () => {}
    }, config);

    /**
     * Print debug statements.
     *
     * @param  {...any} args Arguments to pass to the console.log method.
     */
    const debug = (...args) => {
      if (config.debug) {
        console.log(...args);
      }
    };

    /**
     * Creates a new DOM element.
     *
     * @param {string} tag The HTMLElement to add to the wrapper or shadow dom.
     * @param {Object} attrs The attributes to add to this element.
     * @param {Array<Object>} children The children attached to this element.
     */
    const createElement = (tag, attrs, children) => {
      const element = document.createElement(tag);
      for (const attr in attrs) {
        if (attrs.hasOwnProperty(attr)) {
          element.setAttribute(attr, attrs[attr]);
        }
      }
      (children || []).forEach(child => {
        element.appendChild(createElement(child.tag, child.attrs, child.children));
      });
      return element;
    };

    debug('Embedding Configuration', config);

    if (config.addPremiumLib) {
      config.addPremiumLib(config, scriptSrc);
    }

    // The id for this embedded form.
    const id = `formio-${Math.random().toString(36).substring(7)}`;
    config.id = id;

    debug('Creating form wrapper');
    let wrapper = createElement('div', {
         'id': `"${id}-wrapper"`
    });

    // insertAfter doesn't exist, but effect is identical.
    thisScript.parentNode.insertBefore(wrapper, thisScript.parentNode.firstElementChild.nextSibling);

    // If we include the libraries, then we will attempt to run this in shadow dom.
    if (config.includeLibs && (typeof wrapper.attachShadow === 'function') && !config.premium) {
      wrapper = wrapper.attachShadow({
        mode: 'open'
      });
      config.config.shadowRoot = wrapper;
    }

    const global = (name) => {
      const globalValue = window[name];
      debug(`Getting global ${name}`, globalValue);
      return globalValue;
    };

    const addStyles = (href, global) => {
      if (!href) {
        return;
      }
      if (typeof href !== 'string' && href.length) {
        href.forEach(ref => addStyles(ref));
        return;
      }
      debug('Adding Styles', href);
      const link = createElement('link', {
        rel: 'stylesheet',
        href
      });
      if (global) {
        // Add globally as well.
        document.head.appendChild(link);
      }
      wrapper.appendChild(createElement('link', {
        rel: 'stylesheet',
        href
      }));
    };

    const addScript = (src, globalProp, onReady) => {
      if (!src) {
        return;
      }
      if (typeof src !== 'string' && src.length) {
        src.forEach(ref => addScript(ref));
        return;
      }
      if (globalProp && global(globalProp)) {
        debug(`${globalProp} already loaded.`);
        return global(globalProp);
      }
      debug('Adding Script', src);
      wrapper.appendChild(createElement('script', {
        src
      }));
      if (globalProp && onReady) {
        debug(`Waiting to load ${globalProp}`);
        const wait = setInterval(() => {
          if (global(globalProp)) {
            clearInterval(wait);
            debug(`${globalProp} loaded.`);
            onReady(global(globalProp));
          }
        }, 100);
      }
    };

    // Create a loader
    addStyles(`${config.updatePath ? config.updatePath() : scriptSrc}/formio.embed.min.css`);
    debug('Creating loader');
    const loader = createElement('div', {
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
    wrapper.appendChild(loader);

    // Add the wrapper for the rendered form.
    debug('Creating form element');
    const formElement = createElement('div', {
      class: config.class
    });
    wrapper.appendChild(formElement);

    // Add the main formio script.
    addScript(config.script, 'Formio', (Formio) => {
      const renderForm = () => {
        addStyles(config.style);
        const isReady = config.before(Formio, formElement, config) || Formio.Promise.resolve();
        const form = (config.form || config.src);
        debug('Creating form', form, config.config);
        isReady.then(() => {
          Formio.license = true;
          Formio.createForm(formElement, form, config.config).then((instance) => {
            const submitDone = (submission) => {
              debug('Submision Complete', submission);
              let returnUrl = config.redirect;

              // Allow form based configuration for return url.
              if (
                !returnUrl &&
                (
                  instance._form &&
                  instance._form.settings &&
                  (
                    instance._form.settings.returnUrl ||
                    instance._form.settings.redirect
                  )
                )
              ) {
                debug('Return url found in form configuration');
                returnUrl = instance._form.settings.returnUrl || instance._form.settings.redirect;
              }

              if (returnUrl) {
                const formSrc = instance.formio ? instance.formio.formUrl : '';
                const hasQuery = !!returnUrl.match(/\?/);
                const isOrigin = returnUrl.indexOf(location.origin) === 0;
                returnUrl += hasQuery ? '&' : '?';
                returnUrl += `sub=${submission._id}`;
                if (!isOrigin && formSrc) {
                  returnUrl += `&form=${encodeURIComponent(formSrc)}`;
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

            debug('Form created', instance);

            // Remove the loader.
            debug('Removing loader');
            wrapper.removeChild(loader);

            // Set the default submission data.
            if (config.submission) {
              debug('Setting submission', config.submission);
              instance.submission = config.submission;
            }

            // Allow them to provide additional configs.
            debug('Triggering embed event');
            Formio.events.emit('formEmbedded', instance);

            debug('Calling ready callback');
            config.after(instance, config);

            // Configure a redirect.
            instance.on('submit', (submission) => {
              debug("on('submit')", submission);
              if (config.submit) {
                debug(`Sending submission to ${config.submit}`);
                const headers = {
                  'content-type': 'application/json'
                };
                const token = Formio.getToken();
                if (token) {
                  headers['x-jwt-token'] = token;
                }
                Formio.fetch(config.submit, {
                    body: JSON.stringify(submission),
                    headers: headers,
                    method: 'POST',
                    mode: 'cors',
                  })
                  .then(resp => resp.json())
                  .then(submission => submitDone(submission));
              }
              else {
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
      }

      // Add premium modules
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
        let templateSrc;
        if (cdn instanceof CDN) {
          templateSrc = `${cdn[config.template]}/${config.template}.min`;
        }
        else {
          templateSrc = `${cdn}/@formio/${config.template}@latest/dist/${config.template}.min`;
        }
        addStyles(`${templateSrc}.css`);
        addScript(`${templateSrc}.js`, config.template, (template) => {
          debug(`Using ${config.template}`);
          Formio.use(template);
          renderForm();
        });
      }
      else if (global('uswds')) {
        debug('Using uswds module.');
        Formio.use(global('uswds'));
      }
      // Default bootstrap + fontawesome.
      else if (config.includeLibs) {
        Formio.cdn = new CDN();
        config.libs = resolveLibs(query.cdn || Formio.cdn);
        addStyles(config.libs.fontawesome.css, true);
        addStyles(config.libs.bootstrap.css);
      }
      if (config.premium) {
        addStyles(config.premium.css);
        addScript(config.premium.js, 'premium', (premium) => {
          debug('Using premium');
          Formio.use(premium);
          renderForm();
        });
      }

      // Render the form if no template is provided.
      if (!config.template && !config.premium) {
        renderForm();
      }
    });
  }
  else {
    // Show an error if the script cannot be found.
    document.write('<span>Could not locate the Embedded form.</span>');
  }
}
