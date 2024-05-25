<template>
    <div>
      <div v-for="image in images" :key="image.folderName" class="image-item">
        <h2>{{ image.folderName }}</h2>
        <img :src="image.imageUrl" :alt="image.folderName" />
        <p>ID: {{ image.id }}</p>
        <p>Name: {{ image.name }}</p>
        <p>Size: {{ image.size }}</p>
        <p>Width: {{ image.width }}</p>
        <p>Height: {{ image.height }}</p>
        <p>Modification Time: {{ image.modificationTime }}</p>
        <p>Tags: {{ image.tags?.join(", ") }}</p>
        <p>Color Palettes:</p>
        <ul>
          <li v-for="palette in image.palettes" :key="JSON.stringify(palette.color)">
            Color: [{{ palette.color.join(", ") }}], Ratio: {{ palette.ratio }}%
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const images = ref([]);
  
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
  </script>
  
  <style scoped>
  .image-item {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
  }
  </style>
  