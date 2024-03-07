declare namespace _default {
	const _id: string;
	const type: string;
	const tags: never[];
	const owner: string;
	const components: {
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
			_id: string;
			type: string;
			tags: never[];
			owner: string;
			components: (
				| {
						title: string;
						label: string;
						type: string;
						key: string;
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
							key: string;
							type: string;
							input: boolean;
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
							conditional: {
								show: boolean;
								when: string;
								eq: string;
							};
							type: string;
							input: boolean;
						}[];
						input: boolean;
						tableView: boolean;
				  }
			)[];
			revisions: string;
			_vid: number;
			title: string;
			display: string;
			access: {
				roles: string[];
				type: string;
			}[];
			submissionAccess: never[];
			controller: string;
			properties: {};
			settings: {};
			name: string;
			path: string;
			project: string;
			created: string;
			modified: string;
			machineName: string;
		}[];
		input: boolean;
		tableView: boolean;
	}[];
	const revisions: string;
	const _vid: number;
	const title: string;
	const display: string;
	const access: {
		roles: string[];
		type: string;
	}[];
	const submissionAccess: {
		roles: never[];
		type: string;
	}[];
	const controller: string;
	const properties: {};
	const settings: {};
	const name: string;
	const path: string;
	const project: string;
	const created: string;
	const modified: string;
	const machineName: string;
}
export default _default;
