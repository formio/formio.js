import _ from 'lodash';
import CalendarWidget from './CalendarWidget';
import InputWidget from './InputWidget';

export default class Widgets {
  static widgets = {
    input: InputWidget,
    calendar: CalendarWidget,
  };

  static addWidget(name, widget) {
    Widgets.widgets[name] = widget;
  }

  static addWidgets(widgets) {
    Widgets.widgets = _.merge(Widgets.widgets, widgets);
  }

  static getWidget(name) {
    return Widgets.widgets[name];
  }

  static getWidgets() {
    return Widgets.widgets;
  }
}
