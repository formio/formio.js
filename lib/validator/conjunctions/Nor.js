import { Conjunction } from './Conjunction';
export class NorConjunction extends Conjunction {
    static get name() {
        return 'nor';
    }
    static get title() {
        return 'Nor';
    }
    static get weight() {
        return 40;
    }
    static get lazyConditionPartsEvaluation() {
        return true;
    }
    execute(conditionParts) {
        return conditionParts.reduce((result, conditionPart) => (result && !conditionPart()), true);
    }
}
