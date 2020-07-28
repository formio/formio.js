import { Formio } from '../Formio';
export default function (path, name) {
    if (path === void 0) { path = Formio.getApiUrl() + "/externalModules.js"; }
    if (name === void 0) { name = 'externalModules'; }
    Formio.requireLibrary(name, name, path, true)
        .then(function (modules) {
        Formio.use(modules);
    });
}
