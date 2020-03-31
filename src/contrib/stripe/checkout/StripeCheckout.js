/* globals StripeCheckout */
import _ from 'lodash';
import ButtonComponent from '../../../components/button/Button';
import Formio from '../../../Formio';

export default class StripeCheckoutComponent extends ButtonComponent {
  constructor(component, options, data) {
    super(component, options, data);

    // Get the source for Stripe API
    const src = 'https://checkout.stripe.com/checkout.js';

    /**
     * Promise when Stripe is ready.
     * @type {Promise}
     */
    this.stripeCheckoutReady = Formio.requireLibrary('stripeCheckout', 'StripeCheckout', src, true);

    /**
     * Keep initial component action
     * @type {String}
     */
    this.componentAction = this.component.action;

    // Force button to handle event action to build button
    this.component.action = 'event';
  }

  static get builderInfo() {
    return {
      group: false,
      schema: ButtonComponent.schema()
    };
  }

  getValue() {
    return this.dataValue;
  }

  setValue(value, flags = {}) {
    return this.updateValue(value, flags);
  }

  /**
   * Handle event dispatched by Stripe library
   * @param {Object} token - The token returned by Stripe.
   */
  onToken(token) {
    this.setValue(token.id);
    // In case of submit, submit the form
    if (this.componentAction === 'submit') {
      this.emit('submitButton');
    }
    else {
      this.addClass(this.element, 'btn-success');
      this.disabled = true;
    }
  }

  /**
   * Handle customEvent event on the button
   * @param {Object} event - The event returned by ButtonComponent.
   */
  onClickButton(event) {
    // Return if component call is not the current component
    if (this.component.key !== event.component.key) {
      return;
    }

    // Open Checkout with further options:
    const popupConfiguration = _.cloneDeep(this.component.stripe.popupConfiguration) || {};
    _.each(popupConfiguration, (value, key) => {
      popupConfiguration[key] = this.t(value);
    });

    if (this.componentAction === 'submit') {
      // In case of submit, validate the form before opening button
      if (this.root.isValid(event.data, true)) {
        this.handler.open(popupConfiguration);
      }
      else {
        // If the form is not valid, submit it to draw errors
        this.emit('submitButton');
      }
    }
    else {
      this.handler.open(popupConfiguration);
    }
  }

  build() {
    // Build button
    super.build();

    // In case of submit, add event listeners
    if (this.componentAction === 'submit') {
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

    // When stripe checkout is ready, create the handler and add event listeners
    this.stripeCheckoutReady.then(() => {
      const handlerConfiguration = _.cloneDeep(this.component.stripe.handlerConfiguration) || {};
      handlerConfiguration.key = this.component.stripe.apiKey;
      handlerConfiguration.token = this.onToken.bind(this);
      if (typeof handlerConfiguration.locale === 'undefined') {
        handlerConfiguration.locale = this.options.language;
      }
      this.handler = StripeCheckout.configure(handlerConfiguration);

      this.on('customEvent', this.onClickButton.bind(this));

      this.addEventListener(window, 'popstate', () => {
        this.handler.close();
      });
    });
  }
}

if (typeof global === 'object' && global.Formio && global.Formio.registerComponent) {
  global.Formio.registerComponent('stripeCheckout', StripeCheckoutComponent);
}
