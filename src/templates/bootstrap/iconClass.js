export default (iconset, name, spinning) => {
  if (iconset === 'fa') {
    switch (name) {
      case 'triangle-right':
        name = 'caret-right';
        break;
      case 'triangle-bottom':
        name = 'caret-down';
        break;
      case 'save':
        name = 'download';
        break;
      case 'zoom-in':
        name = 'search-plus';
        break;
      case 'zoom-out':
        name = 'search-minus';
        break;
      case 'question-sign':
        name = 'question-circle';
        break;
      case 'remove-circle':
        name = 'times-circle-o';
        break;
      case 'new-window':
        name = 'window-restore';
        break;
    }
  }

  return spinning ? `${iconset} ${iconset}-${name} ${iconset}-spin` : `${iconset} ${iconset}-${name}`;
};
