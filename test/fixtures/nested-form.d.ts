declare namespace _default {
	const _id: string;
	const type: string;
	const tags: never[];
	const owner: string;
	const components: (
		| {
				label: string;
				tableView: boolean;
				components: (
					| {
							label: string;
							tableView: boolean;
							key: string;
							type: string;
							input: boolean;
							reorder?: undefined;
							addAnotherPosition?: undefined;
							defaultOpen?: undefined;
							layoutFixed?: undefined;
							enableRowGroups?: undefined;
							defaultValue?: undefined;
							components?: undefined;
							disableOnInvalid?: undefined;
					  }
					| {
							label: string;
							reorder: boolean;
							addAnotherPosition: string;
							defaultOpen: boolean;
							layoutFixed: boolean;
							enableRowGroups: boolean;
							tableView: boolean;
							defaultValue: {}[];
							key: string;
							type: string;
							input: boolean;
							components: {
								label: string;
								tableView: boolean;
								key: string;
								type: string;
								input: boolean;
							}[];
							disableOnInvalid?: undefined;
					  }
					| {
							label: string;
							components: {
								label: string;
								key: string;
								components: {
									label: string;
									tableView: boolean;
									key: string;
									type: string;
									input: boolean;
								}[];
							}[];
							tableView: boolean;
							key: string;
							type: string;
							input: boolean;
							reorder?: undefined;
							addAnotherPosition?: undefined;
							defaultOpen?: undefined;
							layoutFixed?: undefined;
							enableRowGroups?: undefined;
							defaultValue?: undefined;
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
							defaultValue?: undefined;
							components?: undefined;
					  }
				)[];
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
				components?: undefined;
		  }
	)[];
	const controller: string;
	const revisions: string;
	const _vid: number;
	const title: string;
	const display: string;
	const access: {
		roles: string[];
		type: string;
	}[];
	const submissionAccess: never[];
	const settings: {};
	const properties: {};
	const name: string;
	const path: string;
	const project: string;
}
export default _default;
