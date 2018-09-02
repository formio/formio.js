export default {
  form: `
<div id="builder-sidebar-{{id}}" class="accordion panel-group" ref="sidebar">
  {% groupOrder.forEach(function(groupKey, index) { %}
  <div class="card form-builder-panel" ref="group-panel-{{groupKey}}">
    <div class="card-header form-builder-group-header">
      <h5 class="mb-0">
        <button class="btn btn-block btn-default builder-group-button" data-toggle="collapse" data-parent="#builder-sidebar-{{id}}" data-target="#group-{{groupKey}}" ref="sidebar-anchor">{{groups[groupKey].title}}</button>
      </h5>
    </div>
    <div class="panel-collapse collapse {{groups[groupKey].default ? ' show' : ''}}" data-default="{{groups[groupKey].default}}" id="group-{{groupKey}}" ref="sidebar-group">
      <div id="group-container-{{groupKey}}" class="card-body no-drop p-2" ref="sidebar-container">
        {% groups[groupKey].componentOrder.forEach(function(componentKey) { %}
        <span data-type="{{componentKey}}" class="btn btn-primary btn-sm btn-block formcomponent drag-copy">
          <i class="{{iconClass(groups[groupKey].components[componentKey].icon)}}" style="margin-right: 5px;"></i>
          {{groups[groupKey].components[componentKey].title}}
        </span>
        {% }) %}
      </div>
      {% if (groups[groupKey].groups) { %}
        {% for (var subgroupKey in groups[groupKey].groups) { %}
          <div class="card form-builder-panel" ref="group-panel-{{subgroupKey}}">
            <div class="card-header panel-heading form-builder-group-header">
              <h5 class="mb-0">
                <button class="btn btn-block builder-group-button" data-toggle="collapse" data-parent="#builder-sidebar-{{id}}" data-target="#group-{{subgroupKey}}" ref="sidebar-anchor">{{groups[groupKey].groups[subgroupKey].title}}</button>
              </h5>
            </div>
            <div class="panel-collapse collapse {{groups[groupKey].groups[subgroupKey].default ? ' show' : ''}}" id="group-{{subgroupKey}}" ref="sidebar-group">
              <div id="group-container-{{subgroupKey}}" class="card-body no-drop p-2" ref="sidebar-container">
                {% groups[groupKey].groups[subgroupKey].componentOrder.forEach(function(componentKey) { %}
                <span data-type="{{componentKey}}" class="btn btn-primary btn-sm btn-block formcomponent drag-copy">
                  <i class="{{groups[groupKey].groups[subgroupKey].components[componentKey].icon}}" style="margin-right: 5px;"></i>
                  {{groups[groupKey].groups[subgroupKey].components[componentKey].title}}
                </span>
                {% }) %}
              </div>
            </div>
          </div>
        {% } %}
      {% } %}
    </div>
  </div>
  {% }) %}
</div>
`,
};
