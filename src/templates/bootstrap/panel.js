export default {
  form: `
<div class="card border-{{bootstrap4Theme(component.theme)}} panel panel-{{component.theme}}">
  <div class="card-header panel-heading">
    <h4 class="mb-0 card-title panel-title" ref="header">{{t(component.title)}}</h4>
  </div>
  {% if (!collapsed) { %}
  <div class="card-body panel-body" ref="panel-{{id}}">
    {{children}}
  </div>
  {% } %}
</div>
`,
};
