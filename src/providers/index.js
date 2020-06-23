import Formio from '../module';
import Providers from './Providers';
Formio.addPluginType('providers', (plugin) => {
  for (const type of Object.keys(plugin.providers)) {
    Providers.addProviders(type, plugin.providers[type]);
  }
});
export default Providers;
