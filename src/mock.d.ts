declare module "mockjs" {
  export interface mockOption {
    name: "@name";
    county: "@county(true)";
    email: "@email";
    id: "@increment(0)";
    datetime: "@datetime";
  }
  export function mock<T extends Partial<mockOption>>(args: T): T;
}
