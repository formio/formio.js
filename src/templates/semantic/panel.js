export default {
  form: `
<div id="{{id}}" class="formio-component formio-component-panel">
  <h4 class="ui top attached block header {{component.className}}">{{t(component.title)}}</h4>
  <div class="ui bottom attached segment" ref="panel">
    {{children}}
  </div>
</div>
`,
};
