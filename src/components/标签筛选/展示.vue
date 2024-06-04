<template>
  <!-- {{ filteredItems }} -->
  {{ tagsGroups }}

  <div id="app">
    <h1>标签筛选示例</h1>
    <TagFilter :tags="tags" v-model:selectedTags="selectedTags" />
    <ItemList :items="filteredItems" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import TagFilter from "./TagFilter.vue";
import ItemList from "./ItemList.vue";

// 模拟数据
const tags = ref(["Tag1", "Tag2", "Tag3"]);
const items = ref([
  { id: 1, name: "Item 1", tags: ["Tag1", "Tag2"] },
  { id: 2, name: "Item 2", tags: ["Tag2"] },
  { id: 3, name: "Item 3", tags: ["Tag1", "Tag3"] },
]);
const tagsGroups = ref([]);

onMounted(() => {
  fetchmetadata();
});
// 获取eagle元数据
async function fetchmetadata() {
  try {
    const response = await axios.get(
      "https://uiweb.oss-cn-chengdu.aliyuncs.com/images/jietu.library/metadata.json"
    );
    // 将解构出来的tagsGroups赋值给响应式引用tagsGroups
    tagsGroups.value = response.data.tagsGroups;
  } catch (error) {
    console.error("Error fetching images info:", error);
  }
}

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
