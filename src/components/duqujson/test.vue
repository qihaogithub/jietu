<template>
  <div>
    <div class="masonry">
      <div v-for="image in images" :key="image.folderName" class="image-item" @click="showImageDetails(image)">
        <img :src="image.imageUrl" :alt="image.folderName" />
      </div>
    </div>

    <div v-if="selectedImage" class="overlay" @click.self="closeImageDetails">
      <div class="overlay-content">
        <button class="close-btn" @click="closeImageDetails">X</button>
        <img :src="selectedImage.imageUrl" :alt="selectedImage.folderName"  class="overlay-image"/>
        <div class="image-info">
          <div class="list-container">
            <div>名称:</div> 
            <div>{{ selectedImage.name }}</div>
          </div>
          <div class="list-container">
            <div>修改时间: </div> 
            <div> {{ formatTime(selectedImage.modificationTime) }}</div>
          </div>
          <div class="list-container"  v-if="selectedImage.tags && selectedImage.tags.length > 0">
            <div>标签: </div> 
            <div>  {{ selectedImage.tags.join(", ") }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const images = ref([]);
const selectedImage = ref(null);

onMounted(() => {
  fetchImagesInfo();
});

async function fetchImagesInfo() {
  try {
    const response = await axios.get('/src/assets/imagesInfo.json');
    images.value = response.data;
  } catch (error) {
    console.error('Error fetching images info:', error);
  }
}

function showImageDetails(image) {
  selectedImage.value = image;
  // 隐藏主滚动条
  document.body.style.overflow = 'hidden';
}

function closeImageDetails() {
  selectedImage.value = null;
  // 恢复主滚动条
  document.body.style.overflow = '';
}

// 格式化时间戳为日期和时间
function formatTime(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString();
}
</script>

<style scoped>
.masonry {
  column-count: 5;
  column-gap: 1em;
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
  height: auto; /* 自动根据内容调整高度 */
  width: max-content; /* 自动根据内容调整宽度 */
}

.overlay-image {
  width: 640px;
  height: auto; /* Height will adjust automatically */
  object-fit: contain; /* 确保图片不会变形 */
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
  align-items: center
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
</style>
