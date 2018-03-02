import Promise from 'native-promise-only';

const base64 = function() {
  return {
    title: 'Base64',
    name: 'base64',
    uploadFile: function(file, fileName) {
      const reader = new FileReader();

      return new Promise((resolve, reject) => {
        reader.onload = (event) => {
          const url = event.target.result;
          resolve({
            storage: 'base64',
            name: fileName,
            url: url,
            size: file.size,
            type: file.type,
            data: url.replace(`data:${file.type};base64,`, '')
          });
        };

        reader.onerror = () => {
          return reject(this);
        };

        reader.readAsDataURL(file);
      });
    },
    downloadFile: function(file) {
      // Return the original as there is nothing to do.
      return Promise.resolve(file);
    }
  };
};

base64.title = 'Base64';
export default base64;
