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

  build() {
    this.createElement();
    this.createLabel(this.element);
    this.errorContainer = this.element;
    this.createErrorElement();
    this.buildList(this.element);
    this.buildUpload(this.element);
    this.addWarnings(this.element);
    this.buildUploadStatusList(this.element);
  }

  buildList(container) {
    if (this.component.image) {
      container.appendChild(this.buildImageList());
    }
    else {
      container.appendChild(this.buildFileList());
    }
  }

  buildFileList() {
    let list = this.ce('filelist', 'div');
    list.innerHTML = 'File List';
    return list;
  }

  buildImageList() {
    let list = this.ce('imagelist', 'div');
    list.innerHTML = 'Image List';
    return list;
  }

  buildUpload(container) {
    let wrapper = this.ce('uploadwrapper', 'div');
    let upload = this.ce('upload', 'div', {
      class: 'fileSelector'
    });
    upload.ondragover = function () { this.className = 'fileSelector hover'; return false; };
    upload.ondragend = function () { this.className = 'fileSelector'; return false; };
    upload.ondrop = event => {
      upload.className = 'fileSelector';
      event.preventDefault();
      this.upload(event.dataTransfer.files);
    }
    upload.appendChild(this.ce('icon', 'i', {class: 'glyphicon glyphicon-cloud-upload'}));
    upload.appendChild(this.text(' Drop files to attach, or '));
    let browse = this.ce('browse', 'a');
    browse.innerHTML = 'browse';
    this.addEventListener(browse, 'click', event => {
      event.preventDefault();
      // There is no direct way to trigger a file dialog. To work around this, create an input of type file and trigger
      // a click event on it.
      let input = this.ce('fileinput', 'input', {type: 'file'});
      // Trigger a click event on the input.
      if (typeof input.trigger === 'function') {
        input.trigger('click');
      }
      else {
        input.click();
      }
      input.addEventListener('change', () => {this.upload(input.files)});
    });
    upload.appendChild(browse);
    wrapper.appendChild(upload);
    container.appendChild(wrapper);
  }

  buildUploadStatusList(container) {
    let list = this.ce('uploadlist', 'div');
    this.uploadStatusList = list;
    container.appendChild(list);
  }

  addWarnings(container) {
    let hasWarnings = false;
    let warnings = this.ce('warnings', 'div', {class: 'alert alert-warning'});
    if (!this.component.storage) {
      hasWarnings = true;
      warnings.appendChild(this.ce('nostorage', 'p').appendChild(this.text('No storage has been set for this field. File uploads are disabled until storage is set up.')));
    }
    if (!this.support.dnd) {
      hasWarnings = true;
      warnings.appendChild(this.ce('nodnd', 'p').appendChild(this.text('FFile Drag/Drop is not supported for this browser.')));
    }
    if (!this.support.filereader) {
      hasWarnings = true;
      warnings.appendChild(this.ce('nofilereader', 'p').appendChild(this.text('File API & FileReader API not supported.')));
    }
    if (!this.support.formdata) {
      hasWarnings = true;
      warnings.appendChild(this.ce('noformdata', 'p').appendChild(this.text('XHR2\'s FormData is not supported.')));
    }
    if (!this.support.progress) {
      hasWarnings = true;
      warnings.appendChild(this.ce('noprogress', 'p').appendChild(this.text('XHR2\'s upload progress isn\'t supported.')));
    }
    if (hasWarnings) {
      container.appendChild(warnings);
    }
  }

  fileSize(a, b, c, d, e) {
    return (b = Math, c = b.log, d = 1024, e = c(a) / c(d) | 0, a / b.pow(d, e)).toFixed(2) + ' ' + (e ? 'kMGTPEZY'[--e] + 'B' : 'Bytes');
  };

  createUploadStatus(fileUpload) {
    const container = this.ce('uploadstatus', 'div', {class: 'file' + (fileUpload.status === 'error' ? ' has-error' : '')});
    const row1 = this.ce('filerow', 'div', {class: 'row'});
    container.appendChild(row1);
    const fileCell = this.ce('filecell', 'div', {class: 'fileName control-label col-sm-10'});
    row1.appendChild(fileCell);
    fileCell.appendChild(this.text(fileUpload.name));
    const remove = this.ce('removefile', 'span', {class: 'glyphicon glyphicon-remove'});
    remove.addEventListener('click', () => {this.uploadStatusList.removeChild(container)});
    fileCell.appendChild(remove);
    const sizeCell = this.ce('sizecell', 'div', {class: 'fileSize control-label col-sm-2 text-right'});
    row1.appendChild(sizeCell);
    sizeCell.appendChild(this.text(this.fileSize(fileUpload.size)));
    const row2 = this.ce('statusrow', 'div', {class: 'row'});
    container.appendChild(row2);
    const col = this.ce('progresscell', 'div', {class: 'col-sm-12'});
    row2.appendChild(col);
    if (fileUpload.status === 'progress') {
      const progressCell = this.ce('progresscell', 'div', {class: 'progess'});
      col.appendChild(progressCell);
    }
    else {
      const messageCell = this.ce('messagecell', 'div', {class: 'bg-' + fileUpload.status});
      messageCell.appendChild(this.text(fileUpload.message));
      col.appendChild(messageCell);
    }

    return container;
  }

  upload(files) {
    if (this.component.storage && files && files.length) {
      // files is not really an array and does not have a forEach method, so fake it.
      Array.prototype.forEach.call(files, file => {
        // Get a unique name for this file to keep file collisions from occurring.
        const fileName = FormioUtils.uniqueName(file.name);
        let fileUpload = {
          name: fileName,
          size: file.size,
          status: 'info',
          message: 'Starting upload'
        };
        const dir = this.interpolate(this.component.dir || '', {data: this.data, row: this.row});
        let formio = null;
        if (this.formio) {
          formio = this.formio;
        }
        else {
          fileUpload.status = 'error';
          fileUpload.message = 'File Upload URL not provided.';
        }

        let uploadStatus = this.createUploadStatus(fileUpload);
        this.uploadStatusList.appendChild(uploadStatus);

        if (formio) {
          formio.uploadFile(this.component.storage, file, fileName, dir, evt => {
            fileUpload.status = 'progress';
            fileUpload.progress = parseInt(100.0 * evt.loaded / evt.total);
            delete fileUpload.message;
            const originalStatus = uploadStatus;
            uploadStatus = this.createUploadStatus(fileUpload);
            this.uploadStatusList.replaceChild(uploadStatus, originalStatus);
          }, this.component.url)
          .then(fileInfo => {
            this.uploadStatusList.removeChild(uploadStatus);
            // Ensure that the file component is an array.
            //if (
            //  !this.data[this.component.key] ||
            //  !(this.data[this.component.key] instanceof Array)
            //) {
            //  this.data[this.component.key] = [];
            //}
            //this.data[this.component.key].push(fileInfo);
          })
          .catch(response => {
            fileUpload.status = 'error';
            fileUpload.message = response.data;
            delete fileUpload.progress;
            const originalStatus = uploadStatus;
            uploadStatus = this.createUploadStatus(fileUpload);
            this.uploadStatusList.replaceChild(uploadStatus, originalStatus);
          });
        }
      });
    }
  }
}
