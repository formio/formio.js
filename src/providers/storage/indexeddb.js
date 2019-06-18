import {openDB, deleteDB, wrap, unwrap} from 'idb';

const uuidv4 = require('uuid/v4')

var request = indexedDB.open("MyDatabase", 3);
let db;

request.onsuccess = function (event) {
  db = event.target.result
};

request.onupgradeneeded = function (e) {
  let db = e.target.result;
  db.createObjectStore('cachedForms');
};

const indexeddb = () => ({
  title: 'indexedDB',
  name: 'indexeddb',
  uploadFile(file, fileName) {
    console.log(fileName)
    if (!('indexedDB' in window)) {
      console.log('This browser doesn\'t support IndexedDB');
      return;
    }

    let reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onload = (event) => {

        const url = event.target.result;

        const fileAsBlob = new Blob([file])

        let ob = fileAsBlob;

        const id = uuidv4(ob)
        let trans = db.transaction(['cachedForms'], 'readwrite');
        let addReq = trans.objectStore('cachedForms').put(ob, id);


        addReq.onerror = function (e) {
          console.log('error storing data');
          console.error(e);
        };

        trans.oncomplete = function (e) {
          resolve({
            storage: 'indexeddb',
            name: fileName,
            id
          });
          console.log('data stored');
        };
      };

      reader.onerror = () => {
        return reject(this);
      };

      reader.readAsDataURL(file);
    });
  },
  downloadFile(file) {
    let reader = new FileReader();
    return new Promise((resolve, reject) => {
      let trans = db.transaction(['cachedForms'], 'readonly');

      let store = trans.objectStore('cachedForms').get(file.id);
      store.onsuccess = function () {
        trans.oncomplete = function (e) {
          console.log(file, store)
          resolve(store.result);
        };
      };

      reader.onerror = () => {
        return reject(this);
      };
    });
  }
});

indexeddb.title = 'IndexedDB';
export default indexeddb;
