<template>
  <div style="height: 200px; overflow: auto">
    <!-- 选中的标签{{ selectedTags }} <br /> -->
    选中的品牌{{ selectedBrand }}<br />
    <!-- folder:{{ folder }}<br /> -->
    filteredImages:{{ filteredImages }}<br />
  </div>

  <!-- <tagFilter :tags="tags" v-model:selectedTags="selectedTags" /> -->
  <brandFilter :folder="folder" v-model:selectedBrand="selectedBrand" />
  <waterfall :filteredImages="filteredImages" />
</template>

<script setup>
import { ref, computed, onMounted, onBeforeMount } from "vue";
import axios from "axios";
import waterfall from "./瀑布流.vue";
// import waterfall from "../waterfall/5-图片详情.vue";
import tagFilter from "./TagFilter.vue";
import brandFilter from "./brandFilter.vue";

const images = ref([]);
const selectedTags = ref([]);
const tagsGroupsAll = ref([]); // 用以储存所有标签分组信息（包括未使用标签）
const folder = ref([]);
const metadata = ref(null);
const selectedBrand = ref([]); // 用于存储用户选择的品牌
//----------------------------------------------------------
// 获取eagle元数据中的标签分组信息
async function fetchmetadata() {
  try {
    const response = await axios.get(
      "https://uiweb.oss-cn-chengdu.aliyuncs.com/images/jietu.library/metadata.json"
    );
    // 将解构出来的tagsGroups赋值给响应式引用tagsGroupsAll
    metadata.value = response.data;
    tagsGroupsAll.value = response.data.tagsGroups;
    folder.value = response.data.folders;
  } catch (error) {
    console.error("Error fetching images info:", error);
  }
}

//----------------------------------------------------------
// 获取eagle分组中的图片信息
async function fetchImagesInfo() {
  try {
    const response = await axios.get(
      "https://uiweb.oss-cn-chengdu.aliyuncs.com/images/imagesInfo.json"
    );
    images.value = response.data;
  } catch (error) {
    console.error("Error fetching images info:", error);
  }
}

//----------------------------------------------------------
// 计算属性，返回过滤后的项目
const filteredImages = computed(() => {
  if (selectedBrand.value.length === 0) {
    return images.value;
  }
  // filter方法，用户查找数组中符合条件的对象，https://zh.javascript.info/array-methods#filter
  return images.value.filter((image) => {
    // 检查图片的 folders 数组中是否包含任意一个 selectedBrand 的 id
    return image.folders.some((folderId) =>
      selectedBrand.value.includes(folderId)
    );
  });
});
//----------------------------------------------------------

//----------------------------------------------------------
onBeforeMount(() => {
  fetchmetadata();
  fetchImagesInfo();
});
</script>

<style scoped></style>
