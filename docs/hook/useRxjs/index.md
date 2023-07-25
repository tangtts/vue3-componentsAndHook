# useRxjs
写了一篇 [**👉详细的介绍**](https://juejin.cn/post/7258555175495958584)，就不过多赘述了

# Docs


  <ClientOnly>
    <useRxjs></useRxjs>
  </ClientOnly>

  <script setup>
  import useRxjs from "../../../src/components/useRxjs/index.vue"
  </script>


::: details 查看更多
举一个简单的例子
```ts
  let subscribe = new Observable(subscribe => {
      subscribe.next(1)
      subscribe.next(2)
      subscribe.next(3)
      subscribe.complate()
  })
  subscribe.subscribe(value =>
    alert(value)
  )
```
我们来看一 `Observable` 是怎么定义的
```ts {4}
class Observable {
  constructor(private readonly subscriber: (o: ObserverType) => void) {}
  subscribe(observerOrNext: ObserverOrNextType) {
    const subscriber = new Subscriber(observerOrNext);
    this.subscriber(subscriber);
    return subscriber;
  }
  pipe(...operation): Observable {
    return pipeFromArray(operation)(this);
  }
}
```
来重点看一下 `Subscriber` 
```ts {7-14,21,28}
class Subscriber {
  isStopped = false;
  destination: ObserverType;
  constructor(observerOrNext: ObserverOrNextType) {
    let observer: ObserverType;

    if (isFunction(observerOrNext)) {
      observer = {
        next: observerOrNext,
        complete: () => {},
      };
    } else {
      observer = observerOrNext;
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
```

::: danger
重点已经标注，本质利用了发布订阅
:::
