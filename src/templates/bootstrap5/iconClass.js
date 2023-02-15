export default (iconset, name, spinning) => {
    switch (name) {
        case 'question-sign':
            name = 'question-circle';
            break;
        case 'remove-circle':
            name = 'x-circle';
            break;
        case 'new-window':
            name = 'window-plus';
            break;
        case 'move':
            name = 'arrows-move';
            break;
        case 'time':
            name = 'clock';
            break;
    }
    return spinning ? 'spinner-border spinner-border-sm' : `${iconset} ${iconset}-${name}`;
};
