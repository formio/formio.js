export class Providers {
  static readonly providers: any;
  static addProvider(type: string, name: string, provider:any): void;
  static addProviders(type:string, providers: any): void;
  static getProvider(type: string, name: string): any;
  static getProviders(type: string): any;
}

