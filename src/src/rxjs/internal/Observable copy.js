// import { Subscriber } from "./Subscriber.js";
// import { pipeFromArray } from "./util/pipe.js";

isFunction = val => {
  return typeof val == "function";
};

class Observable {
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
    let subscriber = null;
    // 构造出一个对象出来
    if (isFunction(observerOrNext)) {
      subscriber = {
        next: observerOrNext,
      };
    } else {
      subscriber = observerOrNext;
    }

    subscriber.complete ??= () => {};

    this._subscribe(subscriber);

    return subscriber;
  }
  // pipe(...operations) {
  //   //把老的Observable传递给operation的source参数
  //   //return operation(this);
  //   return pipeFromArray(operations)(this);
  // }
}
const observable = new Observable(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.complete();
});

observable.subscribe(value => console.log("next value:", value));

observable.subscribe({
  next: value => console.log("next value:", value),
  complete: () => {
    console.log("complete");
  },
});
