export default {
  form: `
<{{tag}} class="{{ component.className }}" ref="html"
  {% attrs.forEach(function(attr) { %}
    {{attr.attr}}="{{attr.value}}"
  {% }) %}
>{{content}}</{{tag}}>
`,
};
