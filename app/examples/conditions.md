---
title: Conditional Forms
layout: vtabs
section: examples
weight: 200
---
You can use [JSON Logic](http://jsonlogic.com) to create complex conditionals and validation criteria.

<div class="row">
  <div class="col col-sm-7">
<pre>
Formio.createForm(document.getElementById('formio'), {
  components: [
    {
      "type": "textfield",
      "label": "Type \"Show\"",
      "description": "Must be exact, and case sensitive.",
      "key": "typeShow",
      "input": true,
      "inputType": "text",
      "validate": {
        "json": {
          "if": [
            {
              "==": [
                {
                  "var": "data.typeShow"
                },
                "Show"
              ]
            },
            true,
            "You must type 'Show'!"
          ]
        }
      }
    },
    {
      "type": "textfield",
      "label": "Type \"Me\"",
      "description": "Must be exact, and case sensitive.",
      "key": "typeMe",
      "input": true,
      "inputType": "text",
      "validate": {
        "json": {
          "if": [
            {
              "==": [
                {
                  "var": "data.typeMe"
                },
                "Me"
              ]
            },
            true,
            "You must type 'Me'!"
          ]
        }
      },
      "conditional": {
        "json": {
          "===": [
            {
              "var": "data.typeShow"
            },
            "Show"
          ]
        }
      }
    },
    {
      "type": "textfield",
      "label": "Type \"The\"",
      "description": "Must be exact, and case sensitive.",
      "key": "typeThe",
      "input": true,
      "inputType": "text",
      "validate": {
        "json": {
          "if": [
            {
              "==": [
                {
                  "var": "data.typeThe"
                },
                "The"
              ]
            },
            true,
            "You must type 'The'!"
          ]
        }
      },
      "conditional": {
        "json": {
          "===": [
            {
              "var": "data.typeMe"
            },
            "Me"
          ]
        }
      }
    },
    {
      "type": "textfield",
      "input": true,
      "inputType": "text",
      "label": "Type \"Monkey!\"",
      "description": "Don't forget the '!'.",
      "key": "typeMonkey",
      "validate": {
        "json": {
          "if": [
            {
              "==": [
                {
                  "var": "data.typeMonkey"
                },
                "Monkey!"
              ]
            },
            true,
            "You must type 'Monkey!'"
          ]
        }
      },
      "conditional": {
        "json": {
          "===": [
            {
              "var": "data.typeThe"
            },
            "The"
          ]
        }
      }
    },
    {
      "key": "monkey",
      "input": false,
      "tag": "img",
      "attrs": [
        {
          "attr": "src",
          "value": "https://ichef.bbci.co.uk/news/660/cpsprodpb/025B/production/_85730600_monkey2.jpg"
        },
        {
          "attr": "style",
          "value": "width: 100%;"
        }
      ],
      "className": "",
      "content": "",
      "type": "htmlelement",
      "conditional": {
        "json": {
          "===": [
            {
              "var": "data.typeMonkey"
            },
            "Monkey!"
          ]
        }
      }
    },
    {
      "key": "submit",
      "type": "button",
      "action": "submit",
      "label": "Submit",
      "theme": "primary"
    }
  ]
});
</pre>
  </div>
  <div class="col col-sm-5">
  <h3>Result</h3>
  <div class="card card-body bg-light">
  <div id="formio"></div>
  <script type="text/javascript">
  Formio.createForm(document.getElementById('formio'), {
    components: [
      {
        "type": "textfield",
        "label": "Type \"Show\"",
        "description": "Must be exact, and case sensitive.",
        "key": "typeShow",
        "input": true,
        "inputType": "text",
        "validate": {
          "json": {
            "if": [
              {
                "==": [
                  {
                    "var": "data.typeShow"
                  },
                  "Show"
                ]
              },
              true,
              "You must type 'Show'!"
            ]
          }
        }
      },
      {
        "type": "textfield",
        "label": "Type \"Me\"",
        "description": "Must be exact, and case sensitive.",
        "key": "typeMe",
        "input": true,
        "inputType": "text",
        "validate": {
          "json": {
            "if": [
              {
                "==": [
                  {
                    "var": "data.typeMe"
                  },
                  "Me"
                ]
              },
              true,
              "You must type 'Me'!"
            ]
          }
        },
        "conditional": {
          "json": {
            "===": [
              {
                "var": "data.typeShow"
              },
              "Show"
            ]
          }
        }
      },
      {
        "type": "textfield",
        "label": "Type \"The\"",
        "description": "Must be exact, and case sensitive.",
        "key": "typeThe",
        "input": true,
        "inputType": "text",
        "validate": {
          "json": {
            "if": [
              {
                "==": [
                  {
                    "var": "data.typeThe"
                  },
                  "The"
                ]
              },
              true,
              "You must type 'The'!"
            ]
          }
        },
        "conditional": {
          "json": {
            "===": [
              {
                "var": "data.typeMe"
              },
              "Me"
            ]
          }
        }
      },
      {
        "type": "textfield",
        "input": true,
        "inputType": "text",
        "label": "Type \"Monkey!\"",
        "description": "Don't forget the '!'.",
        "key": "typeMonkey",
        "validate": {
          "json": {
            "if": [
              {
                "==": [
                  {
                    "var": "data.typeMonkey"
                  },
                  "Monkey!"
                ]
              },
              true,
              "You must type 'Monkey!'"
            ]
          }
        },
        "conditional": {
          "json": {
            "===": [
              {
                "var": "data.typeThe"
              },
              "The"
            ]
          }
        }
      },
      {
        "key": "monkey",
        "input": false,
        "tag": "img",
        "attrs": [
          {
            "attr": "src",
            "value": "https://ichef.bbci.co.uk/news/660/cpsprodpb/025B/production/_85730600_monkey2.jpg"
          },
          {
            "attr": "style",
            "value": "width: 100%;"
          }
        ],
        "className": "",
        "content": "",
        "type": "htmlelement",
        "conditional": {
          "json": {
            "===": [
              {
                "var": "data.typeMonkey"
              },
              "Monkey!"
            ]
          }
        }
      },
      {
        "key": "submit",
        "type": "button",
        "action": "submit",
        "label": "Submit",
        "theme": "primary"
      }
    ]
  });
  </script>
  </div>
  </div>
</div>

