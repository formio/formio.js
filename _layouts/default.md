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
  {% if page.template %}
    <link href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/{{ page.template }}/bootstrap.min.css" rel="stylesheet">
  {% endif %}
  {% if page.template == nil %}
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
  {% endif %}
  <link href="https://unpkg.com/bootstrap-vertical-tabs@1.2.2/bootstrap.vertical-tabs.min.css" rel="stylesheet">
  <link href="{{ site.baseurl }}/dist/formio.full.min.css" rel="stylesheet">
  <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->
  <script src="{{ site.baseurl }}/dist/formio.full.js"></script>
  {% if page.contrib %}
    <script src="{{ site.baseurl }}/dist/formio.contrib.js"></script>
  {% endif %}
</head>
<body>
<a href="https://github.com/formio/formio.js"><img style="position: absolute; top: 0; right: 0; border: 0;z-index:3000;" src="https://camo.githubusercontent.com/e7bbb0521b397edbd5fe43e7f760759336b5e05f/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677265656e5f3030373230302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png"></a>
<nav class="navbar navbar-default navbar-fixed-top">
  <div class="container">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="https://form.io">
        <img height="25px;" style="display: inline;" alt="Form.io" src="https://help.form.io/assets/formio-logo.png"> | JavaScript SDK Library
      </a>
    </div>
    <div id="navbar" class="collapse navbar-collapse">
      <ul class="nav navbar-nav">
        <li {% if page.section == 'home' %}class="active"{% endif %}><a href="{{ site.baseurl }}"><span class="glyphicon glyphicon-home"></span></a></li>
        <li {% if page.section == 'examples' %}class="active"{% endif %}><a href="app/examples"><span class="glyphicon glyphicon-check"></span> Examples</a></li>
        <li><a target="_blank" href="https://github.com/formio/formio.js/wiki"><span class="glyphicon glyphicon-book"></span> Documentation</a></li>
        <li {% if page.section == 'sdk'%}class="active"{% endif %}><a href="app/sdk"><span class="glyphicon glyphicon-list-alt"></span> SDK</a></li>
      </ul>
      <ul class="nav navbar-nav navbar-right" style="padding-top: 10px">
        <li><a class="github-button navbar-link" href="https://github.com/formio/formio.js" data-size="large" data-show-count="true" aria-label="Star formio/formio.js on GitHub">Star</a></li>
        <li><a class="github-button navbar-link" href="https://github.com/formio/formio.js/fork" data-size="large" data-show-count="true" aria-label="Fork formio/formio.js on GitHub">Fork</a></li>
      </ul>
    </div><!--/.nav-collapse -->
  </div>
</nav>
<div class="container" style="margin-top: 60px;">
  {{ content }}
</div>
<script async defer src="https://buttons.github.io/buttons.js"></script>
</body>
</html>
