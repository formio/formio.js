import PasswordStrongnessAddon from './PasswordStrongness/PasswordStrongnessAddon';

export const editForms = [
  PasswordStrongnessAddon.info
].map(({ components, name }) => ({
  type: 'form',
  key: 'settings',
  display: 'form',
  input: true,
  components,
  customConditional({ row }) {
    return row.name === name;
  }
}));

export default {
  passwordStrongness: PasswordStrongnessAddon,
};
