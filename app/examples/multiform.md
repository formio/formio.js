---
title: Multi-Form Workflows
layout: vtabs
section: examples
weight: 21
---
This demonstration illustrates how the **Form Component** can be used to create multi-form wizard
workflows. Each page within the workflow can decide how to navigate to the next form based upon the
user input within the workflow.

```html
<link rel="stylesheet" href="https://unpkg.com/formiojs@latest/dist/formio.full.min.css">
<script src="https://unpkg.com/formiojs@latest/dist/formio.full.min.js"></script>
<div id="workflow"></div>
```

```js
Formio.createForm(document.getElementById('workflow'), 'https://examples.form.io/multiform');
```

This workflow is a form that uses Form components to bring in multiple forms into a single dynamic workflow. This form
may look something like the following.

```js
{% raw %}
var workflow = new FormioWizard(document.getElementById('workflow'));
workflow.form = {
  components: [
    {
      type: 'hidden',
      key: 'score',
      input: true,
      defaultValue: 0,
      calculateValue: {
        "+": [
          {"if": [{"var": "data.a.data.score"}, {"var": "data.a.data.score"}, 0]},
          {"if": [{"var": "data.b.data.score"}, {"var": "data.b.data.score"}, 0]},
          {"if": [{"var": "data.c.data.score"}, {"var": "data.c.data.score"}, 0]},
          {"if": [{"var": "data.d.data.score"}, {"var": "data.d.data.score"}, 0]},
          {"if": [{"var": "data.e.data.score"}, {"var": "data.e.data.score"}, 0]}
        ]
      }
    },
    {
      type: 'panel',
      key: 'pageA',
      title: 'A',
      nextPage: {
        "if": [
          {">": ["data.score", 10]},
          "stop",
          {"var": "data.a.data.nextPage"}
        ]
      },
      breadcrumb: 'none',
      components: [
        {
          type: 'form',
          key: 'a',
          src: 'https://examples.form.io/a',
          reference: true,
          customDefaultValue: 'value = data.score ? {data: {totalScore: data.score}} : {data: {totalScore: 0}};'
        }
      ]
    },
    {
      type: 'panel',
      key: 'pageB',
      title: 'B',
      nextPage: {
        "if": [
          {">": ["data.score", 10]},
          "stop",
          {"var": "data.b.data.nextPage"}
        ]
      },
      breadcrumb: 'none',
      components: [
        {
          type: 'form',
          key: 'b',
          src: 'https://examples.form.io/b',
          reference: true,
          customDefaultValue: 'value = data.score ? {data: {totalScore: data.score}} : {data: {totalScore: 0}};'
        }
      ]
    },
    {
      type: 'panel',
      key: 'pageC',
      title: 'C',
      nextPage: {
        "if": [
          {">": ["data.score", 10]},
          "stop",
          {"var": "data.c.data.nextPage"}
        ]
      },
      breadcrumb: 'none',
      components: [
        {
          type: 'form',
          key: 'c',
          src: 'https://examples.form.io/c',
          reference: true,
          customDefaultValue: 'value = data.score ? {data: {totalScore: data.score}} : {data: {totalScore: 0}};'
        }
      ]
    },
    {
      type: 'panel',
      key: 'pageD',
      title: 'D',
      nextPage: {
        "if": [
          {">": ["data.score", 10]},
          "stop",
          {"var": "data.d.data.nextPage"}
        ]
      },
      breadcrumb: 'none',
      components: [
        {
          type: 'form',
          key: 'd',
          src: 'https://examples.form.io/d',
          reference: true,
          customDefaultValue: 'value = data.score ? {data: {totalScore: data.score}} : {data: {totalScore: 0}};'
        }
      ]
    },
    {
      type: 'panel',
      key: 'pageE',
      title: 'E',
      nextPage: {
        "if": [
          {">": ["data.score", 10]},
          "stop",
          {"var": "data.e.data.nextPage"}
        ]
      },
      breadcrumb: 'none',
      components: [
        {
          type: 'form',
          key: 'e',
          src: 'https://examples.form.io/e',
          reference: true,
          customDefaultValue: 'value = data.score ? {data: {totalScore: data.score}} : {data: {totalScore: 0}};'
        }
      ]
    },
    {
      type: 'panel',
      key: 'done',
      title: 'Review',
      breadcrumb: 'history',
      components: [
        {
          input: false,
          html: `<h2>Are you sure you wish to submit?</h3>
          <ul>
            {% if (data.a) { %}<li><strong>Page A</strong> --> {{ data.a.data.nextPage }}</li>{% } %}
            {% if (data.b) { %}<li><strong>Page B</strong> --> {{ data.b.data.nextPage }}</li>{% } %}
            {% if (data.c) { %}<li><strong>Page C</strong> --> {{ data.c.data.nextPage }}</li>{% } %}
            {% if (data.d) { %}<li><strong>Page D</strong> --> {{ data.d.data.nextPage }}</li>{% } %}
            {% if (data.e) { %}<li><strong>Page E</strong> --> {{ data.e.data.nextPage }}</li>{% } %}
          </ul>`,
          type: 'content',
          key: 'areyousure'
        }
      ]
    }
  ]
};
{% endraw %}
```

<h3 class="mt-0">Result</h3>
<div class="card card-body bg-light">
  <div id="workflow"></div>
  <script type="text/javascript">
  {% raw %}
  Formio.createForm(document.getElementById('workflow'), {
    display: 'wizard',
    components: [
      {
        type: 'hidden',
        key: 'score',
        input: true,
        defaultValue: 0,
        calculateValue: {
          "+": [
            {"if": [{"var": "data.a.data.score"}, {"var": "data.a.data.score"}, 0]},
            {"if": [{"var": "data.b.data.score"}, {"var": "data.b.data.score"}, 0]},
            {"if": [{"var": "data.c.data.score"}, {"var": "data.c.data.score"}, 0]},
            {"if": [{"var": "data.d.data.score"}, {"var": "data.d.data.score"}, 0]},
            {"if": [{"var": "data.e.data.score"}, {"var": "data.e.data.score"}, 0]}
          ]
        }
      },
      {
        type: 'panel',
        key: 'pageA',
        title: 'A',
        nextPage: {
          "if": [
            {">": [{"var": "data.score"}, 10]},
            "stop",
            {"var": "data.a.data.nextPage"}
          ]
        },
        breadcrumb: 'none',
        components: [
          {
            type: 'form',
            key: 'a',
            src: 'https://examples.form.io/a',
            reference: true,
            customDefaultValue: 'value = data.score ? {data: {totalScore: data.score}} : {data: {totalScore: 0}};'
          }
        ]
      },
      {
        type: 'panel',
        key: 'pageB',
        title: 'B',
        nextPage: {
          "if": [
            {">": [{"var": "data.score"}, 10]},
            "stop",
            {"var": "data.b.data.nextPage"}
          ]
        },
        breadcrumb: 'none',
        components: [
          {
            type: 'form',
            key: 'b',
            src: 'https://examples.form.io/b',
            reference: true,
            customDefaultValue: 'value = data.score ? {data: {totalScore: data.score}} : {data: {totalScore: 0}};'
          }
        ]
      },
      {
        type: 'panel',
        key: 'pageC',
        title: 'C',
        nextPage: {
          "if": [
            {">": [{"var": "data.score"}, 10]},
            "stop",
            {"var": "data.c.data.nextPage"}
          ]
        },
        breadcrumb: 'none',
        components: [
          {
            type: 'form',
            key: 'c',
            src: 'https://examples.form.io/c',
            reference: true,
            customDefaultValue: 'value = data.score ? {data: {totalScore: data.score}} : {data: {totalScore: 0}};'
          }
        ]
      },
      {
        type: 'panel',
        key: 'pageD',
        title: 'D',
        nextPage: {
          "if": [
            {">": [{"var": "data.score"}, 10]},
            "stop",
            {"var": "data.d.data.nextPage"}
          ]
        },
        breadcrumb: 'none',
        components: [
          {
            type: 'form',
            key: 'd',
            src: 'https://examples.form.io/d',
            reference: true,
            customDefaultValue: 'value = data.score ? {data: {totalScore: data.score}} : {data: {totalScore: 0}};'
          }
        ]
      },
      {
        type: 'panel',
        key: 'pageE',
        title: 'E',
        nextPage: {
          "if": [
            {">": [{"var": "data.score"}, 10]},
            "stop",
            {"var": "data.e.data.nextPage"}
          ]
        },
        breadcrumb: 'none',
        components: [
          {
            type: 'form',
            key: 'e',
            src: 'https://examples.form.io/e',
            reference: true,
            customDefaultValue: 'value = data.score ? {data: {totalScore: data.score}} : {data: {totalScore: 0}};'
          }
        ]
      },
      {
        type: 'panel',
        key: 'done',
        title: 'Review',
        breadcrumb: 'history',
        components: [
          {
            input: false,
            html: `<h2>Are you sure you wish to submit?</h3>
            <ul>
              {% if (data.a) { %}<li><strong>Page A</strong> --> {{ data.a.data.nextPage }}</li>{% } %}
              {% if (data.b) { %}<li><strong>Page B</strong> --> {{ data.b.data.nextPage }}</li>{% } %}
              {% if (data.c) { %}<li><strong>Page C</strong> --> {{ data.c.data.nextPage }}</li>{% } %}
              {% if (data.d) { %}<li><strong>Page D</strong> --> {{ data.d.data.nextPage }}</li>{% } %}
              {% if (data.e) { %}<li><strong>Page E</strong> --> {{ data.e.data.nextPage }}</li>{% } %}
            </ul>`,
            type: 'content',
            key: 'areyousure'
          }
        ]
      }
    ]
  }).then(function(workflow) {
    workflow.on('submit', function(submission) {
      console.log(submission);
    });
  });
  {% endraw %}
  </script>
</div>
