import { PropType, ExtractPropTypes } from "vue";

export const switchProps = {
  modelValue: {
    type: Boolean,
  },
  size: {
    type: String as PropType<"small" | "default" | "large">,
    default: "default",
  },
  activeText: String,
  inactiveText: String,
} as const;

export const checkEmit = {
  "update:modelValue": (val: String | Number | Boolean) => true,
};

export type switchPropsTypes = Partial<ExtractPropTypes<typeof switchProps>>;
