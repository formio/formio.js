export default {
  form: `
{% component.columns.forEach(function(column, index) { %}
<div class="col col-sm-{{column.width}}" ref="column">
  {{columnComponents[index]}}
</div>
{% }) %}
`,
};
