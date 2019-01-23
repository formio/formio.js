import { EventEmitter2 } from 'eventemitter2';
import * as utils from './utils/utils';

let id = 0;

export default class EventEmitter extends EventEmitter2 {
  constructor(conf = {}) {
    const { loadLimit = 50, eventsSafeInterval = 300, pause = 500, ...ee2conf } = conf;
    super(ee2conf);

    conf.log && console.log(`loadLimit ${loadLimit}`);

    const [isPaused, togglePause] = utils.withSwitch(false, true);

    const overloadHandler = () => {
      console.warn('Infinite loop detected', this.id, pause);
      togglePause();
      setTimeout(togglePause, pause);
    };

    this.id = id++;

    const dispatch = utils.observeOverload(overloadHandler, {
      limit: loadLimit,
      delay: eventsSafeInterval
    });

    this.emit = (...args) => {
      if (isPaused()) {
        return;
      }

      super.emit(...args);
      dispatch();
    };
  }
}
