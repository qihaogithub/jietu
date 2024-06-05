<!-- <template>
  <div>
    <Waterfall :list="list" :column-width="300" :gap="10">
      <template v-slot:default="{ list }">
        <div class="item">
          <img :src="list.src" :alt="list.alt" />
        </div>
      </template>
    </Waterfall>
  </div>
</template> -->

<template>
  <div id="content">
    <vue-waterfall-easy
      ref="waterfall"
      :imgsArr="imgsArr"
      @scrollReachBottom="getData"
      @click="clickFn"
      @imgError="imgErrorFn"
    >
      <div class="img-info" v-for="(item, index) in imgsArr" :key="index">
        <p class="some-info">第{{ index + 1 }}张图片</p>
        <p class="some-info">{{ item.info }}</p>
      </div>
    </vue-waterfall-easy>

    <!-- Commented out sections -->
    <!-- <div slot="waterfall-head">
        <h1>waterfall-head</h1>
        <h1>waterfall-head</h1>
      </div> -->

    <!-- Custom loading animation -->
    <!-- <div slot="loading" v-if="isFirstLoad">first-loading...</div>
      <div v-else>loading...</div> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import vueWaterfallEasy from "vue-waterfall-easy";
const imgsArr = ref([
  {
    src: "https://uiweb.oss-cn-chengdu.aliyuncs.com/images/jietu.library/images/LWEQZP3RFI1JU.info/._训练营-pad.png",
    alt: "Image 1",
  },
  {
    src: "https://uiweb.oss-cn-chengdu.aliyuncs.com/images/jietu.library/images/LWEQZP3SC1VI1.info/训练营-pad.png",
    alt: "Image 2",
  },
  {
    src: "https://uiweb.oss-cn-chengdu.aliyuncs.com/images/jietu.library/images/LWZSUTRAA3PPN.info/IMG_4736.jpg",
    alt: "Image 3",
  },
  {
    src: "https://uiweb.oss-cn-chengdu.aliyuncs.com/images/jietu.library/images/LWZSUTRBFGBLX.info/IMG_4737_thumbnail.png",
    alt: "Image 4",
  },
]);

onMounted(() => {
  console.log("Component mounted");
});
</script>

<style scoped>
.item {
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
}
.item img {
  width: 100%;
  display: block;
}
</style>
