import { Conjunction } from './Conjunction';
export class NandConjunction extends Conjunction {
    static get name() {
        return 'nand';
    }
    static get title() {
        return 'Nand';
    }
    static get weight() {
        return 30;
    }
    static get lazyConditionPartsEvaluation() {
        return true;
    }
    execute(conditionParts) {
        return conditionParts.reduce((result, conditionPart) => (result || !conditionPart()), false);
    }
}
