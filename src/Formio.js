import { Formio as CoreFormio } from '@formio/core/sdk';
import { Formio as FormioEmbed } from './Embed';
import CDN from './CDN';
import Providers from './providers';
const isNil = (val) => val === null || val === undefined;

export class Formio extends CoreFormio {
  static cdn = new CDN();
  static Providers = Providers;
  static version = 'FORMIO_VERSION';
  static Promise = Promise;
  static formioReady = FormioEmbed.formioReady;
  static config = FormioEmbed.config;
  static builder = FormioEmbed.builder;
  static Form = FormioEmbed.Form;
  static FormBuilder = FormioEmbed.FormBuilder;
  static use = FormioEmbed.use;
  static createForm = FormioEmbed.createForm;
  static setBaseUrl(url) {
    CoreFormio.setBaseUrl(url);
    FormioEmbed.setBaseUrl(url, true);
  }

  static setApiUrl(url) {
    CoreFormio.setApiUrl(url);
    FormioEmbed.setApiUrl(url, true);
  }

  static setAppUrl(url) {
    CoreFormio.setAppUrl(url);
    FormioEmbed.setAppUrl(url, true);
  }

  static setProjectUrl(url) {
    CoreFormio.setProjectUrl(url);
    FormioEmbed.setProjectUrl(url, true);
  }

  static setPathType(type) {
    CoreFormio.setPathType(type);
    FormioEmbed.setPathType(type, true);
  }

  uploadFile(storage, file, fileName, dir, progressCallback, url, options, fileKey, groupPermissions, groupId, uploadStartCallback, abortCallback) {
    const requestArgs = {
      provider: storage,
      method: 'upload',
      file: file,
      fileName: fileName,
      dir: dir
    };
    fileKey = fileKey || 'file';
    const request = Formio.pluginWait('preRequest', requestArgs)
      .then(() => {
        return Formio.pluginGet('fileRequest', requestArgs)
          .then((result) => {
            if (storage && isNil(result)) {
              const Provider = Providers.getProvider('storage', storage);
              if (Provider) {
                const provider = new Provider(this);
                if (uploadStartCallback) {
                  uploadStartCallback();
                }
                return provider.uploadFile(file, fileName, dir, progressCallback, url, options, fileKey, groupPermissions, groupId, abortCallback);
              }
              else {
                throw ('Storage provider not found');
              }
            }
            return result || { url: '' };
          });
      });
    return Formio.pluginAlter('wrapFileRequestPromise', request, requestArgs);
  }

  downloadFile(file, options) {
    const requestArgs = {
      method: 'download',
      file: file
    };
    const request = Formio.pluginWait('preRequest', requestArgs)
      .then(() => {
        return Formio.pluginGet('fileRequest', requestArgs)
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
    return Formio.pluginAlter('wrapFileRequestPromise', request, requestArgs);
  }

  deleteFile(file, options) {
    const requestArgs = {
      method: 'delete',
      file: file
    };
    const request = Formio.pluginWait('preRequest', requestArgs)
      .then(() => {
        return Formio.pluginGet('fileRequest', requestArgs)
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
    return Formio.pluginAlter('wrapFileRequestPromise', request, requestArgs);
  }
}
