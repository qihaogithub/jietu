<template>
  <!-- 创建外部容器用于包装瀑布流内容 -->
  <div class="waterfall-container">
    <!-- 创建每个泳道，lanes 数组中的每个元素都代表一个泳道 -->
    <div
      v-for="(lane, index) in lanes"
      :key="index"
      class="lane"
      :style="{ width: laneWidth + '%' }"
    >
      <!-- 创建每个瀑布流项，flowItem 包含图片的内容和高度 -->
      <div
        v-for="(flowItem, flowIndex) in lane"
        :key="flowIndex"
        class="item"
        :style="{ height: flowItem.height + 'px' }"
      >
        <!-- <img
          :src="image.imageUrlThumbnail || image.imageUrl"
          :alt="image.folderName"
        /> -->
        {{ flowItem.content }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import axios from "axios";

// 定义响应式的数据对象
const images = ref([
  //   { content: "Item 1", height: 100 },
  //   { content: "Item 2", height: 150 },
  //   { content: "Item 3", height: 120 },
  //   { content: "Item 4", height: 130 },
  //   { content: "Item 5", height: 110 },
  //   { content: "Item 6", height: 140 },
  //   { content: "Item 7", height: 150 },
  //   { content: "Item 8", height: 120 },
  //   // 更多图片对象...
]);
async function fetchImagesInfo() {
  try {
    const response = await axios.get(
      "https://uiweb.oss-cn-chengdu.aliyuncs.com/images/imagesInfo.json"
    );
    images.value = response.data;
    console.log(images.value);
  } catch (error) {
    console.error("Error fetching images info:", error);
  }
}
fetchImagesInfo();
// 指定泳道的数量
const laneCount = ref(6);

// 计算属性，用于将图片分布到各个泳道
const lanes = computed(() => {
  const result = new Array(laneCount.value).fill().map(() => []);
  images.value.forEach((image, index) => {
    const laneIndex = index % laneCount.value;
    result[laneIndex].push(image);
  });
  return result;
});

// 计算泳道的宽度百分比
const laneWidth = computed(() => 100 / laneCount.value);
</script>

<style>
.waterfall-container {
  display: flex;
  flex-wrap: wrap;
  /* 使用 Flex 布局并允许泳道换行 */
}

.lane {
  display: flex;
  /* 泳道中的图片从上到下排列 */
  flex-direction: column;
}

.item {
  background-color: blanchedalmond;
  padding: 5px;
  box-sizing: border-box;
  margin: 5px;
  /* 设置图片项的样式，包括间隙 */
}
</style>
