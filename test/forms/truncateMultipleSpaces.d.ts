declare namespace _default {
	const type: string;
	const components: (
		| {
				label: string;
				tableView: boolean;
				truncateMultipleSpaces: boolean;
				validate: {
					required: boolean;
					minLength?: undefined;
					maxLength?: undefined;
				};
				key: string;
				type: string;
				input: boolean;
				autoExpand?: undefined;
				disableOnInvalid?: undefined;
		  }
		| {
				label: string;
				tableView: boolean;
				validate: {
					minLength: number;
					maxLength: number;
					required?: undefined;
				};
				key: string;
				type: string;
				input: boolean;
				truncateMultipleSpaces: boolean;
				autoExpand?: undefined;
				disableOnInvalid?: undefined;
		  }
		| {
				label: string;
				autoExpand: boolean;
				tableView: boolean;
				validate: {
					minLength: number;
					maxLength: number;
					required?: undefined;
				};
				key: string;
				type: string;
				input: boolean;
				truncateMultipleSpaces: boolean;
				disableOnInvalid?: undefined;
		  }
		| {
				type: string;
				label: string;
				key: string;
				disableOnInvalid: boolean;
				input: boolean;
				tableView: boolean;
				truncateMultipleSpaces?: undefined;
				validate?: undefined;
				autoExpand?: undefined;
		  }
	)[];
	const title: string;
	const display: string;
}
export default _default;
