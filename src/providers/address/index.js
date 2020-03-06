import { AzureAddressProvider } from './AzureAddressProvider';
import { CustomAddressProvider } from './CustomAddressProvider';
import { GoogleAddressProvider } from './GoogleAddressProvider';
import { NominatimAddressProvider } from './NominatimAddressProvider';

export default {
  [AzureAddressProvider.name]: AzureAddressProvider,
  [CustomAddressProvider.name]: CustomAddressProvider,
  [GoogleAddressProvider.name]: GoogleAddressProvider,
  [NominatimAddressProvider.name]: NominatimAddressProvider,
};
