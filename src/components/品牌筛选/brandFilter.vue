<template>
  <!-- 品牌展示标签 -->
  <div class="sift">
    <button
      v-for="(item, index) in folder"
      :class="{ active: selectedBrand.includes(item.id) }"
      :key="item.id"
      @click="toggleTag(item)"
    >
      {{ item.name }}
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
// 定义属性
const props = defineProps({
  folder: Array,
  selectedBrand: Array,
});

// 定义事件
const emit = defineEmits(["update:selectedBrand"]);
// ----------------------------------------------------------
// 切换标签
// const toggleTag = (item) => {
//   // 如果当前标签在已选标签中，则从已选标签中移除，否则添加到已选标签中
//   const newselectedBrand = props.selectedBrand.includes(item.id)
//     ? props.selectedBrand.filter((t) => t !== item.id)
//     : [...props.selectedBrand, item.id];
//   // 更新已选标签
//   emit("update:selectedBrand", newselectedBrand);
// };
//----------------------------------------------------------
// 递归获取所有子级的id
const getAllChildrenIds = (item) => {
  let ids = [item.id]; // 包含当前项的id
  if (item.children && item.children.length > 0) {
    item.children.forEach((child) => {
      ids = ids.concat(getAllChildrenIds(child)); // 合并子级的id
    });
  }
  return ids;
};

// 切换标签
const toggleTag = (item) => {
  // 获取所有子级的id
  const allChildrenIds = getAllChildrenIds(item);

  // 判断是添加还是移除
  const isAdding = !props.selectedBrand.includes(item.id);

  // 根据当前状态添加或移除所有子级的id
  const newselectedBrand = isAdding
    ? [...new Set([...props.selectedBrand, ...allChildrenIds])] // 使用Set去重
    : props.selectedBrand.filter((id) => !allChildrenIds.includes(id));

  // 更新已选标签
  emit("update:selectedBrand", newselectedBrand);
};
</script>

<style scoped>
.sift {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 10px;
  padding: 0.5em 1em;
}
button {
  border: none;
  color: #333;
  height: 32px;
  text-align: center;
  font-size: 16px;
  background-color: #f6f6f6;
  cursor: pointer;

  border-radius: 5px;
}
button.active {
  background-color: #42b983;
  color: white;
}
</style>
