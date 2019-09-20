---
layout: default
---
<div class="row">
  <div class="col-2">
    <ul class="nav nav-pills nav-fill flex-column border-right border-left border-bottom">
      {% assign sections = site.pages | where: "section",page.section | sort: "weight" %}
      {% for section in sections %}
        {% if section.disabled == nil %}
          <li class="nav-item ml-0">
            <a class="nav-link border-top rounded-0 {% if section.url == page.url %}active{% endif %}" href="{{ site.baseurl }}{{ section.url }}">{{ section.title }}</a>
          </li>
        {% endif %}
      {% endfor %}
    </ul>
  </div>
  <div class="col-10">
    <h3 class="mt-0">{{ page.title }}</h3>
    {{ content }}
  </div>
</div>
