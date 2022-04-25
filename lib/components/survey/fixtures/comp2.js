"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  'conditional': {
    'eq': '',
    'when': null,
    'show': ''
  },
  'tags': [],
  'type': 'survey',
  'validate': {
    'customPrivate': false,
    'custom': '',
    'required': true
  },
  'persistent': true,
  'protected': false,
  'defaultValue': '',
  'values': [{
    'label': 'Excellent',
    'value': 'excellent'
  }, {
    'label': 'Good',
    'value': 'good'
  }, {
    'label': 'Average',
    'value': 'average'
  }, {
    'label': 'Inadequate',
    'value': 'inadequate'
  }, {
    'label': 'Bad',
    'value': 'bad'
  }],
  'questions': [{
    'label': 'How do you like our service?',
    'value': 'service'
  }, {
    'label': 'How would you rate the technology?',
    'value': 'howWouldYouRateTheTechnology'
  }],
  'key': 'surveyQuestions',
  'label': 'Survey Questions',
  'tableView': true,
  'input': true
};
exports.default = _default;