import { GetDateDifferenceTransformer } from './GetDateDifference';

export class GetQuartersBetweenTransformer extends GetDateDifferenceTransformer {
  static get title() {
    return 'Get Quarters Between';
  }

  static get name() {
    return 'getQuartersBetween';
  }

  static get presetArguments() {
    return {
      unit: {
        valueSource: 'string',
        stringInput: 'quarters',
      },
    };
  }
}
