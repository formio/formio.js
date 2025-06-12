export default {
    "_id": "6740b7686f3a02cd736b5750",
    "title": "form123",
    "name": "form123",
    "path": "form123",
    "type": "form",
    "display": "wizard",
    "tags": [],
    "access": [
        {
            "type": "read_all",
            "roles": [
                "6740b7686f3a02cd736b56f3",
                "6740b7686f3a02cd736b56f7",
                "6740b7686f3a02cd736b56fb",
                "6740b7686f3a02cd736b56ff",
                "6740b7686f3a02cd736b5703",
                "6740b7686f3a02cd736b5707",
                "6740b7686f3a02cd736b570b",
                "6740b7686f3a02cd736b570f",
                "6740b7686f3a02cd736b5713",
                "6740b7686f3a02cd736b5717",
                "6740b7686f3a02cd736b571b",
                "6740b7686f3a02cd736b571f",
                "6740b7686f3a02cd736b5723",
                "6740b7686f3a02cd736b5727",
                "6740b7686f3a02cd736b572b",
                "6740b7686f3a02cd736b572f",
                "6740b7686f3a02cd736b5733",
                "6740b7686f3a02cd736b5737",
                "6740b7686f3a02cd736b573b",
                "6740b7686f3a02cd736b573f",
                "6740b7686f3a02cd736b5743",
                "6740b7686f3a02cd736b5747",
                "6740b7686f3a02cd736b574b"
            ]
        }
    ],
    "submissionAccess": [],
    "owner": null,
    "components": [
        {
            "title": "Page 1",
            "breadcrumbClickable": true,
            "buttonSettings": {
                "previous": true,
                "cancel": false,
                "next": true
            },
            "navigateOnEnter": false,
            "saveOnEnter": false,
            "scrollToTop": false,
            "collapsible": false,
            "key": "page1",
            "type": "panel",
            "label": "Page 1",
            "components": [
                {
                    "label": "Text Field",
                    "applyMaskOn": "change",
                    "tableView": true,
                    "validate": {
                        "required": true
                    },
                    "key": "textField",
                    "type": "textfield",
                    "input": true
                }
            ],
            "input": false,
            "tableView": false
        },
        {
            "title": "Page 2",
            "breadcrumbClickable": true,
            "buttonSettings": {
                "previous": true,
                "cancel": true,
                "next": true
            },
            "navigateOnEnter": false,
            "saveOnEnter": false,
            "scrollToTop": false,
            "collapsible": false,
            "key": "page2",
            "type": "panel",
            "label": "Page 2",
            "components": [
                {
                    "label": "Number",
                    "applyMaskOn": "change",
                    "mask": false,
                    "tableView": false,
                    "delimiter": false,
                    "requireDecimal": false,
                    "inputFormat": "plain",
                    "truncateMultipleSpaces": false,
                    "key": "number",
                    "type": "number",
                    "input": true
                }
            ],
            "input": false,
            "tableView": false
        },
        {
            "title": "Page 3",
            "label": "Page 3",
            "type": "panel",
            "key": "page3",
            "components": [
                {
                    "label": "Text Field",
                    "applyMaskOn": "change",
                    "tableView": true,
                    "validate": {
                        "required": true
                    },
                    "validateWhenHidden": false,
                    "key": "textField1",
                    "type": "textfield",
                    "input": true
                }
            ],
            "input": false,
            "tableView": false
        }
    ],
    "pdfComponents": [],
    "settings": {},
    "properties": {},
    "machineName": "authoring-bsajzvvuohccvoq:form123",
    "project": "6740b7686f3a02cd736b56e9",
    "controller": "",
    "revisions": "",
    "submissionRevisions": "",
    "_vid": 0,
    "created": "2024-11-22T16:55:04.926Z",
    "modified": "2024-11-22T16:55:04.928Z"
};