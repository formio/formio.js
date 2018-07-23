export default {
  form: `
<{{tag}} ref="html"
  {% attrs.forEach(function(attr) { %}
    {{attr.attr}}="{{attr.value}}"
  {% }) %}
>{{content}}</{{tag}}>
`,
};
