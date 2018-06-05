export default {
  form: `
<div class="grouped fields">
{% if (!label.hidden && label.labelPosition !== 'bottom') { %}
  <label 
    class="{{label.className}}" 
    style="{{label.style}}"
  >
    {{t(component.label)}}
    {% if (component.tooltip) { %} <i ref="tooltip" class="{{label.tooltipClass}}"></i>{% } %}
  </label>
{% } %}
{{element}}
{% if (!label.hidden && label.labelPosition === 'bottom') { %}
  <label class="{{label.className}}" style="{{label.style}}">{{t(component.label)}}
  {% if (component.tooltip) { %}
    <i class="{{label.tooltipClass}}"></i>
  {% } %}
  </label>
{% } %}
{% if (component.description) { %}
  <div class="help-block">{{t(component.description)}}</div>
{% } %}
</div>
`,
};
