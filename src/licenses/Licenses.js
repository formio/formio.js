import { Formio } from '../Formio';

export default class Licenses {
  static licenses = {};

  static addLicense(name, license) {
    Formio.License = license;
    Licenses.licenses[name] = license;
  }

  static getLicense(name) {
    return Licenses.licenses[name] || Formio.License;
  }

  static removeLicense(name) {
    try {
      delete Formio.License;
      delete Licenses.licenses[name];
    }
    // eslint-disable-next-line no-empty
    catch (err) {}
  }

  static getLicenses() {
    return Licenses.licenses;
  }
}
