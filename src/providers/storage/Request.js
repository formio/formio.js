import Promise from 'native-promise-only';
import { forOwn, isPlainObject } from 'lodash';

export default class Request extends XMLHttpRequest {
  constructor(reject, progressCallback) {
    super();

    if (typeof progressCallback === 'function') {
      this.upload.onprogress = progressCallback;
    }

    // Fire on network error.
    this.onerror = (err) => {
      err.networkError = true;
      reject(err);
    };

    this.onabort = () => reject(this);

    this.onload = () => {
      if (this.status >= 200 && this.status < 300) {
        this._success(this.response);
      }
      else {
        this._failure(this.response);
      }
    };
  }

  setHeader(key, value) {
    this.setRequestHeader(key, value);
    return this;
  }

  setToken(formio) {
    const token = formio.getToken();
    if (token) {
      return this.setHeader('x-jwt-token', token);
    }
    return this;
  }

  success(fn) {
    this._this = fn;
    return this;
  }

  failure(fn) {
    this._catch = fn;
    return this;
  }

  post(url, data) {
    return this.send('POST', url, data);
  }

  put(url, data) {
    return this.send('PUT', url, data);
  }

  send(method, url, data) {
    this.open(method, url);
    super.send(this.prepareData(data));
    return this;
  }

  prepareData(data) {
    if (isPlainObject(data)) {
      const fd = new FormData();
      forOwn(data, (value, key) => fd.append(key, value));
      return fd;
    }

    return data;
  }
}
