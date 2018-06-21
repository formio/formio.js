export default {
  form: `
{{element}}
<div 
  class="signature-pad-body" 
  style="width: {{component.width}};height: {{component.height}};padding:0;margin:0;"
  tabindex="{{component.tabindex || 0}}"
  ref="padBody"
>
  
  <a class="btn btn-sm btn-default btn-secondary signature-pad-refresh" ref="refresh">
    <i class="{{iconClass('refresh')}}"></i>
  </a>
  <canvas class="signature-pad-canvas" height="{{component.height}}" ref="canvas"></canvas>
  {% if (required) { %}
  <span class="form-control-feedback field-required-inline text-danger">
    <i class="{{iconClass('asterisk')}}"></i>
  </span>
  {% } %}
  <img style="width: 100%;display: none;" ref="signatureImage">
</div>
{% if (component.footer) { %}
  <div class="signature-pad-footer">
    {{t(component.footer)}}
  </div>
{% } %}
`,
};
