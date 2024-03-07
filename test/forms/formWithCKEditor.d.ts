declare namespace _default {
	const type: string;
	const components: (
		| {
				label: string;
				editor: string;
				tableView: boolean;
				key: string;
				type: string;
				input: boolean;
				isUploadEnabled: boolean;
				disableOnInvalid?: undefined;
		  }
		| {
				type: string;
				label: string;
				key: string;
				disableOnInvalid: boolean;
				input: boolean;
				tableView: boolean;
				editor?: undefined;
				isUploadEnabled?: undefined;
		  }
	)[];
	const title: string;
	const display: string;
}
export default _default;
