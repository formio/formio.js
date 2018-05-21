export default {
  form: `
<div id="{{id}}" class="{{classes}}"{% if (styles) { %} styles="{{styles}}"{% } %} ref="component">
  {{children}}
  <div ref="messageContainer"></div>
</div>
`,
};
