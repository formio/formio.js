import XHR from './xhr';

/**
 * Azure File Services provider for file storage.
 * @param {object} formio formio instance
 * @returns {import('./typedefs').FileProvider} The FileProvider interface defined in index.js.
 */
function azure(formio) {
  return {
    uploadFile(
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
    ) {
      return XHR.upload(
        formio,
        'azure',
        (xhr, response) => {
          xhr.openAndSetHeaders('PUT', response.url);
          xhr.setRequestHeader('Content-Type', file.type);
          xhr.setRequestHeader('x-ms-blob-type', 'BlockBlob');
          return file;
        },
        file,
        fileName,
        dir,
        progressCallback,
        groupPermissions,
        groupId,
        abortCallback,
      ).then((response) => {
        return {
          storage: 'azure',
          name: XHR.path([
            dir,
            fileName,
          ]),
          size: file.size,
          type: file.type,
          groupPermissions,
          groupId,
          key: response.key,
        };
      });
    },
    downloadFile(file) {
      return formio.makeRequest(
        'file',
        `${formio.formUrl}/storage/azure?name=${XHR.trim(file.name)}`,
        'GET',
      );
    },
    deleteFile(fileInfo, options) {
      const name = XHR.trim(fileInfo.name);
      const key = XHR.trim(fileInfo.key);
      return formio.makeRequest(
        '',
        `${formio.formUrl}/storage/azure?name=${encodeURIComponent(name)}&key=${encodeURIComponent(key)}`,
        'delete',
      ).then((response) => {
        return {
          success: true,
          key: response?.key || key,
        };
      });
    },
  };
}

azure.title = 'Azure File Services';

export default azure;
