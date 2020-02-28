  export default function(Two) {
    return {
      pencil: {
        state: {
          mode: 'pencil'
        },
        eventStart: (coordinate) => {
          this.points = [coordinate];
          this.prev = coordinate;
          this.curve = this.two.makeCurve([
            new Two.Vector(this.prev.x, this.prev.y),
            new Two.Vector(coordinate.x, coordinate.y + 1)
          ], true);
          this.curve.noFill().stroke = this.state.stroke;
          this.curve.linewidth = this.state.linewidth;
          this.curve.vertices.forEach((v) => v.addSelf(this.curve.translation));
          this.curve.translation.clear();
          this.two.update();
          this.layers.push(this.curve);
        },
        drag: (coordinate) => {
          this.points.push(coordinate);
          this.curve.vertices.push(new Two.Vector(coordinate.x, coordinate.y));
          this.two.update();
          this.prev = coordinate;
        },
        eventEnd: () => {
          const value = this.dataValue.slice();
          value.push(Object.assign({}, this.state, { points: this.points }));
          this.dataValue = value;
          this.triggerChange();
        },
        draw: (state) => {
          const layer = this.two.makeCurve(state.points.map(point => new Two.Vector(point.x, point.y)), true);
          layer.noFill().stroke = state.stroke;
          layer.linewidth = state.linewidth;
          layer.vertices.forEach((v) => v.addSelf(layer.translation));
          layer.translation.clear();
          return layer;
        }
      },
      line: {
        state: {
          mode: 'line'
        },
        eventStart: (coordinate) => {
          this.center = coordinate;
          this.line = this.two.makeLine(
            coordinate.x,
            coordinate.y,
            coordinate.x,
            coordinate.y
          );
          this.line.fill = this.state.fill;
          this.line.stroke = this.state.stroke;
          this.line.linewidth = this.state.linewidth;
          this.two.update();
          this.layers.push(this.line);
          const index = this.layers.length - 1;
        },
        drag: (coordinate) => {
          this.line.vertices[1].x = coordinate.x;
          this.line.vertices[1].y = coordinate.y;
          this.two.update();
        },
        eventEnd: () => {
           const value = this.dataValue.slice();
          const vertices = this.line.vertices.map(vertice => {
            return {
              x: vertice.x,
              y: vertice.y
            };
          });
          value.push(Object.assign({}, this.state, { vertices: vertices }));
          this.dataValue = value;
          this.triggerChange();
        },
        draw: (state) => {
          const layer = this.two.makeLine(
            state.vertices[0].x,
            state.vertices[0].y,
            state.vertices[1].x,
            state.vertices[1].y
          );
          layer.fill = state.fill;
          layer.stroke = state.stroke;
          layer.linewidth = state.linewidth;
          return layer;
        },
      },
      circle: {
        state: {
          mode: 'circle'
        },
        eventStart: (coordinate) => {
          this.center = coordinate;
          const layer = this.two.makeCircle(coordinate.x, coordinate.y, this.state.circleSize);
          layer.fill = this.state.fill;
          layer.stroke = this.state.stroke;
          layer.linewidth = this.state.linewidth;
          this.two.update();
          this.layers.push(layer);
        },
        drag: () => {},
        eventEnd: () => {
          const value = this.dataValue.slice();
          value.push(Object.assign({}, this.state, { center: this.center }));
          this.dataValue = value;
          this.triggerChange();
        },
        draw: (state) => {
          const layer = this.two.makeCircle(state.center.x, state.center.y, state.circleSize);
          layer.fill = state.fill;
          layer.stroke = state.stroke;
          layer.linewidth = state.linewidth;
          return layer;
        },
      },
      rectangle: {
        cursor: {
          hover: 'crosshair'
        },
        state: {
          mode: 'rectangle'
        },
        eventStart: (coordinate) => {
          this.dragStartPoint = coordinate;
        },
        drag: (coordinate) => {
          this.dragEndPoint = coordinate;
          if (this.rectangle) {
            this.rectangle.remove();
          }
          this.width = Math.abs(this.dragEndPoint.x - this.dragStartPoint.x);
          this.height = Math.abs(this.dragEndPoint.y - this.dragStartPoint.y);
          this.center = {
            x: Math.min(this.dragStartPoint.x, this.dragEndPoint.x) + this.width / 2,
            y: Math.min(this.dragStartPoint.y, this.dragEndPoint.y) + this.height / 2
          };
          this.rectangle = this.two.makeRectangle(this.center.x, this.center.y, this.width, this.height);
          this.rectangle.fill = this.state.fill;
          this.rectangle.stroke = this.state.stroke;
          this.rectangle.linewidth = this.state.linewidth;
          this.two.update();
          this.layers.push(this.rectangle);
        },
        eventEnd: () => {
          const value = this.dataValue.slice();
          delete this.rectangle;
          const rectangleState = {
            center: this.center,
            width: this.width,
            height: this.height
          };
          value.push(Object.assign({}, this.state, rectangleState));
          this.dataValue = value;
          this.triggerChange();
        },
        draw: (state) => {
          const layer = this.two.makeRectangle(state.center.x, state.center.y, state.width, state.height);
          layer.fill = state.fill;
          layer.stroke = state.stroke;
          layer.linewidth = state.linewidth;
          return layer;
        },
      },
      zoomIn: {
        cursor: {
          hover: 'zoom-in'
        },
        state: {
          mode: 'zoomIn'
        },
        eventStart: (coordinate) => this.zoom(coordinate, this.zoomInfo.multiplier)
      },
      zoomOut: {
        cursor: {
          hover: 'zoom-out'
        },
        state: {
          mode: 'zoomOut'
        },
        eventStart: (coordinate) => this.zoom(coordinate, 1 / this.zoomInfo.multiplier)
      },
      dragImage: {
        cursor: {
          hover: 'grab',
          clicked: 'grabbing'
        },
        state: {
          mode: 'dragImage'
        },
        eventStart: (coordinate) => this.dragStartPoint = coordinate,
        drag: (coordinate) => {
          if (!this.dragLastPoint) {
            this.dragLastPoint = this.dragStartPoint;
          }
          const offset = {
            x: Math.round(coordinate.x - this.dragStartPoint.x),
            y: Math.round(coordinate.y - this.dragStartPoint.y)
          };
          if (offset.x !== 0 || offset.y !== 0) {
            this.dragImage(offset);
            this.dragLastPoint = coordinate;
          }
        }
      }
    };
  }
