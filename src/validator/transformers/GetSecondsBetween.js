import { GetDateDifferenceTransformer } from './GetDateDifference';

export class GetSecondsBetweenTransformer extends GetDateDifferenceTransformer {
  static get title() {
    return 'Get Seconds Between';
  }

  static get name() {
    return 'getSecondsBetween';
  }

  static get presetArguments() {
    return {
      unit: {
        valueSource: 'string',
        stringInput: 'seconds',
      },
    };
  }
}
