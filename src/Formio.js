import { Formio } from '@formio/core';
import CDN from './CDN';
import Providers from './providers';
Formio.cdn = new CDN();
Formio.Providers = Providers;
Formio.version = 'FORMIO_VERSION';

const isNil = (val) => val === null || val === undefined;
Formio.prototype.uploadFile = function (
    storage,
    file,
    fileName,
    dir,
    progressCallback,
    url,
    options,
    fileKey,
    groupPermissions,
    groupId,
    uploadStartCallback,
    abortCallback,
    multipartOptions,
) {
    const requestArgs = {
        provider: storage,
        method: 'upload',
        file: file,
        fileName: fileName,
        dir: dir,
    };
    fileKey = fileKey || 'file';
    const request = Formio.pluginWait('preRequest', requestArgs).then(() => {
        return Formio.pluginGet('fileRequest', requestArgs).then((result) => {
            if (storage && isNil(result)) {
                const Provider = Providers.getProvider('storage', storage);
                if (Provider) {
                    const provider = new Provider(this);
                    if (uploadStartCallback) {
                        uploadStartCallback();
                    }
                    return provider.uploadFile(
                        file,
                        fileName,
                        dir,
                        progressCallback,
                        url,
                        options,
                        fileKey,
                        groupPermissions,
                        groupId,
                        abortCallback,
                        multipartOptions,
                    );
                } else {
                    throw 'Storage provider not found';
                }
            }
            return result || { url: '' };
        });
    });

    return Formio.pluginAlter('wrapFileRequestPromise', request, requestArgs);
};

Formio.prototype.downloadFile = function (file, options) {
    const requestArgs = {
        method: 'download',
        file: file,
    };

    const request = Formio.pluginWait('preRequest', requestArgs).then(() => {
        return Formio.pluginGet('fileRequest', requestArgs).then((result) => {
            if (file.storage && isNil(result)) {
                const Provider = Providers.getProvider('storage', file.storage);
                if (Provider) {
                    const provider = new Provider(this);
                    return provider.downloadFile(file, options);
                } else {
                    throw 'Storage provider not found';
                }
            }
            return result || { url: '' };
        });
    });

    return Formio.pluginAlter('wrapFileRequestPromise', request, requestArgs);
};

Formio.prototype.deleteFile = function (file, options) {
    const requestArgs = {
        method: 'delete',
        file: file,
    };

    const request = Formio.pluginWait('preRequest', requestArgs).then(() => {
        return Formio.pluginGet('fileRequest', requestArgs).then((result) => {
            if (file.storage && isNil(result)) {
                const Provider = Providers.getProvider('storage', file.storage);
                if (Provider) {
                    const provider = new Provider(this);
                    return provider.deleteFile(file, options);
                } else {
                    throw 'Storage provider not found';
                }
            }
            return result || { url: '' };
        });
    });

    return Formio.pluginAlter('wrapFileRequestPromise', request, requestArgs);
};

// For reverse compatability.
Formio.Promise = Promise;
export { Formio };
