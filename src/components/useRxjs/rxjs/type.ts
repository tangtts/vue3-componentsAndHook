export type ObserverType = {
  next: Function;
  complete: Function;
};

export type FunctionType = Function;

export type ObserverOrNextType = ObserverType | FunctionType;
