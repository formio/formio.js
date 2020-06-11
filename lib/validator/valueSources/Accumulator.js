import { ValueSource } from './ValueSource';
export class AccumulatorValueSource extends ValueSource {
    static get name() {
        return 'accumulator';
    }
    static get title() {
        return 'Accumulator';
    }
    static get weight() {
        return 640;
    }
    getValue() {
        return this.getOption('accumulator');
    }
}
