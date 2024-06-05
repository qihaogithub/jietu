<template>
  <div class="masonry">
    <div
      v-for="image in filteredImages"
      :key="image.id"
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
</template>

<script setup>
import { defineProps, defineEmits, defineComponent, ref } from "vue";

// 定义属性
const props = defineProps({
  filteredImages: Array,
});
</script>

<style scoped></style>
