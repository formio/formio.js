import XHR from './xhr';
const azure = (formio) => ({
  uploadFile(file, fileName, dir, progressCallback) {
    return XHR.upload(formio, 'azure', (xhr, response) => {
      xhr.open('PUT', response.url);
      xhr.setRequestHeader('Content-Type', file.type);
      xhr.setRequestHeader('x-ms-blob-type', 'BlockBlob');
      return file;
    }, file, fileName, dir, progressCallback).then(() => {
      return {
        storage: 'azure',
        name: XHR.path([dir, fileName]),
        size: file.size,
        type: file.type
      };
    });
  },
  downloadFile(file) {
    return formio.makeRequest('file', `${formio.formUrl}/storage/azure?name=${XHR.trim(file.name)}`, 'GET');
  }
});

azure.title = 'Azure File Services';
export default azure;
