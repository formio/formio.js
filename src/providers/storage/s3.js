var Q = require('Q')

module.exports = function(formio) {
  return {
    title: 'S3',
    name: 's3',
    uploadFile: function(file, fileName, dir, progressCallback) {
      var defer = Q.defer();

      // Send the pre response to sign the upload.
      var pre = new XMLHttpRequest();

      var prefd = new FormData();
      prefd.append('name', fileName);
      prefd.append('size', file.size);
      prefd.append('type', file.type);

      // This only fires on a network error.
      pre.onerror = function(err) {
        err.networkError = true;
        defer.reject(err);
      }

      pre.onabort = function(err) {
        defer.reject(err);
      }

      pre.onload = function() {
        if (pre.status >= 200 && pre.status < 300) {
          var response = JSON.parse(pre.response);

          // Send the file with data.
          var xhr = new XMLHttpRequest();

          if (typeof progressCallback === 'function') {
            xhr.upload.onprogress = progressCallback;
          }

          response.data.fileName = fileName;
          response.data.key += dir + fileName;

          var fd = new FormData();
          for(var key in response.data) {
            fd.append(key, response.data[key]);
          }
          fd.append('file', file);

          // Fire on network error.
          xhr.onerror = function(err) {
            err.networkError = true;
            defer.reject(err);
          }

          xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
              defer.resolve({
                storage: 's3',
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

          xhr.onabort = function(err) {
            defer.reject(err);
          }

          xhr.open('POST', response.url);

          xhr.send(fd);
        }
        else {
          defer.reject(pre.response || 'Unable to sign file');
        }
      };

      pre.open('POST', formio.formUrl + '/storage/s3');

      pre.setRequestHeader('Accept', 'application/json');
      pre.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
      pre.setRequestHeader('x-jwt-token', localStorage.getItem('formioToken'));

      pre.send(JSON.stringify({
        name: fileName,
        size: file.size,
        type: file.type
      }));

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
