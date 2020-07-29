import _ from 'lodash';
import address from './address';
import auth from './auth';
import storage from './storage';
var Providers = /** @class */ (function () {
    function Providers() {
    }
    Providers.addProvider = function (type, name, provider) {
        Providers.providers[type] = Providers.providers[type] || {};
        Providers.providers[type][name] = provider;
    };
    Providers.addProviders = function (type, providers) {
        Providers.providers[type] = _.merge(Providers.providers[type], providers);
    };
    Providers.getProvider = function (type, name) {
        if (Providers.providers[type] && Providers.providers[type][name]) {
            return Providers.providers[type][name];
        }
    };
    Providers.getProviders = function (type) {
        if (Providers.providers[type]) {
            return Providers.providers[type];
        }
    };
    Providers.providers = {
        address: address,
        auth: auth,
        storage: storage,
    };
    return Providers;
}());
export { Providers };
