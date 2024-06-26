<template>
  <div>
    <!-- 品牌展示标签 -->
    <div class="sift">
      <button
        class="tags"
        :class="{ active: selectedTags.includes(tags) }"
        v-for="(folderName, index) in folderName"
        :key="index"
        @click="toggleTag(tags)"
      >
        {{ folderName }}
      </button>
    </div>

    <!-- 分组展示标签 -->
    <div class="sift">
      <div>
        <div
          class="tags"
          v-for="(tagGroup, index) in tagsGroupsAll"
          :key="index"
        >
          <p>{{ tagGroup.name }}</p>
          <button
            v-for="tags in tagGroup.tags"
            :key="tags"
            :class="{ active: selectedTags.includes(tags) }"
            class="button"
            @click="toggleTag(tags)"
          >
            {{ tags }}
          </button>
        </div>
      </div>

      <button class="button quanbu" @click="clearFilter">清除筛选</button>
    </div>

    <div class="masonry">
      <div
        v-for="image in filteredImages"
        :key="image.folderName"
        class="image-item"
        @click="showImageDetails(image)"
      >
        <img
          :src="image.imageUrlThumbnail || image.imageUrl"
          :alt="image.folderName"
        />
      </div>
    </div>

    <div v-if="selectedImage" class="overlay" @click.self="closeImageDetails">
      <div class="overlay-content">
        <button class="close-btn" @click="closeImageDetails">X</button>
        <img
          :src="selectedImage.imageUrl || image.imageUrlThumbnail"
          :alt="selectedImage.folderName"
          class="overlay-image"
        />
        <div class="image-info">
          <div class="list-container">
            <div>名称:</div>
            <div>{{ selectedImage.name }}</div>
          </div>
          <div class="list-container">
            <div>修改时间:</div>
            <div>{{ formatTime(selectedImage.modificationTime) }}</div>
          </div>
          <div
            class="list-container"
            v-if="selectedImage.tags && selectedImage.tags.length > 0"
          >
            <div>标签:</div>
            <div>{{ selectedImage.tags.join(", ") }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeMount } from "vue";
import axios from "axios";

const images = ref([]);
const selectedImage = ref(null);
const selectedTags = ref([]); // 用于存储按组选择的标签

onBeforeMount(() => {
  fetchImagesInfo();
});

// 获取eagle分组中的图片信息
async function fetchImagesInfo() {
  try {
    // const response = await axios.get("/src/assets/imagesInfo.json");
    const response = await axios.get(
      "https://uiweb.oss-cn-chengdu.aliyuncs.com/images/imagesInfo.json"
    );
    images.value = response.data;
  } catch (error) {
    console.error("Error fetching images info:", error);
  }
}

// 新建响应式引用tagsGroupsAll用以储存所有标签分组信息（包括未使用标签）
const tagsGroupsAll = ref([]);

const folderName = ref(null);

const metadata = ref(null);
onMounted(() => {
  fetchmetadata();
});
// 获取eagle元数据中的标签分组信息
async function fetchmetadata() {
  try {
    const response = await axios.get(
      "https://uiweb.oss-cn-chengdu.aliyuncs.com/images/jietu.library/metadata.json"
    );
    // 将解构出来的tagsGroups赋值给响应式引用tagsGroupsAll
    metadata.value = response.data;
    tagsGroupsAll.value = response.data.tagsGroups;
    folderName.value = response.data.folders.map((folder) => folder.name);
  } catch (error) {
    console.error("Error fetching images info:", error);
  }
}

// 计算属性，返回过滤后的项目
const filteredImages = computed(() => {
  if (selectedTags.value.length === 0) {
    return images.value;
  }
  // filter方法，用户查找数组中符合条件的对象，https://zh.javascript.info/array-methods#filter
  return images.value.filter(
    (image) =>
      selectedTags.value.every((tag) => image.tags && image.tags.includes(tag)) //这意味着即使 image.tags 不存在，image.tags.includes(tag) 执行将导致运行时错误，因为尝试在一个 undefined 或 null 上调用 .includes() 方法是不允许的。
  );
});

// 切换标签
const toggleTag = (tag) => {
  // 如果当前标签在已选标签中，则从已选标签中移除，否则添加到已选标签中
  let newSelectedTags = selectedTags.value.includes(tag)
    ? selectedTags.value.filter((t) => t !== tag)
    : [...selectedTags.value, tag];
  // 更新已选标签
  selectedTags.value = newSelectedTags;
};

// 清除筛选
function clearFilter() {
  selectedTags.value = [];
}

function showImageDetails(image) {
  selectedImage.value = image;
  // 隐藏主滚动条
  document.body.style.overflow = "hidden";
}

function closeImageDetails() {
  selectedImage.value = null;
  // 恢复主滚动条
  document.body.style.overflow = "";
}

// 格式化时间戳为日期和时间
function formatTime(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString();
}
</script>

<style scoped>
.masonry {
  column-count: auto;
  column-width: 12em;
  column-gap: 1.5em;
  padding: 1.5em;
}

.image-item {
  break-inside: avoid;
  margin-bottom: 1em;
  cursor: pointer;
}

.image-item img {
  width: 100%;
  display: block;
  border-radius: 5px;
}

.image-item {
  break-inside: avoid;
  margin-bottom: 1em;
  cursor: pointer;

  box-shadow: 0 0.25em 3.125em #00000014;
}

.image-item img {
  width: 100%;
  display: block;
  border-radius: 5px;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow-y: auto;
}

.overlay-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  max-width: 90%;
  position: relative;
  display: flex;
  margin: 32px auto 32px auto;
  justify-content: center;
  border-radius: 20px;
  height: auto;
  /* 自动根据内容调整高度 */
  width: max-content;
  /* 自动根据内容调整宽度 */
}

.overlay-image {
  width: 640px;
  height: auto;
  /* Height will adjust automatically */
  object-fit: contain;
  /* 确保图片不会变形 */
  border-radius: 20px;
  cursor: zoom-in;
}

.image-info {
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 32px;
  margin-top: 16px;
}

.image-info .list-container {
  display: flex;
  height: 24px;
  margin: 4px 0;
  align-items: center;
}

.sift {
  display: flex;
  justify-content: space-between;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  padding: 4px 16px;
}
.button {
  background-color: #f6f6f6;
  border: none;
  color: #333;
  /* padding: 4px 16px; */
  height: 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
}
button.active {
  background-color: #42b983;
  color: white;
}
.quanbu {
  height: 32px;
  margin: 4px 16px;
}
</style>
