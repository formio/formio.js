const form = {
  "type": "form",
  "title": "wizard with prefix Components test",
  "display": "wizard",
  "name": "5904",
  "path": "5904",
	"components": [
    {
      "label": "Prefix Text Field",
      "tableView": true,
      "key": "prefixTextField",
      "type": "textfield",
      "input": true
    },
    {
      "title": "Page 1",
      "label": "Page 1",
      "type": "panel",
      "key": "page1",
      "components": [
      {
        "label": "Page 1 Text Field",
        "tableView": true,
        "key": "page1TextField",
        "type": "textfield",
        "input": true
      }],
      "input": false,
      "tableView": false
    },
    {
      "title": "Page 2",
      "label": "Page 2",
      "type": "panel",
      "key": "page2",
      "components": [
      {
        "label": "Page 2 Text Field",
        "tableView": true,
        "key": "page2TextField",
        "type": "textfield",
        "input": true
      }],
      "input": false,
      "tableView": false
    },
    {
      "label": "Suffix Text Field",
      "tableView": true,
      "key": "suffixTextField",
      "type": "textfield",
      "input": true
    }],
};

const submission = {
  data: {
    "prefixTextField":"prefix",
    "page1TextField":"page1",
    "page2TextField":"page2",
    "suffixTextField":"suffix",
  }
};

export default {
  form: form,
  submission: submission,
};
