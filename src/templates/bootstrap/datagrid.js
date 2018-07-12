export default {
  form: `
<label class="col-form-label" style="">{{t(component.label)}}</label>
<table class="table datagrid-table 
    {{ component.striped ? 'table-striped' : ''}}
    {{ component.bordered ? 'table-bordered' : ''}}
    {{ component.hover ? 'table-hover' : ''}}
    {{ component.condensed ? 'table-sm' : ''}} 
    ">
  {% if (hasHeader) { %}
  <thead>
    <tr>
      {% component.components.forEach(function(col) { %}
      {% if (visibleColumns[col.key]) { %}
      <th class="{{col.validate && col.validate.required ? 'field-required' : ''}}">
        {{ col.hideLabel ? '' : t(col.label || col.title) }}
        {% if (col.tooltip) { %} <i ref="tooltip-{{col.key}}" class="{{iconClass('question-sign')}} text-muted"></i>{% } %}
      </th>
      {% } %}
      {% }) %}
      {% if (hasExtraColumn) { %}
      <th>
        {% if (!builder && hasAddButton && hasTopSubmit) { %}
        <button class="btn btn-primary" ref="{{datagridKey}}-addRow">
          <i class="{{iconClass('plus')}}"></i> Add Another
        </button>
        {% } %}
      </th>
      {% } %}
    </tr>
  </thead>
  {% } %}
  <tbody>
    {% rows.forEach(function(row) { %}
    <tr>
      {% component.components.forEach(function(col) { %}
      {% if (visibleColumns[col.key]) { %}
      <td ref="{{datagridKey}}">
        {{row[col.key]}}
      </td>
      {% } %}
      {% }) %}
      {% if (hasExtraColumn) { %}
        <td>
        {% if (!builder && hasRemoveButtons) { %}
          <button type="button" class="btn btn-secondary" ref="{{datagridKey}}-removeRow">
            <i class="{{iconClass('remove-circle')}}"></i>
          </button>
        {% } %}
        {% if (builder) { %}
          {{placeholder}}
        {% } %}
        </td>
      {% } %}
    </tr>
    {% }) %}
  </tbody>
  {% if (!builder && hasAddButton && hasBottomSubmit) { %}
  <tfoot>
    <tr>
      <td colspan="{{numColumns}}">
        <button class="btn btn-primary" ref="{{datagridKey}}-addRow">
          <i class="{{iconClass('plus')}}"></i> {{t(component.addAnother || 'Add Another')}}
        </button>
      </td>
    </tr>
  </tfoot>
  {% } %}
</table>
`,
};
