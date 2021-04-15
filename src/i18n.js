import enTranslation from './translations/en';
import {
  fastCloneDeep
} from './utils/utils';
export default {
  lng: 'en',
  nsSeparator: '::',
  keySeparator: '.|.',
  pluralSeparator: '._.',
  contextSeparator: '._.',
  resources: {
    en: {
      translation: fastCloneDeep(enTranslation)
    }
  }
};
