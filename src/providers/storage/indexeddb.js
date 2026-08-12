
/**
 * Generates an RFC 4122 version 4 UUID.
 *
 * Uses the native `crypto.randomUUID()` when available. That API is only exposed
 * in secure contexts (HTTPS or localhost), whereas IndexedDB also works over plain
 * HTTP, so a `crypto.getRandomValues()` based fallback preserves the previous
 * behaviour in those environments.
 * @returns {string} A randomly generated v4 UUID.
 */
function generateId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40; // version 4
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant RFC 4122

  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

/**
 * indexedDb provider for file storage.
 * @returns {import('./typedefs').FileProvider} The FileProvider interface defined in index.js.
 */
function indexeddb() {
  return {
    title: 'indexedDB',
    name: 'indexeddb',
    uploadFile(file, fileName, dir, progressCallback, url, options) {
      if (!('indexedDB' in window)) {
        console.log("This browser doesn't support IndexedDB");
        return;
      }

      return new Promise((resolve) => {
        const request = indexedDB.open(options.indexeddb);
        request.onsuccess = function (event) {
          const db = event.target.result;
          resolve(db);
        };
        request.onupgradeneeded = function (e) {
          const db = e.target.result;
          db.createObjectStore(options.indexeddbTable);
        };
      }).then((db) => {
        const reader = new FileReader();

        return new Promise((resolve, reject) => {
          reader.onload = () => {
            const blobObject = new Blob([file], { type: file.type });

            const id = generateId();

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
      const opts = options?.options || options || {};
      const dbName = opts.indexeddb;
      const tableName = opts.indexeddbTable;

      if (!dbName || !tableName) {
        return Promise.reject(new Error('IndexedDB storage options (indexeddb, indexeddbTable) are required for download'));
      }

      return new Promise((resolve) => {
        const request = indexedDB.open(dbName);

        request.onsuccess = function (event) {
          const db = event.target.result;
          resolve(db);
        };
      }).then((db) => {
        return new Promise((resolve, reject) => {
          const trans = db.transaction(tableName, 'readonly');
          const store = trans.objectStore(tableName).get(file.id);
          store.onsuccess = () => {
            trans.oncomplete = () => {
              const result = store.result;
              if (!result || !result.data) {
                return reject(new Error('File not found in IndexedDB'));
              }
              const dbFile = new File([result.data], file.name, {
                type: result.type,
              });

              const reader = new FileReader();

              reader.onload = (event) => {
                result.url = event.target.result;
                result.storage = file.storage;
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
    },
    deleteFile(file, options) {
      return new Promise((resolve) => {
        const request = indexedDB.open(options.indexeddb);

        request.onsuccess = function (event) {
          const db = event.target.result;
          resolve(db);
        };
      }).then((db) => {
        return new Promise((resolve, reject) => {
          const trans = db.transaction([options.indexeddbTable], 'readwrite');
          const store = trans.objectStore(options.indexeddbTable).delete(file.id);
          store.onsuccess = () => {
            trans.oncomplete = () => {
              const result = store.result;

              resolve(result);
            };
          };
          store.onerror = () => {
            return reject(this);
          };
        });
      });
    },
  };
}

indexeddb.title = 'IndexedDB';
export default indexeddb;
