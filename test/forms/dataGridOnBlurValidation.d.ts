declare namespace _default {
	const _id: string;
	const type: string;
	const tags: never[];
	const owner: string;
	const components: (
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
					validateOn: string;
					validate: {
						minLength: number;
					};
					key: string;
					type: string;
					input: boolean;
				}[];
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
}
export default _default;
