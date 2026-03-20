export class Timer {
  callback?: () => {};
  count: number = 0;
  threshold: number = 0;
  constructor(threshold: number, callback?: () => {}) {
    this.threshold = threshold;
    this.callback = callback;
  }
}
