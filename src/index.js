import FormBuilder from './FormBuilder';
import Builders from './builders/Builders';
import { Formio, useModule } from './formio.form';
Formio.Builders = Builders;
Formio.isBuilder = true;
Formio.use = useModule((key, mod) => {
  if (key === 'builders') {
    Formio.Builders.addBuilders(mod.builders);
    return true;
  }
  return false;
});
export * from './formio.form';
export { FormBuilder, Builders, Formio };
