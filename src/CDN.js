// All external libs URLs should be injected through this class.
// CDN libs URLs are accessible throuh CDN object properties
// like Formio.cdn.ace === 'http://cdn.form.io/ace/1.4.12'
class CDN {
  constructor(baseUrl) {
    this.baseUrl = baseUrl || 'https://cdn.form.io';
    this.libs = {
      'ace': '1.4.12',
      'bootstrap': '4.6.2',
      'ckeditor': '19.0.0',
      'flatpickr': '4.6.8',
      'flatpickr-formio': '4.6.13-formio.1',
      'font-awesome': '4.7.0',
      'grid': '',
      'moment-timezone': '0.5.38',
      'quill': '1.3.7',
      'shortcut-buttons-flatpickr': '0.4.0',
      'uswds': '2.4.8',
    };
    this.updateUrls();
  }

  getVersion(lib) {
    return this.libs[lib];
  }

  setBaseUrl(url) {
    this.baseUrl = url;
    this.updateUrls();
  }

  updateUrls() {
    for (const lib in this.libs) {
      if (this.libs[lib] === '') {
        this[lib] = `${this.baseUrl}/${lib}`;
      }
      else {
        this[lib] = `${this.baseUrl}/${lib}/${this.libs[lib]}`;
      }
    }
  }
}

export default CDN;
