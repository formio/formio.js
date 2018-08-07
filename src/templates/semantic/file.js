export default {
  form: `
{% if (!component.image) { %}
<div class="ui celled list">
  <div class="item">
    <div class="ui grid">
      {% if (!disabled) { %}
      <div class="one wide column"></div>
      {% } %}
      <div class="twelve wide column"><strong>File Name</strong></div>
      <div class="three wide column"><strong>Size</strong></div>
    </div>
  </div>
  {% files.forEach(function(file) { %}
  <li class="list-group-item">
    <div class="ui grid">
      {% if (!disabled) { %}
      <div class="one wide column"><i class="{{iconClass('remove')}}" ref="removeLink"></i></div>
      {% } %}
      <div class="twelve wide column">
        {% if (component.uploadOnly) { %}
          {{file.originalName || file.name}}
        {% } else { %}
          <a href="{{file.url}}" target="_blank" ref="fileLink">{{file.originalName || file.name}}</a>
        {% } %}
      </div>
      <div class="three wide column">{{fileSize(file.size)}}</div>
    </div>
  </li>
  {% }) %}
</div>
{% } else { %}
<div>
  {% files.forEach(function(file) { %}
  <div>
    <span>
      <img ref="fileImage" src="" alt="{{file.originalName || file.name}}" style="width:{{component.imageSize}}px" />
      {% if (!disabled) { %}
      <i class="{{iconClass('remove')}}" ref="removeLink"></i>
      {% } %}
    </span>
  </div>
  {% }) %}
</div>
{% } %}
{% if (!disabled && (component.multiple || !files.length)) { %}
<input type="file" style="opacity: 0; position: absolute;" tabindex="-1" ref="hiddenFileInputElement">
{% if (self.useWebViewCamera) { %}
<div class="fileSelector">
  <button class="btn btn-primary" ref="galleryButton"><i class="fa fa-book"></i> Gallery</button>
  <button class="btn btn-primary" ref="cameraButton"><i class="fa fa-camera"></i> Camera</button>
</div>
{% } else if (!self.cameraMode || !component.image) { %}
<div class="fileSelector" ref="fileDrop">
  <i class="{{iconClass('cloud-upload')}}"></i> Drop files to attach, 
    {% if (component.image) { %}
      <a href="#" ref="toggleCameraMode"><i class="fa fa-camera"></i> Use Camera</a>, 
    {% } %}
    or <a href="#" ref="fileBrowse" class="browse">browse</a>
</div>
{% } else { %}
<div>
  <video class="video" autoplay="true" ref="videoPlayer"></video>
  <canvas style="display: none" ref="videoCanvas"></canvas>
</div>
<button class="btn btn-primary" ref="takePictureButton"><i class="fa fa-camera"></i> Take Picture</button>
<button class="btn btn-primary" ref="toggleCameraMode">Switch to file upload</button>
{% } %}
{% } %}
{% statuses.forEach(function(status) { %}
<div class="file {{statuses.status === 'error' ? ' has-error' : ''}}">
  <div class="ui grid">
    <div class="fileName control-label thirteen wide column">{{status.originalName}} <i class="{{iconClass('remove')}}" ref="fileStatusRemove"></i></div>
    <div class="fileSize control-label three wide column">{{fileSize(status.size)}}</div>
  </div>
  <div class="ui grid">
    <div class="thirteen wide column">
      {% if (status.status === 'progress') { %}
      <div class="progress">
        <div class="progress-bar" role="progressbar" aria-valuenow="{{status.progress}}" aria-valuemin="0" aria-valuemax="100" style="width: {{status.progress}}">
          <span class="sr-only">{{status.progress}}% Complete</span>
        </div>
      </div>
      {% } else { %}
      <div class="bg-{{status.status}}">{{status.message}}</div>
      {% } %}
    </div>
  </div>
</div>
{% }) %}
{% if (!component.storage || support.hasWarning) { %}
<div class="alert alert-warning">
  {% if (!component.storage) { %}
    <p>No storage has been set for this field. File uploads are disabled until storage is set up.</p>
  {% } %}
  {% if (!support.filereader) { %}
    <p>File API & FileReader API not supported.</p>
  {% } %}
  {% if (!support.formdata) { %}
    <p>XHR2's FormData is not supported.</p>
  {% } %}
  {% if (!support.progress) { %}
    <p>XHR2's upload progress isn't supported.</p>
  {% } %}
</div>
{% } %}
`,
};
