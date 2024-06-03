<template>
  {{ filteredItems }}
  <div id="app">
    <h1>标签筛选示例</h1>
    <TagFilter :tags="tags" v-model:selectedTags="selectedTags" />
    <ItemList :items="filteredItems" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import TagFilter from "./TagFilter.vue";
import ItemList from "./ItemList.vue";

// 模拟数据
const tags = ref(["Tag1", "Tag2", "Tag3"]);
const items = ref([
  { id: 1, name: "Item 1", tags: ["Tag1", "Tag2"] },
  { id: 2, name: "Item 2", tags: ["Tag2"] },
  { id: 3, name: "Item 3", tags: ["Tag1", "Tag3"] },
]);

const selectedTags = ref([]);

// 计算属性，返回过滤后的项目
const filteredItems = computed(() => {
  if (selectedTags.value.length === 0) {
    return items.value;
  }
  // filter方法，用户查找数组中符合条件的对象，https://zh.javascript.info/array-methods#filter
  return items.value.filter((item) =>
    selectedTags.value.every((tag) => item.tags.includes(tag))
  );
});
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
}
</style>
