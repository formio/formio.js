import { GetDateDifferenceTransformer } from './GetDateDifference';

export class GetYearsBetweenTransformer extends GetDateDifferenceTransformer {
  static get title() {
    return 'Get Years Between';
  }

  static get name() {
    return 'getYearsBetween';
  }

  static get presetArguments() {
    return {
      unit: {
        valueSource: 'string',
        stringInput: 'years',
      },
    };
  }
}
