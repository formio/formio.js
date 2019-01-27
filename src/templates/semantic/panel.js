export default {
  form: `
<h4 class="ui top attached block header {{component.className}}" ref="header">
  {% if (component.collapsible) { %}
    <i class="formio-collapse-icon {{iconClass(collapsed ? 'triangle-right' : 'triangle-bottom')}} text-muted" data-title="Collapse Panel"></i>
  {% } %}
  {{t(component.title)}}
  {% if (component.tooltip) { %}
    <i ref="tooltip" class="{{iconClass('question-sign')}} text-muted"></i>
  {% } %}
</h4>
{% if (!collapsed || (options.attachMode === 'builder')) { %}
<div class="ui bottom attached segment" ref="{{nestedKey}}">
  {{children}}
</div>
{% } %}
`,
};
