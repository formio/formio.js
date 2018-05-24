export default {
  form: `
<label class="{{input.labelClass}}">
  <{{input.type}} 
    ref="input" 
    name="{{input.attr.name}}" 
    type="{{input.attr.type}}" 
    class="{{input.attr.class}}" 
    lang="{{input.attr.lang}}" 
    {% if (input.attr.placeholder) { %}placeholder="{{input.attr.placeholder}}"{% } %}
    {% if (input.attr.tabindex) { %}tabindex="{{input.attr.tabindex}}"{% } %}
    >
  <span>{{input.label}}</span> {% if (input.tooltip) { %}}<i ref="tooltip" class="glyphicon glyphicon-question-sign text-muted"></i>{% } %}
</label>
{{input.content}}
</{{input.type}}>
`,
};
