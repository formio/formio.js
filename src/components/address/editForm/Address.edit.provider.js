import _ from 'lodash';

import Formio from '../../../Formio';

export default [
  {
    type: 'select',
    input: true,
    key: 'provider',
    label: 'Provider',
    placeholder: 'Select your address search provider',
    weight: 0,
    tooltip: 'Which address search service should be used.',
    valueProperty: 'value',
    dataSrc: 'custom',
    data: {
      custom() {
        return _.values(Formio.Providers.getProviders('address')).sort().map((provider) => ({
          label: provider.displayName,
          value: provider.name,
        }));
      },
    },
    validate: {
      required: true,
    },
  },
  {
    type: 'textfield',
    input: true,
    key: "providerOptions.params['subscription-key']",
    label: 'Subscription Key',
    placeholder: 'Enter Subscription Key',
    weight: 10,
    tooltip: 'Use your Azure Maps subscription key here.',
    validate: {
      required: true,
    },
    conditional: {
      json: { '===': [{ var: 'data.provider' }, 'azure'] },
    },
  },
  {
    type: 'textfield',
    input: true,
    key: 'providerOptions.url',
    label: 'Url',
    placeholder: 'Enter Url',
    weight: 10,
    tooltip: 'Url to the service which should be used to search addresses for autocomplete.',
    validate: {
      required: true,
    },
    conditional: {
      json: { '===': [{ var: 'data.provider' }, 'custom'] },
    },
  },
  {
    type: 'textfield',
    input: true,
    key: 'providerOptions.queryProperty',
    label: 'Query Property',
    defaultValue: 'query',
    placeholder: 'Enter Query Property',
    weight: 20,
    tooltip: 'Which query param should be used to pass as a search string. Default is `query`.',
    conditional: {
      json: { '===': [{ var: 'data.provider' }, 'custom'] },
    },
  },
  {
    type: 'textfield',
    input: true,
    key: 'providerOptions.responseProperty',
    label: 'Response Property',
    placeholder: 'Enter Response Property',
    weight: 30,
    tooltip: 'The property within the response data, where iterable addresses reside. For example: results.',
    conditional: {
      json: { '===': [{ var: 'data.provider' }, 'custom'] },
    },
  },
  {
    type: 'textfield',
    input: true,
    key: 'providerOptions.displayValueProperty',
    label: 'Display Value Property',
    placeholder: 'Display Value Property',
    weight: 40,
    tooltip: 'The property of each address in the response to use as the display value.',
    conditional: {
      json: { '===': [{ var: 'data.provider' }, 'custom'] },
    },
  },
  {
    type: 'textarea',
    input: true,
    key: 'providerOptions.params',
    label: 'Params',
    placeholder: '{ ... }',
    weight: 50,
    rows: 5,
    editor: 'ace',
    as: 'json',
    tooltip: 'Additional query params can be specified here in a way of JSON object.',
    conditional: {
      json: { '===': [{ var: 'data.provider' }, 'custom'] },
    },
  },
  {
    type: 'textfield',
    input: true,
    key: 'providerOptions.params.key',
    label: 'API Key',
    placeholder: 'Enter API Key',
    weight: 10,
    tooltip: 'Use your Google API key here.',
    validate: {
      required: true,
    },
    conditional: {
      json: { '===': [{ var: 'data.provider' }, 'google'] },
    },
  },
  {
    type: 'textfield',
    input: true,
    key: 'providerOptions.params.region',
    label: 'Region',
    placeholder: 'Enter Region',
    weight: 20,
    tooltip: 'Specify Region for Google Maps APIs.',
    conditional: {
      json: { '===': [{ var: 'data.provider' }, 'google'] },
    },
  },
  {
    type: 'textarea',
    input: true,
    key: 'manualModeViewString',
    label: 'Manual Mode View String',
    placeholder: 'Enter Manual Mode View String',
    description: '"address" variable references component value, "data" - submission data and "component" - address component schema.',
    weight: 60,
    rows: 5,
    editor: 'ace',
    tooltip: 'Specify template which should be when quering view string for the component value entered in manual mode. This string is used in table view, CSV export and email rendering. When left blank combined value of all components joined with comma will be used.',
  },
];
