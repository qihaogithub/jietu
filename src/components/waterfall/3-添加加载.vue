<style lang="less" scoped>
* {
  margin: 0;
}

.container-water-fall {
  width: 100vw;
  box-sizing: border-box;

  .cell-item {
    width: 100%;
    background: #ffffff;
    border: 2px solid #f0f0f0;
    border-radius: 12px;
    overflow: hidden;
    box-sizing: border-box;
    margin-bottom: 10px;

    img {
      width: 100%;
      height: auto;
      display: block;
    }

    .item-body {
      padding: 12px;

      .item-desc {
        font-size: 15px;
        color: #333333;
        line-height: 15px;
        font-weight: bold;
      }

      .item-footer {
        margin-top: 22px;
        position: relative;
        display: flex;
        align-items: center;

        .avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-repeat: no-repeat;
          background-size: contain;
        }

        .name {
          max-width: 150px;
          margin-left: 10px;
          font-size: 14px;
          color: #999999;
        }

        .like {
          position: absolute;
          right: 0;
          display: flex;
          align-items: center;

          &.active .like-total {
            color: #ff4479;
          }

          i {
            width: 28px;
            display: block;
          }

          .like-total {
            margin-left: 10px;
            font-size: 12px;
            color: #999999;
          }
        }
      }
    }
  }
}
</style>

<template>
  <!-- 瀑布流----------------------------------------------------------------------->
  <div class="container-water-fall">
    <waterfall :col="col" :data="data" @loadmore="loadmore" :gutterWidth="10">
      <div class="cell-item" v-for="(item, index) in data" :key="index" @click="() => handleClick(index)">
        <img :src="item.imageUrlThumbnail || item.imageUrl" alt="item.folderName" />
        <div class="item-body">
          <div class="item-desc">{{ item.annotation }}</div>
          <div class="item-footer">
            <div v-if="item.avatar" class="avatar" :style="{ backgroundImage: `url(${item.avatar})` }"></div>
            <div class="name">{{ item.tags }}</div>
          </div>
        </div>
      </div>
    </waterfall>
    <loading :show="isLoading" />
  </div>

  <ImgDetails :selectedImage v-show="selectedImage" />

</template>

<script setup>
import { ref, onMounted } from 'vue';
import loading from './loading.vue';
import axios from "axios";
import ImgDetails from './图片详情.vue';

const data = ref([]);
const col = ref(5);
const isLoading = ref(false);
const originData = ref([]);
const selectedImage = ref(null);

onMounted(() => {
  fetchImagesInfo();
});
// 获取eagle分组中的图片信息
async function fetchImagesInfo() {
  try {
    isLoading.value = true;
    const response = await axios.get(
      "https://uiweb.oss-cn-chengdu.aliyuncs.com/images/imagesInfo.json"
    );
    originData.value = response.data;
    data.value = originData.value;
    setTimeout(() => {
      isLoading.value = false;
    }, 300);
  } catch (error) {
    console.error("Error fetching images info:", error);
  }
}


const handleClick = (index) => {
  alert(`您点击了第${index + 1}卡片`);
};



</script>
