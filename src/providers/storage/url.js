var Q = require('Q')

module.exports = function(formio) {
  return {
    title: 'Url',
    name: 'url',
    uploadFile: function(file, fileName, dir, progressCallback) {
      var defer = Q.defer();

      var data = {
        dir: dir,
        name: fileName,
        file: file
      };

      // Send the file with data.
      var xhr = new XMLHttpRequest();

      if (typeof progressCallback === 'function') {
        xhr.upload.onprogress = progressCallback;
      }

      fd = new FormData();
      for(var key in data) {
        fd.append(key, data[key]);
      }

      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
          // Need to test if xhr.response is decoded or not.
          defer.resolve({
            storage: 'url',
            name: fileName,
            url: xhr.response.url,
            size: file.size,
            type: file.type
          });
        }
        else {
          defer.reject(xhr.response || 'Unable to upload file');
        }
      };

      // Fire on network error.
      xhr.onerror = function() {
        defer.reject(xhr);
      }

      xhr.onabort = function() {
        defer.reject(xhr);
      }

      xhr.open('POST', response.url);

      xhr.send(fd);
      return defer.promise;
    },
    downloadFile: function(file) {
      // Return the original as there is nothing to do.
      Q(file);
    }
  };
};
