export default {
  form: `
<div class="panel panel-{{component.theme}}">
  <div class="panel-heading">
    <h4 class="mb-0 panel-title" ref="header">{{t(component.title)}}</h4>
  </div>
  {% if (!collapsed) { %}
  <div class="panel-body" ref="{{panelKey}}">
    {{children}}
  </div>
  {% } %}
</div>
`,
};
