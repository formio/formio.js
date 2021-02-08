import NativePromise from 'native-promise-only';

const fileProcessor = (formio, config) => (file, options) =>
  new NativePromise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

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
        const mimetype = xhr.getResponseHeader('Content-Type') || file.type;
        resolve(new File([xhr.response], file.name, { type: mimetype }));
      }
      else {
        reject(xhr.response || 'Unable to process file');
      }
    };

    // Set the onabort error callback.
    xhr.onabort = reject;

    xhr.open('POST', config.url);
    const token = formio.getToken();
    if (token) {
      xhr.setRequestHeader('x-jwt-token', token);
    }
    xhr.responseType = 'arraybuffer';

    const data = new FormData();
    data.append('file', file);
    data.append('processorOptions', JSON.stringify(config.options || {}));
    data.append('options', JSON.stringify(options || {}));

    // Get the request and send it to the server.
    xhr.send(data);
  });

export default fileProcessor;
