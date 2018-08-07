import Promise from 'native-promise-only';

export default class Plugin {
  init() {}

  deregister() {}

  preRequest() {
    return Promise.resolve();
  }

  request() {
    return Promise.resolve(undefined);
  }

  fileRequest() {
    return Promise.resolve(undefined);
  }

  staticRequest() {
    return Promise.resolve(undefined);
  }

  wrapRequestPromise(value) {
    return value;
  }

  wrapFileRequestPromise(value) {
    return value;
  }

  wrapStaticRequestPromise(value) {
    return value;
  }

  requestOptions(value) {
    return value;
  }

  requestResponse(value) {
    return value;
  }
}
