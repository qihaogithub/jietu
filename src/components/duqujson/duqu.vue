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

    <waterfall :list="filteredImages">
      <template v-slot="{ item }">
        <div
          :key="item.folderName"
          class="image-item"
          @click="showImageDetails(item)"
        >
          <img
            :src="item.imageUrlThumbnail || item.imageUrl"
            :alt="item.folderName"
          />
        </div>
      </template>
    </waterfall>

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
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import Waterfall from "vue-waterfall2";

const images = ref([]);
const selectedImage = ref(null);
const selectedTags = ref({}); // 用于存储按组选择的标签

onMounted(() => {
  fetchImagesInfo();
  // 设置 "叫叫" 标签默认选中
  if (tagGroups.品牌.includes("叫叫")) {
    selectedTags.value.品牌 = "叫叫";
  }
});

async function fetchImagesInfo() {
  try {
    const response = await axios.get(
      "https://uiweb.oss-cn-chengdu.aliyuncs.com/images/imagesInfo.json"
    );
    console.log(response); // 打印整个响应对象
    console.log(response.data); // 打印响应的数据部分
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

// 计算属性，用于筛选图片
const filteredImages = computed(() => {
  const selectedGroupTags = Object.values(selectedTags.value);
  if (selectedGroupTags.length === 0) {
    return images.value;
  }
  return images.value.filter((image) =>
    selectedGroupTags.every((tag) => image.tags && image.tags.includes(tag))
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
</script>

<style scoped>
/* 添加样式以适应瀑布流布局 */
.masonry {
  display: flex;
  flex-wrap: wrap;
}

.image-item {
  margin: 10px;
  flex: 1;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.overlay-content {
  position: relative;
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 90%;
  max-height: 90%;
}

.overlay-image {
  max-width: 100%;
  max-height: 100%;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.sift {
  margin-bottom: 20px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.button {
  margin: 5px;
  padding: 10px 15px;
  cursor: pointer;
}

.active {
  background-color: #42b983;
  color: white;
}
</style>
