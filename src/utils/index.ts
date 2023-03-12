function assetsElement(ele: HTMLElement | null): asserts ele {
  if (!ele) {
    throw new Error(`${ele} is not exited`);
  }
}

export { assetsElement };
