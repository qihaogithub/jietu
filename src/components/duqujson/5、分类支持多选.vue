<template>
  <div>
    <!-- 分组展示标签 -->
    <button @click="clearFilter">显示所有</button>
    <div v-for="(tags, groupName) in groupedTags" :key="groupName">
      <h3>{{ groupName }}</h3>
      <button
        v-for="tag in tags"
        :key="tag"
        :class="{ active: selectedTags.includes(tag) }"
        @click="toggleTagSelection(tag)"
      >
        {{ tag }}
      </button>
    </div>

    <div class="masonry">
      <div
        v-for="image in filteredImages"
        :key="image.folderName"
        class="image-item"
        @click="showImageDetails(image)"
      >
        <img :src="image.imageUrl" :alt="image.folderName" />
      </div>
    </div>

    <div v-if="selectedImage" class="overlay" @click.self="closeImageDetails">
      <div class="overlay-content">
        <button class="close-btn" @click="closeImageDetails">X</button>
        <img
          :src="selectedImage.imageUrl"
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

    <!-- 调试信息 -->
    <!-- <pre>{{ images }}</pre> -->
    <!-- <pre>{{ uniqueTags }}</pre> -->
    <!-- <pre>{{ groupedTags }}</pre> -->
    <!-- <pre>{{ selectedTags }}</pre> -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const images = ref([]);
const selectedImage = ref(null);
const selectedTags = ref([]); // 用于存储选择的标签数组

onMounted(() => {
  fetchImagesInfo();
});

async function fetchImagesInfo() {
  try {
    const response = await axios.get("/src/assets/imagesInfo.json");
    images.value = response.data;
  } catch (error) {
    console.error("Error fetching images info:", error);
  }
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

// 标签分组规则
const tagGroups = {
  品牌: ["叫叫", "火花思维", "少年得到", "喜马拉雅儿童"],
  机型: ["pad", "手机"],
  其他: [],
};

// 计算属性，用于筛选图片
const filteredImages = computed(() => {
  if (selectedTags.value.length === 0) {
    return images.value;
  }
  return images.value.filter((image) =>
    selectedTags.value.every((tag) => image.tags && image.tags.includes(tag))
  );
});

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

// 切换标签选择的方法
function toggleTagSelection(tag) {
  const index = selectedTags.value.indexOf(tag);
  if (index === -1) {
    selectedTags.value.push(tag);
  } else {
    selectedTags.value.splice(index, 1);
  }
}

// 清除筛选
function clearFilter() {
  selectedTags.value = [];
}
</script>

<style scoped>
.masonry {
  column-count: 5;
  column-gap: 1.5em;
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
  height: auto; /* Height will adjust automatically */
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

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
}
button.active {
  background-color: #42b983;
  color: white;
}
</style>
