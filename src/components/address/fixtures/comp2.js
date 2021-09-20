export default {
	type: 'form',
	components: [
		{
			label: 'Address',
			tableView: false,
			provider: 'nominatim',
			key: 'address',
			type: 'address',
			providerOptions: {
				params: {
					autocompleteOptions: {}
				},
				url: 'undefined'
			},
			input: true,
			components: [
				{
					label: 'Address 1',
					tableView: false,
					key: 'address1',
					type: 'textfield',
					input: true,
					customConditional: "show = _.get(instance, 'parent.manualMode', false);"
				},
				{
					label: 'Address 2',
					tableView: false,
					key: 'address2',
					type: 'textfield',
					input: true,
					customConditional: "show = _.get(instance, 'parent.manualMode', false);"
				},
				{
					label: 'City',
					tableView: false,
					key: 'city',
					type: 'textfield',
					input: true,
					customConditional: "show = _.get(instance, 'parent.manualMode', false);"
				},
				{
					label: 'State',
					tableView: false,
					key: 'state',
					type: 'textfield',
					input: true,
					customConditional: "show = _.get(instance, 'parent.manualMode', false);"
				},
				{
					label: 'Country',
					tableView: false,
					key: 'country',
					type: 'textfield',
					input: true,
					customConditional: "show = _.get(instance, 'parent.manualMode', false);"
				},
				{
					label: 'Zip Code',
					tableView: false,
					key: 'zip',
					type: 'textfield',
					input: true,
					customConditional: "show = _.get(instance, 'parent.manualMode', false);"
				}
			],
			defaultValue: {
				'place_id': 256774876,
				licence: 'Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright',
				'osm_type': 'relation',
				'osm_id': 1837698,
				boundingbox: ['32.5453486', '32.9899027', '-97.0383833', '-96.5168819'],
				lat: '32.7620405',
				lon: '-96.7790069',
				'display_name': 'Dallas County, Texas, United States',
				class: 'boundary',
				type: 'administrative',
				importance: 0.6662149661993487,
				icon: 'https://nominatim.openstreetmap.org/ui/mapicons//poi_boundary_administrative.p.20.png',
				address: {
					county: 'Dallas County',
					state: 'Texas',
					country: 'United States',
					'country_code': 'us'
				}
			}
		},
		{
			label: 'Submit',
			showValidations: false,
			tableView: false,
			key: 'submit',
			type: 'button',
			input: true
		}
	],
	title: 'test11',
	display: 'form',
	name: 'test11',
	path: 'test11'
};
