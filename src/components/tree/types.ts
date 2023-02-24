import { ExtractPropTypes } from 'vue';
import { PropType } from 'vue';

type Key = string | number

export interface TreeNode extends Required<TreeOptions> {
  level:number
  rowNode:TreeNode,
  children:TreeNode[]
}

export interface TreeOptions  {
  label?:string
  key?:Key
  children:TreeOptions[],
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

type J =C<G<TreeOptions>,string>

export const TreeProps = {
  data:{
   type: Array as PropType<TreeOptions[]>,
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
  }
} as const;

type L = {
  a:string
}

 const F2 = {
  a:String
};

let f:typeof F2 = {
  a:String
}






export type MytreeProps = ExtractPropTypes<typeof TreeProps>