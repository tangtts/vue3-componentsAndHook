import { PropType, ExtractPropTypes } from "vue";

export interface IOption {
  label: string;
  value: string | number;
}

export const selectProps = {
  options: {
    type: Array as PropType<IOption[]>,
    default: () => [],
  },
  modelValue: {
    type: [String, Number, Boolean] as PropType<String | Number | Boolean>,
    required: true,
  },
} as const;

export const checkEmit = {
  "update:modelValue": (val: String | Number | Boolean) => true,
  change: (val: Boolean) => true,
};

export type selectPropsTypes = Partial<ExtractPropTypes<typeof selectProps>>;
