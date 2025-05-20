import CDN from './CDN.js';
export class Formio {
    static FormioClass = null;
    static baseUrl;
    static projectUrl;
    static pathType;
    static language;
    static config = {};
    static cdn;
    static modules = [];
    static icons = '';
    static license = '';
    static formioReady = new Promise((ready, reject) => {
        Formio._formioReady = ready;
        Formio._formioReadyReject = reject;
    });
    static version = 'FORMIO_VERSION';
    static setLicense(license, norecurse = false) {
        Formio.license = license;
        if (!norecurse && Formio.FormioClass) {
            Formio.FormioClass.setLicense(license);
        }
    }

    static setBaseUrl(url, norecurse = false) {
        Formio.baseUrl = url;
        if (!norecurse && Formio.FormioClass) {
            Formio.FormioClass.setBaseUrl(url);
        }
    }

    static setApiUrl(url, norecurse = false) {
        Formio.baseUrl = url;
        if (!norecurse && Formio.FormioClass) {
            Formio.FormioClass.setApiUrl(url);
        }
    }

    static setProjectUrl(url, norecurse = false) {
        Formio.projectUrl = url;
        if (!norecurse && Formio.FormioClass) {
            Formio.FormioClass.setProjectUrl(url);
        }
    }

    static setAppUrl(url, norecurse = false) {
        Formio.projectUrl = url;
        if (!norecurse && Formio.FormioClass) {
            Formio.FormioClass.setAppUrl(url);
        }
    }

    static setPathType(type, norecurse = false) {
        Formio.pathType = type;
        if (!norecurse && Formio.FormioClass) {
            Formio.FormioClass.setPathType(type);
        }
    }

    static debug(...args) {
        if (Formio.config.debug) {
            console.log(...args);
        }
    }

    static clearCache() {
        if (Formio.FormioClass) {
            Formio.FormioClass.clearCache();
        }
    }

    static global(prop, flag = '') {
        const globalValue = window[prop];
        if (flag && globalValue && !globalValue[flag]) {
            return null;
        }
        Formio.debug(`Getting global ${prop}`, globalValue);
        return globalValue;
    }

    static use(module) {
        if (Formio.FormioClass && Formio.FormioClass.isRenderer) {
            Formio.FormioClass.use(module);
        }
        else {
            Formio.modules.push(module);
        }
    }

    static createElement(type, attrs, children) {
        const element = document.createElement(type);
        if (!attrs) {
            return element;
        }
        Object.keys(attrs).forEach(key => {
            element.setAttribute(key, attrs[key]);
        });
        (children || []).forEach(child => {
            element.appendChild(Formio.createElement(child.tag, child.attrs, child.children));
        });
        return element;
    }

    static async addScript(wrapper, src, name, flag = '') {
        if (!src) {
            return Promise.resolve();
        }
        if (typeof src !== 'string' && src.length) {
            return Promise.all(src.map(ref => Formio.addScript(wrapper, ref)));
        }
        if (name && Formio.global(name, flag)) {
            Formio.debug(`${name} already loaded.`);
            return Promise.resolve(Formio.global(name));
        }
        Formio.debug('Adding Script', src);
        try {
            wrapper.appendChild(Formio.createElement('script', {
                src
            }));
        }
        catch (err) {
            Formio.debug(err);
            return Promise.resolve();
        }
        if (!name) {
            return Promise.resolve();
        }
        return new Promise((resolve) => {
            Formio.debug(`Waiting to load ${name}`);
            const wait = setInterval(() => {
                if (Formio.global(name, flag)) {
                    clearInterval(wait);
                    Formio.debug(`${name} loaded.`);
                    resolve(Formio.global(name));
                }
            }, 100);
        });
    }

    static async addStyles(wrapper, href) {
        if (!href) {
            return;
        }
        if (typeof href !== 'string' && href.length) {
            href.forEach(ref => Formio.addStyles(wrapper, ref));
            return;
        }
        Formio.debug('Adding Styles', href);
        wrapper.appendChild(Formio.createElement('link', {
            rel: 'stylesheet',
            href
        }));
    }

    static async submitDone(instance, submission) {
        Formio.debug('Submision Complete', submission);
        if (Formio.config.submitDone) {
            Formio.config.submitDone(submission, instance);
        }

        const successMessage = (Formio.config.success || '').toString();
        if (successMessage && successMessage.toLowerCase() !== 'false' && instance.element) {
            instance.element.innerHTML = `<div class="alert-success" role="alert">${successMessage}</div>`;
        }
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

    // Return the full script if the builder is being used.
    static formioScript(script, builder) {
        builder = builder || Formio.config.includeBuilder;
        if (Formio.fullAdded || builder) {
            Formio.fullAdded = true;
            return script.replace('formio.form', 'formio.full');
        }
        return script;
    }

    static async addLibrary(libWrapper, lib, name) {
        if (!lib) {
            return;
        }
        if (lib.dependencies) {
            for (let i = 0; i < lib.dependencies.length; i++) {
                const libName = lib.dependencies[i];
                await Formio.addLibrary(libWrapper, Formio.config.libs[libName], libName);
            }
        }
        if (lib.css) {
            await Formio.addStyles((lib.global ? document.body : libWrapper), lib.css);
        }
        if (lib.js) {
            const module = await Formio.addScript((lib.global ? document.body : libWrapper), lib.js, lib.use ? name : false);
            if (lib.use) {
                Formio.debug(`Using ${name}`);
                const options = lib.options || {};
                if (!options.license && Formio.license) {
                    options.license = Formio.license;
                }
                Formio.use((typeof lib.use === 'function' ? lib.use(module) : module), options);
            }
        }
        if (lib.globalStyle) {
            const style = Formio.createElement('style');
            style.type = 'text/css';
            style.innerHTML = lib.globalStyle;
            document.body.appendChild(style);
        }
    }

    static async addLoader(wrapper) {
        wrapper.appendChild(Formio.createElement('div', {
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
        }]));
    }

    // eslint-disable-next-line max-statements
    static async init(element, options = {}, builder = false) {
        Formio.cdn = new CDN(Formio.config.cdn, Formio.config.cdnUrls || {});
        Formio.config.libs = Formio.config.libs || {
            uswds: {
                dependencies: ['fontawesome'],
                js: `${Formio.cdn.uswds}/uswds.min.js`,
                css: `${Formio.cdn.uswds}/uswds.min.css`,
                use: true
            },
            fontawesome: {
                // Due to an issue with font-face not loading in the shadowdom (https://issues.chromium.org/issues/41085401), we need
                // to do 2 things. 1.) Load the fonts from the global cdn, and 2.) add the font-face to the global styles on the page.
                css: `https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css`,
                globalStyle: `@font-face {
                    font-family: 'FontAwesome';
                    src: url('https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/fonts/fontawesome-webfont.eot?v=4.7.0');
                    src: url('https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/fonts/fontawesome-webfont.eot?#iefix&v=4.7.0') format('embedded-opentype'), url('https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/fonts/fontawesome-webfont.woff2?v=4.7.0') format('woff2'), url('https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/fonts/fontawesome-webfont.woff?v=4.7.0') format('woff'), url('https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/fonts/fontawesome-webfont.ttf?v=4.7.0') format('truetype'), url('https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/fonts/fontawesome-webfont.svg?v=4.7.0#fontawesomeregular') format('svg');
                    font-weight: normal;
                    font-style: normal;
                  }`
            },
            bootstrap4: {
                dependencies: ['fontawesome'],
                css: `${Formio.cdn.bootstrap4}/css/bootstrap.min.css`
            },
            bootstrap: {
                dependencies: ['bootstrap-icons'],
                css: `${Formio.cdn.bootstrap}/css/bootstrap.min.css`
            },
            'bootstrap-icons': {
                // Due to an issue with font-face not loading in the shadowdom (https://issues.chromium.org/issues/41085401), we need
                // to do 2 things. 1.) Load the fonts from the global cdn, and 2.) add the font-face to the global styles on the page.
                css: 'https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.min.css',
                globalStyle: `@font-face {
                    font-display: block;
                    font-family: "bootstrap-icons";
                    src: url("https://cdn.jsdelivr.net/npm/bootstrap-icons/font/fonts/bootstrap-icons.woff2?dd67030699838ea613ee6dbda90effa6") format("woff2"),
                         url("https://cdn.jsdelivr.net/npm/bootstrap-icons/font/fonts/bootstrap-icons.woff?dd67030699838ea613ee6dbda90effa6") format("woff");
                }`
            },
        };
        // Add all bootswatch templates.
        ['cerulean', 'cosmo', 'cyborg', 'darkly', 'flatly', 'journal', 'litera', 'lumen', 'lux', 'materia', 'minty', 'pulse', 'sandstone', 'simplex', 'sketchy', 'slate', 'solar', 'spacelab', 'superhero', 'united', 'yeti'].forEach((template) => {
            Formio.config.libs[template] = {
                dependencies: ['bootstrap-icons'],
                css: `${Formio.cdn.bootswatch}/dist/${template}/bootstrap.min.css`
            };
        });
        const id = Formio.config.id || `formio-${Math.random().toString(36).substring(7)}`;

        // Create a new wrapper and add the element inside of a new wrapper.
        let wrapper = Formio.createElement('div', {
            'id': `${id}-wrapper`
        });
        element.parentNode.insertBefore(wrapper, element);

        // If we include the libraries, then we will attempt to run this in shadow dom.
        const useShadowDom = Formio.config.includeLibs && !Formio.config.noshadow && (typeof wrapper.attachShadow === 'function');
        if (useShadowDom) {
            wrapper = wrapper.attachShadow({
                mode: 'open'
            });
            options.shadowRoot = wrapper;
        }

        element.parentNode.removeChild(element);
        wrapper.appendChild(element);

        // If this is inside of shadow dom, then we need to add the styles and scripts to the shadow dom.
        const libWrapper = useShadowDom ? wrapper : document.body;

        // Load the renderer styles.
        await Formio.addStyles(libWrapper, Formio.config.embedCSS || `${Formio.cdn.js}/formio.embed.css`);

        // Add a loader.
        Formio.addLoader(wrapper);

        const formioSrc = Formio.config.full ? 'formio.full' : 'formio.form';
        const renderer = Formio.config.debug ? formioSrc : `${formioSrc}.min`;
        Formio.FormioClass = await Formio.addScript(
            libWrapper,
            Formio.formioScript(Formio.config.script || `${Formio.cdn.js}/${renderer}.js`, builder),
            'Formio',
            builder ? 'isBuilder' : 'isRenderer'
        );
        Formio.FormioClass.cdn = Formio.cdn;
        Formio.FormioClass.setBaseUrl(options.baseUrl || Formio.baseUrl || Formio.config.base);
        Formio.FormioClass.setProjectUrl(options.projectUrl || Formio.projectUrl || Formio.config.project);
        Formio.FormioClass.language = Formio.language;
        Formio.setLicense(Formio.license || Formio.config.license || false);
        Formio.modules.forEach((module) => {
            Formio.FormioClass.use(module);
        });

        if (Formio.icons) {
            Formio.FormioClass.icons = Formio.icons;
        }

        if (Formio.pathType) {
            Formio.FormioClass.setPathType(Formio.pathType);
        }

        // Add libraries if they wish to include the libs.
        if (Formio.config.template && Formio.config.includeLibs) {
            await Formio.addLibrary(
                libWrapper,
                Formio.config.libs[Formio.config.template],
                Formio.config.template
            );
        }

        if (!Formio.config.libraries) {
            Formio.config.libraries = Formio.config.modules || {};
        }

        // Adding premium if it is provided via the config.
        if (Formio.config.premium) {
            Formio.config.libraries.premium = Formio.config.premium;
        }

        // Allow adding dynamic modules.
        if (Formio.config.libraries) {
            for (const name in Formio.config.libraries) {
                const lib = Formio.config.libraries[name];
                lib.use = lib.use || true;
                await Formio.addLibrary(libWrapper, lib, name);
            }
        }

        await Formio.addStyles(libWrapper, Formio.formioScript(Formio.config.style || `${Formio.cdn.js}/${renderer}.css`, builder));

        // In some cases (dropdown list of autocomplete or confirmation popup of skethpad) we render elements outside of shadow dom
        // and as result we can't get access to this styles outside of shadow dom. Here i added needed styles to work it properly
        if(useShadowDom) {
            await Formio.addStyles(document.body, Formio.formioScript(Formio.config.style || `${Formio.cdn.js}/${renderer}.css`, builder));
            const toGlobalStyleLibs = ["bootstrap", "bootstrap4", "bootstrap-icons"];
            const libHrefs = toGlobalStyleLibs.map(key => Formio.config.libs[key]).filter(Boolean).map(href => href.css);
            await Formio.addStyles(document.body, libHrefs, builder);
        }
        if (Formio.config.before) {
            await Formio.config.before(Formio.FormioClass, element, Formio.config);
        }
        Formio.FormioClass.license = true;
        Formio._formioReady(Formio.FormioClass);
        return wrapper;
    }

    // Called after an instance has been created.
    static async afterCreate(instance, wrapper, readyEvent) {
        const loader = wrapper.querySelector('.formio-loader');
        if (loader) {
            wrapper.removeChild(loader);
        }
        Formio.FormioClass.events.emit(readyEvent, instance);
        if (Formio.config.after) {
            Formio.debug('Calling ready callback');
            Formio.config.after(instance, Formio.config);
        }
        return instance;
    }

    // Create a new form.
    static async createForm(element, form, options = {}) {
        if (Formio.FormioClass) {
            return Formio.FormioClass.createForm(element, form, {
                ...options,
                ...{ noLoader: true }
            });
        }
        const wrapper = await Formio.init(element, options);
        return Formio.FormioClass.createForm(element, form, {
            ...options,
            ...{ noLoader: true }
        }).then((instance) => {
            // Set the default submission data.
            if (Formio.config.submission) {
                Formio.debug('Setting submission', Formio.config.submission);
                instance.submission = Formio.config.submission;
            }

            // Call the after create method.
            Formio.afterCreate(instance, wrapper, 'formEmbedded');
            return instance;
        });
    }

    // Create a form builder.
    static async builder(element, form, options = {}) {
        if (Formio.FormioClass?.builder) {
            return Formio.FormioClass.builder(element, form, options);
        }
        const wrapper = await Formio.init(element, options, true);
        return Formio.FormioClass.builder(element, form, options).then((instance) => {
            Formio.afterCreate(instance, wrapper, 'builderEmbedded');
            return instance;
        });
    }

    // Create a report.
    static Report = {
        create: async(element, submission, options = {}) => {
            if (Formio.FormioClass?.Report) {
                return Formio.FormioClass.Report.create(element, submission, options);
            }
            const wrapper = await Formio.init(element, options, true);
            return Formio.FormioClass.Report.create(element, submission, options).then((instance) => {
                Formio.afterCreate(instance, wrapper, 'reportEmbedded');
                return instance;
            });
        }
    };
}

CDN.defaultCDN = Formio.version.includes('rc') ? 'https://cdn.test-form.io' : 'https://cdn.form.io';

export class Form {
    constructor(element, form, options) {
        this.form = form;
        this.element = element;
        this.options = options || {};
        this.init();
        this.instance = {
            proxy: true,
            ready: this.ready,
            destroy: () => {}
        };
    }

    init() {
        if (this.instance && !this.instance.proxy) {
            this.instance.destroy();
        }
        this.element.innerHTML = '';
        this.ready = this.create().then((instance) => {
            this.instance = instance;
            this.form = instance.form;
            return instance;
        });
    }

    create() {
        return Formio.createForm(this.element, this.form, this.options);
    }

    setForm(form) {
        this.form = form;
        if (this.instance) {
            this.instance.setForm(form);
        }
    }

    setDisplay(display) {
        if (this.instance.proxy) {
            return this.ready;
        }
        this.form.display = display;
        this.instance.destroy();
        this.ready = this.create().then((instance) => {
            this.instance = instance;
            this.setForm(this.form);
        });
        return this.ready;
    }
}

export class FormBuilder extends Form {
    create() {
        return Formio.builder(this.element, this.form, this.options);
    }
}

Formio.Form = Form;
Formio.FormBuilder = FormBuilder;
