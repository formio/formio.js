import { EventEmitter as EventEmitter3 } from 'eventemitter3';
import * as utils from './utils/utils';
export default class EventEmitter extends EventEmitter3 {
  constructor(conf = {}) {
    const { loadLimit = 1000, eventsSafeInterval = 300 } = conf;
    super();

    const overloadHandler = () => {
      console.warn(`There were more than ${loadLimit} events emitted in ${eventsSafeInterval} ms. It might be caused by events' infinite loop`, this.id);
    };

    const dispatch = utils.observeOverload(overloadHandler, {
      limit: loadLimit,
      delay: eventsSafeInterval
    });

    this.emit = (...args) => {
      super.emit(...args);
      super.emit('any', ...args);

      dispatch();
    };
  }

  onAny = (fn) => {
    this.on('any', fn);
  }

  offAny = (fn) => {
    this.off('any', fn);
  }
}
