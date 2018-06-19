export default {
  form: `
<{{tag}} ref="html"
  {% for (var attr in attrs) { %}
  {{attr}}="{{attrs[attr]}}"
  {% } %}
>{{content}}</{{tag}}>
`,
};
