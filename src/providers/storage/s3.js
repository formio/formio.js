import Promise from 'native-promise-only';
import _trim from 'lodash/trim';
const trim = function(text) {
  return _trim(text, '/');
};
const s3 = (formio) => ({
  uploadFile(file, fileName, dir, progressCallback) {
    return new Promise(((resolve, reject) => {
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

          response.data.fileName = fileName;
          response.data.key = `${trim(response.data.key)}/${trim(dir)}/${trim(fileName)}`;

          // Fire on network error.
          xhr.onerror = (err) => {
            err.networkError = true;
            reject(err);
          };

          xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              resolve({
                storage: 's3',
                name: fileName,
                bucket: response.bucket,
                key: response.data.key,
                url: `${trim(response.url)}/${trim(response.data.key)}`,
                acl: response.data.acl,
                size: file.size,
                type: file.type
              });
            }
            else {
              reject(xhr.response || 'Unable to upload file');
            }
          };

          xhr.onabort = reject;
          if (response.signed) {
            xhr.open('PUT', response.signed);
            xhr.setRequestHeader('Content-Type', file.type);
            xhr.send(file);
          }
          else {
            const fd = new FormData();
            for (const key in response.data) {
              fd.append(key, response.data[key]);
            }
            fd.append('file', file);
            xhr.open('POST', response.url);
            xhr.send(fd);
          }
        }
        else {
          reject(pre.response || 'Unable to sign file');
        }
      };

      pre.open('POST', `${formio.formUrl}/storage/s3`);

      pre.setRequestHeader('Accept', 'application/json');
      pre.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
      const token = formio.getToken();
      if (token) {
        pre.setRequestHeader('x-jwt-token', token);
      }

      pre.send(JSON.stringify({
        name: trim(`${trim(dir)}/${trim(fileName)}`),
        size: file.size,
        type: file.type
      }));
    }));
  },
  downloadFile(file) {
    if (file.acl !== 'public-read') {
      return formio.makeRequest('file', `${formio.formUrl}/storage/s3?bucket=${trim(file.bucket)}&key=${trim(file.key)}`, 'GET');
    }
    else {
      return Promise.resolve(file);
    }
  }
});

s3.title = 'S3';
export default s3;
