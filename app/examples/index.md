---
title: Simple Embedding
layout: vtabs
section: examples
weight: 0
---
You can create a form with the simple JSON schema as follows.

```html
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
<link rel="stylesheet" href="https://unpkg.com/formiojs@latest/dist/formio.full.min.css">
<script src="https://unpkg.com/formiojs@latest/dist/formio.full.min.js"></script>
<div id="formio"></formio>
```

```js
Formio.icons = 'fontawesome';
Formio.createForm(document.getElementById('formio'), {
  components: [
    {
      type: 'textfield',
      key: 'firstName',
      label: 'First Name',
      placeholder: 'Enter your first name.',
      input: true,
      tooltip: 'Enter your <strong>First Name</strong>',
      description: 'Enter your <strong>First Name</strong>'
    },
    {
      type: 'textfield',
      key: 'lastName',
      label: 'Last Name',
      placeholder: 'Enter your last name',
      input: true,
      tooltip: 'Enter your <strong>Last Name</strong>',
      description: 'Enter your <strong>Last Name</strong>'
    },
    {
      type: "select",
      label: "Favorite Things",
      key: "favoriteThings",
      placeholder: "These are a few of your favorite things...",
      data: {
        values: [
          {
            value: "raindropsOnRoses",
            label: "Raindrops on roses"
          },
          {
            value: "whiskersOnKittens",
            label: "Whiskers on Kittens"
          },
          {
            value: "brightCopperKettles",
            label: "Bright Copper Kettles"
          },
          {
            value: "warmWoolenMittens",
            label: "Warm Woolen Mittens"
          }
        ]
      },
      dataSrc: "values",
      template: "<span>{% raw %}{{ item.label }}{% endraw %}</span>",
      multiple: true,
      input: true
    },
    {
      type: 'button',
      action: 'submit',
      label: 'Submit',
      theme: 'primary'
    }
  ]
}).then(function(form) {
  form.on('submit', function(submission) {
    console.log(submission);
  });
});
```

<h3>Result</h3>
<div class="card card-body bg-light">
<div id="formio"></div>
<script type="text/javascript">
Formio.createForm(document.getElementById('formio'), {"_id":"5cdc0da220af6c6083f5a923","type":"form","tags":[],"owner":"5888f1ce7150df0072bacb54","components":[{"label":"Child A","mask":false,"tableView":true,"alwaysEnabled":false,"type":"form","input":true,"key":"childA","reference":false,"form":"5cdc0d5a20af6c6083f5a91b","project":"fcigcoxppstrkya","tags":[],"conditional":{"show":"","when":"","json":"","eq":""},"properties":{},"formRevision":2,"customConditional":"","logic":[],"reorder":false,"placeholder":"","prefix":"","customClass":"","suffix":"","multiple":false,"defaultValue":null,"protected":false,"unique":false,"persistent":true,"hidden":false,"clearOnHide":true,"dataGridLabel":false,"labelPosition":"top","labelWidth":30,"labelMargin":3,"description":"","errorLabel":"","tooltip":"","hideLabel":false,"tabindex":"","disabled":false,"autofocus":false,"dbIndex":false,"customDefaultValue":"","calculateValue":"","allowCalculateOverride":false,"widget":null,"refreshOn":"","clearOnRefresh":false,"validateOn":"change","validate":{"required":false,"custom":"","customPrivate":false},"src":"","path":"","id":"evd4ekc","components":[{"input":true,"tableView":true,"label":"A","key":"a","defaultValue":"","spellcheck":true,"conditional":{"show":"","when":null,"eq":""},"type":"textfield","inputFormat":"plain","tags":[],"properties":{},"placeholder":"","prefix":"","customClass":"","suffix":"","multiple":false,"protected":false,"unique":false,"persistent":true,"hidden":false,"clearOnHide":true,"dataGridLabel":false,"labelPosition":"top","labelWidth":30,"labelMargin":3,"description":"","errorLabel":"","tooltip":"","hideLabel":false,"tabindex":"","disabled":false,"autofocus":false,"dbIndex":false,"customDefaultValue":"","calculateValue":"","allowCalculateOverride":false,"widget":{"format":"yyyy-MM-dd hh:mm a","dateFormat":"yyyy-MM-dd hh:mm a","saveAs":"text"},"refreshOn":"","clearOnRefresh":false,"validateOn":"change","validate":{"required":false,"custom":"","customPrivate":false,"minLength":"","maxLength":"","minWords":"","maxWords":"","pattern":""},"mask":false,"inputType":"text","inputMask":"","id":"ebxfr3"},{"input":true,"tableView":true,"label":"B","key":"b","defaultValue":"","spellcheck":true,"conditional":{"show":"","when":null,"eq":""},"type":"textfield","inputFormat":"plain","tags":[],"properties":{},"placeholder":"","prefix":"","customClass":"","suffix":"","multiple":false,"protected":false,"unique":false,"persistent":true,"hidden":false,"clearOnHide":true,"dataGridLabel":false,"labelPosition":"top","labelWidth":30,"labelMargin":3,"description":"","errorLabel":"","tooltip":"","hideLabel":false,"tabindex":"","disabled":false,"autofocus":false,"dbIndex":false,"customDefaultValue":"","calculateValue":"","allowCalculateOverride":false,"widget":{"format":"yyyy-MM-dd hh:mm a","dateFormat":"yyyy-MM-dd hh:mm a","saveAs":"text"},"refreshOn":"","clearOnRefresh":false,"validateOn":"change","validate":{"required":false,"custom":"","customPrivate":false,"minLength":"","maxLength":"","minWords":"","maxWords":"","pattern":""},"mask":false,"inputType":"text","inputMask":"","id":"erbncbq"},{"label":"C","allowMultipleMasks":false,"showWordCount":false,"showCharCount":false,"tableView":true,"alwaysEnabled":false,"type":"textfield","input":true,"key":"c","defaultValue":"","validate":{"customMessage":"","json":"","required":false,"custom":"","customPrivate":false,"minLength":"","maxLength":"","minWords":"","maxWords":"","pattern":""},"conditional":{"show":"","when":"","json":"","eq":""},"widget":{"type":"","format":"yyyy-MM-dd hh:mm a","dateFormat":"yyyy-MM-dd hh:mm a","saveAs":"text"},"reorder":false,"inputFormat":"plain","encrypted":false,"properties":{},"customConditional":"","logic":[],"placeholder":"","prefix":"","customClass":"","suffix":"","multiple":false,"protected":false,"unique":false,"persistent":true,"hidden":false,"clearOnHide":true,"dataGridLabel":false,"labelPosition":"top","labelWidth":30,"labelMargin":3,"description":"","errorLabel":"","tooltip":"","hideLabel":false,"tabindex":"","disabled":false,"autofocus":false,"dbIndex":false,"customDefaultValue":"","calculateValue":"","allowCalculateOverride":false,"refreshOn":"","clearOnRefresh":false,"validateOn":"change","mask":false,"inputType":"text","inputMask":"","id":"emg1s9"},{"input":true,"label":"Submit","tableView":false,"key":"submit","theme":"primary","type":"button","placeholder":"","prefix":"","customClass":"","suffix":"","multiple":false,"defaultValue":null,"protected":false,"unique":false,"persistent":false,"hidden":false,"clearOnHide":true,"dataGridLabel":true,"labelPosition":"top","labelWidth":30,"labelMargin":3,"description":"","errorLabel":"","tooltip":"","hideLabel":false,"tabindex":"","disabled":false,"autofocus":false,"dbIndex":false,"customDefaultValue":"","calculateValue":"","allowCalculateOverride":false,"widget":null,"refreshOn":"","clearOnRefresh":false,"validateOn":"change","validate":{"required":false,"custom":"","customPrivate":false},"conditional":{"show":null,"when":null,"eq":""},"size":"md","leftIcon":"","rightIcon":"","block":false,"action":"submit","disableOnInvalid":false,"id":"e1qwwck"}]},{"label":"Child B","mask":false,"tableView":true,"alwaysEnabled":false,"type":"form","input":true,"key":"childB","form":"5cdc0d7b20af6c6083f5a91f","project":"fcigcoxppstrkya","tags":[],"conditional":{"show":"","when":"","json":"","eq":""},"properties":{},"formRevision":2,"reference":false,"customConditional":"","logic":[],"reorder":false,"placeholder":"","prefix":"","customClass":"","suffix":"","multiple":false,"defaultValue":null,"protected":false,"unique":false,"persistent":true,"hidden":false,"clearOnHide":true,"dataGridLabel":false,"labelPosition":"top","labelWidth":30,"labelMargin":3,"description":"","errorLabel":"","tooltip":"","hideLabel":false,"tabindex":"","disabled":false,"autofocus":false,"dbIndex":false,"customDefaultValue":"","calculateValue":"","allowCalculateOverride":false,"widget":null,"refreshOn":"","clearOnRefresh":false,"validateOn":"change","validate":{"required":false,"custom":"","customPrivate":false},"src":"","path":"","id":"esmqmcl","components":[{"input":true,"tableView":true,"label":"X","key":"c","defaultValue":"","spellcheck":true,"conditional":{"show":"","when":null,"eq":""},"type":"textfield","inputFormat":"plain","tags":[],"properties":{},"placeholder":"","prefix":"","customClass":"","suffix":"","multiple":false,"protected":false,"unique":false,"persistent":true,"hidden":false,"clearOnHide":true,"dataGridLabel":false,"labelPosition":"top","labelWidth":30,"labelMargin":3,"description":"","errorLabel":"","tooltip":"","hideLabel":false,"tabindex":"","disabled":false,"autofocus":false,"dbIndex":false,"customDefaultValue":"","calculateValue":"","allowCalculateOverride":false,"widget":{"format":"yyyy-MM-dd hh:mm a","dateFormat":"yyyy-MM-dd hh:mm a","saveAs":"text"},"refreshOn":"","clearOnRefresh":false,"validateOn":"change","validate":{"required":false,"custom":"","customPrivate":false,"minLength":"","maxLength":"","minWords":"","maxWords":"","pattern":""},"mask":false,"inputType":"text","inputMask":"","id":"ebj4o79"},{"input":true,"tableView":true,"label":"Y","key":"d","defaultValue":"","spellcheck":true,"conditional":{"show":"","when":null,"eq":""},"type":"textfield","inputFormat":"plain","tags":[],"properties":{},"placeholder":"","prefix":"","customClass":"","suffix":"","multiple":false,"protected":false,"unique":false,"persistent":true,"hidden":false,"clearOnHide":true,"dataGridLabel":false,"labelPosition":"top","labelWidth":30,"labelMargin":3,"description":"","errorLabel":"","tooltip":"","hideLabel":false,"tabindex":"","disabled":false,"autofocus":false,"dbIndex":false,"customDefaultValue":"","calculateValue":"","allowCalculateOverride":false,"widget":{"format":"yyyy-MM-dd hh:mm a","dateFormat":"yyyy-MM-dd hh:mm a","saveAs":"text"},"refreshOn":"","clearOnRefresh":false,"validateOn":"change","validate":{"required":false,"custom":"","customPrivate":false,"minLength":"","maxLength":"","minWords":"","maxWords":"","pattern":""},"mask":false,"inputType":"text","inputMask":"","id":"enf2fh"},{"label":"Z","allowMultipleMasks":false,"showWordCount":false,"showCharCount":false,"tableView":true,"alwaysEnabled":false,"type":"textfield","input":true,"key":"z","defaultValue":"","validate":{"customMessage":"","json":"","required":false,"custom":"","customPrivate":false,"minLength":"","maxLength":"","minWords":"","maxWords":"","pattern":""},"conditional":{"show":"","when":"","json":"","eq":""},"widget":{"type":"","format":"yyyy-MM-dd hh:mm a","dateFormat":"yyyy-MM-dd hh:mm a","saveAs":"text"},"reorder":false,"inputFormat":"plain","encrypted":false,"properties":{},"customConditional":"","logic":[],"placeholder":"","prefix":"","customClass":"","suffix":"","multiple":false,"protected":false,"unique":false,"persistent":true,"hidden":false,"clearOnHide":true,"dataGridLabel":false,"labelPosition":"top","labelWidth":30,"labelMargin":3,"description":"","errorLabel":"","tooltip":"","hideLabel":false,"tabindex":"","disabled":false,"autofocus":false,"dbIndex":false,"customDefaultValue":"","calculateValue":"","allowCalculateOverride":false,"refreshOn":"","clearOnRefresh":false,"validateOn":"change","mask":false,"inputType":"text","inputMask":"","id":"eah84mp"},{"input":true,"label":"Submit","tableView":false,"key":"submit","theme":"primary","type":"button","placeholder":"","prefix":"","customClass":"","suffix":"","multiple":false,"defaultValue":null,"protected":false,"unique":false,"persistent":false,"hidden":false,"clearOnHide":true,"dataGridLabel":true,"labelPosition":"top","labelWidth":30,"labelMargin":3,"description":"","errorLabel":"","tooltip":"","hideLabel":false,"tabindex":"","disabled":false,"autofocus":false,"dbIndex":false,"customDefaultValue":"","calculateValue":"","allowCalculateOverride":false,"widget":null,"refreshOn":"","clearOnRefresh":false,"validateOn":"change","validate":{"required":false,"custom":"","customPrivate":false},"conditional":{"show":null,"when":null,"eq":""},"size":"md","leftIcon":"","rightIcon":"","block":false,"action":"submit","disableOnInvalid":false,"id":"eg78pvu"}]},{"input":true,"label":"Submit","tableView":false,"key":"submit","theme":"primary","type":"button","placeholder":"","prefix":"","customClass":"","suffix":"","multiple":false,"defaultValue":null,"protected":false,"unique":false,"persistent":false,"hidden":false,"clearOnHide":true,"dataGridLabel":true,"labelPosition":"top","labelWidth":30,"labelMargin":3,"description":"","errorLabel":"","tooltip":"","hideLabel":false,"tabindex":"","disabled":false,"autofocus":false,"dbIndex":false,"customDefaultValue":"","calculateValue":"","allowCalculateOverride":false,"widget":null,"refreshOn":"","clearOnRefresh":false,"validateOn":"change","validate":{"required":false,"custom":"","customPrivate":false},"conditional":{"show":null,"when":null,"eq":""},"size":"md","leftIcon":"","rightIcon":"","block":false,"action":"submit","disableOnInvalid":false,"id":"elgsmw7"}],"revisions":"original","_vid":4,"title":"Parent","display":"form","access":[{"roles":["5cdc0d4320af6c6083f5a906","5cdc0d4320af6c6083f5a907","5cdc0d4320af6c6083f5a908"],"type":"read_all"}],"submissionAccess":[],"settings":{},"name":"parent","path":"parent","project":"5cdc0d4320af6c6083f5a905","created":"2019-05-15T13:01:22.221Z","modified":"2019-05-15T13:07:25.552Z","machineName":"fcigcoxppstrkya:parent"}).then(function(form) {
  form.on('change', function(event) {
    console.log(event);
  });
});
</script>
</div>
