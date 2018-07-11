export default {
  form: `
<div class="card {{transform('class', 'border-' + component.theme)}}">
  <div class="card-header">
    <h4 class="mb-0 card-title" ref="header">{{t(component.title)}}</h4>
  </div>
  {% if (!collapsed) { %}
  <div class="card-body" ref="{{panelKey}}">
    {{children}}
  </div>
  {% } %}
</div>
`,
};
