import { BaseComponent } from '../base/Base';
import oAuthProvider from '../../providers/oauth'
import FormioUtils from '../../utils';
import _each from 'lodash/each';
import Formio from '../../formio'

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
    this.setLoading(this.element, loading);
  }

  set disabled(disabled) {
    super.disabled = disabled;
    this.setDisabled(this.element, disabled);
  }

  build() {
    this.element = this.ce(this.info.type, this.info.attr);
    this.addShortcut(this.element);
    if (this.component.label) {
      this.labelElement = this.text(this.addShortcutToLabel());
      this.element.appendChild(this.labelElement);
      this.createTooltip(this.element, null, 'glyphicon glyphicon-question-sign');
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
      this.on('change', (value) => {
        this.loading = false;
        this.disabled = (this.component.disableOnInvalid && !this.root.isValid(value.data, true));
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

          // Display Alert if OAuth config is missing
          if(!this.component.oauth){
            // this.addClass(this.element, 'has-error');
            // this.addClass(this.component, 'has-error');
            // this.addClass(this.element, 'alert alert-danger');
            // this.addClass(this.component, 'alert alert-danger');
            // this.addClass(formio-alerts, 'alert alert-danger');
            alert("You must assign this button to an OAuth action before it will work.");
            break;
          }

          // Display Alert if oAuth has an error is missing
          if(this.component.oauth.error){
            alert("The Following Error Has Occured" + this.component.oauth.error);
            break;
          }

          oAuthProvider(this).initiate(function(that, results) {
            console.log(that);
            console.log(results);
            console.log(that.events);
            console.log("================== result!!!");
            that.emit('submitButton', {
              type: "submit",
              component: that.component,
              event: "formio.submit",
              data: results
            });

            // formio.saveSubmission(results)
            //   .then(function(submission) {
            //     // Trigger the form submission.
            //     $scope.$emit('formSubmission', submission);
            //   });



            // that.emit('submitButton', results);
            // that.events.emit("formSubmission", results);



            // $scope.formio.saveSubmission(submission)
            //   .then(function(submission) {
            //     // Trigger the form submission.
            //     $scope.$emit('formSubmission', submission);
            //   })
            //

          });
          break;
      }
    });
    if (this.shouldDisable) {
      this.disabled = true;
    }
  }

  destroy() {
    super.destroy.apply(this, Array.prototype.slice.apply(arguments));
    this.removeShortcut(this.element);
  }
}

