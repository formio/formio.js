import XHR from './xhr';
function azure(formio) {
  return {
    uploadFile(file, fileName, dir, progressCallback, url, options, fileKey, groupPermissions, groupId, abortCallback) {
      return XHR.upload(formio, 'azure', (xhr, response) => {
        xhr.openAndSetHeaders('PUT', response.url);
        xhr.setRequestHeader('Content-Type', file.type);
        xhr.setRequestHeader('x-ms-blob-type', 'BlockBlob');
        return file;
      }, file, fileName, dir, progressCallback, groupPermissions, groupId, abortCallback).then((response) => {
        return {
          storage: 'azure',
          name: XHR.path([dir, fileName]),
          size: file.size,
          type: file.type,
          groupPermissions,
          groupId,
          key: response.key,
        };
      });
    },
    downloadFile(file) {
      return formio.makeRequest('file', `${formio.formUrl}/storage/azure?name=${XHR.trim(file.name)}`, 'GET');
    },
    deleteFile: function deleteFile(fileInfo) {
      var url = `${formio.formUrl}/storage/azure?name=${XHR.trim(fileInfo.name)}&key=${XHR.trim(fileInfo.key)}`;
      return formio.makeRequest('', url, 'delete');
    }
  };
}

azure.title = 'Azure File Services';
export default azure;
