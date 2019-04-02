import AllComponents from './components';
import Components from './components/Components';
import Templates from './templates/Templates';
import Formio from './Formio';
Components.setComponents(AllComponents);
Formio.Components = Components;
Formio.Templates = Templates;
export Form from './Form';
export Utils from './utils';
export { Components, Templates, Formio };

