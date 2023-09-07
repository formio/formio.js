import NativePromise from 'native-promise-only';
import XHR from './xhr';
const s3 = (formio) => ({
  uploadFile(file, fileName, dir, progressCallback, url, options, fileKey, groupPermissions, groupId, abortCallback) {
    return XHR.upload(formio, 's3', (xhr, response) => {
      response.data.fileName = fileName;
      response.data.key = XHR.path([response.data.key, dir, fileName]);
      if (response.signed) {
        xhr.openAndSetHeaders('PUT', response.signed.url);
        Object.keys(response.data.headers).forEach(key => {
          xhr.setRequestHeader(key, response.data.headers[key]);
        });
        return file;
      }
      else {
        const fd = new FormData();
        for (const key in response.data) {
          fd.append(key, response.data[key]);
        }
        fd.append('file', file);
        xhr.openAndSetHeaders('POST', response.url);
        return fd;
      }
    }, file, fileName, dir, progressCallback, groupPermissions, groupId, abortCallback).then((response) => {
      return {
        storage: 's3',
        name: fileName,
        bucket: response.bucket,
        key: response.data.key,
        url: XHR.path([response.url, response.data.key]),
        acl: response.data.acl,
        size: file.size,
        type: file.type
      };
    });
  },
  downloadFile(file) {
    if (file.acl !== 'public-read') {
      return formio.makeRequest('file', `${formio.formUrl}/storage/s3?bucket=${XHR.trim(file.bucket)}&key=${XHR.trim(file.key)}`, 'GET');
    }
    else {
      return NativePromise.resolve(file);
    }
  }
});

s3.title = 'S3';
export default s3;
