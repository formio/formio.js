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
    {% if (!self.labelIsHidden()) { %}<span>{{input.label}}</span>{% } %}
    {% if (component.tooltip) { %}
      <i ref="tooltip" class="{{iconClass('question-sign')}}"></i>
    {% } %}
  </label>
</div>
`,
  html: `
<label class="{{input.labelClass}}">
    {{input.content}}
    {% if (!self.labelIsHidden()) { %}<span>{{input.label}}</span>{% } %}
</label>
<div ref="value">{% if (checked) { %}True{% } else { %}False{% } %}</div>
`
};
