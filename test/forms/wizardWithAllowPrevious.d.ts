declare namespace _default {
	const type: string;
	const tags: never[];
	const components: (
		| {
				title: string;
				label: string;
				type: string;
				key: string;
				components: {
					label: string;
					tableView: boolean;
					key: string;
					type: string;
					input: boolean;
					defaultValue: boolean;
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
					tableView: boolean;
					key: string;
					type: string;
					input: boolean;
				}[];
				input: boolean;
				tableView: boolean;
		  }
	)[];
	const title: string;
	const display: string;
}
export default _default;
