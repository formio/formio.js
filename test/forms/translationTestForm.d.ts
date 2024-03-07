declare namespace _default {
	const type: string;
	const components: (
		| {
				label: string;
				tableView: boolean;
				data: {
					values: {
						label: string;
						value: string;
					}[];
				};
				selectThreshold: number;
				validate: {
					required: boolean;
					onlyAvailableItems: boolean;
				};
				key: string;
				type: string;
				indexeddb: {
					filter: {};
				};
				input: boolean;
				showValidations?: undefined;
		  }
		| {
				label: string;
				showValidations: boolean;
				tableView: boolean;
				key: string;
				type: string;
				input: boolean;
				data?: undefined;
				selectThreshold?: undefined;
				validate?: undefined;
				indexeddb?: undefined;
		  }
	)[];
	const title: string;
	const display: string;
	const name: string;
	const path: string;
	const machineName: string;
}
export default _default;
