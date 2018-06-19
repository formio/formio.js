export default {
  form: `
<div id="{{id}}" class="card border-{{bootstrap4Theme(component.theme)}} panel panel-{{component.theme}} formio-component formio-component-panel">
  <div class="card-header panel-heading">
    <h4 class="mb-0 card-title panel-title">{{t(component.title)}}</h4>
  </div>
  <div class="card-body panel-body" ref="panel-{{id}}">
    {{children}}
  </div>
</div>
`,
};
