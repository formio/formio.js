export default {
  form: `
<div class="formio builder row formbuilder">
  <div class="col-xs-4 col-sm-3 col-md-2 formcomponents">
    {{sidebar}}
  </div>
  <div class="col-xs-8 col-sm-9 col-md-10 formarea">
    <ol class="breadcrumb">
      {% pages.forEach(function(page, pageIndex) { %}
      <li>
        <span title="{{page.title}}" class="mr-2 badge {% if (pageIndex === self.currentPage) { %}badge-primary{% } else { %}badge-info{% } %} wizard-page-label" ref="gotoPage">{{page.title}}</span>
      </li>
      {% }) %}
      <li>
        <span title="{{t('Create Page')}}" class="mr-2 badge badge-success wizard-page-label" ref="addPage">
          <i class="{{iconClass('plus')}}"></i> {{t('Page')}}
        </span>
      </li>
    </ol>
    <div ref="form">
      {{form}}
    </div>
  </div>
</div>
`,
};
