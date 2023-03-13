import { PropType, ExtractPropTypes } from "vue";

export interface IList {
  id: number | string;
  emoji?: string;
  name: string;
  [key: string]: unknown;
}

export const listProps = {
  modelValue: {
    type: Array as PropType<any[]>,
    required: true,
  },
  size: {
    type: String as PropType<"large" | "default" | "small">,
    default: "default",
  },
  minusOne: {
    type: Function,
    default: () => () => {},
  },
} as const;

export const checkEmit = {
  "update:modelValue": (val: IList[]) => val,
};

export type listPropsTypes = Partial<ExtractPropTypes<typeof listProps>>;
