import Promise from 'native-promise-only';
import _ from 'lodash';

import Request from './Request';
import Storage from './Storage';

export default class S3 extends Storage {
  static name = 's3';

  uploadFile(file, fileName, dir, progressCallback) {
    return new Promise(((resolve, reject) => {
      // Send the pre response to sign the upload.
      new Request(reject)
        .setToken(this.formio)
        .setHeader('Accept', 'application/json')
        .setHeader('Content-Type', 'application/json; charset=UTF-8')
        .send(`${this.formio.formUrl}/storage/s3`, JSON.stringify({
          name: path([dir, fileName]),
          size: file.size,
          type: file.type,
        }))
        .success((result) => {
          const response = JSON.parse(result.response);

          // Send the file with data.
          response.data.fileName = fileName;
          response.data.key = path([response.data.key, dir, fileName]);

          const xhr = new Request(reject, progressCallback);

          if (response.signed) {
            xhr.setHeader('Content-Type', file.type).put(response.signed, file);
          }
          else {
            response.data.file = file;
            xhr.post(response.url, response.data);
          }

          xhr.success(() => resolve(Object.assign(
            this.getDefaultFileData(file, fileName),
            {
              url: path([response.url, response.data.key]),
              bucket: response.bucket,
              key: response.data.key,
              acl: response.data.acl,
            })))
          .failure((err = 'Unable to upload file') => reject(err));
        })
        .failure((err = 'Unable to sign file') => reject(err));
    }));
  }

  downloadFile(file) {
    return (file.acl !== 'public-read')
      ? this.formio.makeRequest(
        'file',
        `${this.formio.formUrl}/storage/s3?bucket=${trim(file.bucket)}&key=${trim(file.key)}`,
        'GET'
      )
      : super.downloadFile(file);
  }
}

function trim(text) {
  return _.trim(text, '/');
}

function path(items) {
  return items.filter(Boolean).map(trim).join('/');
}
