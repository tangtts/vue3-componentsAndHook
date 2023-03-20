function containsProp(obj: object, ...props: string[]) {
  return props.some(k => k in obj);
}
export default containsProp;
