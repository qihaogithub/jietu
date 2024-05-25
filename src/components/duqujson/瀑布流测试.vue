<template>
  <div class="grid">
    <div class="grid-sizer"></div>
    <div v-for="(image, index) in images" :key="index" class="grid-item">
      <img :src="image.src" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";

const images = ref([
  {
    src: "https://uiweb.oss-cn-chengdu.aliyuncs.com/img/%E7%9B%AE%E5%BD%95%E9%A1%B5/%E5%B9%BF%E5%9C%BA%E9%A1%B5.png",
  },
  {
    src: "https://uiweb.oss-cn-chengdu.aliyuncs.com/img/%E7%9B%AE%E5%BD%95%E9%A1%B5/%E9%80%9A%E7%94%A8%E5%BC%B9%E7%AA%97.png",
  },
  {
    src: "https://uiweb.oss-cn-chengdu.aliyuncs.com/img/%E7%9B%AE%E5%BD%95%E9%A1%B5/%E9%80%9A%E7%94%A8%E5%BC%B9%E7%AA%97.png",
  },
]);

onMounted(() => {
  const grid = document.querySelector(".grid");
  const msnry = new Masonry(grid, {
    itemSelector: ".grid-item",
    columnWidth: ".grid-sizer",
    percentPosition: true,
    gutter: 10,
  });

  imagesLoaded(grid).on("progress", () => {
    msnry.layout();
  });
});
</script>

<style>
.grid {
  width: 100%;
  margin: 0 auto;
}
.grid-sizer,
.grid-item {
  width: 16.666666666666667%;
}
.grid-item {
  background-color: aqua;
}
@media (max-width: 768px) {
  .grid-sizer,
  .grid-item {
    width: 50%;
  }
}
@media (max-width: 480px) {
  .grid-sizer,
  .grid-item {
    width: 100%;
  }
}
img {
  width: 100%;
  height: auto;
}
</style>
