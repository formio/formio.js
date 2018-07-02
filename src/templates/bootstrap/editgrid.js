export default {
  form: `
<label class="control-label" style="">{{t(component.label)}}</label>
<ul class="editgrid-listgroup list-group 
    {{ component.striped ? 'table-striped' : ''}}
    {{ component.bordered ? 'table-bordered' : ''}}
    {{ component.hover ? 'table-hover' : ''}}
    {{ component.condensed ? 'table-condensed' : ''}} 
    ">
  {% if (header) { %}
  <li class="list-group-item list-group-header">
    {{header}}
  </li>
  {% } %}
  {% rows.forEach(function(row, rowIndex) { %}
  <li class="list-group-item" ref="{{editgridKey}}">
    {{row}}
    {% if (openRows[rowIndex]) { %}
    <div class="editgrid-actions">
      <button class="btn btn-primary" ref="{{editgridKey}}-saveRow">{{t(component.saveRow || 'Save')}}</button> 
      {% if (component.removeRow) { %}
      <button class="btn btn-danger" ref="{{editgridKey}}-cancelRow">{{t(component.removeRow || 'Cancel')}}</button>
      {% } %}
    </div>
    {% } %}
    <div class="has-error"></div>
  </li>
  {% }) %}
  {% if (footer) { %}
  <li class="list-group-item list-group-footer">
    {{footer}}
  </li>
  {% } %}
</ul>
<button class="btn btn-primary" ref="{{editgridKey}}-addRow">
  <i class="glyphicon glyphicon-plus"></i> {{t(component.addAnother || 'Add Another')}}
</button>

`,
};
