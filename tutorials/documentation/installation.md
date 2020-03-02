# Installation
There are several ways that the Form.io JavaScript SDK can be installed within your application. These are as follows.

## Application Installation
If you are building your own JavaScript application, and wish to include this library within your application, then you will use NPM to install the library by typing the following.

### NPM Installation
You can install the Form.io JavaScript SDK into your application using NPM as follows.

```bash
npm install --save formiojs
```

### Styles Installation
Next, you will need to ensure that you have the correct CSS frameworks installed within your application. By default, 
Form.io renders using [Bootstrap 4](https://getbootstrap.com/). While other CSS frameworks are supported (which we will)
cover later, the base case is to install Bootstrap into your application using SASS by typing the following.

```bash
npm install --save bootstrap
```

It is also recommended to install the [Font Awesome](https://fontawesome.com/) by typing the following.

```bash
npm install --save font-awesome
```

Next, in your application, we recommend using [SASS](https://sass-lang.com/) to include all of the style dependencies. 
You can do this by adding the following within your own SCSS style file within your application.

```css
@import "~bootstrap/scss/bootstrap.scss";
$fa-font-path: '../node_modules/font-awesome/fonts';
@import '~font-awesome/scss/font-awesome';
@import '~formiojs/formio.full.min.css';
```
<strong>Note: If you are using the Angular or React wrappers (angular-formio) or (react-formio), it is unnecessary to import the formiojs CSS since those wrappers do it for you.</strong>

Next, you will just compile this SASS file using either the SASS command line or a tool such as the 
[sass-loader](https://webpack.js.org/loaders/sass-loader/) for Webpack.

Also, if you would like to add some additional styling capabilities to your application, you can include the 
[Bootswatch](https://bootswatch.com) themes into your application as well. This is installed by typing the following.

```bash
npm install --save bootswatch
```

And then you would change your SCSS file to look like the following.

```css
@import "~bootswatch/dist/cosmo/_variables.scss";
@import "~bootstrap/scss/bootstrap.scss";
@import "~bootswatch/dist/cosmo/_bootswatch.scss";
$fa-font-path: '../node_modules/font-awesome/fonts';
@import '~font-awesome/scss/font-awesome';
@import '~formiojs/formio.full.min.css';
```

Note: You can change the Bootswatch themes by changing the "bootswatch/dist" folder to the style you wish to use.

Now, you can put the following code within your application to render a form.

```javascript
import { Formio } from 'formiojs';
Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/example');
```

Or embed the Form Builder as follows.

```javascript
import { Formio } from 'formiojs';
Formio.builder(document.getElementById('formio'));
```

## CDN Installation
In addition to installing the Form.io library within an application, you can also utilze the Form.io CDN's to include
the necessary files to render your form within your application. The following URL is used to include the Form.io renderer
via CDN.

<strong>JavaScript</strong>

```bash
https://cdn.form.io/formiojs/formio.full.min.js
```

<strong>Styles</strong>

```bash
https://cdn.form.io/formiojs/formio.full.min.css
```

This will always point to the latest "stable" release.

These can now be included into your application using the following code.

```html
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdn.form.io/formiojs/formio.full.min.css">
<script src="https://cdn.form.io/formiojs/formio.full.min.js"></script>
```
