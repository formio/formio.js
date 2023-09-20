import Field from '../_classes/field/Field';
import { componentValueTypes, getComponentSavedTypes, uniqueName } from '../../utils/utils';
import download from 'downloadjs';
import _ from 'lodash';
import fileProcessor from '../../providers/processor/fileProcessor';
import BMF from 'browser-md5-file';

let Camera;
let webViewCamera = 'undefined' !== typeof window ? navigator.camera : Camera;

// canvas.toBlob polyfill.

let htmlCanvasElement;
if (typeof window !== 'undefined') {
  htmlCanvasElement = window.HTMLCanvasElement;
}
else if (typeof global !== 'undefined') {
  htmlCanvasElement = global.HTMLCanvasElement;
}

if (htmlCanvasElement && !htmlCanvasElement.prototype.toBlob) {
  Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
    value: function(callback, type, quality) {
      var canvas = this;
      setTimeout(function() {
        var binStr = atob(canvas.toDataURL(type, quality).split(',')[1]),
          len = binStr.length,
          arr = new Uint8Array(len);

        for (var i = 0; i < len; i++) {
          arr[i] = binStr.charCodeAt(i);
        }

        callback(new Blob([arr], { type: type || 'image/png' }));
      });
    }
  });
}

export default class FileComponent extends Field {
  static schema(...extend) {
    return Field.schema({
      type: 'file',
      label: 'Upload',
      key: 'file',
      image: false,
      privateDownload: false,
      imageSize: '200',
      filePattern: '*',
      fileMinSize: '0KB',
      fileMaxSize: '1GB',
      uploadOnly: false,
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'File',
      group: 'premium',
      icon: 'file',
      documentation: '/userguide/form-building/premium-components#file',
      weight: 100,
      schema: FileComponent.schema(),
    };
  }

  static get serverConditionSettings() {
    return FileComponent.conditionOperatorsSettings;
  }

  static get conditionOperatorsSettings() {
    return {
      ...super.conditionOperatorsSettings,
      operators: ['isEmpty', 'isNotEmpty'],
    };
  }

  static savedValueTypes(schema) {
    schema = schema || {};

    return  getComponentSavedTypes(schema) || [componentValueTypes.object];
  }

  init() {
    super.init();
    webViewCamera = navigator.camera || Camera;
    const fileReaderSupported = (typeof FileReader !== 'undefined');
    const formDataSupported = typeof window !== 'undefined' ? Boolean(window.FormData) : false;
    const progressSupported = (typeof window !== 'undefined' && window.XMLHttpRequest) ? ('upload' in new XMLHttpRequest) : false;

    this.support = {
      filereader: fileReaderSupported,
      formdata: formDataSupported,
      hasWarning: !fileReaderSupported || !formDataSupported || !progressSupported,
      progress: progressSupported,
    };
    this.cameraMode = false;
    this.fileDropHidden = false;
    this.filesToSync = {
      filesToUpload: [],
      filesToDelete: [],
    };
  }

  get dataReady() {
    return this.filesReady || Promise.resolve();
  }

  get defaultSchema() {
    return FileComponent.schema();
  }

  loadImage(fileInfo) {
    if (this.component.privateDownload) {
      fileInfo.private = true;
    }
    return this.fileService.downloadFile(fileInfo).then((result) => result.url);
  }

  get emptyValue() {
    return [];
  }

  getValueAsString(value) {
    if (_.isArray(value)) {
      return _.map(value, 'originalName').join(', ');
    }

    return _.get(value, 'originalName', '');
  }

  getValue() {
    return this.dataValue;
  }

  get defaultValue() {
    const value = super.defaultValue;
    return Array.isArray(value) ? value : [];
  }

  get hasTypes() {
    return this.component.fileTypes &&
      Array.isArray(this.component.fileTypes) &&
      this.component.fileTypes.length !== 0 &&
      (this.component.fileTypes[0].label !== '' || this.component.fileTypes[0].value !== '');
  }

  get fileDropHidden() {
    return this._fileBrowseHidden;
  }

  set fileDropHidden(value) {
    if (typeof value !== 'boolean' || this.component.multiple) {
      return;
    }
    this._fileBrowseHidden = value;
  }

  render() {
    const { filesToDelete, filesToUpload } = this.filesToSync;
    return super.render(this.renderTemplate('file', {
      fileSize: this.fileSize,
      files: this.dataValue || [],
      filesToSync: [...filesToDelete, ...filesToUpload],
      disabled: this.disabled,
      support: this.support,
      fileDropHidden: this.fileDropHidden
    }));
  }

  getVideoStream(constraints) {
    return navigator.mediaDevices.getUserMedia({
      video: {
        width: { min: 640, ideal: 1920 },
        height: { min: 360, ideal: 1080 },
        aspectRatio: { ideal: 16 / 9 },
        ...constraints,
      },
      audio: false,
    });
  }

  stopVideoStream(videoStream) {
    videoStream.getVideoTracks().forEach((track) => track.stop());
  }

  getFrame(videoPlayer) {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      canvas.height = videoPlayer.videoHeight;
      canvas.width = videoPlayer.videoWidth;
      const context = canvas.getContext('2d');
      context.drawImage(videoPlayer, 0, 0);
      canvas.toBlob(resolve);
    });
  }

  startVideo() {
    this.getVideoStream()
      .then((stream) => {
        this.videoStream = stream;

        const { videoPlayer } = this.refs;
        if (!videoPlayer) {
          console.warn('Video player not found in template.');
          this.cameraMode = false;
          this.redraw();
          return;
        }

        videoPlayer.srcObject = stream;
        const width = parseInt(this.component.webcamSize) || 320;
        videoPlayer.setAttribute('width', width);
        videoPlayer.play();
      })
      .catch((err) => {
        console.error(err);
        this.cameraMode = false;
        this.redraw();
      });
  }

  stopVideo() {
    if (this.videoStream) {
      this.stopVideoStream(this.videoStream);
      this.videoStream = null;
    }
  }

  takePicture() {
    const { videoPlayer } = this.refs;
    if (!videoPlayer) {
      console.warn('Video player not found in template.');
      this.cameraMode = false;
      this.redraw();
      return;
    }

    this.getFrame(videoPlayer)
      .then((frame) => {
        frame.name = `photo-${Date.now()}.png`;
        this.prepareFilesToUpload([frame]);
        this.cameraMode = false;
        this.redraw();
      });
  }

  browseFiles(attrs = {}) {
    return new Promise((resolve) => {
      const fileInput = this.ce('input', {
        type: 'file',
        style: 'height: 0; width: 0; visibility: hidden;',
        tabindex: '-1',
        ...attrs,
      });
      document.body.appendChild(fileInput);

      fileInput.addEventListener('change', () => {
        resolve(fileInput.files);
        document.body.removeChild(fileInput);
      }, true);

      // There is no direct way to trigger a file dialog. To work around this, create an input of type file and trigger
      // a click event on it.
      if (typeof fileInput.trigger === 'function') {
        fileInput.trigger('click');
      }
      else {
        fileInput.click();
      }
    });
  }

  set cameraMode(value) {
    this._cameraMode = value;

    if (value) {
      this.startVideo();
    }
    else {
      this.stopVideo();
    }
  }

  get cameraMode() {
    return this._cameraMode;
  }

  get useWebViewCamera() {
    return this.imageUpload && webViewCamera;
  }

  get imageUpload() {
    return Boolean(this.component.image);
  }

  get browseOptions() {
    const options = {};

    if (this.component.multiple) {
      options.multiple = true;
    }
    if (this.component.capture) {
      options.capture = this.component.capture;
    }
    //use "accept" attribute only for desktop devices because of its limited support by mobile browsers
    const filePattern = this.component.filePattern.trim() || '';
    if (!this.isMobile.any) {
      const imagesPattern = 'image/*';

      if (this.imageUpload && (!filePattern || filePattern === '*')) {
        options.accept = imagesPattern;
      }
      else if (this.imageUpload && !filePattern.includes(imagesPattern)) {
        options.accept = `${imagesPattern},${filePattern}`;
      }
      else {
        options.accept = filePattern;
      }
    }
    // if input capture is set, we need the "accept" attribute to determine which device to launch
    else if (this.component.capture) {
      if (filePattern.includes('video')) {
        options.accept = 'video/*';
      }
      else if (filePattern.includes('audio')) {
        options.accept = 'audio/*';
      }
      else {
        options.accept = 'image/*';
      }
    }

    return options;
  }

  attach(element) {
    this.loadRefs(element, {
      fileDrop: 'single',
      fileBrowse: 'single',
      galleryButton: 'single',
      cameraButton: 'single',
      takePictureButton: 'single',
      toggleCameraMode: 'single',
      videoPlayer: 'single',
      fileLink: 'multiple',
      removeLink: 'multiple',
      fileToSyncRemove: 'multiple',
      fileImage: 'multiple',
      fileType: 'multiple',
      fileProcessingLoader: 'single',
    });
    // Ensure we have an empty input refs. We need this for the setValue method to redraw the control when it is set.
    this.refs.input = [];
    const superAttach = super.attach(element);

    if (this.refs.fileDrop) {
      // if (!this.statuses.length) {
      //   this.refs.fileDrop.removeAttribute('hidden');
      // }
      const element = this;
      this.addEventListener(this.refs.fileDrop, 'dragover', function(event) {
        this.className = 'fileSelector fileDragOver';
        event.preventDefault();
      });
      this.addEventListener(this.refs.fileDrop, 'dragleave', function(event) {
        this.className = 'fileSelector';
        event.preventDefault();
      });
      this.addEventListener(this.refs.fileDrop, 'drop', function(event) {
        this.className = 'fileSelector';
        event.preventDefault();
        element.prepareFilesToUpload(event.dataTransfer.files);
      });
    }

    if (this.refs.fileBrowse) {
      this.addEventListener(this.refs.fileBrowse, 'click', (event) => {
        event.preventDefault();
        this.browseFiles(this.browseOptions)
          .then((files) => {
            this.prepareFilesToUpload(files);
          });
      });
    }

    this.refs.fileLink.forEach((fileLink, index) => {
      this.addEventListener(fileLink, 'click', (event) => {
        event.preventDefault();
        this.getFile(this.dataValue[index]);
      });
    });

    this.refs.removeLink.forEach((removeLink, index) => {
      this.addEventListener(removeLink, 'click', (event) => {
        event.preventDefault();
        const fileInfo = this.dataValue[index];
        this.prepareFileToDelete(fileInfo);
      });
    });

    this.refs.fileToSyncRemove.forEach((fileToSyncRemove, index) => {
      this.addEventListener(fileToSyncRemove, 'click', (event) => {
        event.preventDefault();

        const fileUpload = this.statuses[index];
        _.pull(this.filesUploading, fileUpload.originalName);

        if (fileUpload.abort) {
          fileUpload.abort();
        }
        this.filesToSync.filesToUpload.splice(index, 1);
        this.redraw();
      });
    });

    if (this.refs.galleryButton && webViewCamera) {
      this.addEventListener(this.refs.galleryButton, 'click', (event) => {
        event.preventDefault();
        webViewCamera.getPicture((success) => {
          window.resolveLocalFileSystemURL(success, (fileEntry) => {
              fileEntry.file((file) => {
                const reader = new FileReader();
                reader.onloadend = (evt) => {
                  const blob = new Blob([new Uint8Array(evt.target.result)], { type: file.type });
                  blob.name = file.name;
                  this.prepareFilesToUpload([blob]);
                };
                reader.readAsArrayBuffer(file);
              });
            }
          );
        }, (err) => {
          console.error(err);
        }, {
          sourceType: webViewCamera.PictureSourceType.PHOTOLIBRARY,
        });
      });
    }

    if (this.refs.cameraButton && webViewCamera) {
      this.addEventListener(this.refs.cameraButton, 'click', (event) => {
        event.preventDefault();
        webViewCamera.getPicture((success) => {
          window.resolveLocalFileSystemURL(success, (fileEntry) => {
              fileEntry.file((file) => {
                const reader = new FileReader();
                reader.onloadend = (evt) => {
                  const blob = new Blob([new Uint8Array(evt.target.result)], { type: file.type });
                  blob.name = file.name;
                  this.prepareFilesToUpload([blob]);
                };
                reader.readAsArrayBuffer(file);
              });
            }
          );
        }, (err) => {
          console.error(err);
        }, {
          sourceType: webViewCamera.PictureSourceType.CAMERA,
          encodingType: webViewCamera.EncodingType.PNG,
          mediaType: webViewCamera.MediaType.PICTURE,
          saveToPhotoAlbum: true,
          correctOrientation: false,
        });
      });
    }

    if (this.refs.takePictureButton) {
      this.addEventListener(this.refs.takePictureButton, 'click', (event) => {
        event.preventDefault();
        this.takePicture();
      });
    }

    if (this.refs.toggleCameraMode) {
      this.addEventListener(this.refs.toggleCameraMode, 'click', (event) => {
        event.preventDefault();
        this.cameraMode = !this.cameraMode;
        this.redraw();
      });
    }

    this.refs.fileType.forEach((fileType, index) => {
      this.dataValue[index].fileType = this.dataValue[index].fileType || this.component.fileTypes[0].label;

      this.addEventListener(fileType, 'change', (event) => {
        event.preventDefault();

        const fileType = this.component.fileTypes.find((typeObj) => typeObj.value === event.target.value);

        this.dataValue[index].fileType = fileType.label;
      });
    });

    const fileService = this.fileService;
    if (fileService) {
      const loadingImages = [];
      this.filesReady = new Promise((resolve, reject) => {
        this.filesReadyResolve = resolve;
        this.filesReadyReject = reject;
      });
      this.refs.fileImage.forEach((image, index) => {
        loadingImages.push(this.loadImage(this.dataValue[index]).then((url) => (image.src = url)));
      });
      if (loadingImages.length) {
        Promise.all(loadingImages).then(() => {
          this.filesReadyResolve();
        }).catch(() => this.filesReadyReject());
      }
      else {
        this.filesReadyResolve();
      }
    }
    return superAttach;
  }

  /* eslint-disable max-len */
  fileSize(a, b, c, d, e) {
    return `${(b = Math, c = b.log, d = 1024, e = c(a) / c(d) | 0, a / b.pow(d, e)).toFixed(2)} ${e ? `${'kMGTPEZY'[--e]}B` : 'Bytes'}`;
  }

  /* eslint-enable max-len */

  /* eslint-disable max-depth */
  globStringToRegex(str) {
    str = str.replace(/\s/g, '');

    let regexp = '', excludes = [];
    if (str.length > 2 && str[0] === '/' && str[str.length - 1] === '/') {
      regexp = str.substring(1, str.length - 1);
    }
    else {
      const split = str.split(',');
      if (split.length > 1) {
        for (let i = 0; i < split.length; i++) {
          const r = this.globStringToRegex(split[i]);
          if (r.regexp) {
            regexp += `(${r.regexp})`;
            if (i < split.length - 1) {
              regexp += '|';
            }
          }
          else {
            excludes = excludes.concat(r.excludes);
          }
        }
      }
      else {
        if (str.startsWith('!')) {
          excludes.push(`^((?!${this.globStringToRegex(str.substring(1)).regexp}).)*$`);
        }
        else {
          if (str.startsWith('.')) {
            str = `*${str}`;
          }
          regexp = `^${str.replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\-]', 'g'), '\\$&')}$`;
          regexp = regexp.replace(/\\\*/g, '.*').replace(/\\\?/g, '.');
        }
      }
    }
    return { regexp, excludes };
  }

  /* eslint-enable max-depth */

  translateScalars(str) {
    if (typeof str === 'string') {
      if (str.search(/kb/i) === str.length - 2) {
        return parseFloat(str.substring(0, str.length - 2) * 1024);
      }
      if (str.search(/mb/i) === str.length - 2) {
        return parseFloat(str.substring(0, str.length - 2) * 1024 * 1024);
      }
      if (str.search(/gb/i) === str.length - 2) {
        return parseFloat(str.substring(0, str.length - 2) * 1024 * 1024 * 1024);
      }
      if (str.search(/b/i) === str.length - 1) {
        return parseFloat(str.substring(0, str.length - 1));
      }
      if (str.search(/s/i) === str.length - 1) {
        return parseFloat(str.substring(0, str.length - 1));
      }
      if (str.search(/m/i) === str.length - 1) {
        return parseFloat(str.substring(0, str.length - 1) * 60);
      }
      if (str.search(/h/i) === str.length - 1) {
        return parseFloat(str.substring(0, str.length - 1) * 3600);
      }
    }
    return str;
  }

  validatePattern(file, val) {
    if (!val) {
      return true;
    }
    const pattern = this.globStringToRegex(val);
    let valid = true;
    if (pattern.regexp && pattern.regexp.length) {
      const regexp = new RegExp(pattern.regexp, 'i');
      valid = (!_.isNil(file.type) && regexp.test(file.type)) ||
        (!_.isNil(file.name) && regexp.test(file.name));
    }
    valid = pattern.excludes.reduce((result, excludePattern) => {
      const exclude = new RegExp(excludePattern, 'i');
      return result && (_.isNil(file.type) || !exclude.test(file.type)) &&
        (_.isNil(file.name) || !exclude.test(file.name));
    }, valid);
    return valid;
  }

  validateMinSize(file, val) {
    return file.size + 0.1 >= this.translateScalars(val);
  }

  validateMaxSize(file, val) {
    return file.size - 0.1 <= this.translateScalars(val);
  }

  getFileName(file) {
    return uniqueName(file.name, this.component.fileNameTemplate, this.evalContext());
  }

  getInitFileToSync(file) {
    const escapedFileName = file.name ? file.name.replaceAll('<', '&lt;').replaceAll('>', '&gt;') : file.name;
    return {
      // Get a unique name for this file to keep file collisions from occurring.
      dir: this.interpolate(this.component.dir || ''),
      name: this.getFileName(file),
      originalName: escapedFileName,
      fileKey: this.component.fileKey || 'file',
      storage: this.component.storage,
      options: this.component.options,
      file,
      size: file.size,
      status: 'info',
      message: this.t('Processing file. Please wait...'),
      hash: '',
    };
  }

  async handleSubmissionRevisions(file) {
    if (this.root.form.submissionRevisions !== 'true') {
      return '';
    }

    const bmf = new BMF();
    const hash = await new Promise((resolve, reject) => {
      this.emit('fileUploadingStart');
      bmf.md5(file, (err, md5)=>{
        if (err) {
          return reject(err);
        }
        return resolve(md5);
      });
    });
    this.emit('fileUploadingEnd');

    return hash;
  }

  validateFileName(file) {
    // Check if file with the same name is being uploaded
    const fileWithSameNameUploading = this.filesToSync.filesToUpload
      .some(fileToSync => fileToSync.file?.name === file.name);

    const fileWithSameNameUploaded = this.dataValue
      .some(fileStatus => fileStatus.originalName === file.name);

    return fileWithSameNameUploaded || fileWithSameNameUploading
      ? {
        status: 'error',
        message: this.t(`File with the same name is already ${fileWithSameNameUploading ? 'being ' : ''}uploaded`),
      }
      : {};
  }

  validateFileSettings(file) {
    // Check file pattern
    if (this.component.filePattern && !this.validatePattern(file, this.component.filePattern)) {
      return {
        status: 'error',
        message: this.t('File is the wrong type; it must be {{ pattern }}', {
          pattern: this.component.filePattern,
        }),
      };
    }

    // Check file minimum size
    if (this.component.fileMinSize && !this.validateMinSize(file, this.component.fileMinSize)) {
      return {
        status: 'error',
        message: this.t('File is too small; it must be at least {{ size }}', {
          size: this.component.fileMinSize,
        }),
      };
    }

    // Check file maximum size
    if (this.component.fileMaxSize && !this.validateMaxSize(file, this.component.fileMaxSize)) {
      return {
        status: 'error',
        message: this.t('File is too big; it must be at most {{ size }}', {
          size: this.component.fileMaxSize,
        }),
      };
    }

    return {};
  }

  validateFileService() {
    const { fileService } = this;
    return !fileService
      ? {
        status: 'error',
        message: this.t('File Service not provided.'),
      }
      : {};
  }

  validateFile(file) {
    const fileServiceValidation = this.validateFileService();
    if (fileServiceValidation.status === 'error') {
      return fileServiceValidation;
    }

    const fileNameValidation = this.validateFileName(file);
    if (fileNameValidation.status === 'error') {
      return fileNameValidation;
    }

    return this.validateFileSettings(file);
  }

  getGroupPermissions() {
    let groupKey = null;
    let groupPermissions = null;

    //Iterate through form components to find group resource if one exists
    this.root.everyComponent((element) => {
      if (element.component?.submissionAccess || element.component?.defaultPermission) {
        groupPermissions = !element.component.submissionAccess ? [
          {
            type: element.component.defaultPermission,
            roles: [],
          },
        ] : element.component.submissionAccess;

        groupPermissions.forEach((permission) => {
          groupKey = ['admin', 'write', 'create'].includes(permission.type) ? element.component.key : null;
        });
      }
    });

    return { groupKey, groupPermissions };
  }

  async triggerFileProcessor(file) {
    let processedFile = null;

    if (this.root.options.fileProcessor) {
      try {
        if (this.refs.fileProcessingLoader) {
          this.refs.fileProcessingLoader.style.display = 'block';
        }
        const fileProcessorHandler = fileProcessor(this.fileService, this.root.options.fileProcessor);
        processedFile = await fileProcessorHandler(file, this.component.properties);
      }
      catch (err) {
        this.fileDropHidden = false;
        return {
          status: 'error',
          message: this.t('File processing has been failed.'),
        };
      }
      finally {
        if (this.refs.fileProcessingLoader) {
          this.refs.fileProcessingLoader.style.display = 'none';
        }
      }
    }

    return {
      file: processedFile,
    };
  }

  async prepareFileToUpload(file) {
    const fileToSync = this.getInitFileToSync(file);
    fileToSync.hash = await this.handleSubmissionRevisions(file);

    const { status, message } = this.validateFile(file);
    if (status === 'error') {
      fileToSync.status = status;
      fileToSync.message = message;
      return this.filesToSync.filesToUpload.push(fileToSync);
    }

    if (this.component.privateDownload) {
      file.private = true;
    }

    const { groupKey, groupPermissions } = this.getGroupPermissions();

    const processedFile = await this.triggerFileProcessor(file);
    if (processedFile.status === 'error') {
      fileToSync.status === 'error';
      fileToSync.message = processedFile.message;
      return this.filesToSync.filesToUpload.push(fileToSync);
    }

    this.filesToSync.filesToUpload.push({
      ...fileToSync,
      message: fileToSync.message = this.t('Ready to be uploaded into storage'),
      file: processedFile.file || file,
      url: this.interpolate(this.component.url, { file: fileToSync }),
      groupPermissions,
      groupResourceId: groupKey ? this.currentForm.submission.data[groupKey]._id : null,
    });
  }

  prepareFilesToUpload(files) {
    // Only allow one upload if not multiple.
    if (!this.component.multiple) {
      files = Array.prototype.slice.call(files, 0, 1);
    }

    if (this.component.storage && files && files.length) {
      this.fileDropHidden = true;

      // files is not really an array and does not have a forEach method, so fake it.
      Array.prototype.forEach.call(files, async(file) => {
        await this.prepareFileToUpload(file);
        this.redraw();
      });
    }
  }

  prepareFileToDelete(fileInfo) {
    this.filesToSync.filesToDelete.push({
      ...fileInfo,
      status: 'readyToDelete',
      message: this.t('Ready to be removed from storage'),
    });

    const index = this.dataValue.findIndex(file => file.name === fileInfo.name);
    this.splice(index);
    this.redraw();
  }

  deleteFile(fileInfo) {
    const { options = {} } = this.component;

    if (fileInfo && (['url', 'indexeddb', 's3'].includes(this.component.storage))) {
      const { fileService } = this;
      if (fileService && typeof fileService.deleteFile === 'function') {
        fileService.deleteFile(fileInfo, options);
      }
      else {
        const formio = this.options.formio || (this.root && this.root.formio);

        if (formio) {
          formio.makeRequest('', fileInfo.url, 'delete');
        }
      }
    }
  }

  async delete() {
    if (!this.filesToSync.filesToDelete.length) {
      return NativePromise.resolve();
    }

    const files = await Promise.all(this.filesToSync.filesToDelete.map((fileToDelete) => {
      return new NativePromise(async(resolve) => {
        try {
          this.deleteFile(fileToDelete);
          fileToDelete.status = 'success';
          fileToDelete.message = this.t('Succefully removed');
          this.redraw();
          resolve({
            status: 'success',
          });
        }
        catch (response) {
          fileToDelete.status = 'error';
          fileToDelete.message = typeof response === 'string' ? response : response.toString();
          this.redraw();
          resolve(fileToDelete);
        }
      });
    }));

    if (files.filter(file => file.status === 'error').length) {
      return NativePromise.reject();
    }

    // this.filesToSync.filesToDelete = [];
    return NativePromise.resolve();
  }

  async uploadFile(fileToSync) {
    return await this.fileService.uploadFile(
      fileToSync.storage,
      fileToSync.file,
      fileToSync.name,
      fileToSync.dir,
      // Progress callback
      (evt) => {
        fileToSync.status = 'progress';
        fileToSync.progress = parseInt(100.0 * evt.loaded / evt.total);
        delete fileToSync.message;
        this.redraw();
      },
      fileToSync.url,
      fileToSync.options,
      fileToSync.fileKey,
      fileToSync.groupPermissions,
      fileToSync.groupResourceId,
      () => {},
      // Abort upload callback
      (abort) => this.abortUpload = abort,
    );
  }

  async upload() {
    if (!this.filesToSync.filesToUpload.length) {
      return NativePromise.resolve();
    }

    const files = await Promise.all(this.filesToSync.filesToUpload.map((fileToSync) => {
      return new NativePromise(async(resolve) => {
        try {
          const fileInfo = await this.uploadFile(fileToSync);
          fileToSync.status = 'success';
          fileToSync.message = this.t('Succefully uploaded');

          fileInfo.originalName = fileToSync.originalName;
          fileInfo.hash = fileToSync.hash;
          this.redraw();
          resolve(fileInfo);
        }
        catch (response) {
          fileToSync.status = 'error';
          fileToSync.message = typeof response === 'string' ? response : response.toString();
          delete fileToSync.progress;
          this.redraw();
          resolve(fileToSync);
        }
      });
    }));

    if (files.filter(file => file.status === 'error').length) {
      return NativePromise.reject();
    }

    if (!this.hasValue()) {
      this.dataValue = [];
    }
    this.dataValue.push(...files);
    this.filesToSync.filesToUpload = [];
    this.triggerChange();
    return NativePromise.resolve();
  }

  getFile(fileInfo) {
    const { options = {} } = this.component;
    const { fileService } = this;
    if (!fileService) {
      return alert('File Service not provided');
    }
    if (this.component.privateDownload) {
      fileInfo.private = true;
    }
    fileService.downloadFile(fileInfo, options).then((file) => {
      if (file) {
        if (['base64', 'indexeddb'].includes(file.storage)) {
          download(file.url, file.originalName || file.name, file.type);
        }
        else {
          window.open(file.url, '_blank');
        }
      }
    })
      .catch((response) => {
        // Is alert the best way to do this?
        // User is expecting an immediate notification due to attempting to download a file.
        alert(response);
      });
  }

  focus() {
    if ('beforeFocus' in this.parent) {
      this.parent.beforeFocus(this);
    }

    if (this.refs.fileBrowse) {
      this.refs.fileBrowse.focus();
    }
  }

  async beforeSubmit() {
    try {
      await NativePromise.all([this.delete(), this.upload()]);
      return NativePromise.resolve();
    }
    catch (err) {
      return NativePromise.reject();
    }
  }

  destroy(all) {
    this.stopVideo();
    super.destroy(all);
  }
}
