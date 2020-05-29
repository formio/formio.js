import { v4 as uuidv4 } from 'uuid';
import NativePromise from 'native-promise-only';
const indexeddb = () => ({
  title: 'indexedDB',
  name: 'indexeddb',
  uploadFile(file, fileName, dir, progressCallback, url, options) {
    if (!('indexedDB' in window)) {
      console.log('This browser doesn\'t support IndexedDB');
      return;
    }

    return new NativePromise((resolve) => {
      const request = indexedDB.open(options.indexeddb, 3);
      request.onsuccess = function(event) {
        const db = event.target.result;
        resolve(db);
      };
      request.onupgradeneeded = function(e) {
        const db = e.target.result;
        db.createObjectStore(options.indexeddbTable);
      };
    }).then((db) => {
      const reader = new FileReader();

      return new NativePromise((resolve, reject) => {
        reader.onload = () => {
          const blobObject = new Blob([file], { type: file.type });

          const id = uuidv4(blobObject);

          const data = {
            id,
            data: blobObject,
            name: file.name,
            size: file.size,
            type: file.type,
            url,
          };

          const trans = db.transaction([options.indexeddbTable], 'readwrite');
          const addReq = trans.objectStore(options.indexeddbTable).put(data, id);

          addReq.onerror = function(e) {
            console.log('error storing data');
            console.error(e);
          };

          trans.oncomplete = function() {
            resolve({
              storage: 'indexeddb',
              name: file.name,
              size: file.size,
              type: file.type,
              url: url,
              id,
            });
          };
        };

        reader.onerror = () => {
          return reject(this);
        };

        reader.readAsDataURL(file);
      });
    });
  },
  downloadFile(file, options) {
    return new NativePromise((resolve) => {
      const request = indexedDB.open(options.indexeddb, 3);

      request.onsuccess = function(event) {
        const db = event.target.result;
        resolve(db);
      };
    }).then((db) => {
      return new NativePromise((resolve, reject) => {
        const trans = db.transaction([options.indexeddbTable], 'readonly');
        const store = trans.objectStore(options.indexeddbTable).get(file.id);
        store.onsuccess = () => {
          trans.oncomplete = () => {
            const result = store.result;
            const dbFile = new File([store.result.data], file.name, {
              type: store.result.type,
            });

            const reader = new FileReader();

            reader.onload = (event) => {
              result.url = event.target.result;
              resolve(result);
            };

            reader.onerror = () => {
              return reject(this);
            };

            reader.readAsDataURL(dbFile);
          };
        };
        store.onerror = () => {
          return reject(this);
        };
      });
    });
  }
});

indexeddb.title = 'IndexedDB';
export default indexeddb;
