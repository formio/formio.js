var Q = require('Q')

module.exports = function(formio) {
  return {
    title: 'S3',
    name: 's3',
    uploadFile: function(file, fileName, dir, progressCallback) {
      var defer = Q.defer();
      // Sign the request
      formio.makeRequest('file', formio.formUrl + '/storage/s3', 'POST', {
        name: fileName,
        size: file.size,
        type: file.type
      })
        .then(function(response) {
          // Send the file with data.
          var xhr = new XMLHttpRequest();

          if (typeof progressCallback === 'function') {
            xhr.upload.onprogress = progressCallback;
          }

          response.data.fileName = fileName;
          response.data.key += dir + fileName;

          fd = new FormData();
          for(var key in response.data) {
            fd.append(key, response.data[key]);
          }
          fd.append('file', file);

          xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
              defer.resolve({
                name: fileName,
                bucket: response.bucket,
                key: response.data.key,
                url: response.url + response.data.key,
                acl: response.data.acl,
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
        })
        .catch(function(response) {
          defer.reject(response);
        });
      return defer.promise;
    },
    downloadFile: function(file) {
      if (file.acl !== 'public-read') {
        return formio.makeRequest('file', formio.formUrl + '/storage/s3?bucket=' + file.bucket + '&key=' + file.key, 'GET');
      }
      else {
        return Q(file);
      }
    }
  };
};
