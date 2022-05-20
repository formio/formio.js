import { Element } from './element';

export class Form extends Element {
  form: any;
  instance: any;
  ready: Promise<any>;
  constructor(...args: any[]);
  create(display: 'wizard' | 'form' | 'pdf'): any;
  setForm(formParam: any): any;
  setDisplay(display: any): any;
  empty(): void;
  render(): any | Promise<any>;
  static embed(element: any): any;
  sanitize(dirty: string): any;
  setContent(element: any, content: any): boolean;
  build(): Promise<any>;
  attach(element: any): any | Promise<any>;
}
