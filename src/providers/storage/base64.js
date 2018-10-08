import Promise from 'native-promise-only';

import Storage from './Storage';

export default class Base64 extends Storage {
  static name = 'base64';

  uploadFile(file, fileName) {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onload = (event) => {
        const url = event.target.result;
        resolve(Object.assign(this.getDefaultFileData(file, fileName), {
          data: url.replace(`data:${file.type};base64,`, ''),
          url,
        }));
      };

      reader.onerror = reject.bind(this);

      reader.readAsDataURL(file);
    });
  }
}
