export default {
  form: `
{% if (!label.hidden && label.labelPosition !== 'bottom') { %}
  <label class="{{label.className}}">
    {{t(component.label)}}
    {% if (component.tooltip) { %} 
      <i ref="tooltip" class="{{iconClass('question-sign')}}"></i>
    {% } %}
  </label>
{% } %}
{{element}}
{% if (!label.hidden && label.labelPosition === 'bottom') { %}
  <label class="{{label.className}}">
  {{t(component.label)}}
  {% if (component.tooltip) { %}
    <i class="{{iconClass('question-sign')}}"></i>
  {% } %}
  </label>
{% } %}
{% if (component.description) { %}
  <div class="help-block">{{t(component.description)}}</div>
{% } %}
`,
};
