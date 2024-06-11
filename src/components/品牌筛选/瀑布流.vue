<template>
  <div style="height: 200px; overflow: auto">
    filteredImages:{{ filteredImages }}<br />
  </div>
  <div class="container-water-fall">
    <waterfall
      :col="col"
      :data="filteredImages"
      @loadmore="loadmore"
      :gutterWidth="10"
    >
      <div
        class="cell-item"
        v-for="(item, index) in filteredImages"
        :key="index"
        @click="showImageDetails(item)"
      >
        <img
          :src="item.imageUrlThumbnail || item.imageUrl"
          alt="item.folderName"
        />
      </div>
    </waterfall>
    <detail
      v-if="selectedImage"
      :selectedImage="selectedImage"
      @CloseImageDetails="CloseImageDetails"
    />
    <loading :show="isLoading" />
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import loading from "../waterfall/loading.vue";
import detail from "../waterfall/图片详情.vue";

const col = ref(5);
const isLoading = ref(false);
const selectedImage = ref(null); // 初始化为null
const props = defineProps({
  filteredImages: Array,
});

// 点击图片显示详情 -------------------------------------------------------------------------------
const showImageDetails = (item) => {
  selectedImage.value = item;
  // 隐藏主滚动条
  document.body.style.overflow = "hidden";
};
// 关闭图片详情------------------------------------------------------------------------------------

const CloseImageDetails = () => {
  selectedImage.value = null;
  // 恢复主滚动条
  document.body.style.overflow = "";
};
// 用于强制重新渲染waterfall组件的key
const waterfallKey = ref(0);
const loadmore = () => {
  isLoading.value = true;
  props.filteredImages = [...props.filteredImages, ...newData];
  isLoading.value = false;
};
</script>

<style lang="less" scoped>
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
