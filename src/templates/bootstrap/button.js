export default {
  form: `
<{{input.type}} 
  ref="button" 
  {% for (var attr in input.attr) { %}
  {{attr}}="{{input.attr[attr]}}"
  {% } %}
>
{% if (component.leftIcon) { %}<span class="{{component.leftIcon}}"></span>&nbsp;{% } %}
{{input.content}}
{% if (component.rightIcon) { %}&nbsp;<span class="{{component.rightIcon}}"></span>{% } %}
</{{input.type}}>
<div ref="buttonMessageContainer">
  <span class="help-block" ref="buttonMessage"></span>
</div>
`,
  html: ' '
};
