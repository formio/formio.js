"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.function.name.js");

var _uuid = require("uuid");

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var indexeddb = function indexeddb() {
  return {
    title: 'indexedDB',
    name: 'indexeddb',
    uploadFile: function uploadFile(file, fileName, dir, progressCallback, url, options) {
      var _this = this;

      if (!('indexedDB' in window)) {
        console.log('This browser doesn\'t support IndexedDB');
        return;
      }

      return new _nativePromiseOnly.default(function (resolve) {
        var request = indexedDB.open(options.indexeddb, 3);

        request.onsuccess = function (event) {
          var db = event.target.result;
          resolve(db);
        };

        request.onupgradeneeded = function (e) {
          var db = e.target.result;
          db.createObjectStore(options.indexeddbTable);
        };
      }).then(function (db) {
        var reader = new FileReader();
        return new _nativePromiseOnly.default(function (resolve, reject) {
          reader.onload = function () {
            var blobObject = new Blob([file], {
              type: file.type
            });
            var id = (0, _uuid.v4)(blobObject);
            var data = {
              id: id,
              data: blobObject,
              name: file.name,
              size: file.size,
              type: file.type,
              url: url
            };
            var trans = db.transaction([options.indexeddbTable], 'readwrite');
            var addReq = trans.objectStore(options.indexeddbTable).put(data, id);

            addReq.onerror = function (e) {
              console.log('error storing data');
              console.error(e);
            };

            trans.oncomplete = function () {
              resolve({
                storage: 'indexeddb',
                name: file.name,
                size: file.size,
                type: file.type,
                url: url,
                id: id
              });
            };
          };

          reader.onerror = function () {
            return reject(_this);
          };

          reader.readAsDataURL(file);
        });
      });
    },
    downloadFile: function downloadFile(file, options) {
      var _this2 = this;

      return new _nativePromiseOnly.default(function (resolve) {
        var request = indexedDB.open(options.indexeddb, 3);

        request.onsuccess = function (event) {
          var db = event.target.result;
          resolve(db);
        };
      }).then(function (db) {
        return new _nativePromiseOnly.default(function (resolve, reject) {
          var trans = db.transaction([options.indexeddbTable], 'readonly');
          var store = trans.objectStore(options.indexeddbTable).get(file.id);

          store.onsuccess = function () {
            trans.oncomplete = function () {
              var result = store.result;
              var dbFile = new File([store.result.data], file.name, {
                type: store.result.type
              });
              var reader = new FileReader();

              reader.onload = function (event) {
                result.url = event.target.result;
                result.storage = file.storage;
                resolve(result);
              };

              reader.onerror = function () {
                return reject(_this2);
              };

              reader.readAsDataURL(dbFile);
            };
          };

          store.onerror = function () {
            return reject(_this2);
          };
        });
      });
    },
    deleteFile: function deleteFile(file, options) {
      var _this3 = this;

      return new _nativePromiseOnly.default(function (resolve) {
        var request = indexedDB.open(options.indexeddb, 3);

        request.onsuccess = function (event) {
          var db = event.target.result;
          resolve(db);
        };
      }).then(function (db) {
        return new _nativePromiseOnly.default(function (resolve, reject) {
          var trans = db.transaction([options.indexeddbTable], 'readwrite');
          var store = trans.objectStore(options.indexeddbTable).delete(file.id);

          store.onsuccess = function () {
            trans.oncomplete = function () {
              var result = store.result;
              resolve(result);
            };
          };

          store.onerror = function () {
            return reject(_this3);
          };
        });
      });
    }
  };
};

indexeddb.title = 'IndexedDB';
var _default = indexeddb;
exports.default = _default;