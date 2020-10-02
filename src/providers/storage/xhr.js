import NativePromise from 'native-promise-only';
import _trim from 'lodash/trim';
const XHR = {
  trim(text) {
    return _trim(text, '/');
  },
  path(items) {
    return items.filter(item => !!item).map(XHR.trim).join('/');
  },
  upload(formio, type, xhrCb, file, fileName, dir, progressCallback, groupPermissions, groupId) {
    return new NativePromise(((resolve, reject) => {
      // Send the pre response to sign the upload.
      const pre = new XMLHttpRequest();

      // This only fires on a network error.
      pre.onerror = (err) => {
        err.networkError = true;
        reject(err);
      };

      pre.onabort = reject;
      pre.onload = () => {
        if (pre.status >= 200 && pre.status < 300) {
          const response = JSON.parse(pre.response);

          // Send the file with data.
          const xhr = new XMLHttpRequest();

          if (typeof progressCallback === 'function') {
            xhr.upload.onprogress = progressCallback;
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

          // Fired when the response has made it back from the server.
          xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              resolve(response);
            }
            else {
              reject(xhr.response || 'Unable to upload file');
            }
          };

          // Set the onabort error callback.
          xhr.onabort = reject;

          // Get the request and send it to the server.
          xhr.send(xhrCb(xhr, response));
        }
        else {
          reject(pre.response || 'Unable to sign file');
        }
      };

      pre.open('POST', `${formio.formUrl}/storage/${type}`);
      pre.setRequestHeader('Accept', 'application/json');
      pre.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
      const token = formio.getToken();
      if (token) {
        pre.setRequestHeader('x-jwt-token', token);
      }

      pre.send(JSON.stringify({
        name: XHR.path([dir, fileName]),
        size: file.size,
        type: file.type,
        groupPermissions,
        groupId,
      }));
    }));
  }
};

export default XHR;
