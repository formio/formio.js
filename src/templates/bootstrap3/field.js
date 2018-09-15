export default {
  form: `
{% if (!label.hidden && label.labelPosition !== 'bottom') { %}
  <label class="control-label {{label.className}}">
    {% if (!label.hidden) { %}
      {{ t(component.label) }}
      {% if (component.tooltip) { %} 
        <i ref="tooltip" class="{{iconClass('question-sign')}} text-muted" data-title="{{component.tooltip}}"></i>
      {% } %}
    {% } %}
  </label>
{% } %}
{{element}}
{% if (!label.hidden && label.labelPosition === 'bottom') { %}
  <label class="control-label {{label.className}}">
  {{t(component.label)}}
  {% if (component.tooltip) { %}
    <i class="{{iconClass('question-sign')}} text-muted"></i>
  {% } %}
  </label>
{% } %}
{% if (component.description) { %}
  <div class="help-block">{{t(component.description)}}</div>
{% } %}
`,
};
