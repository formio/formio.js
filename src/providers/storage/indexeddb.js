const uuidv4 = require('uuid/v4')
const request = indexedDB.open("MyDatabase", 3);

let db;

request.onsuccess = function (event) {
  db = event.target.result
};

request.onupgradeneeded = function (e) {
  const db = e.target.result;
  db.createObjectStore('cachedForms');
};

const indexeddb = () => ({
  title: 'indexedDB',
  name: 'indexeddb',
  uploadFile(file, fileName, dir) {
    if (!('indexedDB' in window)) {
      console.log('This browser doesn\'t support IndexedDB');
      return;
    }

    let reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onload = (event) => {
        let blobObject = new Blob([file], {type: file.type});

        const id = uuidv4(blobObject);
        let trans = db.transaction(['cachedForms'], 'readwrite');
        let addReq = trans.objectStore('cachedForms').put(blobObject, id);

        addReq.onerror = function (e) {
          console.log('error storing data');
          console.error(e);
        };

        trans.oncomplete = function (e) {
          resolve({
            storage: 'indexeddb',
            name: fileName,
            size: file.size,
            id,
          });
        };
      };

      reader.onerror = () => {
        return reject(this);
      };

      reader.readAsDataURL(file);
    });
  },
  downloadFile(file) {
    return new Promise((resolve, reject) => {
      let trans = db.transaction(['cachedForms'], 'readonly');
      let store = trans.objectStore('cachedForms').get(file.id);
      store.onsuccess = () => {
        trans.oncomplete = (e) => {
          let dbFile = new File([store.result], file.name, {
            type: store.result.type,
          });
          dbFile.originalName = file.originalName;
          dbFile.storage = file.storage;
          resolve(dbFile);
        };
      };
      store.onerror = () => {
        return reject(this)
      }
    });
  }
});

indexeddb.title = 'IndexedDB';
export default indexeddb;
