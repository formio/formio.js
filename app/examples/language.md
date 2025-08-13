---
title: Multi-Language Forms
layout: vtabs
section: examples
weight: 301
---
With Form.io, you can provide multiple languages for the forms that are rendered within your application. This
is done like the following.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap/dist/css/bootstrap.min.css">
<script src="https://cdn.form.io/js/formio.embed.js"></script>
<div class="btn-group">
  <button type="button" class="btn btn-primary" onclick="setLanguage('es')">Español</button>
  <button type="button" class="btn btn-primary" onclick="setLanguage('en')">English</button>
  <button type="button" class="btn btn-primary" onclick="setLanguage('zh')">中文</button>
</div>
<div id="formio"></div>
```

<div class="row">
<div class="col col-sm-6">

<pre>
Formio.createForm(document.getElementById('formio'), {
  components: [
    {
      type: 'textfield',
      key: 'firstName',
      label: 'First Name',
      placeholder: 'Enter your first name',
      input: true
    },
    {
      type: 'textfield',
      key: 'lastName',
      label: 'Last Name',
      placeholder: 'Enter your last name',
      input: true
    },
    {
      label: 'When did you start using the Form.io platform?',
      tableView: false,
      datePicker: {
        disableWeekends: false,
        disableWeekdays: false,
      },
      enableMinDateInput: false,
      enableMaxDateInput: false,
      validateWhenHidden: false,
      placeholder: 'Enter the date',
      key: 'startDate',
      type: 'datetime',
      input: true,
      widget: {
        type: 'calendar',
        displayInTimezone: 'viewer',
        locale: 'en',
        useLocaleSettings: false,
        allowInput: true,
        mode: 'single',
        enableTime: true,
        noCalendar: false,
        format: 'yyyy-MM-dd hh:mm a',
        hourIncrement: 1,
        minuteIncrement: 1,
        time_24hr: false,
        minDate: null,
        disableWeekends: false,
        disableWeekdays: false,
        maxDate: null,
      }
    },
    {
      type: 'survey',
      key: 'questions',
      label: 'Survey',
      values: [
        {
          label: 'Great',
          value: 'great'
        },
        {
          label: 'Good',
          value: 'good'
        },
        {
          label: 'Poor',
          value: 'poor'
        }
      ],
      questions: [
        {
          label: 'How would you rate the Form.io platform?',
          value: 'howWouldYouRateTheFormIoPlatform'
        },
        {
          label: 'How was Customer Support?',
          value: 'howWasCustomerSupport'
        },
        {
          label: 'Overall Experience?',
          value: 'overallExperience'
        }
      ]
    },
    {
      type: 'button',
      action: 'submit',
      label: 'Submit',
      theme: 'primary'
    }
  ]
}, {
  language: 'es',
  i18n: {
    es: {
      'First Name': 'Nombre de pila',
      'Last Name': 'Apellido',
      'Enter your first name': 'Ponga su primer nombre',
      'Enter your last name': 'Introduce tu apellido',
      'When did you start using the Form.io platform?': '¿Cuándo empezaste a utilizar la plataforma Form.io?',
      'Enter the date': 'Introduce la fecha',
      'How would you rate the Form.io platform?': '¿Cómo calificaría la plataforma Form.io?',
      'How was Customer Support?': '¿Cómo fue el servicio de atención al cliente?',
      'Overall Experience?': '¿Experiencia general?',
      Survey: 'Encuesta',
      Excellent: 'Excelente',
      Great: 'Estupendo',
      Good: 'Bueno',
      Average: 'Promedio',
      Poor: 'Pobre',
      'Submit': 'Enviar',
      complete: 'Presentación Completa',
    },
    zh: {
      'First Name': '名字',
      'Last Name': '姓',
      'Enter your first name': '输入你的名字',
      'Enter your last name': '输入你的姓氏',
      'When did you start using the Form.io platform?': '您是什麼時候開始使用 Form.io 平台？',
      'Enter the date': '輸入日期',
      'How would you rate the Form.io platform?': '你如何评价Form.io平台？',
      'How was Customer Support?': '客户支持如何？',
      'Overall Experience?': '总体体验？',
      Survey: '调查',
      Excellent: '优秀',
      Great: '大',
      Good: '好',
      Average: '平均',
      Poor: '错',
      'Submit': '提交',
      complete: '提交完成',
    }
  }
}).then(function(form) {
  window.setLanguage = function(lang) {
    form.language = lang;
  };
});
</pre>

</div>
<div class="col col-sm-6">
<h3 class="mt-0">Result</h3>
<div class="card card-body bg-light">
<div class="btn-group">
  <button type="button" class="btn btn-primary mr-1" onclick="setLanguage('es')">Español</button>
  <button type="button" class="btn btn-primary mr-1" onclick="setLanguage('en')">English</button>
  <button type="button" class="btn btn-primary" onclick="setLanguage('zh')">中文</button>
</div>
<div id="formio" style="margin-top: 20px;"></div>
<script type="text/javascript">
Formio.createForm(document.getElementById('formio'), {
  components: [
    {
      type: 'textfield',
      key: 'firstName',
      label: 'First Name',
      placeholder: 'Enter your first name',
      input: true
    },
    {
      type: 'textfield',
      key: 'lastName',
      label: 'Last Name',
      placeholder: 'Enter your last name',
      input: true,
      conditional: {
        json: {"!==": [{var: "data.firstName"}, "Bob"]}
      }
    },
    {
      label: 'When did you start using the Form.io platform?',
      tableView: false,
      datePicker: {
        disableWeekends: false,
        disableWeekdays: false,
      },
      enableMinDateInput: false,
      enableMaxDateInput: false,
      validateWhenHidden: false,
      placeholder: 'Enter the date',
      key: 'startDate',
      type: 'datetime',
      input: true,
      widget: {
        type: 'calendar',
        displayInTimezone: 'viewer',
        locale: 'en',
        useLocaleSettings: false,
        allowInput: true,
        mode: 'single',
        enableTime: true,
        noCalendar: false,
        format: 'yyyy-MM-dd hh:mm a',
        hourIncrement: 1,
        minuteIncrement: 1,
        time_24hr: false,
        minDate: null,
        disableWeekends: false,
        disableWeekdays: false,
        maxDate: null,
      }
    },
    {
      type: 'survey',
      key: 'questions',
      label: 'Survey',
      values: [
        {
          label: 'Great',
          value: 'great'
        },
        {
          label: 'Good',
          value: 'good'
        },
        {
          label: 'Poor',
          value: 'poor'
        }
      ],
      questions: [
        {
          label: 'How would you rate the Form.io platform?',
          value: 'howWouldYouRateTheFormIoPlatform'
        },
        {
          label: 'How was Customer Support?',
          value: 'howWasCustomerSupport'
        },
        {
          label: 'Overall Experience?',
          value: 'overallExperience'
        }
      ]
    },
    {
      type: 'button',
      action: 'submit',
      label: 'Submit',
      theme: 'primary'
    }
  ]
}, {
  language: 'es',
  i18n: {
    es: {
      'First Name': 'Nombre de pila',
      'Last Name': 'Apellido',
      'Enter your first name': 'Ponga su primer nombre',
      'Enter your last name': 'Introduce tu apellido',
      'When did you start using the Form.io platform?': '¿Cuándo empezaste a utilizar la plataforma Form.io?',
      'Enter the date': 'Introduce la fecha',
      'How would you rate the Form.io platform?': '¿Cómo calificaría la plataforma Form.io?',
      'How was Customer Support?': '¿Cómo fue el servicio de atención al cliente?',
      'Overall Experience?': '¿Experiencia general?',
      Survey: 'Encuesta',
      Excellent: 'Excelente',
      Great: 'Estupendo',
      Good: 'Bueno',
      Average: 'Promedio',
      Poor: 'Pobre',
      'Submit': 'Enviar',
      complete: 'Presentación Completa',
    },
    zh: {
      'First Name': '名字',
      'Last Name': '姓',
      'Enter your first name': '输入你的名字',
      'Enter your last name': '输入你的姓氏',
      'When did you start using the Form.io platform?': '您是什麼時候開始使用 Form.io 平台？',
      'Enter the date': '輸入日期',
      'How would you rate the Form.io platform?': '你如何评价Form.io平台？',
      'How was Customer Support?': '客户支持如何？',
      'Overall Experience?': '总体体验？',
      Survey: '调查',
      Excellent: '优秀',
      Great: '大',
      Good: '好',
      Average: '平均',
      Poor: '错',
      'Submit': '提交',
      complete: '提交完成',
    }
  }
}).then(function(form) {
  window.setLanguage = function(lang) {
    form.language = lang;
  };
});
</script>
</div>
</div>
</div>

