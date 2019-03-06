import Component from '../_classes/component/Component';
import { uniqueName } from '../../utils/utils';
import download from 'downloadjs';
import Formio from '../../Formio';
let Camera;
const webViewCamera = navigator.camera || Camera;

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

export default class FileComponent extends Component {
  static schema(...extend) {
    return Component.schema({
      type: 'file',
      label: 'Upload',
      key: 'file',
      image: false,
      privateDownload: false,
      imageSize: '200',
      filePattern: '*',
      fileMinSize: '0KB',
      fileMaxSize: '1GB',
      uploadOnly: false
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'File',
      group: 'advanced',
      icon: 'file',
      documentation: 'http://help.form.io/userguide/#file',
      weight: 100,
      schema: FileComponent.schema()
    };
  }

  init() {
    super.init();
    this.support = {
      filereader: typeof FileReader != 'undefined',
      formdata: !!window.FormData,
      progress: 'upload' in new XMLHttpRequest
    };
    // Called when our files are ready.
    this.filesReady = new Promise((resolve, reject) => {
      this.filesReadyResolve = resolve;
      this.filesReadyReject = reject;
    });
    this.support.hasWarning = !this.support.filereader || !this.support.formdata || !this.support.progress;
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
    return this.fileService.downloadFile(fileInfo).then(result => {
      return result.url;
    });
  }

  get emptyValue() {
    return [];
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

  get fileService() {
    if (this.options.fileService) {
      return this.options.fileService;
    }
    if (this.options.formio) {
      return this.options.formio;
    }
    if (this.root && this.root.formio) {
      return this.root.formio;
    }
    const formio = new Formio();
    // If a form is loaded, then make sure to set the correct formUrl.
    if (this.root && this.root._form && this.root._form._id) {
      formio.formUrl = `${formio.projectUrl}/form/${this.root._form._id}`;
    }
    return formio;
  }

  render() {
    return super.render(this.renderTemplate('file', {
      fileSize: this.fileSize,
      files: this.dataValue || [],
      statuses: this.statuses,
      disabled: this.shouldDisable,
      support: this.support,
    }));
  }

  startVideo() {
    if (!this.refs.videoPlayer || !this.refs.videoCanvas) {
      console.warn('Video player not found in template.');
      this.cameraMode = false;
      this.redraw();
      return;
    }

    navigator.getMedia = (navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia);

    navigator.getMedia(
      {
        video: {
          width: { min: 640, ideal: 1920 },
          height: { min: 400, ideal: 1080 },
          aspectRatio: { ideal: 1.7777777778 }
        },
        audio: false
      },
      (stream) => {
        if (navigator.mozGetUserMedia) {
          this.refs.videoPlayer.mozSrcObject = stream;
        }
        else {
          this.refs.videoPlayer.srcObject = stream;
        }
        const width = parseInt(this.component.webcamSize) || 320;
        this.refs.videoPlayer.setAttribute('width', width);
        this.refs.videoPlayer.play();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  takePicture() {
    if (!this.refs.videoPlayer || !this.refs.videoCanvas) {
      console.warn('Video player not found in template.');
      this.cameraMode = false;
      this.redraw();
      return;
    }

    this.refs.videoCanvas.setAttribute('width', this.refs.videoPlayer.videoWidth);
    this.refs.videoCanvas.setAttribute('height', this.refs.videoPlayer.videoHeight);
    this.refs.videoCanvas.getContext('2d').drawImage(this.refs.videoPlayer, 0, 0);
    this.refs.videoCanvas.toBlob(blob => {
      blob.name = `photo-${Date.now()}.png`;
      this.upload([blob]);
    });
  }

  get useWebViewCamera() {
    return this.component.image && webViewCamera;
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
      videoCanvas: 'single',
      hiddenFileInputElement: 'single',
      fileLink: 'multiple',
      removeLink: 'multiple',
      fileStatusRemove: 'multiple',
      fileImage: 'multiple',
    });
    super.attach(element);

    if (this.refs.fileDrop) {
      const element = this;
      this.addEventListener(this.refs.fileDrop, 'dragOver', function(event) {
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

    if (this.refs.fileBrowse && this.refs.hiddenFileInputElement) {
      this.addEventListener(this.refs.fileBrowse, 'click', (event) => {
        event.preventDefault();
        // There is no direct way to trigger a file dialog. To work around this, create an input of type file and trigger
        // a click event on it.
        if (typeof this.refs.hiddenFileInputElement.trigger === 'function') {
          this.refs.hiddenFileInputElement.trigger('click');
        }
        else {
          this.refs.hiddenFileInputElement.click();
        }
      });
      this.addEventListener(this.refs.hiddenFileInputElement, 'change', () => {
        this.upload(this.refs.hiddenFileInputElement.files);
        this.refs.hiddenFileInputElement.value = '';
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
        if (fileInfo && (this.component.storage === 'url')) {
          this.options.formio.makeRequest('', fileInfo.url, 'delete');
        }
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
                this.upload([file]);
              });
            }
          );
        }, null, {
          sourceType: webViewCamera.PictureSourceType.PHOTOLIBRARY
        });
      });
    }

    if (this.refs.cameraButton && webViewCamera) {
      this.addEventListener(this.refs.cameraButton, 'click', (event) => {
        event.preventDefault();
        webViewCamera.getPicture((success) => {
          window.resolveLocalFileSystemURL(success, (fileEntry) => {
              fileEntry.file((file) => {
                this.upload([file]);
              });
            }
          );
        }, null, {
          sourceType: webViewCamera.PictureSourceType.CAMERA,
          encodingType: webViewCamera.EncodingType.PNG,
          mediaType: webViewCamera.MediaType.PICTURE,
          saveToPhotoAlbum: true,
          correctOrientation: false
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
        if (this.cameraMode) {
          this.startVideo();
        }
        this.redraw();
      });
    }

    const fileService = this.fileService;
    if (fileService) {
      const loadingImages = [];
      this.refs.fileImage.forEach((image, index) => {
        loadingImages.push(this.loadImage(this.dataValue[index]).then((url) => (image.src = url)));
      });
      if (loadingImages.length) {
        Promise.all(loadingImages).then(() => {
          this.redraw();
          this.filesReadyResolve();
        }).catch(() => this.filesReadyReject());
      }
    }
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
        if (str.indexOf('!') === 0) {
          excludes.push(`^((?!${this.globStringToRegex(str.substring(1)).regexp}).)*$`);
        }
        else {
          if (str.indexOf('.') === 0) {
            str = `*${str}`;
          }
          regexp = `^${str.replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\-]', 'g'), '\\$&')}$`;
          regexp = regexp.replace(/\\\*/g, '.*').replace(/\\\?/g, '.');
        }
      }
    }
    return { regexp: regexp, excludes: excludes };
  }
  /* eslint-enable max-depth */

  translateScalars(str) {
    if (typeof str === 'string') {
      if (str.search(/kb/i) === str.length - 2) {
        return parseFloat(str.substring(0, str.length - 2) * 1024);
      }
      else if (str.search(/mb/i) === str.length - 2) {
        return parseFloat(str.substring(0, str.length - 2) * 1048576);
      }
      else if (str.search(/gb/i) === str.length - 2) {
        return parseFloat(str.substring(0, str.length - 2) * 1073741824);
      }
      else if (str.search(/b/i) === str.length - 1) {
        return parseFloat(str.substring(0, str.length - 1));
      }
      else if (str.search(/s/i) === str.length - 1) {
        return parseFloat(str.substring(0, str.length - 1));
      }
      else if (str.search(/m/i) === str.length - 1) {
        return parseFloat(str.substring(0, str.length - 1) * 60);
      }
      else if (str.search(/h/i) === str.length - 1) {
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
      valid = (file.type != null && regexp.test(file.type)) ||
        (file.name != null && regexp.test(file.name));
    }
    let len = pattern.excludes.length;
    while (len--) {
      const exclude = new RegExp(pattern.excludes[len], 'i');
      valid = valid && (file.type == null || exclude.test(file.type)) &&
        (file.name == null || exclude.test(file.name));
    }
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
      Array.prototype.forEach.call(files, file => {
        const fileName = uniqueName(file.name);
        const fileUpload = {
          originalName: file.name,
          name: fileName,
          size: file.size,
          status: 'info',
          message: 'Starting upload'
        };

        // Check file pattern
        if (this.component.filePattern && !this.validatePattern(file, this.component.filePattern)) {
          fileUpload.status = 'error';
          fileUpload.message = `File is the wrong type; it must be ${this.component.filePattern}`;
        }

        // Check file minimum size
        if (this.component.fileMinSize && !this.validateMinSize(file, this.component.fileMinSize)) {
          fileUpload.status = 'error';
          fileUpload.message = `File is too small; it must be at least ${this.component.fileMinSize}`;
        }

        // Check file maximum size
        if (this.component.fileMaxSize && !this.validateMaxSize(file, this.component.fileMaxSize)) {
          fileUpload.status = 'error';
          fileUpload.message = `File is too big; it must be at most ${this.component.fileMaxSize}`;
        }

        // Get a unique name for this file to keep file collisions from occurring.
        const dir = this.interpolate(this.component.dir || '');
        const fileService = this.fileService;
        if (!fileService) {
          fileUpload.status = 'error';
          fileUpload.message = 'File Service not provided.';
        }

        this.statuses.push(fileUpload);
        this.redraw();

        if (fileUpload.status !== 'error') {
          if (this.component.privateDownload) {
            file.private = true;
          }
          const { storage, url, options } = this.component;
          fileService.uploadFile(storage, file, fileName, dir, evt => {
            fileUpload.status = 'progress';
            fileUpload.progress = parseInt(100.0 * evt.loaded / evt.total);
            delete fileUpload.message;
            this.redraw();
          }, url, options)
            .then(fileInfo => {
              const index = this.statuses.indexOf(fileUpload);
              if (index !== -1) {
                this.statuses.splice(index, 1);
              }
              fileInfo.originalName = file.name;
              this.dataValue.push(fileInfo);
              this.redraw();
              this.triggerChange();
            })
            .catch(response => {
              fileUpload.status = 'error';
              fileUpload.message = response;
              delete fileUpload.progress;
              this.redraw();
            });
        }
      });
    }
  }

  getFile(fileInfo, event) {
    const fileService = this.fileService;
    if (!fileService) {
      return alert('File Service not provided');
    }
    if (this.component.privateDownload) {
      fileInfo.private = true;
    }
    fileService.downloadFile(fileInfo).then((file) => {
      if (file) {
        if (file.storage === 'base64') {
          download(file.url, file.originalName, file.type);
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
    event.preventDefault();
  }

  focus() {
    this.refs.fileBrowse.focus();
  }
}
