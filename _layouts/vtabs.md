---
layout: default
---
<div class="row">
  <div class="col-xs-2">
      <ul class="nav nav-tabs tabs-left" id="htabs">
        {% assign sections = site.pages | where: "section",page.section | sort: "weight" %}
        {% for section in sections %}
          <li {% if section.url == page.url %}class="active"{% endif %}><a href="{{ site.baseurl }}{{ section.url }}" data-toggle="tab">{{ section.title }}</a></li>
        {% endfor %}
      </ul>
  </div>
  <div class="col-xs-10">{{ content }}</div>
</div>
