"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  unsavedRowsError: 'Please save all rows before proceeding.',
  invalidRowsError: 'Please correct invalid rows before proceeding.',
  invalidRowError: 'Invalid row. Please correct it or delete.',
  alertMessageWithLabel: '{{label}}: {{message}}',
  alertMessage: '{{message}}',
  complete: 'Submission Complete',
  error: 'Please fix the following errors before submitting.',
  errorListHotkey: 'Press Ctrl + Alt + X to go back to the error list.',
  errorsListNavigationMessage: 'Click to navigate to the field with following error.',
  submitError: 'Please check the form and correct all errors before submitting.',
  required: '{{field}} is required',
  unique: '{{field}} must be unique',
  array: '{{field}} must be an array',
  array_nonempty: '{{field}} must be a non-empty array',
  // eslint-disable-line camelcase
  nonarray: '{{field}} must not be an array',
  select: '{{field}} contains an invalid selection',
  pattern: '{{field}} does not match the pattern {{pattern}}',
  minLength: '{{field}} must have at least {{length}} characters.',
  maxLength: '{{field}} must have no more than {{length}} characters.',
  minWords: '{{field}} must have at least {{length}} words.',
  maxWords: '{{field}} must have no more than {{length}} words.',
  min: '{{field}} cannot be less than {{min}}.',
  max: '{{field}} cannot be greater than {{max}}.',
  maxDate: '{{field}} should not contain date after {{- maxDate}}',
  minDate: '{{field}} should not contain date before {{- minDate}}',
  maxYear: '{{field}} should not contain year greater than {{maxYear}}',
  minYear: '{{field}} should not contain year less than {{minYear}}',
  invalid_email: '{{field}} must be a valid email.',
  // eslint-disable-line camelcase
  invalid_url: '{{field}} must be a valid url.',
  // eslint-disable-line camelcase
  invalid_regex: '{{field}} does not match the pattern {{regex}}.',
  // eslint-disable-line camelcase
  invalid_date: '{{field}} is not a valid date.',
  // eslint-disable-line camelcase
  invalid_day: '{{field}} is not a valid day.',
  // eslint-disable-line camelcase
  mask: '{{field}} does not match the mask.',
  valueIsNotAvailable: '{{ field }} is an invalid value.',
  stripe: '{{stripe}}',
  month: 'Month',
  day: 'Day',
  year: 'Year',
  january: 'January',
  february: 'February',
  march: 'March',
  april: 'April',
  may: 'May',
  june: 'June',
  july: 'July',
  august: 'August',
  september: 'September',
  october: 'October',
  november: 'November',
  december: 'December',
  next: 'Next',
  previous: 'Previous',
  cancel: 'Cancel',
  submit: 'Submit Form',
  confirmCancel: 'Are you sure you want to cancel?',
  saveDraftInstanceError: 'Cannot save draft because there is no formio instance.',
  saveDraftAuthError: 'Cannot save draft unless a user is authenticated.',
  restoreDraftInstanceError: 'Cannot restore draft because there is no formio instance.',
  time: 'Invalid time'
};
exports.default = _default;