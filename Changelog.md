# Change Log
All notable changes to this project will be documented in this file

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## 2.30.2
### Fixed
 - Problem where values would not get reset before getting deleted with clear on hide.
 - Issue where change events would fire continuously because of eroneous hasChanged checks.

## 2.30.1
### Added
 - `moment` library in calculated value and advanced conditional.
 - Add ability to pass options to currentUser function.

### Changed
 - Removed the duck-punch from choices library for strict equality since they pulled in our pull request.

### Fixed
 - Empty string in email validator.
 - Min-max for DataGrid component.

## 2.30.0
### Fixed
 - Required validator for Checkbox component.
 - Radio and SelectBoxes components for the case with multiple nested forms.
 - Number and Currency components default value.
 - Input mask problems where a single instance was used to manage multiple inputs.
 - Issues with onChange events not firing for Select components.
 - Streamlined the language inititalization.

### Added
 - Better data handling using getters and setters.

### Changed
 - Deprecating "getRawValue" with reverse compatibility in favor of component.dataValue.
 - Made currency component to have a delimiter unless specified otherwise.

## 2.29.13
### Fixed
 - Problem with some crashes within the file component.
 - Make sure the Submit button was not disabled even if form was readonly
 - Problem with the DataGrid component default values copying from row to row.

### Added
 - The ability to prevent a component from being disabled with a "alwaysEnabled" property.

## 2.29.12
### Fixed
 - Custom events not firing for button custom events.
 - Issue with conditoinals not checking on form components before loading subforms.

## 2.29.11
### Changed
 - Upgraded browserify@16.1.1 eslint@4.18.2 fetch-mock@6.0.1 mocha@5.0.4 watchify@3.11.0 gulp-strip-debug@3.0.0 marked@0.3.17
 - Added exports that are reverse compatible with ES5.

### Fixed
 - Display for resource fields within submission grid.

## 2.29.10
### Fixed
 - Issues with getView so that it does not throw errors.
 - Min and Max settings on DataGrid to stop showing Add Another button.

## 2.29.9
### Fixed
 - Issues with IE not translating Date's properly.

## 2.29.8
### Fixed
 - Include polyfill for bind to fix PDF generation.

### Changed
 - Upgraded i18next to 10.5.0

## 2.29.7
### Fixed
 - Fix validations automatically triggering if you have only a container on a form at the root level.

## 2.29.6
### Fixed
 - Fix validation and nested form issues with wizard.

## 2.29.5
### Fixed
 - Ensure that the form components do not load if conditions on the component return false.

## 2.29.4
### Added
 - More input hooks to certain components.

### Fixed
 - Issue where file component values would reset.

### Changed
 - The select component will now enable search by default and can be turned off with "searchEnabled" flag on component.

## 2.29.3
### Fixed
 - Issue with the providers not getting registered correctly.

## 2.29.2
### Changed
 - Upgraded i18next to 10.4.1

### Fixed
 - Problem where DataGrid could add duplicate columns.

### Added
 - Add ability to have oauth initiated logins.

## 2.29.1
### Added
 - 'Delimiter' property to Number component.
 - Error message below submit button.
 - WYSIWYG spellcheck option for the Quill editor.

### Fixed
 - Issues with clearOnHide
 - Fixed radio button wrapping issue
 - Problems with the wysiwyg editor clearing values within a datagrid.
 - Asterisks for Checkbox component with 'inputsOnly' option.
 - The Formio.cache to return new promises instead of using old ones.

### Changed
 - Cleanup and performance improvements on how conditions are checked and evaluated.
 - How the loader icon is added to the renderer by adding an additional DOM element above the form components.
 - Upgrade flatpickr to version 4.3.2
 - Improved viewAsHtml and asString features.

## 2.29.0
### Added
 - New Field Logic feature.
 - Ability for buttons to be configured with a URL that will send the submission to that url when pressed.

### Changed
 - Upgraded all dependencies.
 - Reverted choices.js to use npm version and duck-punch the deep equality checks.

### Fixed
 - Issue with Required WYSIWYG TextArea always triggering validation error on load.
 - Problem where backspacing the wysiwyg editor was not working.
 - Problem where tabbing into a wysiwyg editor would select buttons on the wysiwyg.
 - Problem with the Form component where it would load the form when a default submission is provided.
 - Performance issues with both EditGrid and DataGrid.
 - Issue with false conditionals and null values.
 - Issue with the "render" event not firing when form is rendered.
 - Problems with the viewAsHtml flag not rendering the submission.

## 2.28.6
### Added
 - Autofocus capability.
 - Ability to provide spellcheck parameter to input.

### Fixed
 - Some issues with subforms when performing calcuated values
 - Problems with subforms performing the load when they are not conditionally available.

## 2.28.5
### Fixed
 - Issue with input mask crashing when no input mask is on the field.

## 2.28.4
### Added
 - Mask validator for Phone Number.

### Fixed
 - Default value for component with input mask.

## 2.28.3
### Changed
 - The conditional logic where a parent that is conditionally invisible is overridden by a child conditionally visible.
   This logic is different from the Angular 1 renderer, so we made it consistent where a conditionally visible child will not
   override a conditionally hidden parent. However, this behavior can be changed by providing the "conditional.overrideParent" flag
   on the child component.

## 2.28.2
### Fixed
 - Issues with the sub-form component not loading the proper source for remote servers.
 - Issues with the sub-form component not passing along sub data to conditional checks properly.

## 2.28.1
### Fixed
 - Text mask dependencies

## 2.28.0
### Added
 - Support for Bootstrap 4
 - EditGrid Component.
 - Stripe integration within Contrib.

### Fixed
 - Small problem with read-only file uplaods where it would allow you to remove files.

## 2.27.6
### Fixed
 - Issue where the ready promise was not getting fired if a submission is not provided.

## 2.27.5
### Fixed
 - The package.json for the choices.js library to not use a git url.

## 2.27.4
### Added
 - The ability for the search to be an array of values.

## 2.27.3
### Fixed
 - Issue with the checkCalculated method not working for datagrids.

## 2.27.2
### Added
 - Support for OAuth buttons in the renderer.
 - Ability to add the "Add Another" button on datagrid to either above or below the grid.

### Fixed
 - Problem where a padding-right is applied to all has-feedback inputs even though an icon is not used.

## 2.27.1
### Fixed
 - Problem with default values on wizards.
 - Issue where row is not passed to calculated values.
 - Select Resource component searching.

### Added
 - Ability to auto load the initial values for lazyLoad select with search enabled.
 - CSS class ('radio-selected') for selected option of Radio component

## 2.27.0
### Fixed
 - Issue where read-only forms would still try to submit.
 - Problem with read-only wizards triggering beforeSubmit handlers.
 - Fix issue where submissions made before revisions are made will sometimes cause the form to not load.

### Changed
 - Upgrade all dependencies

## 2.26.2
### Fixed
 - Problem where a component has input should also return true if it has inputs.

## 2.26.1
### Fixed
 - Problems where data keys are added even if component is not set with input.
 - Failing tests.
 - Datagrid data merging.

### Changed
 - Upgraded choices.js to 3.0.3 which includes performance fix.
 - Removed performance hack in Select since 3.0.3 of choices resolves the problem.

## 2.26.0
### Added
 - New contributed module system with Stripe integration.
 - A way to pass the formio instance object to the currentUser and accessInfo methods.

## 2.25.8
### Added
 - Support for JSONLogic dates.
 - Added 'searchEnabled' option and defaulted it to false, user can enable it with component property
 - Updated default value for 'removeItemButton' option to multi-select OR false, and if needed user can enable it with the component property
 - Date formatting based on the locale configuration
 - viewAsHTML feature.
 - Confirmation dialog before a form/wizard is canceled.

## 2.25.7
### Fixed
 - Problem with the Select dropdown from re-rendering after it has been destroyed.
 - Issue with the default select for html5 widgets.

### Changed
 - Upgrade moment to 2.20.1

## 2.25.6
### Added
 - Ability to dynamically alter text based on input data.
 - Try/catch around the jsLogic for checkconditionals.
 - LazyLoading for select dropdowns.

### Fixed
 - Caching issue with getTempToken method.
 - Problem with the "in" operator for JSONLogic crashing with null inputs.

## 2.25.5
### Fixed
 - getDownloadUrl to work with remote environments.

## 2.25.4
### Fixed
 - Problems where conditionally hidden panels/wells were not making their children not required.
 - Issues with setting default values on datagrids.

### Added
 - Ability to provide an input mask where it will force lowercase alphabetical.

## 2.25.3
### Fixed
 - An issue where data values within a datagrid get messed up when rows are removed.

## 2.25.2
### Fixed
 - A problem with Select dropdowns where the placeholder was getting included as the select value.

## 2.25.1
### Fixed
 - Problem with the FormComponent crashing during a set language within the constructor.

## 2.25.0
### Added
 - The ability to render Select component as plain select dropdown using widget: 'html5' setting.
 - Performance improvements to language selection

### Changed
 - Moved all translation capabilities into FormioForm for performance reasons.

### Fixed
 - Issues with Lodash operators for JSONLogic.

## 2.24.6
### Changed
 - Upgraded EventEmitter2 to version 5.0.0
 - Upgraded flatpickr to 4.1.4

### Fixed
 - Major performance problems with the Select component with large datasets.

## 2.24.5
### Fixed
 - Problem where pressing enter in a textarea would submit the form.

## 2.24.4
### Fixed
 - Problem where change event would not get fired when a row is removed from datagrid.

### Added
 - Options to control the navigation and breadcrumb in wizards.

## 2.24.3
### Added
 - Ability to provide HTML in the description of a form element.

### Fixed
 - Double submit issue with wizards.

## 2.24.2
### Fixed
 - Issue loading form after submission when revisions not enabled.

## 2.24.1
### Fixed
 - Date min and max settings.

## 2.24.0
### Fixed
 - File component inside Datagrid component.
 - Components with label position inside Datagrid component.

### Added
 - Interpolation to the select headers when requests are made.
 - Option to make the wizard header buttons not clickable.
 - Translations to the select dropdown elements.
 - Form version handling

## 2.23.2
### Fixed
 - Path parameter for cookie fallback functions.
 - Custom calculated values.

## 2.23.1
### Added
 - Method and POST body to select dropdowns.
 - Lodash operator to JsonLogic.

### Fixed
 - Added custom classes to column components.
 - Checkbox required validation with 'name' options set.

## 2.23.0
### Added
 - Possibility to specify label position for component and for options for Checkboxes and Radio components.

## 2.22.2
### Added
 - The ability to pass an array of errors to the error handler to show more than one.
 - The ability to make independent components invalid.

## 2.22.1
### Fixed
 - A promise issue with executeSubmit method in FormioForm

### Added
 - Custom data source to Select component.

## 2.22.0
### Fixed
 - Fixed an issue where the token-cookie fallback was not returning the token
 - Forms not recusing properly in eachComponent function.

### Added
 - Possibility to add shortcuts.
 - A new hook system that allows to easily create hooks within the renderer.
 - 'beforeSubmit' hook to configuration.
 - 'input' hook to call when new inputs are added.
 - Display custom validation error message.
 - Ability to inject form data into the error messages.

## 2.21.3
### Added
 - A more robust way to determine if the form is completely loaded and ready.

## 2.21.2
### Fixed
 - Fixed the pdf generation by moving bind polyfill before dependant libraries.

## 2.21.1
### Added
 - A way for the components to hide their labels and have them set using the hideLabel option.
 - A way to pass in headers to a request in JSON format.

## 2.21.0
### Changed
 - Upgraded all dependencies

## 2.20.5
### Fixed
 - Problem with Select compoenents not updating values within a wizard.
 - Issue with setting default object values of select components.
 - Problem with duplicate entries showing up in select components when default objects are used.
 - Issue where clearOnHide was too aggressive in when it should clear out data.

### Changed
 - Display original file name instead of unique name on File component.

## 2.20.4
### Fixed
 - Problem with Resource dropdowns not working due to the unset options variable.

## 2.20.3
### Fixed
 - Problem with cookie fallbacks on file uploads not working.
 - Editing nested forms mapped to another resource with save as another resource fails.

### Changed
 - Now allow the URL of Select dropdowns to simply return strings of JSON and it will parse at runtime.
 - Upgrade Flatpickr to 4.0.5

## 2.20.2
### Fixed
 - Issues with using for in statements with arrays pulling in keys we don't want.
 - The data view of a Signature to show the image of the signature for easy scaling.

### Changed
 - The Select dropdown api requests to use Formio.makeRequest so that plugins could be used.
 - Upgrade Quill.js to 1.3.3

## 2.20.1
### Changed
 - Upgraded Flatpickr to 4.0.4 to fix crash in IE.

### Added
 - Global option to not show the datepickr for date inputs.

### Fixed
 - Issue where a null flatpickr instance would crash renderer.

## 2.20.0
### Added
 - Much better i18n support for Number and Currency components.

### Fixed
 - Added file input to DOM as a hidden item to fix issue with IE
 - Select component to respect tab index
 - Resize issues with Signature component so they scale according to devicePixelRatio.

### Changed
 - Force dropdowns to open only downwards
 - Upgrade moment to 2.19.1 since they fixed React bug (https://github.com/moment/moment/issues/4216)

## 2.19.3
### Fixed
 - Downgraded moment to 2.18.x to fix an import issue with Webpack.
 - Changed the SignaturePad module to directly include the library to fix React app issues.

## 2.19.2
### Fixed
 - Form component to allow recursive loading and setting a submission value.

### Changed
 - Upgraded moment to 2.19.0

## 2.19.1
### Fixed
 - Problem with multi-form workflows showing the submission not showing all data.

### Changed
 - Changed debounce to 100ms to make forms seem faster.

### Added
 - Redirect capabilities within the embed code.

## 2.19.0
### Fixed
 - Performance issues with large forms with conditionals.
 - Issue with select list not saving values accross pages.
 - Fixed issue with prepend not working if no firstChild is provided.
 - Loader from not showing up.
 - Issue with the form component not validating correctly.
 - Issue where the DateTime component calendar would not show up.
 - Better fallback for cookie support if localStorage is disabled or not present.
 - Add Editgrid and custom components to recursive tree.
 - Issue where conditionally visible components should also force parents visible.
 - Allow email components to be valid if pristine and empty.
 - Issue where clearOnHide flag was not working.
 - Issue where tooltips were not showing up on DataGrids
 - Issue where a form would invalidate after a successful submit.
 - Problem with setting a radio button with boolean values.

### Added
 - Support for HTML within tooltips.
 - Added a way to render the full wizard with conditional pages.
 - Ability to provide custom error messages per component using an errors property on each component.

### Changed
 - Convert line feeds into <br/> statements for tooltips.
 - Wizard to allow for hidden fields to be passed through all pages.

## 2.18.0
### Fixed
 - Fixed the validity checks and button disabled states.
 - Fixed the error message on regular expression settings.
 - Issue with the default values not working on Select dropdowns.
 - Fixed the input mask to show only number pads on all numeric inputs.
 - Performance when using conditional logic. checkConditionals called too many times on submission set.

### Added
 - Ability to handle dynamic min and max dates.

## 2.17.6
### Fixed
 - Fixed the search input to work with select fields.
 - Fixed the Radio components to allow for boolean and numeric values.
 - Fixed the disabled flag to not allow add another options, and fixed button on disable.
 - Fixed an issue with a crash that was causing selectboxes to not render within a data grid.
 - Fixed issue where the errors would not show up on Radio elements.
 - Fixed the DateTime calendar to only open the calendar if it has not already been closed.

## 2.17.5
### Added
 - minDate and maxDate for DateTime fields.
 - Custom headers for the requests of a select dropdown.

### Fixed
 - The calendar to hide and show when the icon is clicked.
 - Issues where placeholders would not show up in the DateTime component.
 - Default dates for DateTime component.

## 2.17.4
### Fixed
 - Issue where calculated values were not getting triggered on form component.
 - Issue where the forms would not load within the form component.

## 2.17.3
### Added
 - Tooltip feature onto the fields within the rendered form.

### Fixed
 - Issue with the form component not loading subforms for view pages.
 - Issue where HTML components were not interpolating the text.
 - Use handler.type instead of undefined handler.event property

### Changed
 - The default sort of the Choices library to not sort by default.

## 2.17.2
### Fixed
 - Issues with translations and certain strings that contains special characters.
 - Issues with the Select drop down pulling the wrong url to send the request off to.

### Added
 - Mask input fields when set.

## 2.17.1
### Fixed
 - Don't try to access properties of null in getValue.

## 2.17.0
### Added
 - Set lang attribute on all input elements based on current language. This helps with number localization.
 - Added better placeholder support for select dropdowns.

## 2.16.1
### Fixed
 - Colon in field name.

## 2.16.0
### Added
 - Cookie fallback for storing tokens and user values.

### Fixed
 - Default values overriding values when new form is set.

## 2.15.2
### Added
 - Ability to respond to ajax requests in a plugin.

## 2.15.1
### Added
 - Ability to introduce custom file service classes.

### Fixed
 - The PDF download url logic to return the correct download url.

## 2.15.0
### Added
 - Better multi-language support.
 - Min and Max validation checks for number fields.

## 2.14.1
### Fixed
 - Some minor crashes with the PDF renderings.

## 2.14.0
### Added
 - PDF support

### Changed
 - Upgraded dependencies

## 2.13.6
### Added
 - Add error labels.
 - Exposed ```util``` for Calculated Value.
 - ```parseFloat``` extension on FormioUtils.
 - ```formatAsCurrency``` function on FormioUtils.
 - A way for the setValue to take an object of flags instead of function params.

### Fixed
 - An issue where an infinite loop would trigger for calculatedValue's.

## 2.13.4
### Added
 - Resource modal to add new resources inline within form.
 - Custom scripts to be executed on button click.

## 2.13.2
### Added
 - Allow plugins to modify request options before they are sent.

## 2.13.1
### Added
 - A way to determine if a user is able to submit a form before they do.
 - A delete api call when a file is deleted.
 - A way to upload base64 file uploads.

### Changed
 - Refactored the http requests to have less Promises and more streamlined.
 - Wait for the form to load before loading the submission.

### Fixed
 - Fixed some issues with multi-select field validation.

## 2.13.0
### Fixed
 - Issue where Selectboxes was not storing the correct data structure.
 - The disabled states on all components.
 - Issue where Formio.createForm was not establishing the formio object on src load.
 - Problem where conditionally hidden components were still validating when they shouldn't.
 - Issues with auto-population for conditionally hidden components.
 - Auto population for the Address component.

### Added
 - Component error highlights when an error occurs during invalidation.
 - Custom styles capability.

### Changed
 - All instances of jsonLogic to use the FormioUtils.jsonLogic so that it can be extended.

## 2.12.3
### Added
 - Ability to pass a query to getComponent.

## 2.12.2
### Changed
 - Allow the FormioUtils to be globally accessible.

## 2.12.1
### Changed
 - Upgrade Choices to 2.8.7
 - Upgrade Flatpickr to 3.0.6
 - Upgrade json-logic-js to 1.1.3

### Added
 - A new findComponents method for locating components based on search queries.

## 2.12.0
### Added
 - A register component method to register custom components.

### Changed
 - Remove templating from ce function.
 - Replace Handlebars templating with lodash.

### Fixed
 - An issue with the select boxes component that showed required astrix on all options.

## 2.11.8
### Fixed
 - Issue where choices.js changed internal api that we rely on.

## 2.11.7
### Added
 - Description support for fields.
 - WYSIWYG editor for the text area component to use Quill.js

## 2.11.6
### Fixed
 - Another instance where infinite JSON structures could occur with eachComponent.

## 2.11.5
### Fixed
 - Issue where the parent property could create infinite JSON structures.

## 2.11.4
### Changed
 - Do not introduce the parent property on eachComponent unless a root is provided.

## 2.11.3
### Added
 - The ability for eachComponents to reference its parent component.

## 2.11.2
### Fixed
 - An issue where if you set the url of the form, it should not submit to API.

## 2.11.1
### Fixed
 - Issue with including handlebars in other libraries with webpack.

## 2.11.0
### Added
 - Now using Handlebars as the template interpolator.

### Fixed
 - Issue where the eval code for calculatedValues and defaultValues was causing an error.
 - Removed deprecated getAppUrl within the Resource compoennt.

### Changed
 - Changed the this.src setter to use the this.url for reduced code duplication.

## 2.10.1
### Fixed
 - Issue where form would crash if choices was not present.

## 2.10.0

### Added
 - Custom class capabilities to all components.
 - defaultDate to the Date/Time component.
 - File component

## 2.9.10
### Changed
 - Upgraded jsonLogic library to 1.1.2.
 - Removed the unnecessary embed method in formio.form.js. Use formio.full.js to bring it back in.

### Fixed
 - Issue with the multi-page forms where the conditions would not apply properly.

### Added
 - Time Component

## 2.9.9
### Added
 - Support for conditional wizards.

## 2.9.8
### Added
 - A way to print out the text of a component with a value.

### Changed
 - Added a way to create a componenent but not build it.

## 2.9.7
### Fixed
 - An issue where Select components were not selecting the default values properly.

## 2.9.6
### Added
 - A formLoad event to fire when the form is done loading.

## 2.9.5
### Fixed
 - Issue where if you try to re-enable disabled fields, it wasn't working.
 - Added a getter for the visible state of fields.

## 2.9.4
### Changed
 - Upgraded all dependencies to latest versions.

## 2.9.3
### Fixed
 - Ensure the full.js is in the npm build.

## 2.9.2
### Fixed
 - Other reverse compatible issues.
 - The embed code to also work with Wizards.

## 2.9.1
### Fixed
 - The import process so that it is reverse compatible.

### Added
 - Formio.full CSS.

## 2.9.0
### Changed
 - Removed the formio-factory file in exchange of formio.full.min.js.
 - Attached createForm method to main Formio object.

## 2.8.8
### Added a formio factory to the dist folder.

## 2.8.5
### Fixed
 - Issue where the custom events were not firing properly on buttons.

### Added
 - Custom classes to the button component.

## 2.8.4
### Fixed
 - Issue where submission binding with columns in datagrids was not working.
 - Fixed issue where adding another item to datagrid would clear out rows.
 - Problem where datagrid rows would add going between wizard pages.

### Added
 - CSS classes to wizard navigation buttons.

## 2.8.3
### Fixed
 - Bad binding with radio buttons in datagrids.
 - Issue where custom classes would not get applied to checkboxes.
 - Default values applied to datagrids and containers.
 - Issue where the loader would continue to be present during an error on load.

### Added
 - Custom event triggers for custom event buttons.

## 2.8.2
### Fixed
 - Submit button handler.

## 2.8.1
### Fixed
 - Fixed the json form select dropdown.
 - Fixed issues with button events and form submissions.

## 2.8.0
### Added
 - Support for multi-page form workflows.

### Fixed
 - Data grid select lists
 - Checkbox inputs to not use class when no label is present.

## 2.7.3
### Changed
 - All disabled flags to be consistent.

### Fixed
 - Issue where submit button would not disable.

## 2.7.2
### Fixed
 - Some cases where errors would occur during rendering.

## 2.7.1
### Fixed
 - An issue where Radio buttons could cause javascript error.

## 2.7.0
### Added
 - JSONLogic to perform all validations, conditionals, and calculations.

### Fixed
 - Fixed many issues with validations, conditionals, and calculations.
 - Fixed the disabled flag to disable on start.
 - Fixed default values to work.

## 2.6.0
### Changed
  - Upgraded the fetch library to resolve some strange header response caching issues.

## 2.5.0
### Added
 - JavaScript SDK logic to easily get the temporary tokens using the new temp token api.
 - Adding conditional next pages to the Wizard functionality.

## 2.4.2

### Changed
 - Moved the logout token and cache clearing to before the call is made to the server.

### Fixed
 - Bizarre issue that seems to be a bug in browser "fetch" library where it would introduce a response
   JWT token when a request was made without one. It was verified that the server was not sending
   the token in the response, so it is concluded that for some reason fetch was introducing it (cache maybe?).
   Regardless, we fixed it so that it will detect when a token was introduced and throw it out.

## 2.4.1
### Changed
 - Renamed setAppUrl to setProjectUrl
 - Renamed getAppUrl to getProjectUrl

### Deprecated
 - setAppUrl is now deprecated
 - getAppUrl is now deprecated
