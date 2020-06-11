import { AndConjunction } from './And';
import { NandConjunction } from './Nand';
import { NorConjunction } from './Nor';
import { OrConjunction } from './Or';
import { XorConjunction } from './Xor';
const conjunctions = [
    AndConjunction,
    NandConjunction,
    NorConjunction,
    OrConjunction,
    XorConjunction,
].reduce((result, valueSource) => (Object.assign(Object.assign({}, result), { [valueSource.name]: valueSource })), {});
export class Conjunctions {
    static addConjunction(name, conjunction) {
        Conjunctions.conjunctions[name] = conjunction;
    }
    static addConjunctions(conjunctions) {
        Conjunctions.conjunctions = Object.assign(Object.assign({}, Conjunctions.conjunctions), conjunctions);
    }
    static getConjunction(name) {
        return Conjunctions.conjunctions[name];
    }
    static getConjunctions() {
        return Conjunctions.conjunctions;
    }
}
Conjunctions.conjunctions = conjunctions;
