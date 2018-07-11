export default {
  form: `
<ul class="nav nav-tabs">
  {% component.components.forEach(function(tab, index) { %}
  <li class="nav-item{{ currentTab === index ? ' active' : ''}}" role="presentation" ref="{{tabLikey}}">
    <a class="nav-link{{ currentTab === index ? ' active' : ''}}" href="#{{tab.key}}" ref="{{tabLinkKey}}">{{t(tab.label)}}</a>
  </li>
  {% }) %}
</ul>
<div class="tab-content">
  {% component.components.forEach(function(tab, index) { %}
  <div role="tabpanel" class="tab-pane{{ currentTab === index ? ' active' : ''}}" ref="{{tabKey}}"">{{tabComponents[index]}}</div>
  {% }) %}
</div>
`,
};
