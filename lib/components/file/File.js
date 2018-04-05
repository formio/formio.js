'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FileComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Base = require('../base/Base');

var _utils = require('../../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FileComponent = exports.FileComponent = function (_BaseComponent) {
  _inherits(FileComponent, _BaseComponent);

  function FileComponent(component, options, data) {
    _classCallCheck(this, FileComponent);

    var _this = _possibleConstructorReturn(this, (FileComponent.__proto__ || Object.getPrototypeOf(FileComponent)).call(this, component, options, data));

    _this.support = {
      filereader: typeof FileReader != 'undefined',
      dnd: 'draggable' in document.createElement('span'),
      formdata: !!window.FormData,
      progress: 'upload' in new XMLHttpRequest()
    };
    return _this;
  }

  _createClass(FileComponent, [{
    key: 'getValue',
    value: function getValue() {
      return this.dataValue;
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      this.dataValue = value || [];
      this.refreshDOM();
    }
  }, {
    key: 'build',
    value: function build() {
      // Restore the value.
      this.restoreValue();

      var labelAtTheBottom = this.component.labelPosition === 'bottom';

      this.createElement();
      if (!labelAtTheBottom) {
        this.createLabel(this.element);
      }
      this.inputsContainer = this.ce('div');
      this.errorContainer = this.inputsContainer;
      this.createErrorElement();
      this.listContainer = this.buildList();
      this.inputsContainer.appendChild(this.listContainer);
      this.uploadContainer = this.buildUpload();
      this.hiddenFileInputElement = this.buildHiddenFileInput();
      this.hook('input', this.hiddenFileInputElement, this.inputsContainer);
      this.inputsContainer.appendChild(this.hiddenFileInputElement);
      this.inputsContainer.appendChild(this.uploadContainer);
      this.addWarnings(this.inputsContainer);
      this.buildUploadStatusList(this.inputsContainer);
      this.setInputStyles(this.inputsContainer);
      this.element.appendChild(this.inputsContainer);
      if (labelAtTheBottom) {
        this.createLabel(this.element);
      }
      this.createDescription(this.element);

      // Disable if needed.
      if (this.shouldDisable) {
        this.disabled = true;
      }
    }
  }, {
    key: 'refreshDOM',
    value: function refreshDOM() {
      // Don't refresh before the initial render.
      if (this.listContainer && this.uploadContainer) {
        // Refresh file list.
        var newList = this.buildList();
        this.inputsContainer.replaceChild(newList, this.listContainer);
        this.listContainer = newList;

        // Refresh upload container.
        var newUpload = this.buildUpload();
        this.inputsContainer.replaceChild(newUpload, this.uploadContainer);
        this.uploadContainer = newUpload;
      }
    }
  }, {
    key: 'buildList',
    value: function buildList() {
      if (this.component.image) {
        return this.buildImageList();
      } else {
        return this.buildFileList();
      }
    }
  }, {
    key: 'buildFileList',
    value: function buildFileList() {
      var _this2 = this;

      return this.ce('ul', { class: 'list-group list-group-striped' }, [this.ce('li', { class: 'list-group-item list-group-header hidden-xs hidden-sm' }, this.ce('div', { class: 'row' }, [this.ce('div', { class: 'col-md-1' }), this.ce('div', { class: 'col-md-9' }, this.ce('strong', {}, 'File Name')), this.ce('div', { class: 'col-md-2' }, this.ce('strong', {}, 'Size'))])), this.dataValue.map(function (fileInfo, index) {
        return _this2.createFileListItem(fileInfo, index);
      })]);
    }
  }, {
    key: 'buildHiddenFileInput',
    value: function buildHiddenFileInput() {
      var _this3 = this;

      // Input needs to be in DOM and "visible" (opacity 0 is fine) for IE to display file dialog.
      return this.ce('input', {
        type: 'file',
        style: 'opacity: 0; position: absolute;',
        tabindex: -1,
        onChange: function onChange() {
          _this3.upload(_this3.hiddenFileInputElement.files);
        }
      });
    }
  }, {
    key: 'createFileListItem',
    value: function createFileListItem(fileInfo, index) {
      var _this4 = this;

      return this.ce('li', { class: 'list-group-item' }, this.ce('div', { class: 'row' }, [this.ce('div', { class: 'col-md-1' }, !this.disabled && !this.shouldDisable ? this.ce('i', {
        class: this.iconClass('remove'),
        onClick: function onClick(event) {
          if (fileInfo && _this4.component.storage === 'url') {
            _this4.options.formio.makeRequest('', fileInfo.url, 'delete');
          }
          event.preventDefault();
          _this4.splice(index);
          _this4.refreshDOM();
        }
      }) : null), this.ce('div', { class: 'col-md-9' }, this.createFileLink(fileInfo)), this.ce('div', { class: 'col-md-2' }, this.fileSize(fileInfo.size))]));
    }
  }, {
    key: 'createFileLink',
    value: function createFileLink(file) {
      return this.ce('a', {
        href: file.url, target: '_blank',
        onClick: this.getFile.bind(this, file)
      }, file.originalName || file.name);
    }
  }, {
    key: 'buildImageList',
    value: function buildImageList() {
      var _this5 = this;

      return this.ce('div', {}, this.dataValue.map(function (fileInfo, index) {
        return _this5.createImageListItem(fileInfo, index);
      }));
    }
  }, {
    key: 'createImageListItem',
    value: function createImageListItem(fileInfo, index) {
      var _this6 = this;

      var image = void 0;

      var fileService = this.fileService;
      if (fileService) {
        fileService.downloadFile(fileInfo).then(function (result) {
          image.src = result.url;
        });
      }
      return this.ce('div', {}, this.ce('span', {}, [image = this.ce('img', {
        src: '',
        alt: fileInfo.originalName || fileInfo.name,
        style: 'width:' + this.component.imageSize + 'px'
      }), !this.disabled ? this.ce('i', {
        class: this.iconClass('remove'),
        onClick: function onClick(event) {
          if (fileInfo && _this6.component.storage === 'url') {
            _this6.options.formio.makeRequest('', fileInfo.url, 'delete');
          }
          event.preventDefault();
          _this6.splice(index);
          _this6.refreshDOM();
        }
      }) : null]));
    }
  }, {
    key: 'buildUpload',
    value: function buildUpload() {
      var _this7 = this;

      // Drop event must change this pointer so need a reference to parent this.
      var element = this;
      // If this is disabled or a single value with a value, don't show the upload div.
      return this.ce('div', {}, !this.disabled && (this.component.multiple || this.dataValue.length === 0) ? this.ce('div', {
        class: 'fileSelector',
        onDragover: function onDragover(event) {
          this.className = 'fileSelector fileDragOver';
          event.preventDefault();
        },
        onDragleave: function onDragleave(event) {
          this.className = 'fileSelector';
          event.preventDefault();
        },
        onDrop: function onDrop(event) {
          this.className = 'fileSelector';
          event.preventDefault();
          element.upload(event.dataTransfer.files);
          return false;
        }
      }, [this.ce('i', { class: this.iconClass('cloud-upload') }), this.text(' Drop files to attach, or '), this.ce('a', {
        href: '#',
        onClick: function onClick(event) {
          event.preventDefault();
          // There is no direct way to trigger a file dialog. To work around this, create an input of type file and trigger
          // a click event on it.
          if (typeof _this7.hiddenFileInputElement.trigger === 'function') {
            _this7.hiddenFileInputElement.trigger('click');
          } else {
            _this7.hiddenFileInputElement.click();
          }
        },
        class: 'browse'
      }, 'browse')]) : this.ce('div'));
    }
  }, {
    key: 'buildUploadStatusList',
    value: function buildUploadStatusList(container) {
      var list = this.ce('div');
      this.uploadStatusList = list;
      container.appendChild(list);
    }
  }, {
    key: 'addWarnings',
    value: function addWarnings(container) {
      var hasWarnings = false;
      var warnings = this.ce('div', { class: 'alert alert-warning' });
      if (!this.component.storage) {
        hasWarnings = true;
        warnings.appendChild(this.ce('p').appendChild(this.text('No storage has been set for this field. File uploads are disabled until storage is set up.')));
      }
      if (!this.support.dnd) {
        hasWarnings = true;
        warnings.appendChild(this.ce('p').appendChild(this.text('FFile Drag/Drop is not supported for this browser.')));
      }
      if (!this.support.filereader) {
        hasWarnings = true;
        warnings.appendChild(this.ce('p').appendChild(this.text('File API & FileReader API not supported.')));
      }
      if (!this.support.formdata) {
        hasWarnings = true;
        warnings.appendChild(this.ce('p').appendChild(this.text('XHR2\'s FormData is not supported.')));
      }
      if (!this.support.progress) {
        hasWarnings = true;
        warnings.appendChild(this.ce('p').appendChild(this.text('XHR2\'s upload progress isn\'t supported.')));
      }
      if (hasWarnings) {
        container.appendChild(warnings);
      }
    }
  }, {
    key: 'fileSize',
    value: function fileSize(a, b, c, d, e) {
      return (b = Math, c = b.log, d = 1024, e = c(a) / c(d) | 0, a / b.pow(d, e)).toFixed(2) + ' ' + (e ? 'kMGTPEZY'[--e] + 'B' : 'Bytes');
    }
  }, {
    key: 'createUploadStatus',
    value: function createUploadStatus(fileUpload) {
      var _this8 = this;

      var container = void 0;
      return container = this.ce('div', { class: 'file' + (fileUpload.status === 'error' ? ' has-error' : '') }, [this.ce('div', { class: 'row' }, [this.ce('div', { class: 'fileName control-label col-sm-10' }, [fileUpload.originalName, this.ce('i', {
        class: this.iconClass('remove'),
        onClick: function onClick() {
          _this8.removeChildFrom(container, _this8.uploadStatusList);
        }
      })]), this.ce('div', { class: 'fileSize control-label col-sm-2 text-right' }, this.fileSize(fileUpload.size))]), this.ce('div', { class: 'row' }, [this.ce('div', { class: 'col-sm-12' }, [fileUpload.status === 'progress' ? this.ce('div', { class: 'progress' }, this.ce('div', {
        class: 'progress-bar',
        role: 'progressbar',
        'aria-valuenow': fileUpload.progress,
        'aria-valuemin': 0,
        'aria-valuemax': 100,
        style: 'width:' + fileUpload.progress + '%'
      }, this.ce('span', { class: 'sr-only' }, fileUpload.progress + '% Complete'))) : this.ce('div', { class: 'bg-' + fileUpload.status }, fileUpload.message)])])]);
    }
  }, {
    key: 'globStringToRegex',
    value: function globStringToRegex(str) {
      var regexp = '',
          excludes = [];
      if (str.length > 2 && str[0] === '/' && str[str.length - 1] === '/') {
        regexp = str.substring(1, str.length - 1);
      } else {
        var split = str.split(',');
        if (split.length > 1) {
          for (var i = 0; i < split.length; i++) {
            var r = this.globStringToRegex(split[i]);
            if (r.regexp) {
              regexp += '(' + r.regexp + ')';
              if (i < split.length - 1) {
                regexp += '|';
              }
            } else {
              excludes = excludes.concat(r.excludes);
            }
          }
        } else {
          if (str.indexOf('!') === 0) {
            excludes.push('^((?!' + this.globStringToRegex(str.substring(1)).regexp + ').)*$');
          } else {
            if (str.indexOf('.') === 0) {
              str = '*' + str;
            }
            regexp = '^' + str.replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\-]', 'g'), '\\$&') + '$';
            regexp = regexp.replace(/\\\*/g, '.*').replace(/\\\?/g, '.');
          }
        }
      }
      return { regexp: regexp, excludes: excludes };
    }
  }, {
    key: 'translateScalars',
    value: function translateScalars(str) {
      if (typeof str === 'string') {
        if (str.search(/kb/i) === str.length - 2) {
          return parseFloat(str.substring(0, str.length - 2) * 1024);
        } else if (str.search(/mb/i) === str.length - 2) {
          return parseFloat(str.substring(0, str.length - 2) * 1048576);
        } else if (str.search(/gb/i) === str.length - 2) {
          return parseFloat(str.substring(0, str.length - 2) * 1073741824);
        } else if (str.search(/b/i) === str.length - 1) {
          return parseFloat(str.substring(0, str.length - 1));
        } else if (str.search(/s/i) === str.length - 1) {
          return parseFloat(str.substring(0, str.length - 1));
        } else if (str.search(/m/i) === str.length - 1) {
          return parseFloat(str.substring(0, str.length - 1) * 60);
        } else if (str.search(/h/i) === str.length - 1) {
          return parseFloat(str.substring(0, str.length - 1) * 3600);
        }
      }
      return str;
    }
  }, {
    key: 'validatePattern',
    value: function validatePattern(file, val) {
      if (!val) {
        return true;
      }
      var pattern = this.globStringToRegex(val);
      var valid = true;
      if (pattern.regexp && pattern.regexp.length) {
        var regexp = new RegExp(pattern.regexp, 'i');
        valid = file.type != null && regexp.test(file.type) || file.name != null && regexp.test(file.name);
      }
      var len = pattern.excludes.length;
      while (len--) {
        var exclude = new RegExp(pattern.excludes[len], 'i');
        valid = valid && (file.type == null || exclude.test(file.type)) && (file.name == null || exclude.test(file.name));
      }
      return valid;
    }
  }, {
    key: 'validateMinSize',
    value: function validateMinSize(file, val) {
      return file.size + 0.1 >= this.translateScalars(val);
    }
  }, {
    key: 'validateMaxSize',
    value: function validateMaxSize(file, val) {
      return file.size - 0.1 <= this.translateScalars(val);
    }
  }, {
    key: 'upload',
    value: function upload(files) {
      var _this9 = this;

      // Only allow one upload if not multiple.
      if (!this.component.multiple) {
        files = Array.prototype.slice.call(files, 0, 1);
      }
      if (this.component.storage && files && files.length) {
        // files is not really an array and does not have a forEach method, so fake it.
        Array.prototype.forEach.call(files, function (file) {
          // Check file pattern
          if (_this9.component.filePattern && !_this9.validatePattern(file, _this9.component.filePattern)) {
            return;
          }

          // Check file minimum size
          if (_this9.component.fileMinSize && !_this9.validateMinSize(file, _this9.component.fileMinSize)) {
            return;
          }

          // Check file maximum size
          if (_this9.component.fileMaxSize && !_this9.validateMaxSize(file, _this9.component.fileMaxSize)) {
            return;
          }

          // Get a unique name for this file to keep file collisions from occurring.
          var fileName = _utils2.default.uniqueName(file.name);
          var fileUpload = {
            originalName: file.name,
            name: fileName,
            size: file.size,
            status: 'info',
            message: 'Starting upload'
          };
          var dir = _this9.interpolate(_this9.component.dir || '', { data: _this9.data, row: _this9.row });
          var fileService = _this9.fileService;
          if (!fileService) {
            fileUpload.status = 'error';
            fileUpload.message = 'File Service not provided.';
          }

          var uploadStatus = _this9.createUploadStatus(fileUpload);
          _this9.uploadStatusList.appendChild(uploadStatus);

          if (fileService) {
            fileService.uploadFile(_this9.component.storage, file, fileName, dir, function (evt) {
              fileUpload.status = 'progress';
              fileUpload.progress = parseInt(100.0 * evt.loaded / evt.total);
              delete fileUpload.message;
              var originalStatus = uploadStatus;
              uploadStatus = _this9.createUploadStatus(fileUpload);
              _this9.uploadStatusList.replaceChild(uploadStatus, originalStatus);
            }, _this9.component.url).then(function (fileInfo) {
              _this9.removeChildFrom(uploadStatus, _this9.uploadStatusList);
              fileInfo.originalName = file.name;
              _this9.dataValue.push(fileInfo);
              _this9.refreshDOM();
              _this9.triggerChange();
            }).catch(function (response) {
              fileUpload.status = 'error';
              fileUpload.message = response;
              delete fileUpload.progress;
              var originalStatus = uploadStatus;
              uploadStatus = _this9.createUploadStatus(fileUpload);
              _this9.uploadStatusList.replaceChild(uploadStatus, originalStatus);
            });
          }
        });
      }
    }
  }, {
    key: 'getFile',
    value: function getFile(fileInfo, event) {
      var fileService = this.fileService;
      if (!fileService) {
        return alert('File Service not provided');
      }
      fileService.downloadFile(fileInfo).then(function (file) {
        if (file) {
          window.open(file.url, '_blank');
        }
      }).catch(function (response) {
        // Is alert the best way to do this?
        // User is expecting an immediate notification due to attempting to download a file.
        alert(response);
      });
      event.preventDefault();
    }
  }, {
    key: 'emptyValue',
    get: function get() {
      return [];
    }
  }, {
    key: 'defaultValue',
    get: function get() {
      var value = _get(FileComponent.prototype.__proto__ || Object.getPrototypeOf(FileComponent.prototype), 'defaultValue', this);
      return Array.isArray(value) ? value : [];
    }
  }, {
    key: 'fileService',
    get: function get() {
      return this.options.fileService || this.options.formio;
    }
  }]);

  return FileComponent;
}(_Base.BaseComponent);