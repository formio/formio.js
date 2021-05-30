import _isEqual from 'lodash/isEqual';
import _omit from 'lodash/omit';
import _difference from 'lodash/difference';
import _keys from 'lodash/keys';
export default [
  {
    key: 'labelPosition',
    ignore: true
  },
  {
    key: 'placeholder',
    ignore: true
  },
  {
    key: 'description',
    ignore: true
  },
  {
    key: 'autofocus',
    ignore: true
  },
  {
    key: 'tableView',
    ignore: true
  },
  {
    key: 'label',
    hidden: true,
    calculateValue(context) {
      return context.data.title;
    }
  },
  {
    key: 'tabindex',
    hidden: true,
  },
  {
    weight: 1,
    type: 'textfield',
    input: true,
    placeholder: 'Panel Title',
    label: 'Title',
    key: 'title',
    tooltip: 'The title text that appears in the header of this panel.'
  },
  {
    weight: 20,
    type: 'textarea',
    input: true,
    key: 'tooltip',
    label: 'Tooltip',
    placeholder: 'To add a tooltip to this field, enter text here.',
    tooltip: 'Adds a tooltip to the side of this field.'
  },
  {
    weight: 30,
    type: 'select',
    input: true,
    label: 'Theme',
    key: 'theme',
    dataSrc: 'values',
    data: {
      values: [
        { label: 'Default', value: 'default' },
        { label: 'Primary', value: 'primary' },
        { label: 'Info', value: 'info' },
        { label: 'Success', value: 'success' },
        { label: 'Danger', value: 'danger' },
        { label: 'Warning', value: 'warning' }
      ]
    }
  },
  {
    weight: 40,
    type: 'fieldset',
    input: false,
    components: [
      {
        type: 'select',
        input: true,
        label: 'Breadcrumb Type',
        key: 'breadcrumb',
        dataSrc: 'values',
        data: {
          values: [
            { label: 'Default', value: 'default' },
            { label: 'Condensed', value: 'condensed' },
            { label: 'Hidden', value: 'none' },
          ]
        }
      },
      {
        input: true,
        type: 'checkbox',
        label: 'Allow click on Breadcrumb',
        key: 'breadcrumbClickable',
        defaultValue: true,
        conditional: {
          json: { '!==': [{ var: 'data.breadcrumb' }, 'none'] }
        }
      },
      {
        input: true,
        type: 'checkbox',
        label: 'Allow Previous',
        key: 'allowPrevious',
        defaultValue: false,
        tooltip: 'Determines if the breadcrumb bar is clickable or not for visited tabs.',
        conditional: {
          json: { '===': [{ var: 'data.breadcrumbClickable' }, false] }
        }
      },
      {
        weight: 50,
        label: 'Panel Navigation Buttons',
        optionsLabelPosition: 'right',
        values: [
          {
            label: 'Previous',
            value: 'previous',
          },
          {
            label: 'Cancel',
            value: 'cancel',
          },
          {
            label: 'Next',
            value: 'next',
          }
        ],
        inline: true,
        type: 'selectboxes',
        key: 'buttonSettings',
        input: true,
        inputType: 'checkbox',
        defaultValue: {
          previous: true,
          cancel: true,
          next: true
        },
      },
      {
        weight: 55,
        label: 'Navigate Wizard on Enter',
        type: 'checkbox',
        key: 'navigateOnEnter',
        input: true,
        inputType: 'checkbox',
        defaultValue: false,
        tooltip: 'Use the Enter key to go forward through pages.'
      },
      {
        weight: 56,
        label: 'Save on Enter',
        type: 'checkbox',
        key: 'saveOnEnter',
        input: true,
        inputType: 'checkbox',
        defaultValue: false,
        tooltip: 'Use the Enter key to submit form on last page.'
      },
      {
        weight: 60,
        label: 'Scroll up on page opening',
        type: 'checkbox',
        key: 'scrollToTop',
        input: true,
        inputType: 'checkbox',
        defaultValue: false,
        tooltip: 'Scroll to the top of the wizard page when user navigates to it'
      }
    ],
    customConditional(context) {
      let isWizardPanel = false;
      if (context.instance.options.editForm.display === 'wizard') {
        const { components } = context.instance.options.editForm;
        const component = context.instance.options.editComponent;
        if (components && component) {
          isWizardPanel = components.some((comp) => {
            const diff = _difference(_keys(comp), _keys(component)) || [];
            diff.push('components');
            return _isEqual(_omit(comp, diff), _omit(component, diff));
          });
        }
      }
      return isWizardPanel;
    }
  },
  {
    weight: 650,
    type: 'checkbox',
    label: 'Collapsible',
    tooltip: 'If checked, this will turn this Panel into a collapsible panel.',
    key: 'collapsible',
    input: true
  },
  {
    weight: 651,
    type: 'checkbox',
    label: 'Initially Collapsed',
    tooltip: 'Determines the initial collapsed state of this Panel.',
    key: 'collapsed',
    input: true,
    conditional: {
      json: { '===': [{ var: 'data.collapsible' }, true] }
    }
  }
];
