export default Harness;
declare namespace Harness {
	export function builderBefore(done: any, options?: {}): void;
	export function builderAfter(done: any): void;
	export function getBuilder(): any;
	export function saveComponent(): void;
	export function buildComponent(type: any, container: any): any;
	export function setComponentProperty(
		property: any,
		before: any,
		after: any,
		cb: any
	): void;
	export function testBuilderProperty(
		property: any,
		before: any,
		after: any,
		previewRegEx: any,
		cb: any
	): void;
	export function getDate(): string;
	export function testCreate(
		Component: any,
		componentSettings: any,
		options?: {}
	): Promise<any>;
	export function testConditionals(
		form: any,
		submission: any,
		hidden: any,
		done: any
	): void;
	export function testVisibility(
		component: any,
		query: any,
		visible: any
	): void;
	export function testComponentVisibility(
		component: any,
		query: any,
		visible: any
	): void;
	export function clickElement(component: any, query: any): any;
	export function dispatchEvent(
		eventType: any,
		element: any,
		query: any,
		beforeDispatch: any
	): any;
	export function testElements(component: any, query: any, number: any): any;
	export function testElement(component: any, query: any, exists: any): any;
	export function testInnerHtml(component: any, query: any, content: any): void;
	export function testAttribute(
		component: any,
		query: any,
		attribute: any,
		value: any
	): void;
	export function testHasClass(
		component: any,
		query: any,
		className: any
	): void;
	export function testModalWrapperErrorClasses(
		component: any,
		shouldBeInvalid?: boolean,
		query?: string
	): void;
	export function testElementAttribute(
		element: any,
		attribute: any,
		expected: any
	): any;
	export function testSetGet(component: any, value: any): any;
	export function setInputValue(component: any, name: any, value: any): any;
	export function getInputValue(
		component: any,
		name: any,
		value: any,
		valueProperty?: string
	): void;
	export function setTagsValue(values: any, component: any): void;
	export function testSetInput(
		component: any,
		input: any,
		output: any,
		visible: any,
		index?: number
	): any;
	export function testSubmission(
		form: any,
		submission: any,
		onChange: any
	): void;
	export function testErrors(
		form: any,
		submission: any,
		errors: any,
		done: any
	): void;
	export function testValid(component: any, value: any): Promise<any>;
	export function testInvalid(
		component: any,
		value: any,
		field: any,
		expectedError: any
	): Promise<any>;
	export function testComponent(component: any, test: any, done: any): void;
	export function testWizardPrevPage(
		form: any,
		errors: any,
		onPrevPage: any
	): any;
	export function testWizardNextPage(
		form: any,
		errors: any,
		onNextPage: any
	): any;
	export function testNumberBlur(
		cmp: any,
		inv: any,
		outv: any,
		display: any,
		index?: number
	): void;
	export { onNext };
}
declare function onNext(cmp: any, event: any, cb: any): void;
