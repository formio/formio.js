import CDN from './CDN.js';
export class Formio {
    static baseUrl;
    static projectUrl;
    static language;
    static wrapper;
    static element;
    static config = {};
    static loader = null;
    static cdn = null;
    static proxy = true;
    static async setBaseUrl(url) {
        Formio.baseUrl = url;
    }
    static async setProjectUrl(url) {
        Formio.projectUrl = url;
    }

    static debug(...args) {
        if (Formio.config.debug) {
            console.log(...args);
        }
    }

    static global(prop) {
        const globalValue = window[prop];
        if (globalValue && globalValue.proxy) {
            return null;
        }
        Formio.debug(`Getting global ${prop}`, globalValue);
        return globalValue;
    }

    static createElement(type, attrs, children) {
        const element = document.createElement(type);
        Object.keys(attrs).forEach(key => {
            element.setAttribute(key, attrs[key]);
        });
        (children || []).forEach(child => {
            element.appendChild(Formio.createElement(child.tag, child.attrs, child.children));
        });
        return element;
    }

    static async addScript(src, name) {
        if (!src) {
            return Promise.resolve();
        }
        if (typeof src !== 'string' && src.length) {
            return Promise.all(src.map(ref => Formio.addScript(ref)));
        }
        if (name && Formio.global(name)) {
            Formio.debug(`${name} already loaded.`);
            return Promise.resolve(Formio.global(name));
        }
        Formio.debug('Adding Script', src);
        Formio.wrapper.appendChild(Formio.createElement('script', {
            src
        }));
        if (!name) {
            return Promise.resolve();
        }
        return new Promise((resolve) => {
            Formio.debug(`Waiting to load ${name}`);
            const wait = setInterval(() => {
                if (Formio.global(name)) {
                    clearInterval(wait);
                    Formio.debug(`${name} loaded.`);
                    resolve(Formio.global(name));
                }
            }, 100);
        });
    }

    static async addStyles(href, addGlobally = false) {
        if (!href) {
            return;
        }
        if (typeof href !== 'string' && href.length) {
            href.forEach(ref => Formio.addStyles(ref));
            return;
        }
        Formio.debug('Adding Styles', href);
        const link = Formio.createElement('link', {
            rel: 'stylesheet',
            href
        });
        if (addGlobally) {
            // Add globally as well.
            document.head.appendChild(link);
        }
        Formio.wrapper.appendChild(Formio.createElement('link', {
            rel: 'stylesheet',
            href
        }));
    }

    static async submitDone(instance, submission) {
        Formio.debug('Submision Complete', submission);
        let returnUrl = Formio.config.redirect;

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
            Formio.debug('Return url found in form configuration');
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
            Formio.debug('Return URL', returnUrl);
            window.location.href = returnUrl;
            if (isOrigin) {
                window.location.reload();
            }
        }
    }

    static async renderForm(form, options) {
        if (Formio.config.before) {
            await Formio.config.before(Formio.FormioClass, Formio.element, Formio.config);
        }
        Formio.FormioClass.license = true;
        return Formio.FormioClass.createForm(Formio.element, form, {
            ...options,
            ...{ noLoader: true }
        }).then((instance) => {
            Formio.debug('Form created', instance);

            // Remove the loader.
            Formio.debug('Removing loader');
            Formio.wrapper.removeChild(Formio.loader);

            // Set the default submission data.
            if (Formio.config.submission) {
                Formio.debug('Setting submission', Formio.config.submission);
                instance.submission = Formio.config.submission;
            }

            // Allow them to provide additional configs.
            Formio.debug('Triggering embed event');
            Formio.FormioClass.events.emit('formEmbedded', instance);

            // Trigger the after handler.
            if (Formio.config.after) {
                Formio.debug('Calling ready callback');
                Formio.config.after(instance, Formio.config);
            }

            return instance;
        });
    }

    // eslint-disable-next-line max-statements
    static async createForm(element, form, options) {
        Formio.element = element;
        Formio.cdn = new CDN(Formio.config.cdn);
        Formio.config.libs = Formio.config.libs || {
            uswds: {
                fa: true,
                js: `${Formio.cdn.uswds}/uswds.min.js`,
                css: `${Formio.cdn.uswds}/uswds.min.css`,
            },
            fontawesome: {
                css: `${Formio.cdn['font-awesome']}/css/font-awesome.min.css`
            },
            bootstrap: {
                css: `${Formio.cdn.bootstrap}/css/bootstrap.min.css`
            }
        };
        Formio.config.id = Formio.config.id || `formio-${Math.random().toString(36).substring(7)}`;

        // Create a new wrapper and add the element inside of a new wrapper.
        Formio.wrapper = Formio.createElement('div', {
            'id': `"${Formio.config.id}-wrapper"`
        });
        element.parentNode.insertBefore(Formio.wrapper, element);
        element.parentNode.removeChild(element);
        Formio.wrapper.appendChild(element);

        // Load the renderer styles.
        await Formio.addStyles(Formio.config.embedCSS || `${Formio.cdn.js}/formio.embed.css`);
        Formio.loader = Formio.createElement('div', {
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
        Formio.wrapper.appendChild(Formio.loader);

        Formio.FormioClass = await Formio.addScript(Formio.config.script || `${Formio.cdn.js}/formio.form.min.js`, 'Formio');
        Formio.FormioClass.setBaseUrl(Formio.baseUrl || Formio.config.base);
        Formio.FormioClass.setProjectUrl(Formio.projectUrl || Formio.config.project);
        Formio.FormioClass.language = Formio.language;

        // Add premium modules
        if (Formio.global('premium')) {
            Formio.debug('Using premium module.');
            Formio.FormioClass.use(Formio.global('premium'));
        }

        if (Formio.global('vpat')) {
            Formio.debug('Using vpat module.');
            Formio.FormioClass.use(Formio.global('vpat'));
        }

        if (Formio.config.template) {
            if (Formio.config.includeLibs) {
                await Formio.addStyles(Formio.config.libs[Formio.config.template].css);
                await Formio.addScript(Formio.config.libs[Formio.config.template].js);
                if (Formio.config.libs[Formio.config.template].fa) {
                    await Formio.addStyles(Formio.config.libs.fontawesome.css, true);
                }
            }

            if (Formio.cdn[Formio.config.template]) {
                const templateSrc = `${Formio.cdn[Formio.config.template]}/${Formio.config.template}.min`;
                await Formio.addStyles(`${templateSrc}.css`);
                Formio.debug(`Using ${Formio.config.template}`);
                Formio.FormioClass.use(await Formio.addScript(`${templateSrc}.js`, Formio.config.template));
            }
        }
        else if (Formio.global('uswds')) {
            Formio.debug('Using uswds module.');
            Formio.FormioClass.use(Formio.global('uswds'));
        }
        // Default bootstrap + fontawesome.
        else if (Formio.config.includeLibs) {
            await Formio.addStyles(Formio.config.libs.fontawesome.css, true);
            await Formio.addStyles(Formio.config.libs.bootstrap.css);
        }
        if (Formio.config.premium) {
            await Formio.addStyles(Formio.config.premium.css);
            Formio.debug('Using premium');
            Formio.FormioClass.use(await Formio.addScript(Formio.config.premium.js, 'premium'));
        }

        await Formio.addStyles(Formio.config.style || `${Formio.cdn.js}/formio.form.min.css`);
        return await Formio.renderForm(form, options);
    }
}
