import Promise from 'native-promise-only';

import Request from './Request';

export default class Storage {
  constructor(formio) {
    this.formio = formio;
  }

  get title() {
    return this.constructor.title;
  }

  uploadFile(file, fileName, dir, progressCallback, url) {
    return new Promise(((resolve, reject) => {
      const data = {
        dir,
        file,
        name: fileName,
      };

      // Send the file with data.

      new Request(reject, progressCallback)
        .setToken(this.formio)
        .post(url, data)
        .success((result) => resolve(Object.assign(
          this.getDefaultFileData(file, fileName, url),
          this.getAdditionalFileData(result, data)
        )))
        .failure((err = 'Unable to upload file') => reject(err));
    }));
  }

  downloadFile(file) {
    // Return the original as there is nothing to do.
    return Promise.resolve(file);
  }

  getDefaultFileData(file, fileName, url) {
    return {
      storage: this.title,
      name: fileName,
      size: file.size,
      type: file.type,
      url: url ? `${url}/${fileName}` : null,
    };
  }

  getAdditionalFileData() {
    return {};
  }
}
