import { uniqueName } from '../../utils/utils';
import NativePromise from 'native-promise-only';

/**
 * UploadAdapter for CKEditor https://ckeditor.com/docs/ckeditor5/latest/framework/guides/deep-dive/upload-adapter.html
 */
class FormioUploadAdapter {
  constructor(loader, fileService, component) {
    this.loader = loader;
    this.fileService = fileService;
    this.component = component;
  }

  upload() {
    return this.loader.file
      .then(file => new NativePromise((resolve, reject) => {
        const { uploadStorage, uploadUrl, uploadOptions, uploadDir, fileKey } = this.component.component;
        const uploadParams = [
          uploadStorage,
          file,
          uniqueName(file.name),
          uploadDir || '', //should pass empty string if undefined
          (evt) => this.onUploadProgress(evt),
          uploadUrl,
          uploadOptions,
          fileKey,
          null,
          null
        ];

        const uploadPromise = this.fileService.uploadFile(
          ...uploadParams,
          () => this.component.emit('fileUploadingStart', uploadPromise)
        ).then((result) => {
          return this.fileService.downloadFile(result);
        }).then((result) => {
          return resolve({
            default: result.url
          });
        }).catch((err) => {
          console.warn('An Error occured while uploading file', err);
          reject(err);
        }).finally(() => {
          this.component.emit('fileUploadingEnd', uploadPromise);
        });
      }));
  }

  abort() {}

  onUploadProgress(evt) {
    if (evt.lengthComputable) {
      this.loader.uploadTotal = evt.total;
      this.loader.uploaded = evt.loaded;
    }
  }
}

const getFormioUploadAdapterPlugin = (fileService, component) => (editor) => {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new FormioUploadAdapter(loader, fileService, component);
  };
};

export { getFormioUploadAdapterPlugin };
