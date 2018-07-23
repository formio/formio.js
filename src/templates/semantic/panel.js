export default {
  form: `
<h4 class="ui top attached block header {{component.className}}" ref="header">{{t(component.title)}}</h4>
{% if (!collapsed) { %}
<div class="ui bottom attached segment" ref="{{nestedKey}}">
  {{children}}
</div>
{% } %}
`,
};
