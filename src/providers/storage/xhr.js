import _trim from 'lodash/trim';

export const setXhrHeaders = (formio, xhr) => {
  const { headers } = formio.options;
  if (headers) {
    const ValidHeaders = {
      'Content-Disposition': true,
      Authorization: true,
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
    return items
      .filter((item) => !!item)
      .map(XHR.trim)
      .join('/');
  },
  async upload(
    formio,
    type,
    xhrCallback,
    file,
    fileName,
    dir,
    progressCallback,
    groupPermissions,
    groupId,
    abortCallback,
    multipartOptions,
  ) {
    // Use makeRequest so portal plugins (e.g. x-remote-token) are applied. GOTCHA(G-FJS05)
    let serverResponse;
    try {
      serverResponse = await formio.makeRequest(
        'file',
        `${formio.formUrl}/storage/${type}`,
        'POST',
        {
          name: XHR.path([dir, fileName]),
          size: file.size,
          type: file.type,
          groupPermissions,
          groupId,
          multipart: multipartOptions,
        },
      );
    } catch (err) {
      if (err?.networkError) {
        throw err;
      }
      if (err instanceof Error) {
        throw err;
      }
      const message = typeof err === 'string' ? err : err?.message || err?.error;
      const error = new Error(message || 'Unable to sign file.');
      if (err?.status === 504) {
        error.networkError = true;
      }
      throw error;
    }
    return await XHR.makeXhrRequest(
      formio,
      xhrCallback,
      serverResponse,
      progressCallback,
      abortCallback,
    );
  },
  makeXhrRequest(formio, xhrCallback, serverResponse, progressCallback, abortCallback) {
    return new Promise((resolve, reject) => {
      // Send the file with data.
      const xhr = new XMLHttpRequest();
      xhr.openAndSetHeaders = (...params) => {
        xhr.open(...params);
        setXhrHeaders(formio, xhr);
      };
      Promise.resolve(xhrCallback(xhr, serverResponse, abortCallback))
        .then((payload) => {
          // if payload is nullish we can assume the provider took care of the entire upload process
          if (!payload) {
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
            } else if (xhr.status === 504) {
              const error = new Error('Network request failed');
              error.networkError = true;
              reject(error);
            } else {
              reject(xhr.response || 'Unable to upload file');
            }
          };

          // Get the request and send it to the server.
          xhr.send(payload);
        })
        .catch(reject);
    });
  },
};

export default XHR;
