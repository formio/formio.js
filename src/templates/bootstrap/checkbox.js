export default {
  form: `
<div class="form-check">
  <label class="{{input.labelClass}} form-check-label">
    <{{input.type}} 
      ref="input" 
      {% for (var attr in input.attr) { %}
      {{attr}}="{{input.attr[attr]}}"
      {% } %}
      {% if (checked) { %}checked=true{% } %}
      >
    {% if (!self.labelIsHidden()) { %}<span>{{input.label}}</span>{% } %}
    {% if (component.tooltip) { %}
      <i ref="tooltip" class="{{iconClass('question-sign')}} text-muted"></i>
    {% } %}
    {{input.content}}
    </{{input.type}}>
  </label>
</div>
`,
};
