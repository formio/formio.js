'use strict';

if (typeof Formio !== 'undefined') {
  Formio.contrib = require('./contrib');
} else {
  console.warn('You must include formio.full to include the Contributed modules.');
}