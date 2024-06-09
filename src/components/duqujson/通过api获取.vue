<template>
    <div>
      <div v-for="(image, index) in images" :key="index" class="image-container" @click="showDetails(image)">
        <img :src="image.url" :alt="image.name" />
      </div>
      <div v-if="selectedImage">
        <h1>{{ selectedImage.name }}</h1>
        <!-- ... 其他详情信息 ... -->
        <button @click="selectedImage = null">Close</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import axios from 'axios';
  import { ref } from 'vue';
  
  // 存储所有图片信息的数组
  const images = ref([]);
  
  // 当点击图片时，存储当前选中的图片详情
  const selectedImage = ref(null);
  
  onMounted(async () => {
    try {
      // 假设后端API提供了所需的图片信息数组
      const response = await axios.get('/api/images');
      images.value = response.data;
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  });
  
  function showDetails(image) {
    // 这里可以添加逻辑来获取并显示图片的详细信息
    // 例如，根据image对象中的metadataPath获取JSON文件内容
    axios.get(image.metadataPath)
      .then(response => {
        selectedImage.value = response.data;
      })
      .catch(error => {
        console.error('Error fetching image details:', error);
      });
  }
  </script>
  
  <style>
  .image-container {
    /* 你的样式 */
  }
  </style>