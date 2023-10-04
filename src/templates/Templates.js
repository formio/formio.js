import templates from './index';
import { Template } from '@formio/core/template';
Template.addTemplates(templates);
Template.defaultTemplates = templates.bootstrap;
export default Template;
