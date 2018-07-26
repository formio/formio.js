export default {
  form: `
<div>
  {% values.forEach(function(item) { %}
  <div class="form-check{{inline ? '-inline' : ''}}" ref="wrapper">
    <label class="form-check-label" for="{{id}}{{row}}-{{item.value}}">
      <{{input.type}} 
        ref="input" 
        {% for (var attr in input.attr) { %}
        {{attr}}="{{input.attr[attr]}}"
        {% } %}
        value="{{item.value}}"
        {% if (value && (value === item.value || (typeof value === 'object' && value.hasOwnProperty(item.value) && value[item.value]))) { %}
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
};
