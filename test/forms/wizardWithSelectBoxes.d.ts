declare namespace _default {
	const type: string;
	const components: (
		| {
				title: string;
				label: string;
				type: string;
				key: string;
				components: {
					label: string;
					optionsLabelPosition: string;
					tableView: boolean;
					values: {
						label: string;
						value: string;
						shortcut: string;
					}[];
					validate: {
						onlyAvailableItems: boolean;
						minSelectedCount: number;
						maxSelectedCount: number;
					};
					key: string;
					type: string;
					input: boolean;
					inputType: string;
					defaultValue: {
						one: boolean;
						two: boolean;
						three: boolean;
						four: boolean;
						five: boolean;
					};
				}[];
				input: boolean;
				tableView: boolean;
		  }
		| {
				title: string;
				label: string;
				type: string;
				key: string;
				components: {
					label: string;
					autoExpand: boolean;
					tableView: boolean;
					key: string;
					type: string;
					input: boolean;
				}[];
				input: boolean;
				tableView: boolean;
		  }
	)[];
	const display: string;
}
export default _default;
