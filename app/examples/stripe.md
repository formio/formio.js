---
title: Stripe
layout: vtabs
section: examples
weight: 150
contrib: true
disabled: true
---
Stripe securely collect card information from your customers and create a card payment.
This component provides a card input field created by [Stripe](https://stripe.com/docs/stripe-js) library.
The component also provides a "pay button" using Android Pay, Apple Pay or Payment Request API.

The authorization will be automaticly called when users use the pay button. Instead, for the card input field, the call will be done before submission
or you can call manually add an button which call the method `authorize()`.

These parameters are directly injected to Stripe functions:

- `cardData` for [Stripe.createToken()](https://stripe.com/docs/stripe-js/reference#stripe-create-token)
- `stripeElementsOptions` for [stripe.elements()](https://stripe.com/docs/stripe-js/reference#stripe-payment-request).
- `stripeElementOptions` for [elements.create()](https://stripe.com/docs/stripe-js/reference#the-elements-object).
- `payButton.paymentRequest` for [stripe.paymentRequest()](https://stripe.com/docs/stripe-js/reference#stripe-payment-request).
- `payButton.stripeOptions` for [elements.create()](https://stripe.com/docs/stripe-js/reference#the-elements-object).


Stripe can be configured with this following parameters:
```js
  "stripe": {
    "apiKey": "pk_test_Aprek1cboUExxK6dHoBaOphh",
    "payButton": {
      "enable": true,
      "separatorLabel": "Or",
      "paymentRequest": {
        "country": 'CA',
        "currency": 'cad',
        "total": {
          "label": 'Test payment',
          "amount": 1000,
        }
      },
      "stripeOptions": {}
    },
    "cardData": {
      "name": "{{ data.firstName }} {{ data.lastName }}",
      "address_line1": "{{ data.address }}",
      "address_city": "{{ data.city }}",
      "address_country": "{{ data.country }}",
    },
    "successLabel": "Payment successful",
    "stripeElementsOptions": {},
    "stripeElementOptions": {}
  }
```

#### Install
To use this plugin, you must first include the contributed modules for the Form.io renderer using.

```html
<script src="https://unpkg.com/formiojs@latest/dist/formio.contrib.min.js"></script>
```

After you have included this library within your page, you will then need to register it with the Form renderer using the following.

```js
Formio.registerComponent('stripe', Formio.contrib.stripe.stripe);
```

If you are including this within your own library, you can also include it with the following.

```js
import { StripeComponent } from 'formiojs/build/contrib/stripe/stripe/stripe';
Formio.registerComponent('stripe', StripeComponent);
```

#### Example

```html
<link rel="stylesheet" href="https://unpkg.com/formiojs@latest/dist/formio.full.min.css">
<script src="https://unpkg.com/formiojs@latest/dist/formio.full.min.js"></script>
<script src="https://unpkg.com/formiojs@latest/dist/formio.contrib.min.js"></script>
<div id="formio"></formio>
```

```js
Formio.createForm(document.getElementById('formio'), {
  components: [
    {
      type: 'textfield',
      label: 'First name',
      placeholder: 'Enter the first name.',
      key: 'firstName',
      input: true,
      inputType: 'text'
    },
    {
      type: 'textfield',
      label: 'Last name',
      placeholder: 'Enter the last name.',
      key: 'lastName',
      input: true,
      inputType: 'text'
    },
    {
      type: 'stripe',
      key: 'card',
      label: 'Credit card',
      validate: {
        required: true
      },
      stripe: {
        apiKey: 'pk_test_Aprek1cboUExxK6dHoBaOphh',
        cardData: {
          name: '{{ data.firstName }} {{ data.lastName }}'
        },
        payButton: {
          enable: true,
          paymentRequest: {
            currency: 'cad',
            country: 'CA',
            total: {
              label: 'Tee-shirt',
              amount: 3000,
            }
          }
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


#### Result

<div class="card card-body bg-light">
<div id="formio"></div>
<script type="text/javascript">
Formio.createForm(document.getElementById('formio'), {
  components: [
    {
      type: 'textfield',
      label: 'First name',
      placeholder: 'Enter the first name.',
      key: 'firstName',
      input: true,
      inputType: 'text'
    },
    {
      type: 'textfield',
      label: 'Last name',
      placeholder: 'Enter the last name.',
      key: 'lastName',
      input: true,
      inputType: 'text'
    },
    {
      type: 'stripe',
      key: 'card',
      label: 'Credit card',
      validate: {
        required: true
      },
      stripe: {
        apiKey: 'pk_test_Aprek1cboUExxK6dHoBaOphh',
        cardData: {
          name: '{{ data.firstName }} {{ data.lastName }}'
        },
        payButton: {
          enable: true,
          paymentRequest: {
            currency: 'cad',
            country: 'CA',
            total: {
              label: 'T-Shirt',
              amount: 3000,
            }
          }
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
</script>
</div>
