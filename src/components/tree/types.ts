import { ExtractPropTypes, InjectionKey, provide, SetupContext } from 'vue';
import { PropType } from 'vue';

export type Key = string | number

export interface TreeNode extends Required<TreeOption> {
  level:number
  rowNode:TreeOption,
  children:TreeNode[],
  isLeaf:boolean,
  
}

export interface TreeOption  {
  label?:string
  key?:Key
  children?:TreeOption[],
  isLeaf?:boolean,
  [key:string]:unknown,
}


type G<T> = Required<T> 
type F<T,V> = {
  [K in keyof T as T[K] extends V ? K : never]:
  K
}

type C<T extends object,V> = {
  [K in keyof F<T,V>]:K
}[keyof F<T,V>]

type J =C<G<TreeOption>,string>

export const TreeProps = {
  data:{
   type: Array as PropType<TreeOption[]>,
   required:true
  },
  keyField:{
    type:String,
    default:'key'
  },
  childrenField:{
    type:String,
    default:'children'
  },
  labelField:{
    type:String as PropType<J>,
    default:'label'
  },
  defaultExpandKeys:{
    type:Array as PropType<Key[]>,
    default:()=>[]
  },
  selectKeys:{
    type:Array as PropType<Key[]>,
    default:()=>[]
  },
  selectable:Boolean,
  multiple:Boolean,
  onLoad:Function as PropType<(node:TreeOption)=>Promise< TreeOption[]>>,
} as const;

export const treeEmits = {
  "update:selectKeys":(keys:Key[])=>keys
}

export interface TreeContext {
  slots:SetupContext["slots"]
}
export const injectKey:InjectionKey<TreeContext>= Symbol();

export const treeNodeContentProps = {
  node:{
    type:Object as PropType<TreeNode>,
    required:true
  },
  
}

export type MytreeProps = ExtractPropTypes<typeof TreeProps>