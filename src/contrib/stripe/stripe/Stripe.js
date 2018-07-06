/* globals Stripe */
import _ from 'lodash';

import {Validator} from '../../../components/Validator';
import {BaseComponent} from '../../../components/base/Base';

// Register a custom validor to use card validition from Stripe
if (typeof Validator.validators.stripe === 'undefined') {
  Validator.validators.stripe =  {
    key: 'validate.stripe',
    message(component) {
      let stripeMessage = '';
      if (component.lastResult && component.lastResult.error) {
        stripeMessage = component.lastResult.error.message;
      }
      return component.t(component.errorMessage('stripe'), {
        field: component.errorLabel,
        stripe: stripeMessage,
        stripeError: component.lastResult.error,
        data: component.data
      });
    },
    check(component, setting, value) {
      if (!component.paymentDone && component.lastResult) {
        return !component.lastResult.error && !component.isEmpty(value);
      }
      return true;
    }
  };
}

/**
 * This is the StripeComponent class.
 */
export class StripeComponent extends BaseComponent {
  constructor(component, options, data) {
    super(component, options, data);

    // Get the source for Stripe API
    const src = 'https://js.stripe.com/v3/';

    /**
     * Promise when Stripe is ready.
     * @type {Promise}
     */
    this.stripeReady = BaseComponent.requireLibrary('stripe', 'Stripe', src, true);

    /**
     * The last result returned by Stripe.
     * @type {Object}
     */
    this.lastResult = null;

    /**
     * The state of the payment.
     * @type {Boolean}
     */
    this.paymentDone = false;

    // Use stripe validator
    this.validators.push('stripe');
  }

  elementInfo() {
    const info = super.elementInfo();
    info.type = 'input';
    info.attr.type = 'hidden';
    info.changeEvent = 'change';
    return info;
  }

  /**
   * Set CSS classes for pending authorization
   */
  authorizePending() {
    this.addClass(this.element, 'stripe-submitting');
    this.removeClass(this.element, 'stripe-error');
    this.removeClass(this.element, 'stripe-submitted');
  }

  /**
   * Set CSS classes and display error when error occurs during authorization
   * @param {Object} resultError - The result error returned by Stripe API.
   */
  authorizeError(resultError) {
    this.removeClass(this.element, 'stripe-submitting');
    this.addClass(this.element, 'stripe-submit-error');
    this.removeClass(this.element, 'stripe-submitted');

    if (!this.lastResult) {
      this.lastResult = {};
    }
    this.lastResult.error = resultError;
    this.setValue(this.getValue(), {
      changed: true
    });
  }

  /**
   * Set CSS classes and save token when authorization successed
   * @param {Object} result - The result returned by Stripe API.
   */
  authorizeDone(result) {
    this.removeClass(this.element, 'stripe-submit-error');
    this.removeClass(this.element, 'stripe-submitting');
    this.addClass(this.element, 'stripe-submitted');

    this.stripeSuccess.style.display = 'block';
    if (this.component.stripe.payButton && this.component.stripe.payButton.enable) {
      this.stripeElementPayButton.style.display = 'none';
      this.stripeSeparator.style.display = 'none';
    }
    this.stripeElementCard.style.display = 'none';

    // Store token in hidden input
    this.setValue(result.token.id);

    this.paymentDone = true;
  }

  /**
   * Call Stripe API to get token
   */
  authorize() {
    if (this.paymentDone) {
      return;
    }

    const that = this;
    return new Promise(((resolve, reject) => {
      that.authorizePending();

      // Get all additionnal data to send to Stripe
      const cardData = _.cloneDeep(that.component.stripe.cardData) || {};
      _.each(cardData, (value, key) => {
        cardData[key] = that.t(value);
      });

      return that.stripe.createToken(that.stripeCard, cardData).then((result) => {
        if (result.error) {
          that.authorizeError(result.error);
          reject(result.error);
        }
        else {
          that.authorizeDone(result);
          resolve();
        }
      });
    }));
  }

  /**
   * Handle event dispatched by Stripe library
   * @param {Object} result - The result returned by Stripe.
   */
  onElementCardChange(result) {
    // If the field is not required and the field is empty, do not throw an error
    if (result.empty && (!this.component.validate || !this.component.validate.required)) {
      delete result.error;
    }

    // Force change when complete or when an error is thrown or fixed
    const changed = result.complete
      || this.lastResult && (!!this.lastResult.error !== !!result.error)
      || this.lastResult && this.lastResult.error && result.error && this.lastResult.error.code !== result.error.code
      || false;
    this.lastResult = result;

    // When the field is not empty, use "." as value to not trigger "required" validator
    const value = result.empty ? '' : '.';
    this.setValue(value, {
      changed: changed
    });
  }

  beforeSubmit() {
    // Get the token before submitting when the field is not empty or required
    if (this.lastResult && !this.lastResult.empty || (this.component.validate && this.component.validate.required)) {
      return this.authorize();
    }
  }

  build() {
    super.build();

    const successLabel = this.component.stripe.payButton.successLabel || 'Payment successful';
    this.stripeSuccess = this.ce('div', {
      class: 'Stripe-success',
      style: 'display: none'
    }, this.t(successLabel));
    this.element.appendChild(this.stripeSuccess);

    // Add container for pay button
    if (this.component.stripe.payButton && this.component.stripe.payButton.enable) {
      this.stripeElementPayButton = this.ce('div', {
        class: 'Stripe-paybutton'
      });
      this.element.appendChild(this.stripeElementPayButton);

      const separatorLabel = this.component.stripe.payButton.separatorLabel || 'Or';
      this.stripeSeparator = this.ce('div', {
        class: 'Stripe-separator',
        style: 'display: none'
      }, this.t(separatorLabel));
      this.element.appendChild(this.stripeSeparator);
    }

    // Create container for stripe cart input
    this.stripeElementCard = this.ce('div');
    this.element.appendChild(this.stripeElementCard);

    this.stripeReady.then(() => {
      this.stripe = new Stripe(this.component.stripe.apiKey);

      // Create an instance of Elements
      let stripeElementsOptions = {};
      if (this.component.stripe) {
        stripeElementsOptions = _.cloneDeep(this.component.stripe.stripeElementsOptions) || {};
      }
      if (typeof stripeElementsOptions.locale === 'undefined') {
        stripeElementsOptions.locale = this.options.language;
      }
      const elements = this.stripe.elements(stripeElementsOptions);

      // Create an instance of the card Element
      let stripeElementOptions = {};
      if (this.component.stripe) {
        stripeElementOptions = this.component.stripe.stripeElementOptions || {};
      }
      this.stripeCard = elements.create('card', stripeElementOptions);

      // Add an instance of the card Element into the `card-element` <div>
      this.stripeCard.mount(this.stripeElementCard);

      // Handle real-time validation errors from the card Element.
      this.addEventListener(this.stripeCard, 'change', this.onElementCardChange.bind(this));

      // If there is a pay button, then create it and add listener
      if (this.component.stripe.payButton && this.component.stripe.payButton.enable) {
        const paymentRequest = this.stripe.paymentRequest(this.component.stripe.payButton.paymentRequest);

        this.addEventListener(paymentRequest, 'token', (result) => {
          this.authorizeDone(result, true);
          result.complete('success');
        });

        let stripeOptionsPayButton = {};
        if (this.component.stripe.payButton) {
          stripeOptionsPayButton = this.component.stripe.payButton.stripeOptions || {};
        }
        stripeOptionsPayButton.paymentRequest = paymentRequest;

        const paymentRequestElement = elements.create('paymentRequestButton', stripeOptionsPayButton);

        paymentRequest.canMakePayment().then((result) => {
          if (result) {
            // Display label separator
            this.stripeSeparator.style.display = 'block';
            paymentRequestElement.mount(this.stripeElementPayButton);
          }
        });
      }
    });
  }
}
