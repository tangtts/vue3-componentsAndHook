import { Subject } from './rxjs';

const subject = new Subject();
subject.next(1);
subject.subscribe({ next: value => console.log(`observerA`, value) });
subject.next(2)
subject.subscribe({ next: value => console.log(`observerB`, value) });
subject.next(3);


/**
observerA 2
observerA 3
observerB 3
 */
/**
 * Cold Observable
 * 冷的可观察对象
 * 推送值的生产者来自于Observable内部，推送什么值在Observable创建的时候已经固定下来了
 * subscriber和观察对象是一对一的
 * 每个订阅者都会拥有完整的数据
 * 不同的观察者不会共享值
 * 
 * Hot Observable
 * 每当有observer订阅时，会将observer注意到观察者列表中
 */
/* const source = new Observable(subscriber => {
  subscriber.next(Math.random());
  subscriber.next(Math.random());
  subscriber.next(Math.random());
  subscriber.complete()
});
source.subscribe(x => console.log(`subscriberA:${x}`));
source.subscribe(x => console.log(`subscriberB:${x}`));
 */
