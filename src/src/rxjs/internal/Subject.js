import { Observable } from "./Observable";
export class Subject {
  observers = [];
  subscribe(subscriber) {
    this.observers.push(subscriber);
  }
  next(value) {
    for (const subscriber of this.observers) {
      subscriber.next(value);
    }
  }
  complete() {
    for (const subscriber of this.observers) {
      subscriber.complete();
    }
  }
}
