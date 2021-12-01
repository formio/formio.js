# Change Log
All notable changes to this project will be documented in this file

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## 4.14.0
### Changed
 - Official Release

## 4.14.0-rc.38
### Fixed
 - FIO-4313: Force the text field to save the calendar widgets as 'text'
 - FIO-4603: Emit an event when form is deleted
 - FIO-4007: removed Addons tab from components which do not have currently any addon

## 4.14.0-rc.37
### Fixed
 - FIO-3590: fixed an issue where save-as-draft functionality not working in order to pass saveDraft key using options objet in react Form component

## 4.14.0-rc.36
#### Fixed
 - FIO-3334: Ability to use the Number field with EU separators
 - FIO-4185: Fix scrolled to errors alert when invalid field touched
 - FIO-4103: removed indexDB from select data source type dropdown
 - FIO-3247: redirecting to error list after failing submission (fixed)
 - FIO-4072: number minus validation

#### Added
 - Feat/signrequest related changes

### 4.14.0-rc.35
#### Fixed
 - FIO-4174: fixed an issue where radio buttons appear too far left when label position is not specified in json scheme
 - UIP-322: Fix issues where builder would get stuck.
 - FIO-4239: Added an ability to disable rendering child components when they are inside a hidden parent to improve form load performance

### 4.14.0-rc.34
#### Fixed
 - FIO-3737: fixed reCAPTCHA submission protection issue
 - FIO-4119: fixed an issue where the row in the editgrid component cannot be saved when Display as Modal checked

### 4.14.0-rc.33
#### Fixed
 - Problem where the server validation would fail if the custom component is a nested component.

### 4.14.0-rc.32
#### Fixed
 - FIO-2753: Fixed action buttons not being focusable
 - Revert FIO-3715: Receiving Validation Errors when rendering a form with a submission in draft-state
 - FIO-2681: Allowed type labels inside File component to be localized

### 4.14.0-rc.31
#### Fixed
 - FIO-2760: Fixed wizard nav buttons in mobile view

### 4.14.0-rc.30
#### Changed
 - Update @formio/bootstrap3@2.12.0
 - Update@formio/semantic@2.6.0
 - FIO-3967: added background option for checkbox and radio components in PDF forms

#### Fixed
 - FIO-4120: fixed an issue where edit grid row variable is changing when viewing and editing row that allows saving invalid rows
 - FIO-4087: Fixed an issue where custom error show up twice when validating form if multiple values checked
 - FIO-3880: Optimize redraw option
 - FIO-3568: Fix file drop area sometimes not hidden on single file upload
 - FIO-3334: Ability to use the Number field with EU separators
 - FIO-4085: Fixed an issue where data doesn't clear after clicking outside modal window and confirming to clear data
 - FIO-4052: Investigate Custom component errors that derive from the "grid" components. The current way that this is handled is through our server side module system

### 4.14.0-rc.29
#### Fixed
 - Fixing issues with Select stringifying data object values.
 - FIO-4045: 504 error is not handled properly and does not trigger offline plugin to process failed requests

#### Changed
 - Update dompurify@2.3.3, idb@6.1.4, @babel/cli@7.15.7, @babel/core@7.15.8, @babel/preset-e
nv@7.15.8, marked@3.0.7, mocha@9.1.2, core-js@3.18.3, sass@1.42.1, webpack@5.58.2

### 4.14.0-rc.28
#### Fixed
 - FIO-4002: Data Grid: Signature column is changing the size when the form is rendered or new row is added
 - FIO-3984: First click on a date does not select it
 - FIO-3944: fixed big spaces after select component
 - FIO-3860: Existing Resource Field showing Different Property Name from PDF and webforms
 - FIO-3744: fixed an issue where unique validation is not honored for resource component on submit
 - FIO-3677: Nested Form: Logic that makes a Nested Form disabled does not work, and the components inside the Nested Form stay active
 - FIO-3533: Fixed an issue where signature modal doesn't open when user tries to edit signature
 - FIO-3519: Made 'scroll on top' option in wizard go to breadcrumbs if they are visible
 - FIO-3448, FIO-3447: feat(Signature): add an option to make Signature field have the same aspect ratio as its PDF overlay
 - FIO-3247: Fixed redirecting to error list after failing submission
 - FIO-3243: Fixed selectboxes with options position left
 - FIO-2780: Makes Sanitize a configurable option
 - FIO-1112: width off tab card

#### Added
 - UIP-317: add DataGrid events for adding/deleting rows

### 4.14.0-rc.27
#### Fixed
 - FIO-3944: fixed big spaces after select component
 - FIO-3935: Fix setting empty value for day component
 - FIO-3645 Fixed calendarwidget losing focus when logic is present and previous component has onBlur validation
 - FIO-3758: Duplication of radio ids inside nested forms
 - FIO-3772: Enabled auto adjust columns setting hides components on PDF
 - FIO-3346: Brought back fixes for datetime in IE
 - FIO-3865: fixed an issue where vertical tabs change width when switching between tabs
 - Contrib: OAuth auth URI pre-defined query params support
 - FIO-3976 Fixed issue when sketchpad crashed in formbuilder when logic was applied
 - FIO-3996: Examples pages doesnt load in IE11
 - FIO-3970: fixed an issue where no table headers display when 'Open First Row when Empty' setting is enabled for Edit Grid
 - FIO-3974 Fixed higher contrast error appearing without error wrapper
 - FIO-3948: fixed saving edit grid rows in random order issue

#### Changed
 - Upgrade @formio/bootstrap3@2.12.0-rc.7
 - Upgrade @formio/semantic@2.6.0-rc.6

### 4.14.0-rc.26
#### Fixed
 - FIO-3756 Fixed an issue where resource component get unauthorized error when unfolding dropdown and no resources displayed
 - Do not validate non-input components.

#### Changed
 - Upgrade @formio/bootstrap3@2.12.0-rc.5

### 4.14.0-rc.25
#### Fixed
 - FIO-3752: Check parent component conditions
 - FIO-3715: Receiving Validation Errors when rendering a form with a submission in draft-state
 - FIO-2561: Address that has Modal Edit checked is not shown in error list. Error message doesn't disappear in modal window
 - FIO-3743: Fixed an issue with Date/Time component where the hours value doesn't save on the first change
 - FIO-3875: Calculated fields that are invalid are not marked as such
 - FIO-2946: Validation not triggered when change "required" option in Logic tab
 - FIO-1310: Improved select search in large strings
 - FIO-3838: Fixed issue when calculated values are set to default after reordering and removing a row in DataGrids inside of Tab component options
 - FIO-3836: Fix checkConditions order for Container Companent

#### Changed
 - Upgrade core-js@3.17.3, i18next@20.6.1, @babel/preset-env@7.15.6, marked@3.0.3, sass@1.39.2, webpack@5.52.1

### 4.14.0-rc.24
#### Changed
 - FIO-3616: next generation rules updates

#### Fixed
 - FIO-3798: fix(Component): calculated value is set to the component on load even if it is hidden and set to clear on hide

### 4.14.0-rc.23
#### Changed
 - Upgrade @formio/bootstrap3@2.12.0-rc.4
 - Upgrade @formio/semantic@2.6.0-rc.4

### 4.14.0-rc.22
#### Fixed
 - FIO-3753: Conditionally shown edit grid with "Open First Row when Empty" enabled doesn't save value

### 4.14.0-rc.21
#### Fixed
 - FIO-2721: Fixed an issue where data in the nested datagrid isn't visible until 'Add Another' button is clicked
 - FIO-3713: fix(Utils): an error occurs if HTML comp has an SVG tag with PATH tag inside it
 - Editgrid showing error div
 - FIO-3537: Cannot save the form with several Data Tables
 - Fix form embedding in async DOM (replace document.write() by DOM insert)

#### Changed
 - FIO-3002: Removed extra-small size option for button
 - Upgrade idb@6.1.3, @babel/core@7.15.4, @babel/preset-env@7.15.4, chance@1.1.8, marked@3.0.2, mocha@9.1.1, webpack@5.51.2, core-js@3.17.2, i18next@20.6.0, @babel/cli@7.15.4, sass@1.39.0, webpack-stream@7.0.0

### 4.14.0-rc.20
#### Added
 - FIO-3131: Implements a Google Drive storage

### 4.14.0-rc.19
#### Fixed
 - Select component - debounce option for server side filtering
 - FIO-2764: Fixes an issue when some of the fields were stilling set a default value with the noDefaults option.
 - FIO-3583: Fixed an issue with each component recursion.
 - FIO-3011 fixed an issue where only '{' character send and returned to/from the server
 - FIO-3346: Remove unwanted check for IE11 that breaks manual mode
 - FIO-3326: fixes an issue where clearOnHide inside EditGrid is not executed at the first visibility change in Edit mode
 - FIO-2959: fixed red asterisk bigger than original when label hidden
 - FIO-3631: fixed an issue where red asterisk not display when modal view is enabled
 - FIO-3571: HTML and plain text not working for textarea and textfield
 - FIO-3280: fixed an issue where confirmation dialog shows one extra time after a new value has been added
 - UIP-295: Make clearOnHide false and hide it when hidden is checked
 - UIP-301: Expose component key config
 - UIP-297: Enable Flatpickr localization.
 - FIO-3488: fixed an issue where values are not recalculated when submission is being set in edit mode
 - FIO-3279: fixed an issue where file is not removed when confirming removing in modal view
 - FIO-1500: Validation messages triggering across all items

#### Added
 - FIO-3227: added possibility to handle asynchronous code in select custom values

#### Changed
 - Upgrade core-js@3.16.2, dompurify@2.3.1, i18next@20.4.0, @babel/register@7.15.3, mocha@9.1.0, sass@1.38.1, webpack@5.51.1, fast-json-patch@3.1.0, jsdom@17.0.0, marked@3.0.1

### 4.14.0-rc.18
#### Fixed
 - FIO-3344: Add margin bottom to all components in builder mode
 - Fixed builder missing projectId promise rejection
 - Fixed tooltip not escaping double quotes
 - FIO-4236: ClearOnRefresh and RefreshOn for Custom Data Source Select Elements
 - FIO-3599: Improve select dropdown performance during pdf generation.
 - FIO-3500: fixed an issue where isomorphic validation fails when nested form is inside conditional components with incorrect custom condition
 - Fixes global instance of formio

### 4.14.0-rc.17
#### Fixed
 - FIO-3476: builder comp not dropped
 - FIO-3561: Required field is showing as invalid and form can't be submitted
 - FIO-3500: fixed an issue where forms with nested forms inside components with incorrect custom conditions cannot be submitted
 - FIO-3562: separated timezone logic to be able to redefine it in typescript

### 4.14.0-rc.16
#### Fixed
 - FIO-3570: Form cannot be submitted if Edit Grid has Open First Row when Empty checked
 - FIO-3565: Tree component cannot be submitted

### 4.14.0-rc.15
#### Fixed
 - FIO-3055: fixed datagrid template

### 4.14.0-rc.14
#### Fixed
 - Add option for authorization header in s3 requests
 - FIO-3321: fixed an issue where day value displays three times in PDF download when viewing as a plain text
 - FIO-2991: PDF submission 'created' time not showing
 - FIO-3320: fixed textArea display in PDF download when viewed as a plain text
 - FIO-3319: fixed an issue where select boxes values do not display in PDF download when viewed as a plain text
 - FIO-1405: fixed an issue where change event is not emitted when subform is loaded and assigned to the form component
 - FIO-2570: Fixes an issues where values instead of labels are rendered for the Select component in the HTML mode
 - FIO-3344: Add min height property to hidden components in builder
 - FIO-3305: fixed an issue where pattern validation does not allow to add a file that complies with the pattern
 - FIO-3083: Fix conditionally shown nested wizard form and conditional pages inside of it
 - FIO-3322: fixed an issue where survey does not display values in PDF download when 'View as a Plain Text' option is enabled
 - FIO-3092: fixed an issue where dateTime value is not always set in readOnly mode when min/max date validation is enabled
 - FIO-390: fixed an issue where placeholder does not show up for tags component

#### Changed
 - Upgrade i18next@20.3.3, mocha@9.0.2, dompurify@2.3.0, eslint@7.30.0, webpack@5.44.0, written-number@0.11.1

### 4.14.0-rc.13
#### Fixed
 - FIO-3418: fixed an issue where focus and cursor jumps when inputting in component inside columns with 'auto adjust columns' option enabled
 - FIO-3415: added select for reCaptcha 'Button Key' option in builder #4180
 - FIO-3414 and FIO-3413: fixed issues where data clear up after inputting into conditional field and new row is not added to dataGrid when deep level of nested dataGrids and containers is used #4179
 - FIO-3362: Reconfigure PR so that it does not cause spacing issues in Data Grids #4176
 - FIO-1310: fixed an issue where select search not always shows all available options #4174
 - Fixes an issue where the change event for the first character in Textarea with wysiwyg is triggered without modified flag #4158
 - FIO-258: Fixes an issue where "Submission Complete" message is not translated in the Examples page
 - FIO-2085: Improves tooltip for Select Raw JSON values and provides few examples #4147
 - Add aria labels to edit/remove row buttons. #4146
 - FIO-2905, FIO-2906: Added hidden labels to some components #4145
 - Override instead of overwrite modules setting for Quill. #4144
 - Cherry-picked commits for ACC 0.5.0 release #4138
 - Add aria-invalid attribute, improve test ergonomics #4131
 - FIO-2759 Added the ability to change wizard nav buttons order via custom properties #4125
 - FIO-1224: Fixes an issue where cannot properly parse currency prefix/suffix using ar-SA language #4122
 - FIO-2925: add tests #4119

### 4.14.0-rc.12
#### Fixed
 - FIO-2888: Fixing the recaptcha so that it will not be reset if it is set.
 - FIO-2903: ProjectURL not being in context when adding new Resource

### 4.14.0-rc.11
#### Changed
 - Revert FIO-301: Fixes columns to work with single columns.

### 4.14.0-rc.10
#### Added
 - FIO-1317: Implements capability to use NextGen Rules Engine from premium in 4x.
 - FJS-1459: Add Display as Table feature for EditGrid
 - FJS-1212 | FIO-175: Adds Display Mask option

#### Fixed
 - FIO-301: Fixes columns to work with single columns.
 - FIO-2492: Fixes an issue when there is a component in one wizard page that has the same API key as the one on another wizard page where validation isn't met for some reasons, there will be misredirection from such an error in the Error list
 - Call onChange on resetValue in Webform

### 4.14.0-rc.9
#### Fixed
 - FIO-2824: remove Spellcheck setting for Number Component
 - FIO-2844: Fix several api calls to /current endpoint
 - FIO-3038: remove 'Hide Input' setting from Password component
 - FIO-2554: add properties to the default schemas

#### Added
 - FIO-2503: Feat: adds Truncate Multiple Spaces option
 - Add option for errors to builder

### 4.14.0-rc.8
#### Fixed
 - FIO-3086: Fixes an issue where value is not recalculated while editing a submission
 - FJS-971: fix entering period as a first character in currency input
 - FIO-2784, FIO-2927: Make Builder replace all the " where they may cause a rendering issue
 - FIO-2494: Fixes an issue where Wizard page hidden by the logic is still shown in the Header
 - FIO-2497: fixed an issue where editGrid header is updated when component becomes visible in unsaved row and new row is added
 - Fixed an issue where public config is not available for the form and its components in builer mode
 - FIO-2504: Fixes an issue with redundant settings for a non-wizard Panel component in a Wizard form.
 - FIO-1433: Fixed default custom value for checkbox
 - Fix nested wizard fields validation

#### Added
 - SEC-19: Password Strength Addon
 - FIO-290 | FJS-1367: Feat: add an ability to specify Survey questions' and values' tooltips

#### Changed
 - Adding a more standard export for Formio object.

### 4.14.0-rc.7
#### Fixed
 - FIO-2925: add protection against change loops
 - FIO-249 | FJS-1436: Fixes an issue where Unique API Key validation is not triggered for Layout components
 - FIO-2821: Select field values do not display when rendered in HTML mode
 - FIO-2822: fix disableSiblings logic for the builder
 - FIO-2819: Fixes an issue where user is able to delete all the rows of an EditGrid with Open When Empty
 - FIO-2538: Fixes an issue when Tree component has components with 'required' or 'unique' validation, and the Tree data entry is not saved, the validation is not stopping the form from being submitted
 - FIO-2533: Fixes an issue when the data of all the components inside the Tree component displays in the Tree column in the Data table instead of [Complex Data]
 - FIO-2532: Fixes an issue when canceling the root tree while editing was removing all data.
 - FIO-1434: Fixes an issue when Default value settings did not work for Tree component. Removed Multiple values settings for Tree component.
 - FIO-1372: Fixes an issue when beforeNext hook not fired when form is rendered with readOnly flag
 - FIO-2590: Fixes an issue when During dragging data grid row, its styling does not preserve.
 - FIO-1513: Fixes an issue when in the DataGrid component custom validation errors were shown in an incorrect place.
 - FIO-2505: Fixes an issue when Signatures on different rows are not consistent in size in DataGrid
 - FIO-2625: Fixes an issue where got an infinite loop when changing the default values of the Data Grid components in the Data Grid.
 - FIO-1288: Fixesan issue where Prefix/Suffix is rendered inaccurately when words/chars counter is shown
 - FIO-1537: fixed submiting issue for wizards recaptcha component.
 - FIO-320: Use Webcam when Enable webcam is true
 - FIO-1488: Fixes an issue where unordered list created in Quill is rendered as an ordered one in read-only mode
 - FIO-1429: Fixes an issue where the alphabetical keypad opens for the Phone Number on mobile
 - Fix NestedArrayComponent's getComponents(0)

#### Added
 - FIO-1239: Implement wizard header type selection
 - FIO-1422: Add 'Navigate Pages & Save on Enter' option for wizard

#### Changed
 - FIO-487: Remove pdf icon element from submission view

### 4.14.0-rc.6
#### Fixed
 - FIO-2989: Fixes an issue when for the oAuth redirect URI as host that trigger conflicts with OpenID
 - FIO-2672: Fixes the email normalize to work with the "multiple" flag and not crash the renderer.
 - FIO-2936: replace finally method for better compatibility

### 4.14.0-rc.5
#### Fixed
 - FIO-2672: effective use of the index issue fix

### 4.14.0-rc.4
#### Fixed
 - FIO-2848, FIO-2831: Fixes some issues with setting error classes inside EditGrid
 - Removed setDefaultValues for the NestedForm. Revised that nested form with visible false, works as expected without it.
 - FJS | Conditionally showing columns are not auto-adjusting when auto adjust column is set to true
 - FJS-3357 enable selection of closed EditGrid rows
 - FIO-1409: Add save on enter option for button component
 - Fix/fio 2617 camera on file dropzone
 - FIO-2618: Mechanism to indicate once the PDF has completely Loaded
 - FIO-2622: Fixes an issue when you have a Nested Form component with clearOnHide set, the data becomes detached from the subForm component when the value is reset when cleared.
 - FIO-2677: fix submission not set on pdf for components with calculated value
 - FIO-2687: Fixes an issue when was receiving [Object, object] in Select with Custom Data Source.
 - FIO-2786: fix problem with initial button click on Nested Wizard in M…
 - Inherit default (en) translations (validations, buttons) for custom languages

### 4.14.0-rc.3
#### Fixed
 - Issue with the auto-disable default values.
 - Problem with Edit Grid errors showing up all the time.

### 4.14.0-rc.2
#### Fixed
 - Fix/empty number submission
 - FIO-1112: Fix styles for bootstrap3 and hovered tab
 - Editgrid Error section rendering everytime
 - FIO-2810: Fixes an issue when set to Radio input type, cannot unselect an option
 - FIO-2731: Fixes an issue when was unable to disable multiple values on Number component.
 - FIO-2778: Removes redundant 'Minimum Word Length' and 'Maximum Word Length' settings for the URL component.
 - FIO-1562: Fixes an issue where clearOnHide mistakenly triggered for components inside a Container nested inside a DataGrid
 - FIO-346 | FJS-1051: Fixes an issue where multiple select shows "..." in Firefox
 - FIO-2811: Button: fix values not updated when custom logic set
 - FIO-1525: Fixes an issue where DataMap value is always shown as empty in the DataTable
 - FIO-196: select request limit

#### Added
 - Added a way to not have renderer add default values to submission.

### 4.14.0-rc.1
#### Addded
 - FIO-1112: Add vertical layout for tabs component

### 4.13.3
#### Changed
 - No changes. Released 4.13.3-rc.9 as official release.

### 4.13.3-rc.9
#### Fixed
 - FIO-3342: Fixing the Date/Time component to work with multiple values.

### 4.13.3-rc.8
#### Fixed
 - FIO-3213: Select closes upon clicking on up and down buttons in IE11
 - FIO-3187: Date/Time: At times values don't display in submission and/or PDF download
 - FIO-2104: Initially Collapsed Panel component isn't focusable with Tab key

### 4.13.3-rc.7
#### Changed
 - Upgrade @formio/bootstrap3 to resolve builder issue with resize polyfill.

### 4.13.3-rc.6
#### Fixed
 - FIO-3323: Fixing the datagrid spacing.
 - FIO-2888: Fixing the recaptcha so that it will not be reset if it is set.

### 4.13.3-rc.5
#### Fixed
 - FIO-3087: Prevent user from Drag'n'Drop components while PDF is loading
 - FIO-3283: Resolving issues where EditGrid components do not show validation messages correctly.
 - FIO-3342: Fixed issue where multiple flag on DateTime component would display dates incorrectly.
 - FIO-3303: Table does not render correctly when vieweing submission and in PDF download

### 4.13.3-rc.4
#### Fixed
 - FIO-3309: Fixes console errors which occur sometimes with CalendarWidget

### 4.13.3-rc.3
#### Fixed
 - FIO-3229: Fixes an issue where checkbox value in HTML more is always False
 - FIO-3187: Fixes an issue where after you click on the time input it closes and time is visible, but not actually persist within submission
 - FIO-2880: Fixes an issue where time is converted multiple times and the result is wrong
 - FIO-3230: Select getView don't format unlisted values

### 4.13.3-rc.2
#### Fixed
 - FIO-3114: Fixed an issue with uniquifying API keys
 - FIO-3254: Fixed an issue where Select/Radio/SelectBoxes/etc values changed manually are recalculated again after reopening an edit window
 - Spacing issues with DataGrid.

### 4.13.3-rc.1
#### Fixed
 - FIO-3090: Fixes an issue where Radios inside Table nested in DataGrid could have the same IDs which leads to setting value of a wrong instance
 - FIO-2844: Fix several api calls to /current endpoint
 - FIO-2824: remove Spellcheck setting for Number Component

#### Changes
 - Update dependencies.

### 4.13.2
#### Changes
 - No changes. Released 4.13.2-rc.4 as official release.

### 4.13.2-rc.4
#### Fixed
 - FIO-3086: Fixes an issue where value is not recalculated while editing a submission

### 4.13.2-rc.3
#### Fixed
 - FIO-2989: Fixes an issue when for the oAuth redirect URI as host that trigger conflicts with OpenID

#### Changed
 - Upgrade @babel/core@7.14.3, @babel/preset-env@7.14.2, marked@2.0.5, webpack@5.37.1, i18next@20.3.0, idb@6.1.1, @babel/cli@7.14.3, @babel/plugin-proposal-optional-chaining@7.14.2, eslint@7.27.0, jsdom@16.6.0

### 4.13.2-rc.2
#### Fixed
 - FIO-2986: Inherit default (en) translations (validations, buttons) for custom languages
 - FIO-2786: fix problem with initial button click on Nested Wizard in Modal Edit
 - FIO-2687: Fixes an issue when was receiving [Object, object] in Select with Custom Data Source.
 - FIO-2677: Fix submission not set on pdf for components with calculated value
 - FIO-2622: Fixes an issue when you have a Nested Form component with clearOnHide set, the data becomes detached from the subForm component when the value is reset when cleared.
 - FIO-2618: Mechanism to indicate once the PDF has completely Loaded
 - FIO-2617: Camera on file dropzone
 - FIO-1429: Fixes an issue where the alphabetical keypad opens for the Phone Number on mobile
 - FIO-1409: Add save on enter option for button component
 - FIO-2676: Conditionally showing columns are not auto-adjusting when auto adjust column is set to true

### 4.13.2-rc.1
#### Fixed
 - FIO-2936: replace finally method for better compatibility

#### Changed
 - Adding a more standard export for Formio object.

### 4.13.1
#### Changed
 - No changes. Released 4.13.1-rc.7 as official release.

### 4.13.1-rc.7
#### Fixed
 - FIO-2812: add a flag to track the submission process and add the method for reuse
 - FIO-2788: fix static Oauth redirectURI
 - FIO-2785: Fixes an issue when a nested form draft isn't loaded and not populate data from nested level 2 and etc.
 - FIO-2730: Get rid of formio logo at the bottom when embedding.

### 4.13.1-rc.6
#### Fixed
 - FIO-2798: Fixes an issue where some errors messages are not translated
 - FIO-2747: fix conditional appearance of a nested wizard

### 4.13.1-rc.5
### Fixed
 - FIO-2747: change checking way for component pagination
 - FIO-2812: remove unnecessary rebuilds

### 4.13.1-rc.4
#### Fixed
 - FIO-1151: Fix url option being affected by interpolation for address component.
 - Fixed Formio from being undefined in example template.

#### Added
 - Added Save & Delete event for EditGrid.

### 4.13.1-rc.3
#### Changed
 - FIO-2787: Fixing the choices.js and text-mask dependency so that it can be installed without Github.

### 4.13.1-rc.2
#### Fixed
 - FIO-445: TypeError in console in custom endpoint example
 - FIO-2735: Fixes an issue where Display Timezone does not work for TextField with a Calendar widget
 - FIO-2739: fix the display of component errors Day and Email for the DynamicWizard
 - FIO-2496: Fixes an issue when Mask validation errors are not shown if invalid mask value is set for alphanumeric or alphabetic mask (if last symbols are missing)
 - Fix edit grid not translated column labels. Bind translation function to any interpolated string context.
 - FIO-2667: Fixes performance regression issues comparing with formiojs 4.11.x /4.10.x
 - FIO-2641: Fixes an issue when wizard navigation pages cursor had a Text Edit style in bootstrap3
 - FIO-262: remove the addition of decimal places when typing in the currency field on the sandbox
 - FIO-345: datagrid cleanup validation
 - FIO-2603: Fixes an issue where saveDraft is sent after a form was submitted
 - FIO-254: Add address provider url interpolations
 - FJS-1272: Form crashes using underscore as a mask
 - FIO-2740: fix triggerChange call for cases when nested form component changes

#### Added
 - FIO-1062: added automated tests for select component

### 4.13.1-rc.1
#### Fixed
 - FIO-2531: added conflictId to error data when unique validation is triggered

### 4.13.0
#### Changed
 - No changes. Official release off of 4.13.0-rc.29

### 4.13.0-rc.29
#### Fixed
 - FIO-2742: fix re-submit for nested forms

### 4.13.0-rc.28
#### Fixed
 - Fix/nested wizard infinit loop
 - FIO-2691: add condition for inherited components
 - FIO-2695: fix the display of a wizard inside components in which data

#### Changed
 - Upgrade core-js@3.10.1, @babel/core@7.13.15, @babel/preset-env@7.13.15, sinon@10.0.1, i18next@20.2.1, webpack@5.31.2z

### 4.13.0-rc.27
#### Fixed
 - FIO-263: fix getting parent path for nested wizards
 - FIO-2582: Fixes typo in hosted page
 - FIO-2696: uncaught error in console fix
 - FIO-2697: Fixes console errors when apply conditional logic to Nested Dynamic Wizard
 - FIO-2694: Fixes an issue where eachComponent considers nested components as layout components
 - FIO-180: fix error message for onlyAvailableItems validation

### 4.13.0-rc.26
#### Fixed
 - FIO-527: add applying of custom styles for textArea in readOnly mode
 - FIO-2668: fixed an issue where translation does not work for any language if en translation is provided for this value

### 4.13.0-rc.25
#### Fixed
 - Added better embedding capabilities.
 - FIO-1553: fixed an issue where select resource submission is not displayed if lazy load is enabled
 - FIO-2655: Fixes an issue where it is impossible to reopen components settings in PDF
 - UIP-283: Fix values not set correctly
 - UIP-273: Remove file errors on new file upload

### Added
 - FIO-2553: add tests for nested wizards

### 4.13.0-rc.24
#### Fixed
 - FIO-2612: Fixed issues where the submit button is replaced with other components when it re-renders.

### 4.13.0-rc.23
#### Fixed
 - UIP-284: Fix interpolation without quotes not working
 - FIO-1501: Fixes an issue where Preview component and Default Value component in Builder have the same ids
 - FIO-2547: Fixes an issue where data is not displayed in modal DataGrid preview in View mode when only one row is added
 - FIO-2502: Fixes an issue where min validators are triggered for non-required fields when values are empty
 - FIO-2633: Fixes an issue where component is not reverted back to its initial state when logic is not applying
 - FIO-1385: Fixes an issue where place is not saved using Google Maps provider
 - FIO-2597: Fixes an issue where Components order is changed after searching for some fields
 - FIO-1393: Fixes an issue where EditGrid Templates tooltips are rendered wrongly

#### Changed
 - Upgrade @formio/bootstrap3@2.11.0

### 4.13.0-rc.22
#### Fixed
 - Reverted PR #3172: FIN-027: Mechanism to indicate once the PDF has completely Loaded

### 4.13.0-rc.21
#### Fixed
 - FOR-2591: Fixing problems where the select dropdowns would not refresh with the correct labels.

### 4.13.0-rc.20
#### Fixed
 - FIO-1393: Fixes an issue where tooltips are rendered wrongly for Input Mask Placeholder Char, Proveder Options
 - FIO-2498: Fixes an issue where Pattern validation error message does not contain component Label
 - Fixed an issue where default value field is not updated for custom components in builder
 - FIO-2566: Fixes an issue where only latest letters are saved inside search input
 - FIO-979, FIO-2100: Fixed an issue where refreshOn/clearOnRefresh and Conditions do not work inside a NestedForm
 - FIO-1503: Fixes URL validation is not triggered when value has more than one dot between root domain and top level domain
 - FIO-2468: Fixes an issue where data in the first row is not saved when the EditGrid is shown conditionally and Open when Empty is checked
 - FJS-1461: Fixes an issue where it is possible to Cancel Wizard form in readOnly mode

### 4.13.0-rc.19
#### Changed
 - Add method to overwrite wizard pages (for dynamic wizard)

#### Fixed
 - FIO-1544: fixed an issue where nested components` values are incorrectly saved after resetting wizard

### 4.13.0-rc.18
#### Fixed
 - Do not call sanitize when generating pdfs to speed up pdf generation.
 - FIO-1435: Fixes an issue where Lazy Load checkbox is not shown when ChoicesJS is selected by default
 - FJS-1265: Fixes an issue where when uncheck Show Full Wizard, all the pages remain visible
 - FIO-1524: Fixes an issue where EditGrid and Select are not hidden using event-triggered logic
 - FIO-1482: added tests for customized wizard and draft submission
 - FIO-1212: Fixes an issue where user have to click twice on the date to select it in IE11
 - FIO-1068: Fixes an issue where revision of the Nested Form loaded on the front-end side differs from the one which loaded on the server-side

### 4.13.0-rc.17
#### Fixed
 - FIO-2497: fixed an issue where editGrid row value summary contains values for invisible components
 - FIO-1555: fixed an issue where unique validation does not work for components inside components that have data of array type
 - FIO-1551: Modal Button height issue
 - FIO-1312: Hide cancel on read only for wizards.
 - FJS-1265: Fixes an issue where Show Full Wizard does not work
 - FIO-1463: "View as Plain Text" with nested form not working
 - FIO-1207: fixed an issue where selected value always presents in dropdown with found search results in select resource
 - FIO-1498: Fixes an issue where words counter shows that there is one less word left after clearing the input
 - FJS-925: Fixes an issue where the first char is lost when you tab to Select
 - FIO-1503: Fixes an issue where URl validation is not triggered when insert an email
 - FIO-1501: Fixes an issue where some inputs remain disabled after the maxCount was exceeded
 - FJS-726: Fixes an issue where it is possible to check Save as Reference and set Value Property which cause unexpected behavior, because saving a s reference is only possible when there is an _id
 - FIO-1321: IE fix the error below the progress bar when uploading a PDF file
 - FOR-1425: Added data to default values component evalContent
 - FIO-1352: fix validation for the case when the day is set to dayFirst

### 4.13.0-rc.16
#### Fixed
 - UIP-279: Added the root change for row's components
 - UIP-280: add prop inEditGrid to components inside it on form use
 - UIP-232: EditGrid templates not shown with protected-eval plugin

### 4.13.0-rc.15
#### Fixed
 - FIO-1382: Fixes an issue where scroll does not work properly for modal windows

#### Changed
 - Upgrade @formio/semantic:2.5.1

### 4.13.0-rc.14
#### Fixed
 - Issues where Select items loaded would not trigger and throw an error.

### 4.13.0-rc.13
#### Fixed
 - Reference for text-mask to not use ssh.
 - Cherry picked commits for USWDS/VPAT 2.3.0 release
 - Fix: fix rendering of nested wizards

### 4.13.0-rc.12
#### Fixed
 - FIO-1542: Cherry picked commits for USWDS/VPAT 2.3.0 release

### 4.13.0-rc.11
#### Fixed
 - FIO-530: Get rid of placeholder set automatically in CalendarWidget
 - FIO-1391: Fixes an issue where value of lazy loading Select is not shown on the Edit tab
 - FIO-1336: File component not showing Take picture or Switch to file upload buttons
 - FIO-1384: Fixes an issue where Sandbox does not load in IE11
 - FIO-1379: Fixes an issue where text mask behaves incorrectly when embed form with includeLibs = false
 - FIO-1392: Fixes an issue where DataGrid's and EditGrid's previews are clipped to the open modal button with fixes height
 - FIO-1435: Disables Lazy Loading for HTML5 Select since it is impossible to make it behave correctly due to the browsers' restrictions
 - FIO-1397: IndexDB file delete view
 - FIO-1435: Fixes an issue where Select Boxes appear to be unchecked after changing Wizard's page
 - FIO-1408: fixed an issue where tree component with certain components inside is not submitted or does not render
 - UIP-277: Add global option to show full component JSON schema
 - FIO-1062: Automated tests
 - FJS-837: Fixes an issue where 0 and false are considered as empty values for Select
 - FIO-524: Fix resource forms didn't transfer settings to pdf

#### Changed
 - Upgrade i18next@19.8.9, lodash@4.17.21, @babel/cli@7.12.17, @babel/core@7.12.17, @babel/plugin-proposal-optional-chaining@7.12.17, @babel/preset-env@7.12.17, @formio/bootstrap3@2.9.0, core-js@3.9.0, webpack@5.23.0

### 4.13.0-rc.10
#### Fixed
 - FIO-213: Fix the display of server validations for 6x server
 - FIO-1252: Form key causing style issues
 - FIO-1225: Add check for readOnly state of form to hide edit button
 - FIO-1423: Add keepAsReference flag to webformBuilder setForm method
 - FIO-1273: Fixed issues where changes of value component is not saved in dataMap component.

#### Added
 - UIP-277: Create option to show full component json

### 4.13.0-rc.9
#### Fixed
 - FIO-1217: Fixes masks caret behavior when it is used inside shadow DOM

### 4.13.0-rc.8
#### Changed
 - FIO-950: Add file processing usage

#### Fixed
 - FIO-1217: Fixes masks caret behavior when it is used inside shadow DOM
 - UIP-213: Fix wrong modes passed to ace editor config
 - FIO-1300: add the dynamicWizard type to conditions with components that store data as an array
 - FIO-1345: Added additional check for disabled property
 - FJS-1460: Fixes an issue where components inside DataGrid have wrong row indexes after removing row
 - FIO-1272: fixed console errors in wizard builder and an issue where unique API key is not created for pasted wizard page and pasted page refers to the copied page
 - FIO-1265: Fixes DataGrid's server validation

### 4.13.0-rc.7
#### Changed
 - Use schema instead of component for Builder Edit JSON dialog
 - Refactoring the inline embed code to enhance its usage and allow shadow dom.
 - update fetch-ponyfill to 7.1.0
 - Revert "Element: convert lodash to object in evalContext"
 - FIO-246 (FJS-1473): removed fixedSize setting from PDF overlay settings
 - FIO-1114: Updating Copyright
 - Cherry pick commits for v2.2.0 VPAT/USWDS release
 - FJS-1458: Makes Button error message clickable
 - FIO-972: updated event emitter to EventEmitter3

#### Fixed
 - FJS-1397: Fixes an issue where Tree's children are not disabled when the Tree is
 - FIO-1046: Fixes an issue where unique key error is not cleared when it is fixed/issue where unique error is not show for components inside Columns
 - FIO-1113: Disables arrow functions in webpack's output to support IE11
 - FMG-55: Create a from | Copying a root panel on the page of a Wizard, it pasts below the copied panel
 - FJS-1391: Fixes an issue where options of the modal select are truncated by the edge of the dialog window
 - Fix/4.13.0 regression datagrid columns width
 - Fixed issue where conditionally hidden radio controls are not applying the selected styles correctly.
 - FJS-1369: Fixea an issue where some components' properties, such as 'visible', are not updated when reset value
 - FJS-1389: Fixes an issue where Radio will become non-clickable after the row it belongs to is reordered
 - FJS-1385: Fixes an issue where only the first tag is displayed in the modal preview when 'Save As' is set to 'Array'
 - FIO-1116: fixed an issue where wizard submission is incorrectly set on first page load in HTML render mode
 - FIO-1133: Fixes setting 'false' value to the radio inside the nested form
 - FIO-1142: fixed an issue where submit error messages are displayed twice under submit button in PDF forms
 - UIP-213: fix setting wrong mode to ace editor
 - FIO-1169: fixed an issue where select default values are dislayed when select is conditionally hidden in PDF
 - FIO-292 (FJS-1319): fixed an issue where some components do not have indication of required validation (star icon) when their label is hidden
 - FJS-1328: Fixes an issue where it is impossible to reorder rows of a child DataGrid
 - FIO-209 (FJS-1366): fixed an issue where click on textField with calendar widget error in form errors list does not redirect to the component input
 - Fix: fix the positioning of the Calendar widget
 - FIO-3530: update input attribute when value changes
 - FIO-1207: Fixes an issue where a selected item is shown twice when a search result is empty
 - FIO-1125: Any value used in Translate list is returning contains an invalid selection
 - FIO-495 (FJS-885): fixed an issue where it is not possible to load select options in builder if select URL uses config data
 - FIO-208 highlight js syntax
 - FJS-726: Fixes an issue where Select value is not shown on Data Tab when dataSrc is Resource and the Value Property is not specified
 - FIO-590: Pin the latest working version of flatpickr on IE 11 (v4.6.6)
 - CONTRIB: Fixed the translation issues while saving edit grid
 - CONTRIB: Fixes an issue where Submit button becomes invalid when there are few components with the same API keys
 - FIO-1230: fixed an issue where wrong select submission value is shown for a moment when saved value doesn`t include displayed property
 - FJS-1468: Fixes an issue where sometimes the "Cannot read propery offsetWidth of undefined" appears
 - FIO-1194: Fixes an issue where default values which are equal to false are not set properly
 - FIO-1184: fixed an issue where dateTime test renders are updated in each time zone that causes CircleCI failing
 - FJS-1317: Fixes an issue where modal Tabs containing invalid components is not highlighted in red
 - FJS-1317: Fixes an issue where an invalid modal dataGrid is not highlighted in red
 - PDF-207: Lazy load Select options for HTML mode.
 - FIO-452 (FJS-1435): fixed an issue where validation error message is not displayed for select component
 - FIO-1212: Fixes an issue where date in DateTime is selected only after the second click in IE11
 - FIO-1258: remove the function used for overwriting

#### Added
 - Variables exposed in Logic Tab of a component configuration, and added Custom Action to Logic actions.
 - FIO-273: editgrid tooltips
 - FIO-1121: made "scroll wizard page to the top" feature as configurable option
 - FJS-1344: Adds an event when there are some invalid components within the form
 - CONTRIB: Added ability to call .off method to remove one listener for a certain event
 - FIO-106 (FJS-571): added template for html render mode of address component

### 4.13.0-rc.6
#### Added
 - UIP-253: Ability to abort file upload
 - FJS-1419 (FIO-141): added tooltip for wizard pages

#### Fixed
 - Github example customendpoint: fix fetch undefined in ie11

#### Changed
 - Upgrade @formio/bootstrap3@2.7.0, @formio/semantic@2.5.0

### 4.13.0-rc.5
#### Fixed
 - fix 'show label in DataGrid' option
 - Fixed an error occurred when trying to add Logic row

#### Changed
 - Revert "Feat/uip 239 select options overlayed"
 - Upgrade core-js@3.8.2, flatpickr@4.6.9, webpack@5.11.1, eslint@7.17.0

### 4.13.0-rc.4
#### Added
 - FIO-994: Makes onlyAvailableItems validation optional
 - Implement translations for static templates
 - FJS-1183: Add download button if setting showPdfIcon checked
 - FIO-1015: Added lazy load option for nested webforms inside wizard
 - Allow override of url & method in request hook

#### Fixed
 - FIO-1036: Fixes an issue where Unique validation return an empty error
 - Fixing issues where bad template references were causing the pdf upload to crash.
 - FIO-129: fixed an issue where non-unique tags are added on blur event
 - FJS-1486, FJS-1407: Fixes an issue where multiple Time's value is considered as an while server-side validation and an issue where front-end validation is not triggered when add a new row of a multiple Time component
 - FJS-1424: Fixes an issue where changing "hidden" property of the parent component does not affect children's visibility

#### Changed
 - Cherry picked commits for VPAT/USWDS release
 - FJS-1395: Removes useless settings option (Default open Rows) of a DataGrid

### 4.13.0-rc.3
#### Added
 - FJS-1239: Adds ability to create shortcut buttons for flatpickr
 - An option called "alwaysConfirmComponentRemoval" which will always confirm before removing components from the form builder.
 - Added option to Select (url based) components to ignore the Form.io caching of the API request.
 - Add Webform language getter

#### Changed
 - Localize selectboxes validation messages

#### Fixed
 - UIP-270: Radio: fix validation not triggered for the first time with default value

### 4.13.0-rc.1
#### Added
 - Enable Setting Headers To S3
 - WebFormBuilder Search Enhancements
 - FJS-1175 [feat]: adds an ability to NestedForm to use original revision for submissions viewing
 - Adds an ability to upload images from CKEditor to storage providers
 - FIO-945: added possibility to translate editGrid errors

#### Changed
 - FOR-2419: Changed the logic of filtering and added searching by existing resource
 - Style button to delete data in confirmation dialog as btn-danger
 - FMG-109 | Change OnHover cursor style to the Hand pointer for the Wizard navigation buttons
 - Convert lodash to object in evalContext
 - FMG-127: remove redundant tooltips for the description and tooltip fields
 - Allow multiple plugins to provide global options

#### Fixed
 - FOR-2874: Added recaptcha async validation.
 - FJS-1411: fix displaying server errors
 - FJS-1484: fixed an issue where wizard resets form after components schema is changed inside the code
 - FJS-1487: fixed an issue where conditional columns are not displayed inside dataGrid when the condition is met
 - FOR-2882: fix the mode path in ace
 - Fixed an issue where forms which have some logic get stuck in infinite loop
 - Fixed an issue where DateTime is rendered incorrectly & ignoring Format on mobile devices
 - FJS-1099: Allow overriding the breadCrumb clickable option with configurations.
 - Fix typo in class name in align.ejs.
 - Fix the uniquify method in the builder
 - FJS-1156: No indication of errors inside the Layout components in a Modal Edit view
 - Allow 0 for labelWidth and labelMargin.
 - Fix textarea endlines in read-only mode.
 - FJS-1433: remove duplicate label in the list of errors
 - FMG-57: ‘Paste below’ button shows all the time, even though the component hasn’t been copied
 - Fixed an issue where form properties of WizardBuilder and corresponding Webform are different
 - FJS-1488: Fixing issue where setting tabindex on components inside datagrid does not also apply to remove row and add another buttons.
 - FJS-1272: Fixes errors when add a placeholder char to a text mask
 - UIP-271: edge time component
 - Fixing issues where custom builder sidebars would crash and cause errors

### 4.12.4
#### Changed
 - No changes. Released 4.12.4-rc.3 as official release.

### 4.12.4-rc.3
#### Fixed
 - Fixing issues where custom builder sidebars would crash and cause errors.

### 4.12.4-rc.2
#### Fixed
 - FOR-2874: Added recaptcha async validation.

### 4.12.4-rc.1
#### Fixed
 - Fixing issue where itemsLoaded does not resolve if the select is not attached.
 - FJS-1488: Fixing issue where setting tabindex on components inside datagrid does not also apply to remove row and add another buttons.

#### Changed
 - Upgrade idb@5.0.8, uuid@8.3.2, @babel/cli@7.12.10, @babel/core@7.12.10, @babel/plugin-proposal-optional-chaining@7.12.7, @babel/preset-env@7.12.10, @babel/register@7.12.10, babel-loader@8.2.2, marked@1.2.6, sinon@9.2.2, eslint@7.15.0, fetch-mock@9.11.0

### 4.12.3
#### Changed
 - No changes. Released 4.12.3-rc.1 as official release.

### 4.12.3-rc.1
#### Fixed
 - Fixed an issue where form properties of WizardBuilder and corresponding Webform are different

### 4.12.2
#### Changed
 - No changes. Released 4.12.2-rc.8 as official release.

### 4.12.2-rc.8
#### Fixed
 - FJS-1449: Fixes an issue where is-invalid class is not set/removed for fields with CalendarWidget

### 4.12.2-rc.7
#### Fixed
 - FJS-1484: fixed an issue where wizard resets form after components schema is changed inside the code
 - FJS-1487: fixed an issue where conditional columns are not displayed inside dataGrid when the condition is met
 - FOR-2882: fix the mode path in ace
 - Fixed an issue where forms which have some logic get stuck in infinite loop

### 4.12.2-rc.6
#### Fixed
 - Issue where a conditionally hidden datagrid was not initializing the data correctly resulting in data not saving.

### 4.12.2-rc.5
#### Fixed
 - FJS-1466: focus on the default value in the currency field
 - FJS-1470: fixed infinite loop in wizard with dataGrid

### 4.12.2-rc.4
#### Fixed
 - FJS-1297: fix editing nested wizards
 - Fixing issues where clearOnHide would cause data to erroneously reset within nested conditionals
 - FJS-1470: fixed an issue where infinite loop is created in wizard after internal form schema change
 - FJS-1312: fix display of subform errors in wizards
 - UIP-263: EditGrid: fix values with html tags got injected in template
 - FJS-1429: fixed currency validation regexp
 - FJS-1456: add line breaks for fields in modal preview
 - FJS-1333: Fixes an issue where all the validation errors are shown for the modal draft row

### 4.12.2-rc.3
#### Added
 - FJS-1380: Adds a validation which checks if the value is available within component's values setting

### 4.12.2-rc.2
#### Added
 - UIP-261: Select: add use exact search option

#### Fixed
 - UIP-251: File: hide file drop area when file is uploading
 - FJS-1428: Fixes an issue where lazy loading Select shows item only after the second click
 - FMG-89 | PDF form | When the PDF is being uploaded, text in the upload progress bar is too small
 - FMG-133 (1.96.0 Regression) When switching to PDF mode, you just get the spinning circle. I am not able to add a PDF
 - FJS-1449: Fixing issues where the DateTime component is erroneously triggering changes.

### 4.12.2-rc.1
#### Fixed
 - FMG-86 | Edit Form page | Accordions within the Resource Fields accordion do not expand/collapse when the ‘Wizard’ or the ‘PDF’ is selected in the Form Select drop down
 - FJS-1438: fixed an issue where dataGrid extra components are not removed after setting value with fewer rows
 - FJS-1297: fix data submission for nested wizards
 - PDFBuilder: fix same type components get equal keys
 - UIP-260: Button: fix not updated disabled attribute
 - FJS-1312: fix display of list of errors during submission
 - FJS-1442: Wizard: emit event when this.pages changes
 - PDF-170: Fix files ready resolving promise
 - VPAT-697 Added border outlines to Datasource component in formbuilder
 - VPAT-431 Fixed issue when CKEditor text size styles were missing in forms (content components)
 - FJS-1440: fixed an issue where hidden page is dispalyed in wizard navigation bar and wizard data is cleared after navigating to such page

#### Changed
 - Upgrade i18next@19.8.4, jwt-decode@3.1.2, marked@1.2.4, webpack-stream@6.1.1, vanilla-picker@2.11.0, babel-loader@8.2.1, dialog-polyfill@0.5.4, moment-timezone@0.5.32

### 4.12.1
#### Changed
 - No changes. Released 4.12.1-rc.28 as official release.

### 4.12.1-rc.28
#### Fixed
 - PDF-213: Fix ids mismatch
 - FJS-1427: Component settings can't be opened after the Property name is cleared
 - PDF-197: Set Formio base url and project url for pdf iframe
 - FJS-1298: fix page display in one line when condition is set
 - Fix: fix the modalEdit logic for the EditGrid component

### 4.12.1-rc.27
#### Fixed
 - FJS-1426: Fixes an issue where NestedForm's data is not shown when it is inside DataGrid

#### Changed
 - Upgrade json-logic-js@2.0.0 which resolves https://www.npmjs.com/advisories/1542
 - Upgrade marked@1.2.3, jwt-decode@3.1.1, eslint@7.13.0

### 4.12.1-rc.26
#### Added
 - Pass along the saved flag to the submit event.
 - UIP-245: File: adjust file upload status events to be caught by angular-formio

### 4.12.1-rc.25
#### Fixed
 - FOR-2838/2839/2843: Fixes an issue with incorrect projectUrl when using not Subdomain path type. Also made that we always use global Formio.

### 4.12.1-rc.24
#### Changed
 - FJS-1379: changes for more flexible inheritance

### 4.12.1-rc.23
#### Fixed
 - VPAT-664 Changed setAlert signature to more flexible extension in VPAT

### 4.12.1-rc.22
#### Fixed
 - FJS-1306: Fixes an issue where JSON Select example is not loaded in IE11
 - FJS-1306: Fixes small issues with Select and improves its performance
 - FJS-1378: fix the display for editRows for the first render

### 4.12.1-rc.21
#### Fixed
 - Problem where the form JSON would remove function based evals.

### 4.12.1-rc.20
#### Fixed
 - Sanitize method to not execute if the sanitize method is not defined (node.js)

### 4.12.1-rc.19
#### Fixed
 - FJS-1301 & FJS-1302 Regressions on examples of github (Problem with Formio global object)
 - FJS-1273: Space between character and word counter
 - FJS-1375: Fixes an issue where Model is not cleared when Make is changed in examples
 - FJS-1372: Fixes an issue where Rendered Form and Submission are not updated when the form is changed
 - UIP-251: Fix multiple files disabled allowed to browse during upload
 - PDF-197: Apply select component force update on attach step
 - FJS-1372: Fixes an issue where Rendered Form and Submission are not updated when form is changed
 - FJS-1311: Clicking on the errors not redirected to the corresponding field in the Child Wizard
 - FJS-1348: remove the DynamicWizard component from the Webform builder
 - FJS-1382: fixed an issue where date value is changed when reopening modal row in editGrid after setting submission
 - FJS-1355: add disableSiblings logic for the builder
 - FJS-1349: fix EditGrid reset after cancel
 - FOR-2815 : Fixes an issue where scripts passed to TextArea/TextField are executed while rendering
 - FJS-1092: Wizard form page navigation bar needs to be responsive

### 4.12.1-rc.18
#### Fixed
 - Fixed focus for file component
 - Fix Ace in webpack environments

#### Changed
 - Export lodash so other libraries can use the form.io version and save space.

### 4.12.1-rc.17
#### Fixed
 - Fixes an issue where refresh can be called multiple times if some components have on Blur validation
 - FJS-1245: fixed an issue where empty submission data comes from 7.x server for dataGrid with initEmpty option
 - FJS-1289: fixes an issue where confirmation dialog is not show for modal DataGrid after first time closing modal without making changes
 - Fixes an issue where values of conditionally visible components inside EditGrid are not saved on the 6.x server
 - Fixed console error for container component
 - FJS-1299: Wizard is being rendered incorrectly when a Simple Conditional is applied

#### Added
 - utils: add 'ADD_URI_SAFE_ATTR' sanitize option for dompurify

### 4.12.1-rc.16
#### Added
 - FJS-1196: Added Refresh On Blur option for Select Component

#### Fixed
 - FJS-1280: Fixes an issue where default value is not set for multiple Time component
 - FJS-1341: Fixes an issue where after changing tab, value set from submission is overriden by calculatedValue
 - FJS-1330: fixed an issue where date with custom format is defined as invalid date and incorrectly set
 - FJS-1288: Fixes an issue where changes stay in modal preview after aborting them
 - fixed errors navigation in editGrid draft modal row
 - fixed console error when saving tabs inside editGrid
 - Fixed panel not openning when containing invalid components

### 4.12.1-rc.15
#### Fixed
 - Fix untouched panel collapse and then open triggered validation
 - FJS-1304: Fixed an issue where clearOnHide does not work for components inside EditGrid
 - Fixing issue where forms with columns makes pdf builder not work.
 - FJS-1144: Fixed an issue where Select inside EditGrid is not refreshed when the other EditGrid's child changed
 - Fixed an issue where conditions do not work for components inside EditGrid

#### Changed
 - Clear choices if resetValue flag passed

### 4.12.1-rc.14
#### Changed
 - FJS-1116: add methods so that premium can override them

### 4.12.1-rc.13
#### Fixed
 - FJS-1330: fixed an issue where date value is not set or incorrectly set in dateTime/textArea component after openning collapsed panel

#### Changed
 - Upgrade bootstrap@4.5.3, eslint@7.11.0, webpack@5.1.0

### 4.12.1-rc.12
#### Fixed
 - FJS-1324: fixed an issue where component calculatedValue property is not assigned

### 4.12.1-rc.11
#### Fixed
 - PDF-177: Update element removing for IE 11 compatibility
 - FJS-1264: Additional tabs don't hide after clicking wizard "Cancel" button

#### Changed
 - WebformBuilder: add check for sidebar id attr for bootstrap3 compatibility
 - Upgrade @formio/bootstrap3@2.6.8

### 4.12.1-rc.10
#### Added
 - Added protectedEval option to Evaluator

#### Fixed
 - FJS-1192: fixed excessive calls of conditional logic on change event
 - FOR-2776: fix | currency. User was able to submit non-unique data twice and more when field is unique
 - FOR-2419: search field for form builder can search a field by the label name
 - FJS-1273: Space between character and word counter
 - FJS-1286: fix setValue for PDF form in wizards
 - Fixed an issue where validation errors where shown after saving invalid modal draft row in dataGrid
 - Fixed an issue where confirmation alert is not shown after editing editGrid modal draft row
 - FJS-1202: Wrong number of rows display in the Modal view of Edit-Grid
 - FJS-1293: Fixed signature infinite loop in html render mode

### 4.12.1-rc.9
#### Fixed
 - Fixed an issue where WebformBuilder's components/widgets are not detached
 - FJS-1115: fix ordering for nested wizards with conditional logic

#### Added
 - FJS-1196: added Refresh on Component Blur option to DataSource

### 4.12.1-rc.8
#### Changed
 - VPAT-000 Added types for further extension of ComponentModal for 2.0 VPAT release

### 4.12.1-rc.7, 4.12.1-rc.6
#### Fixed
 - Adding calculateServer handling and also restructure calculated value handling.
 - FJS-1145: fix logic for close button in the Modal Edit dialog
 - FJS-1261: fix generation of property names when creating a component
 - Fixed issues when removed one of two fields with keys duplication in the form builder.
 - FJS-1245: fixed an issue where dataGrid with initEmpty option hides rows when viewing a submission

### 4.12.1-rc.5
#### Fixed
 - Fixing anomaly with calculated value checks to make them so they will handle changing calculated values between passes.
 - FJS-1251: Unable to open/close field tabs in builder after search/filtering fields
 - FJS-1157: fix showing error after closing a modal dialog window

### 4.12.1-rc.4
#### Fixed
 - Fixed an issue where data on conditional Wizard pages is not saved
 - FJS-1240: fixed an issue where address submission data is not shown inside dataGrid
 - FJS-1158: hiding Password under bullets in a Modal button

#### Changed
 - Upgrade dragula@3.7.3

### 4.12.1-rc.3
#### Fixed
 - FJS-1133, FJS-1028, FJS-1242: fixes an issue where DateTime's value has incorrect formatting on Data Tab

### 4.12.1-rc.2
#### Fixed
 - FJS-1216: Checkbox Shortcut key is not working correctly
 - Fixed an issue where it is not possible to hide label of some components inside data grid
 - FOR-2725: added possibility to use file name in interpolated file url in file component
 - FJS-1244: fix display of simple nested forms
 - Fixing situation where custom conditionals would reset the evaluations.
 - FJS-1178: adding an ability to use click on previous pages using breadcrumbs even when they are disabled
 - FJS-1103: When you hit the enter button, then you see the field not saving the year correctly.
 - FJS-1070: Data is showing blank when is set to renderMode: 'html'
 - FJS-1054: disables Subbmit button while uploading files
 - FJS-1205: fixed an issue where error alerts do not work in IE
 - Fixes an issue where modalEdit Nested Wizard is rendered as a simple component after changing the page
 - FJS-1197: Custom Error displaying twice when validating form
 - FJS-1106: Date Time Component Receiving Uncaught TypeError
 - Update component dataValue to update preview and component in builder
 - Component: fix validation alerts for pdf errors not gone
 - Disable Day component if parent component is disabled
 - Fixed an issue where "modified" is false when saving a row of the EditGrid
 - Fixes Formtype when File component is disabled with advanced logic
 - FJS-1028: Date Time Component showing up in ISO Date Format in the submission grid

#### Added
 - Conditional to disable helplinks in builder
 - Added possibility to use evaluator plugin.

### 4.12.1-rc.1
#### Changed
 - PDF-162: Prevent calculating value in read only mode

### 4.12.0
#### Changed
 - No changes: Released RC.19

### 4.12.0-rc.19
#### Fixed
 - FJS-1236: add condition for panel components in wizards

### 4.12.0-rc.18
#### Fixed
 - Build to include fixes.

### 4.12.0-rc.17
#### Fixed
 - FJS-1230 & FJS-1231: fixed an issue where conditional wizard pages and their values are not displayed after setting submission
 - FJS-1220: fix composing data objects in nested wizard forms

### 4.12.0-rc.16
#### Changed
 - Revert https://github.com/formio/formio.js/pull/3092: FJS-1028: Date Time Component showing up in ISO Date Format

### 4.12.0-rc.15
#### Fixed
 - FJS-1205: fixed an issue with line break between error messages and added cursor pointer for navigation
 - FJS-1206: fixed an issue where conditional wizard pages are not shown/hidden if wizard contains nested form
 - FJS-1220: fix display of additional components in nested wizard forms
 - PDF-156: Update empty value validating for form component

### 4.12.0-rc.14
#### Fixed
 - Nested: fix panel collapse validation triggered with dirty=false
 - FJS-834: fixes an issue where focus and caret positions are lost after redrawing component
 - FJS-1117: fixed an issue where validation errors are shown for invalid default value on form load
 - FJS-1103: Manually changing the year on the textfield does not save correctly
 - Fixed regression with custom wizards not moving onto the Thank You page.

### 4.12.0-rc.13
#### Changed
 - Fixed DataGrid initialized as empty.
 - FJS-1136: Fixes an issue where all the components inside a Nested Form are editable when Disabled is checked

#### Added
 - Adding a redraw event to the renderer.
 - Add test to ensure wizard conditional pages keep their value during validation.

### 4.12.0-rc.12
#### Fixed
 - Use NativePromise instead of Promise so it will not break Angular.
 - FJS-1165, FJS-1184: Fixes an issue where default value is not set correctly to the Nested Form
 - FJS-1131: Wizard Breadcrumb visible on first step even though set to "Hidden"
 - FJS-1180: fixes an issue where the component is not disabled/hidden through Property Action
 - PDF-128: Fix html element excluding from callback

### 4.12.0-rc.11
#### Fixed
 - Regression: fixes an issue where File is not working inside Wizard
 - Fix formio.js file not loading in IE
 - FJS-1144 #3: Fixes an issue where html5 Select does not show value/placeholder after opening EditGrid's row
 - Fixed an issue where Required Error is not triggered for Quill
 - FJS-1147: Fixes an issue where CKEditor shows only outline on focus and not set the cursor
 - FJS-1143: fixes an issue where the Result form is not rendered in the Custom Component example

#### Changed
 - Upgrade dompurify@2.0.14, mocha@8.1.3, file-loader@6.1.0, webpack-stream@6.0.0

### 4.12.0-rc.10
#### Fixed
 - FJS-1179: fixes an issue where the Value components is updated when editing the Key Component, disables editing the Key Component
 - Modified has nested field logic in Select.js #3185

### 4.12.0-rc.9
#### Added
 - FOR-2699: now passing groupId and groupPermissions to file upload
 - FIN-007: Add an Intuitive/dynamic search box in the Custom Fields List
 - FJS-1147: Fixes an issue where user cannot focus on the invalid Text Editor

#### Fixed
 - FJS-1162, FJS-1163: Fixes an issue where it is unable to focus on the component that is inside a Layout Component which is inside a DataGrid
 - FJS-1144: Fixes an issue where the Select that is in the EditGrid is not cleared on refresh
 - FJS-1063: Unable to see all values of a select field if it is inside a panel inside of a table
 - Fixed an issue where the text areas would delete spaces as you type them.
 - FJS-1187: fixed an issue where today date is not chosen on first click in calendar
 - Modified has nested field logic in Select.js #3185
 - FJS-1179: fixes an issue where the Value components is updated when editing the Key Component, disables editing the Key Component

#### Changed
 - Upgrade @babel/core@7.11.4, chance@1.1.7, mocha@8.1.2, i18next@19.7.0

### 4.12.0-rc.8
#### Fixed
 - VPAT/USWDS 1.9.x essential commits
 - PDF - 135: Fix the issue with second form saving

### 4.12.0-rc.7
#### Fixed
 - Issue with allowOverride not working correctly.

### 4.12.0-rc.6
#### Fixed
 - FJS-1119: added wrapper to alert message unescaping HTML characters
 - Fixes an issue where images are not appended to the TextArea in some cases
 - FJS-1137: Fixes an issue where the CKEditor is editable when inside of disabled panel
 - Fixed an issue where all the blank lines are removed from the text editor
 - Fix/id path setting for Select Components.
 - FJS-1172: fixed an issue where date is chosen only after second click in calendar
 - FJS-1171: fixed calendar opening on suffix click

#### Changed
 - FJS-1050: added hideLabel option for panel

#### Added
 - Added an offAny method wich removes the listener that will be fired when any event is emitted
 - FIN-027: Mechanism to indicate once the PDF has completely Loaded

### 4.12.0-rc.5
#### Fixed
 - Issue where Panels were written for Bootstrap 3 instead of 4.

### 4.12.0-rc.4
#### Fixed
 - Fixed issue where DataGrid would remove all components on remove row.

#### Changed
 - Change the display of panels for nested wizards inside parent wizards

### 4.12.0-rc.3
#### Fixed
 - UIP-239: select options overlayed over tables.
 - FJS-1044: 'OnBlur' Valdation is not working for email and phone number inputs
 - FJS-1111: fixes the Stack Overflow error which occures when multiple TextArea is inside conditionally shown component
 - Pass "locale" (not "language") Flatpickr setting: #3129
 - Fixed getting component in NestedArrayComponent when rowIndex is not provided.
 - Fix reCaptcha loading on Wizard form

#### Added
 - FJS-1128: added translation for label in form error alert
 - Adding the vid to the currentForm when revision is loaded.
 - FOR-2725: added possibility to use file name inside interpolated url in file component
 - Add saveDraftBegin event

#### Changed
 - Make sure checkData is called on Wizard pages after every page is set.

### 4.12.0-rc.2
#### Fixed
 - FJS-1118: fixes an issue where initially collapsed panels are opened when have required component inside
 - FJS-1041: added possibility to interpolate dataGrid max/min length
 - FOR-2714: Fix Webhook Action authentication part autocompleting
 - FJS-1058: fixes an issuewhere the Signature has different dimensions in the View and Edit modes
 - FJS-1035: Fix Conditional add button for EditGrid

### 4.12.0-rc.1
#### Fixed
 - FJS-1109: replaced scope with alternative selector for working in IE11
 - FJS-1079: fixes an issue where label width ignored when label is hidden
 - FJS-947: fixes an issue where forms' controllers are executed twice
 - FJS-1117: added support for old default values in survey component
 - FJS-1117: fixed number min-max validation
 - PDF-106: Add flag to determine new component creation
 - FJS-1034: Made Data Components' value's preview be displayed as a simple table
 - Fix conditional wizard pages not getting values set correctly.
 - FJS-1104: added label position for address
 - FJS-1028: Date Time Component showing up in ISO Date Format
 - FJS-1097: fixes an issue where error message is not shown under the Submit button
 - FJS-1082: EditGrid: fix viewing nested submission data issue
 - Fixes an issue where value of non-persistent component is not calculated and shown in the View/Edit mode
 - FJS-1033: Fixes an issue where data of some components with 'modalEdit' option is not shown in the 'view' mode
 - FJS-1072: fix index computation after deleting rows in the EditGrid
 - FJS-1060: fix template detail for Select when using Entire Object option
 - Do not override the defaultValue field for hidden components: #3070
 - FJS-1065: Maximum call stack size exceeded infinite loop error
 - Fix (TextArea): Fixes an issue where images do not fit the editor's box in readOnly mode
 - FJS-1040: fix recalculation of row numbers for DataGrid
 - Fix (TextArea): Fixes an issue where images are not uploaded to the storage provider in the Quill editor and then an error occures
 - FJS-1022: fixed an issue where row alert errors list is not updated when editing editGrid modal row

#### Changed
 - FJS-1006: Remove 'Table View' setting for layout components
 - VPAT-498 Changed flatpickr to be lazy-loaded and removed dependencies
 - Reverted EditGrid default template back to where it was before to adhere to 80% usecases

#### Added
 - VPAT-502 Added 'for' attributes for labels and IDs for inputs
 - Adding config upload only option to file.edit
 - Retain key if provided when drag/dropping an element
 - FJS-1050: added hide label option for panel component

### 4.11.1
#### Changes
 - No changes. Released 4.11.1-rc.9 as official release.

### 4.11.1-rc.9
#### Fixed
 - FJS-1117: fixed an issue where validation error is shown for valid value when component has invalid default value

#### Added
 - More entry points for external libraries to reference components within the renderer.

### 4.11.1-rc.8
#### Fixed
 - FJS-1083: Add polyfill for :scope CSS pseudo-class to fix IE11.
 - FJS-1080: Fixed problems where the suffix was getting mutated on the component causing issues with logic.

### 4.11.1-rc.7
#### Fixed
 - FJS-1080: Fix focus for TextField with calendar widget

### 4.11.1-rc.6
#### Fixed
 - FJS-1018: fixed signature is not visible after submission

### 4.11.1-rc.5
#### Fixed
 - FJS-1061: 400 errors are not displaying on the front end when button action fails
 - [FJS-1062] Fixed matching dataValue to dataFormat of time component on input and blur events.

### 4.11.1-rc.4
#### Fixed
 - PDF-81 (IE11): Update data type and value to resolve ie11 issue
 - PDF-83: Create method to set placeholder
 - FJS-1074: added using decimal keyboard if decimal is allowed

### 4.11.1-rc.3
#### Changed
 - Downgrade core-js@3.5.0 to fix Select dropdown URL with IE11.

#### Fixed
 - FJS-1039: Fixed CKEditor and Quill editor for IE11

### 4.11.1-rc.2
#### Fixed
 - Adding for attributes to labels to support VPAT.
 - Removed bad behavior of PDF forms where the page would jump as you correct errors.

### 4.11.1-rc.1
#### Fixed
 - Problems with the PDF Builder where it would not update forms after they have been saved.
 - FJS-1022: added cursor pointer for error messages inside alerts (for modal editGrid rows) and simplified message
 - FJS-1043: fixed validation on blur inside a panel
 - FJS-1032: fixed an issue where btn checks validity when disableOnInvalid is not set and removes error classes when form is still invalid

### 4.11.0
### No changes.  Released 4.11.0.

### 4.11.0-rc.5
#### Changed
 - Added an option to showErrors that will pass an onChange flag to keep focus events from occuring in vpat.

#### Fixed
 - Fixed signature field dimensions inside data grid

### 4.11.0-rc.4
### Changed
 - Upgrade CKEditor to v19.0.0
 - Added ImageResize plugin to CKEditor.

### 4.11.0-rc.3
### Fixed
 - Crashes with the OAuth buttons.
 - Issues where wizards would clobber first page if the panels had the same keys.

### 4.11.0-rc.2
#### Fixed
 - Some anomalies with PDFBuilder when used with angular-formio.

#### Added
 - Progress bar to the PDF Upload.

### 4.11.0-rc.1
#### Fixed
 - FJS-1025: fixed validation error when submitting time with empty value
 - Fixes an issue where values are not always set to the quill editor
 - FJS-1022: fixed editGrid not showing errors in specific row if 'display as modal' and row drafts are enabled
 - FJS-1017-C: fixed dataSource dependent data display in readOnly and edit mode

#### Changed
 - Improve the way oauth works to work with new server provider.
 - Localize alert messages, simplify t() methods

### 4.10.5
#### Changed
 - Pinning core-js to 3.5.0 to resolve IE11 issues.

### 4.10.5-rc.5
#### Fixed
 - Fixes an issue where component was not found in few cases with deep nesting
 - Pin core-js version to 3.6.1 to fix IE11
 - FJS-994: prevent changing state in readOnly when use editRow btn to view submissions in the modal
 - FJS-1009: added modal window closing on click out of the modal in readOnly and when value was not changed
 - FJS-1023: Clear on refresh is clearing populated data on form load for select component
 - Fix domparser crashing server.

### 4.10.5-rc.4
#### Fixed
 - FJS-1017-A: fixed dataSource not fetching data inside wizard

### 4.10.5-rc.3
#### Fixed
 - FJS-909: fixed dateTime renders suffix/prefix as string if form is saved in next/edge
 - Issue where the login token would not get set during login.

### 4.10.5-rc.2
#### Fixed
 - FJS-1021: fixed the issue where it is possible to override calculated value when 'Allow manual override' setting is not set
 - FJS-1014: Fixed an issue where Required fields are validating when form is initialized when using a form in FormManager
 - Fix select dropdown does not open on first click after value clear
 - Fix (Button): message under button displayed as [object Object]. #2982

### 4.10.5-rc.1
#### Changed
 - added consistent return for setToken #2958
 - Extending the component modal and more PDF features. #2974
 - Make it logout even if server request fails. #2967
 - Use this.i18next instance instead of imported module. #2972
 - Upgrade @babel/cli@7.10.3, @babel/core@7.10.3, @babel/plugin-proposal-optional-chaining@7.10.3, @babel/preset-env@7.10.3, @babel/register@7.10.3, fetch-mock@9.10.2, i18next@19.5.1, moment@2.27.0, eslint@7.3.0

#### Fixed
 - FJS-704: Address Refactor Issues
 - Enable localization of field prefix and suffix. #2959
 - Fixes an issue when a Select's value is not rendered inside EditGrid. #2960
 - FJS-1009: fixed modal dialog window and modal edit window behavior
 - FJS-995: fixed validation error in editGrid inside another editGrid in readOnly mode if the row is open
 - FJS-994: fixed status change in readOnly when using EditGrid in dasplayAsModal mode
 - FJS-923: fixed conditional logic not working correctly for components with the same keys
 - Fixing issue where checkbox would show wrong checked for Checkbox as Radio input.

### 4.10.4
#### Fixed
 - Issue with angular-formio throwing an error saying "global" is not defined.

### 4.10.3
#### Changed
 - No changes.

### 4.10.3-rc.6
#### Fixed
 - FJS-1019: fixed dateTime calendar opening problem

### 4.10.3-rc.5
#### Changed
 - Reverted #2916: It was breaking removing components.

#### Added
 - VPAT-394/391 Added callbacks to further extension in VPAT

#### Fixed
 - Fix/validation error messages contain html chars. #2953
 - Fix calculated value

### 4.10.3-rc.4
#### Fixed
 - Allow non-truthy computed values (e.g. zero). #2945
 - Fix (Wizard): display panel navigation buttons according to page options. #2934
 - Add text overflow for long select items. #2911
 - FJS-1009: Fixes an issue when a confirmation dialog is shown even if no values within the editing row were changed
 - FJS-1002: Fixes an issue when components comparing by getter and property

#### Added
 - Add schema warning so that future schemas can be versioned. #2944

### 4.10.3-rc.3
#### Fixed
 - Fixing a performance issue where a lot of buttons makes the form slow.

### 4.10.3-rc.2
#### Fixed
 - FJS-817: fixed options display after selecting searched value in multiple select with resource
 - Fix (Element): methods for adding and removing classes caused error for angular FormControl
 - FJS-1012: fixed wizard infinite loop in builder mode
 - FJS-1011: Fixed select component with JSON data source always having empty object as default value in submission

#### Added
 - Selecboxes & builder tests

### 4.10.3-rc.1
#### Fixed
 - FJS-997: Fixed dateTime manual overriding
 - Fixing issue where the PDFBuilder is not sending the correct schema to the pdf. #2928
 - FJS-885: Render hidden component without dataValue
 - FJS-1005: Fixed editGrid data display inside wizard in readOnly mode
 - PDF 10: Search and removal of the component on all nesting levels

#### Changed
 - Refactor validateOnInit flag logic

### 4.10.2
#### Fixed
 - Reverted FJS-997: Fixed dateTime manual input.

### 4.10.1
#### Fixed
 - FJS-997: Fixed dateTime manual input.
 - FJS-1004: Fix (WebformBuilder): components inside Columns are not able to save
 - FJS-999: Fix (SelectBoxes): not able to manually override calculated value

### 4.10.0
#### Fixed
 - FJS-996: fixed components key uniquifying
 - FJS-892: Fix (WebformBuilder): forms are not merged correctly during handling a conflict
 - Fixed typeo of Flatpickr name in settings.
 - FJS-998: Fixed losing overridden value when reordering dataGrid rows

#### Added
 - Tests for EditGrid dialog confirmation.

### 4.10.0-rc.13
#### Added
 - FJS-985: Feat (EditGrid Modal): added confirm dialog before closing modal row
 - Add time validation for Time component.

#### Fixed
 - FJS-957: fixed pattern validation error appeared for empty value
 - Fix(TextArea): update convert function parameter for Quill editor.

### Changed
 - Upgrade ejs-loader@0.5.0

### 4.10.0-rc.12
### Added
 - Private download check for image load.

### Fixed
 - Regex in Safari and Firefox.
 - Modal edit css moved to form css.

### Removed
 - TinyMCE support which was never intended to be pulled in.

## 4.10.0-rc.11
### Changed
 - Using Quill 2.0.0-dev so that we can have tables capability.

### Fixed
 - FOR-2683: Fix (Select): made values such as "01", "02", etc. not be converted to 1, 2
 - FJS-986: Fix (WizardBuilder): prevented emitting change in the schema getter

## 4.10.0-rc.10
### Fixed
 - Datagrid with default of zero rows breaks builder and add way of not adding a first row.

## 4.10.0-rc.9
### Fixed
 - PDF 008: Fixed to correctly set the default value of CheckboxAsRadio
 - FJS- 978: Ensure that the RefreshOn will always fire correctly when many changes are occuring.
 - FJS-967: fixed word counter calculates words with digits as 2 words
 - FJS-359: Fix onblur validation
 - FJS 965: fixed builder error when empty array is set as dataGrid default value
 - FJS-785: Fix (NestedForm is not shown when modalEdit)
 - Update File.js for S3 image uploads. #2885
 - FJS 948: Fixed component key with dot breaks advanced logic

## 4.10.0-rc.8
### Changed
 - Updated @formio/bootstrap3@2.6.1
 - Updated @formio/semantic@2.4.1

## 4.10.0-rc.7
### Added
 - Modal edit grid alerts: #2860
 - Row drafts for Edit Grid. #2862
 - Send auth token with logout request. #2864
 - PDF-70: pdf builder improvements

### Fixed
 - FJS- 979: fixed address google maps not showing search results in IE11
 - FJS-968: `eachComponent` including `htmlelement` and `content` components when `includeAll` is not provided
 - PDF-59: Fixed redirection after hitting the pdf submit button
 - PDF-41: Removed red asterisk from readOnly mode and submission as PDF
 - FJS-704: Address Refactor Issues
 - Fix missing promise return in deleted method of Formio.js: #2855
 - FJS-968: Fixed `eachComponent` including `htmlelement` components when `includeAll` is not provided
 - Fix for Select component Add Resource: #2859
 - FJS-976: fixed nested form show default value after submission
 - S3 file uploads for Ionic. #2874
 - Fix (Modal Edit): added isOpen to open modal window again after it was redrawn. #2866
 - PDF-43: Fixed an issue of disability to drag components over on Firefox
 - FJS-476: fixed multiple dateTime not override initial value when editing but add it to the end of the field

## 4.10.0-rc.6
### Changed
 - Upgrade @formio/bootstrap3 to 2.6.0

## 4.10.0-rc.5
### Added
 - FIN 025 - Added html element into pdf builder.

### Changed
 -  `bower.json` main file in order to fix issues with formio.js used as external dependency (using `Formio` global object)
 - PDF 40 - Fixed element's location on its adding.
 - Fix error classes setting.
 - FJS-958 fixed DateTime not saving input in IE11

### Updated
 - @babel/cli@7.10.1, @babel/core@7.10.1, @babel/plugin-proposal-class-properties@7.10.1, @babel/plugin-proposal-export-default-from@7.10.1, @babel/plugin-proposal-optional-chaining@7.10.1, @babel/polyfill@7.10.1, @babel/preset-env@7.10.1, @babel/register@7.10.1

## 4.10.0-rc.4
### Fixed
 - Angular ZoneAware Promise issue and IE11 issue when using native promises.
 - Type definition to use static for "use" method.

## 4.10.0-rc.3
### Fixed
 - Fixing issues where form default values were not getting set properly. #2834
 - Fix/uip validation error display #2831
 - Fix localization for few labels #2829
 - PDF 72: Fixed an issue of PDF instances duplication and messy Formio.forms
 - FJS-951: Fixed unable to submit form with dataMap inside dataGrid/editGrid
 - FJS-959: `EventEmitter`'s infinite loop logic
   - Changed events amount (`loadLimit`) from 30 to 1000
   - Changed warning message
   - Removed logic for ignoring events when suspecting infinite loop

### Changed
 - Split metadata setter into separate method #2832
 - Update i18next@19.4.5, chance@1.1.6, eslint@7.1.0, fetch-mock@9.10.1, mocha@7.2.0

## 4.10.0-rc.2
### Fixed
 - FJS-940: Fixed not match mask validation error if minute value is 00 in time component
 - Fix (Time): made inputMask be relative to format
 - Fix (Form/Wizard): made child forms be submitted only when Next clicked
 - Fix (Time): required error is revealed even if value is set
 - Fix saveComponent event not passing original component.
 - FJS-952: Fixed data display in editGrid with chain of nested components

### Changed
 - Updated eventemitter2@6.4.1

## 4.10.0-rc.1
### Fixed
 - FJS-723: Added Entire Object option for select with resource
 - FJS-836: Fix (Select): number values starting with zero failed being displayed in data tab
 - FJS-907: If there is calculated value, it will override select component's value that is inactive
 - Fix issue with flatten tabs printing

### Added
 - Add message props on submit
 - Add unique values property to select component

## 4.10.0-beta.20
### Reverted
 - Fix (customDefaultValue): make subForms value be set only after they were attached

### Fixed
 - Fix components path. (Standardize the way to find a components path)

## 4.10.0-beta.19
### Fixed
 - FJS-903: Fixed number formatting
 - Fixed select value if valueProperty is not set
 - FJS-884: fixed select resource values displayed only after second click in edit tab
 - Fix draft submissions by replacing setSubmission with id change
 - Add translation for html element content
 - Fix (customDefaultValue): make subForms value be set only after they were attached
 - Fix (FormioRequest): handle 416 http code
 - Fix visual height of display options so that they will completely show. #2804
 - Fix day component where it was not showing label in builder settings. #2805

### Changed
 - Upgrade bootswatch@4.5.0, fetch-mock@9.9.0

## 4.10.0-beta.18
### Fixed
 - Reverted fix for FJS-723 which caused problems with resource selections.

## 4.10.0-beta.17
### Fixed
 - FJS-887 & FJS-869: Fix (calculated value): manually overridden value is recalculated after component is created again
 - FJS-727: Fixed breadcrumb click logic
 - FJS-924: fixed signature not displaying tooltip
 - Fixing panel header colors to be white on non-default panels.

## 4.10.0-beta.16
### Added
 - PDF 48: Added 'Fixed size' checkbox for textarea edit form

### Changed
 - Upgrade idb@5.0.3, bootstrap@4.5.0, fetch-mock@9.7.0
 - Upgrade ace editor to 1.4.10

### Fixed
 - Fix validate on blur
 - Remove pageQuery global cache
 - PDF 65: Replaced sent component data in saveComponent by updated one to fix issue of not updating pdf element.
 - PDF 38: Added logic to PDFBuilder to show api keys duplication error

## 4.10.0-beta.15
### Fixed
 - Fixed EditGrid's checkData workflow
 - Fix polyfills to not crash on server side.
 - Fix (Wizard): page title in navigation is not updated
 - Fix(TextArea, Input): word count is not working with editors
 - FJS-448: Fixed initial focus disabling in preview
 - In ReadOnly mode, the users may not have the possibility to add resource for Select components as Resource.
 - Updated some translations in Webform

## 4.10.0-beta.14
### Fixed
 - Adding default params to keep them out of the minified schemas.
 - FJS 655: Added dialog window that opens up asking user if they wish to clear the data
 - FJS 862: Fixed radio data losing when navigating between wizard pages if values are numbers
 - PDF-63: Update condition order to get schema
 - FJS-883: Fixed correct radio values rendering in table view if storage type Number is set
 - VPAT-236 Changed variable types for future extension in vpat

## 4.10.0-beta.13
### Fixed
 - VPAT-314 Removed role alert from error messages container #2734
 - VPAT-335 Fixed currency input announcing invalid entry with any value #2734
 - VPAT-362 Fixed axe issues for error section links #2733
 - Encode uri before a request #2735

## 4.10.0-beta.12
### Fixed
 - FJS-207: Fixed submission display in read only mode in tree
 - FJS-723: Added entire object option in value property for select with resource
 - FJS 904: Fixed display of resources with custom components in Existing Resource Fields in builder
 - FJS-547: Fixed issue where default value could not be removed from Date/Time components.
 - FJS 634: Modal Edit (Multiple Values): Does not show any default message like single regular component
 - FJS 903: Fixed currency formatting on blur
 - FJS 903: Fixed number/currency formatting in tableView according localization
 - FJS-884: Fixed select Data Source Type dropdown doesn`t show all options if the form is not saved

### Added
 - Add round function to calculate value context

### Changed
 - Upgrade  i18next@19.4.4, @babel/core@7.9.6, @babel/preset-env@7.9.6, karma@5.0.4, karma-mocha@2.0.1, mocha@7.1.2, uuid@8.0.0

## 4.10.0-beta.11
### Fixed
 - VPAT-335 Fixed currency input announcing invalid entry with any value. #2712
 - Fixed WYSIWYG image upload not working without form URL provided. #2709
 - FJS-133: Fixed possibility to set parent form inside nested form. #2706
 - Fix silent errors. #2700
 - Typo fixed in create error message. #2697
 - FJS-884: Fixed creation of empty select options #2695
 - FOR-2417: Check for hidden submit button in PDF. #2694
 - FJS-884: Fixed showing stringify object in select dropdown. #2691
 - FJS-884: Fixed zero display if there is no selected value in select component. #2690
 - FJS-632 - Fixed an issue of data disappearance after new data grid row adding. #2688
 - Nested form should inherit the fileService from the parent form. #2687

### Changed
 - Upgrade dompurify@2.0.10, gulp-sass@4.1.0, webpack@4.43.0, escape-string-regexp@4.0.0, marked@1.0.0

## 4.10.0-beta.10
### Fixed
 - FJS-779: Fixed display of time icon
 - Fixed select test fail
 - FJS-859: removed raw data value check
 - FJS-805: Fixed replacing multiple value by initial value on blur
 - PDF 34 - Fixed an issue of not formatted date in pdf header
 - Fixed select component empty value when set to multiple

## 4.10.0-beta.9
### Changed
 - Merged v4.9.20-rc.3

## 4.10.0-beta.8
### Changed
 - All changes v4.9.19 - v4.9.20-rc.2
 - FJS-704: improvements and bugfixes.
 - FJS-704: Added possibility to specify email rendering.

## 4.10.0-beta.6
### Fixed
 - FJS 850: DataGrid not redrawing after `setValue` with smaller amount of rows than it had

### Changed
 - All changes part of v4.9.14 through v4.9.17
 - Upgraded autocompleter@6.0.3, core-js@3.6.5, @babel/preset-env@7.9.5, sinon@9.0.2, i18next@19.4.0, escape-string-regexp@3.0.0, karma@5.0.0

## 4.10.0-beta.5
### Changed
 - Allow external modules to extend the select options easily.

### Fixed
 - Address component.

## 4.10.0-beta.4
### Changed
 - Ensure that Formio is added to the window.
 - FJS 836: Fix for storage type normalization in Select component.
 - Fixing issues with the Disable on Invalid for button components.
 - PDF20: Update object with iframe position and window scroll position and IE11 compatibility
 - PDF 21 - Focus on the first invalid field on form submission
 - Fix ace editor error
 - Fix api key unique err
 - Add options for values in Select configuration.
 - Major EditGrid, DataGrid, and Container refactoring.

## 4.10.0-beta.3
### Changed
 - All changes from 4.9.7 - 4.9.9

### Fixed
 - Issues with logic messing up form builder.
 - EditGrid problems where data would get in a detached state.
 - Fixed unstranslated component label in Webform
 - Fixed calculated value doesn`t work when editing data with manual override in true position

## 4.9.20
### Changed
 - No changes. Released 4.9.20-rc.4

## 4.9.20-rc.4
### Fixed
 - Problem where PDF components could not get deleted from the form.

## 4.9.20-rc.3
### Fixed
 - Issue introduced with rc.2 where the builder components would not show up.

## 4.9.20-rc.2
### Fixed
 - FJS-815 - Fixed multiple mask selector disabling when the component is disabled #2667
 - Improve Select component itemTemplate check #2668
 - FJS-848 - Fixed adding and immediate deleting wizard page is not saved #2670
 - PDF 49 - Fixed issues with the PDF form would double submit. #2671
 - FJS 878 - Fixed refresh issues when building PDF forms. #2671
 - Fixing issue where select value would not show up if lazyload and html5 widget is enabled.

## 4.9.20-rc.1
### Changed
 - Added message to focus on pdf form component
 - PDF 21 - Focus on the first invalid field on form submission
 - FJS-811 - fixed possibility to add tags that exceed maxTags limit

## 4.9.19
### Changed
 - No changes. 4.9.19-rc.3 production release.

## 4.9.19-rc.3
### Fixed
 - Fixing the PDF builder and form to not reset the forms when it changes.
 - Changed pdf button to make it highlighted on form state changing
 - FJS 858: Fixed no zeros in currency component when start editing
 - Fix focus on invalid components

### Changed
 - Upgrade i18next@19.4.2, ismobilejs@1.1.1, raw-loader@4.0.1

## 4.9.19-rc.2
### Added
 - A noNewEdit option to keep the edit modal from showing up when a new component is added.

## 4.9.19-rc.1
### Fixed
 - Refresh issues with the PDF builder.
 - Form builder demo to chage the JSON form correctly.
 - Fixing erroneous spaces causing crashes in Chromium
 - Fixied memory leak by stopping video stream on destroy
 - Don't replace choices when adding not found values
 - FJS-844 implement basic fix for checkbox type radio submit values in tableView
 - 'Add Another' button isn't translated with leading space

### Changed
 - Don't skip validation for disabled components
 - Upgrade i18next@19.4.1, ismobilejs@1.1.0, jquery@3.5.0, dialog-polyfill@0.5.1

### Added
 - Add tests for the findComponent method, comment code
 - Add context object while emit render event

## 4.9.18
### Changed
 - Allow external modules to extend the Select options.
 - Upgrade core-js@3.6.5, karma@5.0.1

## 4.9.17
### Fixed
 - Issue where error would throw for some imports that would say "global" is not defined.

## 4.9.16
### Fixed
 - Import issues with including this library in other libraries.
 - Problem where infinite loops could occur with non-input components.

### Added
 - A way to override the alert classes
 - A way to determine the "size" provided by templates.

### Changed
 - Upgraded @babel/preset-env@7.9.5, sinon@9.0.2, i18next@19.4.0, escape-string-regexp@3.0.0

## 4.9.15
### Fixed
 - Problem where the ACE editor would use the wrong mode.
 - FJS 850: DataGrid not redrawing after `setValue` with smaller amount of rows than it had

## 4.9.14
### Fixed
 - Ensure the Formio object is attached to window to fix sites that include other modules systems still able to use Formio globally.

### Changed
 - Add options for values for Select component configurations.

## 4.9.13
### Fixed
 - Issue with disableOnInvalid for buttons and added a unit test to ensure correct behavior in the future.
 - PDF21: Focus on the first invalid field on form submission
 - PDF20: Update object with iframe position and window scroll position and IE11 compatibility

## 4.9.12
### Changed
 - Reverted https://github.com/formio/formio.js/pull/2049 for reasons described in the PR.

## 4.9.11
### Changed
 - Upgrade uuid@7.0.3

### Fixed
 - Problems where errors would throw in ACE editor regarding unknown theme.
 - Issues where EditGrid cancel would not reset the component contexts.
 - The export of the formiojs module to allow other libraries to import from the compiled dist file.

## 4.9.10
### Changed
 - Update idb@5.0.2, jsdom@16.2.2, eventemitter2@6.3.1, ejs-loader@0.3.6

### Fixed
 - Issues with logic messing up form builder.
 - EditGrid problems where data would get in a detached state.
 - Fixed unstranslated component label in Webform
 - Fixed calculated value doesn`t work when editing data with manual override in true position

## 4.9.9
### Fixed
 - Issue where checkboxes configured as Radio input would still add checkbox key to data.

### Added
 - An xs column size.

### Changed
 - Upgrade i18next@19.3.4

## 4.9.8
### Fixed
 - Issues where the setValue of nested components would not return the correct changed status.
 - Issues where read only forms would not apply conditions correctly.

## 4.9.7
### Fixed
 - UIP-159: Fixing the UUID import.
 - T826: Fix nested forms never submitting.

## 4.9.6
### Fixed
 - GS-PDF27: Add DOMTokenList polyfill to resolve submit issues with IE11.

### Added
 - UIP-157: Feat(Columns): add option for grid classes prefixes

## 4.9.5
### Changed
 - The change flow logic to be more isolated and component specific.

### Fixed
 - Issue with Component constructor not executing conditionals correctly.

## 4.9.4
### Fixed
 - Issues with the refresh on property.
 - Fixed issue with loss of focus on Cancel button during Wizard cancel event.

### Changed
 - Upgrade eventemitter2@6.2.1, fetch-mock@9.3.0

## 4.9.3
### Fixed
 - Infinite loop issues that could arise within the renderer.

## 4.9.2
### Fixed
 - Issues where the File component would not always show the file lists.

### Changed
 - Upgrade eventemitter2@6.2.0

## 4.9.1
### Added
 - A way for the child pdf to retrieve the parent position information.

### Changed
 - Upgrade @babel/core@7.9.0, @babel/plugin-proposal-optional-chaining@7.9.0, @babel/preset-env@7.9.0, @babel/register@7.9.0, babel-loader@8.1.0

## 4.9.0
### Fixed
 - A few cases where flags would not get passed in and would cause errors to throw.

## 4.9.0-rc.12
### Fixed
 - Problems where the changed flag was not getting triggered and handled properly.
 - Issues with infinite loops triggered by TextArea w/ ACE editor in JSON mode.
 - Fixed the redraw on property to no store value references.
 - Fixing how the pdf iframe-change event is handled.
 - Fixing containers so that they will ensure the child components trigger their change events correctly.

### Removed
 - Aggressive error navigation where it would throw cursor to top of page when correcting errors. Now you just click the error to take you to the control with the error.

## 4.9.0-rc.11
### Fixed
 - Problems where Number components would not get reset properly.
 - Issues where wizards would always show errors when navigating.

### Changed
 - Revert changes to iframe where src was replaced with blob file hosting. It causes too many problems with different browsers and CSP issues.
 - Upgrade i18next@19.3.3, fetch-mock@9.2.1, gulp-clean-css@4.3.0, file-loader@6.0.0

## 4.9.0-rc.10
### Fixed
 - Ensure no infinite loops are triggered in build mode by not checking data.

## 4.9.0-rc.9
### Changed
 - The PDF rendering to use a local PDF rendering system instead of iframe with external source.

### Fixed
 - Fixed $ entered to the currency component disappears after submit and shows invalid value
 - Fixed calculated value is not set after validation on submit if 'Allow override calculated value' is true

## 4.9.0-rc.8
### Fixed
 - Issues with validations.

## 4.9.0-rc.7
### Fixed
 - Fixed url interpolation in file upload
 - Fixed repeated appearance of selected values in multiselect and appearance of selected values in dropdown when searching
 - Fixed problem where pristine was not set before the checkData method was called when a component was updated.
 - Fixing issues with noValidate flag and setSubmission.
 - Problems where the parentDisabled flag would not get updated to contain the current parent disabled state.
 - Fixing the noeval interpolation to replace all instances within a string.

## 4.9.0-rc.6
### Fixed
 - Problems where forms with default values would get overridden when setting submission with empty object.
 - Fix clear on hide does not always work

## 4.9.0-rc.5
### Fixed
 - Fixed an issue with horizontal scroll added when using RTL interface
 - Fixed Wizard validation is run in readOnly mode
 - Reverted https://github.com/formio/formio.js/commit/2b3ef7fce42410ad5e2e3a779afa401dc4209d97 to solve issues with validations firing.

## 4.9.0-rc.4
### Fixed
 - Problems where data would not set correctly when a layout component was inside a Container component.
 - Issues where select dropdowns would sometimes not show the correct values in EditGrid.
 - Added trailing zeros in currency component.
 - Validation on dayFirst for Day Component.
 - Fixed select multivalue display in HTML renderMode
 - Fixed validation messages to appear inside the panel on form submission
 - Issue where a textfield with inputType set to 'password' would show as clear text.

### Changed
 - Upgrade uuid@7.0.2, @babel/core@7.8.7, @babel/polyfill@7.8.7, @babel/preset-env@7.8.7, @formio/bootstrap3@2.3.0, @formio/semantic@2.2.0, fetch-mock@9.1.0
 - Improved validation message for min and max length.
 - Required validation for select element in nested form

### Added
 - Added formio-form class to wizard component

## 4.9.0-rc.3
### Changed
 - Upgrade i18next@19.3.2, @babel/core@7.8.6, @babel/preset-env@7.8.6, @babel/register@7.8.6, babel-eslint@10.1.0, mocha@7.1.0, webpack@4.42.0, uuid@7.0.1, fetch-mock@9.0.0

### Added
 - Add use(plugin) method for typescript

### Fixed
 - `oktaInit` method not rejecting promise when failed to get token
 - Camera property not in navigator when the form is render
 - HTMLElement bug with conditions on initialization.

## 4.9.0-rc.2
### Fixed
 - The parsing of noeval tokens.

### Added
 - Checkbox to execute calculated values on the server.
 - JWT Token (decoded) to evaluate contexts.

## 4.9.0-rc.1
### Fixed
 - Reverted issues with PDF builder and local iframe sources.
 - Fixed display of submitted data in day component when some fields are hidden

### Added
 - Added Role API methods

### Changed
 - Upgrade i18next@19.3.1, file-loader@5.1.0

## 4.9.0-beta.8
### Fixed
 - Crashes in the choices.js library due to not destroying it properly when creating new instances.
 - Fixed file types select in file component

## 4.9.0-beta.7
### Fixed
 - Coliding placeholders in the ACE editor.
 - Fixed updating revision property on component change
 - Moved some modal styles from form builder into form.
 - File component to be more screenreader compatible.

### Added
 - The nested data components to the Components index.

### Changed
 - Upgraded autocompleter@6.0.2, i18next@19.2.0, sinon@9.0.0

## 4.9.0-beta.6
### Changed
 - Upgrade Choices.js to 9.0.1 to resolve IE11 issues.

### Added
 - Support for form modules.

### Fixed
 - Added validation after wizard page was changed

## 4.9.0-beta.5
### Added
 - `wizardPageSelected` event

### Fixed
 - Prevent keys duplicating when components with the same types which are their own namespaces nested inside each other
 - Fixed presence of selected value in options when search result is empty in lazy-load select with search query name
 - HTML view of DateTime components within an EditGrid.
 - Documentation around select component search fields using regex.
 - Wizard changing next page doesn't update buttons. See https://github.com/formio/formio.js/pull/2423
 - Default value of selects are displaying IDs rather than the label
 - Prevent creating submission for child form when it is hidden
 - Trigger check conditions for added rows
 - Fix clearOnHide while updating submission

### Changed
 - Using fetch to get PDF form so that it can be modified to include headers, etc.

## 4.9.0-beta.4
### Fixed
 - Select URL not working correctly with `/project/...` URLs
 - Fixed restoreValue to make multiple components delete the last value if the user want do so
 - Fixed required error occurs for multiple components when the component is pristine
 - Fixed issue where Logic would make a Text Field loses focus on each character input

## 4.9.0-beta.3
### Fixed
 - Added check for empty triggers to skip it
 - Fixed defaultValue for multiple components to make them not return [[]]
 - Time component raw data
 - Fixed error appearing for isUploadEnabled Textareas for images with missing alt attribute
 - Fixed copying info from nested components for resources
 - Address Component fixes.
 - Fixed an issue where select components would fire wrong search value

### Changed
 - Improve interpolation for noeval
 - Upgrade dompurify@2.0.8, @babel/cli@7.8.4, @babel/core@7.8.4, @babel/preset-env@7.8.4, jsdom@16.1.0

### Added
 - Added min and max year validation

### Removed
 - Removed the need for getAllComponents.

## 4.9.0-beta.2
### Fixed
 - Missing key for mask validation added
 - Pick message from error object to not display 'Object object'
 - Fix setting value in wysiwyg editors
 - Fixed DataGrid removeRow.
 - Make resource fields group editable
 - Fixed problem where the button loaders were occurring on all submit buttons instead of the one clicked.
 - Fixed ability to sumbit form on required select field with no data

## 4.9.0-beta.1
### Added
 - Created nested base classes for DataGrid, EditGrid, and Containers
 - Adding addComponent hook.
 - Adding asynchronous validations through the checkAsyncValidity method.
 - Allow generic nested components to be instantiated
 - Changing data model to getters and setters and allow recursive setting.
 - Adding a better mechanism for setting the component paths.
 - Adding a sanitize flag to setSubmission so that it will not merge existing data.

### Fixed
 - Ensure that the checkbox component updates when it is visible.
 - Fixed error handling on data based nested components.
 - Fixing the Element polyfill to work isomorphically
 - Fixing async validations to be easier to configure and also handle async operations more efficiently.
 - is-invalid on choicesjs
 - Fixed an issue where the wizard builder would create duplicate pages and cause conflicts.

### Changed
 - Removed recursive include in utils.
 - Modified the Evaluator so that it could be extended by external systems.
 - Upgrade idb@5.0.1

### Removed
 - Removing the isBuilt property since it is not being used anymore

## 4.8.1
### Fixed
 - Issue where regular promises were used in new address component and was breaking Angular 7 builds.
 - Issue where tags component would not get its value set properly.

### Added
 - A way to disable certain dates from the DateTime picker.
 - File types to the file input.

### Changed
 - Upgrade fetch-mock@8.3.2, mocha@7.0.1, i18next@19.1.0

## 4.8.0
### Added
 - Error messages when loadForm and loadSubmission fails.

### Changed
 - Replaced usage of `render` template function with usage of pre-compiled template, deprecated `render` template function
 - Tooltip and Description component settings to be Ace Textarea so that it would be convenient for HTML
 - Changed dirty parameter value for wizard onchange validations.

### Fixed
 - Fixed on hover notification for datetime
 - Fixed editing existing signature.
 - Added check for hasComponent in WebformBuilder.
 - Added modified flag to wizard onChange event.
 - `settings.recaptcha.isEnabled` not being populated for the form in Form Builder
 - Button Click reCAPTCHA being triggered on Form Load instead of Button Click
 - Fix form version control
 - Normalize date value for day component
 - Fileuploader component does not render the progress percentage
 - Don't interpolate content when in builder mode so that it won't throw errors and shows the interpolation options.
 - Fixed unexpected validation for selectboxes on pristine form
 - Ace Textarea issues
   - Placeholder not disappearing when typing
   - Editor settings passed through `options` being mutated (`options.editors.ace.settings`)
   - Editor settings from component JSON being ignored
   - `minLines`, `maxLines`, `tabSize` Aces settings being hardcoded without ability to override
 - ```userPermissions``` method not handling submissions with multiple groups properly

## 4.8.0-rc.14
### Changed
 - Added improvements to accessibility.
 - Remove editgrid rows on hide if clearOnHide is true.
 - Upgrade core-js@3.6.4, @babel/cli@7.8.3, @babel/core@7.8.3, @babel/plugin-proposal-class-properties@7.8.3, @babel/plugin-proposal-export-default-from@7.8.3, @babel/plugin-proposal-optional-chaining@7.8.3, @babel/polyfill@7.8.3, @babel/preset-env@7.8.3, @babel/register@7.8.3, sinon@8.1.0, jsdom@16.0.0

### Fixed
 - FOR-2574: Flatten tabs for PDF renderer
 - Wizard initial focus fix
 - Fixed removing values from select if lazyLoad is true.
 - Fix applying input format for number component

## 4.8.0-rc.13
### Added
 - "metadata" and "submission" to the interpolation contexts for HTML and Content components.
 - Implemented Form Controller Execution

### Fixed
 - Focus method for tags component
 - Convert Flatpickr Timestamp `U` to Moment.js `X`
 - Expand panel when validation errors
 - Fix Display of Help Link

### Changed
 - Upgrade idb@5.0.0, mocha@7.0.0

## 4.8.0-rc.12
### Fixed
 - Problems where the form builder would not save changes to components.

### Changed
 - Upgrade core-js@3.6.2, i18next@19.0.3, fetch-mock@8.3.1, sinon@8.0.4

## 4.8.0-rc.11
### Fixed
 - Radio components with Field Logic rendering as text inputs
 - Field Logic triggering component JSON change when nothing was changed
 - Issues with Promises getting included in final build.
 - Fixing file types to not be part of the submission.

### Changed
 - Upgrade vanilla-picker@2.10.1, sinon@8.0.2, webpack@4.41.5, fetch-mock@8.3.0

## 4.8.0-rc.10
### Fixed
 - Removed async and await so that Babel would not add code that fails noeval configurations.
 - Validation bug with modal

## 4.8.0-rc.9
### Changed
 - Made new error list system enabled by default.

## 4.8.0-rc.8
### Changed
 - The path to the error styles to use form settings.

## 4.8.0-rc.7
### Added
 - TinyMCE wysiwyg editor support.
 - Implemented errors list navigation

### Fixed
 - Refactored TextArea components to allow multiple Wysiwyg instances.
 - Fix github #1953: Override .defaultValue of subcomponents.
 - Problem where multiple number components would not let you add new values.

### Changed
 - Upgrade eventemitter2@6.0.0, sinon@8.0.1

## 4.8.0-rc.6
### Fixed
 - Changed references to Promise and replace them with NativePromise.
 - Removed component validity checks on non-input nested components.

### Changed
 - Upgraded @babel/cli@7.7.7, @babel/core@7.7.7, @babel/preset-env@7.7.7, @babel/register@7.7.7, webpack@4.41.4, core-js@3.6.0, eslint@6.8.0

## 4.8.0-rc.5
### Fixed
 - Issues with libraries including formiojs getting warnings with Error: Can't resolve 'vm'

## 4.8.0-rc.4
### Added
 - A new setting called Modal Edit which allows you to edit any component within a modal.

### Fixed
 - Fixed issue with Number component where empty value for reset was not working.

## 4.8.0-rc.3
### Changed
 - Upgrade flatpickr@4.6.3, webpack@4.41.3, fetch-mock@8.1.0, marked@0.8.0

### Fixed
 - Fixed problem where HTML refreshOnChange was not re-evaluating the whole template and setting it correctly.
 - Fixed issue where require decimal on Number components was adding 20 decimals to the number.
 - Fixed single value normalization for Select components.
 - Fix nested components failing to save because child components are required
 - Fix issue where textarea saving as json in select component won't allow array values.
 - Fixed issue where textarea contents would not show in readonly mode.
 - Fix spelling of addMessages.
 - Fix invalid identity escape in numberPattern.
 - Fixed Wizard navigation redraw.
 - Fixed Select component value normalization for multivalues.
 - Day component bug with hidden year field.
 - TextArea component bug with autoexpand
 - Fixed builder initialization code to not require two empty objects passed to factory method.

### Added
 - Added isMobile method to Component class.

### Changed
 - Upgrade i18next@19.0.2, core-js@3.5.0
 - Okta: ```oktaInit``` method to expect okta-auth-js v2 being used
 - Small improvements to requireLibrary method.
 - Cleaned up file component ui improvements.

## 4.8.0-rc.2
### Added
 - FOR-2564: Add polyfills for Element and CustomEvent

### Fixed
 - Fixed required EditGrid's and DataGrids
 - Keep form settings with old revisions so pdfs don't change.
 - Perform day reference check in the Day component.
 - Bug with validity on default value

### Changed
 - Update component settings CSS to flow a little more nicely
 - Roll back flatpickr version to 4.6.2 to resolve an issue that doesn't allow to clear input for the DateTime component.

## 4.8.0-rc.1
### Fixed
 - ```userPermissions``` method throwing error when no submission or submission id is specified
 - ```Formio``` tests always failing with timeout error instead of actual error
 - ```Formio``` tests ignoring mock results for same URLs
 - Fixed adding resource tag to query, which fixes the Resource fields getting into the builder.
 - Fix issue where copying and pasting layout component with multiple items with the same key doesn't uniquify correctly.
 - Fix problem where the form revision would not get loaded correctly.
 - Fixed issue if there is no formio in options for File uploads when deleting files.

### Added
 - New validation system with backwards compatability.
 - Ability for modules to define their own validation rules.
 - Tests for ```userPermissions``` method

## 4.8.0-beta.9
### Fixed
 - Issue with userPermissions method when submissionId is not provided.

## 4.8.0-beta.8
### Fixed
 - Issue where tags could not get set properly in the choices widget.

## 4.8.0-beta.7
### Changed
 - Changed many _.cloneDeep with a fast JSON.parse(JSON.stringify) method.

### Fixed
 - Changed schema to clone the component before returning the modified schema.
 - Tags component to always normalize the value and fixed "undefined" issue with filter command.
 - Fixing build warnings.
 - Fixed errors that show up when using this module in node.js.

## 4.8.0-beta.6
### Changed
 - Upgrade fast-deep-equal@3.1.1, file-loader@5.0.2, raw-loader@4.0.0

### Added
 - Ability to interpolate the HTML Component attribute values.

### Fixed
 - ```userPermissions``` function not taking into account Group Permissions
 - Nested component issue where nested components visibility would not get set correctly when the parent was visibility was changed.
 - The refreshOnChange property for HTML component to use a non event driven way.
 - Fix issue with hidden checkbox values not being updated correctly.
 - Fixing an error that is thrown when the input references are not set.

## 4.8.0-beta.5
### Fixed
 - Problem where the accordion parent names are incorrect.

## 4.8.0-beta.4
### Fixed
 - Fixed issue with unexpected additional value inside datagrid.
 - Fixed Wizard checkData validation order
 - Fix issue with hidden checkbox values not being updated correctly.
 - Fix adding a removing components by schema instead of full definition.

## 4.8.0-beta.3
### Fixed
 - Select autocomplete input UI issues
 - Fixing error that is thrown when reset number component occurs.
 - Fixing wizard page numbers to be accurate.
 - Fixed File component webcam issues
 - Fixed FormioUtils.getStrings failing for Edit Grid component
 - Fixed Wizard checkData validation order
 - Fixed Select default value when multiple is true
 - Fixed a problem when onChange option does not exist.

### Changed
 - Upgrade core-js@3.4.5, bootstrap@4.4.1, bootswatch@4.4.1, eslint@6.7.2

## 4.8.0-beta.2
### Changed
 - Updated semantic template to fix undefined method in radio html template.

### Fixed
 - Build issues when used within an angular application.
 - Fix datagrid, editgrid, container and tabs in data view.
 - Fixed issue if process is not defined.

### Added
 - Allow editor source url and settings to be provided in form options
 - Allow attributes to be passed to modal creation in the form builder

## 4.8.0-beta.1
### Changed
 - Upgraded @formio/bootstrap3@1.1.3, @formio/semantic@1.2.2, core-js@3.4.2, i18next@19.0.1, file-loader@4.3.0
 - Adding major changes to validator to support Isomorphic Validation
 - Adding Merge Component action to Logic settings.
 - Allow "persistent" prefix and suffix components in wizard by adding components outside of root panels.

### Added
 - Added ability to render radio with some options disabled.
 - Adding MinLength and MaxLength validation configuration to DataGrid.
 - Adding ability to open first EditGrid row when it is empty.
 - Adding a feature that will clone the rows of table components to quickly create input tables.
 - Allow translation of file error messages
 - Added ability to configure form builder options globally.
 - Add kickbox settings back.

### Fixed
 - Fix required validation border is being removed after correcting one field
 - Fix configurations for Add Another not changing on top.
 - Fixed issues where default value component would be hidden on edit form.
 - Fixed margins on invisible fields.
 - Fix radio thinking false is true.
 - Fix quotes in input components.
 - Bugfix/radio keyboard uncheck
 - Fixed check node data for tree node
 - Signature component fix 100% width issue
 - Fixed placeholder on initial render in select component.
 - Fix icon for time component
 - Fix issue with Field Logic events accumulating.
 - Fix clear on hide not working since root is never set to pristine.
 - Fixed the wizard to work with forms with duplicate panel keys.
 - Fixing the validator to be component type agnostic.
 - Fixed an issue where the wizard navigation would not show correctly if default submission is provided.
 - Fixing issues where the select component would not default values in wizard mode.
 - Fixing the pattern attribute on Number components to also allow for comma's and decimals.
 - Fix flattened to support renderMode = 'flat' as well.
 - Fix tags to not start with empty string and automatically add tags on blur.
 - Disable button clicks in builder mode.
 - Some Event Listener leaks.
 - An issue where you could drop a component outside of the wizard page in builder mode.

### Removed
 - Remove unneeded settings from components.
 - Removed "always enabled" configuration.
 - Remove field logic validation.
 - Remove field logic from edit preview.

## 4.7.8
### Fixed
 - Modules not setting default templates correctly.

### Added
 - Export all extendable types.

## 4.7.7
### Changed
 - Upgraded @formio/bootstrap3@1.1.2

## 4.7.6
### Fixed
 - Focus shifting when typing in fields with multiple actions Field Logic
 - The min validation to not fire if the field is empty. You can use "required" validation for this.
 - Fixed the currency component to work with viewAsHTML to show the currency symbol.
 - Fixed tooltips for components inside datagrid.
 - Fixed problem where nested Containers, Data Grids, and EditGrids were not setting nested data correctly.

## 4.7.5
### Fixed
 - Issues where the bootstrap and semantic templates were not compiled to ES5 to work with IE11.

### Changed
 - Upgrade core-js@3.4.1

## 4.7.4
### Fixed
 - Ensure that the defaultValue builder field allows for changes to be made to the value without refresh.
 - Fixing issues where modified flag is propogating and setting other elements to modified.
 - isBreadcrumbClickable moved to top nav instead of buttons

### Changed
 - Update @babel/core@7.7.2, core-js@3.4.0

## 4.7.3
### Fixed
 - Avoid JS errors when using autoAdjust columns.
 - Focus shifting when typing in fields with Field Logic

### Changed
 - Upgrade fetch-mock@7.7.3

## 4.7.2
### Fixed
 - Fixing calculateValue and checkConditionals to use correct context variables "row" and "data" for EditGrid and DataGrid.
 - Fix unchecked deep access in WebformBuilder. Fixes https://github.com/formio/formio.js/issues/1920
 - Added uniqification for pages in wizard builder.
 - Fixed problem where inputs were not getting destroyed properly causing memory leaks.
 - Problem where getWidgetValueAsString is undefined.

### Changed
 - Upgrade @babel/cli@7.7.0, @babel/core@7.7.0, @babel/plugin-proposal-class-properties@7.7.0, @babel/polyfill@7.7.0, @babel/preset-env@7.7.1, @babel/register@7.7.0, browser-env@3.3.0

## 4.7.1
### Fixed
 - The default value configuration to reflect the component instance type.
 - The default date setting to allow for "moment" type of default dates.
 - Issue where a memory leak was caused by widgets not getting properly destroyed.

### Added
 - Spellcheck configurations

### Changed
 - Upgrade fetch-mock@7.7.2, jsdom@15.2.1

## 4.7.0
### Changed
 - Refactored the widget logic to work with multiple inputs.
 - Refactored DataMap to allow complex value components.
 - Moved extra templates to external modules.
 - Upgrade choices.js@8.0.0, i18next@19.0.0

### Fixed
 - Fixing problem where columns component would get in a bad state by including 'components' in the schema.
 - Add invalid classes to day components.
 - Fixed page copying for wizard
 - Fix validation flags reset
 - Remove error classes from day components.
 - Fix textarea upper and lowercase
 - PDF uploading issues.

## 4.6.4
### Fixed
 - Datetime not handling empty case correctly after last fix.

## 4.6.3
### Fixed
 - Datetime not formatting value initially when using date only and getting messed up in flatpickr.

## 4.6.2
### Fixed
 - Fix initial focus on Preview Mode
 - Fix Textarea not displaying on read only mode.
 - Fixing issues with select dynamic filtering.
 - Fixed issue where the file uploads would not work when conditionally set
 - Fixing an issue where if you uncheck a radio, you cannot re-check the radio
 - Fixing issues where nested forms would get in a detached state when errors occur on the form.
 - Fixed the survey component when disabled.
 - Fixing day component disabled state.
 - Fixed issue where multivalue may throw an error about dataValue.map not defined.
 - Fix select limit for json

### Added
 - Adding Default data value to DataGrid

### Changed
 - Updated core-js@3.3.5

## 4.6.1
### Fixed
 - Fix json widget setting drop constantly

## 4.6.0
### Changed
 - Wizard templates so that the header and navigation can be provided independently and fixes refresh issues.
 - Make providers modular.
 - Upgrade choices.js@7.1.5, core-js@3.3.4, eslint@6.6.0, i18next@18.0.1
 - Reverted the change to EditGrid templates which was using TableView to determine visibility of sub-components. Having dual purpose flags is problematic.

### Fixed
 - Fixing widget settings for textfields.
 - Initial focus should be disabled when in builder mode
 - Issues where chained calculated values would not work.
 - Fixed default values on form components getting set before the nested form is ready and established.

## 4.5.1
### Fixed
 - Datagrid error around wrong data being passed.

## 4.5.0
### Added
 - Upload FILE to URL- key 'file' in formData to be customizable
 - Ability to customize error message classes.

### Changed
 - Upgrade core-js@3.3.3, dompurify@2.0.7, choices.js@7.1.1, i18next@17.3.0
 - Removed TagPad and SketchPad move them into our external plugin library.

### Fixed
 - Fixes to the plugin architecture.
 - Fixed WizardBuilder schema to fix EditGrid within Wizards.
 - Fixing focus methods for DateTime and Select components.
 - Fixing issues with the multi mask support.
 - Fixing the currency component thousands separator would not show up.
 - Fixing the number component to normalize value before it is set. Fixes bug where an error would throw when you set a Number, then delete the value and try to submit.
 - Fixing issues with the calculated overrides. Resolves problem where Radio "values" could not be modified in the builder.
 - Fixing issue where the Select template would get overridden in Resource components.
 - Fixed Tree component validation.
 - Fixed the options label positions in Radio and Select boxes components.
 - Fixed an issue where a Radio could uncheck itself once it is selected.

## 4.4.2
### Added
 - New plugin capabilities. https://github.com/formio/formio.js/wiki/Plugins

### Fixed
 - Fixed issue where Select templates could not be overridden.
 - Fix setting default value for multivalue

### Changed
 - Made radio buttons uncheckable
 - Updated karma@4.4.1, mocha@6.2.2

## 4.4.1
### Fixed
 - Fixing the dataValue initialization for Containers and other data types.
 - Wizard's ```checkValidity``` method checking only current page instead of all pages
 - Make sure to redraw after reordering DataGrid.
 - Fixed the calendar widget configurations.
 - Fixed builder styles to be more consistent with legacy builder
 - Issues with the Tabs component in builder mode duplicating components.
 - Adding validate required to value for radio configuration.
 - DataMap component to work with defaulted values.
 - Fix calendar event icon in bootstrap3
 - Issue where DataGrid would not initialize correctly when set externally. Fixes Public Configurations in portal.

### Changed
 - Upgraded tooltip.js@1.3.3, karma@4.4.0, moment-timezone@0.5.27
 - Updated timezone DST information file to latest 2019c version.

## 4.4.0
### Reverted
 - Refactoring of widgets and localization of calendar widget.

### Fixed
 - Translation in Component template.
 - Select component not enabling correctly based on parent.

### Added
 - BuilderUtils export.
 - Additional typescript types and improvements.

## 4.3.5
### Changed
 - Upgraded choices.js@7.0.2, webpack@4.41.2

### Fixed
 - Removed redraw when setting a submission, and replace with triggerUpdate. Fixes cursor jumping while typing in ng-formio
 - Styles for form builder to allow wrapping in the sidebar buttons.

## 4.3.4
### Changed
 - Upgraded core-js@3.3.2, jsdom@15.2.0

### Fixed
 - Problems with the DataGrid and hiding columns when in builder mode.
 - Fixed custom default value in wysiwyg editors.
 - Fixed issues where datetime loses format in Wizard

## 4.3.3
### Changed
 - Upgraded webpack@4.41.1, i18next@17.2.0

### Fixed
 - Issues with the webform builder redraw that was replacing outside containing element.
 - Reverted: Extend eachComponent and flattenComponent functions
 - Fixed file component configured as URL saying SyntaxError: JSON.parse: unexpected character at line 1 column 2 of the JSON data
 - Fixing the schema for wizard builders so that it will save when changes are made.

## 4.3.2
### Added
 - Added possibility to add builder groups dynamically.
 - Content Component Default CSS for embedded images.

### Fixed
 - Fixing checkValidity and checkData for EditGrid and DataGrid and also fixed defaulting datagrid rows.
 - Fixing problem where EditGrid is validating when it shouldn't be.
 - Fixing the error reporting styles when a form is submitted with errors.
 - Fix event casing error in File.js
 - Fixing calculated overrides and form builder default values.
 - Fix day component validation tries to reach refs on other page
 - Fix emit event on drop - https://github.com/formio/formio.js/pull/1838
 - Fix day does not populate global data until tabbed or clicked off
 - Fixing nested forms to work within modals, where nested form is a wizard.
 - Testing so that all tests will run with every pull request.

### Changed
 - Updated dompurify@2.0.6, flatpickr@4.6.3, @babel/cli@7.6.4, @babel/core@7.6.4, @babel/preset-env@7.6.3, chance@1.1.3, i18next@17.1.0
 - Extend eachComponent and flattenComponent functions

## 4.3.1
### Fixed
 - Add check for this.widget before destroy(). Fixes https://github.com/formio/formio.js/issues/1817

## 4.3.0
### Added
 - Warning message support.
 - Added cell alignment option to table component.

### Changed
 - Rollback flatpickr to 4.6.2 to prev version until bug will be fixed
 - Upgraded dompurify@2.0.4, idb@4.0.5, fetch-mock@7.5.1

### Fixed
 - Add check of component type because of selection properties of input

## 4.2.12
### Fixed
 - Issue where EditGrid was validating rows when saved was not pressed.
 - Fix issue with nested form submission payloads excluding data object
 - Table component styles to not include a top border when "bordered" is false.
 - Fix auto updating of item template
 - Delete handler for storage providers that got orphaned to a wrong branch.

## 4.2.11
### Fixed
 - Some type issues that was throwing compile errors about "A rest parameter must be of an array type."

## 4.2.10
### Fixed
 - Select as HTML5 not matching strings correctly.
 - Collapsing of columns in bootstrap 4.

### Reverted
 - Added columns extra small classes, so they are responsive on very small screen sizes.

## 4.2.9
### Added
 - Added columns extra small classes, so they are responsive on very small screen sizes.
 - Added option that removes submit button in empty form within builder.

### Fixed
 - Fixed type for customDefaultValue
 - Fixed Content-type header to remove semi-colon from end of "application/json"

### Changed
 - Upgraded i18next@17.0.18, mocha@6.2.1, eslint@6.5.1, fetch-mock@7.4.0

## 4.2.8
### Fixed
 - Submissions not working due to content-type header incorrect.

## 4.2.7
### Added
 - Clickable option to wizard that existed in 3.x

### Fixed
 - Make PDF render templates use data-noattach; make PDF rendering honor submit button visibility.
 - ```Content-type``` and ```Accept``` headers being added to non-formio requests
 - Fix select components not matching numeric values.
 - Fixed Button component disabling.
 - Fix select components not properly clearing error messages.

## 4.2.6
### Fixed
 - Fixes to typescript types.
 - Removed duplicate table-responsive class, fixed styles for help-block.
 - Make editgrid dirty overridable.
 - Add readme and changelog to released version.

## 4.2.5
### Fixed
 - Edigrid rows not correctly reporting as valid.
 - More tests.

## 4.2.4
### Fixed
 - More typescript definitions for the Formio class.

## 4.2.3
### Fixed
 - Minor bug fixes with tests
 - More tests passing.

## 4.2.2
### Fixed
 - The Typescript definitions for the Formio class.
 - Fix nested forms not having config if loaded with full=true.

### Changed
 - Upgraded flatpickr@4.6.3, ejs-loader@0.3.5

## 4.2.1
### Fixed
 - Possibility for edit grid render string to crash.
 - Fixed the default schemas to not include the strictDateValidation flags.
 - Fixed the default schemas for text field to not include the inputFormat flag.

## 4.2.0
NPM would not let us publish to this version. Increase minor version.

## 4.2.0-rc.8
### Changed
 - Any part of Panel header to trigger collapse instead of just its title
 - Upgrade dompurify@2.0.3, webpack@4.41.0

### Added
 - isInputComponent method in utils
 - Type definitions to enable working with TypeScript wrappers.
 - Added saved status for edit grid rows
 - Htmlelement self closing tags support
 - Adding the PDF page to the overlay settings and also tooltips.

### Fixed
 - Signature bug with disabling

## 4.2.0-rc.7
### Fixed
 - Issues with the nested forms not triggering the "ready" flag when it is supposed to.

### Changed
 - Upgraded @babel/cli@7.6.2, @babel/core@7.6.2, @babel/preset-env@7.6.2, @babel/register@7.6.2

## 4.2.0-rc.6
### Fixed
 - Build sizes by removing the locales from Flatpickr and Moment in our build, as well as removed double include of Choices.js.
 - Issue with the rowIndex variable when working with nested components inside EditGrid and DataGrid.

### Changed
 - Upgraded dompurify@2.0.2, sinon@7.5.0

## 4.2.0-rc.5
### Fixed
 - The form builder events to pass along all the necessary information for form merging to occur properly.

## 4.2.0-rc.4
### Fixed
 - Issue where the row variable was not working for HTML and Content components.
 - More tests.

## 4.2.0-rc.3
### Fixed
 - Including other changes from 3.x regarding which variables are provided to userPermissions method.

## 4.2.0-rc.2
### Added
 - Adding authurl and cansubmit refactor

### Fixed
 - Send user-visible text in templates through i18next.t() function
 - FOR-2442: Fixing the calendar widget validations.

## 4.2.0-rc.1
### Added
 - noDragDrop and skipRemoveConfirm to create components with predefined nested components and denied users to change that components.
 - GetView for DateTime with defined format.
 - Improvement to isEmpty function, that if we not provide the value, then we are getting dataValue.
 - Function isEqual, to support comparison of values for at least  DateTime component, where we need to compare only formatted dates.
 - Added support for objects in HTML5 Select component.

## Fixed
 - Fix for EditGrid's components data context.
 - Fix for Hidden component inside DataGrid.
 - Check to verify, that previewElement exists.

## 4.1.1
### Added
 - Added filter and sort fields to resource component.

### Fixed
 - Stop different component editforms from mutating each other.

## 4.1.0
### Changed
 - Major upgrade dompurify@2.0.0
 - Minor upgrade i18next@17.0.16, eslint@6.4.0, webpack@4.40.2
 - Code cleanup: Creating common sanitize methods.
 - Refactoring the checkdata system to be more performant and easier to understand.

### Fixed
 - Fix issue where errors aren't clearing.
 - Fix wizard taking a very long time to submit and simplify logic.
 - Fixing button component to not require button element to attach and states to work correctly.
 - Fixing the tags component setValue and getValue to work without choices.
 - Fix events missing from Form factory.
 - SAML is redirecting to home page after handshake.
 - Fixing issues with the panels from refreshing in wizards if they do not have keys.
 - Fix issue where select html5 components can't restore value properly.
 - Fixing issue with DataGrid, EditGrid, and DataMap not triggering changes correctly within setValue method.

### Added
 - Adding element protections.
 - Added error container to TextArea component.
 - A way to configure the Sanitization settings with outside configurations.

## 4.0.11
### Fixed
 - Use of for/of in template not supported in IE11

## 4.0.10
### Added
 - Delete handler for file storage providers

### Fixed
 - Select component delete event
 - Wizard page length can sometimes cause issues if used before initialized.
 - Editgrid state for each row sometimes is wrong.

## 4.0.9
### Fixed
 - Custom validation errors clearing too often when external validations are set.
 - Field logic not firing on first page of wizard.
 - Minor issues with semantic templates and incorrect variables.
 - Missing functions when calling components directly.
 - Client only persistence not reporting correctly in results.
 - Get tests running and passing.
 - Fix clear on hide when initially setting values and when items show or hide.

## 4.0.8
### Reverted
 - Changing the way tabs are attached since it broke setting values in all non-active tabs.

## 4.0.7
### Fixed
 - Select with boolean or simple numbers were not matching on setValue
 - Builder defaults options to an empty object if not given.

## 4.0.6
### Added
 - Select and Radio can now specify the Storage Type for date type casting.

### Fixed
 - Shortcuts missing options in builder.
 - Datetime component losing timezone when saving
 - Field logic not firing on panel pages.

## 4.0.5
### Added
 - Add string representation of form component for table views.

### Fixed
 - Problem with select component would chose empty object as default instead of empty string.
 - Fixed issue when skip&limit become undefined if select resource data type
 - Issue with the Container component within the form builder overlapping outside.
 - Problem where values would not get reset after a form is redrawn.

## 4.0.4
Not found

## 4.0.3
### Fixed
 - Major performance regressions when form or component were used in custom conditionals or calcuations.

## 4.0.2
### Fixed
 - Fixed issue with appearance of unnecessary loading option
 - Disable load icon item in select component.
 - Infinite refresh loop by not triggering an update when setting a provided value on Select components.
 - Issue where the Redraw On option in the form builder was throwing some errors.

### Changed
 - The refreshOn property to be called "redrawOn", unless it is a Select component. This will maintain reverse compatability for now with and will gracefully deviate in the future.

## 4.0.1
### Fixed
 - Components would incorrectly clear any values that are visible because of another value when loading a submission.

## 4.0.0
### Breaking Changes
 - Refactored the build methods for all components, and broke that apart to be 3 separate methods:
   - init: Initialize the render component.
   - render: Renders the component as a string.
   - attach: Looks up references in the template, and then binds events and attaches component logic to the template.
 - Component class replaces the BaseComponent class.
 - Added more OOP heirarchy to components including.
   - Field
   - Input
   - MultiValue
 - Directory structure:
   - Base classes are now stored in the "components/_classes" folder including
     - Component - Base component for most components.
     - Field
     - Input - All input element derive from this class.
     - MultiValue - Handles multiple valued components
     - Nested - Handles all nested components.
 - Introducing Templates
   - You can now create your own templates that can override all aspects of the UI/UX for the rendered forms. See https://github.com/formio/formio.js/wiki/Form-Templating
 - updateValue() - This method now passes the "value" of the component to the first argument, instead of the second.
    3.x:  updateValue(flags, value)
    4.x:  updateValue(value, flags)

## 3.22.6
### Fixed
 - Problem where the wysiwyg settings would get reset when hidden.
 - Issues where infinite onchange events would get triggered if a checkbox component was configured as Radio, but no Radio Key is provided.

## 3.22.5
### Fixed
 - Date picker suffix icon for Bootstrap 4
 - Problems with the PDF builder not allowing edit after the component has been added to the form.

## 3.22.4
### Changed
 - Changed all "Promise" instances to use the "NativePromise" polyfill so that core-js would not include a Polyfill of Promise. This was causing issues with other frameworks (Angular) where they duck-punch the Promise library and throw errors when anything other than their wrappers are used (like what zone.js does).

## 3.22.3
### Changed
 - Moved core-js as a dependency so that other libs dependent on core-js@2 can still build this module.
 - Moved the CKEditor NumRows plugin to the formio/ckeditor5-build-classic repo.

### Fixed
 - FOR-2314: Re-fixed builder buttons missing after redraw + fixed Wizard building being broken

## 3.22.2
### Fixed
 - Issues with the form builder not able to switch between wizard pages.

## 3.22.1
### Fixed
 - Issues where the "rows" property was not working on CKEditor.

### Added
 - Ability to configure the wysiwyg settings for the CKEditor.

## 3.22.0
### Changed
 - Upgraded to core-js@3
 - Upgraded all dependencies.

### Fixed
 - Issue where reset for Day component was messing up the data.
 - Sketchpad: Issues with resizing drawing area on beta portal and JS Fiddles
 - FOR-2314: Builder buttons missing after redraw (for ex. when component has ```refreshOn: 'data'```)

## 3.21.5
### Fixed
 - Issues with the CKEditor not working correctly.

## 3.21.4
### Fixed
 - Issues with the PDF builder.
 - Tagpad -> Form data not changing on dot selection, typing in inner tagpad components not working correctly (both reproduce in ng-formio)
 - FOR-2313: Sketchpad -> Fixed color pickers not working on beta portal

## 3.21.3
### Fixed
 - FOR-2309: Tagpad -> Fixed drawing area being rendered over builder buttons when no background image is specified
 - FOR-2312: Tagpad -> Fixed drawing not working on mobile

## 3.21.2
### Fixed
 - FOR-2319: Tagpad -> Fixed drawing area not being auto-resized on initial render when it's inside of Tabs component

## 3.21.1
### Fixed
 - FOR-2310: Tagpad -> Fixed dot being drawn with offset when initial image has minX minY in viewBox

## 3.21.0
### Added
 - FOR-2290: Ability to specify file name template for File component

### Fixed
 - FOR-2079: Cursor jumping in WYSIWYGs when typing in ng-formio, added test

### Added
 - FOR-2290: Ability to specify file name template for File component

## 3.20.17
### Fixed
 - Issue with the onChange for textarea's with wysiwyg enabled.
 - Problems where the pristine flag would not get set correctly.

## 3.20.16
### Fixed
 - Fix error where the modified flag was getting fired for wysiwyg editors.

### Changed
 - Clenaup Choices.selectFields functionality.

### Added
 - Add config for search in Resource components

## 3.20.15
### Fixed
 - Issue where submission with form revisions enabled on "original" form setting was using wrong form.
 - Problem where subform change events were not propagating change flags to the parent form change event.
 - Sketchpad: Small gap at the bottom of view mode image
 - Issue where the change event from a Nested form component was setting the form component as the source instead of the component that triggered the change within.

### Added
 - Tagpad: Automatic resizing of drawing area to fill half of available width

## 3.20.14
### Fixed
 - Field logic infinite redraw issue with Select dropdowns.
 - Problems where the Calendar widgets would not work when Field logic is enabled.

## 3.20.13
### Fixed
 - Problem with subforms where the submission data could possibly reset.
 - Problem with duplicate change events firing from the form components.

## 3.20.12
### Added
 - FOR-2273: Sketchpad -> Automatic resizing of drawing area to fill all free space in modal
 - Min and Max validations to the DataGrid form builder interface.

### Fixed
 - Tagpad: Background being invisible in readOnly mode and overflowing its container
 - When pasting a copied component into an empty layout component, it should paste the component inside the layout component instead of below it.
 - Issues where the "Allow override of calculated value" would get in a bad state.

### Changed
 - Upgraded i18next@15.1.1, babel-loader@8.0.6

## 3.20.11
### Fixed
 - FOR-2216: Add white-space:pre-wrap to native + ACE textareas in readonly/disabled/PDF mode
 - Sketchpad: issue in Chrome with background image being displayed as text
 - FOR-2239: Sketchpad -> Fixed issues with background being shifted in datagrid
 - power-assert output not shown when running formio.js unit tests with karma
 - Component.addClass() adds 'null' to class attribute

### Added
 - Add automatic contrib component registration

## 3.20.10
### Fixed
 - FOR-2241: Fixed the missing false value for conditional logic.
 - Issues where Field Logic would get in an infinite loop.
 - FOR-2248: Resolved some memory leak problems when using builder.
 - Fixing problems where the tabs and checkbox disappear when redraw is called on them.

## 3.20.9
### Fixed
 - Fixed memory-leak where the global Formio.forms were not deleted when the form is destroyed.

## 3.20.8
### Added
 - The user, form and access to the userPermissions check.

## 3.20.7
### Fixed
 - The relay url on the SAML authentication to encode the full url.
 - FOR-2221: Skip supplying `form` during FormioUtils.evaluate() unless we need it

### Added
 - A userPermissions method on Formio to check user permissions on forms and submissions.

### Changed
 - Refactored the "canSubmit" method to use the new userPermissions method.

## 3.20.6
### Fixed
 - Fix touch events on sketchpad, tagpad
 - Fix removing last dot from tagpad
 - Fix checkbox label id in datagrids always referring to same item
 - Add builder info to tagpad and sketchpad

## 3.20.5
### Fixed
 - Only clone form in custom conditionals if needed as it is expensive.

## 3.20.4
### Added
 - A way for the SAML SSO to force the authentication to always trigger against the SAML provider.

### Changed
 - Upgraded @babel/cli@7.4.4, @babel/core@7.4.4, @babel/polyfill@7.4.4, @babel/preset-env@7.4.4, del@4.1.1

## 3.20.3
### Fixed
 - IE issues by adding a CustomEvent polyfill.
 - Possible problems where a plugin could be registered more than once.

### Changed
 - Upgraded fetch-mock@7.3.3, i18next@15.1.0, gulp-clean-css@4.2.0

## 3.20.2
### Fixed
 - Headers were not being passed properly to fetch requests due to change from whatwg-fetch to fetch-ponyfill.

## 3.20.1
### Fixed
 - Problem where forms configured for "fontawesome" would not show the DateTime calendar icon on the field.

## 3.20.0
### Added
 - Sketchpad: Ability to use dimensions from background SVG instead of providing ```component.width``` and ```component.height```
 - Sketchpad: ```defaultZoom``` setting
 - The value of the component to the evalContext so that it is available in all executed contexts.
 - Include additional texts under translation - https://github.com/formio/formio.js/pull/1191
 - Add sort & filter on resource component - https://github.com/formio/formio.js/pull/1188

### Fixed
 - Fixing Okta SSO get AccessToken error - https://github.com/formio/formio.js/pull/1193
 - Added error message for beforeNext hook
 - Adding some protections around scrollList references.

## 3.20.0-beta.3
### Fixed
 - WYSIWYG image upload being broken after lazy load change

## 3.20.0-beta.2
### Fixed
 - Made it so that all input elements have an id.
 - Fixing the builder styles for drag and drop.

## 3.20.0-beta.1
### Added
 - Ability to edit JSON of component in builder
 - Ability to show/hide specific buttons in builder
 - Added a "beforeNext" hook that enables external controllers to hook into the wizard navigation.
 - FOR-2168: Fixed problems with TextArea in multiple setting where value would not set when adding multiple values with Add Another button.
 - Update Checkbox to add checkbox-checked class like Radio adds radio-selected class (https://github.com/formio/formio.js/pull/1136)

### Fixed
 - Issue in builder where if you have an HTML Elememnt and configure it with no content, you can no longer see that component in the builder.
 - Problem with the TextArea character counter that would get off when in WYWIWYG mode.
 - Changed function passed into to current page object

### Changed
 - Upgraded jquery@3.4.0, choices.js@7.0.0, marked@0.6.2
 - Update Text field component to link Label ("for" attribute) with input's id

## 3.19.8
### Fixed
 - Textareas were sometimes unsetting themselves on data change.
 - Sketchpad: sending excess headers on loading background image by URL

## 3.19.7
### Fixed
 - Added form id to radio names so they are unique with multiple of the same form on a page.
 - Textarea without wysiwyg crashed on set value after lazy load changes.

## 3.19.6
### Fixed
 - Problem where the wysiwyg editors would show up on a readOnly form and pdf.

### Added
 - FOR-2019: Ability to override CSS Classes in templates
 - Ability to provide HTML attributes for components inputs
 - Ability to autocomplete selects

### Changed
 - ```<form>``` being root HTML tag for the form instead of ```<div>```

### Fixed
 - Creating builder by URL being broken

### Fixed
 - Fallback to default non HTML templates (cssClasses, iconClass, transform, defaultIconSet) being broken

## 3.16.1
### Changed
 - Upgraded choices.js@6.0.3, @babel/core@7.3.4, @babel/preset-env@7.3.4, fetch-mock@7.3.1, karma@4.0.1, mocha@6.0.2, sinon@7.2.5, webpack@4.29.6
 - Now using a fetch ponyfill instead of the pervious whatwg-fetch polyfill for isomorphic behavior and encapsulation.

### Fixed
 - Issue with importing library with node.js and it would throw an error of "self" not defined.

## 3.16.0
### Changed
 - Improved validation for EditGrid with inline edit.
 - Upgraded flatpickr@4.5.4, mocha@6.0.1, marked@0.6.1
 - Upgraded choices.js library to 6.x branch.
 - Upgraded whatwg-fetch to latest version.

### Fixed
 - Fixed the gulp watch routine.
 - Issue with validations not running on tabs other than the current tab being shown.

## 3.15.6
### Fixed
 - Problems with the private images not showing up when printing to PDF.

## 3.15.5
### Fixed
 - Problem where the renderer would crash within the evaluate method.

## 3.15.4
### Fixed
 - Issue with the valueProperty field configurations not saving for Select components.

### Added
 - The ability to configure the fuseOptions for the Select components.

### Changed
 - Upgraded sinon@7.2.4, webpack@4.29.5, @babel/core@7.3.3, eslint@5.14.1

## 3.15.3
### Fixed
 - Make the samlInit method return the setToken promise to know when the user is done loading.

## 3.15.2
### Fixed
 - FOR-2079: Cursor jumping in WYSIWYGs when typing in ng-formio

## 3.15.1
### Changed
 - The icon for reordering to the more standard bars icon.

## 3.15.0
### Fixed
 - FOR-2075: Excess triggerChange calls for setting submission of Webform
 - Made the Formio.cache values immutable.
 - Issues with Number tests with locales.

### Added
 - FOR-1782: Ability to reorder rows for Data Grid, Edit Grid and Multiple Values components
 - SAML authentication support

### Changed
 - Upgrade i18next@15.0.4, bootstrap@4.3.1, bootswatch@4.3.1

## 3.14.1
### Added
 - Continuous scrolling to Select component.
 - Limit and sort for Select component.

## 3.14.0
### Fixed
 - Fix form select in nested form from not searching for forms.
 - Pass args to event trigger actions instead of event name.
 - Fix bug with default value for DataGrid
 - Problems with nested form conditions

### Added
 - FOR-1804: Add option to override fuzzy search threshold in Select
 - FOR-2044: Fix bug with form danger alert
 - Added ability to set default value on nested forms.

### Changed
 - Upgraded  webpack@4.29.2, eslint@5.13.0, i18next@14.0.1, karma@4.0.0, written-number@0.9.1

## 3.13.10
### Fixed
 - Add ability to set default values on nested forms.

## 3.13.9
### Fixed
 - Crash on nested form due to currentForm setting.

## 3.13.8
### Redo bad publish.

## 3.13.7
### Fixed
 - instance.currentForm for nested forms should switch form.

## 3.13.6
### Added
 - instance.currentForm to reference the form a component is an instance of.

### Fixed
 - Required validation in textarea with wysiwyg.

## 3.13.5
### Fixed
 - Fix issue where redraws don't wait for nested forms to redraw.
 - Fix issue where ckeditor causes infinite change events.
 - Check for bad data coming in to a selectboxes component like if they set the default value to a string.

## 3.13.4
### Fixed
 - Bad build.
 - Re-add the "source" check to ensure that it does not call updateValue on the component that triggered the change.

## 3.13.3
### Fixed
 - Builder without a form set and button type

### Reverted
 - Limiting change events to non source components. This broke custom validation.

## 3.13.2
### Fixed
 - Isolate components and forms when running evaluate of custom code.
 - Fixed problem where if component.customDefaultValue is set, it will override the component.defaultValue setting.
 - Make it so that component.customDefaultValue is NOT evaluated in webform builder default preview so it will not automatically set.
 - Fix issue where checkboxes set as radio couldn't exist together if they have the same key.
 - PDF from not showing the console.warning of "postmessage message type required"

## 3.13.1
### Added
 - FOR-1933: 'formEmbedded' event

## 3.13.0
### Fixed
 - FOR-1802: ```change```  event not firing when component position is changed in PDF Form in builder
 - FOR-1806: ```initialized``` event firing before first ```change``` event when setting language
 - FOR-2000: POST to URL button not passing headers, added interpolation to header value

## 3.12.3
### Fixed
 - FOR-1802: ```change```  event not firing when component position is changed in PDF Form in builder
 - Issue with Wizard cancel.
 - Issue where an error of dataValue.map is not a function would trigger in file components.
 - Problem with Headers not being defined for non-brower implementations.

### Added
 - FOR-1736: Added test for Custom Component.
 - Test to prove the language change occurs in nested forms.

### Changed
 - Upgraded i18next@13.1.5, eslint@5.12.1, sinon@7.2.3, moment@2.24.0, @babel/preset-env@7.3.1, webpack@4.29.0

## 3.12.2
### Fixed
 - Wizard cancel.

## 3.12.0
### Added
 - Added "Inline Edit" mode for the edit grid to commit the changed rows inline with the submission value.
 - reCAPTCHA component
 - Ability to upload images to File Storage for Quill WYSIWYG
 - Possibility to skip proxy value for EditGrid.
 - Hashing and caching for `interpolate` function.

## 3.11.1
### Fixed
 - Issues with the choices icons not making their way into external librarys such as Angular, etc.
 - Added "HTML" property type to extract html content from the HTML5 component

## 3.11.0
### Added
 - The ModalEdit component which allows for inline editing of content with modal overlay.
 - Add html content and component type to strings.

### Fixed
 - FOR-1970: Fixed metadata missing in nested child form

## 3.10.4
### Added
 - FOR-1939: Added the saveDraft feature to automatically save submission drafts as the user is filling out the form.
 - Added a class "formio-modified" to any field that is manually modified.

## 3.10.3
### Added
 - The ability to configure a select dropdown to show only the value in readOnly mode.

### Fixed
 - FOR-1934: Problem where the language configurations was not getting passed into nested forms.

### Changed
 - Upgraded babel-loader@8.0.5, i18next@13.1.0, eslint@5.12.0, marked@0.6.0

## 3.10.2
### Fixed
 - Issues with file uploads where ? can exist in urls twice.
 - Cut reference for values stored in cache
 - Fix bug with compilation skipping for scss files
 - WebformBuilder default editform options mutation.
 - FOR-1962: Removing CSS white color by default

### Added
 - Added option in Data tab to specify custom options that will be used in the Choices JS library

## 3.10.1
### Fixed
 - FOR-1964: Fix bug with delimiter setting in Number
 - Problems where the valueProperty would not show in the Select component settings.

### Changed
 - Switch to Karma mocha reporter.
 - Upgraded i18next@13.0.1, @babel/cli@7.2.3, @babel/preset-env@7.2.3, webpack@4.28.2, @babel/polyfill@7.2.5, bootstrap@4.2.1, eslint@5.11.0

## 3.10.0
### Fixed
 - Signature field has invalid height attribute of "150" instead of "150px"
 - Fixed some potential crashes within the EditGrid component.
 - The form component in builder mode.
 - The form component "form" selection configuration to work within the form manager application.
 - The "authenticate" parameter to work with Select components, where it will pass Form.io authentication to the URL.
 - Fixed view for select multiple
 - A crash in the isEmpty method for DateTime component.
 - Fix bug with editForm Data tab for container components
 - Fix issue where if radio value is true it won't have radio-selected class set on it.

### Added
 - Tree Component for building nested tree-based controls.
 - FOR-1948: editorReady promise for Content component
 - Interpolate to the Button urls so that {{ }} can be used.
 - FOR-1912: Added tests to the Select component to demonstrate no-reproducibility of this issue.
 - Ability to flatten wizard and tab components for better printing capability.
 - Currency Component: Support other currencies - Add suffix / prefix options
 - Allow translating other Choice.js labels.

## 3.9.4
### Fixed
 - Problem where a component can get in an infinite loop if its parent is not visible but it is visible and cleanOnHide is set.
 - FOR-1759: Default Values doesn't include required decimals
 - FOR-1911: Problem where some configurations would not get passed to the wizard components.
 - FOR-1336: Fix bug with double validation
 - Typos

### Added
 - Add ability to get all translatable strings from a form definition.
 - RTL support for select dropdowns.
 - Added component tooltip interpolation


## 3.9.3
### Fixed
 - Problem where wizards with panels with the same key would end up getting caught in infinite refresh loop.
 - Fix single file types still staying hidden.
 - Typos
 - Fix bug with number#getView when value equals to 0

### Changed
 - Upgraded chance@1.0.18, hoek@6.1.2, karma@3.1.3, @babel/cli@7.2.0, @babel/core@7.2.0, @babel/plugin-proposal-export-default-from@7.2.0, @babel/plugin-proposal-optional-chaining@7.2.0, @babel/preset-env@7.2.0, webpack@4.27.1, webpack-stream@5.2.1

## 3.9.2
### Fixed
 - File type settings

## 3.9.1
### Fixed
 - More issues with infinite onChange events getting called.
 - Language is lost when WebForm is created
 - Some style issues for RTL forms.
 - Text to remove superfluous spaces

### Added
 - FOR-1736: Custom component to core builder

## 3.9.0
### Added
 - FOR-1787: Ability to save Day component with empty day / month / year, added trailing zeros to saved value
 - Added File types

### Fixed
 - FOR-1847: Renderer crashing when TextArea is rendered in readOnly and viewAsHtml mode
 - FOR-1850: Wrong key for Encrypted setting in builder

## 3.8.0
### Added
 - Added the CKEditor WYSIWYG available for textarea editors.
 - FOR-1758: Allow for another option of persistence called "client-only" which won't send the data to the server.

### Changed
 - Changed the Content building to use CKEditor.

### Fixed
 - FOR-1845: Builder buttons missing for components with Logic
 - Possibility to hide PDF submit button.

## 3.7.0
### Changed
 - Added the 'hideOnChildrenHidden' parameter for Columns to hide when their children are hidden.

### Added
 - Content property to HTML and Content components Logic.
 - FOR-1806: languageChanged event
 - FOR-1844: Support for private file downloads with the URL file configuration. Also added a File Upload server @ https://github.com/formio/formio-upload that supports this feature.

### Fixed
 - Select component Values template.
 - FOR-1816: DateTime -> Unchecking '12 Hour Time (AM/PM)' checkbox not changing date format automatically
 - FOR-1815: Time component for Safari
 - Tabs component issues when building.

## 3.6.13
### Fixed
 - FOR-1821: Number component min and max validation.
 - FOR-1731: Fix bug with Content component in Wizard builder.
 - FOR-1728: Fixed more issues around text masks and iOS browsers.
 - FOR-1646: Blur events are forcing the select dropdowns to close.
 - FOR-1647: Checkboxes are not getting set in the correct default states.

### Fixed
 - Number component min and max validation.

## 3.6.12
### Fixed
 - FOR-1745: Children components context for Container, DataGrid and EditGrid component.
 - Make sidebar buttons work after adding component.

### Added
 - FOR-1757: Content property to HTML and Content components Logic.

### Changed
 - Upgraded webpack@4.23.1, eslint@5.8.0, i18next@12.0.0

## 3.6.11
### Changed
 - Export the "moment" object in FormioUtils so that it can be accessed from outside libraries.

## 3.6.10
### Fixed
 - FOR-1491: Fix bug with Day when form rendered as HTML
 - FOR-1812: Fixed issues where timezones were not converting properly.

## 3.6.9
### Fixed
 - FOR-1747: Fixed many issues related to contextual data getting swapped (row vs. data) for certain checks within the renderer.
 - Issues where error messages for fields would get drowned out (color-wise) when errors are showing up per-field.

## 3.6.8
### Fixed
 - FOR-1793: Fixed an issue where a "/" would be appended to the Day component value when "Hide Year" was checked.
 - Fixed a small bug where components may disable when they are not supposed to be.
 - Problems where the highlighted errors and custom errors would not persist when they are presented.
 - FOR-1789: Fixed an error where day component would cause beta portal to show 'Cannot read property data of undefined' in data section.

### Changed
 - Upgrade gulp-sass@4.0.2, i18next@11.10.0, eslint@5.7.0, webpack@4.21.0

## 3.6.7
### Fixed
 - Issue with preview destroy on change.
 - Problems with the Select component not working with Refresh On property for some cases.

## 3.6.6
### Fixed
 - FOR-1733: Fixed issue with preview destroy on change.
 - FOR-1728: Problems with running the renderer within iOS applications.

## 3.6.5
### Fixed
 - Broken build.

## 3.6.4
### Chanded
 - FOR-1591: API key regex.

### Fixed
 - FOR-1756: Number component missing delimiters when rendered in Edit Grid
 - Allow webcam to upload at a higher resolution.

### Added
 - FOR-1762: 'wizardNavigationClicked' event for case of Wizard's top navigation click

## 3.6.3
### Fixed
 - FOR-1614: Configure the textfield calendar widget to store date as text without timezone conversion.
 - FOR-1489: Make sure to alter the Date format according to which settings they have enabled/disabled. For Enable Time, Enable Date, and 24hr time.
 - FOR-1754: Fixed problems where the calculateValues would not get fired when navigating between tabs.
 - FOR-1755: Infinite onChange events being fired when editing a component in the builder.
 - FOR-1636: Fixed when you check the 'Disabled' setting for component, you are unable to set the default value as the setting disables the Default value field
 - FOR-1587: Issues where the remove select item button is visible when component is disabled.
 - FOR-1733: Problems where the calendar would not properly destroy.
 - FOR-1733: Issues where the component preview would not properly destroy.

### Added
 - FOR-1637: Ability to manually override calculated values.
 - FOR-1558: Tests to ensure there is not an issue with setting submissions with containers.

### Changed
 - Upgrade @babel/cli@7.1.2, @babel/core@7.1.2, eslint@5.6.1, sinon@6.3.5
 - Moving the Form utilities to their own separate files.

## 3.6.2
### Fixed
 - Fixed problems with infinite onChange events when hiding a multi select component with clearOnHide enabled.

## 3.6.1
### Fixed
 - FOR-1693: Fixed data grid setValue to refresh rows when value changes.
 - FOR-1691: Ensure the DateTime widget is disabled when the component is disabled.
 - FOR-1507: Fixed an issue where the 'disableOnInvalid' flag for buttons would not work for forms that are in a pristine state.
 - Fixed issues where infinite onChange event would happen for conditionally hidden elements with clearOnHide + multiple configurations checked.
 - FOR-1718: Fixed the initialization events to be more deterministic. Also added an 'initialized' event after everyting is done initializing.

## 3.6.0
### Added
 - FOR-1732: Ability to have buttons in builder sidebar.

### Fixed
 - FOR-1705: HTML Element and Content Components losing content when any Logic is applied,
 - FOR-1705: moved 'customClass' CSS class from HTML content wrapper to regular formio component wrapper
 - FOR-1706: Added 'CSS Class' (className) builder setting for Content component which adds
 - FOR-1700: Issues with IE11 by introducing polyfills.
 - FOR-1497: Initial focus on HTML5 Select component.
 - FOR-1709: Conditionals for Form component.
 - FOR-1681: Token issue for iframe.
 - Fixed issue where externally bound events would get removed during redraw events.
 - Fixed the wizard builder page labels to be the correct colors.
 - Issues with the Inline embed codes not working with browser updates.

## 3.5.7
### Fixed
 - Prefix and Suffix for Bootstrap 4.

## 3.5.6
### Fixed
 - FOR-1659: Form Builder preventing removing values from JS code fields (fixed Ace Textarea not firing onChange event when empty)
 - Select component `getView`.
 - FOR-1659: Fixed Ace Textarea not firing onChange event when it gets empty

### Added
 - FOR-1599: Ability to change CSS Classes using Logic
 - FOR-1717: A class of formio-component-multiple for fields with multiple configurations.

## 3.5.5
### Fixed
 - Downgrade whatwg-fetch to 2.0.4 so that this library can be used in node.js without an error being thrown.

## 3.5.4
### Fixed
 - FOR-1712: Make sure that an empty time component does not trigger infinite onChange events.
 - FOR-1711: Ensure that the builder does not execute conditionally hidden elements.
 - FOR-1701: Fix empty check for datetime component which can be a data object.
 - FOR-1287: Move field logic event trigger to build so context is set correctly and interpolate event so it will work with rowIndex.
 - The styles for the phone number component with locale configurations for Bootstrap 4.

### Added
 - FOR-1599: Ability to change CSS Classes using Logic

### Fixed
 - FOR-1705: HTML Element and Content Components losing content when any Logic is applied,
 - FOR-1705: moved 'customClass' CSS class from HTML content wrapper to regular formio component wrapper
 - FOR-1706: Added 'CSS Class' (className) builder setting for Content component which adds

## 3.5.3
### Fixed
 - Survery component input names.

## 3.5.2
### Fixed
 - FOR-1675: Textarea not displaying whole its content in readOnly mode
 - FOR-1417: Caching logic to return promises instead of resolved responses.
 - Fixed problem where nested components would fire calculate value of children when it is conditionally hidden.
 - FOR-1673: Problem where the refreshOn would only trigger first time.
 - FOR-1389: Issue where you could not upload another file when one is removed.

### Added
 - FOR-672: Add uiquify step to copyComponent method.

### Changed
 - Update lodash@4.17.11, @babel/core@7.0.1, i18next@11.9.0, sinon@6.3.2, webpack@4.19.0, whatwg-fetch@3.0.0

## 3.5.1
### Fixed
 - Issues where the PDF builder would not load.

## 3.5.0
### Fixed
 - Problem where icon configurations would not get passed to sub forms.
 - Issue when building tabs, they would reset to first tab.
 - Adding data to add components when moving between tabs.
 - Fixed a problem where clearOnHide would trigger when navigating between tabs.
 - Fixed problem where extending forms would modify the Base forms.
 - Panel style themes for Bootstrap 4 to be consistent with Bootstrap 3.
 - Issue where the builder would resize continuously.

### Changed
 - Hide the label settings for Panels since they have a title field.
 - Upgrade to Babel 8.0 compilations.
 - Upgraded demo application to Bootstrap 4.
 - Default size for EditGrid buttons to small.

### Added
 - URL component
 - Ability to provide global icons using Formio.icons property.

## 3.4.8
### Fixed
 - Problems where the builder sidebar would not collapse the first group causing style issues.
 - FOR-1618: Fixed problems with infinite refresh loops when clearOnHide is used.
 - FOR-1670: Fixed issue in EditGrid where errors would persist and not get cleared when a row is canceled.
 - FOR-1665: Fixed issues where default hidden states would not be set for nested conditionals.
 - Clear errors when components are hidden.

### Added
 - Option that adds the ability to add primary project id to the pdf download icon.
 - A 'change' event to the webform builder anytime the schema changes.

## 3.4.6, 3.4.7
### Fixed
 - Cosmetic changes with Bootstrap 4
 - Fix namespacing of user tokens.

### Changed
 - i18next@11.7.0, sinon@6.2.0

## 3.4.5
### Fixed
 - Issues with the setHidden not working since they were not added to containers.

### Changed
 - Upgrade flatpickr@4.5.2, ace@1.4.1

## 3.4.4
### Added
 - Better settings for webcam and make it initialize properly when switching modes.

### Fixed
 - The form builder to hide sections when the others are clicked for Bootstrap 4.
 - The form builder to show the default section at first.
 - The signature refresh button to use the correct class for bootstrap 4.
 - Style problem where hidden labels would add a space to the top of the control.

## 3.4.3
### Fixed
 - Issues where sessionStorage was making the renderer crash for IE browsers.
 - Problems with the ContainerComponent where it would reset the data objects and stop tracking data changes.
 - Problem with the core renderer to work when it is pointing to the Form Action API.
 - Fix web camera option for image uploads.

## 3.4.2
### Fixed
 - Field logic simple conditional when key.

## 3.4.1
### Added
 - FOR-1635: Add button for taking picture with webcam to image file components.

### Fixed
 - FOR-1644: Required marks missing when Hide Label is checked for a component
 - Field logic simple conditional and set required not setting properly.
 - FOR-1618: Fix infinite loop with hidden, clearOnHide and calculateValue.
 - FOR-1645: Fix columns in datagrids disappearing.

## 3.4.0
### Added
 - FOR-1614: Concept of input "widgets" which allows you to attach "calendar" to TextField. More to come.
 - FOR-1614: Widget settings to TextField component.

### Changed
 - FOR-1616, FOR-1615: Make sure the calendar enforces an input mask and also updates the date on a blur event of the input.

### Fixed
 - Make sure to not send an invalid API call when no resource is provided.
 - Make the select component work when project url is provided.
 - Fixed the select component to trigger a refresh when visibility changes.
 - Fixed the ACE editor to not trigger infinite refresh when new value and existing values are both empty.
 - FOR-1618: Fix bug where select could get in infinite change.

### Removed
 - FOR-1579: Settings from DateTime component that no longer apply to core renderer.

## 3.3.7
### Fixed
 - Problems with infinite onChange events firing from SelectBoxes component.
 - FOR-1500: Error messages displaying.
 - FOR-1500: OnChange event infinite loop on Wizard.
 - Error from occurring in the TextArea builder modal.
 - WYSIWYG: being empty in read only mode in Wizard on non-first page
 - FOR-1604: Fixed issue where Select with RefreshOn + ClearOnRefresh will clear its value even when its refresh dependency does not change values.
 - Issues with EditGrid triggering validation preemptively.

### Added
 - Edit Grid: 'formio-component-editgrid-row-open' class for case when any row is open
 - FOR-672: Copy and paste features on the builder.

## 3.3.6
### Fixed
 - Issues with the embed script to try and grab wrong script from the page.
 - Problems where the default embed script is in Webpack develop mode.

## 3.3.5
### Fixed
 - Path issues with s3 uploads that was adding empty directories to the upload paths.

## 3.3.4
### Fixed
 - Issues with Invalid date showing up for display times in UTC.

### Changed
 - Minor text change for the form builder.

## 3.3.3
### Fixed
 - Issue where the Content component would not work in builder with Refresh on Change checked.

## 3.3.2
### Fixed
 - Problems with undefined promise if no timezone is used.
 - Default datetime component to now show 24 hour time.
 - Fixed placeholder on DateTime component to show the standard form.io time format.

### Changed
 - Added help docs to the DateTime component.

## 3.3.1
### Fixed
 - FOR-1560: Date timezones to use moment-timezone with lazy loading zones.
 - FOR-1445: Problems where duplicates could show up in Select component
 - Issue that arrises when you send a malformed language code to the switch language system.
 - Added try/catch blocks around language switching to make it so the renderer is still usable.

## 3.3.0
### Added
 - A DataMap component that provides a dynamic key-value pair input component.

 ## Changed
  - Cleanup code around setting the locale in the DateTime component.

### Fixed
 - FOR-1570: Fixed an issue where the validation would not be removed if the form is valid.
 - FOR-1549: Fixed a problem with Properties settings in form builder was giving wrong format. Changed to DataMap component.
 - FOR-1326: Fixed an issue where a language change would not re-trigger conditionals.

## 3.2.3
### Fixed
 - Datetime component crashing when using locale format.

## 3.2.2
### Fixed
 - Issue where the timezone dropdown was not showing up on DateTime component.

## 3.2.1
### Added
 - Allow for global overrides of components and let the form.settings override components globally.
 - Allow for custom timezones for the DateTime component.
 - Save the "path" and "options" in Formio class so that they can be passed along to other instances.
 - FOR-1542: Update `build` method of `Container` component.

### Fixed
 - The acronym for offset 0 time is GST not GMT.
 - Fix issue where select and radio components end up in an infinite refresh when hidden with "clearOnHide" set.

### Changed
 - Moved timezone formatting to utils so that it can be used in templates.

## 3.2.0
### Added
 - A way to track submission metadata including referrer, timezone, etc.
 - An option to view the DateTime component in either the Viewer, Submission, or GMT timezones
 - A tableView method to show the data in a submission grid correctly.
 - A method for working with Encrypted S3 buckets.
 - A way to configure the Columns component so that it hides columns where all elements are hidden in that column.
 - A different view widget to view images with file component on devices that support Camera.
 - A way to input text into the DateTime component.
### Changed
 - Upgraded i18next@11.6.0 and upgraded dev dependencies.
### Fixed
 - Tooltip options to make them behave better.
 - Protect calls to getAllComponents where it was sometimes on null.

## 3.1.4
### Added
 - Emitting Edit Grid event for row addition
### Fixed
 - Edit Grid not firing outer calculations on 'Save' button click
 - Problem with DataGrid where its value would not be correct when there were Panels within the DataGrid.

## 3.1.3
### Fixed
 - Problem with the PDFBuilder component where it would remove listeners for the drag-and-drop components.

## 3.1.2
### Fixed
 - The styles for checkbox so that it will look good for both radio and checkboxes.

## 3.1.1
### Fixed
 - An issue where EditGrid may not default to show its values.
 - The readonly view of EditGrid to now show add and remove buttons.

## 3.1.0
### Added
 - Minimum search setting for Select component that would hold off on sending API until they type a certain length.
 - Adding submission to the evalContext so you can do things like {{ submission.created }} in templates.
 - Add validation check to edit form on builder.

### Changed
 - Upgrade text-mask-addon@3.8.0

### Fixed
 - WYSIWYG issue with cursor jumping in the beginning of line on setValue
 - Fixed issue with EditGrid validating and adding rows in the correct order.
 - Fixing DataGrid to not trigger infinite update loops.
 - Making DateTime not trigger constant update handlers.
 - Fixed the Radio component to also check for undefined values.
 - Fixed issue with the builder resetting the sidebar when items are added.
 - Fixed empty single select rendering improperly

### 3.0.0
#### Breaking Changes
 - Changed the overrall structure of the library and how "imports" work to make them more structured.

    ```js
    // To render a new form.
    import { Form } from 'formiojs';
    const renderer = new Form(document.getElementById('formio'), 'https://examples.form.io/example');
    renderer.render();
    ```

    ```js
    // To render a form builder
    import { FormBuilder } from 'formiojs';
    const builder = new FormBuilder(document.getElementById('builder'), {components:[]});
    builder.render();
    ```

    ```js
    // To import a component
    import TextFieldComponent from 'formiojs/components/textfield/TextField';
    ```

 - Changed FormioComponents name to NestedComponent.
 - Changed FormioComponentsIndex name to Components
 - Changed FormioForm name to Webform
 - Changed FormioWizard name to Wizard
 - Changed FormioPDF name to PDF
 - Moved Formio.fieldData to FormioUtils.fieldData
 - Input elements within a DataGrid now refer to the "rowIndex" instead of the column index within the "name" attributes.
 - Chnaged the wrapper classes for Radio and Select Boxes components to be "form-group" instead of "input-group" to make it compatible with both Bootstrap 4 and Bootstrap 3.
 - Renamed GMap component to Location component
 - Changed all exports on Components to be default exports. ```import TextFieldComponent from 'formiojs/components/textfield/TextField';```
 - Deprected ability to "attach" Formio to existing form using Formio.form method.
 - Changed the name and ids of Radio buttons within DataGrids to reflect their position in the grid.
 - Modified all JavaScript execution and template interpolation to make it more consistent.
   - "component" now always refers to the JSON of the component (not the component instance)
   - "instance" now refers to the component instance. Use at your own risk of SDK changes within each component!
   - "row" always points to the "data" context object for that instance (typically row in DataGrid)
   - "data" always refers to the global data of the submission.

## [Unreleased]
### Fixed
 - Data Grid excess re-rendering rows on setValue

## 3.0.0
### Fixed
 - Issue where components in table component would not render conditions correctly.
 - Issue with the selection of a radio component.
 - Multiple Select: Fixed selected items being rendered outside of the input

### Changed
 - Upgraded fetch-mock@6.5.2, gulp-watch@5.0.1, karma@2.0.5, sinon@6.1.4, webpack@4.16.3, i18next@11.5.0, eslint@5.2.0, gulp-rename@1.4.0

## 3.0.0-rc.26
### Fixed
 - Issue with the PDF builder where it would constantly update pdf components when it didn't need to.

## 3.0.0-rc.25
### Fixed
 - Issue where the indexes on EditGrid would get messed up and could add bogus entries.

### Added
 - The lazy load setting for Select components.

## 3.0.0-rc.24
### Fixed
 - Issues with the edit forms not overriding correctly causing inconsistencies with the forms for components.
 - Error for Data Grid with invisible columns (Hidden components, conditionally hidden fields etc.)
 - Issue with EditGrid where the form would invalidate when you are filling out a new row.
 - Search placeholders on the Select dropdown.

### Added
 - CSS classes for array components buttons
 - dataGridLabel configuration when a component is within a DataGrid element.

## 3.0.0-rc.23
### Fixed
 - PDF builder to work much better with the drop zone handling for remote pdf forms.
 - Fixed Data Grid components labels being rewritten to false
 - Hidden Component value being equal to '[object Object]'
 - DataGrid in the builder to allow for editing of the data grid.

### Added
 - Allow for editForm overrides when embedding the form builder.
 - A way to include a "namespace" for the tokens added to your browser so this library can handle multiple projects at once.

## 3.0.0-rc.22
### Added
 - Word and character counts along with validation to all text components.

### Changed
 - Upgraded i18next@11.3.6, babel-eslint@8.2.6, eslint@5.1.0, webpack@4.16.1

### Fixed
 - Utils `getComponent()` function.
 - Data Grid displaying column for Hidden field
 - Fixed the 12hr time configuration for DateTime component.

## 3.0.0-rc.21
### Fixed
 - Issue with builder where editing a component would not work inside nested component.
 - Fixed data grid to not show columns consisting of hidden components.
 - Decimal separators for languages that do not use numerics.

### Added
 - Configure dragula to check if a component can be dragged using the 'no-drag' class

## 3.0.0-rc.20
### Fixed
 - Problem where conditionally hidden select fields would not resolve their loaded promise.

## 3.0.0-rc.19
### Changed
 - Made each build entry derive from the same formio.form entry.

### Added
 - The ability to have access to the Promise library from external mechanisms.

## 3.0.0-rc.18
### Added
 - A way to force components visible or hidden in a hierarchial manner.
 - A way to get access to Formio.Utils from the global Formio object.

## 3.0.0-rc.17
### Added
 - A way to get access to the Formio.Components from within a global script.

## 3.0.0-rc.16
### Fixed
 - Issues with all Nested components getting the "tree" parameter which messed up validators for non data components.

### Changed
 - Upgrade flatpickr@4.5.1, i18next@11.3.5, babel-loader@7.1.5, eslint@5.0.1, fetch-mock@6.5.0, sinon@6.1.3, webpack@4.15.1, gulp-eslint@5.0.0

## 3.0.0-rc.15
### Added
 - Possibility to override i18n settings.
 - `focus` and `blur` events.
 - Added uploadOnly to file component

### Fixed
  - Nested forms validation.

## 3.0.0-rc.14
### Fixed
 - Bad build from previous release.

## 3.0.0-rc.13
### Added
 - Ability to not show any buttons in rendered form.
 - Better feedback on the submit buttons when form is submitting and errors occur.

### Fixed
 - Wrong data being passed to EditGrid and DataGrid for some evals.

## 3.0.0-rc.12
### Fixed
 - Problem with the PDF Builder where you would not see the builder elemements.
 - Fix default value on checkboxes.
 - Fix multiple required file fields not requiring uploading a file.

### Added
 - Make rowIndex available on editgrids and datagrids.
 - Add custom class name to table component.
 - Add the ability for events to trigger field logic.
 - Add option to trigger validations when button is pressed.

### Changed
 - Upgrade i18next@11.3.3

## 3.0.0-rc.11
### Fixed
 - Some issues with the Formio constructor to determine the project, form, and submission paths for certain urls.
 - Problem with the form builder where it would not add elements to the correct parents, but rather the root form.

### Changed
 - Moved the dynamic library loader into the Formio lib so that it is available to other libraries without renderer.

### Added
 - Okta SSO integration.

## 3.0.0-rc.10
### Added
 - Fontawesome for button icons.

### Fixed
 - Multiple require file field not requiring files.
 - File component for base64 download event.
 - Cleanup of editgrid code.

## 3.0.0-rc.9
### Changed
 - Default value for calculated logic.

### Fixed
 - Issues with the event system where some events would get canceled by other components.
 - Required validation for Survey component.
 - Fixed an issue where the file service is not defined when removing images from file component.

### Added
 - Allow url uploads to respond with their own url.
 - 'Hide Input Labels' property for Day component.

## 3.0.0-rc.8
### Fixed
 - Problem with the Select component where it would remove selected items while searching.
 - Issues with the "ready" call after setSubmission would call to early when Select items have not been loaded.
 - Problem with the DateTime component onFocus event opening the calendar on readOnly forms.
 - Problem where the DateTime calendar would still be open when the component is disabled.

### Added
 - Option to allow the HTML and Content components to refresh when a value changes in the data.

### Changed
 - Added deprecation notice to "whenReady" method and replace it with dataReady getter property.

## 3.0.0-rc.7
### Added
 - A builder css build without font-awesome to fix issues with framework library implementations.

## 3.0.0-rc.6
### Fixed
 - Moved all of the function and interplation context objects to use the same method so all available items within are consistent.
 - Problem where the errors of components inside of nested components would not reset the error messages.
 - Problem where Radios within datagrids were getting same name attributes and click events would select the wrong row.

## 3.0.0-rc.5
### Fixed
 - Fixed bad deployment.

## 3.0.0-rc.4
### Fixed
 - i18n in File component.
 - `viewAsHtml` for nested forms.
 - Fix the Day component required validation to work with independent inputs.
 - Fixed the checkbox DOM states to mirror the actual state of the checkbox.
 - Ensure we don't call setInputStyle without an input.
 - Fixed the datetime default date and fixed console warning from moment.

### Changed
 - Only trigger error events on nextPage and submissionError events.
 - Set the value to the checkbox component value when using component name, like in Radio configuration.
 - Moving the fieldData method to FormioUtils.
 - Allow for fully loaded nested forms to render without hitting the server.

### Added
 - Adding the component instance to the change events.
 - Adding the pdf source information to the form object.

## 3.0.0-rc.3
 - Bad release

## 3.0.0-rc.2
### Fixed
 - Issue with Bootstrap.js messing up the form builder accordion.

## 3.0.0-alpha.20
### Added
 - Possibility to Disable Adding / Removing rows for Data Grid
 - Adding numRows and numCols to table builder.

### Fixed
 - Hide the label component for table editing.
 - Fixing the schema creation to not turn arrays into objects.
 - Fixing how datagrid appends names to inputs.
 - Ensure that the error check is fired when changed and submission. Also reset errors when conditionally hidden.
 - Ensure new components added with builder get unique api keys.
 - Fixed issues with number component where it would not submit.
 - Fixed an issue where the number component would not reset its value.

## 3.0.0-alpha.19
### Fixed
 - File data for url file uploads getting lost if it doesn't contain a .date property.

## 3.0.0-alpha.18
### Fixed
 - Issue with multiple settings on Select component not allowing a submission.
 - Problem with the Day component setting disabled where it would cause javascript error.
 - Styling problems with Bootstrap 4 and radio and checkbox controls.
 - Default value issues with the Day component.
 - Problems with non-set values getting set within the submission data.

## 3.0.0-alpha.17
### Fixed
 - Issues with the table builder where it would remove elements when building existing forms.
 - Select component to not have static search enabled for URL based selects with searchField set.
 - Fix possible issue with eachComponent that tries to iterate over a non array.
 - Fix the PDF renderer so that it will submit the form correctly.
 - Fixed issue with the errors disappearing after they show up.
 - Fixed issue with Checkbox configured as radio where original boolean would not get set with submission.
 - Fixed the input disabled class to be dynamic based on the disabled state of the component.
 - Fixed issue where isValid method would return false on hidden required fields.
 - Fixed issue where the x button on multiple select dropdowns was showing in read only mode.

### Changed
 - Make sure to default persistence to true unless otherwise stated.

### Added
 - A way to turn of the static search for select fields in the form builder.

## 3.0.0-alpha.16
### Fixed
 - Issues with the columns builder not including its components.
 - Problems with the decimal place identifier not working for number components.
 - Problems with the file upload not able to get the "formio" instance from the root object.

### Changed
 - Made the default table configuration a static property for ease of maintenance.

## 3.0.0-alpha.15
### Fixed
 - Problem with the Columns builder where it was not adding columns.

## 3.0.0-alpha.14
### Added
 - Possibility to unselect value for Select component.
 - Possibility to show hidden fields using options

### Fixed
 - How TextArea is rendered when it is configured as wysiwyg and is being viewed as readOnly
 - Problem where malformed functions in "custom" parameters could crash renderer.
 - Issues with the Checkbox component configured as a Radio not setting values correctly.
 - Require Decimal behavior for Number and Currency components
 - Hide Label functionality for Panel component
 - Tooltip being hidden for Panels when label is hidden

### Changed
 - Upgraded i18next@11.3.2 flatpickr@4.5.0

## 3.0.0-alpha.6
### Changed
 - The library structure
 - Now using Webpack for the builds.

### Added
 - Multiple masks for text field and phone number components

## 3.0.0-alpha.5
### Fixed
 - Issues with the simple conditional logic in form builder.

## 3.0.0-alpha.4
### Added
 - Better documentation around the javascript execution code.
### Fixed
 - Issues with text area not working when set to required.
 - Problems where two text with same key not working in form builder.
 - `moment` library inside calculated value for DateTime component.

## 3.0.0-alpha.1
### Added
 - Form Builder
 - Tags component (advanced)
 - Tabs component (layout)
 - Collapsible panels
 - A way to remove event listener using the "off" method.
 - "hasClass" method to check for a class.
 - "hasValue" method to check for a value within a component.
 - Version number and license link in all builds.

### Changed
 - How logic executions work by moving them into a single location within FormioUtils called "execute".
 - Made a single way to create modals for form builder and resource adding.
 - Now include Formio utils in the basic "formio" library under Formio.Utils

### Removed
 - Lib folder since this will be included in the package build.
 - Dist folder since this will be included in the package build.

### Fixed
 - Make sure to pass the full root data object within checkValidity.
 - Folder name for EditGrid component.

## 2.32.1
### Fixed
 - Issue with the OAuth button where it would launch the modal at the wrong times.
 - Problems where clearOnHide would trigger on readOnly forms.

## 2.32.0
### Added
 - Ability to save a submission in a state (Save in state on button)
 - Ability to skip frontend validation if in draft state
 - Delete action to button component
 - Message on file component when validation fails

### Fixed
 - Nested form data handling.
 - Default values on nested forms.
 - DateTime component resetting values was not working.
 - Validation styling inside datagrid
 - Destroy method on wizard component not removing header and footer
 - Problem where number component would crash if decimalLimit was less than 2.

### Changed
 - Upgrade i18next to 11.2.3

## 2.31.4
### Fixed
 - Disappering label for DataGrid.
 - Validation for DataGrid.
 - Validation for EditGrid.
 - Destroy method should clear form element
 - Stop talking about FFiles.

### Added
 - Add basic support for submission states.
 - Docs about Seamless.js integration.
 - Explain why files have been rejected when validation fails.

## 2.31.3
 - Bad Release. Do not use!

## 2.31.2
### Fixed
 - Problems with datagrid not rending properly and getting out of sync.
 - Issues with the minLength and maxLength on data grid.
 - Performance issues with datagrid to not re-render unless it needs to.
 - Problem with multiple value setting not resetting values when removing rows.
 - Flickering UI when adding and removing rows from a data grid.

## 2.31.1
### Changed
 - Updated build with latest dependencies.

## 2.31.0
### Fixed
 - Display of Dates within edit grids.

### Changed
 - Server errors now return a rejected promise instead of throwing an error.

### Added
 - Nested form support for forms of different types.
 - Data variable in editgrid templates
 - Collapsible fieldsets
 - Autofocus feature.
 - `getView(component, data)` option for EditGrid body template.

### Fixed
 - Interpolation for EditGrid.

### Fixed
 - Select HTML5 component with Custom data source.

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
 - Issue with select list not saving values across pages.
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
