export class Licenses {
  static readonly licenses: any;
  static addLicense(name: string, license: any): void;
  static removeLicense(name: string): void;
  static getLicense(name: string): any;
  static getLicenses(): any;
}
