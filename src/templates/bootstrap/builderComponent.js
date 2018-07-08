export default {
  form: `
<div class="builder-component" ref="dragComponent">
  <div class="component-btn-group">
    <div class="btn btn-xxs btn-danger component-settings-button component-settings-button-remove" ref="removeComponent">
      <i class="glyphicon glyphicon-remove"></i>
    </div>
    <div class="btn btn-xxs btn-default component-settings-button component-settings-button-edit", ref="editComponent">
      <i class="glyphicon glyphicon-cog"></i>
    </div>
  </div>
  {{html}}
</div>
`,
};
