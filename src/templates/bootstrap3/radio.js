export default {
  form: `
<div class="input-group">
  {% values.forEach(function(item) { %}
  <div class="{{input.attr.type}}{{inline ? '-inline' : ''}}" ref="wrapper">
    <label class="control-label form-check-label" for="{{id}}{{row}}-{{item.value}}">
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
      <span>{{t(item.label)}}</span>
    </label>
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
