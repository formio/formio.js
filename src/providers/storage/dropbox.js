var Q = require('Q')

var dropbox = function(formio) {
  var getDropboxToken = function() {
    var dropboxToken;
    //if ($rootScope.user && $rootScope.user.externalTokens) {
    //  angular.forEach($rootScope.user.externalTokens, function(token) {
    //    if (token.type === 'dropbox') {
    //      dropboxToken = token.token;
    //    }
    //  });
    //}
    return dropboxToken;
    //return _.result(_.find($rootScope.user.externalTokens, {type: 'dropbox'}), 'token');
  };

  return {
    uploadFile: function(file, fileName, dir, progressCallback) {
      var defer = Q.defer();
      var dir = $scope.component.dir || '';
      var dropboxToken = getDropboxToken();
      if (!dropboxToken) {
        defer.reject('You must authenticate with dropbox before uploading files.');
      }
      else {
        // Both Upload and $http don't handle files as application/octet-stream which is required by dropbox.
        var xhr = new XMLHttpRequest();

        xhr.upload.onprogress = progressCallback;

        xhr.onload = function() {
          if (xhr.status === 200) {
            defer.resolve(JSON.parse(xhr.response));
          }
          else {
            defer.reject(xhr.response || 'Unable to upload file');
          }
        };

        xhr.open('POST', 'https://content.dropboxapi.com/2/files/upload');
        xhr.setRequestHeader('Authorization', 'Bearer ' + dropboxToken);
        xhr.setRequestHeader('Content-Type', 'application/octet-stream');
        xhr.setRequestHeader('Dropbox-API-Arg', JSON.stringify({
          path: '/' + dir + fileName,
          mode: 'add',
          autorename: true,
          mute: false
        }));

        xhr.send(file);
      }
      return defer.promise;
    },
    downloadFile: function(file) {
      var defer = Q.defer();
      var dropboxToken = getDropboxToken();
      if (!dropboxToken) {
        defer.reject('You must authenticate with dropbox before downloading files.');
      }
      else {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'arraybuffer';

        xhr.onload = function() {
          if (xhr.status === 200) {
            defer.resolve(xhr.response);
          }
          else {
            defer.reject(xhr.response || 'Unable to download file');
          }
        };

        xhr.open('POST', 'https://content.dropboxapi.com/2/files/download');
        xhr.setRequestHeader('Authorization', 'Bearer ' + dropboxToken);
        xhr.setRequestHeader('Dropbox-API-Arg', JSON.stringify({
          path: file.path_lower
        }));
        xhr.send();
      }
      return defer.promise;
    }
    //downloadFile: function(evt, file) {
    //  var strMimeType = 'application/octet-stream';
    //  this.getFile(null, file).then(function(data) {
    //    var blob = new Blob([data], {type: strMimeType});
    //    //FileSaver.saveAs(blob, file.name, true);
    //  }).catch(function(err) {
    //    alert(err);
    //  });
    //}
  };
};

dropbox.title = 'Dropbox';
dropbox.name = 'dropbox';

module.exports = dropbox;


