import _ from 'lodash';
import { BaseCalculatableEntity } from '../BaseCalculatableEntity';
export class Operator extends BaseCalculatableEntity {
    static get hasComplementaryOperator() {
        return false;
    }
    static get complementaryOperatorName() {
        if (!this.hasComplementaryOperator) {
            throw new Error('Complemenraty operator is not allowed.');
        }
        return `not${_.upperFirst(this.name)}`;
    }
    static get complementaryOperatorTitle() {
        if (!this.hasComplementaryOperator) {
            throw new Error('Complemenraty operator is not allowed.');
        }
        return `Not ${this.title}`;
    }
    static get complementaryOperator() {
        if (!this.hasComplementaryOperator) {
            throw new Error('Complemenraty operator is not allowed.');
        }
        const ParentClass = this;
        if (!ParentClass._complementaryOperator) {
            ParentClass._complementaryOperator = class extends ParentClass {
                static get name() {
                    return ParentClass.complementaryOperatorName;
                }
                static get title() {
                    return ParentClass.complementaryOperatorTitle;
                }
                static get complementaryOperatorName() {
                    return ParentClass.name;
                }
                static get complementaryOperatorTitle() {
                    return ParentClass.title;
                }
                static get complementaryOperator() {
                    return ParentClass;
                }
                execute(...args) {
                    return !super.execute(...args);
                }
            };
        }
        return ParentClass._complementaryOperator;
    }
    static get lazyArgsEvaluation() {
        return false;
    }
    // eslint-disable-next-line no-unused-vars
    execute(args, opts) {
        throw new Error('Method #transform() is abstract.');
    }
}
