import { BaseComponent } from '../base/Base';
import FormioUtils from '../../utils';
import Formio from '../../formio';

export class FileComponent extends BaseComponent {
  constructor(component, options, data) {
    super(component, options, data);
    this.support = {
      filereader: typeof FileReader != 'undefined',
      dnd: 'draggable' in document.createElement('span'),
      formdata: !!window.FormData,
      progress: "upload" in new XMLHttpRequest
    };
  }

  getValue() {
    return this.data[this.component.key];
  }

  setValue(value) {
    this.data[this.component.key] = value;
    this.refreshDOM();
  }

  build() {
    // Set default to empty array.
    this.setValue([]);

    const labelAtTheBottom = this.component.labelPosition === 'bottom';

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
  }

  refreshDOM() {
    // Don't refresh before the initial render.
    if (this.listContainer && this.uploadContainer) {
      // Refresh file list.
      const newList = this.buildList();
      this.inputsContainer.replaceChild(newList, this.listContainer);
      this.listContainer = newList;

      // Refresh upload container.
      const newUpload = this.buildUpload();
      this.inputsContainer.replaceChild(newUpload, this.uploadContainer);
      this.uploadContainer = newUpload;
    }
  }

  buildList() {
    if (this.component.image) {
      return this.buildImageList();
    }
    else {
      return this.buildFileList();
    }
  }

  buildFileList() {
    return this.ce('ul', {class: 'list-group list-group-striped'}, [
      this.ce('li', {class: 'list-group-item list-group-header hidden-xs hidden-sm'},
        this.ce('div', {class: 'row'},
          [
            this.ce('div', {class: 'col-md-1'}),
            this.ce('div', {class: 'col-md-9'},
              this.ce('strong', {}, 'File Name')
            ),
            this.ce('div', {class: 'col-md-2'},
              this.ce('strong', {}, 'Size')
            )
          ]
        )
      ),
      this.data[this.component.key].map((fileInfo, index) => this.createFileListItem(fileInfo, index))
    ]);
  }

  buildHiddenFileInput() {
    // Input needs to be in DOM and "visible" (opacity 0 is fine) for IE to display file dialog.
    return this.ce('input', {
      type: 'file',
      style: 'opacity: 0; position: absolute;',
      onChange: () => {this.upload(this.hiddenFileInputElement.files)}
    });
  }

  createFileListItem(fileInfo, index) {
    return this.ce('li', {class: 'list-group-item'},
      this.ce('div', {class: 'row'},
        [
          this.ce('div', {class: 'col-md-1'},
            (
              !this.disabled ?
                this.ce('span', {
                  class: 'glyphicon glyphicon-remove',
                  onClick: event => {
                    if (this.component.storage === 'url') {
                      this.options.formio.makeRequest('', this.data[this.component.key][index].url, 'delete');
                    }
                    event.preventDefault();
                    this.data[this.component.key].splice(index, 1);
                    this.refreshDOM();
                    this.triggerChange();

                  }
                }) :
                null
            )
          ),
          this.ce('div', {class: 'col-md-9'}, this.createFileLink(fileInfo)),
          this.ce('div', {class: 'col-md-2'}, this.fileSize(fileInfo.size))
        ]
      )
    )
  }

  createFileLink(file) {
    return this.ce('a', {
      href: file.url, target: '_blank',
      onClick: this.getFile.bind(this, file)
    }, file.originalName || file.name);
  }

  buildImageList() {
    return this.ce('div', {},
      this.data[this.component.key].map((fileInfo, index) => this.createImageListItem(fileInfo, index))
    );
  }

  get fileService() {
    return this.options.fileService || this.options.formio;
  }

  createImageListItem(fileInfo, index) {
    let image;

    let fileService = this.fileService;
    if (fileService) {
      fileService.downloadFile(fileInfo)
        .then(result => {
          image.src = result.url;
        });
    }
    return this.ce('div', {},
      this.ce('span', {},
        [
          image = this.ce('img', {src: '', alt: fileInfo.originalName || fileInfo.name, style: 'width:' + this.component.imageSize + 'px'}),
          (
            !this.disabled ?
              this.ce('span', {
                class: 'glyphicon glyphicon-remove',
                onClick: event => {
                  if (this.component.storage === 'url') {
                    this.options.formio.makeRequest('', this.data[this.component.key][index].url, 'delete');
                  }
                  event.preventDefault();
                  this.data[this.component.key].splice(index, 1);
                  this.refreshDOM();
                  this.triggerChange();
                }
              }) :
              null
          )
        ]
      )
    );
  }

  buildUpload() {
    // Drop event must change this pointer so need a reference to parent this.
    const element = this;
    // If this is disabled or a single value with a value, don't show the upload div.
    return this.ce('div', {},
      (
        (!this.disabled && (this.component.multiple || this.data[this.component.key].length === 0)) ?
          this.ce('div', {
            class: 'fileSelector',
            onDragover: function (event) {
              this.className = 'fileSelector fileDragOver';
              event.preventDefault();
            },
            onDragleave: function (event) {
              this.className = 'fileSelector';
              event.preventDefault();
            },
            onDrop: function(event) {
              this.className = 'fileSelector';
              event.preventDefault();
              element.upload(event.dataTransfer.files);
              return false;
            }
          },
            [
              this.ce('i', {class: 'glyphicon glyphicon-cloud-upload'}),
              this.text(' Drop files to attach, or '),
              this.ce('a', {
                onClick: event => {
                  event.preventDefault();
                  // There is no direct way to trigger a file dialog. To work around this, create an input of type file and trigger
                  // a click event on it.
                  if (typeof this.hiddenFileInputElement.trigger === 'function') {
                    this.hiddenFileInputElement.trigger('click');
                  }
                  else {
                    this.hiddenFileInputElement.click();
                  }
                },
                class: 'browse'
              }, 'browse')
            ]
          ) :
          this.ce('div')
      )
    );
  }

  buildUploadStatusList(container) {
    let list = this.ce('div');
    this.uploadStatusList = list;
    container.appendChild(list);
  }

  addWarnings(container) {
    let hasWarnings = false;
    let warnings = this.ce('div', {class: 'alert alert-warning'});
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

  fileSize(a, b, c, d, e) {
    return (b = Math, c = b.log, d = 1024, e = c(a) / c(d) | 0, a / b.pow(d, e)).toFixed(2) + ' ' + (e ? 'kMGTPEZY'[--e] + 'B' : 'Bytes');
  };

  createUploadStatus(fileUpload) {
    let container;
    return container = this.ce('div', {class: 'file' + (fileUpload.status === 'error' ? ' has-error' : '')}, [
      this.ce('div', {class: 'row'}, [
          this.ce('div', {class: 'fileName control-label col-sm-10'}, [
            fileUpload.originalName,
            this.ce('span', {
              class: 'glyphicon glyphicon-remove',
              onClick: () => {this.uploadStatusList.removeChild(container)}
            })
          ]),
          this.ce('div', {class: 'fileSize control-label col-sm-2 text-right'}, this.fileSize(fileUpload.size))
        ]),
      this.ce('div', {class: 'row'}, [
        this.ce('div', {class: 'col-sm-12'}, [
          (fileUpload.status === 'progress' ?
            this.ce('div', {class: 'progress'},
              this.ce('div', {
                class: 'progress-bar',
                role: 'progressbar',
                'aria-valuenow': fileUpload.progress,
                'aria-valuemin': 0,
                'aria-valuemax': 100,
                style: 'width:' + fileUpload.progress + '%'
              },
                this.ce('span', {class: 'sr-only'}, fileUpload.progress + '% Complete')
              )
            ) :
            this.ce('div', {class: 'bg-' + fileUpload.status}, fileUpload.message)
          )
        ])
      ])
    ]);
  }

  globStringToRegex(str) {
    var regexp = '', excludes = [];
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
    return {regexp: regexp, excludes: excludes};
  }

  translateScalars(str) {
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
  };

  validatePattern(file, val) {
    if (!val) {
      return true;
    }
    var pattern = this.globStringToRegex(val), valid = true;
    if (pattern.regexp && pattern.regexp.length) {
      var regexp = new RegExp(pattern.regexp, 'i');
      valid = (file.type != null && regexp.test(file.type)) ||
        (file.name != null && regexp.test(file.name));
    }
    var len = pattern.excludes.length;
    while (len--) {
      var exclude = new RegExp(pattern.excludes[len], 'i');
      valid = valid && (file.type == null || exclude.test(file.type)) &&
        (file.name == null || exclude.test(file.name));
    }
    return valid;
  };

  validateMinSize(file, val) {
    return file.size + 0.1 >= this.translateScalars(val);
  };

  validateMaxSize(file, val) {
    return file.size - 0.1 <= this.translateScalars(val);
  };

  upload(files) {
    // Only allow one upload if not multiple.
    if (!this.component.multiple) {
      files = Array.prototype.slice.call(files, 0, 1);
    }
    if (this.component.storage && files && files.length) {
      // files is not really an array and does not have a forEach method, so fake it.
      Array.prototype.forEach.call(files, file => {
        // Check file pattern
        if (this.component.filePattern && !this.validatePattern(file, this.component.filePattern)) {
          return;
        }

        // Check file minimum size
        if (this.component.fileMinSize && !this.validateMinSize(file, this.component.fileMinSize)) {
          return;
        }

        // Check file maximum size
        if (this.component.fileMaxSize && !this.validateMaxSize(file, this.component.fileMaxSize)) {
          return;
        }

        // Get a unique name for this file to keep file collisions from occurring.
        const fileName = FormioUtils.uniqueName(file.name);
        let fileUpload = {
          originalName: file.name,
          name: fileName,
          size: file.size,
          status: 'info',
          message: 'Starting upload'
        };
        const dir = this.interpolate(this.component.dir || '', {data: this.data, row: this.row});
        const fileService = this.fileService;
        if (!fileService) {
          fileUpload.status = 'error';
          fileUpload.message = 'File Service not provided.';
        }

        let uploadStatus = this.createUploadStatus(fileUpload);
        this.uploadStatusList.appendChild(uploadStatus);

        if (fileService) {
          fileService.uploadFile(this.component.storage, file, fileName, dir, evt => {
            fileUpload.status = 'progress';
            fileUpload.progress = parseInt(100.0 * evt.loaded / evt.total);
            delete fileUpload.message;
            const originalStatus = uploadStatus;
            uploadStatus = this.createUploadStatus(fileUpload);
            this.uploadStatusList.replaceChild(uploadStatus, originalStatus);
          }, this.component.url)
            .then(fileInfo => {
              this.uploadStatusList.removeChild(uploadStatus);
              fileInfo.originalName = file.name;
              this.data[this.component.key].push(fileInfo);
              this.refreshDOM();
              this.triggerChange();
            })
            .catch(response => {
              fileUpload.status = 'error';
              fileUpload.message = response;
              delete fileUpload.progress;
              const originalStatus = uploadStatus;
              uploadStatus = this.createUploadStatus(fileUpload);
              this.uploadStatusList.replaceChild(uploadStatus, originalStatus);
            });
        }
      });
    }
  }

  getFile(fileInfo, event)  {
    const fileService = this.fileService;
    if (!fileService) {
      return alert('File Service not provided');
    }
    fileService.downloadFile(fileInfo).then(function(file) {
      if (file) {
        window.open(file.url, '_blank');
      }
    })
      .catch(function(response) {
        // Is alert the best way to do this?
        // User is expecting an immediate notification due to attempting to download a file.
        alert(response);
      });
    event.preventDefault();
  }
}
