  export default function() {
    return {
      pencil: {
        state: {
          mode: 'pencil'
        },
        eventStart: (coordinate) => { },
        drag: (coordinate) => {
        },
        eventEnd: () => { },
        draw: (state) => { }
      },
      line: {
        state: {
          mode: 'line'
        },
        eventStart: (coordinate) => { },
        drag: (coordinate) => { },
        eventEnd: () => { },
        draw: (state) => { },
      },
      circle: {
        state: {
          mode: 'circle'
        },
        eventStart: (coordinate) => { },
        drag: () => { },
        eventEnd: () => { },
        draw: (state) => { },
      },
      rectangle: {
        cursor: {
          hover: 'crosshair'
        },
        state: {
          mode: 'rectangle'
        },
        eventStart: (coordinate) => { },
        drag: (coordinate) => { },
        eventEnd: () => { },
        draw: (state) => { },
      },
      zoomIn: {
        cursor: {
          hover: 'zoom-in'
        },
        state: {
          mode: 'zoomIn'
        },
        eventStart: (coordinate) => { }
      },
      zoomOut: {
        cursor: {
          hover: 'zoom-out'
        },
        state: {
          mode: 'zoomOut'
        },
        eventStart: (coordinate) => { }
      },
      dragImage: {
        cursor: {
          hover: 'grab',
          clicked: 'grabbing'
        },
        state: {
          mode: 'dragImage'
        },
        eventStart: (coordinate) => { },
        drag: (coordinate) => { }
      }
    };
  }
