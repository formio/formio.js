import { Formio } from '../Formio';

export default function (path = `${Formio.getApiUrl()}/externalModules.js`, name = 'externalModules') {
  Formio.requireLibrary(name, name, path, true)
    .then((modules) => {
      Formio.use(modules);
    });
}
