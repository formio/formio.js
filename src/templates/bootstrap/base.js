export default {
  root: '<div id="{{id}}" class="{{classes}}"{% if (styles) { %} styles="{{styles}}"{% } %}></div>',
  children: 'div'
};
