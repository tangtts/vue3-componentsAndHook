import { PropType, ExtractPropTypes } from "vue";

export const checkboxProps = {
  disabled: Boolean,
  modelValue: {
    type: [String, Number, Boolean] as PropType<String | Number | Boolean>,
    required: true,
  },
  label: String,
  indeterminate: Boolean,
} as const;

export const checkEmit = {
  "update:modelValue": (val: String | Number | Boolean) => true,
  change: (val: Boolean) => true,
};

export type checkboxPropsTypes = Partial<
  ExtractPropTypes<typeof checkboxProps>
>;
