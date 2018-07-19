export default {
  form: `
<div class="ui grid" style="width: 100%">
    {% component.columns.forEach(function(column, index) { %}
    <div class="{{transform('columns', column.width)}} wide column" ref="{{columnKey}}">
      {{columnComponents[index]}}
    </div>
    {% }) %}
</div>
`,
};
