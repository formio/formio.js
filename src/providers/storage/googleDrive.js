import NativePromise from 'native-promise-only';
import { setXhrHeaders } from './xhr';
const googledrive = (formio) => ({
  uploadFile(file, fileName, dir, progressCallback, url, options, fileKey, groupPermissions, groupId, abortCallback) {
    return new NativePromise(((resolve, reject) => {
      // Send the file with data.
      const xhr = new XMLHttpRequest();

      if (typeof progressCallback === 'function') {
        xhr.upload.onprogress = progressCallback;
      }

      if (typeof abortCallback === 'function') {
        abortCallback(() => xhr.abort());
      }

      const fd = new FormData();
      fd.append('name', fileName);
      fd.append('dir', dir);
      fd.append('file', file);

      // Fire on network error.
      xhr.onerror = (err) => {
        err.networkError = true;
        reject(err);
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          const response = JSON.parse(xhr.response);
          response.storage = 'googledrive';
          response.size = file.size;
          response.type = file.type;
          response.groupId = groupId;
          response.groupPermissions = groupPermissions;
          resolve(response);
        }
        else {
          reject(xhr.response || 'Unable to upload file');
        }
      };

      xhr.onabort = reject;

      xhr.open('POST', `${formio.formUrl}/storage/gdrive`);

      setXhrHeaders(formio, xhr);

      const token = formio.getToken();
      if (token) {
        xhr.setRequestHeader('x-jwt-token', token);
      }
      xhr.send(fd);
    }));
  },
  downloadFile(file) {
    const token = formio.getToken();
    file.url =
      `${formio.formUrl}/storage/gdrive?fileId=${file.id}&fileName=${file.originalName}${token ? `&x-jwt-token=${token}` : ''}`;
    return NativePromise.resolve(file);
  }
});

googledrive.title = 'Google Drive';
export default googledrive;
