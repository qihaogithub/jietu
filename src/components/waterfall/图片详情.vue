<template>
  <div
    v-if="
      selectedImage &&
      (selectedImage.imageUrlThumbnail || selectedImage.imageUrl)
    "
    class="overlay"
    @click="handleOverlayClick"
  >
    <div class="overlay-content"@click.stop>
    
      <img
        :src="selectedImage.imageUrl || image.imageUrlThumbnail"
        :alt="selectedImage.folderName"
        class="overlay-image"
      />
      <div class="image-info">
        <div class="list-container">
          <div class="list-title">名称:</div>
          <div>{{ selectedImage.name }}</div>
        </div>
        <div class="list-container">
          <div class="list-title"> 时间:</div>
          <div>{{ formatTime(selectedImage.modificationTime) }}</div>
        </div>
        <div
          class="list-container"
          v-if="selectedImage.tags && selectedImage.tags.length > 0"
        >
          <div class="list-title">标签:</div>
          <div>{{ selectedImage.tags.join(", ") }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps({ selectedImage: Object, default: () => ({}) });
const emit = defineEmits(["closeImageDetails"]);


// 点击关闭详情 -------------------------------------------------------------------------------
function closeImageDetails() {
  emit('closeImageDetails');
}



const handleOverlayClick = (event) => {
  if (!event.target.closest('.overlay-content')) {
    closeImageDetails();
  }
}


// 显示时间 ---------------------------------------------------------------------
// const formatTime = (time) => {
//   const date = new Date(time);
//   return date.toLocaleString();
// };
const formatTime = (time) => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() 返回0-11，所以加1，并保证两位数
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(247, 249, 250, 0.85);
  backdrop-filter: blur(80px);
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
  /* border-radius: 20px; */
  cursor: zoom-in;
}

.image-info {
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 0 32px;
  /* margin-top: 16px; */
}

.image-info .list-container {
  display: flex;
  justify-content: space-between;
  height: 24px;
  margin: 4px 0;
  align-items: center;
}
.image-info .list-title{
    color: #999;
}
</style>
