declare namespace _default {
	const _id: string;
	const type: string;
	const components: {
		label: string;
		reorder: boolean;
		addAnotherPosition: string;
		layoutFixed: boolean;
		enableRowGroups: boolean;
		initEmpty: boolean;
		tableView: boolean;
		defaultValue: {
			container: {
				dataGrid6: {
					checkbox: boolean;
				}[];
			};
		}[];
		key: string;
		type: string;
		input: boolean;
		components: {
			label: string;
			tableView: boolean;
			key: string;
			type: string;
			input: boolean;
			components: {
				label: string;
				reorder: boolean;
				addAnotherPosition: string;
				layoutFixed: boolean;
				enableRowGroups: boolean;
				initEmpty: boolean;
				tableView: boolean;
				defaultValue: {
					checkbox: boolean;
				}[];
				key: string;
				type: string;
				input: boolean;
				components: (
					| {
							label: string;
							tableView: boolean;
							key: string;
							type: string;
							input: boolean;
							reorder?: undefined;
							addAnotherPosition?: undefined;
							layoutFixed?: undefined;
							enableRowGroups?: undefined;
							initEmpty?: undefined;
							defaultValue?: undefined;
							components?: undefined;
					  }
					| {
							label: string;
							reorder: boolean;
							addAnotherPosition: string;
							layoutFixed: boolean;
							enableRowGroups: boolean;
							initEmpty: boolean;
							tableView: boolean;
							defaultValue: {
								number: string;
							}[];
							key: string;
							customConditional: string;
							type: string;
							input: boolean;
							components: {
								label: string;
								mask: boolean;
								tableView: boolean;
								delimiter: boolean;
								requireDecimal: boolean;
								inputFormat: string;
								truncateMultipleSpaces: boolean;
								key: string;
								type: string;
								input: boolean;
							}[];
					  }
				)[];
			}[];
		}[];
	}[];
	const title: string;
	const display: string;
	const name: string;
	const path: string;
	const machineName: string;
}
export default _default;
