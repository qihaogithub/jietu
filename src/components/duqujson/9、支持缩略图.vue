<template>
  <div>
    <!-- 分组展示标签 -->
    <div class="sift">
      <div>
        <div
          class="tags"
          v-for="(tags, groupName) in groupedTags"
          :key="groupName"
        >
          <p>{{ groupName }}</p>
          <button
            v-for="tag in tags"
            :key="tag"
            :class="{ active: selectedTags[groupName] === tag }"
            class="button"
            @click="toggleTagSelection(tag, groupName)"
          >
            {{ tag }}
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
const selectedTags = ref({}); // 用于存储按组选择的标签

onBeforeMount(() => {
  fetchImagesInfo();
});

onMounted(() => {
  // 设置 "叫叫" 标签默认选中
  if (tagGroups.品牌.includes("叫叫")) {
    selectedTags.value.品牌 = "叫叫";
  }
});

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

// 标签分组规则
const tagGroups = {
  品牌: [
    "叫叫",
    "火花思维",
    "少年得到",
    "喜马拉雅儿童",
    "洋葱学院",
    "百词斩",
    "多领国",
    "KaDa阅读",
    "ahakid",
    "洪恩分级阅读",
    "作业帮",
    "斑马",
  ],
  机型: ["pad", "手机"],
  其他: [],
};

// 获取唯一标签列表
const uniqueTags = computed(() => {
  const tags = new Set();
  images.value.forEach((image) => {
    if (image.tags) {
      image.tags.forEach((tag) => tags.add(tag));
    }
  });
  return Array.from(tags);
});

// 将标签分组
const groupedTags = computed(() => {
  const groups = {};

  // 初始化分组
  for (const groupName in tagGroups) {
    groups[groupName] = [];
  }

  // 添加标签到相应的分组
  uniqueTags.value.forEach((tag) => {
    let added = false;
    for (const groupName in tagGroups) {
      if (tagGroups[groupName].includes(tag)) {
        groups[groupName].push(tag);
        added = true;
        break;
      }
    }
    // 如果没有匹配的分组，则加入“其他”分组
    if (!added) {
      if (!groups["其他"]) {
        groups["其他"] = [];
      }
      groups["其他"].push(tag);
    }
  });

  return groups;
});

// 计算属性，用于筛选图片
const filteredImages = computed(() => {
  const selectedGroupTags = Object.values(selectedTags.value);
  if (selectedGroupTags.length === 0) {
    return images.value;
  }
  return images.value.filter(
    (image) =>
      selectedGroupTags.every((tag) => image.tags && image.tags.includes(tag)) //这意味着即使 image.tags 不存在，image.tags.includes(tag) 执行将导致运行时错误，因为尝试在一个 undefined 或 null 上调用 .includes() 方法是不允许的。
  );
});

// 切换标签选择的方法
function toggleTagSelection(tag, groupName) {
  if (selectedTags.value[groupName] === tag) {
    delete selectedTags.value[groupName];
  } else {
    selectedTags.value[groupName] = tag;
  }
}

// 清除筛选
function clearFilter() {
  selectedTags.value = {};
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
  margin-bottom: 1em;
  border-radius: 2em;
  border: 1px solid #f5f4f4;
  box-shadow: 0px 14px 40px 0px rgba(0, 0, 0, 0.08);
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
