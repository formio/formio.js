export default {
  form: `
{% if (!label.hidden && label.labelPosition !== 'bottom') { %}
  <label 
    class="{{label.className}}" 
    style="{{label.style}}"
  >
    {{component.label}}
    {% if (component.tooltip) { %} <i class="{{label.tooltipClass}}"></i>{% } %}
  </label>
{% } %}
{{element}}
{% if (!label.hidden && label.labelPosition === 'bottom') { %}
  <label class="{{label.className}}" style="{{label.style}}">{{component.label}}
  {% if (component.tooltip) { %}
    <i class="{{label.tooltipClass}}"></i>
  {% } %}
  </label>
{% } %}
{% if (component.description) { %}
  <div class="help-block">{{component.description}}</div>
{% } %}
`,
};
