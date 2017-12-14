---
title: Stripe Checkout
layout: vtabs
section: examples
weight: 150
---

### Stripe Checkout
Stripe securely collect card information from your customers and create a card payment.
This component is based on the ButtonComponent and add an overlay to call [Stripe Checkout](https://stripe.com/docs/checkout) library.
After the customer validate his payment information, a token will be returned by Stripe API and it will be stored in the form data.

The component can replace the submission button to force payment authorization to submit the form.

Stripe Checkout can be configured with this following parameters:
```js
  "stripe": {
    "apiKey": "pk_test_Aprek1cboUExxK6dHoBaOphh",
    "handlerConfiguration": {
      "image": 'https://stripe.com/img/documentation/checkout/marketplace.png',
      "locale": 'auto'
    },
    "popupConfiguration": {
      "name": 'Demo Site',
      "description": '2 widgets',
      "currency": 'cad',
      "amount": 2000
    }
  }
```

- `handlerConfiguration` is directly injected to stripe function [StripeCheckout.configure](https://stripe.com/docs/checkout#integration-simple-options).
`token` and `key` parameters are overwrite by component.

- `popupConfiguration` is also directly injected to stripe function [handler.open](https://stripe.com/docs/checkout#integration-simple-options).


#### Example
```js
import { Formio } from 'formiojs/full';
import { StripeCheckoutComponent } from 'formiojs/contrib/stripeCheckout/StripeCheckout';
Formio.registerComponent('stripeCheckout', StripeCheckoutComponent);

Formio.createForm(document.getElementById('formio'), {
  components: [
    {
      type: 'textfield',
      label: 'Title',
      placeholder: 'Enter the title.',
      key: 'title',
      input: true,
      inputType: 'text'
    },
    {
      type: 'stripeCheckout',
      key: 'card',
      label: 'Authorize payment',
      stripe: {
        apiKey: 'pk_test_Aprek1cboUExxK6dHoBaOphh',
        handlerConfiguration: {
          image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
          locale: 'auto'
        },
        popupConfiguration: {
          name: 'Demo Site',
          description: '2 widgets',
          currency: 'cad',
          amount: 2000
        }
      },
    },
    {
      type: 'button',
      action: 'submit',
      label: 'Submit',
      theme: 'primary',
      key: 'submit'
    }
  ]
});
```
#### Example with submission
```js
import { Formio } from 'formiojs/full';
import { StripeCheckoutComponent } from 'formiojs/contrib/stripeCheckout/StripeCheckout';
Formio.registerComponent('stripeCheckout', StripeCheckoutComponent);

Formio.createForm(document.getElementById('formio'), {
  components: [
    {
      type: 'textfield',
      label: 'Title',
      placeholder: 'Enter the title.',
      key: 'title',
      input: true,
      inputType: 'text'
    },
    {
      type: 'stripeCheckout',
      key: 'card',
      action: 'submit',
      theme: 'primary',
      label: 'Authorize payment and Submit',
      stripe: {
        apiKey: 'pk_test_Aprek1cboUExxK6dHoBaOphh',
        handlerConfiguration: {
          image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
          locale: 'auto'
        },
        popupConfiguration: {
          name: 'Demo Site',
          description: '2 widgets',
          currency: 'cad',
          amount: 2000
        }
      },
    }
  ]
});
```

