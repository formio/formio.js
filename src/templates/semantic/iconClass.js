export default (iconset, name, spinning) => {
  const icons = {
    'question-sign': 'question circle',
    'remove-circle': 'trash alternate outline',
    'cloud-upload': 'cloud upload',
    'new-window': 'external alternate',
  };
  if (icons.hasOwnProperty(name)) {
    name = icons[name];
  }
  return spinning ? `icon ${name} loading` : `icon ${name}`;
};
