import { Component } from '../component/component';

export class Field extends Component {
  render(element: any): any;
  clearErrorClasses(fields: any[]): void;
  setErrorClasses(elements: any[], dirty: boolean, hasError: boolean, hasMessage: boolean): void;
}
