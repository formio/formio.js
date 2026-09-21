const nativeBase64 = { atob: globalThis.atob, btoa: globalThis.btoa };

require('jsdom-global')();

Object.assign(globalThis, nativeBase64);
