export default {
  form: `
<label class="control-label" style="">{{t(component.label)}}</label>
<table class="ui table datagrid-table 
    {{ component.striped ? 'striped' : ''}}
    {{ component.bordered ? 'celled' : ''}}
    {{ component.hover ? 'selectable' : ''}}
    {{ component.condensed ? 'compact' : 'padded'}}
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
        {% if (hasAddButton && hasTopSubmit) { %}
        <button class="ui button primary" ref="{{datagridKey}}-addRow">
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
      {% if (hasExtraColumn && hasRemoveButtons) { %}
      <td>
        <button type="button" class="ui icon button secondary" ref="{{datagridKey}}-removeRow">
          <i class="{{iconClass('remove-circle')}}"></i>
        </button>
      </td>
      {% } %}
    </tr>
    {% }) %}
  </tbody>
  {% if (hasAddButton && hasBottomSubmit) { %}
  <tfoot>
    <tr>
      <td colspan="{{numColumns}}">
        <button class="ui button primary" ref="{{datagridKey}}-addRow">
          <i class="{{iconClass('plus')}}"></i> {{t(component.addAnother || 'Add Another')}}
        </button>
      </td>
    </tr>
  </tfoot>
  {% } %}
</table>
`,
};
