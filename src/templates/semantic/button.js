export default {
  form: `
<{{input.type}} 
  ref="button" 
  class="ui button {{transform('theme', component.theme)}} {{component.customClass}}" 
  {% for (var attr in input.attr) { %}
  {{attr}}="{{input.attr[attr]}}"
  {% } %}
>
{% if (component.leftIcon) { %}<i class="{{component.leftIcon}}"></i>&nbsp;{% } %}
{{input.content}}
{% if (component.rightIcon) { %}&nbsp;<i class="{{component.rightIcon}}"></i>{% } %}
</{{input.type}}>
`,
};
