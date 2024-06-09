import { Formio } from './Embed';
/**
 * Inline embed a form within a webpage.
 * @param {*} config - Configuration to configure how the inline embed is rendered.
 */
export function embed(config = {}) {
    const scripts = document.getElementsByTagName('script');
    config = Object.assign({}, window.FormioConfig || {}, config);
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
        let cdnSrc = '';
        if (['js', 'offline'].includes(scriptSrc[scriptSrc.length - 1])) {
            scriptSrc.pop();
            scriptSrc = cdnSrc = scriptSrc.join('/');
            scriptSrc += '/js';
        }
        else {
            scriptSrc = scriptSrc.join('/');
        }
        const debug = (query.debug === 'true' || query.debug === '1');
        const renderer = debug ? 'formio.form' : 'formio.form.min';
        Formio.config = Object.assign({
            script: query.script || (`${scriptSrc}/${renderer}.js`),
            style: query.styles || (`${scriptSrc}/${renderer}.css`),
            cdn: query.cdn || cdnSrc,
            class: (query.class || 'formio-form-wrapper'),
            src: query.src,
            form: null,
            submission: null,
            project: query.project,
            base: query.base || 'https://api.form.io',
            submit: query.submit,
            includeLibs: (query.libs === 'true' || query.libs === '1'),
            noshadow: (query.shadow === 'false' || query.shadow === '0'),
            template: query.template || 'bootstrap',
            debug: debug,
            config: {},
            redirect: (query.return || query.redirect),
            embedCSS: (`${scriptSrc}/formio.embed.css`),
            success: query.success || 'Thank you for your submission!',
            before: null,
            after: null
        }, config);
        if (Formio.config.alter) {
            Formio.config.alter(Formio.config);
        }
        const form = (Formio.config.form || Formio.config.src);
        if (form) {
            Formio.debug('Embedding Configuration', config);

            // The id for this embedded form.
            Formio.config.id = `formio-${Math.random().toString(36).substring(7)}`;
            Formio.debug('Creating form element');
            const element = Formio.createElement('div', {
                'id': Formio.config.id,
                class: Formio.config.class
            });
            // insertAfter doesn't exist, but effect is identical.
            thisScript.parentNode.insertBefore(element, thisScript.parentNode.firstElementChild.nextSibling);
            Formio.createForm(element, form, Formio.config.config).then((instance) => {
                if (Formio.config.submit) {
                    instance.nosubmit = true;
                }

                // Trigger the submit done event.
                instance.on('submitDone', (submission) => Formio.submitDone(instance, submission));

                // Configure a redirect.
                instance.on('submit', (submission) => {
                    Formio.debug("on('submit')", submission);
                    if (Formio.config.submit) {
                        Formio.debug(`Sending submission to ${Formio.config.submit}`);
                        const headers = {
                            'content-type': 'application/json'
                        };
                        const token = Formio.FormioClass.getToken();
                        if (token) {
                            headers['x-jwt-token'] = token;
                        }
                        Formio.FormioClass.fetch(Formio.config.submit, {
                            body: JSON.stringify(submission),
                            headers: headers,
                            method: 'POST',
                            mode: 'cors',
                        })
                            .then(resp => resp.json())
                            .then((submission) => {
                                Formio.submitDone(instance, submission);
                            });
                    }
                });
            });
        }
    }
    else {
        // Show an error if the script cannot be found.
        document.write('<span>Could not locate the Embedded form.</span>');
    }
}

export { Formio };
