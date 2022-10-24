const form = {
  "_id": "62fa6dfa619cf2405b7d01d6",
  "title": "5376",
  "name": "5376",
  "path": "5376",
  "type": "form",
  "display": "form",
  "tags": [],
  "access": [
    { "type": "create_own", "roles": [] },
    { "type": "create_all", "roles": [] },
    { "type": "read_own", "roles": [] },
    {
      "type": "read_all",
      "roles": [
        "61029d3c4c9d4e05de74bb29",
        "61029d3c4c9d4e952174bb24",
        "61029d3b4c9d4e72ef74bb1f",
        "63293a17a5eec5c8bfbd3874"
      ]
    },
    { "type": "update_own", "roles": [] },
    { "type": "update_all", "roles": [] },
    { "type": "delete_own", "roles": [] },
    { "type": "delete_all", "roles": [] },
    { "type": "team_read", "roles": [] },
    { "type": "team_write", "roles": [] },
    { "type": "team_admin", "roles": [] }
  ],
  "submissionAccess": [
    { "type": "create_own", "roles": [] },
    { "type": "create_all", "roles": [] },
    { "type": "read_own", "roles": [] },
    { "type": "read_all", "roles": [] },
    { "type": "update_own", "roles": [] },
    { "type": "update_all", "roles": [] },
    { "type": "delete_own", "roles": [] },
    { "type": "delete_all", "roles": [] },
    { "type": "team_read", "roles": [] },
    { "type": "team_write", "roles": [] },
    { "type": "team_admin", "roles": [] }
  ],
  "owner": "6080329e2c806a03c1e15aa4",
  "components": [
    {
      "label": "Text Field",
      "tableView": true,
      "unique": true,
      "key": "textField",
      "type": "textfield",
      "input": true
    },
    {
      "type": "button",
      "label": "Submit",
      "key": "submit",
      "disableOnInvalid": true,
      "input": true,
      "tableView": false
    }
  ],
  "settings": {},
  "properties": {},
  "project": "61029d3b4c9d4e24e774bb15",
  "controller": "",
  "revisions": "",
  "submissionRevisions": "",
  "_vid": 0,
  "created": "2022-08-15T16:02:02.668Z",
  "modified": "2022-10-24T07:30:53.445Z",
  "machineName": "dev-pvbwkiwgifflcai:5376"
};

const submission1row = {
  data: { 
    textField: '1'
  }
};

export default {
  form,
  submission1row,
};