export default {
  form: `
<div id="{{id}}" class="{{classes}}"{% if (styles) { %} styles="{{styles}}"{% } %}>
  {{children}}
  <div ref="errorContainer"></div>
</div>
`,
};
