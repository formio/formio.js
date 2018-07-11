export default {
  form: `
<div class="builder-component" ref="dragComponent">
  <div class="component-btn-group">
    <div class="btn btn-xxs btn-danger component-settings-button component-settings-button-remove" ref="removeComponent">
      <i class="{{iconClass('remove')}}"></i>
    </div>
    <div class="btn btn-xxs btn-secondary component-settings-button component-settings-button-edit", ref="editComponent">
      <i class="{{iconClass('cog')}}"></i>
    </div>
  </div>
  {{html}}
</div>
`,
};
