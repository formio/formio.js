import templates from './index';
import { Template } from '@formio/core/experimental';
Template.addTemplates(templates);
Template.defaultTemplates = Template.templates.bootstrap;
export default Template;
