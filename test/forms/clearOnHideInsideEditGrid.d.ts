declare namespace _default {
	const type: string;
	const components: (
		| {
				title: string;
				collapsible: boolean;
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
							components: never[];
							openWhenEmpty?: undefined;
							hideLabel?: undefined;
							templates?: undefined;
							addAnother?: undefined;
							validate?: undefined;
							rowDrafts?: undefined;
					  }
					| {
							label: string;
							openWhenEmpty: boolean;
							hideLabel: boolean;
							tableView: boolean;
							templates: {
								header: string;
								row: string;
							};
							addAnother: string;
							validate: {
								maxLength: number;
							};
							rowDrafts: boolean;
							key: string;
							type: string;
							input: boolean;
							components: {
								label: string;
								tableView: boolean;
								key: string;
								type: string;
								input: boolean;
								components: (
									| {
											label: string;
											columns: (
												| {
														components: {
															label: string;
															tableView: boolean;
															validate: {
																required: boolean;
																maxLength: number;
															};
															key: string;
															type: string;
															input: boolean;
															hideOnChildrenHidden: boolean;
														}[];
														width: number;
														offset: number;
														push: number;
														pull: number;
														size: string;
														currentWidth: number;
												  }
												| {
														components: {
															label: string;
															tableView: boolean;
															validate: {
																pattern: string;
																customMessage: string;
															};
															key: string;
															type: string;
															input: boolean;
															hideOnChildrenHidden: boolean;
														}[];
														width: number;
														offset: number;
														push: number;
														pull: number;
														size: string;
														currentWidth: number;
												  }
											)[];
											key: string;
											type: string;
											input: boolean;
											tableView: boolean;
											clearOnHide: boolean;
											validate?: undefined;
											hideOnChildrenHidden?: undefined;
									  }
									| {
											label: string;
											columns: {
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
													hideOnChildrenHidden: boolean;
												}[];
												width: number;
												offset: number;
												push: number;
												pull: number;
												size: string;
												currentWidth: number;
											}[];
											key: string;
											type: string;
											input: boolean;
											tableView: boolean;
											clearOnHide: boolean;
											validate?: undefined;
											hideOnChildrenHidden?: undefined;
									  }
									| {
											label: string;
											tableView: boolean;
											validate: {
												maxLength: number;
											};
											key: string;
											customConditional: string;
											type: string;
											input: boolean;
											hideOnChildrenHidden: boolean;
											columns?: undefined;
											clearOnHide?: undefined;
									  }
								)[];
							}[];
							legend?: undefined;
					  }
				)[];
				clearOnHide: boolean;
				showValidations?: undefined;
		  }
		| {
				label: string;
				showValidations: boolean;
				tableView: boolean;
				key: string;
				type: string;
				input: boolean;
				title?: undefined;
				collapsible?: undefined;
				components?: undefined;
				clearOnHide?: undefined;
		  }
	)[];
	const revisions: string;
	const _vid: number;
	const title: string;
	const display: string;
}
export default _default;
