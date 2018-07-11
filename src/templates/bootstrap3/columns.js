export default {
  form: `
{% component.columns.forEach(function(column, index) { %}
<div class="col 
    col-sm-{{column.width}}
    col-sm-offset-{{column.offset}}
    col-sm-push-{{column.push}}
    col-sm-pull-{{column.pull}}
  " ref="{{columnKey}}">
  {{columnComponents[index]}}
</div>
{% }) %}
`,
};
