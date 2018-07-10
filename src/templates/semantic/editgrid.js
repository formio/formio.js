export default {
  form: `
<label class="control-label" style="">{{t(component.label)}}</label>
<div class="editgrid-listgroup ui celled list">
  {% if (header) { %}
  <div class="item list-group-header">
    {{header}}
  </div>
  {% } %}
  {% rows.forEach(function(row, rowIndex) { %}
  <div class="item" ref="{{editgridKey}}">
    {{row}}
    {% if (openRows[rowIndex]) { %}
    <div class="editgrid-actions">
      <button class="ui button primary" ref="{{editgridKey}}-saveRow">{{t(component.saveRow || 'Save')}}</button> 
      {% if (component.removeRow) { %}
      <button class="ui button secondary" ref="{{editgridKey}}-cancelRow">{{t(component.removeRow || 'Cancel')}}</button>
      {% } %}
    </div>
    {% } %}
    <div class="has-error"></div>
  </div>
  {% }) %}
  {% if (footer) { %}
  <div class="item list-group-footer">
    {{footer}}
  </div>
  {% } %}
</div>
<button class="ui button primary" ref="{{editgridKey}}-addRow">
  <i class="{{iconClass('plus')}}"></i> {{t(component.addAnother || 'Add Another')}}
</button>

`,
};
