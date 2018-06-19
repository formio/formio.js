export default (iconset, name, spinning) => {
  return spinning ? `icon ${name} loading` : `icon ${name}`;
};
