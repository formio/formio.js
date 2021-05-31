import EditFormUtils from '../../_classes/component/editForm/utils';
import _isEqual from 'lodash/isEqual';
import _omit from 'lodash/omit';
import _difference from 'lodash/difference';
import _keys from 'lodash/keys';
/* eslint-disable quotes, max-len */
const title = 'Advanced Next Page';
const jsonProp = 'nextPage';
const jsProp = 'nextPage';
const jsDocHTML = (`
  <p>You must assign the <strong>next</strong> variable with the API key of the next page.</p>
  <p>The global variable <strong>data</strong> is provided, and allows you to access the data of any form component, by using its API key.</p>
  <p>Also <strong>moment</strong> library is available, and allows you to manipulate dates in a convenient way.</p>
  <h5>Example</h5><pre>next = data.addComment ? 'page3' : 'page4';</pre>
`);
const jsonDocHTML = (`
  <p>Submission data is available as JsonLogic variables, with the same api key as your components.</p>
`);

const settingComponent = EditFormUtils.javaScriptValue(
  title,
  jsProp,
  jsonProp,
  110,
  jsDocHTML,
  jsonDocHTML
);

export default [
  {
    ...settingComponent,
    customConditional(context) {
      let isWizardPanel = false;
      if (context.instance.options.editForm.display === 'wizard') {
        const { components } = context.instance.options.editForm;
        const component = context.instance.options.editComponent;
        if (components && component) {
          isWizardPanel = components.some((comp) => {
            const diff = _difference(_keys(comp), _keys(component)) || [];
            diff.push('components');
            return _isEqual(_omit(comp, diff), _omit(component, diff));
          });
        }
      }
      return isWizardPanel;
    }
  }
];
/* eslint-enable quotes, max-len */
