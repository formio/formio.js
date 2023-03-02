export default (iconset, name, spinning) => {
    let biName = name;
    switch (name) {
        case 'cog':
            biName = 'gear';
            break;
        case 'copy':
            biName = 'back';
            break;
        case 'remove':
            biName = 'trash';
            break;
        case 'font':
            biName = 'type';
            break;
        case 'hashtag':
            biName = 'hash';
            break;
        case 'th-list':
            biName = 'menu-button-wide';
            break;
        case 'dot-circle-o':
            biName = 'ui-radios';
            break;
        case 'plus-square':
            biName = 'ui-checks';
            break;
        case 'phone-square':
            biName = 'phone';
            break;
        case 'home':
            biName = 'house';
            break;
        case 'clock-o':
            biName = 'clock';
            break;
        case 'usd':
            biName = 'currency-dollar';
            break;
        case 'html5':
            biName = 'file-richtext';
            break;
        case 'pencil-square-o':
            biName = 'pencil-square';
            break;
        case 'columns':
            biName = 'layout-three-columns';
            break;
        case 'list-alt':
            biName = 'window';
            break;
        case 'th-large':
            biName = 'grid-fill';
            break;
        case 'folder-o':
            biName = 'folder';
            break;
        case 'square-o':
            biName = 'square';
            break;
        case 'user-secret':
            biName = 'person-fill-slash';
            break;
        case 'folder-open':
            biName = 'folder2-open';
            break;
        case 'th':
            biName = 'grid-3x3-gap-fill';
            break;
        case 'tasks':
            biName = 'view-stacked';
            break;
        case 'indent':
            biName = 'text-indent-left';
            break;
        case 'refresh':
            biName = 'arrow-repeat';
            break;
        case 'files-o':
            biName = 'files';
            break;
        case 'wpforms':
            biName = 'window-stack';
            break;
        case 'cubes':
            biName = 'bricks';
            break;
        case 'plus':
            biName = 'plus-lg';
            break;
        case 'question-sign':
            biName = 'question-circle';
            break;
        case 'remove-circle':
            biName = 'x-circle';
            break;
        case 'new-window':
            biName = 'window-plus';
            break;
        case 'move':
            biName = 'arrows-move';
            break;
        case 'time':
            biName = 'clock';
            break;
    }
    return spinning ? 'spinner-border spinner-border-sm' : `fa fa-${name} bi bi-${biName}`;
};
