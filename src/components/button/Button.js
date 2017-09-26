import { BaseComponent } from '../base/Base';
import FormioUtils from '../../utils';
import _each from 'lodash/each';

export class ButtonComponent extends BaseComponent {
  elementInfo() {
    let info = super.elementInfo();
    info.type = 'button';
    info.attr.type = (this.component.action === 'submit') ? 'submit' : 'button';
    info.attr.class = 'btn btn-' + this.component.theme;
    if (this.component.block) {
      info.attr.class += ' btn-block';
    }
    if (this.component.customClass) {
      info.attr.class += ' ' + this.component.customClass;
    }
    return info;
  }

  set loading(loading) {
    this._loading = loading;
    if (!this.loader && loading) {
      this.loader = this.ce('i', {
        class: 'glyphicon glyphicon-refresh glyphicon-spin button-icon-right'
      });
    }
    if (this.loader) {
      if (loading) {
        this.element.appendChild(this.loader);
      }
      else {
        this.element.removeChild(this.loader);
      }
    }
  }

  set disabled(disabled) {
    super.disabled = disabled;
    if (disabled) {
      this.element.setAttribute('disabled', 'disabled');
    }
    else {
      this.element.removeAttribute('disabled');
    }
  }

  build() {
    this.element = this.ce(this.info.type, this.info.attr);
    if (this.component.label) {
      this.labelElement = this.text(this.component.label);
      this.element.appendChild(this.labelElement);
    }
    if (this.component.action === 'submit') {
      this.on('submitButton', () => {
        this.loading = true;
        this.disabled = true;
      }, true);
      this.on('submitDone', () => {
        this.loading = false;
        this.disabled = false;
      }, true);
      this.on('error', () => {
        this.loading = false;
      }, true);
    }
    this.addEventListener(this.element, 'click', (event) => {
      switch (this.component.action) {
        case 'submit':
          event.preventDefault();
          event.stopPropagation();
          this.emit('submitButton');
          break;
        case 'event':
          this.events.emit(this.component.event, this.data);
          this.emit('customEvent', {
            type: this.component.event,
            component: this.component,
            data: this.data,
            event: event
          });
          break;
        case 'custom':
          // Get the FormioForm at the root of this component's tree
          var form       = this.getRoot();
          // Get the form's flattened schema components
          var flattened  = FormioUtils.flattenComponents(form.component.components, true);
          // Create object containing the corresponding HTML element components
          var components = {};
          _each(flattened, function(component, key) {
            var element = form.getComponent(key);
            if (element) {
              components[key] = element;
            }
          });
          // Make data available to script
          var data = this.data;
          try {
            eval(this.component.custom.toString());
          }
          catch (e) {
            /* eslint-disable no-console */
            console.warn('An error occurred evaluating custom logic for ' + this.key, e);
            /* eslint-enable no-console */
          }
          break;
        case 'reset':
          this.emit('resetForm');
          break;
        case 'oauth':
          console.log('OAuth currently not supported.');
          break;
      }
    });
    if (this.options.readOnly) {
      this.disabled = true;
    }
  }
}
