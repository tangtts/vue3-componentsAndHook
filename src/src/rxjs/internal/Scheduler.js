export class Scheduler {
  constructor(schedulerActionCtor) {
    this.schedulerActionCtor = schedulerActionCtor;
  }
  /**
   * setTimeout
   * @param {*} work 要执行的工作
   * @param {*} delay 延迟的时间
   * @param {*} state 初始状态
   * @returns
   */
  schedule(work, delay = 0, state) {
    console.log(
      "🚀 ~ file: Scheduler.js:13 ~ Scheduler ~ schedule ~ work:",
      work
    );
    return new this.schedulerActionCtor(work).schedule(state, delay);
  }
}
