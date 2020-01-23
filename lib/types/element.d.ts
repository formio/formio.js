import { EventEmitter } from './eventEmitter.d';

export class Element {
  options: Object;
  id: string;
  eventHandlers: any[];
  i18next: any;
  events: EventEmitter;
  defaultMask: any;
  inputMasks: any[];
  constructor(options: any);
  on(event: string, cb: Function, internal: boolean, once?: boolean): any;
  once(event: string, cb: Function, internal: boolean): any;
  onAny(cb: Function): any;
  off(event: string): void;
  emit(event: string, data: Object): void;
  addEventListener(obj: HTMLElement, type: string, func: Function, persistent?: boolean): any;
  removeEventListener(obj: Object, type: any): any;
  removeEventListeners(): void;
  removeAllEvents(includeExternal: boolean): void;
  destroy(): void;
  appendTo(element: HTMLElement, container: HTMLElement): any;
  prependTo(element: HTMLElement, container: HTMLElement): any;
  removeChildFrom(element: HTMLElement, container: HTMLElement): any;
  ce(type: string, attr?: Object, children?: HTMLElement | string | Array<HTMLElement | string>): HTMLElement;
  appendChild(element: any, child: any): any;
  maskPlaceholder(mask: HTMLElement): string;
  setInputMask(input: HTMLElement, inputMask: string, placeholder: boolean): void;
  t(text: string, params?: Object): string;
  text(text: string): Text;
  attr(element: HTMLElement, attr: Object): void;
  hasClass(element: HTMLElement | any, className: string): boolean;
  addClass(element: HTMLElement, className: string): any;
  removeClass(element: HTMLElement, className: string): any;
  empty(element: HTMLElement): void;
  evalContext(additional: any): any;
  interpolate(string: any, data: any): any;
  evaluate(
    func: any,
    args: { component: any; form: any; instance: any; row: any; data: any } | any,
    ret: any,
    tokenize?: any,
  ): any;
  hook(...args: any[]): any;
}
