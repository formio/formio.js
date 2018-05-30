export default {
  form: `
<div class="input-group">
  {% values.forEach(function(value) { %}
  <div class="form-check{{inline ? '-inline' : ''}} {{input.attr.type}}{{inline ? '-inline' : ''}}" ref="wrapper">
    <label class="control-label form-check-label" for="{{id}}{{row}}-{{value.value}}">
      <{{input.type}} 
        ref="input" 
        name="{{input.attr.name}}" 
        type="{{input.attr.type}}" 
        class="{{input.attr.class}}" 
        lang="{{input.attr.lang}}" 
        value="{{value.value}}"
        {% if (value === value.value || (Array.isArray(value) && value.contains(value.value))) { %}checked=true{% } %}
        id="{{id}}{{row}}-{{value.value}}" 
      >
      <span>{{t(value.label)}}</span>
    </label>
  </div>
  {% }) %}
</div>
`,
};
