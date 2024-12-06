declare namespace _default {
  export const title: string;
  export { nestedConditionalForm as form };
  export const tests: {
    'Form validation should skip hidden nested form'(form: any, done: any): void;
    'Form validation should validate nested form'(form: any, done: any): void;
  };
}
export default _default;
import { nestedConditionalForm } from '../fixtures';
