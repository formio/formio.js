declare namespace _default {
	const type: string;
	const components: (
		| {
				title: string;
				breadcrumbClickable: boolean;
				buttonSettings: {
					previous: boolean;
					cancel: boolean;
					next: boolean;
				};
				scrollToTop: boolean;
				collapsible: boolean;
				key: string;
				type: string;
				label: string;
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
					};
					key: string;
					type: string;
					input: boolean;
					inputType: string;
					defaultValue: {
						a: boolean;
						b: boolean;
						c: boolean;
					};
				}[];
				input: boolean;
				tableView: boolean;
		  }
		| {
				title: string;
				breadcrumbClickable: boolean;
				buttonSettings: {
					previous: boolean;
					cancel: boolean;
					next: boolean;
				};
				scrollToTop: boolean;
				collapsible: boolean;
				key: string;
				type: string;
				label: string;
				components: (
					| {
							label: string;
							mask: boolean;
							spellcheck: boolean;
							tableView: boolean;
							delimiter: boolean;
							requireDecimal: boolean;
							inputFormat: string;
							key: string;
							type: string;
							input: boolean;
							useOriginalRevision?: undefined;
					  }
					| {
							label: string;
							tableView: boolean;
							useOriginalRevision: boolean;
							key: string;
							type: string;
							input: boolean;
							mask?: undefined;
							spellcheck?: undefined;
							delimiter?: undefined;
							requireDecimal?: undefined;
							inputFormat?: undefined;
					  }
				)[];
				input: boolean;
				tableView: boolean;
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
