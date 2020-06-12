import { GetDateDifferenceTransformer } from './GetDateDifference';

export class GetWeeksBetweenTransformer extends GetDateDifferenceTransformer {
  static get title() {
    return 'Get Weeks Between';
  }

  static get name() {
    return 'getWeeksBetween';
  }

  static get presetArguments() {
    return {
      unit: {
        valueSource: 'string',
        stringInput: 'weeks',
      },
    };
  }
}
