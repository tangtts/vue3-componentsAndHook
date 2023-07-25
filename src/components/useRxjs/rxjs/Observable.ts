import { Subscriber } from "./Subscriber";
import { FunctionType, ObserverOrNextType, ObserverType } from "./type";
import { pipeFromArray } from "./util/pipeFromArray";

export class Observable {
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
