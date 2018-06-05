export default {
  form: `
{% values.forEach(function(item) { %}
<div class="field">
  <div class="ui {{input.attr.type==='radio' ? 'radio' : ''}} checkbox {{inline ? 'inline' : ''}}" ref="wrapper">
    <{{input.type}} 
      ref="input" 
      name="{{input.attr.name}}" 
      type="{{input.attr.type}}" 
      class="{{input.attr.class}}" 
      lang="{{input.attr.lang}}" 
      value="{{item.value}}"
      {% if (value === item.value || (typeof value === 'object' && value.hasOwnProperty(item.value) && value[item.value])) { %}
        checked=true
      {% } %}
      id="{{id}}{{row}}-{{item.value}}" 
    >
    <label class="" for="{{id}}{{row}}-{{item.value}}">
      <span>{{t(item.label)}}</span>
    </label>
  </div>
</div>
{% }) %}
`,
};
