// All external libs URLs should be injected through this class.
// CDN libs URLs are accessible throuh CDN object properties
// like Formio.cdn.ace === 'http://cdn.form.io/ace/1.4.12'.
// For latest version use empty string
class CDN {
  static defaultCDN = 'https://cdn.form.io';
  constructor(baseUrl, overrides = {}) {
    this.baseUrl = baseUrl || CDN.defaultCDN;
    this.overrides = overrides;
    this.libs = {
      'js': '',
      'ace': '1.4.12',
      'bootstrap': '5.3.3',
      'bootstrap4': '4.6.2',
      'bootstrap5': '5.3.3',
      'bootswatch': '5.3.3',
      'bootstrap-icons': '1.11.1',
      'ckeditor': '19.0.0',
      'flatpickr': '4.6.8',
      'flatpickr-formio': '4.6.13-formio.3',
      'font-awesome': '4.7.0',
      'grid': 'latest',
      'moment-timezone': 'latest',
      'quill': '2.0.0-dev.3',
      'shortcut-buttons-flatpickr': '0.4.0',
      'uswds': '2.4.8',
      'core': ''
    };
    this.updateUrls();
  }

  getVersion(lib) {
    return this.libs[lib];
  }

  // Sets a specific library version
  setVersion(lib, version) {
    this.libs[lib] = version;
    this.updateUrls();
  }

  // Sets base CDN url for all libraries
  setBaseUrl(url) {
    this.baseUrl = url;
    this.updateUrls();
  }

  // Allows to override CDN url for a specific library
  setOverrideUrl(lib, url) {
    this.overrides[lib] = url;
    this.updateUrls();
  }

  // Removes override for a specific library
  removeOverride(lib) {
    delete this.overrides[lib];
    this.updateUrls();
  }

  // Removes all overrides
  removeOverrides() {
    this.overrides = {};
    this.updateUrls();
  }

  buildUrl(cdnUrl, lib, version) {
    let url = cdnUrl;
    if (lib) {
      url += `/${lib}`;
    }
    // Only attach the version if this is the hosted cdn.
    if (cdnUrl.match(/cdn\.(test-)?form.io/) && version && version !== 'latest') {
      url += `/${version}`;
    }
    return url;
  }

  updateUrls() {
    for (const lib in this.libs) {
      if (lib in this.overrides) {
        if (typeof this.overrides[lib] === 'string') {
          this[lib] = this.buildUrl(this.overrides[lib], lib, this.libs[lib]);
        }
        else {
          const override = this.overrides[lib];
          this[lib] = this.buildUrl(override.cdn, override.lib || '', override.version || '');
        }
      }
      else {
        this[lib] = this.buildUrl(this.baseUrl, lib, this.libs[lib]);
      }
    }
  }
}

export default CDN;
