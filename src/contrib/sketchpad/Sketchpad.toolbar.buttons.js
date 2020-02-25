export default {
  modes: [
    {
      title: 'Pencil',
      key: 'pencil',
      icon: 'fa fa-pencil'
    },
    {
      title: 'Line',
      key: 'line',
      icon: 'fa fa-minus'
    },
    {
      title: 'Circle',
      key: 'circle',
      icon: 'fa fa-circle',
      input: {
        type: 'number',
        class: 'formio-sketchpad-radius-input',
      }
    },
    {
      title: 'Rectangle',
      key: 'rectangle',
      icon: 'fa fa-square-o'
    },
    {
      title: 'Zoom In',
      key: 'zoomIn',
      icon: 'fa fa-search-plus'
    },
    {
      title: 'Zoom Out',
      key: 'zoomOut',
      icon: 'fa fa-search-minus'
    },
    {
      title: 'Drag Zoomed Image',
      key: 'dragImage',
      icon: 'fa fa-hand-paper-o'
    }
  ],

  styles: [
    {
      title: 'Stroke Color',
      key: 'stroke',
      icon: 'fa fa-square-o'
    },
    {
      title: 'Fill Color',
      key: 'fill',
      icon: 'fa fa-square'
    },
    {
      title: 'Line Width',
      key: 'width',
      icon: 'fa fa-minus',
      input: {
        type: 'number',
        class: 'formio-sketchpad-linewidth-input'
      }
    }
  ],

  actions: [
    {
      title: 'Undo',
      key: 'undo',
      icon: 'fa fa-undo'
    },
    {
      title: 'Redo',
      key: 'redo',
      icon: 'fa fa-repeat'
    },
    {
      title: 'Reset Zoom',
      key: 'resetZoom',
      icon: 'fa fa-search'
    },
    {
      title: 'Clear All',
      key: 'clearAll',
      icon: 'fa fa-ban'
    }
  ]
};
