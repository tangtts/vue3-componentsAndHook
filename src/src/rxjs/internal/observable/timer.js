import { asyncScheduler } from "../scheduler/async";
import { Observable } from "../Observable";
import { Scheduler } from "../Scheduler";

export function timer(
  dueTime = 0,
  intervalOrScheduler,
  scheduler = asyncScheduler
) {
  // let intervalDuration = -1;

  // if (intervalOrScheduler != null) {
  //   if (intervalOrScheduler instanceof Scheduler) {
  //     scheduler = intervalOrScheduler;
  //   } else {
  //     intervalDuration = intervalOrScheduler;
  //   }
  // }
  // console.log("🚀 ~ file: timer.js:17 ~ intervalDuration:", intervalDuration);
  return new Observable(subscriber => {
    let n = 0;
    return scheduler.schedule(function () {
      subscriber.next(n++);
      if (dueTime > 0) {
        // this.schedule(undefined, dueTime);
        console.log("🚀 ~ file: timer.js:26 ~ this:", this);
      } else {
        subscriber.complete();
      }
    }, dueTime);

    //setTimeout();
  });
}
