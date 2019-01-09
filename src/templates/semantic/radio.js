export default {
  form: `
<div class="fields {{inline ? 'inline' : 'grouped'}}">
  {% values.forEach(function(item) { %}
  <div class="field">
    <div class="ui {{input.attr.type==='radio' ? 'radio' : ''}} checkbox" ref="wrapper">
      <{{input.type}} 
        ref="input" 
        {% for (var attr in input.attr) { %}
        {{attr}}="{{input.attr[attr]}}"
        {% } %}
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
</div>
`,
  html: `
  <div ref="value">
  {% var values = values.filter(function(item) {return value === item.value || (typeof value === 'object' && value.hasOwnProperty(item.value) && value[item.value])}).map(function(item) { return t(item.label)}).join(', ') %}
  {{values}}
  </div>
  `
};
