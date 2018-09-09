---
layout: default
---
<div class="row">
  <div class="col-2 border-right">
    <ul class="nav nav-pills nav-fill flex-column">
      {% assign sections = site.pages | where: "section",page.section | sort: "weight" %}
      {% for section in sections %}
        <li class="nav-item border">
          <a class="nav-link {% if section.url == page.url %}active{% endif %}" href="{{ site.baseurl }}{{ section.url }}">{{ section.title }}</a>
        </li>
      {% endfor %}
    </ul>
  </div>
  <div class="col-10">
    <h3 class="mt-0">{{ page.title }}</h3>
    {{ content }}
  </div>
</div>
