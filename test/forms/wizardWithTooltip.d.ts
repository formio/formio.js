declare namespace _default {
	const _id: string;
	const type: string;
	const components: (
		| {
				title: string;
				theme: string;
				breadcrumb: string;
				breadcrumbClickable: boolean;
				buttonSettings: {
					previous: boolean;
					cancel: boolean;
					next: boolean;
				};
				tooltip: string;
				customClass: string;
				collapsible: boolean;
				hidden: boolean;
				hideLabel: boolean;
				disabled: boolean;
				modalEdit: boolean;
				key: string;
				tags: never[];
				properties: {};
				customConditional: string;
				conditional: {
					json: string;
					show: null;
					when: null;
					eq: string;
				};
				nextPage: string;
				logic: never[];
				attributes: {};
				overlay: {
					style: string;
					page: string;
					left: string;
					top: string;
					width: string;
					height: string;
				};
				type: string;
				label: string;
				tabindex: string;
				components: {
					label: string;
					labelPosition: string;
					placeholder: string;
					description: string;
					tooltip: string;
					prefix: string;
					suffix: string;
					widget: {
						type: string;
					};
					customClass: string;
					tabindex: string;
					autocomplete: string;
					hidden: boolean;
					hideLabel: boolean;
					mask: boolean;
					autofocus: boolean;
					spellcheck: boolean;
					disabled: boolean;
					tableView: boolean;
					modalEdit: boolean;
					multiple: boolean;
					persistent: boolean;
					delimiter: boolean;
					requireDecimal: boolean;
					inputFormat: string;
					protected: boolean;
					dbIndex: boolean;
					encrypted: boolean;
					redrawOn: string;
					clearOnHide: boolean;
					customDefaultValue: string;
					calculateValue: string;
					calculateServer: boolean;
					allowCalculateOverride: boolean;
					validateOn: string;
					validate: {
						required: boolean;
						customMessage: string;
						custom: string;
						customPrivate: boolean;
						json: string;
						min: string;
						max: string;
						strictDateValidation: boolean;
						multiple: boolean;
						unique: boolean;
						step: string;
						integer: string;
					};
					errorLabel: string;
					key: string;
					tags: never[];
					properties: {};
					conditional: {
						show: null;
						when: null;
						eq: string;
						json: string;
					};
					customConditional: string;
					logic: never[];
					attributes: {};
					overlay: {
						style: string;
						page: string;
						left: string;
						top: string;
						width: string;
						height: string;
					};
					type: string;
					input: boolean;
					unique: boolean;
					refreshOn: string;
					dataGridLabel: boolean;
					showCharCount: boolean;
					showWordCount: boolean;
					allowMultipleMasks: boolean;
					id: string;
					defaultValue: null;
				}[];
				input: boolean;
				tableView: boolean;
				placeholder: string;
				prefix: string;
				suffix: string;
				multiple: boolean;
				defaultValue: null;
				protected: boolean;
				unique: boolean;
				persistent: boolean;
				clearOnHide: boolean;
				refreshOn: string;
				redrawOn: string;
				dataGridLabel: boolean;
				labelPosition: string;
				description: string;
				errorLabel: string;
				autofocus: boolean;
				dbIndex: boolean;
				customDefaultValue: string;
				calculateValue: string;
				calculateServer: boolean;
				widget: null;
				validateOn: string;
				validate: {
					required: boolean;
					custom: string;
					customPrivate: boolean;
					strictDateValidation: boolean;
					multiple: boolean;
					unique: boolean;
				};
				allowCalculateOverride: boolean;
				encrypted: boolean;
				showCharCount: boolean;
				showWordCount: boolean;
				allowMultipleMasks: boolean;
				tree: boolean;
				id: string;
		  }
		| {
				title: string;
				theme: string;
				breadcrumb: string;
				breadcrumbClickable: boolean;
				buttonSettings: {
					previous: boolean;
					cancel: boolean;
					next: boolean;
				};
				tooltip: string;
				customClass: string;
				collapsible: boolean;
				hidden: boolean;
				hideLabel: boolean;
				disabled: boolean;
				modalEdit: boolean;
				key: string;
				tags: never[];
				properties: {};
				customConditional: string;
				conditional: {
					json: string;
					show: null;
					when: null;
					eq: string;
				};
				nextPage: string;
				logic: never[];
				attributes: {};
				overlay: {
					style: string;
					page: string;
					left: string;
					top: string;
					width: string;
					height: string;
				};
				type: string;
				label: string;
				tabindex: string;
				components: {
					label: string;
					tableView: boolean;
					key: string;
					type: string;
					input: boolean;
					placeholder: string;
					prefix: string;
					customClass: string;
					suffix: string;
					multiple: boolean;
					defaultValue: null;
					protected: boolean;
					unique: boolean;
					persistent: boolean;
					hidden: boolean;
					clearOnHide: boolean;
					refreshOn: string;
					redrawOn: string;
					modalEdit: boolean;
					dataGridLabel: boolean;
					labelPosition: string;
					description: string;
					errorLabel: string;
					tooltip: string;
					hideLabel: boolean;
					tabindex: string;
					disabled: boolean;
					autofocus: boolean;
					dbIndex: boolean;
					customDefaultValue: string;
					calculateValue: string;
					calculateServer: boolean;
					widget: {
						type: string;
					};
					attributes: {};
					validateOn: string;
					validate: {
						required: boolean;
						custom: string;
						customPrivate: boolean;
						strictDateValidation: boolean;
						multiple: boolean;
						unique: boolean;
						minLength: string;
						maxLength: string;
						pattern: string;
					};
					conditional: {
						show: null;
						when: null;
						eq: string;
					};
					overlay: {
						style: string;
						left: string;
						top: string;
						width: string;
						height: string;
					};
					allowCalculateOverride: boolean;
					encrypted: boolean;
					showCharCount: boolean;
					showWordCount: boolean;
					properties: {};
					allowMultipleMasks: boolean;
					mask: boolean;
					inputType: string;
					inputFormat: string;
					inputMask: string;
					spellcheck: boolean;
					id: string;
				}[];
				input: boolean;
				tableView: boolean;
				placeholder: string;
				prefix: string;
				suffix: string;
				multiple: boolean;
				defaultValue: null;
				protected: boolean;
				unique: boolean;
				persistent: boolean;
				clearOnHide: boolean;
				refreshOn: string;
				redrawOn: string;
				dataGridLabel: boolean;
				labelPosition: string;
				description: string;
				errorLabel: string;
				autofocus: boolean;
				dbIndex: boolean;
				customDefaultValue: string;
				calculateValue: string;
				calculateServer: boolean;
				widget: null;
				validateOn: string;
				validate: {
					required: boolean;
					custom: string;
					customPrivate: boolean;
					strictDateValidation: boolean;
					multiple: boolean;
					unique: boolean;
				};
				allowCalculateOverride: boolean;
				encrypted: boolean;
				showCharCount: boolean;
				showWordCount: boolean;
				allowMultipleMasks: boolean;
				tree: boolean;
				id: string;
		  }
	)[];
	const title: string;
	const display: string;
	const name: string;
	const path: string;
}
export default _default;
