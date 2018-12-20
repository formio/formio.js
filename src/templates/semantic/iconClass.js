export default (iconset, name, spinning) => {
  const icons = {
    'question-sign': 'question circle',
    'remove-circle': 'trash alternate outline',
    'new-window': 'external alternate',
    'files-o': 'file outline',
  };
  if (icons.hasOwnProperty(name)) {
    name = icons[name];
  }
  name = name || '';
  name = name.replace(/-/g, ' ');
  name = name.replace(/ o$/, ' outline');
  return spinning ? `icon ${name} loading` : `icon ${name}`;
};
