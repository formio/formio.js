import bootstrap from './bootstrap';

// Deprecated. Semantic and bootstrap3 will be removed in 5.x.
// Use external modules instead.
import bootstrap3 from '@formio/bootstrap3';
import semantic from '@formio/semantic';
import bulma from '@formio/bulma';
export default {
  bootstrap,
  bootstrap3: bootstrap3.templates.bootstrap3,
  semantic: semantic.templates.semantic,
  bulma: bulma.templates.bulma,
};
