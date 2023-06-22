export default {
'_id': '64901198a11ba83edcab8d72',
'title': 'Grid',
'name': 'grid',
'path': 'grid',
'type': 'form',
'display': 'form',
'tags': [],
'access': [
{
'type': 'create_own',
'roles': []
},
{
'type': 'create_all',
'roles': []
},
{
'type': 'read_own',
'roles': []
},
{
'type': 'read_all',
'roles': [
'6461f163ff1fbaac97952148',
'6461f163ff1fbaac9795214c',
'6461f163ff1fbaac97952150'
]
},
{
'type': 'update_own',
'roles': []
},
{
'type': 'update_all',
'roles': []
},
{
'type': 'delete_own',
'roles': []
},
{
'type': 'delete_all',
'roles': []
},
{
'type': 'team_read',
'roles': []
},
{
'type': 'team_write',
'roles': []
},
{
'type': 'team_admin',
'roles': []
}
],
'submissionAccess': [
{
'type': 'create_own',
'roles': []
},
{
'type': 'create_all',
'roles': []
},
{
'type': 'read_own',
'roles': []
},
{
'type': 'read_all',
'roles': []
},
{
'type': 'update_own',
'roles': []
},
{
'type': 'update_all',
'roles': []
},
{
'type': 'delete_own',
'roles': []
},
{
'type': 'delete_all',
'roles': []
},
{
'type': 'team_read',
'roles': []
},
{
'type': 'team_write',
'roles': []
},
{
'type': 'team_admin',
'roles': []
}
],
'owner': '644aa4ef4a5451ef0d2500f3',
'components': [
{
'label': 'DAT',
'tableView': false,
'validate': {
'minLength': 6
},
'rowDrafts': false,
'key': 'da',
'type': 'editgrid',
'displayAsTable': false,
'input': true,
'components': [
{
'label': 'Text',
'applyMaskOn': 'change',
'tableView': true,
'key': 'text',
'type': 'textfield',
'input': true
},
{
'label': 'Number',
'applyMaskOn': 'change',
'mask': false,
'tableView': false,
'delimiter': false,
'requireDecimal': false,
'inputFormat': 'plain',
'truncateMultipleSpaces': false,
'key': 'number',
'type': 'number',
'input': true
}
]
},
{
'type': 'button',
'label': 'Submit',
'key': 'submit',
'disableOnInvalid': true,
'input': true,
'tableView': false
}
],
'settings': {},
'properties': {},
'project': '6461f163ff1fbaac97952141',
'controller': '',
'revisions': '',
'submissionRevisions': '',
'_vid': 0,
'created': '2023-06-19T08:28:08.615Z',
'modified': '2023-06-22T06:02:19.237Z',
'machineName': 'yoxxdgkhrcoujho:grid'
};
