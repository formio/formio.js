<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-58453303-6"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
  
    gtag('config', 'UA-58453303-6');
  </script>

  <base href="{{ site.baseurl }}/"></base>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>JavaScript Powered Forms and Form.io SDK</title>
  <link href="{{ site.baseurl }}/app/syntax.css" rel="stylesheet">
  <link href="{{ site.baseurl }}/app/main.css" rel="stylesheet">
  <link href="{{ site.baseurl }}/app/fontawesome/css/font-awesome.min.css" rel="stylesheet">
  {% if page.template %}
    <link href="https://bootswatch.com/4/{{ page.template }}/bootstrap.min.css" rel="stylesheet">
  {% endif %}
  {% if page.template == nil %}
    <link href="https://bootswatch.com/4/cosmo/bootstrap.min.css" rel="stylesheet">
  {% endif %}
  <link href="{{ site.baseurl }}/dist/formio.full.min.css" rel="stylesheet">
  <script src="https://cdn.form.io/ace/ace.js"></script>
  <script src="{{ site.baseurl }}/app/jquery/jquery.slim.min.js"></script>
  <script src="{{ site.baseurl }}/app/bootstrap/js/bootstrap.min.js"></script>
  <script src="{{ site.baseurl }}/dist/formio.full.js"></script>
  {% if page.contrib %}
    <script src="{{ site.baseurl }}/dist/formio.contrib.min.js"></script>
  {% endif %}
  <script type="text/javascript">Formio.icons = 'fontawesome';</script>
</head>
<body>
<a href="https://github.com/formio/formio.js"><img style="position: absolute; top: 0; right: 0; border: 0;z-index:3000;" src="https://camo.githubusercontent.com/e7bbb0521b397edbd5fe43e7f760759336b5e05f/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677265656e5f3030373230302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png"></a>
<nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
  <div class="container">
    <a class="navbar-brand" href="#">
      <img height="25px;" style="display: inline;" alt="Form.io" src="https://help.form.io/assets/formio-logo.png"> | JavaScript SDK Library
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <ul class="navbar-nav nav-fill mr-auto">
        <li class="nav-item {% if page.section == 'home' %}active bg-white border{% endif %}"><a class="nav-link" href="{{ site.baseurl }}"><i class="fa fa-home"></i></a></li>
        <li class="nav-item {% if page.section == 'builder' %}active bg-white border{% endif %}"><a class="nav-link" href="app/builder"><i class="fa fa-th-list"></i> Form Builder</a></li>
        <li class="nav-item {% if page.section == 'sandbox' %}active bg-white border{% endif %}"><a class="nav-link" href="app/sandbox"><i class="fa fa-cube"></i> Sandbox</a></li>
        <li class="nav-item {% if page.section == 'examples' %}active bg-white border{% endif %}"><a class="nav-link" href="app/examples"><i class="fa fa-check-square-o"></i> Examples</a></li>
        <li class="nav-item"><a class="nav-link" target="_blank" href="https://github.com/formio/formio.js/wiki"><i class="fa fa-book"></i> Documentation</a></li>
        <li class="nav-item {% if page.section == 'sdk'%}active bg-white border{% endif %}"><a class="nav-link" href="app/sdk"><i class="fa fa-list-alt"></i> SDK</a></li>
      </ul>
      <ul class="navbar-nav">
        <li class="nav-item"><a class="github-button nav-link" href="https://github.com/formio/formio.js" data-size="large" data-show-count="true" aria-label="Star formio/formio.js on GitHub">Star</a></li>
        <li class="nav-item"><a class="github-button nav-link" href="https://github.com/formio/formio.js/fork" data-size="large" data-show-count="true" aria-label="Fork formio/formio.js on GitHub">Fork</a></li>
      </ul>
    </div>
  </div>
</nav>
<div class="{% if page.fluid %}container-fluid{% endif %}{% if page.fluid == nil %}container{% endif %}">
  {{ content }}
</div>
<hr />
<div>
  <h4 class="text-center text-muted">powered by <img src="{{ site.baseurl }}/app/logo.png" class="mr-2" style="height: 1.2em;" /></h4>
  <p class="text-center text-muted mb-0" style="font-size: 0.8em">Copyright © Form.io LLC 2019. All rights reserved</p>
</div>
<p class="text-center text-muted mb-0" style="font-size: 0.8em">Renderer v<span id="renderer-version"></span></p>
<script type="text/javascript">
  document.getElementById('renderer-version').innerHTML = Formio.version;
</script>
<script async defer src="https://buttons.github.io/buttons.js"></script>
</body>
</html>
