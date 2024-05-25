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
        v-for="image in paginatedImages"
        :key="image.folderName"
        class="image-item"
        @click="showImageDetails(image)"
      >
        <img
          :src="image.imageUrlThumbnail || image.imageUrl"
          :alt="image.folderName"
        />
      </div>
      <div ref="loadMoreTrigger" class="load-more-trigger"></div>
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import axios from "axios";

const images = ref([]);
const selectedImage = ref(null);
const selectedTags = ref({}); // 用于存储按组选择的标签

const currentPage = ref(1);
const imagesPerPage = 20; // 每页加载的图片数量
const loadMoreTrigger = ref(null);

onMounted(() => {
  fetchImagesInfo();
  // 设置 "叫叫" 标签默认选中
  if (tagGroups.品牌.includes("叫叫")) {
    selectedTags.value.品牌 = "叫叫";
  }
  setupIntersectionObserver();
});

async function fetchImagesInfo(page = 1) {
  try {
    const response = await axios.get(
      "https://uiweb.oss-cn-chengdu.aliyuncs.com/images/imagesInfo.json"
    );
    if (page === 1) {
      images.value = response.data;
    } else {
      images.value.push(...response.data);
    }
  } catch (error) {
    console.error("Error fetching images info:", error);
  }
}

function setupIntersectionObserver() {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      loadMoreImages();
    }
  });
  if (loadMoreTrigger.value) {
    observer.observe(loadMoreTrigger.value);
  }
}

function loadMoreImages() {
  currentPage.value += 1;
  fetchImagesInfo(currentPage.value);
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
  ],
  机型: ["pad", "手机"],
  其他: [],
};

// 根据标签分组
const groupedTags = computed(() => {
  const groups = {};
  for (const group in tagGroups) {
    groups[group] = tagGroups[group];
  }
  return groups;
});

// 切换标签选择状态
function toggleTagSelection(tag, groupName) {
  if (selectedTags.value[groupName] === tag) {
    selectedTags.value[groupName] = null;
  } else {
    selectedTags.value[groupName] = tag;
  }
}

// 清除所有筛选
function clearFilter() {
  selectedTags.value = {};
}

// 根据选择的标签筛选图片
const filteredImages = computed(() => {
  return images.value.filter((image) => {
    for (const group in selectedTags.value) {
      if (
        selectedTags.value[group] &&
        (!image.tags || !image.tags.includes(selectedTags.value[group]))
      ) {
        return false;
      }
    }
    return true;
  });
});

// 分页展示图片
const paginatedImages = computed(() => {
  const start = (currentPage.value - 1) * imagesPerPage;
  const end = start + imagesPerPage;
  return filteredImages.value.slice(0, end);
});
</script>

<style scoped>
.masonry {
  display: flex;
  flex-wrap: wrap;
}

.image-item {
  flex-basis: 20%;
  padding: 10px;
}

.image-item img {
  max-width: 100%;
  border-radius: 8px;
  cursor: pointer;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay-content {
  position: relative;
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 90%;
  max-height: 90%;
  overflow-y: auto;
}

.overlay-image {
  max-width: 100%;
  max-height: 80vh;
  display: block;
  margin: 0 auto;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: red;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 16px;
  width: 30px;
  height: 30px;
}

.sift {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
}

.button {
  margin: 5px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button.active {
  background-color: #007bff;
  color: white;
}

.quanbu {
  background-color: #f44336;
  color: white;
}

.list-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.load-more-trigger {
  width: 100%;
  height: 1px;
}
</style>
