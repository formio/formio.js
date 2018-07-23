export default {
  form: `
<div class="card {{transform('class', 'border-' + component.theme)}}">
  <div class="card-header">
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
