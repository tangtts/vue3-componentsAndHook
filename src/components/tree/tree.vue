<template>
  <div>
    <VirtualList :remain="8" :size="40" :items="flattenTree">
      <template #default="{ node }">
        <TreeNodeItem
          :node="node"
          :indeterminate="isIndeterminate(node)"
          :checkable="checkable"
          :checked="isChecked(node)"
          :defaultCheckedKeys="checkedKeysRefs"
          :isExpanded="isExpanded(node)"
          :loadingKeys="loadingKeysRef"
          :selectKeys="selectKeysRef"
          @toggle="toggleExtend"
          @check="toggleCheck"
          @select="handleSelect"
        >
        </TreeNodeItem>
      </template>
    </VirtualList>
  </div>
</template>
<script lang="ts" setup>
import {
  onMounted,
  ref,
  computed,
  reactive,
  watch,
  provide,
  useSlots,
} from "vue";
import {
  TreeProps,
  TreeOption,
  TreeNode,
  Key,
  treeEmits,
  injectKey,
} from "./types";
import TreeNodeItem from "./treeNode.vue";
import VirtualList from "./virtualList";
const props = defineProps(TreeProps);
const tree = ref<TreeNode[]>([]);

let treeOptions = {
  getChildren(node: TreeNode): TreeNode[] {
    return node[props.childrenField] as TreeNode[];
  },
  getKey(node: TreeNode): string {
    return node[props.keyField] as string;
  },
  getLabel(node: TreeNode): string {
    return node[props.labelField];
  },
};
const isChecked = function (node) {
  return checkedKeysRefs.value.has(node.key);
};
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

watch(
  () => props.data,
  (data: TreeOption[]) => {
    tree.value = createTree(data);
  },
  {
    immediate: true,
  }
);

provide(injectKey, {
  slots: useSlots(),
});

const emits = defineEmits(treeEmits);
const selectKeysRef = ref<Key[]>([]);

const indeterminateRefs = ref<Set<Key>>(new Set());

function isIndeterminate(node: TreeNode) {
  return indeterminateRefs.value.has(node.key);
}

function toggle(node, checked) {
  let checkKeys = checkedKeysRefs.value;
  if (!node) return checkKeys;
  if (checked) {
    indeterminateRefs.value.delete(node.key);
  }
  checkKeys[checked ? "add" : "delete"](node.key);

  let children = node.children;
  if (!children) return [];
  children.forEach(childNode => {
    toggle(childNode, checked);
  });
  return checkKeys;
}

function updateCheckedKeys(node: TreeNode) {
  let allChecked = true; //儿子节点所有被选中
  let hasChecked = true; // 有没有被选中的儿子

  let parentKey = node.parentKey;
  if (parentKey) {
    let parentNode = findNode(parentKey)!;
    for (let node of parentNode.children) {
      if (checkedKeysRefs.value.has(node.key)) {
        hasChecked = true;
      } else if (indeterminateRefs.value.has(node.key)) {
        allChecked = false;
        hasChecked = true;
      } else {
        allChecked = false;
      }
    }
    if (allChecked) {
      checkedKeysRefs.value.add(parentNode.key);
      indeterminateRefs.value.delete(parentNode.key);
    } else if (hasChecked) {
      checkedKeysRefs.value.delete(parentNode.key);
      indeterminateRefs.value.add(parentNode.key);
    }
    updateCheckedKeys(parentNode);
  }
}

function toggleCheck(node: TreeNode, checked) {
  const checkKeys = toggle(node, checked);
  updateCheckedKeys(node);
  // emits("update:checkedKeys", checked,
  //   Array.from(checkKeys))
}
function findNode(key: Key) {
  let temp: any = {};
  function find(nodes) {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (!node) return;
      if (node.key === key) {
        temp = node;
        return temp;
      } else {
        if (node.children) {
          find(node.children);
        }
      }
    }
  }
  find(flattenTree.value);
  return temp as TreeNode;
}

onMounted(() => {
  checkedKeysRefs.value.forEach(key => {
    toggle(findNode(key), true);
  });
});

function handleSelect(node: TreeNode) {
  // 来一个新的数组
  let keys = Array.from(selectKeysRef.value);
  if (!props.selectable) return;
  if (props.multiple) {
    let index = keys.findIndex(key => key == node.key);
    if (index > -1) {
      keys.splice(index, 1);
    } else {
      keys.push(node.key);
    }
  } else {
    if (keys.includes(node.key)) {
      keys = [];
    } else {
      keys = [node.key];
    }
  }
  emits("update:selectKeys", keys);
}

watch(
  () => props.selectKeys,
  (data: Key[]) => {
    selectKeysRef.value = data;
  },
  {
    immediate: true,
  }
);

const checkedKeysRefs = ref(new Set(props.defaultCheckedKeys));
const expandKeysSet = ref(new Set(props.defaultExpandKeys));

const isExpanded = function (node: TreeNode) {
  return expandKeysSet.value.has(node.key);
};

function collapse(node: TreeNode) {
  expandKeysSet.value.delete(node.key);
}

const loadingKeysRef = ref(new Set<Key>());
function triggerLoading(node: TreeNode) {
  if (!node.isLeaf) {
    const loadingKeys = loadingKeysRef.value;
    if (!loadingKeys.has(node.key)) {
      loadingKeys.add(node.key);
      const onLoad = props.onLoad;
      if (onLoad) {
        onLoad(node.rowNode).then(children => {
          node.rowNode.children = children;
          node.children = createTree(children, node);
          loadingKeys.delete(node.key);
        });
      }
    }
  }
}

function expand(node: TreeNode) {
  expandKeysSet.value.add(node.key);
  if (props.onLoad) {
    triggerLoading(node);
  }
}

function toggleExtend(node: TreeNode) {
  if (
    expandKeysSet.value.has(node.key) &&
    !loadingKeysRef.value.has(node.key)
  ) {
    collapse(node);
  } else {
    expand(node);
  }
}

const flattenTree = computed(() => {
  let expandKeys = expandKeysSet.value;
  let flattenNodes: TreeNode[] = [];
  let nodes = tree.value || [];
  let stack: TreeNode[] = [];

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
});
</script>

<style lang="scss" scoped></style>
