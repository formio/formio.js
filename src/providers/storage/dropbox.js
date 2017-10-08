var Promise = require("native-promise-only");
var dropbox = function(formio) {
  return {
    uploadFile: function(file, fileName, dir, progressCallback) {
      return new Promise(function(resolve, reject) {
        // Send the file with data.
        var xhr = new XMLHttpRequest();

        if (typeof progressCallback === 'function') {
          xhr.upload.onprogress = progressCallback;
        }

        var fd = new FormData();
        fd.append('name', fileName);
        fd.append('dir', dir);
        fd.append('file', file);

        // Fire on network error.
        xhr.onerror = function(err) {
          err.networkError = true;
          reject(err);
        }

        xhr.onload = function() {
          if (xhr.status >= 200 && xhr.status < 300) {
            var response = JSON.parse(xhr.response);
            response.storage = 'dropbox';
            response.size = file.size;
            response.type = file.type;
            response.url = response.path_lower;
            resolve(response);
          }
          else {
            reject(xhr.response || 'Unable to upload file');
          }
        };

        xhr.onabort = function(err) {
          reject(err);
        }

        xhr.open('POST', formio.formUrl + '/storage/dropbox');
        var token = false;
        try {
          token = localStorage.getItem('formioToken');
        }
        catch (e) {
          // Swallow error.
        }
        if (token) {
          xhr.setRequestHeader('x-jwt-token', token);
        }
        xhr.send(fd);
      });
    },
    downloadFile: function(file) {
      var token = false;
      try {
        token = localStorage.getItem('formioToken');
      }
      catch (e) {
        token = cookies.get('formioToken');
      }
      file.url = formio.formUrl + '/storage/dropbox?path_lower=' + file.path_lower + (token ? '&x-jwt-token=' + token : '');
      return Promise.resolve(file);
    }
  };
};

dropbox.title = 'Dropbox';
module.exports = dropbox;


