# 一个树形组件

思路来源 [https://www.naiveui.com/zh-CN/os-theme/components/tree]

1.  由于可以自定义`lable`,`key` 值，所以第一步需要函数`createTree`格式化代码
2.  格式化后的代码增加属性`level`,表明层级，通过计算属性`flattenTree`获得一个拍平后的数据
3.  遍历`flattenTree`,把遍历后的数据`node` 传递给下一层级，作用域插槽
4.  虚拟滚动 / 懒加载等 其余次要逻辑 都是基于此

# 基础用法

<myTree></myTree>

<script setup>
  import myTree from "../../../src/components/tree/index.vue" 
</script>

# 属性

|        属性名        |       说明       |   类型   | 可选值 | 默认值 |
| :------------------: | :--------------: | :------: | :----: | :----: |
|         data         |     初始数据     |  Array   |   --   |   --   |
|      selectable      |  是否显示复选框  | boolean  |   --   | false  |
| default-checked-keys | 默认选中的复选框 |  Array   |   --   |   []   |
|  v-model:selectKeys  |    默认选中行    |  Array   |   --   |   []   |
|       on-load        |      懒加载      | Function |   --   |  noop  |
# 事件
|        事件名        |     说明     |            参数             |
| :------------------: | :----------: | :-------------------------: |
| @update:checked-keys | 选择的复选框 | 选择的节点key数组，是否选中 |


<details>

<summary>展开查看</summary>

```vue
<template>
  <div class="m-20 border">
    <Tree
      :data="data"
      v-model:selectKeys="model"
      selectable
      multiple
      checkable
      cascade
      :default-checked-keys="defaultCheckedKeys"
      :on-load="handleLoad"
      @update:checked-keys="updateCheckedKeys"
    >
      <!--虚拟加载 :on-load="handleLoad" -->
      <template #default="{ node }">
        {{ node.label }}
      </template>
    </Tree>
  </div>
</template>
<script lang="ts" setup>
import Tree from "./tree.vue";
import { onMounted, ref, computed, reactive, watch } from "vue";
import { Key, TreeOption, TreeNode } from "./types";
// vitepress 不可以使用
// defineOptions({
//   name: "myTree",
// });

const defaultCheckedKeys = ref<Key[]>(["40"]);
const updateCheckedKeys = (node, val) => {
  defaultCheckedKeys.value = val;
};
const model = ref<Key[]>(["40", "4130"]);

// 懒加载
function handleLoad(node: TreeOption) {
  return new Promise<TreeOption[]>(resolve => {
    setTimeout(() => {
      resolve([
        {
          key: node.key + nextLabel(node.label) + Math.random(),
          label: nextLabel(),
          children: [],
          isLeaf: false,
        },
      ]);
    }, 1000);
  });
}

const data = createData();

function createData(level = 4, baseKey = ""): TreeOption[] {
  if (!level) return [];
  return Array.from({ length: level }, (_, index) => {
    const key = "" + baseKey + level + index;
    const label = createLabel(level);
    return {
      label,
      key,
      children: createData(level - 1, key),
    };
  });
}

function createLabel(level: number): string {
  if (level === 4) return "道生一";
  if (level === 3) return "一生二";
  if (level === 2) return "二生三";
  if (level === 1) return "三生万物";
  return "";
}

function nextLabel(currentLabel?: Key): string {
  if (!currentLabel) return "虚拟道生一";
  if (currentLabel === "道生一") return "一生二";
  if (currentLabel === "一生二") return "二生三";
  if (currentLabel === "二生三") {
    return "三生万物";
  }
  if (currentLabel === "三生万物") {
    return "Out of Tao, One is born";
  }
  return "";
}
</script>
```

</details>

<details >
<summary>核心逻辑</summary>

## 1. 形成一个通用的数据结构

```ts {37-46}
// 初始数据
let data = [
   {
       "userLabelName": "道生一",
       "userKey": "40",
       "children": [
           {
               "userLabelName": "一生二",
               "userKey": "4030",
               "children": []
           }
       ]
   },
   {
       "userLabelName": "道生一",
       "userKey": "41",
       "children": [
           {
               "userLabelName": "一生二",
               "userKey": "4130",
               "children": []
           }
       ]
   }
]
// 用户传递的 lable / key, 是一个 props
let props= {
 label = 'userLabelName',
 key = 'userKey';
}
// 需要格式化为一个固定字段的数据结构，由于是不确定层级结构，使用递归
// 返回一个 固定结构为 { label,key,children } 的数据结构
function createTree(data: TreeOption[], parent?: TreeNode): TreeNode[] {
 function traversal(data, parent: TreeNode | null = null) {
   return data.map(node => {

     const children = treeOptions.getChildren(node || []);
     const treeNode: TreeNode = {
       key: treeOptions.getKey(node),
       label: treeOptions.getLabel(node),
       children: [],
     };
     if (children.length > 0) {
       treeNode.children = traversal(node.children, treeNode);
     }

     return treeNode;
   });
 }
 const result: TreeNode[] = traversal(data, parent);
 return result;
}

let tree  = createTree(data)
// 格式化后的数据
// tree = [
//    {
//        "key": "40",
//        "label": "道生一",
//        "children": [
//            {
//                "key": "4030",
//                "label": "一生二",
//                "children": [],
//            }
//        ],
//    },
//    {
//        "key": "41",
//        "label": "道生一",
//        "children": [
//            {
//                "key": "4130",
//                "label": "一生二",
//                "children": [],
//            }
//        ],
//    }
// ]

// 使用 `treeOptions`
let treeOptions = {
 getKey(node:TreeNode){
   return node[props.key]
 },
 getLabel(node:TreeNode){
   return node[props.label]
 }
}
```

## 2. 扁平化数据结构

```ts{12-26}
//  要默认展开的数据,假设展开40
let expandKeysSet = new Set(["40"]);

const flattenTree = function () {
  let expandKeys = expandKeysSet;
  // 结果集
  let flattenNodes: TreeNode[] = [];
  let nodes = tree || [];
  let stack: TreeNode[] = [];

  // 深度优先
  for (let i = nodes.length - 1; i >= 0; i--) {
    stack.push(nodes[i]);
  }

  while (stack.length) {
    let node = stack.pop();
    if (!node) continue;
    flattenNodes.push(node);
    if (expandKeys.has(node.key)) {
      const children = node.children;
      for (let i = children.length - 1; i >= 0; i--) {
        stack.push(children[i]);
      }
    }
  }
  return flattenNodes;
};

//  flattenNodes = [
//   {
//     key: "40",
//     label: "道生一",
//     children: [{ key: "4030", label: "一生二", children: [] }],
//   },
//   { key: "4030", label: "一生二", children: [] },
//   {
//     key: "41",
//     label: "道生一",
//     children: [{ key: "4130", label: "一生二", children: [] }],
//   },
// ];
```

## 层级问题

> 如果数据都是平行的话，怎么设置层级？需要`level` 属性  
> 还需要设置子元素的选择，改变父元素的状态，需要`parentKey`属性记录当前的父级元素
> 完整的 `createTree` 结构

```ts {11-12}
function createTree(data: TreeOption[], parent?: TreeNode): TreeNode[] {
  function traversal(data, parent: TreeNode | null = null) {
    return data.map(node => {
      const children = treeOptions.getChildren(node || []);
      const treeNode: TreeNode = {
        key: treeOptions.getKey(node),
        label: treeOptions.getLabel(node),
        children: [],
        rowNode: node,
        isLeaf: node.isLeaf ?? children.length,
        level: parent ? parent.level + 1 : 0,
        parentKey: parent?.key,
      };
      if (children.length > 0) {
        treeNode.children = traversal(node.children, treeNode);
      }
      return treeNode;
    });
  }
  const result: TreeNode[] = traversal(data, parent);
  return result;
}
```

## 一些 ts 类型

```ts
interface TreeNode extends Required<TreeOption> {
  level: number;
  rowNode: TreeOption;
  children: TreeNode[];
  isLeaf: boolean;
  parentKey: Key | undefined;
}

interface TreeOption {
  label?: string;
  key?: string;
  children?: TreeOption[];
  isLeaf?: boolean;
  [key: string]: unknown;
}

type R<T> = Required<T>;

type F<T, V> = {
  [K in keyof T as T[K] extends V ? K : never]: K;
};

type C<T extends object, V> = {
  [K in keyof F<T, V>]: K;
}[keyof F<T, V>];

// 从 TreeOption 获取 类型为 string 的 key的联合类型，没什么卵用
type J = C<R<TreeOption>, string>; // 'label' | 'key'
```

</details>
