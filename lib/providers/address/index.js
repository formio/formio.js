var _a;
import { AzureAddressProvider } from './AzureAddressProvider';
import { CustomAddressProvider } from './CustomAddressProvider';
import { GoogleAddressProvider } from './GoogleAddressProvider';
import { NominatimAddressProvider } from './NominatimAddressProvider';
export default (_a = {},
    _a[AzureAddressProvider.name] = AzureAddressProvider,
    _a[CustomAddressProvider.name] = CustomAddressProvider,
    _a[GoogleAddressProvider.name] = GoogleAddressProvider,
    _a[NominatimAddressProvider.name] = NominatimAddressProvider,
    _a);
