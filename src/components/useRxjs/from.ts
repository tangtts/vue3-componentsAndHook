import { Observable } from "./rxjs/Observable";

export function from(arrayLike: ArrayLike<any>) {
  return new Observable(subscriber => {
    for (let i = 0; i < arrayLike.length; i++) {
      subscriber.next(arrayLike[i]);
    }
    subscriber.complete();
  });
}
