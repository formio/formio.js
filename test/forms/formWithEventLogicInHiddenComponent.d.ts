declare namespace _default {
	const type: string;
	const components: (
		| {
				label: string;
				widget: string;
				tableView: boolean;
				multiple: boolean;
				data: {
					values: {
						label: string;
						value: string;
					}[];
				};
				key: string;
				type: string;
				input: boolean;
				disableAddingRemovingRows?: undefined;
				reorder?: undefined;
				addAnotherPosition?: undefined;
				layoutFixed?: undefined;
				enableRowGroups?: undefined;
				initEmpty?: undefined;
				hidden?: undefined;
				hideLabel?: undefined;
				disableSortingAndFiltering?: undefined;
				clearOnHide?: undefined;
				validate?: undefined;
				logic?: undefined;
				components?: undefined;
				showValidations?: undefined;
				saveOnEnter?: undefined;
		  }
		| {
				label: string;
				disableAddingRemovingRows: boolean;
				reorder: boolean;
				addAnotherPosition: string;
				layoutFixed: boolean;
				enableRowGroups: boolean;
				initEmpty: boolean;
				hidden: boolean;
				hideLabel: boolean;
				disableSortingAndFiltering: boolean;
				tableView: boolean;
				clearOnHide: boolean;
				validate: {
					custom: string;
				};
				key: string;
				logic: {
					name: string;
					trigger: {
						type: string;
						simple: {
							show: boolean;
							when: string;
							eq: string;
						};
					};
					actions: {
						name: string;
						type: string;
						property: {
							label: string;
							value: string;
							type: string;
						};
						state: boolean;
					}[];
				}[];
				type: string;
				input: boolean;
				components: {
					label: string;
					columns: (
						| {
								components: {
									label: string;
									tag: string;
									attrs: {
										attr: string;
										value: string;
									}[];
									content: string;
									refreshOnChange: boolean;
									key: string;
									type: string;
									input: boolean;
									tableView: boolean;
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
									hideLabel: boolean;
									disableSortingAndFiltering: boolean;
									tableView: boolean;
									clearOnHide: boolean;
									key: string;
									logic: {
										name: string;
										trigger: {
											type: string;
											simple: {};
											event: string;
										};
										actions: (
											| {
													name: string;
													type: string;
													value: string;
													customAction?: undefined;
											  }
											| {
													name: string;
													type: string;
													customAction: string;
													value?: undefined;
											  }
										)[];
									}[];
									type: string;
									delimiter: boolean;
									requireDecimal: boolean;
									enableManualMode: boolean;
									input: boolean;
								}[];
								width: number;
								offset: number;
								push: number;
								pull: number;
								size: string;
								currentWidth: number;
						  }
					)[];
					hideLabel: boolean;
					disableSortingAndFiltering: boolean;
					key: string;
					type: string;
					input: boolean;
					tableView: boolean;
				}[];
				widget?: undefined;
				multiple?: undefined;
				data?: undefined;
				showValidations?: undefined;
				saveOnEnter?: undefined;
		  }
		| {
				label: string;
				disableAddingRemovingRows: boolean;
				reorder: boolean;
				addAnotherPosition: string;
				layoutFixed: boolean;
				enableRowGroups: boolean;
				initEmpty: boolean;
				hideLabel: boolean;
				disableSortingAndFiltering: boolean;
				tableView: boolean;
				clearOnHide: boolean;
				validate: {
					custom: string;
				};
				key: string;
				logic: {
					name: string;
					trigger: {
						type: string;
						simple: {
							show: boolean;
							when: string;
							eq: string;
						};
					};
					actions: {
						name: string;
						type: string;
						property: {
							label: string;
							value: string;
							type: string;
						};
						state: boolean;
					}[];
				}[];
				type: string;
				input: boolean;
				components: {
					label: string;
					columns: (
						| {
								components: {
									label: string;
									tag: string;
									attrs: {
										attr: string;
										value: string;
									}[];
									content: string;
									refreshOnChange: boolean;
									key: string;
									type: string;
									input: boolean;
									tableView: boolean;
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
									hideLabel: boolean;
									disableSortingAndFiltering: boolean;
									tableView: boolean;
									clearOnHide: boolean;
									key: string;
									logic: {
										name: string;
										trigger: {
											type: string;
											event: string;
										};
										actions: (
											| {
													name: string;
													type: string;
													value: string;
													customAction?: undefined;
											  }
											| {
													name: string;
													type: string;
													customAction: string;
													value?: undefined;
											  }
										)[];
									}[];
									type: string;
									delimiter: boolean;
									requireDecimal: boolean;
									input: boolean;
								}[];
								width: number;
								offset: number;
								push: number;
								pull: number;
								size: string;
								currentWidth: number;
						  }
					)[];
					hideLabel: boolean;
					disableSortingAndFiltering: boolean;
					key: string;
					type: string;
					input: boolean;
					tableView: boolean;
				}[];
				widget?: undefined;
				multiple?: undefined;
				data?: undefined;
				hidden?: undefined;
				showValidations?: undefined;
				saveOnEnter?: undefined;
		  }
		| {
				label: string;
				showValidations: boolean;
				tableView: boolean;
				key: string;
				logic: {
					name: string;
					trigger: {
						type: string;
						event: string;
					};
					actions: {
						name: string;
						type: string;
						property: {
							label: string;
							value: string;
							type: string;
						};
						state: boolean;
					}[];
				}[];
				type: string;
				saveOnEnter: boolean;
				input: boolean;
				widget?: undefined;
				multiple?: undefined;
				data?: undefined;
				disableAddingRemovingRows?: undefined;
				reorder?: undefined;
				addAnotherPosition?: undefined;
				layoutFixed?: undefined;
				enableRowGroups?: undefined;
				initEmpty?: undefined;
				hidden?: undefined;
				hideLabel?: undefined;
				disableSortingAndFiltering?: undefined;
				clearOnHide?: undefined;
				validate?: undefined;
				components?: undefined;
		  }
	)[];
	const title: string;
	const display: string;
	const name: string;
	const path: string;
	const machineName: string;
}
export default _default;
