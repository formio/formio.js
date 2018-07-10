export default {
  form: `
<div class="ui grid">
  <div class="eight wide column">
    <h3 class="lead">{{componentInfo.title}} {{t('Component')}}</h3>
  </div>
  <div class="eight wide column">
    <div class="right floated" style="margin-right: 20px; margin-top: 10px">
      <a href="{{componentInfo.documentation}}" target="_blank">
        <i class="{{iconClass('new-window')}}"> {{t('Help')}}</i>
      </a>
    </div>
  </div>
</div>
<div class="ui grid">
  <div class="eight wide column">
    <div ref="editForm">
        {{editForm}}
    </div>
  </div>
  <div class="eight wide column">
    <div class="ui top attached block header">
      {{t('Preview')}}
    </div>
    <div class="ui bottom attached segment" ref="preview">
      {{preview}}
    </div>
    <div style="margin-top: 10px;">
      <button class="ui button primary" style="margin-right: 10px;" ref="saveButton">{{t('Save')}}</button>
      <button class="ui button default" style="margin-right: 10px;" ref="cancelButton">{{t('Cancel')}}</button>
      <button class="ui button negative" ref="removeButton">{{t('Remove')}}</button>
    </div>
  </div>
</div> 
`,
};
