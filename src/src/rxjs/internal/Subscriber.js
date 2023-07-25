
import { isFunction } from './util/isFunction.js';
import { Subscription } from './Subscription.js';
export class Subscriber extends Subscription {
  isStopped = false
  constructor(observerOrNext) {
    super();
    let observer;
    if (isFunction(observerOrNext)) {
      observer = {
        next: observerOrNext
      }
    } else {
      observer = observerOrNext
    }
    //把观察者对象存到了订阅者对象的destination属性上
    this.destination = observer;
  }
  next(value) {
    if (!this.isStopped) {
      this.destination.next(value);
    }
  }
  //如果调用了complete方法，就表示生产完毕了
  complete() {
    if (!this.isStopped) {
      this.isStopped = true;
      this.destination.complete?.();
    }
  }
}