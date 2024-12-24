import { Evaluator } from '@formio/core/utils';
import i18n from '../i18n';
const i18Defaults = {};
for (const lang in i18n.resources) {
    if (i18n.resources.hasOwnProperty(lang)) {
        i18Defaults[lang] = i18n.resources[lang].translation;
    }
}

/**
 * This file is used to mimic the i18n library interface.
 */
export class I18n {
    languages = i18Defaults;
    language = 'en';
    currentLanguage = i18Defaults.en;
    constructor(languages = {}) {
        this.setLanguages(languages);
        this.changeLanguage(this.language);
    }

    get defaultKeys() {
        return i18n.defaultKeys || {};
    }

    setLanguages(languages) {
        if (languages.resources) {
            for (const lang in languages.resources) {
                if (languages.resources.hasOwnProperty(lang)) {
                    languages[lang] = languages.resources[lang].translation;
                }
            }
            delete languages.resources;
        }
        if (languages.lng) {
            languages.language = languages.lng;
            delete languages.lng;
        }
        // Do not use these configurations.
        delete languages.nsSeparator;
        delete languages.keySeparator;
        delete languages.pluralSeparator;
        delete languages.contextSeparator;

        // Now establish the languages default.
        if (languages.language) {
            this.language = languages.language;
        }
        for (const lang in languages) {
            if (lang !== 'language' && languages.hasOwnProperty(lang)) {
                if (!this.languages[lang]) {
                    this.languages[lang] = {};
                }
                this.languages[lang] = { ...this.languages[lang], ...languages[lang] };
            }
        }
    }

    static init(languages = {}) {
        return new I18n(languages);
    }

    dir(lang = '') {
        lang = lang || this.language;
        const rtls = ['ar', 'he', 'fa', 'ps', 'ur'];
        return rtls.includes(lang) ? 'rtl' : 'ltr';
    }

    static createInstance() {
        return new I18n();
    }

    changeLanguage(language, ready = null) {
        if (!this.languages[language]) {
            language = 'en';
        }
        this.language = language;
        this.currentLanguage = this.languages[language] ? this.languages[language] : {};
        if (ready) {
            ready();
        }
    }

    addResourceBundle(language, type, strings) {
        this.languages[language] = strings;
    }

    t(text, ...args) {
        let currentTranslation = this.currentLanguage[text];
        // provide compatibility with cases where the entire phrase is used as a key
        // get the phrase that is possibly being used as a key
        const defaultKey = this.defaultKeys[text];
        if (defaultKey && this.currentLanguage[defaultKey]) {
            // get translation using the phrase as a key
            currentTranslation = this.currentLanguage[defaultKey];
        }

        if (currentTranslation) {
            const customTranslationFieldName = args[0]?.field;
            if (customTranslationFieldName && this.currentLanguage[customTranslationFieldName]) {
                args[0].field = this.currentLanguage[customTranslationFieldName]
            }
            return Evaluator.interpolateString(currentTranslation, ...args);
        }
        return Evaluator.interpolateString(text, ...args);
    }
}
