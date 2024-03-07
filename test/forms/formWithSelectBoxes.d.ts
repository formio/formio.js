declare namespace _default {
	const _id: string;
	const type: string;
	const components: (
		| {
				label: string;
				optionsLabelPosition: string;
				tableView: boolean;
				values: {
					label: string;
					value: string;
					shortcut: string;
				}[];
				key: string;
				type: string;
				input: boolean;
				inputType: string;
				disableOnInvalid?: undefined;
		  }
		| {
				type: string;
				label: string;
				key: string;
				disableOnInvalid: boolean;
				input: boolean;
				tableView: boolean;
				optionsLabelPosition?: undefined;
				values?: undefined;
				inputType?: undefined;
		  }
	)[];
	const title: string;
	const display: string;
	const name: string;
	const path: string;
}
export default _default;
