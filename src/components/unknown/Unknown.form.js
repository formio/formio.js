import UnknownEditDisplay from './editForm/Unknown.edit.display';

/**
 * Unknown Component schema.
 * @returns {object} - The Unknown Component edit form.
 */
export default function() {
  return {
    components: [
      {
        type: 'tabs',
        key: 'tabs',
        components: [
          {
            label: 'Custom',
            key: 'display',
            weight: 0,
            components: UnknownEditDisplay
          }
        ]
      }
    ]
  };
}
