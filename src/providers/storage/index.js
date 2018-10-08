import Base64 from './Base64';
import Dropbox from './Dropbox';
import S3 from './S3';
import Url from './Url';

const storages = [
  Base64,
  Dropbox,
  S3,
  Url,
];

export default storages.reduce((result, storage) => {
  result[storage.title] = storage;
  return result;
}, {});
