import Multivalue from '../multivalue/Multivalue';
import _ from 'lodash';
export default class Input extends Multivalue {
    constructor(component, options, data) {
        super(component, options, data);
        this.triggerUpdateValueAt = _.debounce(this.updateValueAt.bind(this), 100);
    }
    get inputInfo() {
        const attr = {
            name: this.options.name,
            type: this.component.inputType || 'text',
            class: 'form-control',
            lang: this.options.language
        };
        if (this.component.placeholder) {
            attr.placeholder = this.t(this.component.placeholder);
        }
        if (this.component.tabindex) {
            attr.tabindex = this.component.tabindex;
        }
        if (this.disabled) {
            attr.disabled = 'disabled';
        }
        _.defaults(attr, this.component.attributes);
        return {
            id: this.key,
            type: 'input',
            changeEvent: 'input',
            content: '',
            attr
        };
    }
    get maskOptions() {
        return _.map(this.component.inputMasks, mask => {
            return {
                label: mask.label,
                value: mask.label
            };
        });
    }
    get isMultipleMasksField() {
        return this.component.allowMultipleMasks && !!this.component.inputMasks && !!this.component.inputMasks.length;
    }
    get disabled() {
        return super.disabled;
    }
    set disabled(disabled) {
        super.disabled = disabled;
        if (this.refs && this.refs.input) {
            this.refs.input.forEach((input) => {
                if (disabled) {
                    input.setAttribute('disabled', 'disabled');
                }
                else {
                    input.removeAttribute('disabled');
                }
            });
        }
    }
    getMaskByName(maskName) {
        const inputMask = _.find(this.component.inputMasks, (inputMask) => {
            return inputMask.label === maskName;
        });
        return inputMask ? inputMask.mask : undefined;
    }
    setInputMask(input, inputMask) {
        return super.setInputMask(input, (inputMask || this.component.inputMask), !this.component.placeholder);
    }
    getMaskOptions() {
        return this.component.inputMasks
            .map(mask => ({
            label: mask.label,
            value: mask.label,
        }));
    }
    getWordCount(value) {
        if (this.editors) {
            return value.trim() ? value.trim().split(/\s+/).length : 0;
        }
        return _.words(value).length;
    }
    get remainingWords() {
        const maxWords = _.parseInt(_.get(this.component, 'validate.maxWords'), 10);
        const wordCount = this.getWordCount(this.dataValue);
        return maxWords - wordCount;
    }
    renderElement(value, index) {
        // Double quotes cause the input value to close so replace them with html quote char.
        if (value && typeof value === 'string') {
            value = value.replace(/"/g, '&quot;');
        }
        const info = this.inputInfo;
        info.attr = info.attr || {};
        info.attr.value = this.getValueAsString(this.formatValue(this.parseValue(value)));
        if (this.isMultipleMasksField) {
            info.attr.class += ' formio-multiple-mask-input';
        }
        return this.isMultipleMasksField
            ? this.renderTemplate('multipleMasksInput', {
                input: info,
                value,
                index,
                selectOptions: this.getMaskOptions() || [],
            })
            : this.renderTemplate('input', {
                input: info,
                value: this.formatValue(this.parseValue(value)),
                index
            });
    }
    setCounter(type, element, count, max) {
        if (max) {
            const remaining = max - count;
            if (remaining > 0) {
                this.removeClass(element, 'text-danger');
            }
            else {
                this.addClass(element, 'text-danger');
            }
            this.setContent(element, this.t(`{{ remaining }} ${type} remaining.`, {
                remaining: remaining
            }));
        }
        else {
            this.setContent(element, this.t(`{{ count }} ${type}`, {
                count: count
            }));
        }
    }
    updateValueAt(value, flags, index) {
        flags = flags || {};
        if (_.get(this.component, 'showWordCount', false)) {
            if (this.refs.wordcount && this.refs.wordcount[index]) {
                const maxWords = _.parseInt(_.get(this.component, 'validate.maxWords', 0), 10);
                this.setCounter(this.t('words'), this.refs.wordcount[index], this.getWordCount(value), maxWords);
            }
        }
        if (_.get(this.component, 'showCharCount', false)) {
            if (this.refs.charcount && this.refs.charcount[index]) {
                const maxChars = _.parseInt(_.get(this.component, 'validate.maxLength', 0), 10);
                this.setCounter(this.t('characters'), this.refs.charcount[index], value.length, maxChars);
            }
        }
    }
    getValueAt(index) {
        const input = this.refs.input[index];
        return input ? input.value : undefined;
    }
    updateValue(value, flags, index) {
        flags = flags || {};
        const changed = super.updateValue(value, flags);
        this.triggerUpdateValueAt(this.dataValue, flags, index);
        return changed;
    }
    parseValue(value) {
        return value;
    }
    formatValue(value) {
        return value;
    }
    attach(element) {
        this.loadRefs(element, {
            charcount: 'multiple',
            wordcount: 'multiple',
            prefix: 'multiple',
            suffix: 'multiple'
        });
        return super.attach(element);
    }
    attachElement(element, index) {
        super.attachElement(element, index);
        if (this.options.submitOnEnter) {
            this.addEventListener(element, 'keypress', (event) => {
                const key = event.keyCode || event.which;
                if (key === 13) {
                    event.preventDefault();
                    event.stopPropagation();
                    this.emit('submitButton');
                }
            });
        }
    }
}
