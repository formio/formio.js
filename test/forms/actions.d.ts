declare namespace _default {
	const title: string;
	namespace form {
		const components: (
			| {
					type: string;
					input: boolean;
					key: string;
					label?: undefined;
					tree?: undefined;
					legend?: undefined;
					components?: undefined;
					tag?: undefined;
					content?: undefined;
					className?: undefined;
					size?: undefined;
					leftIcon?: undefined;
					rightIcon?: undefined;
					block?: undefined;
					action?: undefined;
					disableOnInvalid?: undefined;
					theme?: undefined;
			  }
			| {
					type: string;
					input: boolean;
					label: string;
					key: string;
					tree?: undefined;
					legend?: undefined;
					components?: undefined;
					tag?: undefined;
					content?: undefined;
					className?: undefined;
					size?: undefined;
					leftIcon?: undefined;
					rightIcon?: undefined;
					block?: undefined;
					action?: undefined;
					disableOnInvalid?: undefined;
					theme?: undefined;
			  }
			| {
					type: string;
					input: boolean;
					tree: boolean;
					legend: string;
					components: {
						input: boolean;
						type: string;
						key: string;
						components: (
							| {
									clearOnHide: boolean;
									label: string;
									input: boolean;
									key: string;
									columns: (
										| {
												components: {
													input: boolean;
													label: string;
													key: string;
													placeholder: string;
													data: {
														values: {
															value: string;
															label: string;
														}[];
													};
													dataSrc: string;
													valueProperty: string;
													template: string;
													persistent: boolean;
													type: string;
													description: string;
												}[];
												width: number;
												offset: number;
												push: number;
												pull: number;
										  }
										| {
												components: {
													label: string;
													key: string;
													inputType: string;
													defaultValue: string;
													input: boolean;
													placeholder: string;
													prefix: string;
													suffix: string;
													type: string;
													multiple: boolean;
													validate: {
														required: boolean;
													};
													description: string;
												}[];
												width: number;
												offset: number;
												push: number;
												pull: number;
										  }
									)[];
									type: string;
									tableView?: undefined;
									title?: undefined;
									components?: undefined;
							  }
							| {
									key: string;
									input: boolean;
									tableView: boolean;
									title: string;
									components: (
										| {
												type: string;
												persistent: boolean;
												protected: boolean;
												defaultValue: boolean;
												key: string;
												label: string;
												tooltip: string;
												hideLabel: boolean;
												inputType: string;
												input: boolean;
												tableView?: undefined;
												legend?: undefined;
												components?: undefined;
												tree?: undefined;
												addAnother?: undefined;
										  }
										| {
												key: string;
												input: boolean;
												tableView: boolean;
												legend: string;
												components: {
													label: string;
													key: string;
													inputType: string;
													defaultValue: string;
													input: boolean;
													placeholder: string;
													type: string;
													multiple: boolean;
												}[];
												type: string;
												label: string;
												persistent?: undefined;
												protected?: undefined;
												defaultValue?: undefined;
												tooltip?: undefined;
												hideLabel?: undefined;
												inputType?: undefined;
												tree?: undefined;
												addAnother?: undefined;
										  }
										| {
												input: boolean;
												tree: boolean;
												components: {
													input: boolean;
													tableView: boolean;
													inputType: string;
													label: string;
													key: string;
													protected: boolean;
													persistent: boolean;
													clearOnHide: boolean;
													type: string;
													inDataGrid: boolean;
												}[];
												label: string;
												key: string;
												persistent: boolean;
												type: string;
												addAnother: string;
												protected?: undefined;
												defaultValue?: undefined;
												tooltip?: undefined;
												hideLabel?: undefined;
												inputType?: undefined;
												tableView?: undefined;
												legend?: undefined;
										  }
									)[];
									type: string;
									label: string;
									clearOnHide?: undefined;
									columns?: undefined;
							  }
							| {
									key: string;
									input: boolean;
									tableView: boolean;
									title: string;
									components: (
										| {
												key: string;
												input: boolean;
												html: string;
												type: string;
												label: string;
												autofocus?: undefined;
												tableView?: undefined;
												placeholder?: undefined;
												rows?: undefined;
												multiple?: undefined;
												defaultValue?: undefined;
												protected?: undefined;
												persistent?: undefined;
												hidden?: undefined;
												wysiwyg?: undefined;
												spellcheck?: undefined;
												description?: undefined;
										  }
										| {
												autofocus: boolean;
												input: boolean;
												tableView: boolean;
												label: string;
												key: string;
												placeholder: string;
												rows: number;
												multiple: boolean;
												defaultValue: string;
												protected: boolean;
												persistent: boolean;
												hidden: boolean;
												wysiwyg: boolean;
												spellcheck: boolean;
												type: string;
												description: string;
												html?: undefined;
										  }
									)[];
									type: string;
									label: string;
									clearOnHide?: undefined;
									columns?: undefined;
							  }
							| {
									key: string;
									type: string;
									title: string;
									input: boolean;
									components: (
										| {
												type: string;
												persistent: boolean;
												protected: boolean;
												defaultValue: boolean;
												key: string;
												label: string;
												hideLabel: boolean;
												inputType: string;
												input: boolean;
												html?: undefined;
												multiple?: undefined;
												unique?: undefined;
												description?: undefined;
												clearOnHide?: undefined;
										  }
										| {
												key: string;
												input: boolean;
												html: string;
												type: string;
												label: string;
												persistent?: undefined;
												protected?: undefined;
												defaultValue?: undefined;
												hideLabel?: undefined;
												inputType?: undefined;
												multiple?: undefined;
												unique?: undefined;
												description?: undefined;
												clearOnHide?: undefined;
										  }
										| {
												input: boolean;
												inputType: string;
												label: string;
												key: string;
												multiple: boolean;
												protected: boolean;
												unique: boolean;
												persistent: boolean;
												type: string;
												description: string;
												defaultValue?: undefined;
												hideLabel?: undefined;
												html?: undefined;
												clearOnHide?: undefined;
										  }
										| {
												input: boolean;
												inputType: string;
												label: string;
												key: string;
												multiple: boolean;
												protected: boolean;
												clearOnHide: boolean;
												type: string;
												description: string;
												persistent?: undefined;
												defaultValue?: undefined;
												hideLabel?: undefined;
												html?: undefined;
												unique?: undefined;
										  }
									)[];
									clearOnHide?: undefined;
									label?: undefined;
									columns?: undefined;
									tableView?: undefined;
							  }
						)[];
					}[];
					key?: undefined;
					label?: undefined;
					tag?: undefined;
					content?: undefined;
					className?: undefined;
					size?: undefined;
					leftIcon?: undefined;
					rightIcon?: undefined;
					block?: undefined;
					action?: undefined;
					disableOnInvalid?: undefined;
					theme?: undefined;
			  }
			| {
					type: string;
					input: boolean;
					tree: boolean;
					key: string;
					legend: string;
					components: {
						type: string;
						input: boolean;
						key: string;
						label: string;
						placeholder: string;
						dataSrc: string;
						data: {
							json: string;
						};
						template: string;
						valueProperty: string;
						multiple: boolean;
					}[];
					label?: undefined;
					tag?: undefined;
					content?: undefined;
					className?: undefined;
					size?: undefined;
					leftIcon?: undefined;
					rightIcon?: undefined;
					block?: undefined;
					action?: undefined;
					disableOnInvalid?: undefined;
					theme?: undefined;
			  }
			| {
					key: string;
					type: string;
					input: boolean;
					tree: boolean;
					legend: string;
					components: {
						type: string;
						key: string;
						input: boolean;
						tree: boolean;
						components: {
							key: string;
							type: string;
							input: boolean;
							columns: (
								| {
										components: (
											| {
													type: string;
													input: boolean;
													label: string;
													key: string;
													placeholder: string;
													template: string;
													dataSrc: string;
													data: {
														json: string;
														values?: undefined;
														url?: undefined;
														resource?: undefined;
													};
													valueProperty: string;
													multiple: boolean;
													inputType?: undefined;
											  }
											| {
													type: string;
													input: boolean;
													label: string;
													key: string;
													placeholder: string;
													template: string;
													dataSrc: string;
													data: {
														values: {
															value: string;
															label: string;
														}[];
														json: string;
														url: string;
														resource: string;
													};
													valueProperty: string;
													multiple: boolean;
													inputType?: undefined;
											  }
											| {
													input: boolean;
													type: string;
													inputType: string;
													label: string;
													key: string;
													placeholder: string;
													multiple: boolean;
													template?: undefined;
													dataSrc?: undefined;
													data?: undefined;
													valueProperty?: undefined;
											  }
										)[];
								  }
								| {
										components: {
											key: string;
											type: string;
											input: boolean;
											components: (
												| {
														key: string;
														type: string;
														tag: string;
														input: boolean;
														content: string;
														className: string;
														label?: undefined;
														editorComponents?: undefined;
														placeholder?: undefined;
												  }
												| {
														label: string;
														type: string;
														input: boolean;
														key: string;
														editorComponents: (
															| {
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
																	inputMask: string;
																	allowMultipleMasks: boolean;
																	customClass: string;
																	tabindex: string;
																	hidden: boolean;
																	hideLabel: boolean;
																	showWordCount: boolean;
																	showCharCount: boolean;
																	mask: boolean;
																	autofocus: boolean;
																	spellcheck: boolean;
																	disabled: boolean;
																	tableView: boolean;
																	modalEdit: boolean;
																	multiple: boolean;
																	persistent: boolean;
																	inputFormat: string;
																	protected: boolean;
																	dbIndex: boolean;
																	case: string;
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
																		pattern: string;
																		customMessage: string;
																		custom: string;
																		customPrivate: boolean;
																		json: string;
																		minLength: string;
																		maxLength: string;
																		strictDateValidation: boolean;
																		multiple: boolean;
																		unique: boolean;
																	};
																	unique: boolean;
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
																	refreshOn: string;
																	inputType: string;
																	id: string;
																	defaultValue: string;
																	size?: undefined;
																	block?: undefined;
																	action?: undefined;
																	disableOnInvalid?: undefined;
																	theme?: undefined;
																	leftIcon?: undefined;
																	rightIcon?: undefined;
																	dataGridLabel?: undefined;
															  }
															| {
																	type: string;
																	label: string;
																	key: string;
																	size: string;
																	block: boolean;
																	action: string;
																	disableOnInvalid: boolean;
																	theme: string;
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
																	tableView: boolean;
																	modalEdit: boolean;
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
																		pattern?: undefined;
																		customMessage?: undefined;
																		json?: undefined;
																		minLength?: undefined;
																		maxLength?: undefined;
																	};
																	conditional: {
																		show: null;
																		when: null;
																		eq: string;
																		json?: undefined;
																	};
																	overlay: {
																		style: string;
																		left: string;
																		top: string;
																		width: string;
																		height: string;
																		page?: undefined;
																	};
																	allowCalculateOverride: boolean;
																	encrypted: boolean;
																	showCharCount: boolean;
																	showWordCount: boolean;
																	properties: {};
																	allowMultipleMasks: boolean;
																	leftIcon: string;
																	rightIcon: string;
																	dataGridLabel: boolean;
																	id: string;
																	inputMask?: undefined;
																	mask?: undefined;
																	spellcheck?: undefined;
																	inputFormat?: undefined;
																	case?: undefined;
																	calculateServer?: undefined;
																	tags?: undefined;
																	logic?: undefined;
																	inputType?: undefined;
															  }
														)[];
														placeholder: string;
														tag?: undefined;
														content?: undefined;
														className?: undefined;
												  }
											)[];
										}[];
								  }
							)[];
						}[];
					}[];
					label?: undefined;
					tag?: undefined;
					content?: undefined;
					className?: undefined;
					size?: undefined;
					leftIcon?: undefined;
					rightIcon?: undefined;
					block?: undefined;
					action?: undefined;
					disableOnInvalid?: undefined;
					theme?: undefined;
			  }
			| {
					key: string;
					type: string;
					tag: string;
					input: boolean;
					content: string;
					className: string;
					label?: undefined;
					tree?: undefined;
					legend?: undefined;
					components?: undefined;
					size?: undefined;
					leftIcon?: undefined;
					rightIcon?: undefined;
					block?: undefined;
					action?: undefined;
					disableOnInvalid?: undefined;
					theme?: undefined;
			  }
			| {
					type: string;
					input: boolean;
					label: string;
					key: string;
					size: string;
					leftIcon: string;
					rightIcon: string;
					block: boolean;
					action: string;
					disableOnInvalid: boolean;
					theme: string;
					tree?: undefined;
					legend?: undefined;
					components?: undefined;
					tag?: undefined;
					content?: undefined;
					className?: undefined;
			  }
		)[];
		const action: string;
	}
	const tests: {
		'Test initialize action with data'(form: any, done: any): void;
	};
}
export default _default;
