import templates from './index';
// GOTCHA(G-FJS03)
import { Template } from '@formio/core/experimental';
Template.addTemplates(templates);
Template.defaultTemplates = Template.templates.bootstrap;
export default Template;
