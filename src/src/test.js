// import { Observable } from "./rxjs/internal/Observable.js";
// import { of } from "./rxjs/internal/observable/of.js";
// import { from } from "./rxjs/internal/observable/from.js"
import {
  of,
  map,
  filter,
  Observable,
  from,
  interval,
  take,
  Subject,
} from "./rxjs";
const observable = new Observable(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.complete();
});

// observable.subscribe({
//   next: value => console.log("next value:", value),
//   complete: () => {
//     console.log("complete");
//   },
// });
// observable.subscribe(value => console.log("next value:", value));

// let r = [1, 2, 3];
// const subscriber = from(r)
//   .pipe(map(val => val * 2)) // [2,4,6]
//   .pipe(filter(val => val > 3)) //[4,6]
//   .pipe(map(data => data + 1)); //[5,7]

// // subscriber.subscribe(val => console.log(val, "abcd"));
// subscriber.subscribe({
//   next: val => console.log(val),
// });

// import { asyncScheduler } from "./rxjs";
// function task(state) {
//   console.log("state: ", state);
//   if (state < 5) {
//     this.schedule(state + 1, 2000);
//   }
// }
// // 最后一个参数从哪开始
// asyncScheduler.schedule(task, 1000, 2);

interval(1000).subscribe(v => console.log(v));
// interval(500).pipe(take(3)).subscribe(console.log);

// const subject = new Subject();

// subject.subscribe({ next: data => console.log("observerA: ", data) });
// subject.subscribe({ next: data => console.log("observerB: ", data) });

// subject.next(1);
// subject.next(2);

// const arrayLike = of(1, 2, 3);
// arrayLike.subscribe({
//   next: value => console.log(`arrayLike:`, value),
//   complete: () => console.log("arrayLike done"),
// });

// const promiseLike = from(Promise.resolve(4));

// promiseLike.subscribe({
//   next: value => console.log(`promiseLike:`, value),
//   complete: () => console.log("promiseLike done"),
// });
