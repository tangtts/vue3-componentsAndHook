<template>
  <div>
    <TreeNodeItem
     v-for="node in flattenTree" :key="node.key"
     :node="node"
     :isExpanded="isExpanded(node)"
     @toggle="toggleExtend"
     >
      
    </TreeNodeItem>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, computed, reactive, watch } from "vue";
import { TreeProps, TreeOptions, TreeNode } from "./types";
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
function cteateTree(data: TreeOptions[]): TreeNode[] {

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
  const result: TreeNode[] = traversal(data)
  return result
}

watch(() => props.data, (data: TreeOptions[]) => {
  tree.value = cteateTree(data)
}, {
  immediate: true
})

const expandKeysSet = ref(new Set(props.defaultExpandKeys));

const isExpanded = function(node:TreeNode){
  return expandKeysSet.value.has(node.key)
}

function collapse(node:TreeNode){
  expandKeysSet.value.delete(node.key)
}

function expand(node:TreeNode){
  expandKeysSet.value.add(node.key)
}


function toggleExtend(node:TreeNode){
  if(expandKeysSet.value.has(node.key)){
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
