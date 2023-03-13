import { ExtractPropTypes, PropType } from "vue";

export const inputProps = {
  type: {
    type: String as PropType<"text" | "password">,
    default: "text",
  },
  modelValue: {
    type: [String, Number, Boolean] as PropType<String | Number | Boolean>,
    default: "",
  },
  size: {
    type: String as PropType<"large" | "default" | "small">,
    default: "default",
  },
} as const;

export const inputEmits = {
  "update:modelValue": (val: String | Number | Boolean) => true,
  change: (val: Boolean) => true,
};

export type inputPropsTypes = Partial<ExtractPropTypes<typeof inputProps>>;
