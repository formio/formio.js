import enTranslation from './translations/en';
import deTranslation from './translations/de';
import {
  fastCloneDeep
} from './utils';

export default {
  lng: 'en',
  nsSeparator: '::',
  keySeparator: '.|.',
  pluralSeparator: '._.',
  contextSeparator: '._.',
  resources: {
    en: {
      translation: fastCloneDeep(enTranslation)
    },
    de: {
      translation: fastCloneDeep(deTranslation)
    }
  }
};
