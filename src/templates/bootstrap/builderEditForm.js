export default {
  form: `
<div class="row">
  <div class="col col-sm-6">
    <p class="lead">{{componentInfo.title}} {{t('Component')}}</p>
  </div>
  <div class="col col-sm-6">
    <div class="pull-right" style="margin-right: 20px; margin-top: 10px">
      <a href="{{componentInfo.documentation}}" target="_blank">
        <i class="glyphicon glyphicon-new-window"> {{t('Help')}}</i>
      </a>
    </div>
  </div>
</div>
<div class="row">
  <div class="col col-sm-6">
    <div ref="editForm">
        {{editForm}}
    </div>
  </div>
  <div class="col col-sm-6">
    <div class="card panel panel-default preview-panel">
      <div class="card-header panel-heading">
        <h3 class="card-title panel-title">{{t('Preview')}}</h3>
      </div>
      <div class="card-body panel-body">
        <div class="component-preview" ref="preview">
          {{preview}}
        </div>
      </div>
    </div>
    <div style="margin-top: 10px;">
      <button class="btn btn-success" style="margin-right: 10px;">{{t('Save')}}</button>
      <button class="btn btn-default" style="margin-right: 10px;">{{t('Cancel')}}</button>
      <button class="btn btn-danger">{{t('Remove')}}</button>
    </div>
  </div>
</div>
`,
};
