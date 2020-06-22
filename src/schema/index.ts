import _2_0_0 from './2.0.0';
import compareVersions from 'compare-versions';

export const updates = {
  '2.0.0': _2_0_0,
};

export function update(form) {
  const schema = form.schema || '1.0.0';

  for (const update in updates) {
    if (compareVersions(schema, update) < 0) {
      for (const key in updates[update]) {
        form = updates[update][key](form);
      }
      form.schema = update;
    }
  }

  return form;
}
