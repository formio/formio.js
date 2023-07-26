import Simple from './simple';
import Conditions from './conditions';
import Calculated from './calculatedfields';
import FieldLogic from './fieldLogic';
import Actions from './actions';
import ClearOnHide from './clearOnHide';
import EmailAction from './emailaction';
// import ClearOnHide2 from './clearOnHide2';
import DateFields from './datefields';
import SubmissionSetter from './submissionSetter';
import ComponentsBasicSettingsTests from './componentsBasicSettingsTests';
// import NestedFormTests from './nested-form-tests';
// import NestedFormNoSubmit from './nested-nosubmit.js';
// import NestedConditionallyHidden from './conditional-nested-form-load.js';
// import WysiwygCursor from './wysiwygCursor';
// import ChildMetadata from './childMetadata';
import NestedFormValidation from './nested-form-validation';
import WizardWithPrefixComps from './wizardWithPrefixComps';

export default [
  Simple,
  SubmissionSetter,
  Conditions,
  Calculated,
  DateFields,
  FieldLogic,
  Actions,
  EmailAction,
  // ClearOnHide2,
  // NestedFormTests,
  NestedFormValidation,
  // NestedFormNoSubmit,
  // NestedConditionallyHidden,
  // ChildMetadata,
  // WysiwygCursor
  ClearOnHide,
  WizardWithPrefixComps,
  ...ComponentsBasicSettingsTests,
];
