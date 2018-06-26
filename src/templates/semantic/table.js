export default {
  form: `
<table class="ui table 
    {{ component.striped ? 'striped' : ''}}
    {{ component.bordered ? 'celled' : ''}}
    {{ component.hover ? 'selectable' : ''}}
    {{ component.condensed ? 'compact' : 'padded'}}
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
