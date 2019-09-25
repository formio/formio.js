import { Field } from '../field/field';

export class Multivalue extends Field {
  public dataValue: any;
  readonly defaultValue: any;
  readonly addAnother: any;
  useWrapper(): boolean;
  renderRow(value: any, index: any): any;
  attach(dom: any): any;
  attachElement(element: any, index: number | string): any;
  onSelectMaskHandler(event: any): void;
  tryAttachMultipleMasksInput(): boolean;
  updateMask(input: any, mask: any): void;
  addNewValue(value: any): void;
  addValue(): void;
}
