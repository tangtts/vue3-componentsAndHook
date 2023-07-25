import { Subscriber } from "./Subscriber.js";
import { pipeFromArray } from "./util/pipe.js";
export class Observable {
  constructor(subscribe) {
    if (subscribe) {
      // subscriber => {
      //   subscriber.next(1)
      //   subscriber.next(2)
      //   subscriber.next(3)
      //   subscriber.complete()
      // }
      //保存订阅函数,在创建实例的时候函数并没有执行
      this._subscribe = subscribe;
    }
  }
  //当调用Observable的subscribe方法的时候，就要开始执行_subscribe
  subscribe(observerOrNext) {
    //创建一个订阅者的对象
    // observable.subscribe({
    //   next: value => console.log('next value:', value),
    //   complete: () => {
    //     console.log('complete')
    //   }
    // })

    // observable.subscribe(value => console.log('next value:', value))

    const subscriber = new Subscriber(observerOrNext);
    //订阅函数执行后会返回一个销毁函数
    const teardown = this._subscribe(subscriber);
    //把销毁函数存放到subscriber
    subscriber.add(teardown);
    return subscriber;
  }
  pipe(...operations) {
    // function pipeFromArray(fns) {
    //   if (fns.length === 0) {
    //     return x => x;
    //   }
    //   if (fns.length === 1) {
    //     return fns[0]
    //   }
    //   return function (input) {
    //     //fns = [a,b,c]
    //     //input
    //     return fns.reduce((prev, fn) => fn(prev), input);
    //   }
    // }
    // console.log(pipeFromArray(operations)(this), this);
    //把老的Observable传递给operation的source参数
    //return operation(this);
    return operations[0](this);
    return pipeFromArray(operations)(this);
  }
}
