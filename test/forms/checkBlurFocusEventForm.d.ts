declare namespace _default {
	const _id: string;
	const title: string;
	const name: string;
	const path: string;
	const type: string;
	const display: string;
	const owner: string;
	const components: (
		| {
				label: string;
				widget: string;
				tableView: boolean;
				data: {
					values: {
						label: string;
						value: string;
					}[];
				};
				key: string;
				type: string;
				input: boolean;
				enableManualMode?: undefined;
				provider?: undefined;
				components?: undefined;
				disableOnInvalid?: undefined;
		  }
		| {
				label: string;
				enableManualMode: boolean;
				tableView: boolean;
				provider: string;
				key: string;
				type: string;
				input: boolean;
				components: {
					label: string;
					tableView: boolean;
					key: string;
					type: string;
					input: boolean;
					customConditional: string;
				}[];
				widget?: undefined;
				data?: undefined;
				disableOnInvalid?: undefined;
		  }
		| {
				type: string;
				label: string;
				key: string;
				disableOnInvalid: boolean;
				input: boolean;
				tableView: boolean;
				widget?: undefined;
				data?: undefined;
				enableManualMode?: undefined;
				provider?: undefined;
				components?: undefined;
		  }
	)[];
	const created: string;
	const modified: string;
	const machineName: string;
}
export default _default;
