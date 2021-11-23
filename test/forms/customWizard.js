export default {
  'type': 'form',
  'components': [{
    'title': 'Page 1',
    'breadcrumbClickable': true,
    'buttonSettings': {
      'previous': false,
      'cancel': false,
      'next': false
    },
    'scrollToTop': false,
    'collapsible': false,
    'key': 'page1',
    'type': 'panel',
    'label': 'Page 1',
    'components': [{
      'label': 'Text Field',
      'tableView': true,
      'protected': true,
      'key': 'textField',
      'type': 'textfield',
      'input': true
    }, {
      'label': 'Columns',
      'columns': [{
        'components': [],
        'width': 6,
        'offset': 0,
        'push': 0,
        'pull': 0,
        'size': 'md'
      }, {
        'components': [{
          'label': 'next page',
          'action': 'event',
          'showValidations': false,
          'theme': 'success',
          'block': true,
          'tableView': false,
          'key': 'nextPage',
          'type': 'button',
          'input': true,
          'event': 'goToNextPage',
          'hideOnChildrenHidden': false
        }],
        'width': 6,
        'offset': 0,
        'push': 0,
        'pull': 0,
        'size': 'md'
      }],
      'key': 'columns',
      'type': 'columns',
      'input': false,
      'tableView': false
    }],
    'input': false,
    'tableView': false
  }, {
    'title': 'Page 2',
    'breadcrumbClickable': true,
    'buttonSettings': {
      'previous': false,
      'cancel': false,
      'next': false
    },
    'scrollToTop': false,
    'collapsible': false,
    'key': 'page2',
    'type': 'panel',
    'label': 'Page 2',
    'components': [{
      'label': 'Number',
      'mask': false,
      'spellcheck': true,
      'tableView': false,
      'delimiter': false,
      'requireDecimal': false,
      'inputFormat': 'plain',
      'key': 'number',
      'type': 'number',
      'input': true
    }, {
      'label': 'Columns',
      'columns': [{
        'components': [{
          'label': 'prev page',
          'action': 'event',
          'showValidations': false,
          'block': true,
          'tableView': false,
          'key': 'prevPage',
          'type': 'button',
          'input': true,
          'event': 'goToPrevPage',
          'hideOnChildrenHidden': false
        }],
        'width': 6,
        'offset': 0,
        'push': 0,
        'pull': 0,
        'size': 'md'
      }, {
        'components': [{
          'label': 'next page',
          'action': 'event',
          'showValidations': false,
          'theme': 'success',
          'block': true,
          'tableView': false,
          'key': 'nextPage1',
          'type': 'button',
          'input': true,
          'event': 'goToNextPage',
          'hideOnChildrenHidden': false
        }],
        'width': 6,
        'offset': 0,
        'push': 0,
        'pull': 0,
        'size': 'md'
      }],
      'key': 'columns1',
      'type': 'columns',
      'input': false,
      'tableView': false
    }],
    'input': false,
    'tableView': false
  }, {
    'title': 'Page 3',
    'breadcrumbClickable': true,
    'buttonSettings': {
      'previous': false,
      'cancel': false,
      'next': false
    },
    'scrollToTop': false,
    'collapsible': false,
    'key': 'page3',
    'type': 'panel',
    'label': 'Page 3',
    'components': [{
      'label': 'Text Area',
      'autoExpand': false,
      'tableView': true,
      'key': 'textArea1',
      'type': 'textarea',
      'input': true
    }, {
      'label': 'Columns',
      'columns': [{
        'components': [{
          'label': 'prev page',
          'action': 'event',
          'showValidations': false,
          'block': true,
          'tableView': false,
          'key': 'prevPage1',
          'type': 'button',
          'input': true,
          'event': 'goToPrevPage',
          'hideOnChildrenHidden': false
        }],
        'width': 6,
        'offset': 0,
        'push': 0,
        'pull': 0,
        'size': 'md'
      }, {
        'components': [ {
          'label': 'save',
          'action': 'event',
          'showValidations': false,
          'theme': 'warning',
          'block': true,
          'tableView': false,
          'key': 'save',
          'type': 'button',
          'input': true,
          'event': 'saveSubmission'
        }],
        'width': 6,
        'offset': 0,
        'push': 0,
        'pull': 0,
        'size': 'md'
      }],
      'key': 'columns4',
      'type': 'columns',
      'input': false,
      'tableView': false
    },],
    'input': false,
    'tableView': false
  }],
  'revisions': '',
  '_vid': 0,
  'title': 'draft wizard pages',
  'display': 'wizard',
  'name': 'draftWizardPages',
  'path': 'draftwizardpages',
};
