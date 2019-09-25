import { Component } from '../component/component';
import { Multivalue } from '../multivalue/multivalue';
import { Element } from './../../../element.d';

export class Input extends Multivalue {
  constructor(component: Component | any, options: Object, data: any);
  readonly inputInfo: {
    id: string | number;
    type: string;
    changeEvent: string;
    content?: any;
    attr: any;
  };
  readonly maskOptions: { label: any; value: any }[];
  readonly isMultipleMasksField: boolean;
  getMaskByName(maskName: string): any;
  setInputMask(input: any, inputMask: any): any;
  getMaskOptions(): { label: any; value: any }[];
  readonly remainingWords: number;
  renderElement(value: any, index: string | number): any;
  setCounter(type: string, element: any | Element, count: number, max: number): void;
  updateValueAt(value: any, flags: any, index: string | number): void;
  getValueAt(index: string | number): any;
  updateValue(value: any, flags: any, index: string | number): any;
  attach(element: any): any;
  attachElement(element: any | Element, index: string | number): void;
  readonly widget: any;
  createWidget(index: string | number): any;
  addFocusBlurEvents(element: any | Element): void;
}
