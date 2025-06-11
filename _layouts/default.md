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
  <base href="{{ site.baseurl }}"></base>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>JavaScript Powered Forms and Form.io SDK</title>
  <link rel="apple-touch-icon" sizes="180x180" href="{{ site.baseurl }}app/favicon/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="{{ site.baseurl }}app/favicon/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="{{ site.baseurl }}app/favicon/favicon-16x16.png">
  <link rel="manifest" href="{{ site.baseurl }}app/favicon/site.webmanifest">
  <link href="{{ site.baseurl }}app/syntax.css" rel="stylesheet">
  <link href="{{ site.baseurl }}app/main.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
  {% if page.template %}
    <link href="https://cdn.jsdelivr.net/npm/bootswatch/dist/{{ page.template }}/bootstrap.min.css" rel="stylesheet">
  {% endif %}
  {% if page.template == nil %}
    <link href="https://cdn.jsdelivr.net/npm/bootswatch/dist/spacelab/bootstrap.min.css" rel="stylesheet">
  {% endif %}
  <script src="https://cdn.form.io/ace/ace.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap/dist/js/bootstrap.min.js"></script>
  {% if page.formioFull == nil %}
    {% if page.noFormio == nil %}
      <script src="{{ site.baseurl }}dist/formio.js"></script>
      <script type="text/javascript">
        Formio.config.cdnUrls = {
          js: {
            cdn: '{{ site.baseurl }}dist'
          }
        };
      </script>
    {% endif %}
  {% endif %}
  {% if page.lodash %}
  <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script> 
  {% endif %}
  {% if page.formioFull %}
    <link href="{{ site.baseurl }}dist/formio.full.css" rel="stylesheet">
    <script src="{{ site.baseurl }}dist/formio.full.js"></script>  
  {% endif %}
  {% if page.contrib %}
    <script src="{{ site.baseurl }}dist/formio.contrib.min.js"></script>
  {% endif %}
</head>
<body>
<a href="https://github.com/formio/formio.js"><img style="position: absolute; top: 0; right: 0; border: 0;z-index:3000;" src="https://github.blog/wp-content/uploads/2008/12/forkme_right_green_007200.png?resize=149%2C149" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png"></a>
<nav class="navbar navbar-expand-lg navbar-light bg-light mb-4 p-0">
  <div class="container">
    <a class="navbar-brand p-0" href="#">
      <svg width="150px" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 324 115.2"><defs><style>.cls-1{fill:#373a36;}.cls-2{fill:#69b342;}</style></defs><polygon class="cls-1" points="95.53 37.72 127.07 37.72 127.07 45.67 105.07 45.67 105.07 56.68 125.68 56.68 125.68 64.64 105.07 64.64 105.07 82.62 95.53 82.62 95.53 37.72"/><path class="cls-1" d="M139.14,65.76c0,6.49,2.81,10.34,7.34,10.34s7.15-3.85,7.15-10.28c0-7-2.6-10.39-7.29-10.39-4.35,0-7.2,3.21-7.2,10.33m24-.06c0,10.2-6.14,17.7-16.89,17.7-10.52,0-16.67-7.46-16.67-17.52,0-10.4,6.34-17.75,17.11-17.75,10,0,16.45,7,16.45,17.57"/><path class="cls-1" d="M167,58.06c0-3.35,0-6.33-.07-9.15h9.22c.12.75.24,4.1.24,5.92,1.5-3.85,5.12-6.67,10.89-6.7V57c-6.82-.18-10.89,1.64-10.89,10.88v14.7H167Z"/><path class="cls-1" d="M192.81,57.6c0-2.92,0-5.8-.06-8.69h9c.12.82.31,2.7.36,4a10.6,10.6,0,0,1,9.43-4.8c4.88,0,7.56,2.51,8.76,5.13,2-2.76,4.91-5.13,10.45-5.13,5.92,0,10.76,3.61,10.76,12.38V82.62h-9.17v-21c0-3-1.11-6-4.95-6-4,0-5.56,2.56-5.56,7.73V82.62H212.6V62c0-3.49-.87-6.31-4.88-6.31-3.81,0-5.63,2.33-5.63,8.11V82.62h-9.28Z"/><rect class="cls-1" x="247.55" y="71.18" width="10.09" height="11.44"/><path class="cls-1" d="M263.73,48.91h9.39V82.62h-9.39Zm0-13.83h9.39V43.4h-9.39Z"/><path class="cls-1" d="M289.11,65.76c0,6.49,2.8,10.34,7.33,10.34s7.16-3.85,7.16-10.28c0-7-2.61-10.39-7.29-10.39-4.36,0-7.2,3.21-7.2,10.33m24-.06c0,10.2-6.15,17.7-16.89,17.7-10.53,0-16.67-7.46-16.67-17.52,0-10.4,6.33-17.75,17.11-17.75,10,0,16.45,7,16.45,17.57"/><polygon class="cls-1" points="45.38 65.99 54.91 56.55 46.72 48.42 37.2 57.85 45.38 65.99"/><polygon class="cls-1" points="10.87 57.41 46.43 92.97 54.38 85.01 26.7 57.32 53.92 30.1 46.05 22.23 10.87 57.41"/><polygon class="cls-2" points="59.37 35.48 51.42 43.43 65.73 57.75 51.45 72.03 59.37 80.03 81.63 57.76 81.6 57.73 81.61 57.71 59.37 35.48"/></svg>
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <ul class="navbar-nav nav-fill me-auto">
        <li class="nav-item {% if page.section == 'home' %}active bg-white border{% endif %}"><a class="text-dark nav-link p-3" href="{{ site.baseurl }}"><i class="bi bi-house-fill"></i></a></li>
        <li class="nav-item {% if page.section == 'builder' %}active bg-white border{% endif %}"><a class="text-dark nav-link p-3" href="app/builder.html"><i class="bi bi-menu-button-wide"></i> Form Builder</a></li>
        <li class="nav-item {% if page.section == 'sandbox' %}active bg-white border{% endif %}"><a class="text-dark nav-link p-3" href="app/sandbox.html"><i class="bi bi-box"></i> Sandbox</a></li>
        <li class="nav-item {% if page.section == 'examples' %}active bg-white border{% endif %}"><a class="text-dark nav-link p-3" href="app/examples"><i class="bi bi-check-square"></i> Examples</a></li>
        <li class="nav-item"><a class="text-dark nav-link p-3" target="_blank" href="https://help.form.io/developers/form-renderer"><i class="bi bi-book"></i> Documentation</a></li>
        <li class="nav-item {% if page.section == 'sdk'%}active bg-white border{% endif %}"><a class="text-dark nav-link p-3" href="app/sdk"><i class="bi bi-window"></i> SDK</a></li>
      </ul>
      <ul class="navbar-nav float-end">
        <li class="nav-item"><a class="github-button nav-link" href="https://github.com/formio/formio.js" data-size="large" data-show-count="true" aria-label="Star formio/formio.js on GitHub">Star</a></li>
        <li class="nav-item"><a class="github-button nav-link" href="https://github.com/formio/formio.js/fork" data-size="large" data-show-count="true" aria-label="Fork formio/formio.js on GitHub">Fork</a></li>
      </ul>
    </div>
  </div>
</nav>
<div class="{% if page.fluid %}container-fluid{% endif %}{% if page.fluid == nil %}container{% endif %}">
  {{ content }}
</div>
<div class="container">
  <footer class="py-3 my-4">
    <h4 class="align-center text-center text-muted">powered by <svg width="150px" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 324 115.2"><defs><style>.cls-1{fill:#373a36;}.cls-2{fill:#69b342;}</style></defs><polygon class="cls-1" points="95.53 37.72 127.07 37.72 127.07 45.67 105.07 45.67 105.07 56.68 125.68 56.68 125.68 64.64 105.07 64.64 105.07 82.62 95.53 82.62 95.53 37.72"/><path class="cls-1" d="M139.14,65.76c0,6.49,2.81,10.34,7.34,10.34s7.15-3.85,7.15-10.28c0-7-2.6-10.39-7.29-10.39-4.35,0-7.2,3.21-7.2,10.33m24-.06c0,10.2-6.14,17.7-16.89,17.7-10.52,0-16.67-7.46-16.67-17.52,0-10.4,6.34-17.75,17.11-17.75,10,0,16.45,7,16.45,17.57"/><path class="cls-1" d="M167,58.06c0-3.35,0-6.33-.07-9.15h9.22c.12.75.24,4.1.24,5.92,1.5-3.85,5.12-6.67,10.89-6.7V57c-6.82-.18-10.89,1.64-10.89,10.88v14.7H167Z"/><path class="cls-1" d="M192.81,57.6c0-2.92,0-5.8-.06-8.69h9c.12.82.31,2.7.36,4a10.6,10.6,0,0,1,9.43-4.8c4.88,0,7.56,2.51,8.76,5.13,2-2.76,4.91-5.13,10.45-5.13,5.92,0,10.76,3.61,10.76,12.38V82.62h-9.17v-21c0-3-1.11-6-4.95-6-4,0-5.56,2.56-5.56,7.73V82.62H212.6V62c0-3.49-.87-6.31-4.88-6.31-3.81,0-5.63,2.33-5.63,8.11V82.62h-9.28Z"/><rect class="cls-1" x="247.55" y="71.18" width="10.09" height="11.44"/><path class="cls-1" d="M263.73,48.91h9.39V82.62h-9.39Zm0-13.83h9.39V43.4h-9.39Z"/><path class="cls-1" d="M289.11,65.76c0,6.49,2.8,10.34,7.33,10.34s7.16-3.85,7.16-10.28c0-7-2.61-10.39-7.29-10.39-4.36,0-7.2,3.21-7.2,10.33m24-.06c0,10.2-6.15,17.7-16.89,17.7-10.53,0-16.67-7.46-16.67-17.52,0-10.4,6.33-17.75,17.11-17.75,10,0,16.45,7,16.45,17.57"/><polygon class="cls-1" points="45.38 65.99 54.91 56.55 46.72 48.42 37.2 57.85 45.38 65.99"/><polygon class="cls-1" points="10.87 57.41 46.43 92.97 54.38 85.01 26.7 57.32 53.92 30.1 46.05 22.23 10.87 57.41"/><polygon class="cls-2" points="59.37 35.48 51.42 43.43 65.73 57.75 51.45 72.03 59.37 80.03 81.63 57.76 81.6 57.73 81.61 57.71 59.37 35.48"/></svg></h4>
    <p class="text-center text-muted mb-0" style="font-size: 0.8em">Copyright © Form.io LLC <span id="year"></span>. All rights reserved</p>
    <p class="text-center text-muted mb-0" style="font-size: 0.8em">Renderer v<span id="renderer-version"></span></p>
    <script async defer src="https://buttons.github.io/buttons.js"></script>
    <script type="text/javascript">
      document.getElementById('year').innerText = (new Date()).getFullYear();
      document.getElementById('renderer-version').innerHTML = Formio.version;
    </script>
  </footer>
</div>
</body>
</html>
