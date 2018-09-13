export default {
  form: `
<div class="builder-component" ref="dragComponent">
  <div class="component-btn-group">
    <div class="ui button mini icon primary component-settings-button-edit", ref="editComponent">
      <i class="{{iconClass('cog')}}"></i>
    </div>
    <div class="ui button mini icon component-settings-button-copy" ref="copyComponent">
      <i class="{{iconClass('copy')}}"></i>
    </div>
    <div class="ui button mini icon component-settings-button-paste" ref="pasteComponent">
      <i class="{{iconClass('save')}}"></i>
    </div>
    <div class="ui button mini icon secondary component-settings-button-remove" ref="removeComponent">
      <i class="{{iconClass('remove')}}"></i>
    </div>
  </div>
  {{html}}
</div>
`,
};
