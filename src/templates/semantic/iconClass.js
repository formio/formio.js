export default (iconset, name, spinning) => {
  const icons = {
    'question-sign': 'question circle',
    'remove-circle': 'trash alternate outline',
    'new-window': 'external alternate',
    'clock-o': 'clock outline',
    'dot-circle-o': 'dot circle outline',
    'files-o': 'file outline',
  };
  if (icons.hasOwnProperty(name)) {
    name = icons[name];
  }
  name = name.replace('-', ' ');
  return spinning ? `icon ${name} loading` : `icon ${name}`;
};
