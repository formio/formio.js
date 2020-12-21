import { Component } from '../component/component';

export class ComponentModal {
  constructor(component: Component | any, element: any, isOpened: boolean, currentValue: any);
  public isOpened: boolean;
  public component: Component | any;
  public element: any;
  public currentValue: any;
  public dataLoaded: boolean;
  static render(component: Component | any, data: any, topLevel: boolean): any;
  readonly refs: any;
  init(): void;
  setValue(value: any): any;
  setOpenModalElement(template: string): void;
  readonly templateRefs: any;
  loadRefs(): void;
  removeEventListeners(): void;
  setEventListeners(): void;
  isValueChanged(): boolean;
  setOpenEventListener(): void;
  openModalHandler(event: Event): void;
  positionOverElement(): void;
  openModal(): void;
  updateView(): void;
  closeModal(): void;
  closeModalHandler(event: Event): void;
  showDialog(): void;
  closeDialog(event: Event): void;
  saveDialog(event: Event): void;
  saveModalValueHandler(event: Event): void;
}
