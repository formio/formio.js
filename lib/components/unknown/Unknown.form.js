import UnknownEditDisplay from './editForm/Unknown.edit.display';
export default () => ({
    components: [
        {
            type: 'tabs',
            key: 'tabs',
            components: [
                {
                    label: 'Custom',
                    key: 'display',
                    weight: 0,
                    components: UnknownEditDisplay,
                },
            ],
        },
    ],
});
