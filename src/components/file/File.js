import Field from '../_classes/field/Field';
import { uniqueName } from '../../utils/utils';
import download from 'downloadjs';
import _ from 'lodash';
import NativePromise from 'native-promise-only';

let Camera;
let webViewCamera = navigator.camera || Camera;

// canvas.toBlob polyfill.
if (!HTMLCanvasElement.prototype.toBlob) {
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
      documentation: 'http://help.form.io/userguide/#file',
      weight: 100,
      schema: FileComponent.schema(),
    };
  }

  init() {
    super.init();
    webViewCamera = navigator.camera || Camera;
    const fileReaderSupported = (typeof FileReader !== 'undefined');
    const formDataSupported = Boolean(window.FormData);
    const progressSupported = window.XMLHttpRequest ? ('upload' in new XMLHttpRequest) : false;

    this.support = {
      filereader: fileReaderSupported,
      formdata: formDataSupported,
      hasWarning: !fileReaderSupported || !formDataSupported || !progressSupported,
      progress: progressSupported,
    };
    // Called when our files are ready.
    this.filesReady = new NativePromise((resolve, reject) => {
      this.filesReadyResolve = resolve;
      this.filesReadyReject = reject;
    });
    this.cameraMode = false;
    this.statuses = [];
  }

  get dataReady() {
    return this.filesReady;
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

  render() {
    return super.render(this.renderTemplate('file', {
      fileSize: this.fileSize,
      files: this.dataValue || [],
      statuses: this.statuses,
      disabled: this.disabled,
      support: this.support,
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

    if (this.imageUpload) {
      options.accept = 'image/*';
    }

    return options;
  }

  deleteFile(fileInfo) {
    if (fileInfo && (this.component.storage === 'url')) {
      const fileService = this.fileService;
      if (fileService && typeof fileService.deleteFile === 'function') {
        fileService.deleteFile(fileInfo);
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
    });
    // Ensure we have an empty input refs. We need this for the setValue method to redraw the control when it is set.
    this.refs.input = [];
    const superAttach = super.attach(element);

    if (this.refs.fileDrop) {
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
        return false;
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
      this.dataValue[index].fileType = this.component.fileTypes[0].label;

      this.addEventListener(fileType, 'change', (event) => {
        event.preventDefault();

        const fileType = this.component.fileTypes.find((typeObj) => typeObj.value === event.target.value);

        this.dataValue[index].fileType = fileType.label;
      });
    });

    const fileService = this.fileService;
    if (fileService) {
      const loadingImages = [];
      this.refs.fileImage.forEach((image, index) => {
        loadingImages.push(this.loadImage(this.dataValue[index]).then((url) => (image.src = url)));
      });
      if (loadingImages.length) {
        NativePromise.all(loadingImages).then(() => {
          this.filesReadyResolve();
        }).catch(() => this.filesReadyReject());
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
      files = Array.prototype.slice.call(files, 0, 1);
    }
    if (this.component.storage && files && files.length) {
      // files is not really an array and does not have a forEach method, so fake it.
      Array.prototype.forEach.call(files, (file) => {
        const fileName = uniqueName(file.name, this.component.fileNameTemplate, this.evalContext());
        const fileUpload = {
          originalName: file.name,
          name: fileName,
          size: file.size,
          status: 'info',
          message: this.t('Starting upload'),
        };

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

        this.statuses.push(fileUpload);
        this.redraw();

        if (fileUpload.status !== 'error') {
          if (this.component.privateDownload) {
            file.private = true;
          }
          const { storage, options = {} } = this.component;
          const url = this.interpolate(this.component.url);
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
          fileService.uploadFile(storage, file, fileName, dir, (evt) => {
            fileUpload.status = 'progress';
            fileUpload.progress = parseInt(100.0 * evt.loaded / evt.total);
            delete fileUpload.message;
            this.redraw();
          }, url, options, fileKey, groupPermissions, groupResourceId)
            .then((fileInfo) => {
              const index = this.statuses.indexOf(fileUpload);
              if (index !== -1) {
                this.statuses.splice(index, 1);
              }
              fileInfo.originalName = file.name;
              if (!this.hasValue()) {
                this.dataValue = [];
              }
              this.dataValue.push(fileInfo);
              this.redraw();
              this.triggerChange();
            })
            .catch((response) => {
              fileUpload.status = 'error';
              fileUpload.message = response;
              delete fileUpload.progress;
              this.redraw();
            });
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
    if (this.refs.fileBrowse) {
      this.refs.fileBrowse.focus();
    }
  }

  destroy() {
    this.stopVideo();
    super.destroy();
  }
}
