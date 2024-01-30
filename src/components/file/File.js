import Field from '../_classes/field/Field';
import { componentValueTypes, getComponentSavedTypes, uniqueName } from '../../utils/utils';
import download from 'downloadjs';
import _ from 'lodash';
import NativePromise from 'native-promise-only';
import fileProcessor from '../../providers/processor/fileProcessor';
import BMF from 'browser-md5-file';

let Camera;
let webViewCamera = navigator.camera || Camera;

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
    this.statuses = [];
    this.fileDropHidden = false;
  }

  get dataReady() {
    return this.filesReady || NativePromise.resolve();
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
    return super.render(this.renderTemplate('file', {
      fileSize: this.fileSize,
      files: this.dataValue || [],
      statuses: this.statuses,
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
    return new NativePromise((resolve) => {
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
        this.upload([frame]);
        this.cameraMode = false;
        this.redraw();
      });
  }

  browseFiles(attrs = {}) {
    return new NativePromise((resolve) => {
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
    //use "accept" attribute only for desktop devices because of its limited support by mobile browsers
    if (!this.isMobile.any) {
      const filePattern = this.component.filePattern.trim() || '';
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

    return options;
  }

  deleteFile(fileInfo) {
    const { options = {} } = this.component;

    if (fileInfo && (['url', 'indexeddb'].includes(this.component.storage))) {
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
      fileStatusRemove: 'multiple',
      fileImage: 'multiple',
      fileType: 'multiple',
      fileProcessingLoader: 'single',
    });
    // Ensure we have an empty input refs. We need this for the setValue method to redraw the control when it is set.
    this.refs.input = [];
    const superAttach = super.attach(element);

    if (this.refs.fileDrop) {
      if (!this.statuses.length) {
        this.refs.fileDrop.removeAttribute('hidden');
      }
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
        element.upload(event.dataTransfer.files);
      });
    }

    if (this.refs.fileBrowse) {
      this.addEventListener(this.refs.fileBrowse, 'click', (event) => {
        event.preventDefault();
        this.browseFiles(this.browseOptions)
          .then((files) => {
            this.upload(files);
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
        const fileInfo = this.dataValue[index];

        this.deleteFile(fileInfo);
        event.preventDefault();
        this.splice(index);
        this.redraw();
      });
    });

    this.refs.fileStatusRemove.forEach((fileStatusRemove, index) => {
      this.addEventListener(fileStatusRemove, 'click', (event) => {
        event.preventDefault();

        const fileUpload = this.statuses[index];
        _.pull(this.filesUploading, fileUpload.originalName);

        if (fileUpload.abort) {
          fileUpload.abort();
        }

        this.statuses.splice(index, 1);
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
                  this.upload([blob]);
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
                  this.upload([blob]);
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
      this.filesReady = new NativePromise((resolve, reject) => {
        this.filesReadyResolve = resolve;
        this.filesReadyReject = reject;
      });
      this.refs.fileImage.forEach((image, index) => {
        loadingImages.push(this.loadImage(this.dataValue[index]).then((url) => (image.src = url)));
      });
      if (loadingImages.length) {
        NativePromise.all(loadingImages).then(() => {
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

  upload(files) {
    // Only allow one upload if not multiple.
    if (!this.component.multiple) {
      if (this.statuses.length) {
        this.statuses = [];
      }
      files = Array.prototype.slice.call(files, 0, 1);
    }

    if (this.component.storage && files && files.length) {
      this.fileDropHidden = true;

      // files is not really an array and does not have a forEach method, so fake it.
      /* eslint-disable max-statements */
      Array.prototype.forEach.call(files, async(file) => {
        const fileName = uniqueName(file.name, this.component.fileNameTemplate, this.evalContext());
        const escapedFileName = file.name ? file.name.replaceAll('<', '&lt;').replaceAll('>', '&gt;') : file.name;
        const fileUpload = {
          abort: () => null,
          originalName: escapedFileName,
          name: fileName,
          size: file.size,
          status: 'info',
          message: this.t('Processing file. Please wait...'),
          hash: '',
        };

        if (this.root.form.submissionRevisions === 'true') {
          this.statuses.push(fileUpload);
          this.redraw();
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
          fileUpload.hash = hash;
        }

        // Check if file with the same name is being uploaded
        if (!this.filesUploading) {
          this.filesUploading = [];
        }
        const fileWithSameNameUploading = this.filesUploading.some(fileUploading => fileUploading === file.name);
        this.filesUploading.push(file.name);

        const fileWithSameNameUploaded = this.dataValue.some(fileStatus => fileStatus.originalName === file.name);
        const fileWithSameNameUploadedWithError = this.statuses.findIndex(fileStatus =>
          fileStatus.originalName === file.name
          && fileStatus.status === 'error'
        );

        if (fileWithSameNameUploaded || fileWithSameNameUploading) {
          fileUpload.status = 'error';
          fileUpload.message = this.t(`File with the same name is already ${fileWithSameNameUploading ? 'being ' : ''}uploaded`);
        }

        if (fileWithSameNameUploadedWithError !== -1) {
          this.statuses.splice(fileWithSameNameUploadedWithError, 1);
          this.redraw();
        }

        // Check file pattern
        if (this.component.filePattern && !this.validatePattern(file, this.component.filePattern)) {
          fileUpload.status = 'error';
          fileUpload.message = this.t('File is the wrong type; it must be {{ pattern }}', {
            pattern: this.component.filePattern,
          });
        }
        // Check file minimum size
        if (this.component.fileMinSize && !this.validateMinSize(file, this.component.fileMinSize)) {
          fileUpload.status = 'error';
          fileUpload.message = this.t('File is too small; it must be at least {{ size }}', {
            size: this.component.fileMinSize,
          });
        }

        // Check file maximum size
        if (this.component.fileMaxSize && !this.validateMaxSize(file, this.component.fileMaxSize)) {
          fileUpload.status = 'error';
          fileUpload.message = this.t('File is too big; it must be at most {{ size }}', {
            size: this.component.fileMaxSize,
          });
        }

        // Get a unique name for this file to keep file collisions from occurring.
        const dir = this.interpolate(this.component.dir || '');
        const { fileService } = this;
        if (!fileService) {
          fileUpload.status = 'error';
          fileUpload.message = this.t('File Service not provided.');
        }

        if (this.root.form.submissionRevisions !== 'true') {
          this.statuses.push(fileUpload);
          this.redraw();
        }

        if (fileUpload.status !== 'error') {
          if (this.component.privateDownload) {
            file.private = true;
          }
          const { storage, options = {} } = this.component;
          const url = this.interpolate(this.component.url, { file: fileUpload });
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
          const fileKey = this.component.fileKey || 'file';
          const groupResourceId = groupKey ? this.currentForm.submission.data[groupKey]._id : null;
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
              fileUpload.status = 'error';
              fileUpload.message = this.t('File processing has been failed.');
              this.fileDropHidden = false;
              this.redraw();
              return;
            }
            finally {
              if (this.refs.fileProcessingLoader) {
                this.refs.fileProcessingLoader.style.display = 'none';
              }
            }
          }

          let count = 0;
          const multipartOptions = this.component.useMultipartUpload && this.component.multipart ? {
            ...this.component.multipart,
            progressCallback: (total) => {
              count++;
              fileUpload.status = 'progress';
              fileUpload.progress = parseInt(100 * count / total);
              delete fileUpload.message;
              this.redraw();
            },
            changeMessage: (message) => {
              fileUpload.message = message;
              this.redraw();
            },
          } : false;

          fileUpload.message = this.t('Starting upload...');
          this.redraw();

          const filePromise = fileService.uploadFile(
            storage,
            processedFile || file,
            fileName,
            dir,
            // Progress callback
            (evt) => {
              fileUpload.status = 'progress';
              fileUpload.progress = parseInt(100.0 * evt.loaded / evt.total);
              delete fileUpload.message;
              this.redraw();
            },
            url,
            options,
            fileKey,
            groupPermissions,
            groupResourceId,
            // Upload start callback
            () => {
              this.emit('fileUploadingStart', filePromise);
            },
            (abort) => fileUpload.abort = abort,
            multipartOptions
          ).then((fileInfo) => {
              const index = this.statuses.indexOf(fileUpload);
              if (index !== -1) {
                this.statuses.splice(index, 1);
              }
              fileInfo.originalName = escapedFileName;
              fileInfo.hash = fileUpload.hash;
              if (!this.hasValue()) {
                this.dataValue = [];
              }
              this.dataValue.push(fileInfo);
              _.pull(this.filesUploading, fileInfo.originalName);
              this.fileDropHidden = false;
              this.redraw();
              this.triggerChange();
              this.emit('fileUploadingEnd', filePromise);
            })
            .catch((response) => {
              fileUpload.status = 'error';
              fileUpload.message = typeof response === 'string' ? response : response.toString();
              delete fileUpload.progress;
              this.fileDropHidden = false;
              _.pull(this.filesUploading, file.name);
              this.redraw();
              this.emit('fileUploadingEnd', filePromise);
            });
        }
        else {
          this.filesUploading.splice(this.filesUploading.indexOf(file.name),1);
        }
      });
    }
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

  destroy() {
    this.stopVideo();
    super.destroy();
  }
}
