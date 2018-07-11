export default {
  form: `
<table class="table 
    {{ component.striped ? 'table-striped' : ''}}
    {{ component.bordered ? 'table-bordered' : ''}}
    {{ component.hover ? 'table-hover' : ''}}
    {{ component.condensed ? 'table-condensed' : ''}}
  ">
  {% if (component.header && component.header.length > 0) { %}
  <thead>
    <tr>
      {% component.header.forEach(function(header) { %}
      <th>{{t(header)}}</th>
      {% }) %}
    </tr>
  </thead>
  {% } %}
  <tbody>
    {% tableComponents.forEach(function(row, rowIndex) { %}
    <tr ref="row-{{id}}">
      {% row.forEach(function(column, colIndex) { %}    
      <td ref="{{columnKey}}">{{column}}</td>
      {% }) %}
    </tr>
    {% }) %}
  </tbody>
</table>
`,
};
