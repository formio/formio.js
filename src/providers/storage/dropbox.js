import Storage from './Storage';

export default class Dropbox extends Storage {
  static name = 'dropbox';

  downloadFile(file) {
    const token = this.formio.getToken();
    file.url =
      `${this.formio.formUrl}/storage/dropbox?path_lower=${file.path_lower}${token ? `&x-jwt-token=${token}` : ''}`;
    return super.downloadFile(file);
  }

  getAdditionalFileData(response) {
    const parsed = JSON.parse(response);
    parsed.url = parsed.path_lower;
    return parsed;
  }
}
