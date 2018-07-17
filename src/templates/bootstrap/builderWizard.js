export default {
  form: `
<div class="formio builder row formbuilder">
  <div class="col-xs-4 col-sm-3 col-md-2 formcomponents">
    {{sidebar}}
  </div>
  <div class="col-xs-8 col-sm-9 col-md-10 formarea">
    <ol class="breadcrumb">
      {% pages.forEach(function(page) { %}
      <li>
        <a title="{{page.title}}" class="label label-primary" ref="gotoPage">{{page.title}}</a>
      </li>
      {% }) %}
      <li>
        <a title="{{t('Create Page')}}" class="label label-success" ref="addPage">
          <i class="{{iconClass('plus')}}"></i> {{t('Page')}}
        </a>
      </li>
    </ol>
    <div ref="form">
      {{form}}
    </div>
  </div>
</div>
`,
};
