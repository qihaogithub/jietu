<template>
  <div>
    <h1>Search Images</h1>
    <button @click="searchImages">Search</button>
    <div v-if="images.length">
      <ul>
        <li v-for="image in images" :key="image.id">{{ image.folderName }}</li>
      </ul>
    </div>
    <div v-else>No images found.</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      images: [],
    };
  },
  methods: {
    async searchImages() {
      try {
        const response = await axios.post(
          "https://query-pictures-suczszlqxt.cn-hangzhou.fcapp.run",
          {
            folderName: "LWEQZP3RFI1JU.info",
          }
        );
        this.images = response.data.images;
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
