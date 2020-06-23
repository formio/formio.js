import Formio from './module';
import AllComponents from './components';
import Components from './components/Components';
import Displays from './displays/Displays';
import Templates from './templates/Templates';
import Providers from './providers';
import Rules from './validator/Rules';
import Form from './Form';
import Utils from './utils';
Components.setComponents(AllComponents);

// This is needed to maintain correct imports using the "dist" file.
Formio.Components = Components;
Formio.Templates = Templates;
Formio.Utils = Utils;
Formio.Form = Form;
Formio.Displays = Displays;
Formio.Providers = Providers;
Formio.Rules = Rules;

// This is strange, but is needed for "premium" components to import correctly.
Formio.Formio = Formio;

// Export the components.
export { Components, Displays, Providers, Templates, Utils, Form, Rules, Formio };
