declare namespace _default {
	const type: string;
	const components: (
		| {
				label: string;
				reorder: boolean;
				addAnotherPosition: string;
				defaultOpen: boolean;
				layoutFixed: boolean;
				enableRowGroups: boolean;
				initEmpty: boolean;
				tableView: boolean;
				defaultValue: {
					textField: string;
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
							form?: undefined;
					  }
					| {
							label: string;
							tableView: boolean;
							form: {
								type: string;
								components: (
									| {
											label: string;
											tableView: boolean;
											validate: {
												required: boolean;
											};
											key: string;
											type: string;
											input: boolean;
											mask?: undefined;
											spellcheck?: undefined;
											delimiter?: undefined;
											requireDecimal?: undefined;
											inputFormat?: undefined;
											disableOnInvalid?: undefined;
									  }
									| {
											label: string;
											mask: boolean;
											spellcheck: boolean;
											tableView: boolean;
											delimiter: boolean;
											requireDecimal: boolean;
											inputFormat: string;
											validate: {
												required: boolean;
											};
											key: string;
											type: string;
											input: boolean;
											disableOnInvalid?: undefined;
									  }
									| {
											type: string;
											label: string;
											key: string;
											disableOnInvalid: boolean;
											input: boolean;
											tableView: boolean;
											validate?: undefined;
											mask?: undefined;
											spellcheck?: undefined;
											delimiter?: undefined;
											requireDecimal?: undefined;
											inputFormat?: undefined;
									  }
								)[];
								revisions: string;
								_vid: number;
								title: string;
								display: string;
								name: string;
								path: string;
							};
							key: string;
							type: string;
							input: boolean;
					  }
				)[];
				disableOnInvalid?: undefined;
		  }
		| {
				type: string;
				label: string;
				key: string;
				disableOnInvalid: boolean;
				input: boolean;
				tableView: boolean;
				reorder?: undefined;
				addAnotherPosition?: undefined;
				defaultOpen?: undefined;
				layoutFixed?: undefined;
				enableRowGroups?: undefined;
				initEmpty?: undefined;
				defaultValue?: undefined;
				components?: undefined;
		  }
	)[];
	const revisions: string;
	const _vid: number;
	const title: string;
	const display: string;
	const name: string;
	const path: string;
}
export default _default;
