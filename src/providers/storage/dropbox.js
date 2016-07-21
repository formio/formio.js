var Q = require('Q')

var dropbox = function(formio) {
  return {
    uploadFile: function(file, fileName, dir, progressCallback) {
      var defer = Q.defer();

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
        defer.reject(err);
      }

      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
          var response = JSON.parse(xhr.response);
          response.storage = 'dropbox';
          response.size = file.size;
          response.type = file.type;
          response.url = response.path_lower;
          defer.resolve(response);
        }
        else {
          defer.reject(xhr.response || 'Unable to upload file');
        }
      };

      xhr.onabort = function(err) {
        defer.reject(err);
      }

      xhr.open('POST', formio.formUrl + '/storage/dropbox');

      xhr.setRequestHeader('x-jwt-token', localStorage.getItem('formioToken'));

      xhr.send(fd);

      return defer.promise;
    },
    downloadFile: function(file) {
      file.url = formio.formUrl + '/storage/dropbox?path_lower=' + file.path_lower + '&x-jwt-token=' + localStorage.getItem('formioToken');
      return Q(file);
    }
  };
};

dropbox.title = 'Dropbox';
dropbox.name = 'dropbox';

module.exports = dropbox;


