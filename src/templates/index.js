import bootstrap from './bootstrap';
import bootstrap5 from './bootstrap5';

// Deprecated. Semantic and bootstrap3 will be removed in 5.x.
// Use external modules instead.
import bootstrap3 from '@formio/bootstrap3';
import semantic from '@formio/semantic';
export default {
  bootstrap,
  bootstrap3: bootstrap3.templates.bootstrap3,
  bootstrap5,
  semantic: semantic.templates.semantic,
};
