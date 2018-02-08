'use strict';

var Promise = require("native-promise-only");
var s3 = function s3(formio) {
  return {
    uploadFile: function uploadFile(file, fileName, dir, progressCallback) {
      return new Promise(function (resolve, reject) {
        // Send the pre response to sign the upload.
        var pre = new XMLHttpRequest();

        var prefd = new FormData();
        prefd.append('name', fileName);
        prefd.append('size', file.size);
        prefd.append('type', file.type);

        // This only fires on a network error.
        pre.onerror = function (err) {
          err.networkError = true;
          reject(err);
        };

        pre.onabort = function (err) {
          reject(err);
        };

        pre.onload = function () {
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
            for (var key in response.data) {
              fd.append(key, response.data[key]);
            }
            fd.append('file', file);

            // Fire on network error.
            xhr.onerror = function (err) {
              err.networkError = true;
              reject(err);
            };

            xhr.onload = function () {
              if (xhr.status >= 200 && xhr.status < 300) {
                resolve({
                  storage: 's3',
                  name: fileName,
                  bucket: response.bucket,
                  key: response.data.key,
                  url: response.url + response.data.key,
                  acl: response.data.acl,
                  size: file.size,
                  type: file.type
                });
              } else {
                reject(xhr.response || 'Unable to upload file');
              }
            };

            xhr.onabort = function (err) {
              reject(err);
            };

            xhr.open('POST', response.url);

            xhr.send(fd);
          } else {
            reject(pre.response || 'Unable to sign file');
          }
        };

        pre.open('POST', formio.formUrl + '/storage/s3');

        pre.setRequestHeader('Accept', 'application/json');
        pre.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        var token = formio.getToken();
        if (token) {
          pre.setRequestHeader('x-jwt-token', token);
        }

        pre.send(JSON.stringify({
          name: fileName,
          size: file.size,
          type: file.type
        }));
      });
    },
    downloadFile: function downloadFile(file) {
      if (file.acl !== 'public-read') {
        return formio.makeRequest('file', formio.formUrl + '/storage/s3?bucket=' + file.bucket + '&key=' + file.key, 'GET');
      } else {
        return Promise.resolve(file);
      }
    }
  };
};

s3.title = 'S3';
module.exports = s3;