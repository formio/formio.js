export default {
  form: `
{% if (component.prefix || component.suffix) { %}
<div class="input-group">
{% } %}
{% if (component.prefix) { %}
<div class="input-group-addon">{{component.prefix}}</div>
{% } %}
<{{input.type}} 
  ref="{{input.ref ? input.ref : 'input'}}" 
  {% for (var attr in input.attr) { %}
  {{attr}}="{{input.attr[attr]}}"
  {% } %}
>{{input.content}}</{{input.type}}>
{% if (hasWordCount()) { %}
<span class="text-muted pull-right">{{ remainingWords }} words remaining.</span>
{% } %}
{% if (component.suffix) { %}
<div class="input-group-addon">{{component.suffix}}</div>
{% } %}
{% if (component.prefix || component.suffix) { %}
</div>
{% } %}
`,
};
