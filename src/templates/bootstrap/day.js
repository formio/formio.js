export default {
  form: `
<div class="input-group row" style="width: 100%">
  {% if (dayFirst && showDay) { %}
  <div class="form-group col col-xs-3">
    <label for="{{component.key}}-day" class="">{{t('Day')}}</label>
    <div>{{day}}</div>
  </div>
  {% } %}
  {% if (showMonth) { %}
  <div class="form-group col col-xs-4">
    <label for="{{component.key}}-month" class="">{{t('Month')}}</label>
    <div>{{month}}</div>
  </div>
  {% } %}
  {% if (!dayFirst && showDay) { %}
  <div class="form-group col col-xs-3">
    <label for="{{component.key}}-day" class="">{{t('Day')}}</label>
    <div>{{day}}</div>
  </div>
  {% } %}
  {% if (showYear) { %}
  <div class="form-group col col-xs-5">
    <label for="{{component.key}}-year" class="">{{t('Year')}}</label>
    <div>{{year}}</div>
  </div>
  {% } %}
</div>
<input name="data[day]" type="hidden" class="form-control" lang="en" value="" ref="input">
`,
};
