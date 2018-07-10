export default {
  form: `
<div class="builder-component" ref="dragComponent">
  <div class="component-btn-group">
    <div class="ui button mini icon primary icon component-settings-button-edit", ref="editComponent">
      <i class="{{iconClass('cog')}}"></i>
    </div>
    <div class="ui button mini secondary icon component-settings-button-remove" ref="removeComponent">
      <i class="{{iconClass('remove')}}"></i>
    </div>
  </div>
  {{html}}
</div>
`,
};
