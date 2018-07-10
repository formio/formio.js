export default (iconset, name, spinning) => {
  const icons = {

  };
  if (icons.hasOwnProperty(name)) {
    name = icons[name];
  }
  return spinning ? `icon ${name} loading` : `icon ${name}`;
};
