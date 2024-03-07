declare namespace _default {
	export { form };
}
export default _default;
declare namespace form {
	const title: string;
	const name: string;
	const path: string;
	const type: string;
	const display: string;
	const tags: never[];
	const components: {
		title: string;
		breadcrumbClickable: boolean;
		buttonSettings: {
			previous: boolean;
			cancel: boolean;
			next: boolean;
		};
		navigateOnEnter: boolean;
		saveOnEnter: boolean;
		scrollToTop: boolean;
		collapsible: boolean;
		key: string;
		type: string;
		label: string;
		input: boolean;
		tableView: boolean;
		components: {
			label: string;
			tableView: boolean;
			calculateValue: string;
			key: string;
			type: string;
			input: boolean;
			components: {
				legend: string;
				customClass: string;
				key: string;
				type: string;
				label: string;
				input: boolean;
				tableView: boolean;
				components: (
					| {
							legend: string;
							key: string;
							type: string;
							label: string;
							input: boolean;
							tableView: boolean;
							components: {
								label: string;
								optionsLabelPosition: string;
								inline: boolean;
								tableView: boolean;
								values: {
									label: string;
									value: string;
									shortcut: string;
								}[];
								validate: {
									required: boolean;
								};
								key: string;
								type: string;
								input: boolean;
							}[];
					  }
					| {
							legend: string;
							key: string;
							customConditional: string;
							type: string;
							label: string;
							input: boolean;
							tableView: boolean;
							components: {
								label: string;
								optionsLabelPosition: string;
								inline: boolean;
								tableView: boolean;
								values: {
									label: string;
									value: string;
									shortcut: string;
								}[];
								validate: {
									required: boolean;
								};
								key: string;
								type: string;
								input: boolean;
							}[];
					  }
					| {
							legend: string;
							key: string;
							customConditional: string;
							type: string;
							label: string;
							input: boolean;
							tableView: boolean;
							components: {
								label: string;
								tableView: boolean;
								defaultValue: boolean;
								validate: {
									required: boolean;
								};
								key: string;
								type: string;
								input: boolean;
							}[];
					  }
				)[];
			}[];
		}[];
	}[];
	const settings: {};
	const properties: {};
	const controller: string;
	const revisions: string;
	const submissionRevisions: string;
	const _vid: number;
	namespace config {
		const containerDataSource: {
			firstComponent: string;
			types: (
				| {
						secondComponent: string;
						requiredComponent: string;
				  }
				| {
						secondComponent: string;
						requiredComponent: {};
				  }
			)[];
		}[];
	}
}
