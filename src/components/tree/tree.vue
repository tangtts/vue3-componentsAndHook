<template>
  <div>
    <TreeNodeItem
     v-for="node in flattenTree" :key="node.key"
     :node="node"
     :isExpanded="isExpanded(node)"
     @toggle="toggleExtend"
     :loadingKeys="loadingKeysRef"
     :selectKeys="selectKeysRef"
     @select="handleSelect"
     >
      
    </TreeNodeItem>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, computed, reactive, watch, provide, useSlots } from "vue";
import { TreeProps, TreeOption, TreeNode, Key, treeEmits, injectKey } from "./types";
import TreeNodeItem from "./treeNode.vue"
const props = defineProps(TreeProps);
const tree = ref<TreeNode[]>([])

let treeOptions = {
  getChildren(node: TreeNode): TreeNode[] {
    return node[props.childrenField] as TreeNode[]
  },
  getKey(node: TreeNode): string {
    return node[props.keyField] as string
  },
  getLabel(node:TreeNode): string {
    return node[props.labelField]
  }
}
function createTree(data: TreeOption[],parent?:TreeNode): TreeNode[] {

  function traversal(data, parent: TreeNode | null = null) {
    return data.map((node) => {
      const children = treeOptions.getChildren(node || [])
      const treeNode: TreeNode = {
        key: treeOptions.getKey(node),
        label: treeOptions.getLabel(node),
        children: [],
        rowNode: node,
        isLeaf: node.isLeaf ?? children.length,
        level: parent ? parent.level + 1 : 0
      }
      if (children.length > 0) {
        treeNode.children = traversal(node.children,treeNode)
      }
      return treeNode
    })
  }
  const result: TreeNode[] = traversal(data,parent)
  return result
}

watch(() => props.data, (data: TreeOption[]) => {
  tree.value = createTree(data)
}, {
  immediate: true
});

 provide(injectKey,{
  slots:useSlots()
});

const emits = defineEmits(treeEmits)
const selectKeysRef = ref<Key[]>([])
function handleSelect(node:TreeNode){
  // 来一个新的数组
  let keys = Array.from(selectKeysRef.value);
  if(!props.selectable)return;
  if(props.multiple){
    let index  = keys.findIndex(key=>key == node.key)
    if(index>-1){
     keys.splice(index,1)
    }else {
      keys.push(node.key)
    }
  }else {
    if(keys.includes(node.key)){
      keys = []
    }else {
      keys = [node.key]
    }
  }
  emits("update:selectKeys",keys)
}



watch(() => props.selectKeys, (data: Key[]) => {
  selectKeysRef.value = data;
}, {
  immediate: true
});




const expandKeysSet = ref(new Set(props.defaultExpandKeys));

const isExpanded = function(node:TreeNode){
  return expandKeysSet.value.has(node.key)
}

function collapse(node:TreeNode){
  expandKeysSet.value.delete(node.key)
}

const loadingKeysRef = ref(new Set<Key>())
function triggerLoading(node:TreeNode){
 
  if(!node.isLeaf){
    const  loadingKeys =  loadingKeysRef.value;
    if(!loadingKeys.has(node.key)){
      loadingKeys.add(node.key)
      const onLoad = props.onLoad;
      if(onLoad){
         onLoad(node.rowNode).then(children=>{
          node.rowNode.children  = children;
          node.children = createTree(children,node);
          loadingKeys.delete(node.key)
        });
      }
    }
  }
}

function expand(node:TreeNode){
  expandKeysSet.value.add(node.key)
  triggerLoading(node)
}


function toggleExtend(node:TreeNode){
  if(expandKeysSet.value.has(node.key) && !loadingKeysRef.value.has(node.key)){
    collapse(node)
  }else {
    expand(node)
  }
}



const flattenTree = computed(() => {
  let expandKeys = expandKeysSet.value;
  let flattenNodes: TreeNode[] = [];
  let nodes = tree.value || [];
  let stack: TreeNode[] = [];

  for (let i = nodes.length - 1; i >= 0; i--) {
    stack.push(nodes[i])
  }

  while (stack.length) {
    let node = stack.pop();
    if (!node) continue;
    flattenNodes.push(node);
    if (expandKeys.has(node.key)) {
      const children = node.children;
      for (let i = children.length - 1; i >= 0; i--) {
        stack.push(children[i])
      }
    }
  }
  return flattenNodes
})
</script>

<style lang="scss" scoped></style>
