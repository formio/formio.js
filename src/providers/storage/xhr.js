import NativePromise from 'native-promise-only';
import _trim from 'lodash/trim';
export const setXhrHeaders = (formio, xhr) => {
  const { headers } = formio.options;
  if (headers) {
    const ValidHeaders = {
      'Content-Disposition': true,
      'Authorization': true,
    };

    for (const header in headers) {
      if (ValidHeaders[header]) {
        xhr.setRequestHeader(header, headers[header]);
      }
    }
  }
};
const XHR = {
  trim(text) {
    return _trim(text, '/');
  },
  path(items) {
    return items.filter(item => !!item).map(XHR.trim).join('/');
  },
  async upload(formio, type, xhrCallback, file, fileName, dir, progressCallback, groupPermissions, groupId, abortCallback, multipartOptions) {
    // make request to Form.io server
    const token = formio.getToken();
    let response;
    try {
      response = await fetch(`${formio.formUrl}/storage/${type}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=UTF-8',
          ...(token ? { 'x-jwt-token': token } : {}),
        },
        body: JSON.stringify({
          name: XHR.path([dir, fileName]),
          size: file.size,
          type: file.type,
          groupPermissions,
          groupId,
          multipart: multipartOptions
        })
      });
    }
    catch (err) {
      // only throws on network errors
      err.networkError = true;
      throw err;
    }
    if (!response.ok) {
      if (response.status === 504) {
        const error = new Error('Network request failed');
        error.networkError = true;
        throw error;
      }

      const message = await response.text();
      throw new Error(message || 'Unable to sign file.');
    }
    const serverResponse = await response.json();
    return await XHR.makeXhrRequest(formio, xhrCallback, serverResponse, progressCallback, abortCallback);
  },
  makeXhrRequest(formio, xhrCallback, serverResponse, progressCallback, abortCallback) {
    return new NativePromise((resolve, reject) => {
      // Send the file with data.
      let xhr = new XMLHttpRequest();
      xhr.openAndSetHeaders = (...params) => {
        xhr.open(...params);
        setXhrHeaders(formio, xhr);
      };
      NativePromise.resolve(xhrCallback(xhr, serverResponse, abortCallback)).then((payload) => {
        // if payload is nullish we can assume the provider took care of the entire upload process
        if (!payload) {
          xhr = null;
          return resolve(serverResponse);
        }
        // Fire on network error.
        xhr.onerror = (err) => {
          err.networkError = true;
          reject(err);
        };

        // Fire on network abort.
        xhr.onabort = (err) => {
          err.networkError = true;
          reject(err);
        };

        // Set the onabort error callback.
        xhr.onabort = reject;

        if (typeof progressCallback === 'function') {
          xhr.upload.onprogress = progressCallback;
        }

        if (typeof abortCallback === 'function') {
          abortCallback(() => xhr.abort());
        }
        // Fired when the response has made it back from the server.
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(serverResponse);
          }
          else if (xhr.status === 504) {
            const error = new Error('Network request failed');
            error.networkError = true;
            reject(error);
          }
          else {
            reject(xhr.response || 'Unable to upload file');
          }
        };

        // Get the request and send it to the server.
        xhr.send(payload);
      }).catch(reject);
    });
  }
};

export default XHR;
