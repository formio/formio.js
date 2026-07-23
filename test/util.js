export function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function waitFor(condition, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    const checkCondition = () => {
      if (condition()) {
        resolve();
      } else if (Date.now() - startTime > timeout) {
        reject(new Error(`Condition not met within ${timeout}ms`));
      } else {
        setTimeout(checkCondition, 10);
      }
    };

    checkCondition();
  });
}
