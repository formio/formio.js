---
title: Stripe Checkout
layout: vtabs
section: examples
weight: 150
contrib: true
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

#### Install
To use this plugin, you must first include the contributed modules for the Form.io renderer using.

```html
<script src="https://unpkg.com/formiojs@latest/dist/formio.contrib.min.js"></script>
```

After you have included this library within your page, you will then need to register it with the Form renderer using the following.

```js
Formio.registerComponent('stripeCheckout', Formio.contrib.stripe.checkout);
```

If you are including this within your own library, you can also include it with the following.

```js
import { StripeCheckoutComponent } from 'formiojs/build/contrib/stripe/checkout/stripeCheckout';
Formio.registerComponent('stripeCheckout', StripeCheckoutComponent);
```

#### Example

```html
<link rel="stylesheet" href="https://unpkg.com/formiojs@latest/dist/formio.full.min.css">
<script src="https://unpkg.com/formiojs@latest/dist/formio.full.min.js"></script>
<script src="https://unpkg.com/formiojs@latest/dist/formio.contrib.min.js"></script>
<div id="formio"></formio>
```

```js
// Register the contrib component.
Formio.registerComponent('stripeCheckout', Formio.contrib.stripe.checkout);

Formio.createForm(document.getElementById('formio'), {
  components: [
    {
      type: 'textfield',
      label: 'Title',
      placeholder: 'Enter the title.',
      defaultValue: 'T-Shirt',
      key: 'title',
      input: true,
      inputType: 'text'
    },
    {
      type: 'textarea',
      label: 'Description',
      placeholder: 'Enter the description.',
      defaultValue: 'XL - Men',
      key: 'description',
      input: true
    },
    {
      type: 'select',
      label: 'Currency',
      placeholder: 'Select the currency.',
      defaultValue: 'usd',
      key: 'currency',
      input: true,
      dataSrc: 'values',
      data: {
        values: [
          {
            label: 'CAD',
            value: 'cad'
          },
          {
            label: 'USD',
            value: 'usd'
          }
        ]
      }
    },
    {
      type: 'currency',
      label: 'Amount',
      key: 'amount',
      defaultValue: 20,
      input: true
    },
    {
      type: 'hidden',
      key: 'stripeAmount',
      calculateValue: 'value = parseFloat(data.amount) * 100',
      input: true
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
          name: '{% raw %}{{ data.title }}{% endraw %}',
          description: '{% raw %}{{ data.description }}{% endraw %}',
          currency: '{% raw %}{{ data.currency }}{% endraw %}',
          amount: '{% raw %}{{ data.stripeAmount }}{% endraw %}'
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

<div class="well">
<div id="formio"></div>
<script type="text/javascript">
Formio.registerComponent('stripeCheckout', Formio.contrib.stripe.checkout);

Formio.createForm(document.getElementById('formio'), {
  components: [
    {
      type: 'textfield',
      label: 'Title',
      placeholder: 'Enter the title.',
      defaultValue: 'T-Shirt',
      key: 'title',
      input: true,
      inputType: 'text'
    },
    {
      type: 'textarea',
      label: 'Description',
      placeholder: 'Enter the description.',
      defaultValue: 'XL - Men',
      key: 'description',
      input: true
    },
    {
      type: 'select',
      label: 'Currency',
      placeholder: 'Select the currency.',
      defaultValue: 'usd',
      key: 'currency',
      input: true,
      dataSrc: 'values',
      data: {
        values: [
          {
            label: 'CAD',
            value: 'cad'
          },
          {
            label: 'USD',
            value: 'usd'
          }
        ]
      }
    },
    {
      type: 'currency',
      label: 'Amount',
      key: 'amount',
      defaultValue: 20,
      input: true
    },
    {
      type: 'hidden',
      key: 'stripeAmount',
      calculateValue: 'value = parseFloat(data.amount) * 100',
      input: true
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
          name: '{% raw %}{{ data.title }}{% endraw %}',
          description: '{% raw %}{{ data.description }}{% endraw %}',
          currency: '{% raw %}{{ data.currency }}{% endraw %}',
          amount: '{% raw %}{{ data.stripeAmount }}{% endraw %}'
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


