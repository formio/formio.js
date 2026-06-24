import Simple from './simple';
import Conditions from './conditions';
import Calculated from './calculatedfields';
import FieldLogic from './fieldLogic';
import Actions from './actions';
import ClearOnHide from './clearOnHide';
import EmailAction from './emailaction';
import DateFields from './datefields';
import SubmissionSetter from './submissionSetter';
import ComponentsBasicSettingsTests from './componentsBasicSettingsTests';
import NestedFormValidation from './nested-form-validation';
import WizardWithPrefixComps from './wizardWithPrefixComps';
import WizardWithCheckboxes from './wizardWithCheckboxes';
import NestedFormWithConditionals from './nestedFormWithConditionals.json';

export default [
  Simple,
  SubmissionSetter,
  Conditions,
  Calculated,
  DateFields,
  FieldLogic,
  Actions,
  EmailAction,
  NestedFormValidation,
  ClearOnHide,
  WizardWithPrefixComps,
  WizardWithCheckboxes,
  NestedFormWithConditionals,
  ...ComponentsBasicSettingsTests,
];
