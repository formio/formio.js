import baseEditForm from '../base/Base.form';
/* eslint-disable quotes, max-len */
export default function(...extend) {
  return baseEditForm(...extend, [
    {
      label: 'Display',
      key: 'display',
      weight: 0,
      components: [
        {
          type: 'container',
          key: 'map',
          input: true,
          weight: 610,
          components: [
            {
              type: 'textfield',
              input: true,
              label: 'Region Bias',
              key: 'region',
              tooltip: `The region bias to use for this search. See <a href='https://developers.google.com/maps/documentation/geocoding/intro#RegionCodes' target='_blank'>Region Biasing</a> for more information.`,
              placeholder: 'Dallas'
            },
            {
              type: 'textfield',
              input: true,
              label: 'Google Maps API Key',
              key: 'key',
              tooltip: `The API key for Google Maps. See <a href='https://developers.google.com/maps/documentation/geocoding/get-api-key' target='_blank'>Get an API Key</a> for more information.`,
              placeholder: 'xxxxxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxx'
            }
          ]
        }
      ]
    }
  ]);
}
/* eslint-enable quotes, max-len */
