export default {
  form: `
<div id="{{id}}" class="card card-body bg-faded well formio-component formio-component-well {{className}}">
  <div ref="well-{{id}}">
    {{children}}
  </div>
</div>
`,
};
