"use strict";
import { Formio } from './formio.full';
import  gridFactory  from './gridFactory';

export class FormioGrid {
  constructor(element, form, options) {
    this.instance = null;
    this.element = element;
    this.form = form;
    this.options = options;
  }

  loadGrid() {
    this.instance = null;
    this.instance = gridFactory(this.element, this.form, this.options);
    return this.instance.ready.then(() => this.instance);
  }
}

/**
 * Creates a new form based on the form parameter.
 *
 * @param element {HMTLElement} - The HTML Element to add this form to.
 * @param form {string|Object} - The src of the form, or a form object.
 * @param options {Object} - The options to create this form.
 *
 * @return {Promise} - When the form is instance is ready.
 */
Formio.grid = (element, form, options) => {
  let grid = new FormioGrid(element, form, options);
  return grid.loadGrid();
};

Formio.Grid = FormioGrid;
exports.Formio = global.Formio = Formio;
