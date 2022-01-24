import PasswordStrengthAddon from './PasswordStrength/PasswordStrengthAddon';

export const editForms = [
  PasswordStrengthAddon.info
].map(({ components, name, defaultSettings }) => ({
  type: 'form',
  key: 'settings',
  display: 'form',
  input: true,
  components,
  defaultValue: {
    data: defaultSettings
  },
  customConditional({ row }) {
    return row.name.value === name;
  }
}));

export default {
  passwordStrength: PasswordStrengthAddon,
};
