export default {
  form: `
{% values.forEach(function(value) { %}
<div class="field">
  <div class="ui {{input.attr.type==='radio' ? 'radio' : ''}} checkbox {{inline ? 'inline' : ''}}" ref="wrapper">
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
    <label class="" for="{{id}}{{row}}-{{value.value}}">
      <span>{{t(value.label)}}</span>
    </label>
  </div>
</div>
{% }) %}
`,
};
