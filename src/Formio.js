import { Formio as FormioCore } from '@formio/core/sdk';
import { Formio as FormioEmbed } from './Embed';
import CDN from './CDN';
import Providers from './providers';
FormioCore.cdn = new CDN();
FormioCore.Providers = Providers;
FormioCore.version = 'FORMIO_VERSION';
CDN.defaultCDN = FormioCore.version.includes('rc') ? 'https://cdn.test-form.io' : 'https://cdn.form.io';

const isNil = (val) => val === null || val === undefined;
FormioCore.prototype.uploadFile = function(storage, file, fileName, dir, progressCallback, url, options, fileKey, groupPermissions, groupId, uploadStartCallback, abortCallback, multipartOptions) {
  const requestArgs = {
    provider: storage,
    method: 'upload',
    file: file,
    fileName: fileName,
    dir: dir
  };
  fileKey = fileKey || 'file';
  const request = FormioCore.pluginWait('preRequest', requestArgs)
    .then(() => {
      return FormioCore.pluginGet('fileRequest', requestArgs)
        .then((result) => {
          if (storage && isNil(result)) {
            const Provider = Providers.getProvider('storage', storage);
            if (Provider) {
              const provider = new Provider(this);
              if (uploadStartCallback) {
                uploadStartCallback();
              }
              return provider.uploadFile(file, fileName, dir, progressCallback, url, options, fileKey, groupPermissions, groupId, abortCallback, multipartOptions);
            }
            else {
              throw ('Storage provider not found');
            }
          }
          return result || { url: '' };
        });
    });

  return FormioCore.pluginAlter('wrapFileRequestPromise', request, requestArgs);
};

FormioCore.prototype.downloadFile = function(file, options) {
  const requestArgs = {
    method: 'download',
    file: file
  };

  const request = FormioCore.pluginWait('preRequest', requestArgs)
    .then(() => {
      return FormioCore.pluginGet('fileRequest', requestArgs)
        .then((result) => {
          if (file.storage && isNil(result)) {
            const Provider = Providers.getProvider('storage', file.storage);
            if (Provider) {
              const provider = new Provider(this);
              return provider.downloadFile(file, options);
            }
            else {
              throw ('Storage provider not found');
            }
          }
          return result || { url: '' };
        });
    });

  return FormioCore.pluginAlter('wrapFileRequestPromise', request, requestArgs);
};

FormioCore.prototype.deleteFile = function(file, options) {
  const requestArgs = {
    method: 'delete',
    file: file
  };

  const request = FormioCore.pluginWait('preRequest', requestArgs)
    .then(() => {
      return FormioCore.pluginGet('fileRequest', requestArgs)
        .then((result) => {
          if (file.storage && isNil(result)) {
            const Provider = Providers.getProvider('storage', file.storage);
            if (Provider) {
              const provider = new Provider(this);
              return provider.deleteFile(file, options);
            }
            else {
              throw ('Storage provider not found');
            }
          }
          return result || { url: '' };
        });
    });

  return FormioCore.pluginAlter('wrapFileRequestPromise', request, requestArgs);
};

// Esnure we proxy the following methods to the FormioEmbed class.
['setBaseUrl', 'setApiUrl', 'setAppUrl', 'setProjectUrl', 'setPathType', 'setLicense'].forEach((fn) => {
  const baseFn = FormioCore[fn];
  FormioCore[fn] = function(arg) {
    const retVal = FormioEmbed[fn](arg, true);
    return baseFn ? baseFn.call(this, arg) : retVal;
  };
});

// For reverse compatability.
FormioCore.Promise = Promise;
FormioCore.formioReady = FormioEmbed.formioReady;
FormioCore.config = FormioEmbed.config;
FormioCore.builder = FormioEmbed.builder;
FormioCore.Report = FormioEmbed.Report;
FormioCore.Form = FormioEmbed.Form;
FormioCore.FormBuilder = FormioEmbed.FormBuilder;
FormioCore.use = FormioEmbed.use;
FormioCore.createForm = FormioEmbed.createForm;
FormioCore.submitDone = FormioEmbed.submitDone;
FormioCore.addLibrary = FormioEmbed.addLibrary;
FormioCore.addLoader = FormioEmbed.addLoader;
FormioCore.addToGlobal = (global) => {
  if (typeof global === 'object' && !global.Formio) {
    global.Formio = FormioCore;
  }
};

if (typeof global !== 'undefined') {
  FormioCore.addToGlobal(global);
}

if (typeof window !== 'undefined') {
  FormioCore.addToGlobal(window);
}

export { FormioCore as Formio };
