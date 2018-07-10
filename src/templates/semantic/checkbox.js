export default {
  form: `
<div class="ui checkbox">
  <{{input.type}} 
    ref="input" 
    id="{{id}}"
    {% for (var attr in input.attr) { %}
    {{attr}}="{{input.attr[attr]}}"
    {% } %}
    {% if (checked) { %}checked=true{% } %}
    >
  </{{input.type}}>
  <label class="{{input.labelClass}}" for="{{id}}">
    {{input.content}}
    <span>{{input.label}}</span> 
    {% if (component.tooltip) { %}
      <i ref="tooltip" class="{{iconClass('question-sign')}}"></i>
    {% } %}
  </label>
</div>
`,
};
