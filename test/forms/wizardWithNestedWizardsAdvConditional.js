export default {
    "_id": "67379d374d2df086c78c93d0",
    "title": "WIZARD",
    "name": "wizard",
    "path": "wizard",
    "type": "form",
    "display": "wizard",
    "tags": [],
    "access": [
        {
            "type": "read_all",
            "roles": [
                "67379d374d2df086c78c93ae",
                "67379d374d2df086c78c93b2",
                "67379d374d2df086c78c93b6"
            ]
        }
    ],
    "submissionAccess": [],
    "owner": null,
    "components": [
        {
            "title": "A",
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
            "key": "page1",
            "type": "panel",
            "label": "Page 1",
            "components": [
                {
                    "_id": "67379d374d2df086c78c93bb",
                    "title": "CHILD A",
                    "name": "childA",
                    "path": "childa",
                    "type": "form",
                    "display": "wizard",
                    "tags": [],
                    "access": [
                        {
                            "type": "read_all",
                            "roles": [
                                "67379d374d2df086c78c93ae",
                                "67379d374d2df086c78c93b2",
                                "67379d374d2df086c78c93b6"
                            ]
                        }
                    ],
                    "submissionAccess": [],
                    "owner": null,
                    "components": [
                        {
                            "title": "A1",
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
                            "key": "page1",
                            "type": "panel",
                            "label": "Page 1",
                            "components": [
                                {
                                    "label": "A1",
                                    "applyMaskOn": "change",
                                    "tableView": true,
                                    "validateWhenHidden": false,
                                    "key": "a",
                                    "type": "textfield",
                                    "input": true
                                }
                            ],
                            "input": false,
                            "tableView": false
                        },
                        {
                            "title": "A2",
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
                            "customConditional": "var b2comp = instance.root.root.getComponent('b2');\nshow = !(b2comp ? b2comp.getValue() === 'hide' : false);",
                            "type": "panel",
                            "label": "Page 2",
                            "input": false,
                            "tableView": false,
                            "components": [
                                {
                                    "label": "A2",
                                    "applyMaskOn": "change",
                                    "tableView": true,
                                    "validateWhenHidden": false,
                                    "key": "a2",
                                    "type": "textfield",
                                    "input": true
                                }
                            ]
                        },
                        {
                            "title": "A3",
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
                            "key": "page3",
                            "type": "panel",
                            "label": "Page 3",
                            "input": false,
                            "tableView": false,
                            "components": [
                                {
                                    "label": "A3",
                                    "applyMaskOn": "change",
                                    "tableView": true,
                                    "validateWhenHidden": false,
                                    "key": "a3",
                                    "type": "textfield",
                                    "input": true
                                }
                            ]
                        }
                    ],
                    "pdfComponents": [],
                    "settings": {},
                    "properties": {},
                    "machineName": "authoring-qwwqrlcmffdcymd:childA",
                    "project": "67379d374d2df086c78c93a4",
                    "controller": "",
                    "revisions": "",
                    "submissionRevisions": "",
                    "_vid": 0,
                    "created": "2024-11-15T19:12:55.899Z",
                    "modified": "2024-11-15T19:12:55.901Z"
                }
            ],
            "input": false,
            "tableView": false
        },
        {
            "title": "B",
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
                    "_id": "67379d374d2df086c78c93c2",
                    "title": "CHILD B",
                    "name": "childB",
                    "path": "childb",
                    "type": "form",
                    "display": "wizard",
                    "tags": [],
                    "access": [
                        {
                            "type": "read_all",
                            "roles": [
                                "67379d374d2df086c78c93ae",
                                "67379d374d2df086c78c93b2",
                                "67379d374d2df086c78c93b6"
                            ]
                        }
                    ],
                    "submissionAccess": [],
                    "owner": null,
                    "components": [
                        {
                            "title": "B1",
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
                            "key": "page1",
                            "type": "panel",
                            "label": "Page 1",
                            "components": [
                                {
                                    "label": "B1",
                                    "applyMaskOn": "change",
                                    "tableView": true,
                                    "validateWhenHidden": false,
                                    "key": "b",
                                    "type": "textfield",
                                    "input": true
                                }
                            ],
                            "input": false,
                            "tableView": false
                        },
                        {
                            "title": "B2",
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
                            "input": false,
                            "tableView": false,
                            "components": [
                                {
                                    "label": "B2",
                                    "applyMaskOn": "change",
                                    "tableView": true,
                                    "validateWhenHidden": false,
                                    "key": "b2",
                                    "type": "textfield",
                                    "input": true
                                }
                            ]
                        },
                        {
                            "title": "B3",
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
                            "key": "page3",
                            "type": "panel",
                            "label": "Page 3",
                            "input": false,
                            "tableView": false,
                            "components": [
                                {
                                    "label": "B3",
                                    "applyMaskOn": "change",
                                    "tableView": true,
                                    "validate": {
                                        "required": true
                                    },
                                    "validateWhenHidden": false,
                                    "key": "b3",
                                    "type": "textfield",
                                    "input": true
                                }
                            ]
                        }
                    ],
                    "pdfComponents": [],
                    "settings": {},
                    "properties": {},
                    "machineName": "authoring-qwwqrlcmffdcymd:childB",
                    "project": "67379d374d2df086c78c93a4",
                    "controller": "",
                    "revisions": "",
                    "submissionRevisions": "",
                    "_vid": 0,
                    "created": "2024-11-15T19:12:55.909Z",
                    "modified": "2024-11-15T19:12:55.911Z"
                }
            ],
            "input": false,
            "tableView": false
        },
        {
            "title": "C",
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
            "key": "page3",
            "type": "panel",
            "label": "Page 3",
            "components": [
                {
                    "_id": "67379d374d2df086c78c93c9",
                    "title": "CHILD C",
                    "name": "childC",
                    "path": "childc",
                    "type": "form",
                    "display": "wizard",
                    "tags": [],
                    "access": [
                        {
                            "type": "read_all",
                            "roles": [
                                "67379d374d2df086c78c93ae",
                                "67379d374d2df086c78c93b2",
                                "67379d374d2df086c78c93b6"
                            ]
                        }
                    ],
                    "submissionAccess": [],
                    "owner": null,
                    "components": [
                        {
                            "title": "C1",
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
                            "key": "page1",
                            "type": "panel",
                            "label": "Page 1",
                            "components": [
                                {
                                    "label": "C1",
                                    "applyMaskOn": "change",
                                    "tableView": true,
                                    "validateWhenHidden": false,
                                    "key": "c1",
                                    "type": "textfield",
                                    "input": true
                                }
                            ],
                            "input": false,
                            "tableView": false
                        },
                        {
                            "title": "C2",
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
                            "input": false,
                            "tableView": false,
                            "components": [
                                {
                                    "label": "C2",
                                    "applyMaskOn": "change",
                                    "tableView": true,
                                    "validateWhenHidden": false,
                                    "key": "c2",
                                    "type": "textfield",
                                    "input": true
                                }
                            ]
                        },
                        {
                            "title": "C3",
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
                            "key": "page3",
                            "type": "panel",
                            "label": "Page 3",
                            "input": false,
                            "tableView": false,
                            "components": [
                                {
                                    "label": "C3",
                                    "applyMaskOn": "change",
                                    "tableView": true,
                                    "validateWhenHidden": false,
                                    "key": "c3",
                                    "type": "textfield",
                                    "input": true
                                }
                            ]
                        }
                    ],
                    "pdfComponents": [],
                    "settings": {},
                    "properties": {},
                    "machineName": "authoring-qwwqrlcmffdcymd:childC",
                    "project": "67379d374d2df086c78c93a4",
                    "controller": "",
                    "revisions": "",
                    "submissionRevisions": "",
                    "_vid": 0,
                    "created": "2024-11-15T19:12:55.919Z",
                    "modified": "2024-11-15T19:12:55.921Z"
                }
            ],
            "input": false,
            "tableView": false
        }
    ],
    "pdfComponents": [],
    "settings": {

    },
    "properties": {

    },
    "machineName": "authoring-qwwqrlcmffdcymd:wizard",
    "project": "67379d374d2df086c78c93a4",
    "controller": "",
    "revisions": "",
    "submissionRevisions": "",
    "_vid": 0,
    "created": "2024-11-15T19:12:55.928Z",
    "modified": "2024-11-15T19:12:55.930Z"
}