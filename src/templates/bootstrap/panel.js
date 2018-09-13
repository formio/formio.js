export default {
  form: `
<div class="mb-2 card border">
  <div class="card-header {{transform('class', 'bg-' + component.theme)}}">
    <span class="mb-0 card-title" ref="header">{{t(component.title)}}</span>
  </div>
  {% if (!collapsed) { %}
  <div class="card-body" ref="{{nestedKey}}">
    {{children}}
  </div>
  {% } %}
</div>
`,
};
