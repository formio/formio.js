export default (iconset, name, spinning, size) => {
  if (iconset === 'fa') {
    switch (name) {
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
      case 'move':
        name = 'arrows';
        break;
      case 'time':
        name = 'clock-o';
        break;
    }
  }

  return `${iconset} ${iconset}-${name}${spinning ? ` ${iconset}-spin` : ''}${size ? ` ${iconset}-${size}` : ''}`;
};
