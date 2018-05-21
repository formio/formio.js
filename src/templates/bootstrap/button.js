export default {
  form: `
<{{input.type}} 
  ref="button" 
  name="{{input.attr.name}}" 
  type="{{input.attr.type}}" 
  class="{{input.attr.class}}" 
  lang="{{input.attr.lang}}" 
  {% if (input.attr.placeholder) { %}placeholder="{{input.attr.placeholder}}"{% } %}
  {% if (input.attr.tabindex) { %}tabindex="{{input.attr.tabindex}}"{% } %}
>
{% if (component.leftIcon) { %}<span class="{{component.leftIcon}}"></span>&nbsp;{% } %}
{{input.content}}
{% if (component.rightIcon) { %}&nbsp;<span class="{{component.rightIcon}}"></span>{% } %}
</{{input.type}}>
`,
};
