export default {
  form: `
<div class="panel panel-{{component.theme}}">
  <div class="panel-heading">
    <h4 class="mb-0 panel-title" ref="header">
      {% if (component.collapsible) { %}
        <i class="formio-collapse-icon {{iconClass(collapsed ? 'triangle-right' : 'triangle-bottom')}} text-muted" data-title="Collapse Panel"></i>
      {% } %}
      {{t(component.title)}}
      {% if (component.tooltip) { %}
        <i ref="tooltip" class="{{iconClass('question-sign')}} text-muted"></i>
      {% } %}
    </h4>
  </div>
  {% if (!collapsed || (options.attachMode === 'builder')) { %}
  <div class="panel-body" ref="{{nestedKey}}">
    {{children}}
  </div>
  {% } %}
</div>
`,
};
